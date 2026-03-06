#!/usr/bin/env node
/**
 * Fix GPS coordinates for all spots using Google Geocoding API.
 * Looks up each spot by "name, area, Oahu, Hawaii" and updates lat/lng in-place.
 *
 * Usage: node scripts/fix-coords.mjs
 */

import fs from 'fs';
import path from 'path';

const API_KEY = 'AIzaSyCWeYmpo43ruOCJ1JV0ZcZcTKG-G2Knen0';
const SPOTS_DIR = path.resolve('data/spots');

// Oahu bounding box to bias results
const BOUNDS = '21.2,-158.3|21.72,-157.6';

async function geocode(query) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&bounds=${BOUNDS}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status === 'OK' && data.results.length > 0) {
    const loc = data.results[0].geometry.location;
    return { lat: loc.lat, lng: loc.lng, formatted: data.results[0].formatted_address };
  }
  return null;
}

function round(n, d = 4) {
  return Math.round(n * 10 ** d) / 10 ** d;
}

async function main() {
  const categories = fs.readdirSync(SPOTS_DIR).filter(d =>
    fs.statSync(path.join(SPOTS_DIR, d)).isDirectory()
  );

  let total = 0, updated = 0, failed = 0;

  for (const cat of categories) {
    const catDir = path.join(SPOTS_DIR, cat);
    const files = fs.readdirSync(catDir).filter(f => f.endsWith('.json'));

    for (const file of files) {
      const filePath = path.join(catDir, file);
      const spot = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      total++;

      // Build search query — name + area for specificity
      const query = `${spot.name}, ${spot.area || ''}, Oahu, Hawaii`;

      try {
        const result = await geocode(query);
        if (result) {
          const oldLat = spot.lat, oldLng = spot.lng;
          const newLat = round(result.lat), newLng = round(result.lng);

          // Check result is actually on Oahu (within bounding box)
          if (newLat < 21.1 || newLat > 21.8 || newLng < -158.4 || newLng > -157.5) {
            console.log(`  SKIP (off-island): ${spot.name} -> ${result.formatted}`);
            failed++;
            continue;
          }

          const dist = Math.sqrt((oldLat - newLat) ** 2 + (oldLng - newLng) ** 2);
          spot.lat = newLat;
          spot.lng = newLng;
          fs.writeFileSync(filePath, JSON.stringify(spot, null, 2) + '\n');

          if (dist > 0.001) {
            console.log(`  FIXED: ${spot.name} (moved ${(dist * 111000).toFixed(0)}m) -> ${result.formatted}`);
          }
          updated++;
        } else {
          console.log(`  FAIL: ${spot.name} — no geocode result for "${query}"`);
          failed++;
        }
      } catch (err) {
        console.log(`  ERROR: ${spot.name} — ${err.message}`);
        failed++;
      }

      // Rate limit: ~10 requests/sec to stay under quota
      await new Promise(r => setTimeout(r, 100));
    }
  }

  console.log(`\nDone! ${total} spots, ${updated} updated, ${failed} failed`);
}

main();
