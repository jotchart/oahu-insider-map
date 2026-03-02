#!/usr/bin/env node
// One-time migration: restructure spot JSON files from single `tips` blob
// into structured fields (mustOrder, parking, talkStory, cashOnly, insiderTips, etc.)
//
// Usage: node scripts/migrate-spots.mjs [--dry-run]

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

const FOOD_CATEGORIES = ['restaurant', 'coffee', 'shave-ice'];
const ACTIVITY_CATEGORIES = ['beach', 'hike', 'snorkel', 'kids'];

function readJSONDir(dir) {
  const results = [];
  if (!statSync(dir, { throwIfNoEntry: false })?.isDirectory()) return results;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...readJSONDir(fullPath));
    } else if (entry.name.endsWith('.json')) {
      const data = JSON.parse(readFileSync(fullPath, 'utf8'));
      results.push({ data, path: fullPath, file: relative(ROOT, fullPath) });
    }
  }
  return results;
}

// ── Extraction helpers ──

function extractPrice(tips) {
  // "$$$" patterns
  if (/\$\$\$/.test(tips)) return '$$$';
  // "$$" patterns (but not "$$$")
  if (/\$\$(?!\$)/.test(tips)) return '$$';
  // "$ " or "$." or "$ ·" (single $, not part of $$)
  if (/(?:^|\s|·)\$(?:\s|·|\(|~)/.test(tips)) return '$';
  // "Free" at start or standalone
  if (/(?:^|\.\s*)Free(?:\.|,|\s)/i.test(tips)) return 'Free';
  return null;
}

function extractBestTime(tips) {
  const parts = [];

  // Seasonal patterns
  if (/summer[^.]*calm/i.test(tips)) parts.push('Summer for calm water');
  if (/winter[^.]*(?:massive|big|huge)\s*(?:surf|wave)/i.test(tips)) parts.push('Winter for big wave watching (stay out of water)');
  if (/(?:whale|humpback)[^.]*(?:Nov|Dec|Jan|Feb|Mar|Apr|May)/i.test(tips)) {
    const m = tips.match(/(?:whale|humpback)[^.]*?((?:Nov|Dec|Jan|Feb|Mar|Apr|May)[^.]*)/i);
    if (m) parts.push(`Whale watching ${m[1].trim().replace(/\.$/, '')}`);
  }
  if (/sunrise/i.test(tips) && !/before sunrise/i.test(tips)) parts.push('Sunrise');
  if (/sunset/i.test(tips)) parts.push('Sunset / golden hour');
  if (/before\s+(?:7|8|9)\s*am/i.test(tips)) {
    const m = tips.match(/before\s+(\d+\s*am)/i);
    if (m) parts.push(`Arrive before ${m[1]}`);
  }
  if (/(?:Go|start|best)\s+(?:at\s+)?(?:golden hour|dawn|early morning)/i.test(tips)) parts.push('Early morning');
  if (/best\s+(?:at\s+)?\d+[–-]\d+\s*ft/i.test(tips)) {
    const m = tips.match(/best\s+(?:at\s+)?(\d+[–-]\d+\s*ft)/i);
    if (m) parts.push(`Best at ${m[1]} swell`);
  }
  if (/(?:Oct|Nov|Dec|Jan|Feb|Mar|Apr|May)\s*[–-]\s*(?:Oct|Nov|Dec|Jan|Feb|Mar|Apr|May)/i.test(tips)) {
    const m = tips.match(/((?:Oct|Nov|Dec|Jan|Feb|Mar|Apr|May)\s*[–-]\s*(?:Oct|Nov|Dec|Jan|Feb|Mar|Apr|May))/i);
    if (m && !parts.some(p => p.includes(m[1]))) parts.push(`Best season: ${m[1]}`);
  }
  if (/early morning/i.test(tips) && !parts.includes('Early morning')) parts.push('Early morning');
  if (/pre-dawn|headlamp/i.test(tips)) parts.push('Pre-dawn start recommended');

  return parts.length > 0 ? parts.join('. ') : null;
}

function extractMustOrder(tips) {
  // Pattern: "Must-order: X, Y, Z" or "Must-try: X, Y"
  const patterns = [
    /Must-order:\s*(.+?)(?:\.|$)/i,
    /Must-try:\s*(.+?)(?:\.|$)/i,
  ];
  for (const pat of patterns) {
    const m = tips.match(pat);
    if (m) {
      // Split on commas, clean up
      return m[1]
        .split(/[,;]/)
        .map(s => s.trim())
        .filter(s => s.length > 0 && s.length < 100)
        .map(s => {
          // Remove leading connectors like "and ", "or "
          return s.replace(/^(?:and|or)\s+/i, '').trim();
        })
        .filter(Boolean);
    }
  }

  // Also check for "Must-order:" in the simpler · format
  const dotMatch = tips.match(/Must-order:\s*(.+?)(?:\s*·|$)/i);
  if (dotMatch) {
    return dotMatch[1]
      .split(/[,;]/)
      .map(s => s.trim())
      .filter(s => s.length > 0 && s.length < 100)
      .map(s => s.replace(/^(?:and|or)\s+/i, '').trim())
      .filter(Boolean);
  }

  return [];
}

function extractParking(tips) {
  const patterns = [
    /(?:parking|park(?:ed|ing)?)\s+(?:at|in|on|lot|is|—|:)\s*([^.]+)/i,
    /(?:Free|Paid|Metered|Street|Validated)\s+parking[^.]*\./i,
    /(?:\d+\s+parking\s+(?:lot|spot|space)s?[^.]*)/i,
    /((?:Small|Large|Dedicated|Shared|Free)\s+(?:parking\s+)?lot[^.]*)/i,
    /([^.]*parking[^.]*lot[^.]*)/i,
  ];

  // First try to find dedicated parking sentences
  const sentences = tips.split(/\.(?:\s)/);
  const parkingSentences = sentences.filter(s =>
    /parking|park(?:\s|$)/i.test(s) && !/theme park|water park|Beach Park|State Park/i.test(s)
  );

  if (parkingSentences.length > 0) {
    return parkingSentences
      .map(s => s.trim().replace(/\.$/, ''))
      .join('. ')
      .replace(/^\s*/, '');
  }

  return null;
}

function extractTalkStory(tips) {
  // Explicit "Talk story:" section
  const tsMatch = tips.match(/Talk story:\s*(.+?)(?:Pro tip:|$)/is);
  if (tsMatch) {
    return tsMatch[1].trim().replace(/\.$/, '').trim();
  }

  // "Founded by/in" history
  const foundedParts = [];
  const sentences = tips.split(/\.(?:\s)/);
  for (const s of sentences) {
    if (/(?:Founded|Started|Opened|Family-run|Won the|James Beard|Regiment|plantation)/i.test(s) &&
        !/Must-order|Pro tip|parking/i.test(s)) {
      foundedParts.push(s.trim().replace(/\.$/, ''));
    }
  }

  if (foundedParts.length > 0) {
    return foundedParts.join('. ') + '.';
  }

  return null;
}

function extractCashOnly(tips) {
  if (/CASH ONLY/i.test(tips)) return true;
  if (/Cash preferred/i.test(tips)) return true;
  if (/Cash only/i.test(tips)) return true;
  // The · format: "$ · Cash · " without "card"
  if (/·\s*Cash\s*·/i.test(tips) && !/card/i.test(tips)) return true;
  return false;
}

function extractInsiderTips(tips, category) {
  const parts = [];

  // "Pro tip:" sections
  const proTipMatch = tips.match(/Pro tip:\s*(.+?)(?:\.|$)/is);
  if (proTipMatch) {
    parts.push(proTipMatch[1].trim().replace(/\.$/, ''));
  }

  // Sentences with insider language
  const sentences = tips.split(/\.(?:\s)/);
  for (const s of sentences) {
    const trimmed = s.trim();
    // Skip if already captured elsewhere
    if (/^(?:Must-order|Must-try|Talk story|Founded|Started|Opened|Family-run|Pro tip)/i.test(trimmed)) continue;
    if (/parking|Phone:|address|\d{3}-\d{4}|Card (?:OK|only|accepted)|Cash &|CASH ONLY|Cash preferred/i.test(trimmed) && trimmed.length < 60) continue;
    // Skip hours/price patterns
    if (/^[$\$]/.test(trimmed) && trimmed.length < 40) continue;
    if (/^\d+[ap]m/i.test(trimmed)) continue;
    if (/^(?:Open|Daily|Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s/i.test(trimmed) && trimmed.length < 60) continue;

    // Keep sentences with insider value
    if (/(?:the move|best|secret|locals?|tip|avoid|don't|never|always|skip|instead|before|after|combine|pair|walk|try|ask|order|get the|go (?:at|before|after|early|late|right)|arrive|insider|worth|not for|start|bring)/i.test(trimmed)) {
      if (trimmed.length > 15) {
        parts.push(trimmed.replace(/\.$/, ''));
      }
    }
  }

  // Deduplicate
  const unique = [...new Set(parts)];
  return unique.length > 0 ? unique.join('. ') + '.' : null;
}

function extractHours(tips) {
  const patterns = [
    /(?:Open\s+)?(?:Daily|Mon|Tue|Wed|Thu|Fri|Sat|Sun)[^.]*(?:\d+[ap]m)[^.]*/i,
    /(?:Gate opens|Opens?)\s+\d+[ap]m[^.]*/i,
    /(?:Open\s+)?(?:Fri|Sat|Sun)[^.]*(?:midnight|noon)[^.]*/i,
    /Dawn\s+to\s+dusk[^.]*/i,
    /\d+[ap]m[–-]\d+[ap]m/i,
  ];

  for (const pat of patterns) {
    const m = tips.match(pat);
    if (m) return m[0].trim().replace(/\.$/, '');
  }
  return null;
}

function extractKidFriendly(data) {
  const { subcategory, tips, category } = data;

  if (category === 'kids') return true;
  if (subcategory === 'kid-friendly') return true;

  // Explicit signals
  if (/stroller-friendly|toddler|keiki|kid|child|family|babies/i.test(tips)) return true;
  if (/NOT for beginners|intermediate\+|brutal|notorious|expert|dangerous/i.test(tips)) return false;

  return null; // unknown
}

function extractActivityInsiderTips(tips) {
  const parts = [];
  const sentences = tips.split(/\.(?:\s)/);

  for (const s of sentences) {
    const trimmed = s.trim().replace(/\.$/, '');
    // Skip logistical stuff we already extract
    if (/^\$?\d+\s+(adult|entry|admission)/i.test(trimmed)) continue;
    if (/^(?:Free|Paid)\.\s*$/i.test(trimmed)) continue;
    if (/^Reservation/i.test(trimmed) && trimmed.length < 80) continue;
    if (/^\d+(\.\d+)?mi\s/i.test(trimmed)) continue; // trail stats
    if (/parking/i.test(trimmed)) continue;

    // Keep anything with substance
    if (trimmed.length > 15) {
      parts.push(trimmed);
    }
  }

  return parts.length > 0 ? parts.join('. ') + '.' : null;
}

// ── Migration for food spots ──

function migrateFoodSpot(data) {
  const tips = data.tips || '';

  const result = {
    name: data.name,
    lat: data.lat,
    lng: data.lng,
    category: data.category,
    subcategory: data.subcategory,
    tagline: data.tagline,
    area: data.area,
    price: extractPrice(tips),
    mustOrder: extractMustOrder(tips),
    parking: extractParking(tips),
    talkStory: extractTalkStory(tips),
    cashOnly: extractCashOnly(tips),
    insiderTips: extractInsiderTips(tips, data.category),
    kamaaina: null,
  };

  return result;
}

// ── Migration for activity spots ──

function migrateActivitySpot(data) {
  const tips = data.tips || '';

  const result = {
    name: data.name,
    lat: data.lat,
    lng: data.lng,
    category: data.category,
    subcategory: data.subcategory,
    tagline: data.tagline,
    area: data.area,
    price: extractPrice(tips),
    parking: extractParking(tips),
    hours: extractHours(tips),
    bestTime: extractBestTime(tips),
    kidFriendly: extractKidFriendly(data),
    insiderTips: extractActivityInsiderTips(tips),
    kamaaina: null,
  };

  return result;
}

// ── Main ──

const spotsDir = join(ROOT, 'data', 'spots');
const entries = readJSONDir(spotsDir);

let migrated = 0;
let skipped = 0;

for (const { data, path, file } of entries) {
  const isFood = FOOD_CATEGORIES.includes(data.category);
  const isActivity = ACTIVITY_CATEGORIES.includes(data.category);

  if (!isFood && !isActivity) {
    console.log(`SKIP (unknown category): ${file}`);
    skipped++;
    continue;
  }

  const result = isFood ? migrateFoodSpot(data) : migrateActivitySpot(data);

  if (DRY_RUN) {
    console.log(`\n=== ${file} ===`);
    console.log(JSON.stringify(result, null, 2));
  } else {
    writeFileSync(path, JSON.stringify(result, null, 2) + '\n');
  }
  migrated++;
}

console.log(`\n${DRY_RUN ? '[DRY RUN] ' : ''}Migrated: ${migrated}, Skipped: ${skipped}`);
