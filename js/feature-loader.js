// ── Feature Loader ──
// Dynamic imports for lazy-loading features on first interaction

const _loaded = new Map();

const FEATURES = {
  'cultural-calendar': () => import('./features/cultural-calendar.js'),
  'etiquette': () => import('./features/etiquette.js'),
  'slang-guide': () => import('./features/slang-guide.js'),
  'right-now': () => import('./features/right-now.js'),
  'ocean-dashboard': () => import('./features/ocean-dashboard.js'),
  'weather-microclimate': () => import('./features/weather-microclimate.js'),
  'safety-emergency': () => import('./features/safety-emergency.js'),
  'island-buzz': () => import('./features/island-buzz.js'),
};

export async function loadFeature(name) {
  if (_loaded.has(name)) return _loaded.get(name);

  const loader = FEATURES[name];
  if (!loader) {
    console.warn(`[feature-loader] Unknown feature: ${name}`);
    return null;
  }

  try {
    const mod = await loader();
    _loaded.set(name, mod);
    return mod;
  } catch (err) {
    console.error(`[feature-loader] Failed to load ${name}:`, err);
    return null;
  }
}

export function isLoaded(name) {
  return _loaded.has(name);
}

// Load features that should be active immediately (no user interaction needed)
export async function loadEagerFeatures() {
  const eager = ['right-now', 'etiquette', 'slang-guide', 'cultural-calendar', 'island-buzz'];
  const results = await Promise.allSettled(
    eager.map(async name => {
      const mod = await loadFeature(name);
      if (mod && mod.init) await mod.init();
      return { name, mod };
    })
  );
  return results;
}

// Load a feature on demand and initialize it
const _initialized = new Set();
export async function activateFeature(name, ...args) {
  const mod = await loadFeature(name);
  if (mod && mod.init && !_initialized.has(name)) {
    await mod.init(...args);
    _initialized.add(name);
  }
  return mod;
}
