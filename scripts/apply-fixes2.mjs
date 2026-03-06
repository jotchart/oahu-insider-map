import fs from 'fs';
import path from 'path';

const SPOTS_DIR = path.resolve('data/spots');
const fixes = {
  "H Mart Keeaumoku":  { lat: 21.2962, lng: -157.8412 },
  "Beet Box Cafe":     { lat: 21.397,  lng: -157.7309 },
  "Moanalua Valley Trail": { lat: 21.3601, lng: -157.8993 },
  "Like Like Drive Inn":   { lat: 21.3264, lng: -157.8695 },
  "Kamananui (Moanalua) Valley to Dam": { lat: 21.3601, lng: -157.8993 },
};

const categories = fs.readdirSync(SPOTS_DIR).filter(d =>
  fs.statSync(path.join(SPOTS_DIR, d)).isDirectory()
);

let updated = 0;
for (const cat of categories) {
  const catDir = path.join(SPOTS_DIR, cat);
  for (const file of fs.readdirSync(catDir).filter(f => f.endsWith('.json'))) {
    const filePath = path.join(catDir, file);
    const spot = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (fixes[spot.name]) {
      spot.lat = fixes[spot.name].lat;
      spot.lng = fixes[spot.name].lng;
      fs.writeFileSync(filePath, JSON.stringify(spot, null, 2) + '\n');
      console.log(`Updated: ${spot.name} -> [${spot.lat}, ${spot.lng}]`);
      updated++;
    }
  }
}
console.log(`\nDone: ${updated} spots updated`);
