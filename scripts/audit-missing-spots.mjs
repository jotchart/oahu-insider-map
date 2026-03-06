#!/usr/bin/env node
/**
 * Audit: Find highly-rated Oahu spots (>4.5 stars) we don't have yet
 * Uses Google Places API (New) text search
 */

import fs from 'fs';
import path from 'path';

const API_KEY = 'AIzaSyCWeYmpo43ruOCJ1JV0ZcZcTKG-G2Knen0';
const SPOTS_DIR = './data/spots';

// Oahu bounding box for location bias
const OAHU_CENTER = { lat: 21.4389, lng: -157.9783 };

// Load all existing spot names (normalized for comparison)
function loadExistingSpots() {
  const names = new Set();
  const dirs = fs.readdirSync(SPOTS_DIR);
  for (const dir of dirs) {
    const dirPath = path.join(SPOTS_DIR, dir);
    if (!fs.statSync(dirPath).isDirectory()) continue;
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.json'));
    for (const file of files) {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(dirPath, file), 'utf8'));
        if (data.name) names.add(normalize(data.name));
      } catch {}
    }
  }
  return names;
}

function normalize(name) {
  return name.toLowerCase()
    .replace(/['']/g, "'")
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Google Places API (New) Text Search
async function searchPlaces(query, pageToken) {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&location=${OAHU_CENTER.lat},${OAHU_CENTER.lng}&radius=40000&key=${API_KEY}${pageToken ? `&pagetoken=${pageToken}` : ''}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

// Get place details (for reviews, hours, etc.)
async function getPlaceDetails(placeId) {
  const fields = 'name,rating,user_ratings_total,price_level,formatted_address,types,editorial_summary,reviews,opening_hours,website,geometry';
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.result;
}

// Search queries grouped by category
const SEARCH_QUERIES = [
  // Restaurants
  { query: 'best restaurants Oahu Hawaii', category: 'restaurant' },
  { query: 'best Hawaiian food restaurant Oahu', category: 'restaurant' },
  { query: 'best Japanese restaurant Honolulu', category: 'restaurant' },
  { query: 'best sushi Honolulu Hawaii', category: 'restaurant' },
  { query: 'best ramen Honolulu Hawaii', category: 'restaurant' },
  { query: 'best poke Honolulu Oahu', category: 'restaurant' },
  { query: 'best Korean restaurant Honolulu', category: 'restaurant' },
  { query: 'best Chinese restaurant Honolulu', category: 'restaurant' },
  { query: 'best Thai restaurant Honolulu', category: 'restaurant' },
  { query: 'best Vietnamese restaurant Honolulu', category: 'restaurant' },
  { query: 'best brunch Honolulu Oahu', category: 'restaurant' },
  { query: 'best seafood restaurant Oahu Hawaii', category: 'restaurant' },
  { query: 'best plate lunch Oahu Hawaii', category: 'restaurant' },
  { query: 'best fine dining Honolulu Hawaii', category: 'restaurant' },
  { query: 'best cheap eats Honolulu Oahu', category: 'restaurant' },
  { query: 'best food truck North Shore Oahu', category: 'restaurant' },
  { query: 'best Italian restaurant Honolulu', category: 'restaurant' },
  { query: 'best steak restaurant Honolulu', category: 'restaurant' },
  { query: 'best taco Honolulu Oahu', category: 'restaurant' },
  { query: 'best musubi Oahu Hawaii', category: 'restaurant' },
  { query: 'hidden gem restaurant Oahu', category: 'restaurant' },
  { query: 'best Kailua restaurant Hawaii', category: 'restaurant' },
  { query: 'best North Shore restaurant Hawaii', category: 'restaurant' },

  // Bakery & Dessert
  { query: 'best bakery Honolulu Oahu', category: 'bakery' },
  { query: 'best dessert Honolulu Hawaii', category: 'bakery' },
  { query: 'best mochi Oahu Hawaii', category: 'bakery' },

  // Coffee
  { query: 'best coffee shop Honolulu Oahu', category: 'coffee' },
  { query: 'best cafe Honolulu Oahu Hawaii', category: 'coffee' },

  // Shave Ice
  { query: 'best shave ice Oahu Hawaii', category: 'shave-ice' },

  // Nightlife
  { query: 'best bar cocktail Honolulu Oahu', category: 'nightlife' },
  { query: 'best brewery taproom Honolulu Oahu', category: 'nightlife' },

  // Cultural / Attractions
  { query: 'best museum Oahu Hawaii', category: 'cultural' },
  { query: 'best temple shrine Oahu Hawaii', category: 'cultural' },
  { query: 'top tourist attractions Oahu Hawaii', category: 'cultural' },
  { query: 'best botanical garden Oahu Hawaii', category: 'cultural' },

  // Experiences
  { query: 'best things to do Oahu Hawaii', category: 'experience' },
  { query: 'best tour Oahu Hawaii', category: 'experience' },
  { query: 'best snorkeling spot Oahu Hawaii', category: 'snorkel' },

  // Hikes
  { query: 'best hike trail Oahu Hawaii', category: 'hike' },

  // Kids
  { query: 'best family activities kids Oahu Hawaii', category: 'kids' },
];

async function main() {
  console.log('Loading existing spots...');
  const existing = loadExistingSpots();
  console.log(`Found ${existing.size} existing spots\n`);

  // Collect all unique places across queries
  const allPlaces = new Map(); // placeId -> { place, categories }

  for (const { query, category } of SEARCH_QUERIES) {
    console.log(`Searching: "${query}"...`);
    try {
      const data = await searchPlaces(query);
      if (data.results) {
        for (const place of data.results) {
          // Only Oahu (rough lat/lng filter)
          const lat = place.geometry?.location?.lat;
          const lng = place.geometry?.location?.lng;
          if (!lat || !lng) continue;
          if (lat < 21.2 || lat > 21.75 || lng < -158.35 || lng > -157.6) continue;

          // Only 4.5+ rating with enough reviews
          if (!place.rating || place.rating < 4.5) continue;
          if (!place.user_ratings_total || place.user_ratings_total < 50) continue;

          const norm = normalize(place.name);
          if (existing.has(norm)) continue;

          if (!allPlaces.has(place.place_id)) {
            allPlaces.set(place.place_id, { place, categories: new Set() });
          }
          allPlaces.get(place.place_id).categories.add(category);
        }
      }

      // Also get page 2 for restaurant queries
      if (category === 'restaurant' && data.next_page_token) {
        await sleep(2000); // Google requires delay for page tokens
        const page2 = await searchPlaces(query, data.next_page_token);
        if (page2.results) {
          for (const place of page2.results) {
            const lat = place.geometry?.location?.lat;
            const lng = place.geometry?.location?.lng;
            if (!lat || !lng) continue;
            if (lat < 21.2 || lat > 21.75 || lng < -158.35 || lng > -157.6) continue;
            if (!place.rating || place.rating < 4.5) continue;
            if (!place.user_ratings_total || place.user_ratings_total < 50) continue;

            const norm = normalize(place.name);
            if (existing.has(norm)) continue;

            if (!allPlaces.has(place.place_id)) {
              allPlaces.set(place.place_id, { place, categories: new Set() });
            }
            allPlaces.get(place.place_id).categories.add(category);
          }
        }
      }

      await sleep(300); // Rate limiting
    } catch (err) {
      console.error(`  Error: ${err.message}`);
    }
  }

  console.log(`\n=== Found ${allPlaces.size} candidate spots (>4.5 stars, not in our map) ===\n`);

  // Get details for top candidates, sorted by rating * log(reviews)
  const sorted = [...allPlaces.values()]
    .map(({ place, categories }) => ({
      ...place,
      categories: [...categories],
      score: place.rating * Math.log10(place.user_ratings_total)
    }))
    .sort((a, b) => b.score - a.score);

  // Get details for top 80
  const detailed = [];
  const toDetail = sorted.slice(0, 80);

  console.log('Fetching details for top candidates...\n');
  for (const place of toDetail) {
    try {
      const details = await getPlaceDetails(place.place_id);
      detailed.push({
        name: place.name,
        rating: place.rating,
        reviews: place.user_ratings_total,
        score: place.score,
        address: place.formatted_address,
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
        priceLevel: details?.price_level,
        types: place.types,
        categories: place.categories,
        editorial: details?.editorial_summary?.overview,
        website: details?.website,
        topReviews: (details?.reviews || []).slice(0, 2).map(r => ({
          rating: r.rating,
          text: r.text?.substring(0, 200)
        }))
      });
      await sleep(200);
    } catch (err) {
      console.error(`  Error getting details for ${place.name}: ${err.message}`);
    }
  }

  // Write results
  const output = JSON.stringify(detailed, null, 2);
  fs.writeFileSync('./scripts/audit-results.json', output);

  // Also print summary
  console.log('\n' + '='.repeat(80));
  console.log('AUDIT RESULTS — Highly-rated Oahu spots NOT in our map');
  console.log('='.repeat(80) + '\n');

  for (const spot of detailed) {
    const price = spot.priceLevel ? '$'.repeat(spot.priceLevel) : '?';
    console.log(`★ ${spot.rating} (${spot.reviews} reviews) | ${price} | ${spot.name}`);
    console.log(`  📍 ${spot.address}`);
    console.log(`  📂 Suggested: ${spot.categories.join(', ')}`);
    if (spot.editorial) console.log(`  📝 ${spot.editorial}`);
    console.log();
  }

  console.log(`\nTotal: ${detailed.length} candidates written to scripts/audit-results.json`);
}

main().catch(console.error);
