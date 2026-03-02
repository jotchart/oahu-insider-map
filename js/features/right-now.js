// ── Feature: "Right Now" Contextual Intelligence ──
// Live surf, wind, tide, sunset data from NOAA APIs

import { bus } from '../core/event-bus.js';
import { getTimeContext } from '../core/time-context.js';
import { cachedFetch, cachedFetchText } from '../core/api-fetcher.js';
import { registerPopupSection } from '../core/popup-builder.js';

const BUOY_URL = 'https://www.ndbc.noaa.gov/data/realtime2/51201.txt';
const TIDE_STATION = '1612340'; // Honolulu
const TIDE_URL = `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=today&station=${TIDE_STATION}&product=predictions&datum=MLLW&time_zone=lst_ldt&interval=hilo&units=english&format=json`;
const WIND_URL = 'https://api.weather.gov/stations/PHNL/observations/latest';

let surfData = null;
let windData = null;
let tideData = null;
let sunData = null;

function esc(s) { const el = document.createElement('span'); el.textContent = s; return el.innerHTML; }

export async function init() {
  // Fetch all data in parallel
  const [surfResult, windResult, tideResult] = await Promise.allSettled([
    fetchSurf(),
    fetchWind(),
    fetchTide()
  ]);

  // Compute sunset
  const ctx = getTimeContext();
  sunData = ctx.sunset;

  // Update the Right Now bar
  updateBar();

  // Show the bar
  const bar = document.getElementById('rightNowBar');
  if (bar) bar.style.display = '';

  // Register popup sections for beaches and snorkel spots
  registerPopupSection({
    id: 'right-now-conditions',
    position: 'after-header',
    render: (data, type) => {
      if (type !== 'spot') return '';
      if (data.category !== 'beach' && data.category !== 'snorkel') return '';
      return renderSpotConditions(data);
    }
  });

  // Refresh every 30 minutes, but skip when app is backgrounded
  setInterval(async () => {
    if (document.hidden) return;
    await Promise.allSettled([fetchSurf(), fetchWind(), fetchTide()]);
    const freshCtx = getTimeContext();
    sunData = freshCtx.sunset;
    updateBar();
  }, 30 * 60 * 1000);
}

async function fetchSurf() {
  try {
    const text = await cachedFetchText(BUOY_URL, { ttlMinutes: 30, fallbackData: null });
    if (!text) return;
    const lines = text.trim().split('\n');
    if (lines.length < 3) return;
    // Parse the latest data line (3rd line, after 2 header lines)
    const parts = lines[2].trim().split(/\s+/);
    if (parts.length >= 9) {
      surfData = {
        waveHeight: parseFloat(parts[8]), // meters — WVHT
        dominantPeriod: parseFloat(parts[9]), // seconds — DPD
        direction: parts[11] || '--', // MWD
      };
    }
  } catch (e) {
    console.warn('[right-now] Surf fetch error:', e);
  }
}

async function fetchWind() {
  try {
    const data = await cachedFetch(WIND_URL, { ttlMinutes: 30, fallbackData: null });
    if (!data || !data.properties) return;
    const props = data.properties;
    windData = {
      speed: props.windSpeed?.value != null ? Math.round(props.windSpeed.value * 0.621371) : null, // m/s to mph
      direction: props.windDirection?.value || null,
      gust: props.windGust?.value != null ? Math.round(props.windGust.value * 0.621371) : null,
    };
  } catch (e) {
    console.warn('[right-now] Wind fetch error:', e);
  }
}

async function fetchTide() {
  try {
    const data = await cachedFetch(TIDE_URL, { ttlMinutes: 60, fallbackData: null });
    if (!data || !data.predictions) return;
    const now = new Date();
    // Find next tide event
    const upcoming = data.predictions.find(p => new Date(p.t) > now);
    if (upcoming) {
      const time = new Date(upcoming.t);
      const h = time.getHours();
      const m = time.getMinutes();
      const period = h >= 12 ? 'pm' : 'am';
      const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
      tideData = {
        type: parseFloat(upcoming.v) > 1 ? 'High' : 'Low',
        time: `${h12}:${m.toString().padStart(2, '0')}${period}`,
        height: parseFloat(upcoming.v).toFixed(1),
      };
    }
  } catch (e) {
    console.warn('[right-now] Tide fetch error:', e);
  }
}

function updateBar() {
  // Surf
  const rnSurf = document.getElementById('rnSurf');
  if (rnSurf) {
    if (surfData && surfData.waveHeight) {
      const ft = (surfData.waveHeight * 3.281).toFixed(1);
      rnSurf.textContent = `${ft}ft @ ${surfData.dominantPeriod}s`;
    } else {
      rnSurf.textContent = 'No data';
    }
  }

  // Wind
  const rnWind = document.getElementById('rnWind');
  if (rnWind) {
    if (windData && windData.speed != null) {
      const dir = windData.direction != null ? degToCompass(windData.direction) : '';
      const gust = windData.gust ? ` (G${windData.gust})` : '';
      rnWind.textContent = `${dir} ${windData.speed}mph${gust}`;
    } else {
      rnWind.textContent = 'No data';
    }
  }

  // Sunset
  const rnSunset = document.getElementById('rnSunset');
  if (rnSunset) {
    rnSunset.textContent = sunData ? sunData.formatted : '--';
  }

  // Tide
  const rnTide = document.getElementById('rnTide');
  if (rnTide) {
    if (tideData) {
      rnTide.textContent = `${tideData.type} ${tideData.time} (${tideData.height}ft)`;
    } else {
      rnTide.textContent = 'No data';
    }
  }

  // Alert check
  checkAlerts();
}

function checkAlerts() {
  const alertEl = document.getElementById('rnAlert');
  if (!alertEl) return;

  const alerts = [];

  // High surf alert
  if (surfData && surfData.waveHeight > 3) { // > ~10ft
    alerts.push('High Surf Warning');
  }

  // Strong wind alert
  if (windData && windData.speed > 25) {
    alerts.push('Strong Winds');
  }

  if (alerts.length > 0) {
    alertEl.style.display = '';
    alertEl.innerHTML = `<span class="rn-icon">&#9888;&#65039;</span> ${alerts.join(' | ')}`;
  } else {
    alertEl.style.display = 'none';
  }
}

function renderSpotConditions(spot) {
  const items = [];

  if (spot.category === 'beach' || spot.category === 'snorkel') {
    // Tide info
    if (tideData) {
      items.push(`<span>&#127754; Next ${tideData.type.toLowerCase()} tide: ${tideData.time}</span>`);
    }

    // Wind for snorkel spots
    if (spot.category === 'snorkel' && windData && windData.speed != null) {
      const quality = windData.speed < 10 ? 'Good visibility' : windData.speed < 20 ? 'Moderate chop' : 'Poor conditions';
      items.push(`<span>&#128168; ${quality} (${windData.speed}mph wind)</span>`);
    }

    // Surf for beach spots
    if (spot.category === 'beach' && surfData && surfData.waveHeight) {
      const ft = (surfData.waveHeight * 3.281).toFixed(1);
      items.push(`<span>&#127754; Buoy: ${ft}ft @ ${surfData.dominantPeriod}s</span>`);
    }

    // Sunset
    if (sunData) {
      items.push(`<span>&#127749; Sunset: ${sunData.formatted}</span>`);
    }
  }

  if (items.length === 0) return '';
  return `<div class="popup-calendar"><div class="calendar-label">Right Now</div>${items.map(i => `<div class="calendar-item">${i}</div>`).join('')}</div>`;
}

function degToCompass(deg) {
  const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  return dirs[Math.round(deg / 22.5) % 16];
}

// Export for ocean dashboard to share data
export function getSurfData() { return surfData; }
export function getWindData() { return windData; }
export function getTideData() { return tideData; }
