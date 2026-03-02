// ── Feature: Local Slang & Pronunciation Guide ──
// Adds place name meanings to popups + searchable glossary panel

import { registerPopupSection } from '../core/popup-builder.js';
import { registerPanel, openPanel, closePanel, isPanelOpen } from '../core/panel-manager.js';
import { HAWAIIAN_WORDS, PIDGIN_TERMS, PLACE_NAMES } from '../data/slang-pronunciation.js';

function esc(s) { const el = document.createElement('span'); el.textContent = s; return el.innerHTML; }

export async function init() {
  // Register popup section — place name meaning after header
  registerPopupSection({
    id: 'place-meaning',
    position: 'after-header',
    render: (data, type) => {
      if (type !== 'neighborhood') return '';
      const place = PLACE_NAMES[data.name];
      if (!place) return '';

      const phonetic = place.phonetic ? ` <span class="popup-phonetic">(${esc(place.phonetic)})</span>` : '';
      return `<div class="popup-meaning">${esc(place.meaning)}${phonetic}</div>`;
    }
  });

  // Register glossary panel
  registerPanel('slang-guide', {
    title: 'Local Language Guide',
    render: () => renderGlossaryPanel(),
    onOpen: () => {
      setTimeout(() => {
        wireGlossaryInteractions();
      }, 100);
    }
  });
}

function renderGlossaryPanel() {
  let html = '';

  // Tab bar
  html += `<div class="glossary-tab-bar">
    <button class="glossary-tab active" data-tab="hawaiian">Hawaiian</button>
    <button class="glossary-tab" data-tab="pidgin">Pidgin</button>
    <button class="glossary-tab" data-tab="places">Place Names</button>
  </div>`;

  // Search
  html += `<input type="search" class="glossary-search" placeholder="Search words..." autocomplete="off">`;

  // Hawaiian words section
  html += `<div class="glossary-section" data-section="hawaiian">`;
  HAWAIIAN_WORDS.forEach(w => {
    html += `<div class="glossary-term" data-search="${esc(w.word.toLowerCase())} ${esc(w.meaning.toLowerCase())}">
      <div><span class="glossary-word">${esc(w.word)}</span><span class="glossary-phonetic">${esc(w.phonetic)}</span></div>
      <div class="glossary-meaning">${esc(w.meaning)}</div>
    </div>`;
  });
  html += `</div>`;

  // Pidgin section
  html += `<div class="glossary-section" data-section="pidgin" style="display:none">`;
  PIDGIN_TERMS.forEach(p => {
    html += `<div class="glossary-term" data-search="${esc(p.term.toLowerCase())} ${esc(p.meaning.toLowerCase())}">
      <div class="glossary-word">${esc(p.term)}</div>
      <div class="glossary-meaning">${esc(p.meaning)}</div>
      <div class="glossary-usage">"${esc(p.usage)}"</div>
    </div>`;
  });
  html += `</div>`;

  // Place names section
  html += `<div class="glossary-section" data-section="places" style="display:none">`;
  const sortedPlaces = Object.entries(PLACE_NAMES).sort((a, b) => a[0].localeCompare(b[0]));
  sortedPlaces.forEach(([name, info]) => {
    const phonetic = info.phonetic ? `<span class="glossary-phonetic">${esc(info.phonetic)}</span>` : '';
    html += `<div class="glossary-term" data-search="${esc(name.toLowerCase())} ${esc(info.meaning.toLowerCase())}">
      <div><span class="glossary-word">${esc(name)}</span>${phonetic}</div>
      <div class="glossary-meaning">${esc(info.meaning)}</div>
    </div>`;
  });
  html += `</div>`;

  return html;
}

function wireGlossaryInteractions() {
  const body = document.querySelector('.feature-panel-body');
  if (!body) return;

  // Tab switching
  body.addEventListener('click', e => {
    const tab = e.target.closest('.glossary-tab');
    if (!tab) return;
    body.querySelectorAll('.glossary-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const section = tab.dataset.tab;
    body.querySelectorAll('.glossary-section').forEach(s => {
      s.style.display = s.dataset.section === section ? '' : 'none';
    });
  });

  // Search filtering
  const search = body.querySelector('.glossary-search');
  if (search) {
    search.focus();
    search.addEventListener('input', () => {
      const q = search.value.toLowerCase().trim();
      body.querySelectorAll('.glossary-term').forEach(t => {
        t.style.display = !q || t.dataset.search.includes(q) ? '' : 'none';
      });
      if (q) {
        body.querySelectorAll('.glossary-section').forEach(s => s.style.display = '');
        body.querySelectorAll('.glossary-tab').forEach(t => t.classList.remove('active'));
      }
    });
  }
}
