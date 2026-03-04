// ── Street Intelligence Data ──
// Corridor-level insider intel for Metro Honolulu's key streets
// Last updated: March 2026

export const VIBE_STYLES = {
  food:      { color: '#69f0ae', icon: '\uD83C\uDF5C', label: 'Food Corridor' },
  nightlife: { color: '#ce93d8', icon: '\uD83C\uDF78', label: 'Nightlife' },
  shopping:  { color: '#ffb74d', icon: '\uD83D\uDECD\uFE0F', label: 'Shopping & Markets' },
  arts:      { color: '#90caf9', icon: '\uD83C\uDFA8', label: 'Arts & Culture' },
  mixed:     { color: '#fff176', icon: '\u2728', label: 'Mixed Vibes' },
};

export const STREET_CORRIDORS = [
  {
    id: 'kapahulu',
    name: 'Kapahulu Avenue',
    subtitle: 'The Food Crawl',
    neighborhood: 'Kaimuki',
    neighborhoods: ['Kaimuki', 'Kapahulu', 'Waikiki'],
    vibe: 'food',
    coords: [
      [21.2730, -157.8168],
      [21.2757, -157.8160],
      [21.2785, -157.8148],
      [21.2810, -157.8132],
      [21.2843, -157.8113],
      [21.2873, -157.8095]
    ],
    center: [21.2790, -157.8145],
    zoom: 16,
    summary: "Honolulu's best food crawl in a single mile. From Leonard's malasadas to Ono Seafood poke to Haili's Hawaiian plate lunches, this avenue packs more per-capita flavor than anywhere on the island. The 700 block between Winam and Hunter is the sweet spot — small shops, foot traffic, and landlords who actually keep rents sane.",
    insiderTip: "Walk from Leonard's south toward Waikiki. Hit Ono Seafood for poke, BBHI for a grass-fed burger, then King's Pizza Cafe for the Wednesday palm readings. The moped shops at 748-750 are an institution — Eric Low has been there since 1985.",
    bestTime: 'Weekday lunch, 11am-1pm',
    parking: "Street parking on side streets off Kapahulu. Avoid Kapahulu itself on weekends — brutal. The small lots behind Leonard's fill by 10am.",
    warnings: "Ono Seafood line starts forming at 11am. Leonard's trolley crowds peak mid-afternoon. Adez Steakhouse needs reservations on weekends.",
    spots: [
      { name: "Leonard's Bakery", type: 'bakery', note: "Malasadas since 1952. Get the haupia filled. The trolley brings waves of tourists but the line moves fast." },
      { name: "Ono Seafood", type: 'restaurant', note: "Poke bowls — Hawaiian limu + ahi shoyu, $12 large. Cash only. Founded by Judy Sakuma, now run by daughter Kim." },
      { name: "Haili's Hawaiian Food", type: 'restaurant', note: "Lau lau, kalua pig, poke since the '70s. Cook Jerry Ramos has been here 17 years. Lunch only 10am-2pm, closed Mon." },
      { name: "Adez Steakhouse", type: 'restaurant', note: "New 2026. 500\u00B0F table-grilled steaks in the old Blind Ox speakeasy. $65 prix fixe. Valet parking." },
      { name: "BBHI", type: 'restaurant', note: "Grass-fed burgers and burritos from an East L.A. native. Shrimp al Diablo is the sleeper hit." },
      { name: "King's Pizza Cafe", type: 'restaurant', note: "Retro '60s vibe. Wednesday palm readings, Thursday ukulele shows, Friday comedy open mic." },
      { name: "Na Lima Lili Hulu No'eau", type: 'cultural', note: "Feather lei workshops. Mele Kahalepuna Chun carries on the legacy of legendary artist Auntie Mary Kekuewa." },
      { name: "GoBo Glass", type: 'shopping', note: "DIY fused-glass studio. Make your own ornaments in a 1,350-degree kiln." },
      { name: "Cure Oahu", type: 'shopping', note: "Medical marijuana dispensary. HI 329 card required. Modernist design, 21 parking spaces." }
    ]
  },
  {
    id: 'waialae',
    name: 'Waialae Avenue',
    subtitle: 'The Indie Strip',
    neighborhood: 'Kaimuki',
    neighborhoods: ['Kaimuki'],
    vibe: 'food',
    coords: [
      [21.2823, -157.8128],
      [21.2830, -157.8075],
      [21.2837, -157.8020],
      [21.2843, -157.7968],
      [21.2850, -157.7920]
    ],
    center: [21.2837, -157.8020],
    zoom: 16,
    summary: "Kaimuki's main artery is quietly becoming the coolest stretch on the island. Independently owned everything — restaurants, boutiques, craft stores. No chains, no corporate landlords. The Waialae strip between 9th and 12th Ave is the bullseye. Mokihana Haus beer bar opening summer 2026 is the next big add.",
    insiderTip: "Start at Koko Head Cafe for brunch (get there by 8am or wait 45 min), walk east. Mud Hen Water for lunch. Totoya if you want the negitoro bowl everyone's obsessed with. End at Miro (reopened Feb 2026) for dinner. Death by Scrapbooking for a random browse between meals.",
    bestTime: 'Saturday morning for the full crawl',
    parking: "12th Ave side streets are your best bet. The public lot behind Koko Head Cafe exists but fills early on weekends.",
    warnings: "Koko Head Cafe brunch wait can be 60+ min on weekends. Totoya also draws lines. The strip gets dead after 9pm except for nightlife.",
    spots: [
      { name: "Mud Hen Water", type: 'restaurant', note: "Hawaiian regional cuisine. Chef Ed Kenney's flagship. Poi mac & cheese is legendary." },
      { name: "Koko Head Cafe", type: 'restaurant', note: "Brunch institution. Cornflake French toast, dumplings. Weekend waits are real." },
      { name: "Totoya", type: 'restaurant', note: "Negitoro sushi bowls. Had lines from day one in 2024. Now expanding to Aiea and Ala Moana." },
      { name: "Miro Kaimuki", type: 'restaurant', note: "Reopened Feb 2026 at 1108 12th Ave. Italian-Japanese fusion." },
      { name: "Mokihana Haus", type: 'nightlife', note: "Coming summer 2026. Beer bar, 12 taps, 90% Hawaiian brewed. Same owner as Moke's next door." },
      { name: "Death by Scrapbooking", type: 'shopping', note: "Craft supplies, stationery, activity kits. Between Small Kine Gift and Shop Toast." },
      { name: "Honolulu Piercing Co.", type: 'shopping', note: "Corner of Koko Head & Waialae. 14K gold, implant-grade titanium jewelry." },
      { name: "Marujuu", type: 'restaurant', note: "Japanese hamburg steak in the old Chubbie's Burgers spot. Opened late 2025." }
    ]
  },
  {
    id: 'hotel-st',
    name: 'Hotel Street',
    subtitle: 'Nightlife Row',
    neighborhood: 'Chinatown',
    neighborhoods: ['Chinatown', 'Downtown'],
    vibe: 'nightlife',
    coords: [
      [21.3120, -157.8650],
      [21.3125, -157.8625],
      [21.3132, -157.8595],
      [21.3138, -157.8565],
      [21.3145, -157.8535]
    ],
    center: [21.3130, -157.8595],
    zoom: 17,
    summary: "Chinatown's main drag and Honolulu's best bar hop. WWII red-light district turned arts-and-nightlife corridor. The neon 'Club Hubba Hubba' sign at 25 N Hotel marks a former jazz/burlesque venue. Smith's Union Bar has been pouring since 1934. During First Friday, this street is a gallery, a concert, and a block party all at once.",
    insiderTip: "Start at Downbeat Diner for a burger. Walk east: Lucky Belly for ramen, The Manifest for cocktails (25 cocktails at $7 during happy hour 6-9pm daily), Bar 35 for 100+ craft beers. End at Smith's Union Bar — the oldest bar on the island. First Friday art walk is the first Friday of every month.",
    bestTime: 'First Friday or any Friday/Saturday night, 8pm-midnight',
    parking: "Garage at Smith-Beretania or Chinatown Gateway Plaza. Street parking sketchy after dark — car break-ins happen.",
    warnings: "Chinatown has a homelessness and safety issue, especially after midnight. Stick to the lit blocks between Nuuanu and Smith. Don't leave anything visible in your car.",
    spots: [
      { name: "The Manifest", type: 'nightlife', note: "Cafe by day, cocktail bar by night. Exposed brick, rotating art. 25 cocktails at $7 happy hour." },
      { name: "Lucky Belly", type: 'restaurant', note: "Pork belly bao, ramen, and hot pot. The belly bowl is the move." },
      { name: "Livestock Tavern", type: 'restaurant', note: "Seasonal comfort food. Meat-forward menu. Reservations recommended." },
      { name: "Downbeat Diner", type: 'restaurant', note: "Retro diner with burgers and solid vegan options. Good pre-bar stop." },
      { name: "Bar 35", type: 'nightlife', note: "100+ craft beers, cocktails, and pizza. Sits on the old Swing Club location." },
      { name: "Smith's Union Bar", type: 'nightlife', note: "Operating since 1934. The oldest bar on the island. Dive bar energy, cold beer." },
      { name: "Fete", type: 'restaurant', note: "Modern American farm-to-table at 2 N Hotel. Reservations recommended." },
      { name: "Scarlet", type: 'nightlife', note: "Newest bar & dance club. Doll house theme, spacious dance floor. At 80 S Pauahi." },
      { name: "Tchin Tchin Bar", type: 'nightlife', note: "Trendy wine lounge with outdoor patio at 39 N Hotel." }
    ]
  },
  {
    id: 'nuuanu',
    name: "Nu'uanu Avenue",
    subtitle: 'Vintage & Gallery Row',
    neighborhood: 'Chinatown',
    neighborhoods: ['Chinatown', 'Downtown'],
    vibe: 'arts',
    coords: [
      [21.3082, -157.8600],
      [21.3100, -157.8598],
      [21.3118, -157.8596],
      [21.3140, -157.8593],
      [21.3158, -157.8590]
    ],
    center: [21.3118, -157.8596],
    zoom: 17,
    summary: "Chinatown's arts spine. During First Friday this becomes an open-air gallery — ARTS at Marks Garage swings open, studios spill onto sidewalks, musicians set up on corners. The rest of the month it's vintage shops, jazz, and dim sum. The HEART of Honolulu Festival (April 11, 2026) shuts the whole avenue down to cars.",
    insiderTip: "Tin Can Mailman is a treasure chest of vintage Hawaiiana — aloha shirts, tiki mugs, antique postcards. Barrio Vintage has '40s-'90s tropical patterns. The Dragon Upstairs is a hidden jazz bar above Tin Can Mailman — live music, karaoke, poetry slams.",
    bestTime: 'First Friday 6-9pm, or any weekday afternoon for vintage shopping',
    parking: "Smith-Beretania garage. The meters on Nu'uanu fill fast during First Friday.",
    warnings: "Some blocks north of Vineyard Blvd get rough. Stay in the gallery/vintage zone between Hotel and Beretania.",
    spots: [
      { name: "Tin Can Mailman", type: 'shopping', note: "Hawaiian antiques, vintage aloha shirts, tiki mugs at 1026 Nu'uanu. A museum you can buy things from." },
      { name: "Barrio Vintage", type: 'shopping', note: "Retro tropical patterns from the '40s-'90s at 1161 Nu'uanu." },
      { name: "Hound & Quail", type: 'shopping', note: "The weird one: medical collectibles, taxidermy, vintage cameras at 1156 Nu'uanu." },
      { name: "The Dragon Upstairs", type: 'nightlife', note: "Jazz bar above Tin Can Mailman. Live music, karaoke, poetry slams at 1038 Nu'uanu." },
      { name: "Mei Sum Dim Sum", type: 'restaurant', note: "Authentic Hong Kong dim sum, handmade fresh daily at 1170 Nu'uanu." },
      { name: "Tea at 1024", type: 'restaurant', note: "Afternoon tea with 40+ varieties. Open just 2 hours a day — check times." },
      { name: "ARTS at Marks Garage", type: 'cultural', note: "The hub of First Friday. Gallery, events, community art space." }
    ]
  },
  {
    id: 'maunakea',
    name: 'Maunakea Street',
    subtitle: 'Markets & Lei Row',
    neighborhood: 'Chinatown',
    neighborhoods: ['Chinatown'],
    vibe: 'shopping',
    coords: [
      [21.3095, -157.8622],
      [21.3110, -157.8618],
      [21.3125, -157.8614],
      [21.3142, -157.8610],
      [21.3158, -157.8605]
    ],
    center: [21.3125, -157.8614],
    zoom: 17,
    summary: "The oldest market street in Honolulu. Lei shops line both sides — handmade plumeria, pikake, tuberose leis starting at $6 ($3 for day-old). Oahu Market has been here since 1904 selling exotic produce, fish, and meat. Maunakea Marketplace food court is the most diverse cheap lunch in town — Chinese, Lao, Thai, Vietnamese, Korean, Filipino stalls.",
    insiderTip: "Day-old leis for $3 are perfectly fine — they just won't last past the next day. The produce vendors will cut you deals on tropical fruit late in the afternoon. Wing Ice Cream at 1145 Maunakea does small-batch homemade in insane flavors like sour cream and onion.",
    bestTime: 'Morning for markets (freshest produce), any time for lei shopping',
    parking: "Chinatown Gateway Plaza garage. Don't try street parking with bags of produce.",
    warnings: "Cash preferred at most market stalls. Some Maunakea Marketplace vendors close early afternoon. Watch for slippery wet floors at Oahu Market.",
    spots: [
      { name: "Oahu Market", type: 'market', note: "Open-air produce market since 1904. Asian greens, tropical fruits, fresh fish. The OG." },
      { name: "Maunakea Marketplace", type: 'market', note: "Food court + souvenir stalls. Chinese, Lao, Thai, Vietnamese, Korean, Filipino. Cheap and legit." },
      { name: "Lei Shops", type: 'shopping', note: "Dozens of lei vendors. Handmade plumeria, pikake, tuberose from $6. Day-old $3." },
      { name: "Wing Ice Cream", type: 'restaurant', note: "Homemade small-batch at 1145 Maunakea. Wild flavors including sour cream and onion." }
    ]
  },
  {
    id: 'smith-st',
    name: 'Smith Street',
    subtitle: 'The Late-Night Block',
    neighborhood: 'Chinatown',
    neighborhoods: ['Chinatown'],
    vibe: 'nightlife',
    coords: [
      [21.3095, -157.8612],
      [21.3110, -157.8609],
      [21.3125, -157.8606],
      [21.3140, -157.8603]
    ],
    center: [21.3118, -157.8608],
    zoom: 17,
    summary: "One block east of Maunakea, Smith Street is where the late-night crowd goes. Little Village Noodle House has won 11 Hale Aina awards. Opal Thai's chef customizes dishes to your spice tolerance. The Window between Hotel and Pauahi does handwritten-menu takeout Thu-Sat until 2am for the post-bar crowd.",
    insiderTip: "Little Village is always packed — go at 5:30pm or after 8:30pm. The Window's late-night takeout is the after-bar move nobody tells tourists about. Opal Thai will literally make your dish however you want it if you talk to the chef.",
    bestTime: 'Dinner 6-9pm, or post-bar 11pm-2am for The Window',
    parking: "Same as Hotel Street — garage on Smith-Beretania.",
    warnings: "Gets very quiet between Beretania and Vineyard after dark. Stay on the lit blocks.",
    spots: [
      { name: "Little Village Noodle House", type: 'restaurant', note: "11-time Hale Aina award winner. Chinese cuisine at 1113 Smith. Always packed." },
      { name: "Opal Thai", type: 'restaurant', note: "Family-owned at 1030 Smith. Chef customizes spice and ingredients to your preferences." },
      { name: "The Window", type: 'restaurant', note: "Late-night takeout Thu-Sat until 2am. Handwritten menu, between Hotel and Pauahi. The post-bar move." }
    ]
  },
  {
    id: 'monsarrat',
    name: 'Monsarrat Avenue',
    subtitle: 'Hiker Fuel Strip',
    neighborhood: 'Diamond Head',
    neighborhoods: ['Diamond Head', 'Kapahulu', 'Kaimuki'],
    vibe: 'food',
    coords: [
      [21.2680, -157.8148],
      [21.2705, -157.8145],
      [21.2728, -157.8140],
      [21.2755, -157.8132],
      [21.2773, -157.8125]
    ],
    center: [21.2720, -157.8142],
    zoom: 16,
    summary: "The street at the base of Diamond Head went from a sleepy burger stop for surfers to a legit food destination. Pre-hike acai bowls, post-hike plate lunches, and Paul's Barbershop with the best view on the island. Diamond Head Market does 500+ plates a day and 700+ on weekends. Mostly takeout-friendly so you can eat at the beach or park.",
    insiderTip: "Bogart's Cafe breakfast bagel sandwich put them on the map. Diamond Head Market's blueberry cream cheese scones literally paid for their bakery expansion. South Shore Grill's fish tacos are voted Hawai'i's best. Da Cove does acai bowls by day and awa (kava) by evening — the only bar-to-health-bar transition on the island.",
    bestTime: 'Early morning pre-hike (7-8am) or post-hike lunch',
    parking: "Street parking along Monsarrat. The lot behind Diamond Head Market is small but turns over fast.",
    warnings: "Diamond Head hike now requires advance reservations and $5 fee. Plan accordingly.",
    spots: [
      { name: "Bogart's Cafe", type: 'restaurant', note: "Acai bowls and breakfast bagel sandwiches at 3045 Monsarrat. Daily 7am-3pm." },
      { name: "Diamond Head Market & Grill", type: 'restaurant', note: "500+ plates daily. Blueberry cream cheese scones, lemon crunch cake, $52 carrot cake." },
      { name: "South Shore Grill", type: 'restaurant', note: "Hawai'i's best fish tacos. Casual, fast, beach-ready." },
      { name: "Da Cove Health Bar", type: 'restaurant', note: "Acai bowls by day, awa (kava) by evening. Unique dual personality." },
      { name: "Cafe Morey's", type: 'restaurant', note: "Casual cafe at the Diamond Head end. Open daily 8am-2pm." },
      { name: "Paul's Barbershop", type: 'shopping', note: "$13 men's cuts with the best view in Hawai'i — all of Diamond Head. At 3118 Monsarrat." },
      { name: "Open Space Yoga", type: 'experience', note: "Workshops in Ayurveda, meditation, breathing at 3106 Monsarrat." },
      { name: "Pualani Hawaii", type: 'shopping', note: "Bikinis and beach resortwear by a local designer." }
    ]
  },
  {
    id: 'keeaumoku',
    name: "Ke'eaumoku Street",
    subtitle: 'International District',
    neighborhood: 'Ala Moana',
    neighborhoods: ['Ala Moana', 'McCully-Moiliili'],
    vibe: 'food',
    coords: [
      [21.2920, -157.8400],
      [21.2945, -157.8398],
      [21.2970, -157.8395],
      [21.2997, -157.8392],
      [21.3020, -157.8390]
    ],
    center: [21.2970, -157.8395],
    zoom: 16,
    summary: "Honolulu's Korean-Japanese corridor and the island's international food hub. Korean BBQ joints, Japanese solo-dining concepts, and now the Midtown Eats food hall at The Park on Ke'eaumoku with 12 local vendors. Banchan House sells house-made kimchi and mandoo. This strip is the antidote to the resort-food bubble.",
    insiderTip: "Midtown Eats food hall (1515 Liona St, opened Jan 2026) has 12 vendors including FEAST by Jon Matsubara and Ninja Sushi. Yakiniku Like is solo-grill Japanese BBQ open until 10pm. Banchan House at 745 Ke'eaumoku is the spot for house-made banchan — the owners used to run it as a produce store.",
    bestTime: 'Dinner, 5-9pm for Korean BBQ; lunch for food hall',
    parking: "The Park on Ke'eaumoku has its own garage. Street parking is fine on the side streets off Ke'eaumoku.",
    warnings: "This stretch is being redeveloped — expect construction. Some of the older block of restaurants was demolished, and vendors have scattered to new locations.",
    spots: [
      { name: "Midtown Eats", type: 'restaurant', note: "12-vendor food hall at The Park. FEAST, Ninja Sushi, Soul Chicken, Middle Eats, Serg's Mexican. Opened Jan 2026." },
      { name: "Yakiniku Like", type: 'restaurant', note: "Solo-grill Japanese BBQ at 1108 Ke'eaumoku. Tokyo chain. Daily 11am-10pm." },
      { name: "Banchan House", type: 'restaurant', note: "House-made kimchi, mandoo, assorted banchan at 745 Ke'eaumoku. Former produce store." },
      { name: "Banh Mi Paradise", type: 'restaurant', note: "Tiny shop, bo la lot banh mi. Items you'd normally hit separate carts for. Wed-Mon 10:30am-8pm." },
      { name: "Chogajib Korean", type: 'restaurant', note: "Solid Korean BBQ on 825 Ke'eaumoku. Local favorite for galbi." },
      { name: "Jagalchi", type: 'restaurant', note: "Korean seafood. Named after the famous Busan fish market." }
    ]
  },
  {
    id: 'king-moiliili',
    name: 'S. King Street / Moiliili',
    subtitle: 'The Student Strip',
    neighborhood: 'Moiliili',
    neighborhoods: ['Moiliili', 'McCully-Moiliili'],
    vibe: 'nightlife',
    coords: [
      [21.2898, -157.8340],
      [21.2918, -157.8310],
      [21.2938, -157.8278],
      [21.2955, -157.8248],
      [21.2972, -157.8220]
    ],
    center: [21.2935, -157.8280],
    zoom: 16,
    summary: "UH Manoa's backyard. Dense, affordable, and ethnically diverse — Japanese, Thai, Korean, Middle Eastern spots line the strip. When the sun sets it becomes one of Honolulu's most diverse nightlife strips with cocktail bars, lounges, and dive bars. The strip mall at 2700 S. King (Sushi King, Honeyboba, Izakaya Naru, Glazer's Coffee) is a mini food court.",
    insiderTip: "Izakaya Naru for Okinawan food, Glazer's Coffee is still a hot spot for students and coffee heads. Anna O'Brien's upstairs dance hall attracts the college crowd with live music. The bike lanes on University Ave make this the most bikeable corridor in Honolulu.",
    bestTime: 'Lunch for cheap eats, 9pm-midnight for nightlife',
    parking: "Metered street parking on King. The side streets off University Ave have free evening parking.",
    warnings: "Gets rowdy on weekend nights near the bars. Noise complaints are real if you're staying nearby.",
    spots: [
      { name: "Izakaya Naru", type: 'restaurant', note: "Okinawan and Japanese dishes on S. King. Highly rated, low-key." },
      { name: "Glazer's Coffee", type: 'coffee', note: "At 2700 S. King strip mall. Still the college student and coffee aficionado hot spot." },
      { name: "Anna O'Brien's", type: 'nightlife', note: "Live music in the upstairs dance hall. Lively college crowd." },
      { name: "Yakiniku Korea House", type: 'restaurant', note: "Korean BBQ on the student budget. Popular with the UH crowd." },
      { name: "Honeyboba", type: 'coffee', note: "Boba tea at 2700 S. King. Students line up between classes." },
      { name: "Sushi King", type: 'restaurant', note: "Cheap sushi in the 2700 S. King strip mall. No frills, solid fish." }
    ]
  },
  {
    id: 'auahi',
    name: 'Auahi Street / Ward',
    subtitle: 'New Honolulu',
    neighborhood: "Kaka'ako",
    neighborhoods: ["Kaka'ako", 'Ala Moana'],
    vibe: 'mixed',
    coords: [
      [21.2935, -157.8605],
      [21.2940, -157.8565],
      [21.2945, -157.8525],
      [21.2950, -157.8485],
      [21.2955, -157.8450]
    ],
    center: [21.2945, -157.8525],
    zoom: 16,
    summary: "Kaka'ako's reinvented corridor — SALT at Our Kaka'ako, Ward Village shops, and the island's densest concentration of murals. Part open-air mall, part street art gallery, part farm-to-table restaurant row. Westman Cafe + Lounge just returned (Feb 2026) for the souffle pancake faithful. Wednesday and Saturday farmers markets at Ward Gateway Center.",
    insiderTip: "The murals along Auahi and the side streets are a self-guided art walk — POW! WOW! Hawaii artists repaint them annually. Merriman's for farm-to-table dinner (get the ahi poke with taro chips). Highway Inn Kaka'ako for authentic Hawaiian food. Wednesday farmers market 3-7pm and Saturday 8am-noon at Ward Gateway Center.",
    bestTime: 'Saturday morning (farmers market + brunch) or weekday evening',
    parking: "Ward Village has a massive garage. SALT has its own lot. Both free for the first 2 hours with validation.",
    warnings: "The area is mid-construction with multiple condo towers going up. Some streets rerouted. Weekday traffic on Auahi can be frustrating.",
    spots: [
      { name: "SALT at Our Kaka'ako", type: 'shopping', note: "Open-air mall with boutiques, Moku Kitchen, and rotating pop-ups." },
      { name: "Merriman's", type: 'restaurant', note: "Chef Peter Merriman's farm-to-table. Ahi poke with taro chips, wok-charred ahi sashimi." },
      { name: "Highway Inn Kaka'ako", type: 'restaurant', note: "Traditional Hawaiian food. Lau lau, pipikaula, chicken long rice, poke bowls." },
      { name: "Westman Cafe + Lounge", type: 'restaurant', note: "Returned Feb 2026 at 1000 Auahi. Souffle pancakes. Brunch lines will be insane." },
      { name: "Kaka'ako Farmers Market", type: 'farmers-market', note: "Wed 3-7pm, Sat 8am-noon at Ward Gateway Center. Local produce, bread, treats." },
      { name: "POW! WOW! Murals", type: 'cultural', note: "Self-guided street art walk. Artists repaint annually. Free. Bring a camera." }
    ]
  }
];

export function getStreetsForNeighborhood(name) {
  const lower = name.toLowerCase();
  return STREET_CORRIDORS.filter(s =>
    s.neighborhoods.some(n => n.toLowerCase() === lower)
  );
}
