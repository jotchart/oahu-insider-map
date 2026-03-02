/**
 * AR HUD — heads-up display components layered on top of the AR camera view.
 *
 * Features:
 * 1. Radar minimap — small circular radar showing nearby POIs, rotated to heading
 * 2. Street name overlay — reverse-geocoded current street via OSM Nominatim
 * 3. Safety heatmap glow — screen edges tint based on neighborhood scores by direction
 * 4. Boundary crossing alert — toast when walking into a new neighborhood
 */

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/reverse';

export class ARHud {
  /**
   * @param {HTMLElement} container — the AR container element
   * @param {Array} pois — all POIs with { id, name, lat, lng, score, color }
   */
  constructor(container, pois) {
    this.container = container;
    this.pois = pois;

    // ── Radar state ──
    this._radarCanvas = null;
    this._radarCtx = null;
    this._radarSize = 110;
    this._radarRange = 1.5; // miles

    // ── Street name state ──
    this._streetEl = null;
    this._lastGeocode = 0;
    this._geocodeInterval = 6000; // ms between reverse geocode calls
    this._currentStreet = '';
    this._geocodeController = null;

    // ── Heatmap glow state ──
    this._glowEl = null;

    // ── Boundary crossing state ──
    this._alertEl = null;
    this._currentNeighborhood = null;
    this._alertTimeout = null;

    this._buildDOM();
  }

  _buildDOM() {
    // ── Radar canvas ──
    const radarWrap = document.createElement('div');
    radarWrap.className = 'ar-radar';
    this._radarCanvas = document.createElement('canvas');
    this._radarCanvas.width = this._radarSize * 2; // 2x for retina
    this._radarCanvas.height = this._radarSize * 2;
    this._radarCanvas.style.width = this._radarSize + 'px';
    this._radarCanvas.style.height = this._radarSize + 'px';
    this._radarCtx = this._radarCanvas.getContext('2d');
    radarWrap.appendChild(this._radarCanvas);

    const radarLabel = document.createElement('div');
    radarLabel.className = 'ar-radar-label';
    radarLabel.textContent = `${this._radarRange} mi`;
    radarWrap.appendChild(radarLabel);
    this.container.appendChild(radarWrap);

    // ── Street name ──
    this._streetEl = document.createElement('div');
    this._streetEl.className = 'ar-street-name';
    this.container.appendChild(this._streetEl);

    // ── Heatmap glow overlay ──
    this._glowEl = document.createElement('div');
    this._glowEl.className = 'ar-heatmap-glow';
    this.container.appendChild(this._glowEl);

    // ── Boundary crossing alert ──
    this._alertEl = document.createElement('div');
    this._alertEl.className = 'ar-boundary-alert';
    this.container.appendChild(this._alertEl);
  }

  // ═══════════════════════════════════════════
  //  1. RADAR MINIMAP
  // ═══════════════════════════════════════════

  /**
   * Draw the radar showing nearby POIs rotated to match heading.
   * @param {Object} position — { lat, lng }
   * @param {number} heading — degrees 0-360
   * @param {Array} enrichedPois — [{ id, name, lat, lng, score, color, distance, bearing }]
   */
  updateRadar(position, heading, enrichedPois) {
    if (!position || !this._radarCtx) return;

    const ctx = this._radarCtx;
    const size = this._radarSize * 2; // canvas pixel size (retina)
    const cx = size / 2;
    const cy = size / 2;
    const radius = cx - 8;

    ctx.clearRect(0, 0, size, size);

    // Background circle
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(26, 26, 46, 0.75)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Range rings
    for (const frac of [0.33, 0.66]) {
      ctx.beginPath();
      ctx.arc(cx, cy, radius * frac, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // North indicator line (rotated by heading)
    const northAngle = -heading * (Math.PI / 180) - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(northAngle) * radius * 0.9, cy + Math.sin(northAngle) * radius * 0.9);
    ctx.strokeStyle = 'rgba(233, 69, 96, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // "N" label at north
    ctx.save();
    ctx.font = 'bold 16px DM Sans, sans-serif';
    ctx.fillStyle = 'rgba(233, 69, 96, 0.7)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const nX = cx + Math.cos(northAngle) * (radius - 14);
    const nY = cy + Math.sin(northAngle) * (radius - 14);
    ctx.fillText('N', nX, nY);
    ctx.restore();

    // Heading direction indicator (small triangle at top of circle in heading direction)
    ctx.beginPath();
    const triAngle = -Math.PI / 2; // straight up = where user is facing
    const triR = radius + 4;
    ctx.moveTo(cx + Math.cos(triAngle) * triR, cy + Math.sin(triAngle) * triR);
    ctx.lineTo(cx + Math.cos(triAngle - 0.15) * (triR - 10), cy + Math.sin(triAngle - 0.15) * (triR - 10));
    ctx.lineTo(cx + Math.cos(triAngle + 0.15) * (triR - 10), cy + Math.sin(triAngle + 0.15) * (triR - 10));
    ctx.closePath();
    ctx.fillStyle = '#e94560';
    ctx.fill();

    // FOV wedge (show ~65° field of view)
    const fovHalf = 32.5 * (Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius * 0.95, -Math.PI / 2 - fovHalf, -Math.PI / 2 + fovHalf);
    ctx.closePath();
    ctx.fillStyle = 'rgba(233, 69, 96, 0.08)';
    ctx.fill();

    // POI dots
    for (const p of enrichedPois) {
      if (p.distance > this._radarRange) continue;

      // Position on radar: relative bearing from heading, distance scaled to radius
      const relBearing = (p.bearing - heading) * (Math.PI / 180);
      const distFrac = p.distance / this._radarRange;
      const dotX = cx + Math.sin(relBearing) * distFrac * radius * 0.85;
      const dotY = cy - Math.cos(relBearing) * distFrac * radius * 0.85;

      const dotSize = p.distance < 0.5 ? 7 : p.distance < 1 ? 5.5 : 4;

      ctx.beginPath();
      ctx.arc(dotX, dotY, dotSize, 0, Math.PI * 2);
      ctx.fillStyle = p.color || '#fff';
      ctx.fill();

      // Glow effect for high-score POIs
      if (p.score >= 8) {
        ctx.beginPath();
        ctx.arc(dotX, dotY, dotSize + 3, 0, Math.PI * 2);
        ctx.fillStyle = (p.color || '#fff') + '33';
        ctx.fill();
      }
    }

    // Center dot (user)
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, 7, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // ═══════════════════════════════════════════
  //  2. STREET NAME DETECTION
  // ═══════════════════════════════════════════

  /**
   * Reverse-geocode user position to show current street name.
   * Throttled to avoid hitting Nominatim rate limits.
   * @param {Object} position — { lat, lng }
   */
  updateStreetName(position) {
    if (!position) return;

    const now = Date.now();
    if (now - this._lastGeocode < this._geocodeInterval) return;
    this._lastGeocode = now;

    // Cancel any in-flight request
    if (this._geocodeController) {
      this._geocodeController.abort();
    }
    this._geocodeController = new AbortController();

    const url = `${NOMINATIM_URL}?lat=${position.lat}&lon=${position.lng}&format=json&zoom=17&addressdetails=1`;

    fetch(url, {
      signal: this._geocodeController.signal,
      headers: { 'Accept-Language': 'en' },
    })
      .then(r => r.json())
      .then(data => {
        const addr = data.address || {};
        const road = addr.road || addr.pedestrian || addr.path || '';
        const cross = addr.neighbourhood || addr.suburb || '';

        if (road) {
          const display = cross ? `${road} · ${cross}` : road;
          if (display !== this._currentStreet) {
            this._currentStreet = display;
            this._streetEl.textContent = display;
            this._streetEl.classList.add('visible');
          }
        }
      })
      .catch(() => {
        // Silently fail — street name is non-critical
      });
  }

  // ═══════════════════════════════════════════
  //  3. SAFETY HEATMAP GLOW
  // ═══════════════════════════════════════════

  /**
   * Tint screen edges based on neighborhood scores in each direction.
   * @param {number} heading — current compass heading
   * @param {Array} enrichedPois — nearby POIs with bearing and score
   */
  updateHeatmapGlow(heading, enrichedPois) {
    if (!enrichedPois.length) {
      this._glowEl.style.boxShadow = 'none';
      return;
    }

    // Partition nearby POIs into directional zones relative to heading
    // Left (-90 to -30), Center (-30 to +30), Right (+30 to +90)
    const zones = { left: [], center: [], right: [] };

    for (const p of enrichedPois) {
      if (p.distance > 5) continue; // only consider nearby neighborhoods

      let relAngle = ((p.bearing - heading + 540) % 360) - 180;
      // Weight by proximity (closer = stronger influence)
      const weight = 1 / (p.distance + 0.3);

      if (relAngle >= -90 && relAngle < -20) {
        zones.left.push({ score: p.score, weight });
      } else if (relAngle >= -20 && relAngle <= 20) {
        zones.center.push({ score: p.score, weight });
      } else if (relAngle > 20 && relAngle <= 90) {
        zones.right.push({ score: p.score, weight });
      }
    }

    const avgScore = (items) => {
      if (!items.length) return null;
      const totalW = items.reduce((s, i) => s + i.weight, 0);
      return items.reduce((s, i) => s + i.score * i.weight, 0) / totalW;
    };

    const scoreToColor = (score) => {
      if (score == null) return 'transparent';
      // Green for high scores, yellow for mid, red for low
      if (score >= 7) return `rgba(0, 200, 83, ${0.12 + (score - 7) * 0.03})`;
      if (score >= 5) return `rgba(255, 183, 77, ${0.10 + (7 - score) * 0.02})`;
      return `rgba(239, 83, 80, ${0.12 + (5 - score) * 0.04})`;
    };

    const leftScore = avgScore(zones.left);
    const centerScore = avgScore(zones.center);
    const rightScore = avgScore(zones.right);

    const shadows = [];
    if (leftScore != null) {
      shadows.push(`inset 60px 0 80px -30px ${scoreToColor(leftScore)}`);
    }
    if (rightScore != null) {
      shadows.push(`inset -60px 0 80px -30px ${scoreToColor(rightScore)}`);
    }
    if (centerScore != null) {
      shadows.push(`inset 0 -50px 70px -30px ${scoreToColor(centerScore)}`);
    }

    this._glowEl.style.boxShadow = shadows.length ? shadows.join(', ') : 'none';
  }

  // ═══════════════════════════════════════════
  //  4. BOUNDARY CROSSING ALERT
  // ═══════════════════════════════════════════

  /**
   * Detect when user walks into a different neighborhood and show a toast.
   * Uses nearest-POI as proxy for current neighborhood (matches Voronoi logic).
   * @param {Array} enrichedPois — sorted by distance (closest first)
   */
  updateBoundaryCrossing(enrichedPois) {
    if (!enrichedPois.length) return;

    const nearest = enrichedPois[0];
    const nearestId = nearest.id;

    if (this._currentNeighborhood === null) {
      // First fix — set initial neighborhood silently
      this._currentNeighborhood = nearestId;
      return;
    }

    if (nearestId !== this._currentNeighborhood) {
      // Crossed into a new neighborhood
      this._currentNeighborhood = nearestId;
      this._showBoundaryAlert(nearest);
    }
  }

  _showBoundaryAlert(poi) {
    // Clear any existing alert timeout
    if (this._alertTimeout) {
      clearTimeout(this._alertTimeout);
    }

    const scoreColor = poi.color || '#fff';
    this._alertEl.innerHTML = `
      <div class="ar-boundary-alert-icon" style="background:${scoreColor}">${poi.score ?? ''}</div>
      <div class="ar-boundary-alert-text">
        <div class="ar-boundary-alert-label">Entering</div>
        <div class="ar-boundary-alert-name">${poi.name}</div>
      </div>`;
    this._alertEl.classList.add('visible');

    this._alertTimeout = setTimeout(() => {
      this._alertEl.classList.remove('visible');
    }, 4000);
  }

  // ═══════════════════════════════════════════
  //  LIFECYCLE
  // ═══════════════════════════════════════════

  destroy() {
    if (this._geocodeController) {
      this._geocodeController.abort();
    }
    if (this._alertTimeout) {
      clearTimeout(this._alertTimeout);
    }
    // DOM elements are inside the AR container which gets cleared by ARUI.destroy()
    this._radarCtx = null;
    this._radarCanvas = null;
    this._streetEl = null;
    this._glowEl = null;
    this._alertEl = null;
    this._currentNeighborhood = null;
    this._currentStreet = '';
  }
}
