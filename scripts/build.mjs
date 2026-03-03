#!/usr/bin/env node
// Build: combine individual JSON files into ES6 module exports.
// Usage: node scripts/build.mjs [--include-extended] [--verbose]

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const args = process.argv.slice(2);
const INCLUDE_EXTENDED = args.includes('--include-extended');
const VERBOSE = args.includes('--verbose');

// ── Helpers ──────────────────────────────────────────────────────────────────

function readJSONDir(dir) {
  const results = [];
  if (!statSync(dir, { throwIfNoEntry: false })?.isDirectory()) return results;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...readJSONDir(fullPath));
    } else if (entry.name.endsWith('.json')) {
      try {
        const data = JSON.parse(readFileSync(fullPath, 'utf8'));
        results.push({ data, file: relative(ROOT, fullPath) });
      } catch (e) {
        console.error(`ERROR: Invalid JSON in ${relative(ROOT, fullPath)}: ${e.message}`);
        process.exit(1);
      }
    }
  }
  return results;
}

function formatValue(val) {
  if (val === null || val === undefined) return 'null';
  if (typeof val === 'string') {
    // Use JSON.stringify for proper escaping, but keep it readable
    return JSON.stringify(val);
  }
  if (Array.isArray(val)) {
    if (val.length === 0) return '[]';
    if (val.every(v => typeof v === 'string')) {
      return '[\n' + val.map(v => `      ${JSON.stringify(v)}`).join(',\n') + '\n    ]';
    }
    return JSON.stringify(val);
  }
  return String(val);
}

// ── Load config ─────────────────────────────────────────────────────────────

const config = JSON.parse(readFileSync(join(ROOT, 'data', 'config.json'), 'utf8'));
const validCategories = Object.keys(config.SPOT_CATEGORIES);
const validTiers = Object.keys(config.TIER_CONFIG);

// ── Validate and collect spots ──────────────────────────────────────────────

const spotsDir = join(ROOT, 'data', 'spots');
const spotEntries = readJSONDir(spotsDir);

const errors = [];
const warnings = [];
const spotNames = new Map(); // name -> file for duplicate detection
const spots = [];

const FOOD_CATEGORIES = ['restaurant', 'coffee', 'shave-ice'];
const ACTIVITY_CATEGORIES = ['beach', 'hike', 'snorkel', 'kids'];

for (const { data, file } of spotEntries) {
  const isFood = FOOD_CATEGORIES.includes(data.category);
  const isActivity = ACTIVITY_CATEGORIES.includes(data.category);

  // Required fields (common to all)
  for (const field of ['name', 'tier', 'lat', 'lng', 'category', 'subcategory', 'tagline', 'area']) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      errors.push(`${file}: missing required field '${field}'`);
    }
  }

  // Tier validation
  if (data.tier && !validTiers.includes(data.tier)) {
    errors.push(`${file}: invalid tier '${data.tier}' (valid: ${validTiers.join(', ')})`);
  }

  // Category validation
  if (data.category && !validCategories.includes(data.category)) {
    errors.push(`${file}: invalid category '${data.category}' (valid: ${validCategories.join(', ')})`);
  }

  // Coordinate validation (Oahu bounding box)
  if (typeof data.lat === 'number' && (data.lat < 21.0 || data.lat > 22.0)) {
    errors.push(`${file}: lat ${data.lat} outside Oahu range (21.0-22.0)`);
  }
  if (typeof data.lng === 'number' && (data.lng < -158.5 || data.lng > -157.5)) {
    errors.push(`${file}: lng ${data.lng} outside Oahu range (-158.5 to -157.5)`);
  }

  // Duplicate name detection
  const normName = data.name?.toLowerCase();
  if (normName && spotNames.has(normName)) {
    errors.push(`${file}: duplicate name '${data.name}' (also in ${spotNames.get(normName)})`);
  } else if (normName) {
    spotNames.set(normName, file);
  }

  // Build the spot object with category-specific fields
  const spot = {
    name: data.name,
    tier: data.tier,
    lat: data.lat,
    lng: data.lng,
    category: data.category,
    subcategory: data.subcategory,
    tagline: data.tagline,
    area: data.area,
    price: data.price || null,
  };

  if (isFood) {
    spot.mustOrder = data.mustOrder || [];
    spot.parking = data.parking || null;
    spot.talkStory = data.talkStory || null;
    spot.cashOnly = data.cashOnly || false;
    spot.kamaaina = data.kamaaina || null;
  } else if (isActivity) {
    spot.parking = data.parking || null;
    spot.hours = data.hours || null;
    spot.bestTime = data.bestTime || null;
    spot.kidFriendly = data.kidFriendly ?? null;
    spot.talkStory = data.talkStory || null;
    spot.kamaaina = data.kamaaina || null;
  }

  spots.push(spot);
}

if (errors.length > 0) {
  console.error('\nBuild FAILED with errors:');
  errors.forEach(e => console.error(`  ✗ ${e}`));
  process.exit(1);
}

// Sort by category then name
spots.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));

// ── Generate js/spots.js ────────────────────────────────────────────────────

let spotsJS = `// AUTO-GENERATED by build.mjs — DO NOT EDIT DIRECTLY\n`;
spotsJS += `// Source of truth: data/spots/**/*.json\n`;
spotsJS += `// Generated: ${new Date().toISOString()}\n\n`;

// TIER_CONFIG
spotsJS += `export const TIER_CONFIG = {\n`;
for (const [key, val] of Object.entries(config.TIER_CONFIG)) {
  spotsJS += `  ${key}: { label: ${JSON.stringify(val.label)}, color: ${JSON.stringify(val.color)}, desc: ${JSON.stringify(val.desc)} },\n`;
}
spotsJS += `};\n\n`;

// SPOT_CATEGORIES
spotsJS += `export const SPOT_CATEGORIES = {\n`;
for (const [key, val] of Object.entries(config.SPOT_CATEGORIES)) {
  const k = key.includes('-') ? `'${key}'` : key;
  spotsJS += `  ${k.padEnd(13)}: { color: '${val.color}', label: '${val.label}',${' '.repeat(Math.max(1, 10 - val.label.length))}icon: '${val.icon}' },\n`;
}
spotsJS += `};\n\n`;

// SPOTS array
spotsJS += `export const SPOTS = [\n`;
for (const spot of spots) {
  const parts = Object.entries(spot).map(([k, v]) => `${k}:${JSON.stringify(v)}`);
  spotsJS += `  {${parts.join(',')}},\n`;
}
spotsJS += `];\n`;

writeFileSync(join(ROOT, 'js', 'spots.js'), spotsJS);

// ── Validate and collect neighborhoods ──────────────────────────────────────

const nbDir = join(ROOT, 'data', 'neighborhoods');
const nbEntries = readJSONDir(nbDir);
const nbErrors = [];
const neighborhoods = [];

for (const { data, file } of nbEntries) {
  for (const field of ['region', 'name', 'lat', 'lng', 'score', 'desc', 'sources', 'insider']) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      nbErrors.push(`${file}: missing required field '${field}'`);
    }
  }

  if (typeof data.score === 'number' && (data.score < 1 || data.score > 10 || !Number.isInteger(data.score))) {
    nbErrors.push(`${file}: score ${data.score} must be integer 1-10`);
  }

  if (typeof data.lat === 'number' && (data.lat < 21.0 || data.lat > 22.0)) {
    nbErrors.push(`${file}: lat ${data.lat} outside Oahu range (21.0-22.0)`);
  }
  if (typeof data.lng === 'number' && (data.lng < -158.5 || data.lng > -157.5)) {
    nbErrors.push(`${file}: lng ${data.lng} outside Oahu range (-158.5 to -157.5)`);
  }

  if (!Array.isArray(data.insider) || data.insider.length === 0) {
    nbErrors.push(`${file}: insider must be a non-empty array`);
  }

  neighborhoods.push(data);
}

if (nbErrors.length > 0) {
  console.error('\nBuild FAILED with neighborhood errors:');
  nbErrors.forEach(e => console.error(`  ✗ ${e}`));
  process.exit(1);
}

// Sort by region then name
neighborhoods.sort((a, b) => a.region.localeCompare(b.region) || a.name.localeCompare(b.name));

// ── Generate js/data.js ─────────────────────────────────────────────────────

let dataJS = `// AUTO-GENERATED by build.mjs — DO NOT EDIT DIRECTLY\n`;
dataJS += `// Source of truth: data/neighborhoods/**/*.json\n`;
dataJS += `// Generated: ${new Date().toISOString()}\n\n`;

// SCORE_COLORS
dataJS += `export const SCORE_COLORS = {\n`;
for (const [k, v] of Object.entries(config.SCORE_COLORS)) {
  dataJS += `  ${k}:'${v}',`;
}
dataJS = dataJS.slice(0, -1); // remove trailing comma
dataJS += `\n};\n\n`;

// NEIGHBORHOODS array
dataJS += `export const NEIGHBORHOODS = [\n`;
for (const nb of neighborhoods) {
  dataJS += `  {region:${JSON.stringify(nb.region)},name:${JSON.stringify(nb.name)},lat:${nb.lat},lng:${nb.lng},score:${nb.score},desc:${JSON.stringify(nb.desc)},sources:${JSON.stringify(nb.sources)},insider:${JSON.stringify(nb.insider)}},\n`;
}
dataJS += `];\n`;

writeFileSync(join(ROOT, 'js', 'data.js'), dataJS);

// ── Summary ─────────────────────────────────────────────────────────────────

const catCounts = {};
const tierCounts = {};
for (const s of spots) {
  catCounts[s.category] = (catCounts[s.category] || 0) + 1;
  tierCounts[s.tier] = (tierCounts[s.tier] || 0) + 1;
}

const regionCounts = {};
for (const nb of neighborhoods) {
  regionCounts[nb.region] = (regionCounts[nb.region] || 0) + 1;
}

console.log(`\nBuilt js/spots.js: ${spots.length} spots`);
for (const [cat, count] of Object.entries(catCounts).sort()) {
  console.log(`  ${cat}: ${count}`);
}
console.log('  By tier:');
for (const tier of validTiers) {
  if (tierCounts[tier]) console.log(`    ${tier}: ${tierCounts[tier]}`);
}

console.log(`\nBuilt js/data.js: ${neighborhoods.length} neighborhoods`);
for (const [region, count] of Object.entries(regionCounts).sort()) {
  console.log(`  ${region}: ${count}`);
}

if (VERBOSE && warnings.length > 0) {
  console.log(`\nWarnings (${warnings.length}):`);
  warnings.forEach(w => console.log(`  ⚠ ${w}`));
} else if (warnings.length > 0) {
  console.log(`\n${warnings.length} warnings (run with --verbose to see)`);
}

console.log('\nDone!');
