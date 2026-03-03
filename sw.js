const CACHE_NAME = 'oahu-map-v11';
const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './css/ar.css',
  './css/features.css',
  './js/app.js',
  './js/data.js',
  './js/spots.js',
  './js/oahu-outline.js',
  './data/neighborhoods.geojson',
  './js/core/event-bus.js',
  './js/core/map-registry.js',
  './js/core/storage.js',
  './js/core/panel-manager.js',
  './js/core/api-fetcher.js',
  './js/core/time-context.js',
  './js/core/popup-builder.js',
  './js/feature-loader.js',
  './js/data/cultural-calendar.js',
  './js/data/etiquette.js',
  './js/data/slang-pronunciation.js',
  './js/data/ocean-static.js',
  './js/data/safety-data.js',
  './js/features/cultural-calendar.js',
  './js/features/etiquette.js',
  './js/features/slang-guide.js',
  './js/features/right-now.js',
  './js/features/ocean-dashboard.js',
  './js/features/weather-microclimate.js',
  './js/features/safety-emergency.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/@turf/turf@6/turf.min.js',
  'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,700;1,9..40,400&family=Playfair+Display:wght@700;900&display=swap'
];

// Install: cache all static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first for static assets, network-first for map tiles
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Map tiles: network-first with cache fallback
  if (url.hostname.includes('basemaps.cartocdn.com')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Google Fonts resources: stale-while-revalidate
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        const fetched = fetch(event.request).then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        });
        return cached || fetched;
      })
    );
    return;
  }

  // NOAA/NWS APIs: network-first with cache fallback
  if (url.hostname.includes('ndbc.noaa.gov') || url.hostname.includes('api.weather.gov') || url.hostname.includes('tidesandcurrents.noaa.gov')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // App files (same origin): network-first with cache fallback
  // This ensures updates are picked up quickly while still working offline
  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Everything else (third-party CDN): cache-first
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
