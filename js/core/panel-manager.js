// ── Slide-Up Panel Manager ──
// Features register panels; manager handles open/close, stacking, rendering

import { bus } from './event-bus.js';

const _panels = new Map();
let _activePanel = null;
let _container = null;

function esc(str) {
  const el = document.createElement('span');
  el.textContent = str;
  return el.innerHTML;
}

export function initPanelManager(containerEl) {
  _container = containerEl;
  // Close on backdrop click
  _container.addEventListener('click', e => {
    if (e.target === _container) closePanel();
  });
}

export function registerPanel(id, { title, render, onOpen, onClose }) {
  _panels.set(id, { title, render, onOpen, onClose });
}

export async function openPanel(id, data) {
  const panel = _panels.get(id);
  if (!panel || !_container) return;

  // Close any active panel first
  if (_activePanel) closePanel();

  const content = typeof panel.render === 'function'
    ? await panel.render(data)
    : '';

  _container.innerHTML = `
    <div class="feature-panel open" role="dialog" aria-label="${esc(panel.title)}">
      <div class="feature-panel-handle" aria-hidden="true"></div>
      <div class="feature-panel-header">
        <h2 class="feature-panel-title">${esc(panel.title)}</h2>
        <button class="feature-panel-close" aria-label="Close panel">&times;</button>
      </div>
      <div class="feature-panel-body">${content}</div>
    </div>`;

  _container.classList.add('active');
  _activePanel = id;

  _container.querySelector('.feature-panel-close').addEventListener('click', closePanel);

  if (panel.onOpen) panel.onOpen(data);
}

export function closePanel() {
  if (!_container || !_activePanel) return;
  const panel = _panels.get(_activePanel);
  _container.classList.remove('active');
  _container.innerHTML = '';
  if (panel && panel.onClose) panel.onClose();
  _activePanel = null;
  bus.emit('panel:closed');
}

export function isPanelOpen(id) {
  return _activePanel === id;
}

export function getActivePanel() {
  return _activePanel;
}
