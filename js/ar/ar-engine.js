import { enrichAndSort, angleDiff } from './ar-geo.js';
import { ARSensors } from './ar-sensors.js';
import { ARUI } from './ar-ui.js';
import { ARHud } from './ar-hud.js';

/**
 * AR Engine — orchestrates sensors, positioning math, and render loop.
 *
 * Accuracy optimizations:
 * - Adaptive heading smoothing: fast response when turning, tight lock when still
 * - Uses real camera FOV from sensor capabilities when available
 * - Uses device tilt (beta) for accurate vertical label positioning
 * - Tracks heading accuracy and surfaces it to UI for calibration prompts
 * - GPS accuracy-aware: dims labels when position uncertainty exceeds their distance
 */
export class AREngine {
  constructor({ pois, onViewOnMap, fieldOfView = 65, maxLabels = 12, maxDistance = 15 }) {
    this.pois = pois;
    this.onViewOnMap = onViewOnMap;
    this.defaultFOV = fieldOfView;
    this.maxLabels = maxLabels;
    this.maxDistance = maxDistance;

    this.sensors = null;
    this.ui = null;
    this.hud = null;
    this._rafId = null;
    this._running = false;

    // ── Heading smoothing state ──
    this._smoothedHeading = null;
    this._prevRawHeading = null;
    this._headingVelocity = 0; // degrees/frame, used for adaptive smoothing

    // ── Tilt smoothing state ──
    this._smoothedTilt = null;
  }

  /**
   * Start AR: request permissions, attach camera, begin render loop.
   * @param {HTMLElement} container — the #arContainer element
   */
  async start(container) {
    this._running = true;

    this.sensors = new ARSensors();
    this.ui = new ARUI(container, {
      onClose: () => this.stop(),
      onLabelTap: () => {},
      onViewOnMap: (poi) => {
        this.stop();
        this.onViewOnMap(poi);
      },
    });

    // HUD overlays (radar, street name, heatmap glow, boundary alerts)
    this.hud = new ARHud(container, this.pois);

    // Show intro screen — user must tap to trigger permission requests (iOS requirement)
    this.ui.showScreen(
      '\uD83D\uDCF7', // camera emoji
      'AR Mode',
      'Point your camera to see neighborhoods around you with distances and directions. Requires camera, location, and compass access.',
      'Continue',
      () => this._requestPermissions(container),
      'Cancel',
      () => this.stop(),
    );
  }

  async _requestPermissions(container) {
    const loading = this.ui.showLoading('Requesting camera...');

    try {
      // 1. Camera
      const stream = await this.sensors.requestCamera();
      this.ui.attachCamera(stream);

      // 2. Geolocation
      loading.querySelector('p').textContent = 'Getting your location...';
      await this.sensors.requestGeolocation();

      // 3. Orientation (compass) — may silently fail on desktop
      loading.querySelector('p').textContent = 'Calibrating compass...';
      try {
        await this.sensors.requestOrientation();
      } catch {
        // Compass not available — we'll fall back to no directional positioning
        console.warn('AR: compass not available, using distance-only mode');
      }

      this.ui.hideLoading();
      this._startRenderLoop();
    } catch (err) {
      this.ui.hideLoading();
      this.ui.showError(err.message || 'Could not start AR. Please check your permissions.');
    }
  }

  /** Get the effective horizontal FOV — prefers real camera FOV, falls back to default. */
  _getFieldOfView() {
    return this.sensors?.state.cameraFOV ?? this.defaultFOV;
  }

  _startRenderLoop() {
    if (!this._running) return;
    this._renderFrame();
  }

  _renderFrame() {
    if (!this._running) return;

    // Throttle to ~30fps to reduce battery drain
    const now = performance.now();
    if (this._lastFrameTime && now - this._lastFrameTime < 30) {
      this._rafId = requestAnimationFrame(() => this._renderFrame());
      return;
    }
    this._lastFrameTime = now;

    const { position, heading, headingAccuracy, tilt } = this.sensors.getState();

    if (position) {
      const hasCompass = heading != null;
      const fov = this._getFieldOfView();
      const halfFov = fov / 2;

      // ── Adaptive heading smoothing ──
      // When user is turning fast, use less smoothing (responsive).
      // When holding still, use more smoothing (stable).
      const rawHeading = heading ?? 0;

      if (this._smoothedHeading == null) {
        this._smoothedHeading = rawHeading;
        this._prevRawHeading = rawHeading;
      } else {
        // Compute angular velocity (how fast the user is turning)
        const delta = Math.abs(angleDiff(this._prevRawHeading, rawHeading));
        this._headingVelocity = 0.3 * delta + 0.7 * this._headingVelocity; // smooth the velocity itself
        this._prevRawHeading = rawHeading;

        // Adaptive alpha: 0.08 when still (tight), 0.35 when turning fast (responsive)
        const alpha = Math.min(0.35, Math.max(0.08, this._headingVelocity / 15));
        this._smoothedHeading =
          (this._smoothedHeading + alpha * angleDiff(this._smoothedHeading, rawHeading) + 360) % 360;
      }

      // ── Tilt smoothing ──
      const rawTilt = tilt ?? 90; // default to upright if no tilt data
      if (this._smoothedTilt == null) {
        this._smoothedTilt = rawTilt;
      } else {
        this._smoothedTilt += 0.12 * (rawTilt - this._smoothedTilt);
      }

      const displayHeading = hasCompass ? this._smoothedHeading : 0;

      // ── Compute distances and bearings ──
      const enriched = enrichAndSort(position.lat, position.lng, this.pois);

      // Filter to maxLabels within maxDistance
      const nearby = enriched
        .filter(p => p.distance <= this.maxDistance)
        .slice(0, this.maxLabels);

      // ── Compute screen positions ──
      const vw = this.ui.container.clientWidth;
      const vh = this.ui.container.clientHeight;

      const visibleIds = new Set();
      const labelItems = [];

      for (const p of nearby) {
        // Flag: is GPS accuracy too poor to trust this label's direction?
        // If accuracy circle radius > distance to POI, bearing is unreliable
        const distMeters = p.distance * 1609.34;
        const lowConfidence = position.accuracy > distMeters * 0.5;

        if (hasCompass) {
          const hAngle = angleDiff(displayHeading, p.bearing);

          // Only show labels within the field of view (with some margin for labels partially visible)
          if (Math.abs(hAngle) > halfFov + 10) continue;

          // Horizontal: map bearing angle to screen X
          const normalizedX = hAngle / halfFov;
          const screenX = (normalizedX * 0.5 + 0.5) * vw;

          // Vertical: use device tilt to determine vertical positioning
          // When phone is held upright (tilt ~90°), far things are near horizon (top), close are lower.
          // When phone is tilted up (tilt > 90°), shift everything down (user is looking at sky).
          // When phone is tilted down (tilt < 90°), shift everything up.
          const tiltFactor = this._smoothedTilt / 90; // 1.0 = upright, >1 = tilted back, <1 = tilted forward

          // Elevation angle to POI: approximate as slight negative
          // (all neighborhoods are roughly at sea level on Oahu, phone is at eye height)
          // elevationAngle ≈ -atan(eyeHeight / distance) ≈ ~0 for distant POIs
          const normDist = Math.min(Math.max((p.distance - 0.2) / 12, 0), 1);

          // Base Y: farther = higher on screen (closer to horizon line)
          // Horizon is at roughly tiltFactor * vh/2 (adjusts with phone tilt)
          const horizonY = vh * (1 - tiltFactor * 0.45);
          // Close POIs drop below horizon, far POIs sit near horizon
          const screenY = horizonY - (1 - normDist) * vh * 0.25 + normDist * vh * 0.05;

          // Clamp to visible area
          const clampedY = Math.max(60, Math.min(vh - 80, screenY));

          visibleIds.add(p.id);
          labelItems.push({
            poi: p,
            screenX,
            screenY: clampedY,
            distance: p.distance,
            bearing: p.bearing,
            lowConfidence,
          });
        } else {
          // No compass — stack labels vertically, centered, sorted by distance
          const idx = labelItems.length;
          const screenX = vw / 2;
          const screenY = 80 + idx * 52;

          visibleIds.add(p.id);
          labelItems.push({
            poi: p,
            screenX,
            screenY,
            distance: p.distance,
            bearing: p.bearing,
            lowConfidence,
          });
        }
      }

      // ── Collision avoidance ──
      this._resolveCollisions(labelItems);

      // ── Update UI ──
      this.ui.updateLabels(labelItems, visibleIds);
      this.ui.updateCompass(displayHeading);
      this.ui.updateStatus(position, nearby.length, headingAccuracy);

      // ── Update HUD overlays ──
      if (this.hud) {
        this.hud.updateRadar(position, displayHeading, enriched);
        this.hud.updateStreetName(position);
        this.hud.updateHeatmapGlow(displayHeading, enriched);
        this.hud.updateBoundaryCrossing(enriched);
      }
    }

    this._rafId = requestAnimationFrame(() => this._renderFrame());
  }

  /**
   * Push-apart algorithm for overlapping labels.
   * Runs multiple passes for convergence.
   */
  _resolveCollisions(items) {
    const LABEL_H = 44;
    const LABEL_W = 130;

    for (let pass = 0; pass < 4; pass++) {
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          const a = items[i];
          const b = items[j];

          const dx = Math.abs(a.screenX - b.screenX);
          const dy = Math.abs(a.screenY - b.screenY);

          if (dx < LABEL_W && dy < LABEL_H) {
            const overlap = LABEL_H - dy;
            const nudge = overlap / 2 + 2;
            if (a.screenY < b.screenY) {
              a.screenY -= nudge;
              b.screenY += nudge;
            } else {
              a.screenY += nudge;
              b.screenY -= nudge;
            }
          }
        }
      }
    }
  }

  stop() {
    this._running = false;
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
    if (this.sensors) {
      this.sensors.destroy();
      this.sensors = null;
    }
    if (this.hud) {
      this.hud.destroy();
      this.hud = null;
    }
    if (this.ui) {
      this.ui.destroy();
      this.ui = null;
    }
    this._smoothedHeading = null;
    this._prevRawHeading = null;
    this._headingVelocity = 0;
    this._smoothedTilt = null;

    // Hide the container
    const container = document.getElementById('arContainer');
    if (container) container.classList.remove('active');
  }
}
