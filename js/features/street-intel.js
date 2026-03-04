// ── Feature: Street Intelligence ──
// Corridor-level insider intel for Metro Honolulu's key streets
// Map overlay (polylines) + panel (accordion cards) + popup injection

import { bus } from '../core/event-bus.js';
import { getMap, registerFeatureLayer, removeFeatureLayer } from '../core/map-registry.js';
import { registerPopupSection } from '../core/popup-builder.js';
import { registerPanel, openPanel, closePanel, isPanelOpen } from '../core/panel-manager.js';
import { STREET_CORRIDORS, VIBE_STYLES, getStreetsForNeighborhood } from '../data/street-intel.js';

function esc(s) { const el = document.createElement('span'); el.textContent = s; return el.innerHTML; }

let streetLayer = null;
let _zoomHandler = null;

// ── Map Overlay ──

function showOverlays() {
  const map = getMap();
  if (!map || streetLayer) return;

  const lines = STREET_CORRIDORS.map(corridor => {
    const style = VIBE_STYLES[corridor.vibe];
    const line = L.polyline(corridor.coords, {
      color: style.color,
      weight: 5,
      opacity: 0.65,
      lineCap: 'round',
      lineJoin: 'round'
    });
    line.bindTooltip(corridor.name, {
      permanent: false,
      direction: 'center',
      className: 'street-tooltip'
    });
    line.on('click', () => {
      openPanel('street-intel', { scrollTo: corridor.id });
    });
    return line;
  });

  streetLayer = L.layerGroup(lines);
  registerFeatureLayer('street-corridors', streetLayer);

  _zoomHandler = () => {
    const z = map.getZoom();
    if (z < 14) {
      if (map.hasLayer(streetLayer)) map.removeLayer(streetLayer);
    } else {
      if (!map.hasLayer(streetLayer)) streetLayer.addTo(map);
    }
  };
  map.on('zoomend', _zoomHandler);
  _zoomHandler();
}

function hideOverlays() {
  const map = getMap();
  if (map && _zoomHandler) map.off('zoomend', _zoomHandler);
  removeFeatureLayer('street-corridors');
  streetLayer = null;
  _zoomHandler = null;
}

function flyToStreet(id) {
  const corridor = STREET_CORRIDORS.find(s => s.id === id);
  if (!corridor) return;
  const map = getMap();
  if (map) map.flyTo(corridor.center, corridor.zoom || 16, { duration: 0.8 });
}

// ── Panel ──

function renderStreetPanel(data) {
  let html = '';

  // Vibe legend
  html += '<div class="street-legend">';
  for (const [, v] of Object.entries(VIBE_STYLES)) {
    html += `<span class="legend-chip"><span class="street-dot" style="background:${v.color}"></span>${esc(v.label)}</span>`;
  }
  html += '</div>';

  // Corridor cards
  STREET_CORRIDORS.forEach(corridor => {
    const v = VIBE_STYLES[corridor.vibe];
    html += `<div class="street-card" id="street-${corridor.id}">
      <button class="street-card-header" aria-expanded="false" data-street-toggle="${corridor.id}">
        <div class="street-card-title">
          <span class="street-dot-lg" style="background:${v.color}"></span>
          <div>
            <div class="street-card-name">${esc(corridor.name)}</div>
            <div class="street-card-sub">${esc(corridor.subtitle)} &middot; ${esc(corridor.neighborhood)}</div>
          </div>
        </div>
        <span class="street-chevron">&#9660;</span>
      </button>
      <div class="street-card-body" id="streetBody-${corridor.id}" style="display:none">
        <div class="street-summary">${esc(corridor.summary)}</div>
        ${corridor.insiderTip ? `<div class="street-tip"><span class="street-tip-label">Insider Tip</span>${esc(corridor.insiderTip)}</div>` : ''}
        <div class="street-meta-row">
          ${corridor.bestTime ? `<div class="street-meta"><span class="street-meta-label">Best Time</span>${esc(corridor.bestTime)}</div>` : ''}
          ${corridor.parking ? `<div class="street-meta"><span class="street-meta-label">Parking</span>${esc(corridor.parking)}</div>` : ''}
        </div>
        ${corridor.warnings ? `<div class="street-warning">${esc(corridor.warnings)}</div>` : ''}
        <div class="street-spots-title">Key Spots</div>
        <div class="street-spots-list">
          ${corridor.spots.map(s => `<div class="street-spot">
            <div class="street-spot-name">${esc(s.name)}</div>
            <div class="street-spot-note">${esc(s.note)}</div>
          </div>`).join('')}
        </div>
        <button class="street-flyto" data-flyto="${corridor.id}">Show on Map</button>
      </div>
    </div>`;
  });

  html += '<div class="street-footer">10 corridors across Metro Honolulu &middot; Updated March 2026</div>';

  // Wire up interactions after render
  setTimeout(() => {
    document.querySelectorAll('[data-street-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.streetToggle;
        const body = document.getElementById(`streetBody-${id}`);
        if (!body) return;
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        body.style.display = expanded ? 'none' : '';
      });
    });
    document.querySelectorAll('[data-flyto]').forEach(btn => {
      btn.addEventListener('click', () => {
        flyToStreet(btn.dataset.flyto);
        if (!streetLayer) showOverlays();
      });
    });
    // Auto-scroll to a specific card
    if (data && data.scrollTo) {
      const card = document.getElementById(`street-${data.scrollTo}`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const toggle = card.querySelector('[data-street-toggle]');
        if (toggle && toggle.getAttribute('aria-expanded') !== 'true') {
          toggle.click();
        }
      }
    }
  }, 60);

  return html;
}

// ── Init ──

export async function init() {
  // 1. Popup injection: show "Key Streets" in neighborhood popups
  registerPopupSection({
    id: 'street-intel',
    position: 'after-header',
    render: (data, type) => {
      if (type !== 'neighborhood') return '';
      const streets = getStreetsForNeighborhood(data.name);
      if (streets.length === 0) return '';
      return `<div class="popup-streets">
        <div class="streets-label">Key Streets</div>
        ${streets.map(s => {
          const v = VIBE_STYLES[s.vibe];
          return `<button class="street-link" data-street-nav="${s.id}">
            <span class="street-dot" style="background:${v.color}"></span>
            ${esc(s.name)}
          </button>`;
        }).join('')}
      </div>`;
    }
  });

  // 2. Register panel
  registerPanel('street-intel', {
    title: 'Street Intelligence',
    render: (data) => renderStreetPanel(data),
    onOpen: () => showOverlays(),
    onClose: () => hideOverlays()
  });

  // 3. Wire up pill button
  const pill = document.getElementById('streetsPill');
  if (pill) {
    pill.addEventListener('click', () => {
      if (isPanelOpen('street-intel')) {
        closePanel();
        pill.setAttribute('aria-pressed', 'false');
      } else {
        openPanel('street-intel');
        pill.setAttribute('aria-pressed', 'true');
      }
    });
    bus.on('panel:closed', () => pill.setAttribute('aria-pressed', 'false'));
  }

  // 4. Delegated click handler for street links in popups
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-street-nav]');
    if (!btn) return;
    const streetId = btn.dataset.streetNav;
    openPanel('street-intel', { scrollTo: streetId });
    flyToStreet(streetId);
  });
}
