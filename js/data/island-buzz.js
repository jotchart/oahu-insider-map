// ── Island Buzz Data ──
// Fresh insider gossip, openings, closings, and scene changes across Oahu
// Last updated: March 2026

export const BUZZ_ITEMS = [
  // ── New Openings ──
  {
    type: 'opening',
    headline: "Alan Wong's is BACK at The Kahala Hotel",
    body: "The legendary chef's flagship returns after a 5-year closure. Expect the signature ginger-crusted onaga and classics from the King Street era. Opening March 2026 — reservations will be impossible for months.",
    area: 'Kahala',
    region: 'East Honolulu',
    date: '2026-03',
    tags: ['restaurant', 'fine-dining']
  },
  {
    type: 'opening',
    headline: 'Mokihana Haus bringing craft beer culture to Kaimuki',
    body: "A beer bar with midcentury modern Hawaiian vibes opening summer 2026. The real move: 90% of beers on the 12 taps will be brewed in Hawai\u02BBi. Same owner as Moke\u02BBs Bread & Breakfast next door. Only 20 bar seats so get there early for pau hana.",
    area: 'Kaimuki',
    region: 'Metro Honolulu',
    date: '2026-06',
    tags: ['nightlife', 'beer']
  },
  {
    type: 'opening',
    headline: 'Mama Guava: Modern Filipino-American pop-up in Chinatown',
    body: "Chef Monique Cadavona (ex-MW Restaurant, The Pig & the Lady) is doing a limited pop-up through February. Crispy lumpia in look fun, anato-red banh xeo, longanisa smash burger. Tue-Sat 11am-2:30pm only. This will sell out.",
    area: 'Chinatown',
    region: 'Metro Honolulu',
    date: '2026-02',
    tags: ['restaurant', 'pop-up', 'filipino']
  },
  {
    type: 'opening',
    headline: 'Adez Steakhouse takes over the old Blind Ox speakeasy',
    body: "Table-grilled steaks heated to 500\u00B0F in the former Blind Ox space on Kapahulu. $65 prix fixe gets you appetizers, steak, sides, and dessert. The vibe is part steakhouse, part dessert lounge. Valet parking available.",
    area: 'Kapahulu',
    region: 'Metro Honolulu',
    date: '2026-01',
    tags: ['restaurant', 'steakhouse']
  },
  {
    type: 'opening',
    headline: "The Park on Ke'eaumoku: New food hall is stacked",
    body: "Midtown Eats food hall opened Jan 17 with FEAST by Jon Matsubara, Middle Eats, Soul Chicken, and Serg's Mexican Kitchen all under one roof. Ground floor of 1515 Liona St. Finally a proper food hall outside of Waikiki.",
    area: "Ke'eaumoku",
    region: 'Metro Honolulu',
    date: '2026-01',
    tags: ['restaurant', 'food-hall']
  },
  {
    type: 'opening',
    headline: 'Sip Cafe brings Hanoi-style egg coffee to Kalihi',
    body: "Hand-whipped egg cream espresso and legit Saigon Classic banh mi with roast pork, steamed sausage, and pate. Tiny spot on Dillingham, opened Jan 5. Seating is limited \u2014 plan on takeout. Daily 7am-4pm.",
    area: 'Kalihi',
    region: 'Metro Honolulu',
    date: '2026-01',
    tags: ['coffee', 'vietnamese']
  },
  {
    type: 'opening',
    headline: 'Nori Bar hand rolls coming to Waikiki',
    body: "Known for crisp nori and Koshihikari rice, Nori Bar is taking over the old Ice Monster space on Kuhio Ave. March 2026 opening. The counter-style hand roll format is blowing up nationally and this is the real deal.",
    area: 'Waikiki',
    region: 'Metro Honolulu',
    date: '2026-03',
    tags: ['restaurant', 'sushi']
  },
  {
    type: 'opening',
    headline: 'Liliha Bakery opening 6th location in Waikiki Beach Walk',
    body: "The Coco Puff empire expands into the former Blue Fish Waikiki space at Waikiki Beach Walk. Summer 2026. Tourists will finally stop asking you where to get Coco Puffs \u2014 it'll be right on Lewers St.",
    area: 'Waikiki',
    region: 'Metro Honolulu',
    date: '2026-06',
    tags: ['bakery']
  },
  {
    type: 'opening',
    headline: 'Domodomo brings Michelin Bib Gourmand handrolls to Ewa Beach',
    body: "The NYC handroll pioneer (Michelin Bib Gourmand) opened at 360\u00BA Ewa Beach Country Club. $79 Domokase tasting menu with golf course views. This is probably the fanciest thing to ever happen in Ewa Beach.",
    area: 'Ewa Beach',
    region: 'West Oahu',
    date: '2025-11',
    tags: ['restaurant', 'sushi']
  },
  {
    type: 'opening',
    headline: 'Okazuya pop-up at Diamond Head Market from ex-Nami Kaze chef',
    body: "Chef Jason Peel landed at Diamond Head Market after Nami Kaze closed. Wednesday mornings only, 7:30-9:30am \u2014 ginger fried chicken, Grandma's Potato Salad, furikake Goteburg musubis. Rooftop supper club planned for later.",
    area: 'Diamond Head',
    region: 'Metro Honolulu',
    date: '2026-01',
    tags: ['restaurant', 'pop-up', 'okazuya']
  },
  {
    type: 'opening',
    headline: 'Westman Cafe + Lounge returns at Ward Village',
    body: "After closing the Waikiki Beach Walk location in early 2024, the souffle pancake spot is back at 1000 Auahi St. The brunch lines will be insane again.",
    area: "Kaka'ako",
    region: 'Metro Honolulu',
    date: '2026-02',
    tags: ['restaurant', 'brunch']
  },
  {
    type: 'opening',
    headline: 'Okome Tendon & Poke: Tempura fried in beef tallow',
    body: "Offshoot of Kapolei's Okome now in Kaka'ako. They fry their tempura in beef tallow instead of seed oils \u2014 it's light and absurdly rich. Paired with steak, spicy pork, or poke bowls. Mon-Sat 10:30am-8pm.",
    area: "Kaka'ako",
    region: 'Metro Honolulu',
    date: '2025-12',
    tags: ['restaurant', 'japanese']
  },
  {
    type: 'opening',
    headline: 'Makanai cafe fills the Sure Shot void in Makiki',
    body: "Coffee, matcha, pastries, and sandos on Mille Fete bread with bagels from Tali's Bagels & Schmear. Run by the former Sushi King family. Young, casual energy in a neighborhood that was hurting for a good cafe after Sure Shot closed.",
    area: 'Makiki',
    region: 'Metro Honolulu',
    date: '2025-12',
    tags: ['coffee', 'cafe']
  },
  {
    type: 'opening',
    headline: "Sonic Drive-In arrives in Kapolei \u2014 yes, with roller skating servers",
    body: "Oahu's first Sonic opens on the corner of Fort Barrette Road and Kapolei Parkway, spring 2026. Classic drive-in service, the full iconic menu. The West Side finally gets something the Mainland has had for decades.",
    area: 'Kapolei',
    region: 'West Oahu',
    date: '2026-03',
    tags: ['restaurant', 'fast-food']
  },
  {
    type: 'opening',
    headline: "Totoya's third location opening in Aiea",
    body: "The negitoro sushi bowl spot that had lines out the door in Kaimuki (2024) and Ala Moana (2025) is now expanding to Aiea. Opens Feb 15. Parent company Funergy Group is also planning a women-run izakaya for Ala Moana area in 2026.",
    area: 'Aiea',
    region: 'Pearl City / Aiea',
    date: '2026-02',
    tags: ['restaurant', 'sushi']
  },

  // ── Closings & Shakeups ──
  {
    type: 'closing',
    headline: 'Nami Kaze closed \u2014 chef resurfaces at Diamond Head Market',
    body: "Nami Kaze shuttered in October 2025. Chef Jason Peel didn't skip a beat though \u2014 he's now doing a Wednesday morning okazuya pop-up at Diamond Head Market with plans for a rooftop supper club.",
    area: 'Metro Honolulu',
    region: 'Metro Honolulu',
    date: '2025-10',
    tags: ['restaurant', 'closing']
  },
  {
    type: 'closing',
    headline: '$16 minimum wage hitting restaurants hard in 2026',
    body: "Hawaii's minimum wage jumped to $16 at the start of 2026 and restaurant owners are feeling it. Expect smaller portions, higher prices, and more service charges. Some spots are cutting staff or reducing hours. D.K. Steakhouse was among the 2025 casualties.",
    area: 'Island-wide',
    region: 'Metro Honolulu',
    date: '2026-01',
    tags: ['industry', 'economy']
  },

  // ── Scene Reports ──
  {
    type: 'scene',
    headline: 'Chinatown Arch groundbreaking \u2014 revitalization is real this time',
    body: "Construction broke ground Feb 28 at Kekaulike Mall for the first Honolulu Chinatown Arch. Phase 2 extends from Hotel St to Nimitz near the new rail station. Mayor Blangiardi is pushing free walking tours, food tours, and more public art. Also pushing Taiwan to fix the crumbling Cultural Plaza.",
    area: 'Chinatown',
    region: 'Metro Honolulu',
    date: '2026-02',
    tags: ['development', 'culture']
  },
  {
    type: 'scene',
    headline: 'Kaimuki keeps evolving \u2014 new piercing shop, craft store, beer bar',
    body: "Honolulu Piercing Co. opened on the corner of Koko Head and Waialae (14K gold, implant-grade titanium). Death by Scrapbooking has a standalone shop now. Mokihana Haus beer bar coming this summer. Miro is reopening Feb 2026. The Waialae strip is quietly becoming the coolest stretch on the island.",
    area: 'Kaimuki',
    region: 'Metro Honolulu',
    date: '2026-02',
    tags: ['neighborhood', 'shopping']
  },
  {
    type: 'scene',
    headline: 'North Shore got hammered \u2014 worst February for waves in years',
    body: "Historic rains and flash floods turned Waimea and nearby lineups into brown, debris-choked chaos. Nathan Florence called it the worst February for waves he's seen. The water was too muddy and full of debris to safely surf for days. Climate patterns are shifting the season.",
    area: 'North Shore',
    region: 'North Shore',
    date: '2026-02',
    tags: ['surf', 'weather']
  },
  {
    type: 'scene',
    headline: 'Pipe Masters is back to its original name',
    body: "The Billabong Pipe Masters has officially returned to just 'Pipe Masters.' In 2026 it once again closes out the Championship Tour season at Banzai Pipeline. The WSL Lexus Pipeline Challenger Series ran Jan 29 - Feb 9.",
    area: 'North Shore',
    region: 'North Shore',
    date: '2026-01',
    tags: ['surf', 'competition']
  },
  {
    type: 'scene',
    headline: 'Eat the Street still going strong \u2014 last Friday of every month',
    body: "40+ vendors, 7,000+ attendees every time. The monthly food truck event is basically Oahu's unofficial food festival. If you haven't been, you're missing the best cross-section of the local food scene in one place.",
    area: 'Metro Honolulu',
    region: 'Metro Honolulu',
    date: '2026-03',
    tags: ['food-truck', 'event']
  },
  {
    type: 'scene',
    headline: 'Chinatown nightlife still has it \u2014 Scarlet is the newest addition',
    body: "Scarlet Bar & Dance Club brought a doll house theme and spacious dance floor to Chinatown. The Manifest still does the cafe-by-day, cocktail-bar-by-night thing. NextDoor stays packed for live music. Bar 35 still has 100+ beers. First Friday art walk remains the move.",
    area: 'Chinatown',
    region: 'Metro Honolulu',
    date: '2026-01',
    tags: ['nightlife', 'bars']
  },
  {
    type: 'scene',
    headline: "Banh Mi Paradise on Ke'eaumoku \u2014 tiny shop, massive flavor",
    body: "Bo la lot banh mi (betel leaf roll sandwiches) from a tiny shop that combines items you'd normally have to hit separate street carts for. Open Wed-Mon 10:30am-8pm. The kind of place only locals know about.",
    area: "Ke'eaumoku",
    region: 'Metro Honolulu',
    date: '2026-01',
    tags: ['restaurant', 'vietnamese']
  },
  {
    type: 'scene',
    headline: 'Chill n Grill doing Northern Chinese skewers until midnight in Kakaako',
    body: "Surf clams, shredded pork heart, and unconventional hot pot selections next to Lin's Hawaiian Snacks. Open Tue-Sun, 5pm to midnight for the skewer action. This is the late-night move Kaka'ako was missing.",
    area: "Kaka'ako",
    region: 'Metro Honolulu',
    date: '2026-01',
    tags: ['restaurant', 'chinese', 'late-night']
  }
];

// Categorize items by type
export const BUZZ_TYPES = {
  opening: { label: 'Now Open', icon: '\u{1F389}', color: '#69f0ae' },
  closing: { label: 'Closed / RIP', icon: '\u{1F614}', color: '#e94560' },
  scene: { label: 'Scene Report', icon: '\u{1F4E1}', color: '#4fc3f7' }
};

// Which areas/regions each buzz item is relevant to
export function getBuzzForArea(areaOrRegion) {
  return BUZZ_ITEMS.filter(b =>
    b.area === areaOrRegion || b.region === areaOrRegion || b.area === 'Island-wide'
  );
}
