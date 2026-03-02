/**
 * Abstraction over camera, geolocation, and device orientation sensors.
 * Handles iOS permission quirks and provides a unified state snapshot.
 *
 * Accuracy optimizations:
 * - Uses `deviceorientationabsolute` on Android for true-north heading
 * - Tracks compass accuracy via webkitCompassAccuracy (iOS) or heuristics
 * - Extracts real camera FOV from MediaStreamTrack capabilities
 * - Tracks device tilt (beta) for vertical label placement
 * - Stores altitude + altitudeAccuracy when available
 */
export class ARSensors {
  constructor() {
    this.state = {
      camera: null,           // MediaStream
      cameraFOV: null,        // horizontal FOV in degrees (from camera capabilities)
      position: null,         // { lat, lng, accuracy, altitude, altitudeAccuracy }
      heading: null,          // degrees 0–360 from true north, null if unavailable
      headingAccuracy: null,  // degrees of uncertainty (lower = better)
      tilt: null,             // device tilt in degrees (0 = flat, 90 = upright)
    };
    this.errors = {
      camera: null,
      geolocation: null,
      orientation: null,
    };
    this._watchId = null;
    this._orientationHandler = null;
    this._orientationEvent = null; // 'deviceorientationabsolute' or 'deviceorientation'
  }

  /** Request rear camera. Returns MediaStream. Also detects camera FOV. */
  async requestCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          // Request higher resolution for better AR feel
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });
      this.state.camera = stream;
      this._detectCameraFOV(stream);
      return stream;
    } catch (e) {
      this.errors.camera = e.name === 'NotAllowedError'
        ? 'Camera access was denied.'
        : 'Camera is not available on this device.';
      throw new Error(this.errors.camera);
    }
  }

  /**
   * Attempt to extract the camera's real horizontal field of view.
   * Uses MediaStreamTrack.getCapabilities() where available.
   * Falls back to a reasonable default (~60° for most phone cameras).
   */
  _detectCameraFOV(stream) {
    try {
      const track = stream.getVideoTracks()[0];
      if (!track) return;

      // Some browsers expose capabilities including field of view
      if (typeof track.getCapabilities === 'function') {
        const caps = track.getCapabilities();
        // Chrome on Android sometimes has this (rare but ideal)
        if (caps.fieldOfView) {
          this.state.cameraFOV = caps.fieldOfView;
          return;
        }
      }

      // Heuristic: estimate FOV from focal length and sensor size
      // Most phones: ~26-28mm equivalent focal length → ~65-70° horizontal FOV
      // Ultra-wide: ~13mm → ~120°
      // We can check the facing mode and resolution to make a reasonable guess
      if (typeof track.getSettings === 'function') {
        const settings = track.getSettings();
        // If we have focal length info (rare)
        if (settings.focalLength) {
          // 35mm equivalent: FOV = 2 * atan(sensorWidth / (2 * focalLength))
          // Typical phone sensor width ~6.17mm for 1/2.55" sensor
          const sensorW = 6.17;
          const fovRad = 2 * Math.atan(sensorW / (2 * settings.focalLength));
          this.state.cameraFOV = fovRad * (180 / Math.PI);
          return;
        }
      }
    } catch {
      // Ignore — fall back to default
    }
    // Default: typical smartphone rear camera ~65°
    this.state.cameraFOV = null;
  }

  /** Start watching geolocation. Resolves on first position fix. */
  requestGeolocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        this.errors.geolocation = 'Geolocation is not supported.';
        return reject(new Error(this.errors.geolocation));
      }

      let resolved = false;

      this._watchId = navigator.geolocation.watchPosition(
        (pos) => {
          this.state.position = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            altitude: pos.coords.altitude,
            altitudeAccuracy: pos.coords.altitudeAccuracy,
          };
          if (!resolved) { resolved = true; resolve(this.state.position); }
        },
        (err) => {
          const msg = err.code === 1
            ? 'Location access was denied.'
            : 'Could not determine your location.';
          this.errors.geolocation = msg;
          if (!resolved) { resolved = true; reject(new Error(msg)); }
        },
        {
          enableHighAccuracy: true,
          maximumAge: 3000,   // balance accuracy vs battery drain
          timeout: 15000,
        }
      );
    });
  }

  /**
   * Request device orientation (compass heading).
   * MUST be called from within a user-gesture handler on iOS 13+.
   *
   * Accuracy strategy:
   * - Prefers `deviceorientationabsolute` (Android true-north, no magnetic declination issues)
   * - Falls back to `deviceorientation` with webkitCompassHeading (iOS)
   * - Tracks headingAccuracy from webkitCompassAccuracy or estimates it
   * - Also captures tilt (beta) for vertical positioning
   */
  async requestOrientation() {
    // iOS 13+ requires explicit permission
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const perm = await DeviceOrientationEvent.requestPermission();
        if (perm !== 'granted') {
          this.errors.orientation = 'Compass access was denied.';
          throw new Error(this.errors.orientation);
        }
      } catch (e) {
        if (!this.errors.orientation) {
          this.errors.orientation = 'Compass permission request failed.';
        }
        throw e;
      }
    }

    return new Promise((resolve, reject) => {
      let resolved = false;
      const timeout = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          this.errors.orientation = 'Compass is not available on this device.';
          reject(new Error(this.errors.orientation));
        }
      }, 5000);

      this._orientationHandler = (event) => {
        let heading = null;
        let accuracy = null;

        // ── Extract heading ──
        if (event.webkitCompassHeading != null) {
          // iOS: webkitCompassHeading = degrees from magnetic north (0–360)
          // This is already corrected for device orientation.
          heading = event.webkitCompassHeading;
          accuracy = event.webkitCompassAccuracy; // degrees of error, or -1 if uncalibrated
          if (accuracy < 0) accuracy = null; // -1 means uncalibrated
        } else if (event.alpha != null) {
          // Android / other: alpha = rotation around z-axis
          if (event.absolute || this._orientationEvent === 'deviceorientationabsolute') {
            // `absolute` flag or `deviceorientationabsolute` event = true north
            heading = (360 - event.alpha) % 360;
            // No built-in accuracy metric on Android; estimate from event consistency
            accuracy = 10; // reasonable default for absolute orientation
          } else {
            // Non-absolute fallback — relative to arbitrary reference. Still useful but less accurate.
            heading = (360 - event.alpha) % 360;
            accuracy = 25; // lower confidence
          }
        }

        // ── Extract tilt ──
        // beta: -180 to 180 degrees; 0 = flat, 90 = phone upright facing user
        if (event.beta != null) {
          this.state.tilt = event.beta;
        }

        if (heading != null) {
          this.state.heading = heading;
          this.state.headingAccuracy = accuracy;
          if (!resolved) {
            resolved = true;
            clearTimeout(timeout);
            resolve(heading);
          }
        }
      };

      // ── Try `deviceorientationabsolute` first (Android true-north) ──
      // This event provides heading relative to true north, not magnetic north,
      // which eliminates magnetic declination errors.
      const hasAbsolute = 'ondeviceorientationabsolute' in window;

      if (hasAbsolute) {
        this._orientationEvent = 'deviceorientationabsolute';
        window.addEventListener('deviceorientationabsolute', this._orientationHandler, true);

        // Also register regular event as fallback in case absolute never fires
        setTimeout(() => {
          if (!resolved && this._orientationHandler) {
            this._orientationEvent = 'deviceorientation';
            window.addEventListener('deviceorientation', this._orientationHandler, true);
          }
        }, 1000);
      } else {
        this._orientationEvent = 'deviceorientation';
        window.addEventListener('deviceorientation', this._orientationHandler, true);
      }
    });
  }

  getState() {
    return { ...this.state };
  }

  isFullyReady() {
    return this.state.camera && this.state.position && this.state.heading != null;
  }

  destroy() {
    // Stop camera tracks
    if (this.state.camera) {
      this.state.camera.getTracks().forEach(t => t.stop());
      this.state.camera = null;
    }
    // Clear geolocation watch
    if (this._watchId != null) {
      navigator.geolocation.clearWatch(this._watchId);
      this._watchId = null;
    }
    // Remove orientation listener(s)
    if (this._orientationHandler) {
      window.removeEventListener('deviceorientationabsolute', this._orientationHandler, true);
      window.removeEventListener('deviceorientation', this._orientationHandler, true);
      this._orientationHandler = null;
    }
    this.state.position = null;
    this.state.heading = null;
    this.state.headingAccuracy = null;
    this.state.tilt = null;
    this.state.cameraFOV = null;
  }
}
