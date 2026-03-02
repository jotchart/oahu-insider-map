// ── Pub/Sub Event Bus ──
// Decoupled communication between features and core app

class EventBus {
  constructor() {
    this._listeners = new Map();
  }

  on(event, fn) {
    if (!this._listeners.has(event)) this._listeners.set(event, []);
    this._listeners.get(event).push(fn);
    return () => this.off(event, fn);
  }

  off(event, fn) {
    const list = this._listeners.get(event);
    if (!list) return;
    const idx = list.indexOf(fn);
    if (idx !== -1) list.splice(idx, 1);
  }

  emit(event, data) {
    const list = this._listeners.get(event);
    if (!list) return;
    list.forEach(fn => {
      try { fn(data); } catch (e) { console.error(`[bus] ${event} handler error:`, e); }
    });
  }
}

export const bus = new EventBus();
