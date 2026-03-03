import { SCORE_COLORS, NEIGHBORHOODS } from './data.js';
import { OAHU_OUTLINE } from './oahu-outline.js';
import { AREngine } from './ar/ar-engine.js';
import { SPOTS, SPOT_CATEGORIES, TIER_CONFIG } from './spots.js';
import { bus } from './core/event-bus.js';
import { registerMap, registerMarkers, registerPolygonLayers, registerMarkerByKey, registerSpotMarkerByKey, registerSpotLayerGroups } from './core/map-registry.js';
import { buildNeighborhoodPopup, buildSpotPopup } from './core/popup-builder.js';
import { initPanelManager } from './core/panel-manager.js';

// ── Helpers ──
function esc(str) {
  const el = document.createElement('span');
  el.textContent = str;
  return el.innerHTML;
}

// ── Map Init ──
const map = L.map('map', {
  center: [21.46, -157.97],
  zoom: 11,
  zoomControl: false
});

L.control.zoom({ position: 'topright' }).addTo(map);

const tileNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap &middot; &copy; CARTO',
  maxZoom: 19
});
const tileWithLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap &middot; &copy; CARTO',
  maxZoom: 19
});
tileNoLabels.addTo(map);

// ── Register map in core registry ──
registerMap(map);

// ── Init panel manager ──
const panelContainer = document.getElementById('panelContainer');
if (panelContainer) initPanelManager(panelContainer);

// ── Load GeoJSON Boundaries ──
let boundaryGeoJSON = null;

async function loadBoundaries() {
  const resp = await fetch('./data/neighborhoods.geojson');
  boundaryGeoJSON = await resp.json();
}

// ── Popup Options ──
const isMobile = window.matchMedia('(max-width: 768px)').matches;
const POPUP_OPTS = {
  maxWidth: isMobile ? 300 : 440,
  closeButton: true,
  autoPan: true,
  autoPanPaddingTopLeft: [10, 80],
  autoPanPaddingBottomRight: [10, isMobile ? 120 : 10]
};

// ── Popup HTML (delegated to popup-builder for extensibility) ──
function getPopupHTML(n, crimeCount) {
  return buildNeighborhoodPopup(n, crimeCount);
}

// ── Match GeoJSON Boundaries to Neighborhoods ──
function matchBoundaries() {
  if (!boundaryGeoJSON) return NEIGHBORHOODS.map(() => null);

  const geoByName = new Map();
  boundaryGeoJSON.features.forEach(f => {
    geoByName.set(f.properties.name, f);
  });

  return NEIGHBORHOODS.map((n, i) => {
    const feature = geoByName.get(n.name);
    if (!feature) return null;
    return { ...feature, properties: { ...n, _index: i } };
  });
}

// ── Create Polygon + Marker Layers ──
const polygonLayers = [];
const markers = [];
const markerByKey = new Map();

function createIcon(score) {
  const color = SCORE_COLORS[score];
  const size = 8 + score * 1.2;
  return L.divIcon({
    className: '',
    html: `<div class="marker-dot" style="width:${size}px;height:${size}px;background:${color};box-shadow:0 0 8px ${color}88,0 2px 6px rgba(0,0,0,0.5)"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
}

async function initNeighborhoods() {
  await loadBoundaries();
  const boundaryFeatures = matchBoundaries();

  // Add polygons first so markers render on top
  boundaryFeatures.forEach((feature, i) => {
    if (!feature) {
      polygonLayers.push(null);
      return;
    }

    const n = NEIGHBORHOODS[i];
    const color = SCORE_COLORS[n.score];

    const layer = L.geoJSON(feature, {
      style: {
        fillColor: color,
        fillOpacity: 0.22,
        color: color,
        weight: 1.5,
        opacity: 0.5
      }
    });

    layer.bindPopup(getPopupHTML(n), POPUP_OPTS);
    layer.data = n;

    // Place label at a guaranteed interior point using Turf.js
    try {
      const interior = turf.pointOnFeature(feature);
      const [lng, lat] = interior.geometry.coordinates;
      const area = turf.area(feature); // m² — for priority sorting
      const label = L.marker([lat, lng], {
        icon: L.divIcon({
          className: 'hood-label',
          html: n.name,
          iconSize: [0, 0],
          iconAnchor: [0, 0]
        }),
        interactive: false
      });
      label._hoodArea = area;
      label._hoodName = n.name;
      label.addTo(map);
      layer._hoodLabel = label;
    } catch (e) { /* skip label if turf fails */ }

    layer.on('mouseover', () => {
      layer.setStyle({ fillOpacity: 0.40, weight: 2.5, opacity: 0.8 });
    });
    layer.on('mouseout', () => {
      layer.setStyle({ fillOpacity: 0.22, weight: 1.5, opacity: 0.5 });
    });

    layer.addTo(map);
    polygonLayers.push(layer);
  });

  // Build marker references (not added to map — polygons serve as the visible layer)
  NEIGHBORHOODS.forEach(n => {
    const marker = L.marker([n.lat, n.lng], { icon: createIcon(n.score) });
    marker.bindPopup(getPopupHTML(n), POPUP_OPTS);
    marker.data = n;
    markers.push(marker);
    markerByKey.set(`${n.lat},${n.lng}`, marker);
  });

  // Register in core registry for features to access
  registerMarkers(markers);
  registerPolygonLayers(polygonLayers);
  registerMarkerByKey(markerByKey);

  applyFilters();
  bus.emit('map:ready', { map });
}

initNeighborhoods().then(() => {
  // Initial declutter after all polygons and labels are on the map
  setTimeout(declutterLabels, 50);
});

// ── Zoom-aware neighborhood labels with decluttering ──
function declutterLabels() {
  const zoom = map.getZoom();
  if (zoom < 11) {
    document.getElementById('map').classList.add('labels-hidden');
    return;
  }
  document.getElementById('map').classList.remove('labels-hidden');

  // Collect all visible labels
  const labels = [];
  polygonLayers.forEach(poly => {
    if (!poly || !poly._hoodLabel || !map.hasLayer(poly._hoodLabel)) return;
    const lbl = poly._hoodLabel;
    const pt = map.latLngToContainerPoint(lbl.getLatLng());
    // Estimate text width: ~6px per char at 10px font, height ~14px
    const w = lbl._hoodName.length * 6 + 8;
    const h = 14;
    labels.push({
      lbl,
      area: lbl._hoodArea || 0,
      x: pt.x - w / 2,
      y: pt.y - h / 2,
      w,
      h
    });
  });

  // Sort by polygon area descending — larger neighborhoods get priority
  labels.sort((a, b) => b.area - a.area);

  const placed = [];
  const PAD = 4; // padding between labels

  labels.forEach(item => {
    // Check collision against already-placed labels
    const collides = placed.some(p =>
      item.x < p.x + p.w + PAD &&
      item.x + item.w + PAD > p.x &&
      item.y < p.y + p.h + PAD &&
      item.y + item.h + PAD > p.y
    );

    const el = item.lbl.getElement();
    if (!el) return;

    if (collides) {
      el.style.display = 'none';
    } else {
      el.style.display = '';
      placed.push(item);
    }
  });
}

map.on('zoomend', declutterLabels);
map.on('moveend', declutterLabels);

// ── Open neighborhood popup via polygon ──
function openNeighborhoodPopup(lat, lng) {
  const key = `${lat},${lng}`;
  const mIdx = markers.findIndex(m => `${m.data.lat},${m.data.lng}` === key);
  if (mIdx !== -1 && polygonLayers[mIdx]) {
    polygonLayers[mIdx].openPopup(L.latLng(lat, lng));
  }
}

// ── Insider Spot Layers ──
function getSpotPopupHTML(s) {
  return buildSpotPopup(s, SPOT_CATEGORIES);
}

function createSpotIcon(spot) {
  const cat = SPOT_CATEGORIES[spot.category];
  const size = 12;
  return L.divIcon({
    className: '',
    html: `<div class="spot-dot" style="width:${size}px;height:${size}px;background:${cat.color}"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
}

// Group spots into LayerGroups by category
const spotLayerGroups = {};
const spotMarkerByKey = new Map();
const allSpotMarkers = [];

// Track active filters
const activeCategories = new Set(Object.keys(SPOT_CATEGORIES));
const activeTiers = new Set(Object.keys(TIER_CONFIG));

Object.keys(SPOT_CATEGORIES).forEach(cat => {
  spotLayerGroups[cat] = L.layerGroup();
});

SPOTS.forEach(s => {
  const marker = L.marker([s.lat, s.lng], { icon: createSpotIcon(s) });
  marker.bindTooltip(s.name, { direction: 'top', offset: [0, -8], className: 'spot-tooltip' });
  marker.bindPopup(getSpotPopupHTML(s), POPUP_OPTS);
  marker.data = s;
  spotLayerGroups[s.category].addLayer(marker);
  spotMarkerByKey.set(`${s.lat},${s.lng}`, marker);
  allSpotMarkers.push(marker);
});

// Add all spot layers to map (all visible by default)
Object.values(spotLayerGroups).forEach(lg => lg.addTo(map));

// Register in core registry
registerSpotLayerGroups(spotLayerGroups);
registerSpotMarkerByKey(spotMarkerByKey);

// Recompute spot visibility based on active categories + tiers
function applySpotFilters() {
  allSpotMarkers.forEach(marker => {
    const s = marker.data;
    const catActive = activeCategories.has(s.category);
    const tierActive = activeTiers.has(s.tier);
    const lg = spotLayerGroups[s.category];

    if (catActive && tierActive) {
      if (!lg.hasLayer(marker)) lg.addLayer(marker);
    } else {
      if (lg.hasLayer(marker)) lg.removeLayer(marker);
    }
  });

  // Ensure category layer groups are on the map if category is active
  Object.entries(spotLayerGroups).forEach(([cat, lg]) => {
    if (activeCategories.has(cat)) {
      if (!map.hasLayer(lg)) lg.addTo(map);
    } else {
      if (map.hasLayer(lg)) map.removeLayer(lg);
    }
  });
}

// Wire up spot category toggle pills
document.querySelectorAll('[data-spot]').forEach(pill => {
  pill.addEventListener('click', () => {
    const cat = pill.dataset.spot;
    const isActive = pill.getAttribute('aria-pressed') === 'true';
    pill.setAttribute('aria-pressed', !isActive);

    if (isActive) {
      activeCategories.delete(cat);
    } else {
      activeCategories.add(cat);
    }
    applySpotFilters();
  });
});

// Wire up tier toggle pills
document.querySelectorAll('[data-tier]').forEach(pill => {
  pill.addEventListener('click', () => {
    const tier = pill.dataset.tier;
    const isActive = pill.getAttribute('aria-pressed') === 'true';
    pill.setAttribute('aria-pressed', !isActive);

    if (isActive) {
      activeTiers.delete(tier);
    } else {
      activeTiers.add(tier);
    }
    applySpotFilters();
  });
});

// ── Drawer Toggle ──
const drawer = document.getElementById('drawer');
const drawerBackdrop = document.getElementById('drawerBackdrop');
const menuToggle = document.getElementById('menuToggle');

function openDrawer() {
  drawer.classList.add('open');
  drawerBackdrop.classList.add('open');
  menuToggle.setAttribute('aria-expanded', 'true');
  updateList();
}

function closeDrawer() {
  drawer.classList.remove('open');
  drawerBackdrop.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => {
  if (drawer.classList.contains('open')) closeDrawer();
  else openDrawer();
});

document.getElementById('drawerClose').addEventListener('click', closeDrawer);
drawerBackdrop.addEventListener('click', closeDrawer);

// ── Neighborhood Toggle ──
let neighborhoodVisible = true;
const hoodPill = document.getElementById('hoodPill');

hoodPill.addEventListener('click', () => {
  neighborhoodVisible = !neighborhoodVisible;
  hoodPill.setAttribute('aria-pressed', neighborhoodVisible);
  // Swap tile layers: no labels when hoods on, labels when hoods off
  if (neighborhoodVisible) {
    if (map.hasLayer(tileWithLabels)) map.removeLayer(tileWithLabels);
    if (!map.hasLayer(tileNoLabels)) tileNoLabels.addTo(map);
  } else {
    if (map.hasLayer(tileNoLabels)) map.removeLayer(tileNoLabels);
    if (!map.hasLayer(tileWithLabels)) tileWithLabels.addTo(map);
  }
  applyFilters();
});

// ── Filtering ──
let activeRegion = 'all';
let activeMinScore = 0;
const countDisplay = document.getElementById('countDisplay');
const liveRegion = document.getElementById('liveRegion');

function applyFilters() {
  let count = 0;
  const bounds = [];

  markers.forEach((m, i) => {
    const n = m.data;
    const regionMatch = activeRegion === 'all' || n.region === activeRegion;
    const scoreMatch = n.score >= activeMinScore;
    const visible = neighborhoodVisible && regionMatch && scoreMatch;

    // Track visibility on marker data for list/search
    m._visible = visible;
    if (visible) {
      bounds.push([n.lat, n.lng]);
      count++;
    }

    // Toggle polygon and label
    const poly = polygonLayers[i];
    if (poly) {
      if (visible) {
        if (!map.hasLayer(poly)) poly.addTo(map);
        if (poly._hoodLabel && !map.hasLayer(poly._hoodLabel)) poly._hoodLabel.addTo(map);
      } else {
        if (map.hasLayer(poly)) map.removeLayer(poly);
        if (poly._hoodLabel && map.hasLayer(poly._hoodLabel)) map.removeLayer(poly._hoodLabel);
      }
    }
  });

  countDisplay.textContent = count;
  liveRegion.textContent = `Showing ${count} of ${NEIGHBORHOODS.length} neighborhoods`;

  // Fit map to visible markers
  if (bounds.length > 0 && activeRegion !== 'all') {
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
  }

  updateList();
}

// Region pills
document.querySelectorAll('[data-region]').forEach(pill => {
  pill.addEventListener('click', () => {
    // Toggle: clicking active region pill resets to all
    if (pill.dataset.region !== 'all' && pill.getAttribute('aria-pressed') === 'true') {
      activeRegion = 'all';
    } else {
      activeRegion = pill.dataset.region;
    }
    syncPillStates();
    applyFilters();
  });
});

// Score pills — combinable with region
document.querySelectorAll('[data-minscore]').forEach(pill => {
  pill.addEventListener('click', () => {
    const score = parseInt(pill.dataset.minscore);
    // Toggle off if already active
    activeMinScore = (activeMinScore === score) ? 0 : score;
    syncPillStates();
    applyFilters();
  });
});

function syncPillStates() {
  document.querySelectorAll('[data-region]').forEach(p => {
    p.setAttribute('aria-pressed', p.dataset.region === activeRegion);
  });
  document.querySelectorAll('[data-minscore]').forEach(p => {
    p.setAttribute('aria-pressed', parseInt(p.dataset.minscore) === activeMinScore);
  });
}

// ── Search ──
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchClear = document.getElementById('searchClear');
let searchIndex = -1;

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  searchIndex = -1;

  if (!q) {
    searchResults.classList.remove('open');
    return;
  }

  const nMatches = NEIGHBORHOODS.filter(n =>
    n.name.toLowerCase().includes(q) || n.region.toLowerCase().includes(q)
  ).slice(0, 5);

  const sMatches = SPOTS.filter(s =>
    s.name.toLowerCase().includes(q) || s.area.toLowerCase().includes(q) ||
    s.category.toLowerCase().includes(q) || s.tagline.toLowerCase().includes(q) ||
    (s.mustOrder && s.mustOrder.some(item => item.toLowerCase().includes(q))) ||
    (s.talkStory && s.talkStory.toLowerCase().includes(q))
  ).slice(0, 5);

  if (nMatches.length === 0 && sMatches.length === 0) {
    searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
  } else {
    const nHTML = nMatches.map((n, i) =>
      `<div class="search-result-item" role="option" data-idx="${i}" data-lat="${n.lat}" data-lng="${n.lng}" data-type="neighborhood">
        <div class="sr-score" style="background:${SCORE_COLORS[n.score]}">${n.score}</div>
        <span class="sr-name">${esc(n.name)}</span>
        <span class="sr-region">${esc(n.region)}</span>
      </div>`
    ).join('');

    const sHTML = sMatches.map((s, i) => {
      const cat = SPOT_CATEGORIES[s.category];
      return `<div class="search-result-item" role="option" data-idx="${nMatches.length + i}" data-lat="${s.lat}" data-lng="${s.lng}" data-type="spot">
        <div class="sr-score sr-spot-icon" style="background:${cat.color}">${cat.icon}</div>
        <span class="sr-name">${esc(s.name)}</span>
        <span class="sr-tier-badge tier-badge tier-${s.tier}">${s.tier}</span>
        <span class="sr-region">${esc(s.area)}</span>
      </div>`;
    }).join('');

    searchResults.innerHTML = nHTML + sHTML;
  }
  searchResults.classList.add('open');
});

searchInput.addEventListener('keydown', e => {
  const items = searchResults.querySelectorAll('.search-result-item');
  if (!items.length) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    searchIndex = Math.min(searchIndex + 1, items.length - 1);
    updateSearchHighlight(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    searchIndex = Math.max(searchIndex - 1, 0);
    updateSearchHighlight(items);
  } else if (e.key === 'Enter' && searchIndex >= 0) {
    e.preventDefault();
    items[searchIndex].click();
  } else if (e.key === 'Escape') {
    searchResults.classList.remove('open');
    searchInput.blur();
  }
});

function updateSearchHighlight(items) {
  items.forEach((el, i) => el.setAttribute('aria-selected', i === searchIndex));
}

searchResults.addEventListener('click', e => {
  const item = e.target.closest('.search-result-item');
  if (!item) return;

  const lat = parseFloat(item.dataset.lat);
  const lng = parseFloat(item.dataset.lng);
  const isSpot = item.dataset.type === 'spot';

  // Close search and drawer
  searchInput.value = '';
  searchResults.classList.remove('open');
  closeDrawer();

  if (isSpot) {
    // Ensure the spot's category layer is visible
    const spot = SPOTS.find(s => s.lat === lat && s.lng === lng);
    if (spot) {
      const pill = document.querySelector(`[data-spot="${spot.category}"]`);
      if (pill && pill.getAttribute('aria-pressed') !== 'true') {
        pill.setAttribute('aria-pressed', 'true');
        spotLayerGroups[spot.category].addTo(map);
      }
    }
    map.setView([lat, lng], 15);
    const marker = spotMarkerByKey.get(`${lat},${lng}`);
    if (marker) marker.openPopup();
  } else {
    // Reset filters to show all so the marker is visible
    activeRegion = 'all';
    activeMinScore = 0;
    syncPillStates();
    applyFilters();
    map.setView([lat, lng], 14);
    openNeighborhoodPopup(lat, lng);
  }
});

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  searchResults.classList.remove('open');
  searchInput.focus();
});

// Close search on outside click
document.addEventListener('click', e => {
  if (!e.target.closest('.search-wrap')) {
    searchResults.classList.remove('open');
  }
});

// ── Neighborhood List (inside drawer) ──
const listScroll = document.getElementById('listScroll');

// Event delegation for list items
listScroll.addEventListener('click', e => {
  const item = e.target.closest('.list-item');
  if (!item) return;

  const lat = parseFloat(item.dataset.lat);
  const lng = parseFloat(item.dataset.lng);

  closeDrawer();
  map.setView([lat, lng], 14);
  openNeighborhoodPopup(lat, lng);
});

// Keyboard nav for list items
listScroll.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    const item = e.target.closest('.list-item');
    if (item) {
      e.preventDefault();
      item.click();
    }
  }
});

function updateList() {
  const visible = markers.filter(m => map.hasLayer(m)).map(m => m.data);
  visible.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));

  listScroll.innerHTML = visible.map(n =>
    `<div class="list-item" tabindex="0" role="button" data-lat="${n.lat}" data-lng="${n.lng}">
      <div class="list-score" style="background:${SCORE_COLORS[n.score]}">${n.score}</div>
      <div class="list-info">
        <h3>${esc(n.name)}</h3>
        <div class="list-region">${esc(n.region)}</div>
        <p>${esc(n.desc)}</p>
      </div>
    </div>`
  ).join('');
}

// ── PWA Install ──
let deferredPrompt;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installBanner').classList.add('show');
});

document.getElementById('installBtn').addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
  }
  document.getElementById('installBanner').classList.remove('show');
});

document.getElementById('dismissBtn').addEventListener('click', () => {
  document.getElementById('installBanner').classList.remove('show');
});

// ── GPS "I'm Here" Dot ──
const gpsBtn = document.getElementById('gpsBtn');
let gpsWatchId = null;
let gpsDot = null;
let gpsAccuracyCircle = null;
let gpsFirstFix = true;
let gpsPosition = null;

function startGPSWatch() {
  if (gpsWatchId !== null) return;
  if (!navigator.geolocation) {
    gpsBtn.classList.add('gps-error');
    return;
  }
  gpsBtn.classList.add('gps-active');

  gpsWatchId = navigator.geolocation.watchPosition(
    (pos) => {
      gpsPosition = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
      };
      updateGPSDot();
      bus.emit('gps:position', gpsPosition);
      if (gpsFirstFix) {
        gpsFirstFix = false;
        map.setView([gpsPosition.lat, gpsPosition.lng], 14);
      }
    },
    (err) => {
      console.warn('GPS error:', err.message);
      gpsBtn.classList.add('gps-error');
      gpsBtn.classList.remove('gps-active');
    },
    { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 }
  );
}

function updateGPSDot() {
  if (!gpsPosition) return;
  const latlng = [gpsPosition.lat, gpsPosition.lng];

  if (!gpsDot) {
    gpsDot = L.marker(latlng, {
      icon: L.divIcon({
        className: '',
        html: '<div class="gps-dot"><div class="gps-dot-ring"></div></div>',
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      }),
      zIndexOffset: 1000,
      interactive: false,
    }).addTo(map);

    gpsAccuracyCircle = L.circle(latlng, {
      radius: gpsPosition.accuracy,
      fillColor: '#4a90d9',
      fillOpacity: 0.10,
      color: '#4a90d9',
      weight: 1,
      opacity: 0.25,
      interactive: false,
    }).addTo(map);
  } else {
    gpsDot.setLatLng(latlng);
    gpsAccuracyCircle.setLatLng(latlng);
    gpsAccuracyCircle.setRadius(gpsPosition.accuracy);
  }
}

function stopGPSWatch() {
  if (gpsWatchId !== null) {
    navigator.geolocation.clearWatch(gpsWatchId);
    gpsWatchId = null;
  }
  if (gpsDot) { map.removeLayer(gpsDot); gpsDot = null; }
  if (gpsAccuracyCircle) { map.removeLayer(gpsAccuracyCircle); gpsAccuracyCircle = null; }
  gpsFirstFix = true;
  gpsBtn.classList.remove('gps-active');
}

gpsBtn.addEventListener('click', () => {
  if (gpsWatchId !== null) {
    if (gpsPosition) {
      map.setView([gpsPosition.lat, gpsPosition.lng], 15);
    }
  } else {
    startGPSWatch();
  }
});

// Pause GPS when app is backgrounded to save battery
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (gpsWatchId !== null) {
      navigator.geolocation.clearWatch(gpsWatchId);
      gpsWatchId = null;
    }
  } else {
    // Resume GPS if it was active (button still shows active state)
    if (gpsBtn.classList.contains('gps-active') && gpsWatchId === null) {
      gpsFirstFix = false; // don't re-center on resume
      gpsWatchId = navigator.geolocation.watchPosition(
        (pos) => {
          gpsPosition = { lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy };
          updateGPSDot();
          bus.emit('gps:position', gpsPosition);
        },
        () => {},
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 }
      );
    }
  }
});

// ── Walking Isochrone ──
let isochroneLayers = [];
let isochroneActiveKey = null;

const WALK_RINGS = [
  { minutes: 10, radiusMiles: 0.5, opacity: 0.22 },
  { minutes: 20, radiusMiles: 1.0, opacity: 0.14 },
  { minutes: 30, radiusMiles: 1.5, opacity: 0.08 },
];

function clearIsochrone() {
  isochroneLayers.forEach(l => map.removeLayer(l));
  isochroneLayers = [];
  isochroneActiveKey = null;
}

function showIsochrone(lat, lng) {
  const key = `${lat},${lng}`;
  if (isochroneActiveKey === key) {
    clearIsochrone();
    return;
  }
  clearIsochrone();
  isochroneActiveKey = key;

  const center = turf.point([lng, lat]);
  const oahuPoly = turf.polygon([OAHU_OUTLINE]);

  WALK_RINGS.forEach(ring => {
    const radiusKm = ring.radiusMiles * 1.60934;
    const buffered = turf.buffer(center, radiusKm, { units: 'kilometers', steps: 64 });
    let displayPoly;
    try {
      displayPoly = turf.intersect(buffered, oahuPoly);
    } catch {
      displayPoly = buffered;
    }
    if (!displayPoly) return;

    const layer = L.geoJSON(displayPoly, {
      style: {
        fillColor: '#4a90d9',
        fillOpacity: ring.opacity,
        color: '#4a90d9',
        weight: 1.5,
        opacity: 0.45,
        dashArray: '6 4',
      },
      interactive: false,
    }).addTo(map);

    const bbox = turf.bbox(displayPoly);
    const labelLat = bbox[3];
    const labelLng = (bbox[0] + bbox[2]) / 2;
    const label = L.marker([labelLat, labelLng], {
      icon: L.divIcon({
        className: '',
        html: `<div class="isochrone-label">${ring.minutes} min walk</div>`,
        iconSize: [70, 18],
        iconAnchor: [35, 18],
      }),
      interactive: false,
    }).addTo(map);

    isochroneLayers.push(layer, label);
  });
}

window._showIsochrone = showIsochrone;

// ── Crime Heat Layer ──
const crimePill = document.getElementById('crimePill');
let crimeActive = false;
let crimeDataLoaded = false;
let crimeCounts = {};
let crimeMax = 0;

const CRIME_API = 'https://data.honolulu.gov/resource/vg88-5rn5.json';
const CRIME_CACHE_KEY = 'oahu_crime_counts_v2';

// Hawaii address prefix → approximate [lat, lng] for 5+ digit block addresses
const _PREFIX_COORDS = {
  '41':[21.347,-157.697],'42':[21.347,-157.697],
  '43':[21.389,-157.740],'44':[21.418,-157.793],'45':[21.418,-157.793],'46':[21.418,-157.793],
  '47':[21.448,-157.828],'48':[21.452,-157.815],
  '51':[21.533,-157.847],'52':[21.533,-157.847],'53':[21.558,-157.894],'54':[21.558,-157.894],
  '55':[21.641,-157.923],'56':[21.680,-157.942],
  '58':[21.670,-158.010],'59':[21.585,-158.103],
  '66':[21.577,-158.102],'67':[21.570,-158.128],'68':[21.572,-158.170],
  '84':[21.435,-158.174],'85':[21.443,-158.190],'86':[21.470,-158.213],
  '87':[21.393,-158.142],'88':[21.393,-158.142],'89':[21.378,-158.128],
  '91':[21.318,-158.007],'92':[21.337,-158.062],
  '94':[21.380,-158.005],'95':[21.447,-158.018],
  '96':[21.391,-157.973],'97':[21.405,-157.938],'98':[21.382,-157.935],'99':[21.372,-157.917],
};

// Street keyword → approximate [lat, lng] for metro Honolulu addresses
const _STREET_COORDS = {
  'KALAKAUA':[21.277,-157.827],'KUHIO':[21.279,-157.826],'LEWERS':[21.279,-157.832],
  'KALIA':[21.283,-157.835],'SARATOGA':[21.280,-157.831],'SEASIDE':[21.278,-157.827],
  'ALA WAI':[21.281,-157.828],'ROYAL HAWAIIAN':[21.278,-157.831],
  'ALA MOANA':[21.291,-157.844],'KEEAUMOKU':[21.296,-157.840],
  'PIIKOI':[21.299,-157.840],'KAPIOLANI':[21.289,-157.838],
  'AUAHI':[21.293,-157.859],'WARD':[21.296,-157.856],'CORAL':[21.295,-157.858],
  'QUEEN':[21.299,-157.860],'HALEKAUWILA':[21.300,-157.858],
  'S KING':[21.304,-157.855],'N KING':[21.315,-157.870],
  'S BERETANIA':[21.308,-157.852],'N BERETANIA':[21.311,-157.858],'BERETANIA':[21.308,-157.852],
  'PUNCHBOWL':[21.312,-157.857],'HOTEL':[21.313,-157.862],'MAUNAKEA':[21.313,-157.864],
  'RIVER':[21.315,-157.863],'NIMITZ':[21.315,-157.880],'VINEYARD':[21.315,-157.857],
  'WAIALAE':[21.279,-157.792],'KAPAHULU':[21.273,-157.813],
  'UNIVERSITY':[21.297,-157.819],'DOLE':[21.298,-157.822],
  'NUUANU':[21.320,-157.858],'PALI':[21.338,-157.843],
  'LILIHA':[21.325,-157.862],'SCHOOL':[21.321,-157.863],
  'RODGERS':[21.331,-157.922],'FORT WEAVER':[21.335,-158.018],
  'MONSARRAT':[21.267,-157.817],'LIKELIKE':[21.370,-157.840],
  'WAIMANO HOME':[21.407,-157.951],'KAMEHAMEHA':[21.395,-157.960],
  'KAM IV':[21.337,-157.871],'KAM HWY':[21.395,-157.960],
  'MOANALUA':[21.365,-157.910],'KAONOHI':[21.407,-157.966],
  'KAAHUMANU':[21.392,-157.935],'KUALA':[21.405,-157.960],
  'MEHEULA':[21.447,-158.018],'KAMOKILA':[21.337,-158.062],
  'KAPOLEI':[21.337,-158.062],'FARRINGTON':[21.390,-158.020],
  'KUULEI':[21.394,-157.742],'N CANE':[21.395,-158.005],'CANE':[21.395,-158.005],
  'PUNAHOU':[21.298,-157.830],'PENSACOLA':[21.302,-157.845],
  'KINAU':[21.305,-157.846],'WILDER':[21.303,-157.836],
  'YOUNG':[21.302,-157.850],'KALIHI':[21.332,-157.870],
};

function _geocodeAddress(addr) {
  const match = addr.match(/^(\d+)\s+BLOCK\s+(.+)$/);
  if (!match) return null;
  const blockNum = match[1];
  const street = match[2];

  // 5+ digit addresses use Hawaii prefix system
  if (blockNum.length >= 5) {
    const prefix = blockNum.substring(0, 2);
    if (_PREFIX_COORDS[prefix]) return _PREFIX_COORDS[prefix];
  }

  // Metro addresses: match street keyword (longest match first)
  for (const [key, coords] of Object.entries(_STREET_COORDS)) {
    if (street.includes(key)) return coords;
  }
  return null;
}

function haversineQuick(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * 0.01745329;
  const dLng = (lng2 - lng1) * 0.01745329;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * 0.01745329) * Math.cos(lat2 * 0.01745329) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function fetchCrimeData() {
  // Check localStorage cache (persistent across sessions)
  const cached = localStorage.getItem(CRIME_CACHE_KEY);
  if (cached) {
    try { return JSON.parse(cached); } catch { /* fall through */ }
  }

  try {
    // Fetch block addresses from HPD data (no lat/lng in this dataset)
    const url = `${CRIME_API}?$select=blockaddress&$limit=50000&$where=blockaddress IS NOT NULL`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();

    // Geocode and assign to neighborhoods
    const counts = {};
    NEIGHBORHOODS.forEach((_, i) => { counts[i] = 0; });
    let matched = 0;

    data.forEach(c => {
      const coords = _geocodeAddress(c.blockaddress || '');
      if (!coords) return;

      let minDist = Infinity;
      let minIdx = 0;
      NEIGHBORHOODS.forEach((n, i) => {
        const d = haversineQuick(coords[0], coords[1], n.lat, n.lng);
        if (d < minDist) { minDist = d; minIdx = i; }
      });
      counts[minIdx]++;
      matched++;
    });

    console.log(`Crime data: ${matched}/${data.length} incidents geocoded to neighborhoods`);
    localStorage.setItem(CRIME_CACHE_KEY, JSON.stringify(counts));
    return counts;
  } catch (err) {
    console.error('Crime data fetch failed:', err);
    return null;
  }
}

function crimeColor(count, max) {
  const t = max > 0 ? count / max : 0;
  if (t < 0.5) {
    const s = t * 2;
    return `rgb(${Math.round(60 + s * 195)},${Math.round(80 + s * 176)},${Math.round(200 - s * 100)})`;
  }
  const s = (t - 0.5) * 2;
  return `rgb(255,${Math.round(255 - s * 200)},${Math.round(100 - s * 100)})`;
}

async function toggleCrimeLayer() {
  crimeActive = !crimeActive;
  crimePill.setAttribute('aria-pressed', crimeActive);

  if (crimeActive) {
    if (!crimeDataLoaded) {
      crimePill.textContent = 'Loading...';
      const counts = await fetchCrimeData();
      if (!counts) {
        crimePill.textContent = 'Crime (unavailable)';
        crimeActive = false;
        crimePill.setAttribute('aria-pressed', false);
        return;
      }
      crimeCounts = counts;
      crimeMax = Math.max(...Object.values(crimeCounts));
      crimeDataLoaded = true;
      crimePill.textContent = 'Crime';
    }

    polygonLayers.forEach((poly, i) => {
      if (!poly) return;
      const count = crimeCounts[i] || 0;
      const color = crimeColor(count, crimeMax);
      poly.setStyle({ fillColor: color, fillOpacity: 0.40, color: color, weight: 1.5, opacity: 0.6 });
      const n = NEIGHBORHOODS[i];
      poly.setPopupContent(getPopupHTML(n, count));
    });
    // Also update marker popups
    markers.forEach((m, i) => {
      const n = m.data;
      m.setPopupContent(getPopupHTML(n, crimeCounts[i] || 0));
    });
  } else {
    polygonLayers.forEach((poly, i) => {
      if (!poly) return;
      const n = NEIGHBORHOODS[i];
      const color = SCORE_COLORS[n.score];
      poly.setStyle({ fillColor: color, fillOpacity: 0.22, color: color, weight: 1.5, opacity: 0.5 });
      poly.setPopupContent(getPopupHTML(n));
    });
    markers.forEach(m => {
      m.setPopupContent(getPopupHTML(m.data));
    });
  }
}

crimePill.addEventListener('click', toggleCrimeLayer);

// ── AR Mode (optional — only if arToggle exists in DOM) ──
const arToggle = document.getElementById('arToggle');
const arContainer = document.getElementById('arContainer');
let arEngine = null;

if (arToggle) {
  const AR_NEIGHBORHOOD_RADIUS = 3; // miles — only adjacent neighborhoods
  const AR_SPOT_RADIUS = 2;         // miles — nearby attractions
  const AR_MAX_LABELS = 15;         // keep it readable

  function neighborhoodToPOI(n) {
    return {
      id: `nb-${n.lat}-${n.lng}`,
      name: n.name,
      lat: n.lat,
      lng: n.lng,
      category: 'neighborhood',
      score: n.score,
      color: SCORE_COLORS[n.score],
      meta: { region: n.region, desc: n.desc, sources: n.sources },
    };
  }

  function spotToPOI(s) {
    const catInfo = SPOT_CATEGORIES[s.category] || {};
    return {
      id: `spot-${s.lat}-${s.lng}`,
      name: `${catInfo.icon || ''} ${s.name}`,
      lat: s.lat,
      lng: s.lng,
      category: s.category,
      score: s.tier === 'S' ? 10 : s.tier === 'A' ? 8 : s.tier === 'B' ? 6 : 4,
      color: catInfo.color || '#ffffff',
      meta: { tier: s.tier, area: s.area, tagline: s.tagline },
    };
  }

  // Build POIs dynamically based on user's current position
  function buildARPois(userLat, userLng) {
    const toRad = Math.PI / 180;
    function quickDist(lat1, lng1, lat2, lng2) {
      const dLat = (lat2 - lat1) * toRad;
      const dLng = (lng2 - lng1) * toRad * Math.cos(((lat1 + lat2) / 2) * toRad);
      return Math.sqrt(dLat * dLat + dLng * dLng) * 3958.8; // miles
    }

    const nearbyHoods = NEIGHBORHOODS
      .filter(n => quickDist(userLat, userLng, n.lat, n.lng) <= AR_NEIGHBORHOOD_RADIUS)
      .map(neighborhoodToPOI);

    const nearbySpots = SPOTS
      .filter(s => quickDist(userLat, userLng, s.lat, s.lng) <= AR_SPOT_RADIUS)
      .map(spotToPOI);

    return [...nearbyHoods, ...nearbySpots];
  }

  const isSecure = location.protocol === 'https:' || location.hostname === 'localhost';
  const hasCamera = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  const hasGeo = !!navigator.geolocation;
  if (isSecure && hasCamera && hasGeo) {
    arToggle.style.display = '';
  }

  arToggle.addEventListener('click', () => {
    if (gpsWatchId !== null) stopGPSWatch();

    // Get user position first, then build nearby POIs
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const pois = buildARPois(pos.coords.latitude, pos.coords.longitude);

        arEngine = new AREngine({
          pois,
          maxLabels: AR_MAX_LABELS,
          maxDistance: AR_NEIGHBORHOOD_RADIUS,
          onViewOnMap: (poi) => {
            arContainer.classList.remove('active');
            map.setView([poi.lat, poi.lng], 14);
            if (poi.id.startsWith('nb-')) {
              openNeighborhoodPopup(poi.lat, poi.lng);
            } else {
              const spotMarker = spotMarkerByKey.get(`${poi.lat},${poi.lng}`);
              if (spotMarker) spotMarker.openPopup();
            }
          },
        });

        // Refresh POIs as user moves — update every 10 seconds
        let arGpsId = null;
        arGpsId = navigator.geolocation.watchPosition(
          (p) => {
            if (arEngine) {
              arEngine.pois = buildARPois(p.coords.latitude, p.coords.longitude);
            }
          },
          () => {},
          { enableHighAccuracy: true, maximumAge: 10000 }
        );

        // Store cleanup reference
        const origStop = arEngine.stop.bind(arEngine);
        arEngine.stop = () => {
          if (arGpsId !== null) navigator.geolocation.clearWatch(arGpsId);
          origStop();
        };

        arContainer.classList.add('active');
        arEngine.start(arContainer);
      },
      () => {
        // Fallback: use all neighborhoods if location fails
        const pois = NEIGHBORHOODS.map(neighborhoodToPOI);
        arEngine = new AREngine({
          pois,
          onViewOnMap: (poi) => {
            arContainer.classList.remove('active');
            map.setView([poi.lat, poi.lng], 14);
            openNeighborhoodPopup(poi.lat, poi.lng);
          },
        });
        arContainer.classList.add('active');
        arEngine.start(arContainer);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
}

// ── Service Worker ──
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}

// ── Load Features ──
// Eager features load immediately and enrich popups
// On-demand features register their pill handlers but don't fetch data until clicked
import('./feature-loader.js').then(async ({ loadEagerFeatures, activateFeature }) => {
  await loadEagerFeatures();
  await activateFeature('ocean-dashboard');
  await activateFeature('weather-microclimate');
  await activateFeature('safety-emergency');
  console.log('[features] All features loaded');
}).catch(err => console.error('[features] Load failed:', err));
