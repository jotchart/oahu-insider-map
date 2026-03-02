// ── Cached Fetch with Offline Fallback ──
// All external API calls go through this module

import { Storage } from './storage.js';

export async function cachedFetch(url, { ttlMinutes = 60, fallbackData = null } = {}) {
  const cacheKey = `api:${url}`;

  // 1. Check IndexedDB cache
  try {
    const cached = await Storage.get('api_cache', cacheKey);
    if (cached) {
      const age = (Date.now() - cached.timestamp) / 60000;
      if (age < ttlMinutes) return cached.data;
      // Stale but exists — try network, fall back to stale
    }
  } catch { /* continue to network */ }

  // 2. Try network
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    // Store in cache
    await Storage.set('api_cache', cacheKey, { data, timestamp: Date.now() });
    return data;
  } catch (err) {
    console.warn(`[api-fetcher] Network failed for ${url}:`, err.message);
  }

  // 3. Return stale cache if available
  try {
    const stale = await Storage.get('api_cache', cacheKey);
    if (stale) return stale.data;
  } catch { /* */ }

  // 4. Last resort: static fallback
  return fallbackData;
}

export async function cachedFetchText(url, { ttlMinutes = 60, fallbackData = null } = {}) {
  const cacheKey = `api:${url}`;

  try {
    const cached = await Storage.get('api_cache', cacheKey);
    if (cached) {
      const age = (Date.now() - cached.timestamp) / 60000;
      if (age < ttlMinutes) return cached.data;
    }
  } catch { /* */ }

  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.text();
    await Storage.set('api_cache', cacheKey, { data, timestamp: Date.now() });
    return data;
  } catch (err) {
    console.warn(`[api-fetcher] Text fetch failed for ${url}:`, err.message);
  }

  try {
    const stale = await Storage.get('api_cache', cacheKey);
    if (stale) return stale.data;
  } catch { /* */ }

  return fallbackData;
}
