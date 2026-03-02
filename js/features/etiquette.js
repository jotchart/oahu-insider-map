// ── Feature: Cultural Etiquette ──
// Collapsible etiquette section in popups + full etiquette panel

import { registerPopupSection } from '../core/popup-builder.js';
import { registerPanel, openPanel } from '../core/panel-manager.js';
import { GENERAL_RULES, BEACH_RULES, NEIGHBORHOOD_ETIQUETTE } from '../data/etiquette.js';

function esc(s) { const el = document.createElement('span'); el.textContent = s; return el.innerHTML; }

export async function init() {
  // Register popup section for neighborhoods
  registerPopupSection({
    id: 'etiquette',
    position: 'after-insider',
    render: (data, type) => {
      if (type !== 'neighborhood') return '';
      const rules = NEIGHBORHOOD_ETIQUETTE[data.name];
      if (!rules || rules.length === 0) return '';

      return `<div class="popup-etiquette">
        <button class="etiquette-toggle" onclick="this.parentElement.classList.toggle('open')">
          <span>&#129309;</span> Local Etiquette
          <span class="insider-chevron">&#9660;</span>
        </button>
        <ul class="etiquette-list">
          ${rules.map(r => `<li>${esc(r)}</li>`).join('')}
        </ul>
      </div>`;
    }
  });

  // Register etiquette panel (accessible from anywhere)
  registerPanel('etiquette', {
    title: 'Cultural Etiquette',
    render: () => renderEtiquettePanel()
  });
}

function renderEtiquettePanel() {
  const categories = {
    cultural: { label: 'Hawaiian Culture', icon: '&#127796;' },
    greeting: { label: 'Greetings & Manners', icon: '&#129309;' },
    food: { label: 'Food & Dining', icon: '&#127869;' },
    driving: { label: 'Driving', icon: '&#128663;' },
    social: { label: 'Social', icon: '&#128483;' },
  };

  let html = '';

  // General rules by category
  for (const [cat, info] of Object.entries(categories)) {
    const rules = GENERAL_RULES.filter(r => r.category === cat);
    if (rules.length === 0) continue;

    html += `<div class="ocean-section-title">${info.icon} ${info.label}</div>`;
    rules.forEach(r => {
      html += `<div class="ocean-zone" style="flex-direction:column;align-items:flex-start;gap:2px">
        <div class="ocean-zone-name">${esc(r.rule)}</div>
        <div style="font-size:11px;color:var(--text-dim)">${esc(r.detail)}</div>
      </div>`;
    });
  }

  // Beach rules
  html += `<div class="ocean-section-title">&#127754; Beach Rules</div>`;
  BEACH_RULES.forEach(r => {
    html += `<div class="ocean-zone" style="flex-direction:column;align-items:flex-start;gap:2px">
      <div class="ocean-zone-name">${esc(r.rule)}</div>
      <div style="font-size:11px;color:var(--text-dim)">${esc(r.detail)}</div>
    </div>`;
  });

  return html;
}
