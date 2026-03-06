#!/usr/bin/env node
/**
 * Verify ALL spot coordinates against Google Places API.
 * Uses Text Search for businesses and Geocoding for natural features.
 * Fixes anything more than 100m off.
 */

import fs from 'fs';
import path from 'path';

const API_KEY = 'AIzaSyCWeYmpo43ruOCJ1JV0ZcZcTKG-G2Knen0';
const SPOTS_DIR = path.resolve('data/spots');

// Haversine distance in meters
function distMeters(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function round(n) { return Math.round(n * 1e4) / 1e4; }

// Oahu bounding box
function onOahu(lat, lng) {
  return lat >= 21.1 && lat <= 21.8 && lng >= -158.4 && lng <= -157.5;
}

// Google Places Text Search
async function placesSearch(query) {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&location=21.46,-157.97&radius=50000&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status === 'OK' && data.results.length > 0) {
    const r = data.results[0];
    return {
      lat: r.geometry.location.lat,
      lng: r.geometry.location.lng,
      name: r.name,
      address: r.formatted_address,
      types: r.types
    };
  }
  return null;
}

// Google Geocoding fallback
async function geocode(query) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&bounds=21.2,-158.3|21.72,-157.6&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status === 'OK' && data.results.length > 0) {
    const r = data.results[0];
    return {
      lat: r.geometry.location.lat,
      lng: r.geometry.location.lng,
      name: query,
      address: r.formatted_address,
      types: r.types
    };
  }
  return null;
}

async function main() {
  const categories = fs.readdirSync(SPOTS_DIR).filter(d =>
    fs.statSync(path.join(SPOTS_DIR, d)).isDirectory()
  );

  let total = 0, correct = 0, fixed = 0, failed = 0;
  const report = { correct: [], fixed: [], failed: [] };

  for (const cat of categories) {
    const catDir = path.join(SPOTS_DIR, cat);
    const files = fs.readdirSync(catDir).filter(f => f.endsWith('.json'));
    console.log(`\n=== ${cat.toUpperCase()} (${files.length} spots) ===`);

    for (const file of files) {
      const filePath = path.join(catDir, file);
      const spot = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      total++;

      // Build search query based on category
      let query;
      const isNatural = ['beach', 'hike', 'snorkel'].includes(cat);
      if (isNatural) {
        query = `${spot.name}, Oahu, Hawaii`;
      } else {
        query = `${spot.name}, ${spot.area || ''}, Oahu, Hawaii`;
      }

      try {
        // Try Places API first (better for businesses)
        let result = await placesSearch(query);

        // If Places returned off-island or nothing, try geocoding
        if (!result || !onOahu(result.lat, result.lng)) {
          result = await geocode(query);
        }

        if (!result || !onOahu(result.lat, result.lng)) {
          console.log(`  FAIL: ${spot.name} — no valid result`);
          report.failed.push({ name: spot.name, cat, file });
          failed++;
          await new Promise(r => setTimeout(r, 120));
          continue;
        }

        const dist = distMeters(spot.lat, spot.lng, result.lat, result.lng);

        if (dist <= 100) {
          // Close enough
          correct++;
          report.correct.push({ name: spot.name, dist: Math.round(dist) });
        } else {
          // Fix it
          const oldLat = spot.lat, oldLng = spot.lng;
          spot.lat = round(result.lat);
          spot.lng = round(result.lng);
          fs.writeFileSync(filePath, JSON.stringify(spot, null, 2) + '\n');
          fixed++;
          console.log(`  FIXED: ${spot.name} (${Math.round(dist)}m off) -> ${result.address}`);
          report.fixed.push({ name: spot.name, cat, dist: Math.round(dist), address: result.address });
        }
      } catch (err) {
        console.log(`  ERROR: ${spot.name} — ${err.message}`);
        report.failed.push({ name: spot.name, cat, error: err.message });
        failed++;
      }

      // Rate limit: ~8 req/sec
      await new Promise(r => setTimeout(r, 120));
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`SUMMARY: ${total} spots checked`);
  console.log(`  ${correct} correct (within 100m)`);
  console.log(`  ${fixed} fixed`);
  console.log(`  ${failed} failed (need manual review)`);
  console.log(`${'='.repeat(60)}`);

  if (report.fixed.length > 0) {
    console.log(`\nAll fixes:`);
    for (const f of report.fixed.sort((a,b) => b.dist - a.dist)) {
      console.log(`  ${f.dist}m  ${f.cat}/${f.name} -> ${f.address}`);
    }
  }

  if (report.failed.length > 0) {
    console.log(`\nFailed (need manual review):`);
    for (const f of report.failed) {
      console.log(`  ${f.cat}/${f.name}`);
    }
  }
}

main();
