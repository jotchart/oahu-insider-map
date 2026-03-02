// ── IndexedDB + localStorage Wrapper ──
// Unified storage for API cache, user state, community tips

const DB_NAME = 'oahu-insider-map';
const DB_VERSION = 1;
const STORES = ['api_cache', 'user_state', 'community_tips'];

let _db = null;

function openDB() {
  if (_db) return Promise.resolve(_db);
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      STORES.forEach(name => {
        if (!db.objectStoreNames.contains(name)) {
          db.createObjectStore(name);
        }
      });
    };
    req.onsuccess = () => { _db = req.result; resolve(_db); };
    req.onerror = () => reject(req.error);
  });
}

export const Storage = {
  async get(store, key) {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(store, 'readonly');
        const req = tx.objectStore(store).get(key);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    } catch { return null; }
  },

  async set(store, key, value) {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(store, 'readwrite');
        tx.objectStore(store).put(value, key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch { /* silent fail for offline resilience */ }
  },

  async getAll(store) {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(store, 'readonly');
        const req = tx.objectStore(store).getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
      });
    } catch { return []; }
  },

  async getAllKeys(store) {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(store, 'readonly');
        const req = tx.objectStore(store).getAllKeys();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
      });
    } catch { return []; }
  },

  async remove(store, key) {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(store, 'readwrite');
        tx.objectStore(store).delete(key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch { /* silent */ }
  },

  // Simple flags via localStorage (for small, synchronous reads)
  getFlag(key) { try { return localStorage.getItem(key); } catch { return null; } },
  setFlag(key, val) { try { localStorage.setItem(key, val); } catch { /* */ } },
  removeFlag(key) { try { localStorage.removeItem(key); } catch { /* */ } },
};
