// ── Feature: Island Buzz ──
// Fresh insider gossip, openings, closings, and scene changes across Oahu
// Shows relevant buzz in neighborhood popups and a full panel

import { bus } from '../core/event-bus.js';
import { registerPopupSection } from '../core/popup-builder.js';
import { registerPanel, openPanel, closePanel, isPanelOpen } from '../core/panel-manager.js';
import { BUZZ_ITEMS, BUZZ_TYPES } from '../data/island-buzz.js';

function esc(s) { const el = document.createElement('span'); el.textContent = s; return el.innerHTML; }

function formatDate(dateStr) {
  const [y, m] = dateStr.split('-').map(Number);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[m - 1]} ${y}`;
}

function renderBuzzItem(item, compact) {
  const t = BUZZ_TYPES[item.type] || BUZZ_TYPES.scene;
  if (compact) {
    return `<div class="buzz-item-compact">
      <span class="buzz-type-dot" style="background:${t.color}"></span>
      <span class="buzz-item-headline">${esc(item.headline)}</span>
    </div>`;
  }
  return `<div class="buzz-item">
    <div class="buzz-item-header">
      <span class="buzz-type-badge" style="background:${t.color}">${t.icon} ${esc(t.label)}</span>
      <span class="buzz-item-date">${formatDate(item.date)}</span>
    </div>
    <div class="buzz-item-headline-full">${esc(item.headline)}</div>
    <div class="buzz-item-body">${esc(item.body)}</div>
    <div class="buzz-item-area">${esc(item.area)}</div>
  </div>`;
}

export async function init() {
  // Register popup section — show relevant buzz in neighborhood popups
  registerPopupSection({
    id: 'island-buzz',
    position: 'before-insider',
    render: (data, type) => {
      if (type !== 'neighborhood') return '';
      // Only show buzz specific to this neighborhood (not region-wide or island-wide)
      const unique = BUZZ_ITEMS.filter(b => b.area === data.name);
      if (unique.length === 0) return '';
      const show = unique.slice(0, 3);
      return `<div class="popup-buzz">
        <div class="buzz-label">Island Buzz</div>
        ${show.map(b => renderBuzzItem(b, true)).join('')}
      </div>`;
    }
  });

  // Register panel for full buzz feed
  registerPanel('island-buzz', {
    title: 'Island Buzz',
    render: () => renderBuzzPanel()
  });

  // Wire up pill
  const pill = document.getElementById('buzzPill');
  if (pill) {
    pill.addEventListener('click', () => {
      if (isPanelOpen('island-buzz')) {
        closePanel();
        pill.setAttribute('aria-pressed', 'false');
      } else {
        openPanel('island-buzz');
        pill.setAttribute('aria-pressed', 'true');
      }
    });
    bus.on('panel:closed', () => pill.setAttribute('aria-pressed', 'false'));
  }
}

function renderBuzzPanel() {
  let html = '';

  // Filter tabs
  html += `<div class="buzz-filter-bar">
    <button class="buzz-filter active" data-filter="all">All</button>
    <button class="buzz-filter" data-filter="opening">${BUZZ_TYPES.opening.icon} Openings</button>
    <button class="buzz-filter" data-filter="closing">${BUZZ_TYPES.closing.icon} Closings</button>
    <button class="buzz-filter" data-filter="scene">${BUZZ_TYPES.scene.icon} Scene</button>
  </div>`;

  // Sort by date descending
  const sorted = [...BUZZ_ITEMS].sort((a, b) => b.date.localeCompare(a.date));

  html += `<div class="buzz-feed" id="buzzFeed">`;
  sorted.forEach(item => {
    html += `<div class="buzz-feed-item" data-type="${item.type}">${renderBuzzItem(item, false)}</div>`;
  });
  html += `</div>`;

  html += `<div class="buzz-footer">Last updated March 2026 &middot; Got a tip? We're always listening.</div>`;

  // Wire up filter buttons after render
  setTimeout(() => {
    const bar = document.querySelector('.buzz-filter-bar');
    if (!bar) return;
    bar.addEventListener('click', e => {
      const btn = e.target.closest('.buzz-filter');
      if (!btn) return;
      bar.querySelectorAll('.buzz-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.buzz-feed-item').forEach(el => {
        el.style.display = (filter === 'all' || el.dataset.type === filter) ? '' : 'none';
      });
    });
  }, 50);

  return html;
}
