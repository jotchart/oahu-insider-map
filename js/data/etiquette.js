// ── Cultural Etiquette Data ──
// Local customs, do's and don'ts, per-neighborhood notes

export const GENERAL_RULES = [
  { category: "greeting", rule: "Remove your shoes before entering anyone's home", detail: "This is non-negotiable in Hawaii. Look for shoes at the door as your cue." },
  { category: "greeting", rule: "Use 'aloha' as both hello and goodbye", detail: "It means love, compassion, and respect — not just a tourist greeting." },
  { category: "greeting", rule: "Give a shaka (hang loose sign) when someone lets you merge or as a thank you", detail: "Extend thumb and pinky, curl other fingers. The universal Hawaii gesture of goodwill." },
  { category: "greeting", rule: "Don't honk your horn unless it's an emergency", detail: "Honking is considered extremely rude in Hawaii. Be patient." },
  { category: "food", rule: "Never refuse food offered by a local", detail: "Even just a small taste shows respect. Saying 'no thank you' to offered food is considered rude." },
  { category: "food", rule: "Bring something when invited to a gathering — never show up empty-handed", detail: "A box of Liliha Bakery coco puffs or Leonard's malasadas is the gold standard 'omiyage' (gift)." },
  { category: "food", rule: "Eat poi with two fingers, never a fork or spoon", detail: "Poi is sacred in Hawaiian culture — it represents Haloa, the ancestor of the Hawaiian people." },
  { category: "food", rule: "Don't make a face at poi or local food", detail: "Even if you don't love it, show appreciation. The food carries deep cultural meaning." },
  { category: "driving", rule: "Let people merge — the 'zipper' is gospel", detail: "Refusing to let someone merge will get you stink-eye for miles. It's personal." },
  { category: "driving", rule: "Don't tailgate or drive aggressively", detail: "Island pace applies to driving. Road rage is seen as mainlander behavior." },
  { category: "driving", rule: "Wave thank-you when someone lets you in", detail: "A quick hand raise or shaka out the window. Always acknowledge courtesy." },
  { category: "driving", rule: "Never honk at someone going slow in a residential area", detail: "They might be looking for a house, or that's just how they drive. Patience." },
  { category: "cultural", rule: "Don't touch or climb on Hawaiian cultural sites (heiau)", detail: "These are sacred temples. Treat them with the same respect you'd give a church or mosque." },
  { category: "cultural", rule: "Don't stack rocks or build cairns", detail: "Rock stacking disturbs Hawaiian spiritual sites and the natural environment. Leave rocks where they are." },
  { category: "cultural", rule: "Don't take lava rocks, sand, or coral home", detail: "Beyond being illegal, Pele's Curse says bad luck follows those who take volcanic rock from Hawaii." },
  { category: "cultural", rule: "Learn to say place names correctly — it matters", detail: "Pronunciation shows respect. 'Hawaii' has 4 syllables: ha-VAI-ee. Ask locals if unsure." },
  { category: "cultural", rule: "Don't call locals 'Hawaiians' unless they are ethnically Hawaiian", detail: "Hawaii residents are 'locals.' 'Hawaiian' refers specifically to Native Hawaiian ethnicity." },
  { category: "cultural", rule: "Respect 'kapu' (forbidden/keep out) signs", detail: "Kapu means sacred or forbidden. It's not a suggestion — it's a deeply rooted cultural boundary." },
  { category: "social", rule: "Don't brag about mainland prices, salaries, or how things are 'back home'", detail: "Nothing frustrates locals more. You chose to come here — embrace island life as it is." },
  { category: "social", rule: "Time moves differently here — 'Hawaiian time' is real", detail: "Being 15-30 minutes late is normal for social events. Don't stress it." },
  { category: "social", rule: "Use 'auntie' and 'uncle' for elders you don't know well", detail: "It's a sign of respect, not familiarity. Used for anyone a generation or more older." },
  { category: "social", rule: "Talk story — don't rush conversations", detail: "'Talking story' means having a relaxed chat. Rushing to the point is seen as rude." },
  { category: "social", rule: "Say 'mahalo' (thank you) generously", detail: "Use it often with everyone — servers, bus drivers, strangers. Gratitude is the island way." },
  { category: "social", rule: "Don't whistle at night", detail: "Hawaiian belief says whistling at night calls the Night Marchers (spirits of ancient warriors)." },
];

export const BEACH_RULES = [
  { rule: "Never turn your back on the ocean", detail: "Rogue waves are real and deadly. People die every year from being caught off guard." },
  { rule: "Don't touch sea turtles (honu)", detail: "Federal law: stay 10+ feet away. $10,000+ fine. They're endangered and sacred in Hawaiian culture." },
  { rule: "Don't touch or stand on coral", detail: "Coral is alive. One footstep can destroy decades of growth. Wear reef-safe sunscreen." },
  { rule: "Use reef-safe sunscreen only", detail: "Hawaii banned oxybenzone and octinoxate sunscreens. Zinc oxide is the gold standard." },
  { rule: "Don't chase or harass monk seals", detail: "Hawaiian monk seals are critically endangered. Stay 50+ feet away. Report sightings to NOAA." },
  { rule: "If you see a red flag, don't swim", detail: "Red means dangerous currents. Locals drown too. Respect lifeguard warnings without exception." },
  { rule: "Swim between the flags at lifeguarded beaches", detail: "The flags mark the safest swimming area. Outside the flags = outside the lifeguard's effective rescue zone." },
  { rule: "Don't leave anything visible in your car at the beach", detail: "Car break-ins are the #1 crime affecting tourists. Trunk it before you arrive, not at the parking lot." },
  { rule: "Pack out everything you bring — leave nothing on the beach", detail: "Locals take 'leave no trace' seriously. Pick up after yourself and then some." },
  { rule: "Respect the lineup if you're surfing", detail: "Don't drop in on someone's wave. Wait your turn. Locals have priority at their home breaks." },
  { rule: "Don't block beach access paths", detail: "All beaches in Hawaii are public by law. Blocking access is illegal and deeply resented." },
  { rule: "Enter the water feet-first in unfamiliar spots", detail: "Hidden rocks, shallow reef, and strong currents catch people off guard. Never dive head-first into unknown water." },
];

// Per-neighborhood etiquette notes (keyed by neighborhood name)
export const NEIGHBORHOOD_ETIQUETTE = {
  "Waikiki": [
    "Waikiki is the exception to many local norms — it's tourist-friendly by design",
    "Don't feed the pigeons or chickens — it's a real problem here",
    "Street performers on Kalakaua expect tips if you stop and watch"
  ],
  "North Shore": [
    "Respect the surf lineup — locals have deep priority at Pipe, Sunset, and V-Land",
    "Don't litter at beach parks — North Shore community does regular cleanups and notices",
    "Slow down on Kamehameha Highway — it's a neighborhood road, not a freeway"
  ],
  "Kailua": [
    "Don't park in residential driveways to access Lanikai Beach — you will be towed",
    "The neighborhood is very bike-friendly — watch for cyclists on the bike path",
    "Kailua residents fought hard to limit commercialization — respect the community feel"
  ],
  "Chinatown": [
    "Be street-smart after dark, especially on Hotel Street",
    "Don't photograph people without permission — the community values privacy",
    "Support local businesses — don't just walk through, buy something"
  ],
  "Waianae": [
    "This is Hawaiian homeland — approach with deep respect and humility",
    "Don't stop to photograph homeless camps — it's dehumanizing",
    "Ask before taking photos of cultural sites or practices",
    "Don't leave valuables visible in your car — ever"
  ],
  "Haleiwa": [
    "During winter surf season, don't park on the highway shoulder — it's dangerous and illegal",
    "The one-lane bridge is part of the town's charm — be patient, don't honk",
    "Local shops close early — don't expect mainland hours"
  ],
  "Manoa": [
    "The valley is residential — keep noise down, especially near UH dorms during exams",
    "Stay on marked trails at Manoa Falls — the forest is fragile",
    "Mosquito repellent is essential — Manoa's moisture breeds them year-round"
  ],
  "Kahala": [
    "Kahala Hotel beach is public but don't abuse the privilege — be respectful of hotel guests",
    "Don't gawk at mansions or trespass on private beaches (there are none — all beaches are public)",
    "The neighborhood is very quiet — keep music and noise to a minimum"
  ],
  "Pearl Harbor": [
    "This is hallowed ground — treat it with the reverence of a cemetery",
    "No swimwear or flip-flops at the memorial — dress respectfully",
    "Photography is fine but be solemn — no selfies with peace signs"
  ],
  "Kalihi-Palama": [
    "Don't act nervous or clutch your belongings — locals can tell and it's offensive",
    "The Filipino and Samoan communities here are warm if you show respect",
    "Helena's Hawaiian Food and Bishop Museum are worth the visit — don't skip Kalihi"
  ],
  "Waimanalo": [
    "This is Hawaiian homestead land — tread lightly and show respect",
    "Don't take photos of people or homes without permission",
    "Buy from local fruit stands — it supports the community directly"
  ],
  "Laie": [
    "BYU-Hawaii and the temple make this a conservative community — dress modestly",
    "Sunday is quiet day — many businesses close for the Sabbath",
    "The Polynesian Cultural Center is a major employer — locals are proud of it"
  ],
};
