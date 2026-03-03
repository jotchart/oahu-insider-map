// ── Extensible Popup Builder ──
// Features register sections that get injected into neighborhood & spot popups

import { SCORE_COLORS } from '../data.js';

function esc(str) {
  const el = document.createElement('span');
  el.textContent = str;
  return el.innerHTML;
}

// Registered popup sections from features
// position: 'after-header' | 'before-insider' | 'after-insider' | 'before-actions'
const _sections = [];

export function registerPopupSection({ id, position, render }) {
  const existing = _sections.findIndex(s => s.id === id);
  if (existing !== -1) _sections[existing] = { id, position, render };
  else _sections.push({ id, position, render });
}

function renderSections(position, data, type) {
  return _sections
    .filter(s => s.position === position)
    .map(s => {
      try { return s.render(data, type) || ''; }
      catch (e) { console.error(`[popup] Section ${s.id} error:`, e); return ''; }
    })
    .join('');
}

function formatTipsBullets(tips) {
  const sentences = tips.split(/\.(?:\s)/).map(s => s.trim()).filter(Boolean);
  if (sentences.length <= 1) return `<div class="popup-details-simple">${esc(tips)}</div>`;
  return `<ul class="popup-details-list">${sentences.map(s => `<li>${esc(s.replace(/\.$/, ''))}</li>`).join('')}</ul>`;
}

export function buildNeighborhoodPopup(n, crimeCount) {
  const afterHeader = renderSections('after-header', n, 'neighborhood');
  const beforeInsider = renderSections('before-insider', n, 'neighborhood');
  const afterInsider = renderSections('after-insider', n, 'neighborhood');
  const beforeActions = renderSections('before-actions', n, 'neighborhood');

  const insiderHTML = n.insider && n.insider.length > 0
    ? `<div class="popup-insider open">
        <ul class="insider-list">
          ${n.insider.map(tip => `<li>${esc(tip)}</li>`).join('')}
        </ul>
      </div>`
    : '';

  const crimeHTML = crimeCount !== undefined
    ? `<div class="popup-crime"><strong>&#128680; Reported incidents:</strong> ${crimeCount.toLocaleString()}</div>`
    : '';

  return `<div class="popup-inner hood-popup">
    <div class="popup-header">
      <div class="popup-score" style="background:${SCORE_COLORS[n.score]}">${n.score}</div>
      <div>
        <div class="popup-name">${esc(n.name)}</div>
        <div class="popup-region">${esc(n.region)}</div>
      </div>
    </div>
    ${afterHeader}
    <div class="popup-desc">${esc(n.desc)}</div>
    ${crimeHTML}
    ${beforeInsider}
    ${insiderHTML}
    ${afterInsider}
    ${beforeActions}
  </div>`;
}

const FOOD_CATS = new Set(['restaurant', 'coffee', 'shave-ice']);

function buildFoodPopupBody(s) {
  let html = '';

  // Cash-only warning (prominent)
  if (s.cashOnly) {
    html += `<div class="popup-cash-warn">CASH ONLY</div>`;
  }

  // Price
  if (s.price) {
    html += `<div class="popup-price">${esc(s.price)}</div>`;
  }

  // Must-order items
  if (s.mustOrder && s.mustOrder.length > 0) {
    html += `<div class="popup-section">
      <div class="popup-section-label">Must Order</div>
      <div class="popup-must-order">${s.mustOrder.map(item => `<span class="must-order-item">${esc(item)}</span>`).join('')}</div>
    </div>`;
  }

  // Parking
  if (s.parking) {
    html += `<div class="popup-section">
      <div class="popup-section-label">Parking</div>
      <div class="popup-section-body">${esc(s.parking)}</div>
    </div>`;
  }

  // Talk Story
  if (s.talkStory) {
    html += `<div class="popup-section">
      <div class="popup-section-label">Talk Story</div>
      <div class="popup-section-body">${esc(s.talkStory)}</div>
    </div>`;
  }

  // Kama'aina
  if (s.kamaaina) {
    html += `<div class="popup-section popup-kamaaina">
      <div class="popup-section-label">Kama&#x02BB;aina</div>
      <div class="popup-section-body">${esc(s.kamaaina)}</div>
    </div>`;
  }

  return html;
}

function buildActivityPopupBody(s) {
  let html = '';

  // Price
  if (s.price) {
    html += `<div class="popup-price">${esc(s.price)}</div>`;
  }

  // Parking
  if (s.parking) {
    html += `<div class="popup-section">
      <div class="popup-section-label">Parking</div>
      <div class="popup-section-body">${esc(s.parking)}</div>
    </div>`;
  }

  // Hours
  if (s.hours) {
    html += `<div class="popup-section">
      <div class="popup-section-label">Hours</div>
      <div class="popup-section-body">${esc(s.hours)}</div>
    </div>`;
  }

  // Best Time
  if (s.bestTime) {
    html += `<div class="popup-section">
      <div class="popup-section-label">Best Time</div>
      <div class="popup-section-body">${esc(s.bestTime)}</div>
    </div>`;
  }

  // Kid-friendly
  if (s.kidFriendly === true) {
    html += `<div class="popup-kid-badge popup-kid-yes">Kid-friendly</div>`;
  } else if (s.kidFriendly === false) {
    html += `<div class="popup-kid-badge popup-kid-no">Not for young kids</div>`;
  }

  // Talk Story
  if (s.talkStory) {
    html += `<div class="popup-section">
      <div class="popup-section-label">Talk Story</div>
      <div class="popup-section-body">${esc(s.talkStory)}</div>
    </div>`;
  }

  // Kama'aina
  if (s.kamaaina) {
    html += `<div class="popup-section popup-kamaaina">
      <div class="popup-section-label">Kama&#x02BB;aina</div>
      <div class="popup-section-body">${esc(s.kamaaina)}</div>
    </div>`;
  }

  return html;
}

export function buildSpotPopup(s, SPOT_CATEGORIES) {
  const cat = SPOT_CATEGORIES[s.category];
  const afterHeader = renderSections('after-header', s, 'spot');
  const beforeActions = renderSections('before-actions', s, 'spot');
  const isFood = FOOD_CATS.has(s.category);

  const body = isFood ? buildFoodPopupBody(s) : buildActivityPopupBody(s);

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}&destination_place_id=&travelmode=driving`;

  return `<div class="popup-inner spot-popup">
    <div class="popup-header">
      <div class="spot-popup-icon" style="background:${cat.color}">${cat.icon}</div>
      <div>
        <div class="popup-name">${esc(s.name)}</div>
        <div class="popup-region">${esc(s.area)} &middot; ${esc(cat.label)}${s.tier ? ` &middot; <span class="tier-badge tier-${s.tier}" style="display:inline-flex;vertical-align:middle">${s.tier}</span>` : ''}</div>
      </div>
    </div>
    ${afterHeader}
    <div class="popup-desc">${esc(s.tagline)}</div>
    ${body}
    ${beforeActions}
    <div class="popup-actions">
      <a href="${mapsUrl}" target="_blank" rel="noopener" class="popup-action-btn popup-maps-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        Directions
      </a>
    </div>
  </div>`;
}

export { esc };
