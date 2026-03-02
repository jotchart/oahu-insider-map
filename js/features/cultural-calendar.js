// ── Feature: Seasonal & Cultural Calendar ──
// Shows farmers markets, cultural events, fruit seasons in popups and panel

import { bus } from '../core/event-bus.js';
import { getMap, registerFeatureLayer } from '../core/map-registry.js';
import { registerPopupSection } from '../core/popup-builder.js';
import { registerPanel, openPanel, closePanel, isPanelOpen } from '../core/panel-manager.js';
import { getTimeContext } from '../core/time-context.js';
import { FARMERS_MARKETS, CULTURAL_EVENTS, FRUIT_SEASONS, SWELL_SEASONS, WHALE_SEASON } from '../data/cultural-calendar.js';

let marketLayer = null;

function esc(s) { const el = document.createElement('span'); el.textContent = s; return el.innerHTML; }

export async function init() {
  // Register popup section for neighborhoods
  registerPopupSection({
    id: 'cultural-calendar',
    position: 'after-insider',
    render: (data, type) => {
      if (type !== 'neighborhood') return '';
      const ctx = getTimeContext();
      const items = [];

      // Today's farmers markets near this neighborhood
      const todayMarkets = FARMERS_MARKETS.filter(m => m.day === ctx.dayOfWeek && m.area === data.name);
      todayMarkets.forEach(m => {
        items.push(`<div class="calendar-item"><span class="calendar-item-icon">&#127793;</span> ${esc(m.name)} today ${esc(m.hours)}</div>`);
      });

      // Fruit in season
      const inSeason = FRUIT_SEASONS.filter(f => f.months.includes(ctx.month)).slice(0, 3);
      if (inSeason.length > 0) {
        const fruitNames = inSeason.map(f => f.peak.includes(ctx.month) ? `<strong>${esc(f.name)}</strong>` : esc(f.name)).join(', ');
        items.push(`<div class="calendar-item"><span class="calendar-item-icon">&#127819;</span> In season: ${fruitNames}</div>`);
      }

      // Whale season
      if (WHALE_SEASON.months.includes(ctx.month)) {
        const peak = WHALE_SEASON.peak.includes(ctx.month) ? ' (peak!)' : '';
        items.push(`<div class="calendar-item"><span class="calendar-item-icon">&#128011;</span> Whale season${peak}</div>`);
      }

      // Upcoming events near this area
      const areaEvents = CULTURAL_EVENTS.filter(e => {
        if (e.month === -1) return false; // monthly events
        return (e.area === data.name || e.area === data.region) && (e.month === ctx.month || e.month === ctx.month + 1);
      }).slice(0, 2);
      areaEvents.forEach(e => {
        items.push(`<div class="calendar-item"><span class="calendar-item-icon">&#127881;</span> ${esc(e.name)}</div>`);
      });

      if (items.length === 0) return '';
      return `<div class="popup-calendar"><div class="calendar-label">Happening Now</div>${items.join('')}</div>`;
    }
  });

  // Register panel
  registerPanel('cultural-calendar', {
    title: 'Seasonal Calendar',
    render: () => renderCalendarPanel()
  });

  // Wire up pill
  const pill = document.getElementById('calendarPill');
  if (pill) {
    pill.addEventListener('click', () => {
      if (isPanelOpen('cultural-calendar')) {
        closePanel();
        pill.setAttribute('aria-pressed', 'false');
      } else {
        openPanel('cultural-calendar');
        pill.setAttribute('aria-pressed', 'true');
        showMarketMarkers();
      }
    });

    bus.on('panel:closed', () => pill.setAttribute('aria-pressed', 'false'));
  }
}

function showMarketMarkers() {
  const map = getMap();
  if (!map) return;

  // Remove existing
  if (marketLayer) {
    map.removeLayer(marketLayer);
    marketLayer = null;
  }

  const ctx = getTimeContext();
  const todayMarkets = FARMERS_MARKETS.filter(m => m.day === ctx.dayOfWeek);

  if (todayMarkets.length === 0) return;

  const markers = todayMarkets.map(m => {
    const marker = L.circleMarker([m.lat, m.lng], {
      radius: 7,
      fillColor: '#ffb74d',
      fillOpacity: 0.9,
      color: '#fff',
      weight: 1.5
    });
    marker.bindPopup(`<div class="popup-inner"><div class="popup-name">${esc(m.name)}</div><div class="popup-region">${esc(m.area)} &middot; ${esc(m.hours)}</div><div class="popup-desc">${esc(m.tips)}</div></div>`, { maxWidth: 280 });
    return marker;
  });

  marketLayer = L.layerGroup(markers).addTo(map);
  registerFeatureLayer('calendar-markets', marketLayer);
}

function renderCalendarPanel() {
  const ctx = getTimeContext();
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  let html = '';

  // Today's markets
  const todayMarkets = FARMERS_MARKETS.filter(m => m.day === ctx.dayOfWeek);
  html += `<div class="ocean-section-title">&#127793; Today's Farmers Markets (${dayNames[ctx.dayOfWeek]})</div>`;
  if (todayMarkets.length > 0) {
    todayMarkets.forEach(m => {
      html += `<div class="ocean-zone"><div><div class="ocean-zone-name">${esc(m.name)}</div><div style="font-size:11px;color:var(--text-dim)">${esc(m.area)}</div></div><div class="ocean-zone-value">${esc(m.hours)}</div></div>`;
    });
  } else {
    html += `<div style="font-size:12px;color:var(--text-dim);padding:8px 0">No markets today. Check back another day!</div>`;
  }

  // Fruit in season
  html += `<div class="ocean-section-title">&#127819; Fruit in Season (${monthNames[ctx.month]})</div>`;
  const inSeason = FRUIT_SEASONS.filter(f => f.months.includes(ctx.month));
  if (inSeason.length > 0) {
    inSeason.forEach(f => {
      const peak = f.peak.includes(ctx.month) ? ' <span style="color:#69f0ae;font-weight:700">PEAK</span>' : '';
      html += `<div class="ocean-zone"><div><div class="ocean-zone-name">${esc(f.name)}${peak}</div><div style="font-size:11px;color:var(--text-dim)">${esc(f.tips)}</div></div></div>`;
    });
  }

  // Swell season
  html += `<div class="ocean-section-title">&#127754; Swell Season</div>`;
  for (const [key, info] of Object.entries(SWELL_SEASONS)) {
    const active = info.months.includes(ctx.month);
    const badge = active ? '<span style="color:#69f0ae;font-weight:700"> ACTIVE</span>' : '';
    html += `<div class="ocean-zone"><div><div class="ocean-zone-name">${esc(info.label)}${badge}</div><div style="font-size:11px;color:var(--text-dim)">${esc(info.desc)}</div></div></div>`;
  }

  // Whale season
  html += `<div class="ocean-section-title">&#128011; Whale Season</div>`;
  const whaleActive = WHALE_SEASON.months.includes(ctx.month);
  const whalePeak = WHALE_SEASON.peak.includes(ctx.month);
  if (whaleActive) {
    html += `<div class="ocean-zone"><div><div class="ocean-zone-name" style="color:#69f0ae">${whalePeak ? 'Peak Whale Season!' : 'Whale Season Active'}</div><div style="font-size:11px;color:var(--text-dim)">${esc(WHALE_SEASON.tips)}</div></div></div>`;
  } else {
    html += `<div style="font-size:12px;color:var(--text-dim);padding:8px 0">${esc(WHALE_SEASON.desc)}</div>`;
  }

  // Upcoming cultural events
  html += `<div class="ocean-section-title">&#127881; Cultural Events</div>`;
  const upcoming = CULTURAL_EVENTS
    .filter(e => e.month === -1 || e.month === ctx.month || e.month === (ctx.month + 1) % 12 || e.month === (ctx.month + 2) % 12)
    .slice(0, 10);
  upcoming.forEach(e => {
    const monthLabel = e.month === -1 ? 'Monthly' : monthNames[e.month];
    html += `<div class="ocean-zone"><div><div class="ocean-zone-name">${esc(e.name)}</div><div style="font-size:11px;color:var(--text-dim)">${esc(e.area)} &middot; ${monthLabel}</div><div style="font-size:11px;color:var(--text-dim)">${esc(e.desc)}</div></div></div>`;
  });

  return html;
}
