/**
 * AR overlay DOM management — camera feed, floating labels, compass, detail cards.
 *
 * Accuracy features:
 * - Compass accuracy indicator in status bar (good/fair/poor with calibration hint)
 * - Low-confidence labels dimmed when GPS accuracy > distance to POI
 * - Bearing indicator on each label showing direction arrow
 */
export class ARUI {
  constructor(container, { onClose, onLabelTap, onViewOnMap }) {
    this.container = container;
    this.onClose = onClose;
    this.onLabelTap = onLabelTap;
    this.onViewOnMap = onViewOnMap;

    // DOM refs (created in _buildDOM)
    this.video = null;
    this.labelsLayer = null;
    this.compassStrip = null;
    this.compassHeading = null;
    this.statusBar = null;
    this.detailCard = null;
    this.calibrationHint = null;

    // Label element pool, keyed by POI id
    this._labelEls = new Map();
    // Track which labels' distance text needs updating (avoid unnecessary DOM writes)
    this._labelCache = new Map();

    this._buildDOM();
  }

  _buildDOM() {
    this.container.innerHTML = '';

    // Camera video
    this.video = document.createElement('video');
    this.video.className = 'ar-camera';
    this.video.setAttribute('autoplay', '');
    this.video.setAttribute('playsinline', '');
    this.video.setAttribute('muted', '');
    this.video.muted = true;
    this.container.appendChild(this.video);

    // Labels layer
    this.labelsLayer = document.createElement('div');
    this.labelsLayer.className = 'ar-labels-layer';
    this.container.appendChild(this.labelsLayer);

    // Compass
    const compass = document.createElement('div');
    compass.className = 'ar-compass';

    const centerLine = document.createElement('div');
    centerLine.className = 'ar-compass-center';
    compass.appendChild(centerLine);

    this.compassStrip = document.createElement('div');
    this.compassStrip.className = 'ar-compass-strip';
    this._buildCompassTicks();
    compass.appendChild(this.compassStrip);

    this.compassHeading = document.createElement('div');
    this.compassHeading.className = 'ar-compass-heading';
    this.compassHeading.textContent = '---';
    compass.appendChild(this.compassHeading);

    this.container.appendChild(compass);

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'ar-close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close AR view');
    closeBtn.addEventListener('click', () => this.onClose());
    this.container.appendChild(closeBtn);

    // Calibration hint (hidden by default)
    this.calibrationHint = document.createElement('div');
    this.calibrationHint.className = 'ar-calibration-hint';
    this.calibrationHint.textContent = 'Move phone in a figure-8 to calibrate compass';
    this.container.appendChild(this.calibrationHint);

    // Status bar
    this.statusBar = document.createElement('div');
    this.statusBar.className = 'ar-status';
    this.container.appendChild(this.statusBar);

    // Detail card
    this.detailCard = document.createElement('div');
    this.detailCard.className = 'ar-detail-card';
    this.detailCard.addEventListener('click', (e) => {
      if (e.target.closest('.ar-detail-btn.primary')) {
        const poi = this.detailCard._poi;
        if (poi) this.onViewOnMap(poi);
      }
      if (e.target.closest('.ar-detail-btn.secondary')) {
        this.hideDetail();
      }
    });
    this.container.appendChild(this.detailCard);

    // Tap outside detail card to close
    this.labelsLayer.addEventListener('click', (e) => {
      if (!e.target.closest('.ar-label')) {
        this.hideDetail();
      }
    });
  }

  _buildCompassTicks() {
    const cardinals = { 0: 'N', 45: 'NE', 90: 'E', 135: 'SE', 180: 'S', 225: 'SW', 270: 'W', 315: 'NW' };
    this.compassStrip.innerHTML = '';

    // Create ticks every 15° across -360 to 720° (triple range for smooth wrapping)
    for (let deg = -360; deg <= 720; deg += 15) {
      const tick = document.createElement('div');
      const normDeg = ((deg % 360) + 360) % 360;
      const isCardinal = cardinals[normDeg] != null;

      tick.className = 'ar-compass-tick' + (isCardinal ? ' cardinal' : '') + (normDeg === 0 ? ' north' : '');

      const line = document.createElement('div');
      line.className = 'ar-compass-tick-line';
      tick.appendChild(line);

      if (isCardinal) {
        const label = document.createElement('div');
        label.className = 'ar-compass-tick-label';
        label.textContent = cardinals[normDeg];
        tick.appendChild(label);
      }

      tick.style.left = `${(deg + 360) * 3}px`;
      this.compassStrip.appendChild(tick);
    }
  }

  attachCamera(stream) {
    this.video.srcObject = stream;
    // Explicitly play — autoplay attribute alone is unreliable on iOS
    this.video.play().catch(() => {});
  }

  /**
   * Convert a bearing (0–360) to a compass arrow character.
   */
  _bearingArrow(bearing) {
    const arrows = ['\u2191', '\u2197', '\u2192', '\u2198', '\u2193', '\u2199', '\u2190', '\u2196']; // ↑ ↗ → ↘ ↓ ↙ ← ↖
    return arrows[Math.round(bearing / 45) % 8];
  }

  /**
   * Update floating labels.
   * @param {Array} items — [{ poi, screenX, screenY, distance, bearing, lowConfidence }]
   * @param {Set} visibleIds — set of POI ids that should be visible
   */
  updateLabels(items, visibleIds) {
    // Hide labels no longer visible
    for (const [id, el] of this._labelEls) {
      if (!visibleIds.has(id)) {
        el.classList.add('hidden');
      }
    }

    for (const item of items) {
      let el = this._labelEls.get(item.poi.id);

      if (!el) {
        // Create new label element
        el = document.createElement('div');
        el.className = 'ar-label';
        el.innerHTML = `
          <div class="ar-label-score"></div>
          <div class="ar-label-text">
            <div class="ar-label-name"></div>
            <div class="ar-label-distance"></div>
          </div>
          <div class="ar-label-arrow"></div>`;
        el.addEventListener('click', () => {
          this.onLabelTap(item.poi);
          this.showDetail(item.poi, item.distance);
        });
        this.labelsLayer.appendChild(el);
        this._labelEls.set(item.poi.id, el);
      }

      // Update content (skip DOM writes if unchanged)
      const cache = this._labelCache.get(item.poi.id) || {};
      const distText = item.distance < 0.1
        ? `${Math.round(item.distance * 5280)} ft`
        : `${item.distance.toFixed(1)} mi`;
      const arrow = this._bearingArrow(item.bearing);

      if (cache.score !== item.poi.score) {
        const scoreEl = el.querySelector('.ar-label-score');
        scoreEl.textContent = item.poi.score ?? '';
        scoreEl.style.background = item.poi.color;
        scoreEl.style.display = item.poi.score != null ? '' : 'none';
        cache.score = item.poi.score;
      }

      if (cache.name !== item.poi.name) {
        el.querySelector('.ar-label-name').textContent = item.poi.name;
        cache.name = item.poi.name;
      }

      if (cache.distText !== distText) {
        el.querySelector('.ar-label-distance').textContent = distText;
        cache.distText = distText;
      }

      if (cache.arrow !== arrow) {
        el.querySelector('.ar-label-arrow').textContent = arrow;
        cache.arrow = arrow;
      }

      this._labelCache.set(item.poi.id, cache);

      // Range attribute for CSS scaling
      const range = item.distance > 8 ? 'far' : item.distance > 3 ? 'mid' : 'near';
      el.setAttribute('data-range', range);

      // Low confidence indicator: dim the label when GPS accuracy is poor relative to distance
      el.classList.toggle('low-confidence', !!item.lowConfidence);

      // Position via transform (GPU-accelerated)
      el.style.transform = `translate(${item.screenX}px, ${item.screenY}px)`;
      el.classList.remove('hidden');
    }
  }

  updateCompass(heading) {
    // Scroll the compass strip so the current heading is centered
    const offset = heading * 3;
    const centerOffset = this.container.clientWidth / 2;
    this.compassStrip.style.transform = `translateX(${centerOffset - offset}px)`;

    // Update heading readout
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const dir = dirs[Math.round(heading / 45) % 8];
    this.compassHeading.textContent = `${Math.round(heading)}° ${dir}`;
  }

  /**
   * Update status bar with GPS accuracy, nearby count, and compass accuracy.
   * @param {Object} position — { lat, lng, accuracy }
   * @param {number} nearestCount
   * @param {number|null} headingAccuracy — degrees of compass uncertainty
   */
  updateStatus(position, nearestCount, headingAccuracy) {
    if (!position) return;

    const accM = Math.round(position.accuracy);
    const gpsDotClass = accM < 20 ? '' : accM < 50 ? ' warn' : ' bad';

    // Compass accuracy indicator
    let compassHTML = '';
    if (headingAccuracy != null) {
      const compassClass = headingAccuracy < 10 ? '' : headingAccuracy < 25 ? ' warn' : ' bad';
      const compassLabel = headingAccuracy < 10 ? 'good' : headingAccuracy < 25 ? 'fair' : 'poor';
      compassHTML = `<div class="ar-status-item"><div class="ar-status-dot${compassClass}"></div> Compass <strong>${compassLabel}</strong></div>`;

      // Show calibration hint when compass accuracy is poor
      this.calibrationHint.classList.toggle('visible', headingAccuracy >= 25);
    } else {
      this.calibrationHint.classList.remove('visible');
    }

    this.statusBar.innerHTML = `
      <div class="ar-status-item"><div class="ar-status-dot${gpsDotClass}"></div> GPS <strong>&plusmn;${accM}m</strong></div>
      ${compassHTML}
      <div class="ar-status-item"><strong>${nearestCount}</strong> nearby</div>`;
  }

  showDetail(poi, distance) {
    const distStr = distance < 0.1
      ? `${Math.round(distance * 5280)} ft away`
      : `${distance.toFixed(1)} mi away`;

    const bearingDeg = Math.round(poi.bearing ?? 0);
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const dirStr = dirs[Math.round(bearingDeg / 45) % 8];

    this.detailCard._poi = poi;
    this.detailCard.innerHTML = `
      <div class="ar-detail-handle"></div>
      <div class="popup-inner">
        <div class="popup-header">
          <div class="popup-score" style="background:${poi.color}">${poi.score ?? ''}</div>
          <div>
            <div class="popup-name">${poi.name}</div>
            <div class="popup-region">${poi.meta?.region ?? poi.category} &middot; ${distStr} &middot; ${bearingDeg}° ${dirStr}</div>
          </div>
        </div>
        <div class="popup-desc">${poi.meta?.desc ?? ''}</div>
        ${poi.meta?.sources ? `<div class="popup-sources"><strong>Sources:</strong> ${poi.meta.sources}</div>` : ''}
      </div>
      <div class="ar-detail-actions">
        <button class="ar-detail-btn primary">View on Map</button>
        <button class="ar-detail-btn secondary">Close</button>
      </div>`;
    this.detailCard.classList.add('open');
  }

  hideDetail() {
    this.detailCard.classList.remove('open');
  }

  showScreen(icon, title, body, btnLabel, onBtn, secondaryLabel, onSecondary) {
    const screen = document.createElement('div');
    screen.className = 'ar-screen';
    screen.innerHTML = `
      <div class="ar-screen-icon">${icon}</div>
      <h2>${title}</h2>
      <p>${body}</p>`;

    const btn = document.createElement('button');
    btn.className = 'ar-screen-btn';
    btn.textContent = btnLabel;
    btn.addEventListener('click', () => {
      screen.remove();
      onBtn();
    });
    screen.appendChild(btn);

    if (secondaryLabel) {
      const btn2 = document.createElement('button');
      btn2.className = 'ar-screen-btn ghost';
      btn2.textContent = secondaryLabel;
      btn2.addEventListener('click', () => {
        screen.remove();
        if (onSecondary) onSecondary();
      });
      screen.appendChild(btn2);
    }

    this.container.appendChild(screen);
    return screen;
  }

  showLoading(msg) {
    const screen = document.createElement('div');
    screen.className = 'ar-screen';
    screen.innerHTML = `<div class="ar-spinner"></div><p>${msg}</p>`;
    screen.id = 'arLoadingScreen';
    this.container.appendChild(screen);
    return screen;
  }

  hideLoading() {
    const el = this.container.querySelector('#arLoadingScreen');
    if (el) el.remove();
  }

  showError(msg) {
    this.showScreen('!', 'Error', msg, 'Return to Map', () => this.onClose());
  }

  destroy() {
    this.container.innerHTML = '';
    this._labelEls.clear();
    this._labelCache.clear();
  }
}
