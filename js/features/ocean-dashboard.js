// ── Feature: Ocean Conditions Dashboard ──
// Surf breakdown, jellyfish calendar, lifeguard beaches, water quality

import { registerPanel, openPanel, closePanel, isPanelOpen } from '../core/panel-manager.js';
import { getTimeContext, getJellyfishRisk, getMoonPhase } from '../core/time-context.js';
import { LIFEGUARD_BEACHES, DANGEROUS_SHOREBREAK, RIP_CURRENT_HOTSPOTS, TYPICAL_SURF_CONDITIONS } from '../data/ocean-static.js';
import { loadFeature } from '../feature-loader.js';
import { bus } from '../core/event-bus.js';

function esc(s) { const el = document.createElement('span'); el.textContent = s; return el.innerHTML; }

export async function init() {
  registerPanel('ocean-dashboard', {
    title: 'Ocean Conditions',
    render: () => renderOceanPanel()
  });

  // Wire up pill
  const pill = document.getElementById('oceanPill');
  if (pill) {
    pill.addEventListener('click', async () => {
      if (isPanelOpen('ocean-dashboard')) {
        closePanel();
        pill.setAttribute('aria-pressed', 'false');
      } else {
        await openPanel('ocean-dashboard');
        pill.setAttribute('aria-pressed', 'true');
      }
    });

    bus.on('panel:closed', () => pill.setAttribute('aria-pressed', 'false'));
  }
}

async function renderOceanPanel() {
  const ctx = getTimeContext();
  const jelly = getJellyfishRisk();
  const moon = getMoonPhase(new Date());
  const season = ctx.month >= 4 && ctx.month <= 8 ? 'summer' : 'winter';

  let html = '';

  // Live surf data (shared with right-now feature)
  let surfData = null;
  let windData = null;
  let tideData = null;
  try {
    const rightNow = await loadFeature('right-now');
    if (rightNow) {
      surfData = rightNow.getSurfData?.();
      windData = rightNow.getWindData?.();
      tideData = rightNow.getTideData?.();
    }
  } catch { /* right-now may not be loaded yet */ }

  // Current conditions
  html += `<div class="ocean-section-title">&#127754; Current Conditions</div>`;
  if (surfData && surfData.waveHeight) {
    const ft = (surfData.waveHeight * 3.281).toFixed(1);
    html += `<div class="ocean-zone"><div class="ocean-zone-name">Buoy Swell</div><div class="ocean-zone-value">${ft}ft @ ${surfData.dominantPeriod}s</div></div>`;
  }
  if (windData && windData.speed != null) {
    const dir = windData.direction != null ? degToCompass(windData.direction) : '';
    html += `<div class="ocean-zone"><div class="ocean-zone-name">Wind</div><div class="ocean-zone-value">${dir} ${windData.speed}mph</div></div>`;
  }
  if (tideData) {
    html += `<div class="ocean-zone"><div class="ocean-zone-name">Next Tide</div><div class="ocean-zone-value">${tideData.type} at ${tideData.time} (${tideData.height}ft)</div></div>`;
  }
  if (!surfData && !windData && !tideData) {
    html += `<div style="font-size:12px;color:var(--text-dim);padding:8px 0">Live data unavailable — showing typical conditions</div>`;
  }

  // Regional surf breakdown
  html += `<div class="ocean-section-title">&#128200; Typical Surf by Shore (${season})</div>`;
  for (const [shore, data] of Object.entries(TYPICAL_SURF_CONDITIONS)) {
    const info = data[season];
    html += `<div class="ocean-zone">
      <div><div class="ocean-zone-name">${shore.charAt(0).toUpperCase() + shore.slice(1)} Shore</div>
      <div style="font-size:11px;color:var(--text-dim)">${esc(info.desc)}</div></div>
      <div class="ocean-zone-value">${info.min}-${info.max} ${info.unit}</div>
    </div>`;
  }

  // Jellyfish risk
  html += `<div class="ocean-section-title">&#127800; Box Jellyfish Risk</div>`;
  if (jelly.risk === 'high') {
    html += `<div class="jellyfish-warning">
      <div class="jellyfish-high">&#9888;&#65039; HIGH RISK — Box jellyfish likely on south/leeward shores</div>
      <div style="font-size:11px;color:var(--text-dim);margin-top:4px">Arrives 9-10 days after full moon. Currently ${Math.round(jelly.daysAfterFull)} days post full moon.</div>
      <div style="font-size:11px;color:var(--text-dim);margin-top:4px">Affected: Ala Moana, Waikiki, Hanauma Bay, Ko Olina</div>
    </div>`;
  } else {
    html += `<div class="jellyfish-warning" style="background:rgba(105,240,174,0.08)">
      <div class="jellyfish-low">Low risk — next warning in ~${jelly.daysUntilWarning} days</div>
      <div style="font-size:11px;color:var(--text-dim);margin-top:4px">Box jellyfish arrive on south-facing beaches 9-10 days after the full moon.</div>
    </div>`;
  }

  // Moon phase
  const moonPhaseLabel = moon.isFullMoon ? 'Full Moon' : moon.isNewMoon ? 'New Moon' : `Phase: ${(moon.phase * 100).toFixed(0)}%`;
  html += `<div style="font-size:11px;color:var(--text-dim);padding:4px 0">&#127769; ${moonPhaseLabel} (${Math.round(moon.daysSinceFullMoon)} days since full moon)</div>`;

  // Lifeguard beaches
  html += `<div class="ocean-section-title">&#127987; Lifeguard Beaches</div>`;
  LIFEGUARD_BEACHES.forEach(b => {
    html += `<div class="ocean-zone">
      <div><div class="ocean-zone-name">${esc(b.name)}</div>
      <div style="font-size:11px;color:var(--text-dim)">${esc(b.notes)}</div></div>
      <div class="ocean-zone-value">${esc(b.hours)}</div>
    </div>`;
  });

  // Dangerous spots
  html += `<div class="ocean-section-title">&#9888;&#65039; Dangerous Shorebreak</div>`;
  DANGEROUS_SHOREBREAK.forEach(s => {
    const activeNow = s.months.includes(ctx.month);
    const badge = activeNow ? '<span style="color:var(--accent);font-weight:700"> ACTIVE</span>' : '';
    html += `<div class="ocean-zone" style="flex-direction:column;align-items:flex-start;gap:2px">
      <div class="ocean-zone-name">${esc(s.name)} (${esc(s.severity)})${badge}</div>
      <div style="font-size:11px;color:var(--text-dim)">${esc(s.desc)}</div>
    </div>`;
  });

  return html;
}

function degToCompass(deg) {
  const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  return dirs[Math.round(deg / 22.5) % 16];
}
