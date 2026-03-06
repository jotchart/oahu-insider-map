import fs from 'fs';
import path from 'path';

const SPOTS_DIR = path.resolve('data/spots');
const fixes = {
  "Dee Lite Bakery":        { lat: 21.3195, lng: -157.8653 },
  "Ewa Beach":              { lat: 21.3126, lng: -157.9997 },
  "Kawela Bay":             { lat: 21.6975, lng: -158.0087 },
  "Yokohama Bay":           { lat: 21.5488, lng: -158.242  },
  "First Friday Art Walk":  { lat: 21.3115, lng: -157.8609 },
  "Shangri La":             { lat: 21.2571, lng: -157.7949 },
  "Kamananui (Moanalua) Valley to Dam": { lat: 21.3429, lng: -157.8904 },
  "Koloa Gulch":            { lat: 21.6325, lng: -157.9294 },
  "AGU A Ramen Bistro":     { lat: 21.3002, lng: -157.8456 },
  "bEASTside Kitchen":      { lat: 21.2779, lng: -157.7046 },
  "Buzz's Lanikai":         { lat: 21.3961, lng: -157.7265 },
  "Tamura's Fine Wine & Liquors": { lat: 21.3916, lng: -157.7412 },
  "Maili Point":            { lat: 21.4276, lng: -158.1786 },
  "Pupukea Tide Pools":     { lat: 21.6525, lng: -158.062  },
  "Haili's Hawaiian Food":  { lat: 21.3217, lng: -157.8671 },
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
      console.log(`Updated: ${spot.name}`);
      updated++;
    }
  }
}
console.log(`\nDone: ${updated} spots updated`);
