#!/usr/bin/env node
/**
 * Final verification: For every spot, search Google Places for the exact business
 * and compare coordinates. If the Place result differs by >50m, flag it.
 */

import fs from 'fs';
import path from 'path';

const API_KEY = 'AIzaSyCWeYmpo43ruOCJ1JV0ZcZcTKG-G2Knen0';
const SPOTS_DIR = path.resolve('data/spots');

function distMeters(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function round(n) { return Math.round(n * 1e4) / 1e4; }
function onOahu(lat, lng) { return lat >= 21.1 && lat <= 21.8 && lng >= -158.4 && lng <= -157.5; }

async function findPlace(name, lat, lng) {
  // Use Find Place with location bias for best precision
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(name)}&inputtype=textquery&locationbias=circle:5000@${lat},${lng}&fields=geometry,formatted_address,name,place_id&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status === 'OK' && data.candidates.length > 0) {
    const c = data.candidates[0];
    return {
      lat: c.geometry.location.lat,
      lng: c.geometry.location.lng,
      name: c.name,
      address: c.formatted_address,
      placeId: c.place_id
    };
  }
  return null;
}

async function textSearch(query) {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&location=21.46,-157.97&radius=50000&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status === 'OK' && data.results.length > 0) {
    const r = data.results[0];
    return {
      lat: r.geometry.location.lat,
      lng: r.geometry.location.lng,
      name: r.name,
      address: r.formatted_address
    };
  }
  return null;
}

async function main() {
  const categories = fs.readdirSync(SPOTS_DIR).filter(d =>
    fs.statSync(path.join(SPOTS_DIR, d)).isDirectory()
  );

  let total = 0, exact = 0, fixed = 0, needsReview = 0;
  const issues = [];

  for (const cat of categories) {
    const catDir = path.join(SPOTS_DIR, cat);
    const files = fs.readdirSync(catDir).filter(f => f.endsWith('.json'));

    for (const file of files) {
      const filePath = path.join(catDir, file);
      const spot = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      total++;

      try {
        // Use Find Place with location bias (most accurate for matching a known business)
        const searchName = `${spot.name} ${spot.area || ''} Oahu Hawaii`;
        let result = await findPlace(searchName, spot.lat, spot.lng);

        // Fallback to text search if Find Place fails
        if (!result || !onOahu(result.lat, result.lng)) {
          result = await textSearch(searchName);
        }

        if (!result || !onOahu(result.lat, result.lng)) {
          console.log(`  ?? ${cat}/${spot.name} — could not verify`);
          issues.push({ name: spot.name, cat, file: filePath, issue: 'no result' });
          needsReview++;
          await new Promise(r => setTimeout(r, 130));
          continue;
        }

        const dist = distMeters(spot.lat, spot.lng, result.lat, result.lng);

        if (dist <= 50) {
          exact++;
        } else {
          // Update coordinates to match Google's exact location
          spot.lat = round(result.lat);
          spot.lng = round(result.lng);
          fs.writeFileSync(filePath, JSON.stringify(spot, null, 2) + '\n');
          fixed++;
          const flag = dist > 500 ? ' ⚠️' : '';
          console.log(`  FIX ${Math.round(dist)}m: ${cat}/${spot.name} -> ${result.name} @ ${result.address}${flag}`);
        }
      } catch (err) {
        console.log(`  ERR: ${cat}/${spot.name} — ${err.message}`);
        needsReview++;
      }

      await new Promise(r => setTimeout(r, 130));
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`FINAL VERIFICATION: ${total} spots`);
  console.log(`  ✅ ${exact} exact match (within 50m)`);
  console.log(`  🔧 ${fixed} corrected`);
  console.log(`  ❓ ${needsReview} need manual review`);
  console.log(`${'='.repeat(60)}`);
}

main();
