// ── Feature: Weather Microclimate Map ──
// NWS forecasts per zone, weather badges on map, smart suggestions

import { bus } from '../core/event-bus.js';
import { getMap, registerFeatureLayer, removeFeatureLayer } from '../core/map-registry.js';
import { registerPanel, openPanel, closePanel, isPanelOpen } from '../core/panel-manager.js';
import { cachedFetch } from '../core/api-fetcher.js';

function esc(s) { const el = document.createElement('span'); el.textContent = s; return el.innerHTML; }

// NWS grid points for Oahu microclimate zones
const ZONES = [
  { name: 'Waikiki', gridX: 153, gridY: 63, lat: 21.280, lng: -157.829, typical: 'Sunny and warm year-round. Afternoon sea breeze. Rarely rains.' },
  { name: 'Windward (Kailua)', gridX: 156, gridY: 66, lat: 21.397, lng: -157.740, typical: 'Frequent brief showers from trade winds. Rainbow capital of Hawaii.' },
  { name: 'North Shore', gridX: 150, gridY: 70, lat: 21.640, lng: -158.063, typical: 'Drier than windward in summer. Winter storms bring rain and huge waves.' },
  { name: 'Ko Olina / Leeward', gridX: 148, gridY: 65, lat: 21.337, lng: -158.122, typical: 'Driest part of Oahu. Sunny almost every day. Hot in summer.' },
  { name: 'Manoa Valley', gridX: 154, gridY: 65, lat: 21.310, lng: -157.803, typical: 'Rainiest neighborhood in Honolulu. Almost daily afternoon showers.' },
  { name: 'Pearl City / Central', gridX: 151, gridY: 66, lat: 21.397, lng: -157.970, typical: 'Hot and humid. Less wind than coast. Occasional valley showers.' },
  { name: 'Kaneohe', gridX: 155, gridY: 67, lat: 21.418, lng: -157.803, typical: 'Very wet — backed up against Ko\'olau Range. Beautiful but rainy.' },
  { name: 'Kapolei / Ewa', gridX: 149, gridY: 64, lat: 21.340, lng: -158.066, typical: 'Dry and hot. Second sunniest zone after Ko Olina.' },
];

let weatherBadgeLayer = null;
let isActive = false;
let forecasts = {};

export async function init() {
  // Register panel
  registerPanel('weather-microclimate', {
    title: 'Weather Microclimates',
    render: () => renderWeatherPanel()
  });

  // Wire up pill
  const pill = document.getElementById('weatherPill');
  if (pill) {
    pill.addEventListener('click', async () => {
      if (isPanelOpen('weather-microclimate')) {
        closePanel();
        pill.setAttribute('aria-pressed', 'false');
        hideBadges();
      } else {
        await fetchForecasts();
        showBadges();
        await openPanel('weather-microclimate');
        pill.setAttribute('aria-pressed', 'true');
      }
    });

    bus.on('panel:closed', () => {
      pill.setAttribute('aria-pressed', 'false');
      hideBadges();
    });
  }
}

async function fetchForecasts() {
  const results = await Promise.allSettled(
    ZONES.map(async zone => {
      const url = `https://api.weather.gov/gridpoints/HFO/${zone.gridX},${zone.gridY}/forecast`;
      const data = await cachedFetch(url, { ttlMinutes: 30, fallbackData: null });
      if (data && data.properties && data.properties.periods) {
        forecasts[zone.name] = data.properties.periods[0]; // current period
      }
    })
  );
}

function showBadges() {
  const map = getMap();
  if (!map) return;

  hideBadges();

  const markers = ZONES.map(zone => {
    const forecast = forecasts[zone.name];
    let label = '';
    let icon = '';

    if (forecast) {
      const temp = forecast.temperature;
      const short = forecast.shortForecast || '';
      icon = getWeatherIcon(short);
      label = `${icon} ${temp}°F`;
    } else {
      label = zone.typical.split('.')[0];
      icon = '☀️';
      label = `${icon} ${zone.name}`;
    }

    const divIcon = L.divIcon({
      html: `<div class="weather-badge">${label}</div>`,
      className: '',
      iconSize: [0, 0],
      iconAnchor: [-5, 15]
    });

    const marker = L.marker([zone.lat, zone.lng], { icon: divIcon, interactive: false });
    return marker;
  });

  weatherBadgeLayer = L.layerGroup(markers).addTo(map);
  registerFeatureLayer('weather-badges', weatherBadgeLayer);
  isActive = true;
}

function hideBadges() {
  if (weatherBadgeLayer) {
    removeFeatureLayer('weather-badges');
    weatherBadgeLayer = null;
  }
  isActive = false;
}

function getWeatherIcon(forecast) {
  const f = forecast.toLowerCase();
  if (f.includes('thunder') || f.includes('storm')) return '&#9928;';
  if (f.includes('rain') || f.includes('shower')) return '&#127783;';
  if (f.includes('cloud') || f.includes('overcast')) return '&#9729;';
  if (f.includes('partly')) return '&#9925;';
  if (f.includes('wind')) return '&#128168;';
  return '&#9728;'; // sunny
}

function renderWeatherPanel() {
  let html = '';

  // Smart suggestion
  const suggestion = getSmartSuggestion();
  if (suggestion) {
    html += `<div class="weather-suggestion">${suggestion}</div>`;
  }

  // Zone forecasts
  html += `<div class="ocean-section-title">&#9925; Microclimate Zones</div>`;
  ZONES.forEach(zone => {
    const forecast = forecasts[zone.name];
    if (forecast) {
      const icon = getWeatherIcon(forecast.shortForecast || '');
      html += `<div class="ocean-zone">
        <div>
          <div class="ocean-zone-name">${icon} ${esc(zone.name)}</div>
          <div style="font-size:11px;color:var(--text-dim)">${esc(forecast.shortForecast || '')}. Wind: ${esc(forecast.windSpeed || '--')} ${esc(forecast.windDirection || '')}</div>
        </div>
        <div class="ocean-zone-value">${forecast.temperature}°F</div>
      </div>`;
    } else {
      html += `<div class="ocean-zone">
        <div>
          <div class="ocean-zone-name">${esc(zone.name)}</div>
          <div style="font-size:11px;color:var(--text-dim)">${esc(zone.typical)}</div>
        </div>
        <div class="ocean-zone-value">--</div>
      </div>`;
    }
  });

  // Microclimate tips
  html += `<div class="ocean-section-title">&#128161; Microclimate Tips</div>`;
  const tips = [
    "Oahu has more microclimates per square mile than almost anywhere on Earth",
    "If it's raining in Manoa, it's probably sunny in Waikiki (10 minutes away)",
    "The Ko'olau Range blocks trade wind moisture — leeward side is drier",
    "North Shore gets winter storms; south shore stays calmer in winter",
    "Elevation matters: Tantalus and Pacific Heights are 5-10°F cooler than sea level",
    "Kona (southerly) winds reverse the normal pattern — leeward gets rain, windward dries out",
  ];
  tips.forEach(tip => {
    html += `<div style="font-size:12px;color:var(--text);padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04)">${esc(tip)}</div>`;
  });

  return html;
}

function getSmartSuggestion() {
  // Check if windward is rainy and leeward is clear
  const windward = forecasts['Windward (Kailua)'];
  const leeward = forecasts['Ko Olina / Leeward'];
  const waikiki = forecasts['Waikiki'];

  if (windward && leeward) {
    const windwardRain = (windward.shortForecast || '').toLowerCase().includes('rain') || (windward.shortForecast || '').toLowerCase().includes('shower');
    const leewardClear = !(leeward.shortForecast || '').toLowerCase().includes('rain');

    if (windwardRain && leewardClear) {
      return `&#128161; Raining on the Windward side? Head to Ko Olina or the Leeward Coast — it's ${leeward.temperature}°F and ${(leeward.shortForecast || 'clear').toLowerCase()} over there.`;
    }
  }

  if (waikiki && waikiki.temperature > 85) {
    return `&#128161; Hot in Waikiki today (${waikiki.temperature}°F). The North Shore and Windward side are typically 5-10° cooler.`;
  }

  return null;
}
