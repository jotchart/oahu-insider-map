// ── Safety & Emergency Data ──
// Tsunami zones, shelters, shorebreak, flash flood valleys, car break-in zones

export const TSUNAMI_ZONES = [
  // Simplified polygons for tsunami evacuation zones (major coastal areas)
  { name: "Waikiki", coords: [[21.2710,-157.8400],[21.2710,-157.8150],[21.2840,-157.8150],[21.2840,-157.8400]], risk: "high", notes: "All of Waikiki below Ala Wai Canal is in the tsunami zone. Evacuate mauka (toward the mountains) to Kapiolani Blvd or higher." },
  { name: "Ala Moana / Kakaako", coords: [[21.2850,-157.8650],[21.2850,-157.8400],[21.3000,-157.8400],[21.3000,-157.8650]], risk: "high", notes: "Low-lying coastal area. Head mauka past Beretania St." },
  { name: "Kailua Beach", coords: [[21.3900,-157.7350],[21.3900,-157.7100],[21.4050,-157.7100],[21.4050,-157.7350]], risk: "high", notes: "Kailua beach zone extends several blocks inland. Head to Kailua town center or higher ground." },
  { name: "North Shore", coords: [[21.5700,-158.1200],[21.5700,-158.0300],[21.6800,-158.0300],[21.6800,-158.1200]], risk: "high", notes: "Entire North Shore coastline. Head uphill toward Kamehameha Highway or higher." },
  { name: "Hawaii Kai Marina", coords: [[21.2850,-157.7150],[21.2850,-157.6950],[21.2980,-157.6950],[21.2980,-157.7150]], risk: "high", notes: "Marina area is very low-lying. Head toward Kalanianaole Highway or the ridges above." },
  { name: "Kaneohe Bay", coords: [[21.4200,-157.8100],[21.4200,-157.7800],[21.4600,-157.7800],[21.4600,-157.8100]], risk: "moderate", notes: "Bay provides some protection but still at risk. Head inland and uphill." },
  { name: "Leeward Coast", coords: [[21.3800,-158.2000],[21.3800,-158.1400],[21.4800,-158.1400],[21.4800,-158.2000]], risk: "high", notes: "Narrow coastal strip. Head uphill quickly — limited evacuation routes." },
];

export const HURRICANE_SHELTERS = [
  { name: "Blaisdell Center", lat: 21.3011, lng: -157.8461, capacity: 3000, type: "primary", area: "Metro Honolulu", notes: "Main shelter for metro Honolulu. Opens during hurricane warnings." },
  { name: "Farrington High School", lat: 21.3342, lng: -157.8645, capacity: 800, type: "primary", area: "Kalihi", notes: "Serves Kalihi-Palama area." },
  { name: "McKinley High School", lat: 21.2936, lng: -157.8435, capacity: 700, type: "primary", area: "Ala Moana", notes: "Serves McCully-Moiliili and Ala Moana." },
  { name: "Roosevelt High School", lat: 21.2977, lng: -157.8207, capacity: 600, type: "primary", area: "Makiki", notes: "Serves Makiki and lower Manoa." },
  { name: "Kailua High School", lat: 21.3986, lng: -157.7415, capacity: 700, type: "primary", area: "Kailua", notes: "Main windward shelter." },
  { name: "Castle High School", lat: 21.4108, lng: -157.7988, capacity: 600, type: "primary", area: "Kaneohe", notes: "Serves Kaneohe area." },
  { name: "Waianae High School", lat: 21.4402, lng: -158.1824, capacity: 500, type: "primary", area: "Waianae", notes: "Only shelter for the Leeward Coast. Can be hard to reach." },
  { name: "Mililani High School", lat: 21.4543, lng: -158.0048, capacity: 600, type: "primary", area: "Mililani", notes: "Serves Central Oahu." },
  { name: "Kapolei High School", lat: 21.3408, lng: -158.0753, capacity: 600, type: "primary", area: "Kapolei", notes: "Serves Kapolei, Ewa Beach, Ko Olina." },
  { name: "Kahuku High School", lat: 21.6808, lng: -157.9504, capacity: 400, type: "primary", area: "Kahuku", notes: "Serves North Shore and Kahuku. Remote — stock supplies." },
  { name: "Pearl City High School", lat: 21.3984, lng: -157.9705, capacity: 600, type: "primary", area: "Pearl City", notes: "Serves Pearl City and Aiea." },
  { name: "Waipahu High School", lat: 21.3869, lng: -158.0068, capacity: 500, type: "primary", area: "Waipahu", notes: "Serves Waipahu area." },
];

export const FLASH_FLOOD_ZONES = [
  { name: "Manoa Valley", lat: 21.31, lng: -157.803, risk: "high", tips: "Manoa Stream floods rapidly in heavy rain. Avoid the stream area. Manoa Falls trail can become dangerous." },
  { name: "Nuuanu Valley", lat: 21.33, lng: -157.84, risk: "high", tips: "Nuuanu Stream and surrounding areas flood quickly. Old Pali Road can become impassable." },
  { name: "Palolo Valley", lat: 21.298, lng: -157.795, risk: "high", tips: "Palolo Stream overflows in heavy rain. The deeper valley is most vulnerable." },
  { name: "Kalihi Valley", lat: 21.35, lng: -157.865, risk: "moderate", tips: "Kalihi Stream area. More rain than lower Kalihi. Watch for flash flood warnings." },
  { name: "Makaha Valley", lat: 21.48, lng: -158.2, risk: "moderate", tips: "Valley floor can flood in heavy rain. Roads may become impassable." },
  { name: "Hauula / Sacred Falls area", lat: 21.5670, lng: -157.8930, risk: "extreme", tips: "Sacred Falls closed permanently after a 1999 rockslide killed 8 hikers. The entire area is prone to flash floods and rockfalls. DO NOT enter." },
  { name: "Waimea Valley", lat: 21.6381, lng: -158.0506, risk: "moderate", tips: "The river can rise quickly after mountain rain. The botanical garden closes valley access during flood warnings." },
];

export const CAR_BREAKIN_ZONES = [
  { name: "Ala Moana Beach Park", lat: 21.2886, lng: -157.8453, risk: "high", tips: "Highest theft rate. Never leave anything visible. Use the trunk BEFORE arriving." },
  { name: "Diamond Head Crater parking", lat: 21.2613, lng: -157.8058, risk: "high", tips: "Tourist hotspot = theft hotspot. Leave nothing in the car at all." },
  { name: "Hanauma Bay parking", lat: 21.2690, lng: -157.6938, risk: "high", tips: "Secure lot but still frequent break-ins. Take everything with you." },
  { name: "Sandy Beach parking", lat: 21.2857, lng: -157.6727, risk: "high", tips: "Open lot with no security. Leave car empty and unlocked (some locals do this)." },
  { name: "Manoa Falls trailhead", lat: 21.3330, lng: -157.7980, risk: "high", tips: "Very common break-ins while hikers are on the trail. Don't leave packs or bags visible." },
  { name: "Tantalus/Puu Ualakaa lookout", lat: 21.3100, lng: -157.8220, risk: "moderate", tips: "Remote lookouts are targeted. Visit during daylight with other cars around." },
  { name: "North Shore beach parks", lat: 21.6423, lng: -158.0656, risk: "moderate", tips: "Waimea Bay, Sunset Beach lots. Less frequent than town but still happens." },
  { name: "Kailua Beach lots", lat: 21.3976, lng: -157.7271, risk: "moderate", tips: "Busy lots. Don't leave beach gear, electronics, or luggage visible." },
  { name: "Makaha Beach", lat: 21.4733, lng: -158.2178, risk: "high", tips: "Leeward coast has higher theft. Take everything. Don't leave windows cracked." },
  { name: "Kaena Point trailhead", lat: 21.5536, lng: -158.2497, risk: "high", tips: "Remote trailhead. Frequent break-ins. Bring only what you can carry." },
];

export const EMERGENCY_NUMBERS = {
  emergency: "911",
  coastGuard: "808-842-2600",
  poisonControl: "1-800-222-1222",
  tsunamiInfo: "808-723-8286",
  hurricaneInfo: "808-973-5286",
  oceanSafety: "808-922-3888",
  lifeguardDispatch: "808-723-4614",
  animalControl: "808-946-2187",
  nonEmergencyPolice: "808-529-3111",
};

export const SAFETY_TIPS = {
  tsunami: [
    "When you hear the tsunami siren (first Wednesday of each month is a test), move immediately to high ground",
    "A tsunami siren outside of the monthly test means MOVE NOW — don't wait to see the wave",
    "After a strong earthquake, don't wait for a siren — head to high ground immediately",
    "Tsunami waves come in sets — the first wave is often not the largest. Stay on high ground until all-clear",
    "Download the Hawaii Emergency Management app for real-time alerts"
  ],
  hurricane: [
    "Hurricane season is June-November, with peak in August-September",
    "Stock at least 14 days of food and water (1 gallon per person per day)",
    "Know your shelter — check honolulu.gov/dem for the nearest hurricane shelter",
    "Board up windows or use hurricane shutters. Tape does NOT work.",
    "Fill bathtubs and containers with water before the storm — water mains may break"
  ],
  ocean: [
    "Never turn your back on the ocean — rogue waves kill people every year",
    "If caught in a rip current: don't fight it. Swim parallel to shore, then ride the waves in",
    "Check surf reports before any ocean activity: surfnewsnetwork.com or Surfline",
    "Flat, calm water near a rocky point often hides powerful currents",
    "Portuguese man-o-war stings: remove tentacles with a stick (not hands), rinse with vinegar, see a doctor if severe"
  ],
};
