#!/usr/bin/env node
// One-time migration: split monolithic JS data files into individual JSON files.
// Usage: node scripts/migrate.mjs

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ── Helpers ──────────────────────────────────────────────────────────────────

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[''`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function writeJSON(filepath, data) {
  mkdirSync(dirname(filepath), { recursive: true });
  writeFileSync(filepath, JSON.stringify(data, null, 2) + '\n');
}

function normalizeForCompare(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// ── Import source data ──────────────────────────────────────────────────────

const { SPOTS, SPOT_CATEGORIES } = await import(join(ROOT, 'js', 'spots.js'));
const { FOOD_SPOTS } = await import(join(ROOT, 'js', 'food_data.js'));
const { NEIGHBORHOODS, SCORE_COLORS } = await import(join(ROOT, 'js', 'data.js'));

// ── Migrate spots ───────────────────────────────────────────────────────────

const EXTENDED_TEMPLATE = {
  address: null,
  phone: null,
  hours: null,
  price_range: null,
  menu_highlights: [],
  website: null,
  gps_verified: false,
  verified_date: null,
  notes: ""
};

let spotsCount = 0;
const spotNames = new Set();

for (const spot of SPOTS) {
  const slug = slugify(spot.name);
  const filepath = join(ROOT, 'data', 'spots', spot.category, `${slug}.json`);

  const json = {
    name: spot.name,
    lat: spot.lat,
    lng: spot.lng,
    category: spot.category,
    subcategory: spot.subcategory,
    tagline: spot.tagline,
    tips: spot.tips,
    area: spot.area,
    _extended: { ...EXTENDED_TEMPLATE }
  };

  writeJSON(filepath, json);
  spotNames.add(normalizeForCompare(spot.name));
  spotsCount++;
}

console.log(`Created ${spotsCount} spot files from spots.js`);

// ── Migrate food_data.js (deduplicate against spots) ────────────────────────

let foodNew = 0;
let foodDup = 0;
const dupes = [];

for (const spot of FOOD_SPOTS) {
  const normalized = normalizeForCompare(spot.name);
  if (spotNames.has(normalized)) {
    foodDup++;
    dupes.push(spot.name);
    continue;
  }

  const slug = slugify(spot.name);
  const category = spot.category === 'food-truck' ? 'restaurant' : spot.category;
  const filepath = join(ROOT, 'data', 'spots', category, `${slug}.json`);

  const json = {
    name: spot.name,
    lat: spot.lat,
    lng: spot.lng,
    category: category,
    subcategory: spot.subcategory,
    tagline: spot.tagline,
    tips: spot.tips,
    area: spot.area,
    _extended: { ...EXTENDED_TEMPLATE }
  };

  writeJSON(filepath, json);
  spotNames.add(normalized);
  foodNew++;
}

console.log(`Created ${foodNew} new spot files from food_data.js (${foodDup} duplicates skipped)`);
if (dupes.length > 0) {
  console.log(`  Duplicates: ${dupes.join(', ')}`);
}

// ── Migrate neighborhoods ───────────────────────────────────────────────────

let nbCount = 0;

for (const nb of NEIGHBORHOODS) {
  const regionSlug = slugify(nb.region);
  const nameSlug = slugify(nb.name);
  const filepath = join(ROOT, 'data', 'neighborhoods', regionSlug, `${nameSlug}.json`);

  const json = {
    region: nb.region,
    name: nb.name,
    lat: nb.lat,
    lng: nb.lng,
    score: nb.score,
    desc: nb.desc,
    sources: nb.sources,
    insider: nb.insider
  };

  writeJSON(filepath, json);
  nbCount++;
}

console.log(`Created ${nbCount} neighborhood files from data.js`);
console.log(`\nMigration complete! Source of truth is now data/**/*.json`);
console.log(`Run 'node scripts/build.mjs' to regenerate js/spots.js and js/data.js`);
