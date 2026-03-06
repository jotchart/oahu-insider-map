#!/usr/bin/env node
/**
 * Audit spot coordinates by reverse-geocoding and checking result precision.
 * Flags spots that resolved to neighborhood/locality level instead of a specific address.
 */

import fs from 'fs';
import path from 'path';

const API_KEY = 'AIzaSyCWeYmpo43ruOCJ1JV0ZcZcTKG-G2Knen0';
const SPOTS_DIR = path.resolve('data/spots');

// Types that indicate a vague/imprecise result
const VAGUE_TYPES = new Set([
  'neighborhood', 'locality', 'sublocality', 'sublocality_level_1',
  'political', 'postal_code', 'administrative_area_level_1',
  'administrative_area_level_2', 'country', 'colloquial_area'
]);

// Types that indicate a precise result
const PRECISE_TYPES = new Set([
  'street_address', 'premise', 'subpremise', 'establishment',
  'point_of_interest', 'park', 'natural_feature', 'airport',
  'route', 'intersection'
]);

async function reverseGeocode(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
  const res = await fetch(url);
  return res.json();
}

async function forwardGeocode(query) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&bounds=21.2,-158.3|21.72,-157.6&key=${API_KEY}`;
  const res = await fetch(url);
  return res.json();
}

function round(n, d = 4) {
  return Math.round(n * 10 ** d) / 10 ** d;
}

// Extract address hints from spot data
function extractAddressHint(spot) {
  // Check parking field for street addresses
  if (spot.parking) {
    const addrMatch = spot.parking.match(/(\d+[\w\s'-]+(?:Ave|St|Blvd|Rd|Dr|Hwy|Ln|Way|Pl))/i);
    if (addrMatch) return addrMatch[1].trim();
  }
  // Check talkStory for addresses
  if (spot.talkStory) {
    const addrMatch = spot.talkStory.match(/(\d+[\w\s'-]+(?:Ave|St|Blvd|Rd|Dr|Hwy|Ln|Way|Pl))/i);
    if (addrMatch) return addrMatch[1].trim();
  }
  return null;
}

async function main() {
  const categories = fs.readdirSync(SPOTS_DIR).filter(d =>
    fs.statSync(path.join(SPOTS_DIR, d)).isDirectory()
  );

  const flagged = [];
  let total = 0;

  for (const cat of categories) {
    const catDir = path.join(SPOTS_DIR, cat);
    const files = fs.readdirSync(catDir).filter(f => f.endsWith('.json'));

    for (const file of files) {
      const filePath = path.join(catDir, file);
      const spot = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      total++;

      try {
        // Forward geocode with just name + area (what we used before)
        const fwdData = await forwardGeocode(`${spot.name}, ${spot.area || ''}, Oahu, Hawaii`);

        if (fwdData.status === 'OK' && fwdData.results.length > 0) {
          const topResult = fwdData.results[0];
          const types = topResult.types || [];
          const formatted = topResult.formatted_address;

          // Check if result is vague
          const isVague = types.some(t => VAGUE_TYPES.has(t)) && !types.some(t => PRECISE_TYPES.has(t));

          if (isVague) {
            const addressHint = extractAddressHint(spot);
            flagged.push({
              name: spot.name,
              category: cat,
              file: filePath,
              currentLat: spot.lat,
              currentLng: spot.lng,
              geocodedTo: formatted,
              types: types,
              addressHint
            });
          }
        }
      } catch (err) {
        console.error(`  ERROR: ${spot.name} — ${err.message}`);
      }

      await new Promise(r => setTimeout(r, 100));
    }
  }

  console.log(`\nAudited ${total} spots. Found ${flagged.length} with vague coordinates:\n`);

  for (const f of flagged) {
    console.log(`  ${f.category}/${f.name}`);
    console.log(`    Geocoded to: ${f.geocodedTo}`);
    console.log(`    Types: ${f.types.join(', ')}`);
    if (f.addressHint) console.log(`    Address hint: "${f.addressHint}"`);
    console.log();
  }

  // Now attempt to fix flagged spots using address hints or more specific queries
  console.log(`\n--- Attempting fixes ---\n`);
  let fixed = 0;

  for (const f of flagged) {
    const spot = JSON.parse(fs.readFileSync(f.file, 'utf8'));
    let betterQuery = null;

    if (f.addressHint) {
      betterQuery = `${f.addressHint}, ${spot.area || ''}, Honolulu, Hawaii`;
    } else {
      // Try with "restaurant/beach/etc" appended for context
      betterQuery = `${spot.name} ${spot.subcategory || spot.category}, ${spot.area || ''}, Oahu, Hawaii`;
    }

    try {
      const data = await forwardGeocode(betterQuery);
      if (data.status === 'OK' && data.results.length > 0) {
        const result = data.results[0];
        const types = result.types || [];
        const isPrecise = types.some(t => PRECISE_TYPES.has(t)) || !types.some(t => VAGUE_TYPES.has(t));
        const loc = result.geometry.location;

        // Verify on Oahu
        if (loc.lat < 21.1 || loc.lat > 21.8 || loc.lng < -158.4 || loc.lng > -157.5) {
          console.log(`  SKIP (off-island): ${spot.name}`);
          continue;
        }

        if (isPrecise) {
          spot.lat = round(loc.lat);
          spot.lng = round(loc.lng);
          fs.writeFileSync(f.file, JSON.stringify(spot, null, 2) + '\n');
          console.log(`  FIXED: ${spot.name} -> ${result.formatted_address} [${types.join(', ')}]`);
          fixed++;
        } else {
          console.log(`  STILL VAGUE: ${spot.name} -> ${result.formatted_address} [${types.join(', ')}]`);
          console.log(`    Query was: "${betterQuery}"`);
        }
      }
    } catch (err) {
      console.error(`  ERROR: ${spot.name} — ${err.message}`);
    }

    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`\nFixed ${fixed}/${flagged.length} vague spots. Remaining need manual review.`);
}

main();
