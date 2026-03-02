// ── Feature: Safety & Emergency Intelligence ──
// Tsunami zones, hurricane shelters, shorebreak warnings, car break-in alerts

import { bus } from '../core/event-bus.js';
import { getMap, registerFeatureLayer, removeFeatureLayer } from '../core/map-registry.js';
import { registerPopupSection } from '../core/popup-builder.js';
import { registerPanel, openPanel, closePanel, isPanelOpen } from '../core/panel-manager.js';
import { getTimeContext } from '../core/time-context.js';
import {
  TSUNAMI_ZONES, HURRICANE_SHELTERS, FLASH_FLOOD_ZONES,
  CAR_BREAKIN_ZONES, EMERGENCY_NUMBERS, SAFETY_TIPS
} from '../data/safety-data.js';
import { DANGEROUS_SHOREBREAK } from '../data/ocean-static.js';

function esc(s) { const el = document.createElement('span'); el.textContent = s; return el.innerHTML; }

let tsunamiLayer = null;
let shelterLayer = null;
let isActive = false;

export async function init() {
  // Register popup section for neighborhoods — car break-in warnings
  registerPopupSection({
    id: 'safety-breakin',
    position: 'before-actions',
    render: (data, type) => {
      if (type !== 'neighborhood') return '';

      // Check if any break-in zones are in this area
      const nearbyBreakIns = CAR_BREAKIN_ZONES.filter(z => {
        const dist = Math.sqrt(Math.pow(z.lat - data.lat, 2) + Math.pow(z.lng - data.lng, 2));
        return dist < 0.03; // roughly 3km
      });

      if (nearbyBreakIns.length === 0) return '';

      const tips = nearbyBreakIns.map(z => esc(z.tips)).join(' ');
      return `<div class="popup-calendar" style="border-color:rgba(233,69,96,0.2)">
        <div class="calendar-label" style="color:var(--accent)">&#128663; Car Safety</div>
        <div class="calendar-item" style="color:var(--text-dim)">${tips}</div>
      </div>`;
    }
  });

  // Register popup section for beach spots — shorebreak/danger warnings
  registerPopupSection({
    id: 'safety-ocean',
    position: 'before-actions',
    render: (data, type) => {
      if (type !== 'spot') return '';
      if (data.category !== 'beach' && data.category !== 'snorkel') return '';

      const ctx = getTimeContext();
      const nearbyDanger = DANGEROUS_SHOREBREAK.filter(s => {
        const dist = Math.sqrt(Math.pow(s.lat - data.lat, 2) + Math.pow(s.lng - data.lng, 2));
        return dist < 0.01 && s.months.includes(ctx.month);
      });

      if (nearbyDanger.length === 0) return '';

      return `<div class="popup-calendar" style="border-color:rgba(233,69,96,0.3)">
        <div class="calendar-label" style="color:var(--accent)">&#9888;&#65039; Danger Warning</div>
        ${nearbyDanger.map(s => `<div class="calendar-item" style="color:var(--text-dim)">${esc(s.desc)}</div>`).join('')}
      </div>`;
    }
  });

  // Register panel
  registerPanel('safety-emergency', {
    title: 'Safety & Emergency',
    render: () => renderSafetyPanel()
  });

  // Wire up pill
  const pill = document.getElementById('safetyPill');
  if (pill) {
    pill.addEventListener('click', () => {
      if (isPanelOpen('safety-emergency')) {
        closePanel();
        pill.setAttribute('aria-pressed', 'false');
        hideOverlays();
      } else {
        showOverlays();
        openPanel('safety-emergency');
        pill.setAttribute('aria-pressed', 'true');
      }
    });

    bus.on('panel:closed', () => {
      pill.setAttribute('aria-pressed', 'false');
      hideOverlays();
    });
  }
}

function showOverlays() {
  const map = getMap();
  if (!map) return;

  hideOverlays();

  // Tsunami zone polygons
  const tsunamiPolygons = TSUNAMI_ZONES.map(zone => {
    const polygon = L.polygon(zone.coords.map(c => [c[0], c[1]]), {
      color: zone.risk === 'high' ? '#e94560' : '#ff8a65',
      fillColor: zone.risk === 'high' ? '#e94560' : '#ff8a65',
      fillOpacity: 0.15,
      weight: 1.5,
      dashArray: '5,5'
    });
    polygon.bindPopup(`<div class="popup-inner"><div class="popup-name">&#9888; Tsunami Zone: ${esc(zone.name)}</div><div class="popup-desc">${esc(zone.notes)}</div></div>`, { maxWidth: 280 });
    return polygon;
  });
  tsunamiLayer = L.layerGroup(tsunamiPolygons).addTo(map);
  registerFeatureLayer('tsunami-zones', tsunamiLayer);

  // Shelter markers
  const shelterMarkers = HURRICANE_SHELTERS.map(s => {
    const marker = L.circleMarker([s.lat, s.lng], {
      radius: 6,
      fillColor: '#4a90d9',
      fillOpacity: 0.9,
      color: '#fff',
      weight: 1.5
    });
    marker.bindPopup(`<div class="popup-inner"><div class="popup-name">&#127961; ${esc(s.name)}</div><div class="popup-region">${esc(s.area)} &middot; Capacity: ${s.capacity}</div><div class="popup-desc">${esc(s.notes)}</div></div>`, { maxWidth: 280 });
    return marker;
  });
  shelterLayer = L.layerGroup(shelterMarkers).addTo(map);
  registerFeatureLayer('shelters', shelterLayer);

  isActive = true;
}

function hideOverlays() {
  removeFeatureLayer('tsunami-zones');
  removeFeatureLayer('shelters');
  tsunamiLayer = null;
  shelterLayer = null;
  isActive = false;
}

function renderSafetyPanel() {
  let html = '';

  // Emergency numbers
  html += `<div class="ocean-section-title">&#128222; Emergency Numbers</div>`;
  const numLabels = {
    emergency: 'Emergency',
    coastGuard: 'Coast Guard',
    poisonControl: 'Poison Control',
    tsunamiInfo: 'Tsunami Info',
    hurricaneInfo: 'Hurricane Info',
    oceanSafety: 'Ocean Safety',
    lifeguardDispatch: 'Lifeguard Dispatch',
    nonEmergencyPolice: 'Non-Emergency Police'
  };
  for (const [key, label] of Object.entries(numLabels)) {
    const num = EMERGENCY_NUMBERS[key];
    html += `<div class="ocean-zone"><div class="ocean-zone-name">${esc(label)}</div><div class="ocean-zone-value"><a href="tel:${num}" style="color:var(--accent);text-decoration:none">${num}</a></div></div>`;
  }

  // Tsunami info
  html += `<div class="ocean-section-title">&#127754; Tsunami Safety</div>`;
  SAFETY_TIPS.tsunami.forEach(tip => {
    html += `<div style="font-size:12px;color:var(--text);padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04)">${esc(tip)}</div>`;
  });

  // Hurricane info
  html += `<div class="ocean-section-title">&#127744; Hurricane Preparedness</div>`;
  SAFETY_TIPS.hurricane.forEach(tip => {
    html += `<div style="font-size:12px;color:var(--text);padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04)">${esc(tip)}</div>`;
  });

  // Ocean safety
  html += `<div class="ocean-section-title">&#127754; Ocean Safety</div>`;
  SAFETY_TIPS.ocean.forEach(tip => {
    html += `<div style="font-size:12px;color:var(--text);padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04)">${esc(tip)}</div>`;
  });

  // Flash flood zones
  html += `<div class="ocean-section-title">&#127783; Flash Flood Zones</div>`;
  FLASH_FLOOD_ZONES.forEach(z => {
    const riskColor = z.risk === 'extreme' ? 'var(--accent)' : z.risk === 'high' ? '#ff8a65' : '#ffb74d';
    html += `<div class="ocean-zone" style="flex-direction:column;align-items:flex-start;gap:2px">
      <div class="ocean-zone-name">${esc(z.name)} <span style="color:${riskColor};font-size:10px">${z.risk.toUpperCase()}</span></div>
      <div style="font-size:11px;color:var(--text-dim)">${esc(z.tips)}</div>
    </div>`;
  });

  // Car break-in zones
  html += `<div class="ocean-section-title">&#128663; Car Break-In Hotspots</div>`;
  CAR_BREAKIN_ZONES.forEach(z => {
    const riskColor = z.risk === 'high' ? 'var(--accent)' : '#ff8a65';
    html += `<div class="ocean-zone" style="flex-direction:column;align-items:flex-start;gap:2px">
      <div class="ocean-zone-name">${esc(z.name)} <span style="color:${riskColor};font-size:10px">${z.risk.toUpperCase()}</span></div>
      <div style="font-size:11px;color:var(--text-dim)">${esc(z.tips)}</div>
    </div>`;
  });

  // Shelters
  html += `<div class="ocean-section-title">&#127961; Hurricane Shelters</div>`;
  HURRICANE_SHELTERS.forEach(s => {
    html += `<div class="ocean-zone">
      <div><div class="ocean-zone-name">${esc(s.name)}</div>
      <div style="font-size:11px;color:var(--text-dim)">${esc(s.area)} &middot; ${esc(s.notes)}</div></div>
      <div class="ocean-zone-value">Cap: ${s.capacity}</div>
    </div>`;
  });

  return html;
}
