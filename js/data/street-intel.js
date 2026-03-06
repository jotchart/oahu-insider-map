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
    summary: "Honolulu's best food crawl in a single mile. From Leonard's malasadas to Ono Seafood poke to Guava Smoked's wood-fired plates, this avenue packs more per-capita flavor than anywhere on the island. The 700 block between Winam and Hunter is the sweet spot — small shops, foot traffic, and landlords who actually keep rents sane.",
    insiderTip: "Walk from Leonard's south toward Waikiki. Hit Ono Seafood for poke, BBHI for a grass-fed burger, then King's Pizza Cafe for the Wednesday palm readings. The moped shops at 748-750 are an institution — Eric Low has been there since 1985.",
    bestTime: 'Weekday lunch, 11am-1pm',
    parking: "Street parking on side streets off Kapahulu. Avoid Kapahulu itself on weekends — brutal. The small lots behind Leonard's fill by 10am.",
    warnings: "Ono Seafood line starts forming at 11am. Leonard's trolley crowds peak mid-afternoon. Adez Steakhouse needs reservations on weekends.",
    spots: [
      { name: "Leonard's Bakery", type: 'bakery', note: "Malasadas since 1952. Get the haupia filled. The trolley brings waves of tourists but the line moves fast." },
      { name: "Ono Seafood", type: 'restaurant', note: "Poke bowls — Hawaiian limu + ahi shoyu, $12 large. Cash only. Founded by Judy Sakuma, now run by daughter Kim." },
      { name: "Guava Smoked", type: 'restaurant', note: "Smoked pork using invasive guava wood since 2011. 567 Kapahulu, 2nd floor. Daily 11am-8pm. Enter from Campbell Ave." },
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
  },
  {
    id: 'kalakaua',
    name: 'Kalakaua Avenue',
    subtitle: "Waikiki's Main Drag",
    neighborhood: 'Waikiki',
    neighborhoods: ['Waikiki'],
    vibe: 'mixed',
    coords: [[21.2769,-157.8319],[21.2748,-157.8290],[21.2730,-157.8265],[21.2720,-157.8240],[21.2713,-157.8215],[21.2707,-157.8188],[21.2700,-157.8148]],
    center: [21.2720, -157.8240],
    zoom: 15,
    summary: "The island's luxury retail spine and Waikiki's beating heart. Luxury Row at 2100 (Chanel 3-story flagship, Gucci, Bottega Veneta, Saint Laurent, Moncler, Tiffany) and standalone Louis Vuitton at 2200 anchor the high end. Royal Hawaiian Center (2201, 110+ shops) and International Marketplace (2330, 90+ stores, historic 100-year-old sycamore tree) cover the mid-tier. Every price point from $8 udon to $200 steaks within a quarter mile.",
    insiderTip: "SKY Waikiki (2270 Kalakaua, 19th floor) has a daily 4-5pm happy hour \u2014 $4 oysters, $5 Modelo, $10 bubbly with 360\u00B0 views of Diamond Head and the ocean. Best deal in all of Waikiki. Blue Note Hawaii (2335 Kalakaua, 2nd floor Outrigger) has two shows nightly at 6:30 and 9pm \u2014 $20 food/bev minimum, reservations required, smart casual.",
    bestTime: 'Sunset through midnight; avoid 10am-3pm peak crowds and tour buses',
    parking: "Kapiolani Park (free, unlimited, Diamond Head end). Royal Hawaiian Center and International Marketplace garages validate at shops. Outrigger valet $15/4hr for Blue Note.",
    warnings: "Kalakaua is one-way westbound. Hotel bar mai tais run $18-22. Cheesecake Factory waits 60-90 min regularly. Blue Note requires reservations.",
    spots: [
      { name: "SKY Waikiki", type: 'nightlife', note: "2270 Kalakaua, 19th floor. Rooftop raw bar, 360\u00B0 views. Happy hour 4-5pm ($4 oysters, $5 beer, $10 bubbly). Fri-Sat nightclub until 2am; dress code after 9pm." },
      { name: "Blue Note Hawaii", type: 'nightlife', note: "2335 Kalakaua, 2nd floor Outrigger. World-class jazz/blues venue, 326 seats. Two shows nightly 6:30 & 9pm. $20 food/bev minimum." },
      { name: "Duke's Waikiki", type: 'restaurant', note: "2335 Kalakaua, Outrigger Beach Resort. Open 7am-midnight. Barefoot Bar on the sand, live Hawaiian music, legendary Hula Pie." },
      { name: "Mai Tai Bar at Royal Hawaiian", type: 'nightlife', note: "2259 Kalakaua. Beachside at the 'Pink Palace.' Diamond Head backdrop. The $22 mai tai is worth it for the setting." },
      { name: "Luxury Row", type: 'shopping', note: "2100 Kalakaua. 111,000 sq ft: Chanel 3-story flagship, Gucci, Bottega Veneta, Miu Miu, Saint Laurent, Moncler, Tiffany." },
      { name: "International Marketplace", type: 'shopping', note: "2330 Kalakaua. 90+ stores, Grand Lanai dining. Stripsteak by Michael Mina, Roy Yamaguchi. Historic sycamore tree." },
      { name: "Royal Hawaiian Center", type: 'shopping', note: "2201 Kalakaua. 3-block, 110+ shops. Wolfgang's Steakhouse, Tim Ho Wan dim sum. Free hula lessons Tue/Thu/Sat." },
      { name: "Lulu's Waikiki", type: 'nightlife', note: "2586 Kalakaua near Kapahulu end. Open-air, locals-and-tourists mix. More relaxed than the resort bars." }
    ]
  },
  {
    id: 'kuhio',
    name: 'Kuhio Avenue',
    subtitle: "Waikiki's Local Side",
    neighborhood: 'Waikiki',
    neighborhoods: ['Waikiki'],
    vibe: 'food',
    coords: [[21.2790,-157.8310],[21.2770,-157.8280],[21.2753,-157.8252],[21.2742,-157.8225],[21.2733,-157.8198],[21.2726,-157.8172],[21.2720,-157.8150]],
    center: [21.2753, -157.8252],
    zoom: 16,
    summary: "One block inland from the resort strip, Kuhio is where Waikiki actually eats. No beachfront, no luxury \u2014 just the best food in Waikiki at real prices ($8-15). Marugame Udon draws 13,000+ Yelp reviews for hand-pulled noodles from $8. Rainbow Drive-In has served massive plate lunches since 1961. The LGBTQ+ scene anchors the east end with Hula's Bar & Lei Stand (50+ years). Kuhio Avenue Food Hall (International Marketplace back entrance, 10 stalls, 3 bars) is the best-kept open secret.",
    insiderTip: "Maguro Spot (2441 Kuhio) for build-your-own sashimi-grade poke bowls, then HIDEOUT at The Laylow (2299 Kuhio rooftop) for cocktails \u2014 total dinner + drinks under $30 in Waikiki. Kuhio Ave Food Hall (10 stalls: CheeHoo BBQ, Sushi Ogame omakase, Tipsy Tiki bar) is the International Marketplace back entrance \u2014 no tourist markup.",
    bestTime: 'Lunch 11am-1pm for cheap eats; 9pm-2am for nightlife',
    parking: "Waikiki Banyan garage (entrance on Kuhio) \u2014 most affordable. International Marketplace garage validates 2 hrs.",
    warnings: "No street parking on Kuhio. Aggressive panhandling near Seaside Ave intersection. Rideshare pickups chaotic on weekends \u2014 walk one block off Kuhio.",
    spots: [
      { name: "Marugame Udon", type: 'restaurant', note: "2310 Kuhio Ave. Hand-pulled udon from $8, theater kitchen. Daily 10am-10pm. 13,000+ Yelp reviews. Visit 2-4pm for shortest lines." },
      { name: "Rainbow Drive-In", type: 'restaurant', note: "2310 Kuhio Ave. Since 1961. Massive plate lunches (2 scoops rice + mac salad + protein). Daily 7am-9pm." },
      { name: "Maguro Spot", type: 'restaurant', note: "2441 Kuhio Ave. Build-your-own poke bowls with sashimi-grade fish \u2014 blue marlin, ikura, salmon. Daily 10am-8:30pm." },
      { name: "Kuhio Avenue Food Hall", type: 'restaurant', note: "International Marketplace, Kuhio-facing entrance. 10 stalls + 3 bars: CheeHoo BBQ, Hashi & Spoon ramen, Sushi Ogame omakase, Tipsy Tiki." },
      { name: "HIDEOUT at The Laylow", type: 'nightlife', note: "2299 Kuhio, rooftop. Live entertainment nightly, artisanal cocktails. Best-value rooftop bar in Waikiki." },
      { name: "Hula's Bar & Lei Stand", type: 'nightlife', note: "134 Kapahulu Ave, 2nd floor Waikiki Grand Hotel. Legendary LGBTQ+ bar 50+ years. Daily noon-2am. All welcome." },
      { name: "Basalt", type: 'restaurant', note: "Duke's Lane Market. Charcoal pancakes are the signature. Contemporary Hawaii cuisine with excellent happy hour." }
    ]
  },
  {
    id: 'lewers',
    name: 'Lewers Street',
    subtitle: 'Waikiki Nightlife Strip',
    neighborhood: 'Waikiki',
    neighborhoods: ['Waikiki'],
    vibe: 'nightlife',
    coords: [[21.2785,-157.8319],[21.2768,-157.8305],[21.2752,-157.8295],[21.2738,-157.8283],[21.2725,-157.8273]],
    center: [21.2755, -157.8295],
    zoom: 17,
    summary: "The only place in Waikiki where you can bar-hop on foot. Five blocks stacking jazz lounges, izakayas, tiki dives, and hotel restaurants. Lewers Lounge at the Halekulani is elegant live jazz \u2014 4 blocks from The Pupu House's tiki dive energy. Waikiki Beach Walk (227 Lewers) anchors the retail side. Mahina & Sun's at the Surfjack is Chef Ed Kenney's farm-to-table concept. Liliha Bakery Waikiki opening summer 2026.",
    insiderTip: "Genius Lounge (346 Lewers, 3rd floor) is the #1 insider secret \u2014 barely marked, former apartment building, Tokyo-style rooftop izakaya. Happy hour 6-8pm: $3 Kirin draft, $5 Asahi. Then walk down to Lewers Lounge for a $22 proper cocktail in total elegance. That contrast in a 3-minute walk is uniquely Waikiki.",
    bestTime: 'Happy hours 5:30-8pm; prime bar-hopping 9pm-midnight',
    parking: "Waikiki Beach Walk garage (validate at any merchant for 2 hrs). Embassy Suites garage at 255 Beachwalk. Street meters $3/hr until 10pm.",
    warnings: "Moose McGillycuddy's (310 Lewers) permanently closed 2025. Beach Walk shops close at 10pm. Only 5 blocks \u2014 pair with Kuhio or Kalakaua for a full night.",
    spots: [
      { name: "Lewers Lounge", type: 'nightlife', note: "Halekulani Hotel. Intimate, elegant, live jazz nightly. Legendary mai tai. Dress smart. The anti-Waikiki bar." },
      { name: "Genius Lounge", type: 'nightlife', note: "346 Lewers, 3rd floor. Hidden Tokyo-style rooftop izakaya. Happy hour 6-8pm: $3 Kirin, $5 Asahi. Secret local spot." },
      { name: "Mahina & Sun's", type: 'restaurant', note: "412 Lewers, Surfjack Hotel. Chef Ed Kenney farm-to-table. Happy hour 5:30-7:30pm: $20 pizza + 2 Maui Brewing beers." },
      { name: "Roy's Waikiki", type: 'restaurant', note: "226 Lewers, Beach Walk. Roy Yamaguchi's Hawaiian fusion, 30+ years. Signature misoyaki butterfish." },
      { name: "El Cielo", type: 'restaurant', note: "346 Lewers. Spanish tapas bar with extensive wine list. Unusual find in Waikiki." },
      { name: "Bacchus Waikiki", type: 'nightlife', note: "408 Lewers. Longtime LGBTQ+ bar. Daily noon-2am. Pool table, no cover." },
      { name: "The Pupu House", type: 'nightlife', note: "On Lewers near Royal Hawaiian Center. Tiki dive bar, cheap drinks, casual playful atmosphere." }
    ]
  },
  {
    id: 'pauahi',
    name: 'Pauahi Street',
    subtitle: 'The New Chinatown Cool',
    neighborhood: 'Chinatown',
    neighborhoods: ['Chinatown', 'Downtown'],
    vibe: 'nightlife',
    coords: [[21.3078,-157.8617],[21.3092,-157.8613],[21.3108,-157.8609],[21.3122,-157.8605],[21.3138,-157.8601],[21.3152,-157.8597]],
    center: [21.3115, -157.8607],
    zoom: 17,
    summary: "The spine of Chinatown's culinary renaissance. Running parallel to Hotel Street one block east, Pauahi hits harder food-wise. Giovedi (10 N Hotel at Pauahi \u2014 Bon App\u00E9tit Best New Restaurant 2025) and Proof Social Club (80 S Pauahi, historic Blaisdell Hotel basement) anchor the new wave. Hawaii Theatre at 1130 Bethel/Pauahi is the performing arts anchor. The Bethel\u2013Smith stretch is ground zero for Honolulu's independent dining scene.",
    insiderTip: "Giovedi books out weeks ahead \u2014 put your name on OpenTable the day the 60-day window opens. Proof Social Club is in the basement that supposedly held Hawaii's first liquor license \u2014 no cover before 8pm. Make Giovedi or Senia (75 N King, one block west, James Beard\u2013nominated, $225 tasting counter) your pre-Hawaii Theatre dinner.",
    bestTime: 'Thu\u2013Sat evenings for dinner + nightlife; First Friday is peak',
    parking: "Chinatown Gateway Plaza garage on Bethel. 22 S Pauahi has a small ProPark lot. Do NOT leave valuables in the car.",
    warnings: "Pauahi south of Smith gets rough toward River Street after dark. Stick to the Bethel\u2013Smith corridor. Giovedi and Proof draw lines on weekends.",
    spots: [
      { name: "Giovedi", type: 'restaurant', note: "10 N Hotel St (at Pauahi). Italian meets pan-Asian by Chef Bao Tran. Bon App\u00E9tit Best New Restaurant 2025. Book 60 days out." },
      { name: "Proof Social Club", type: 'nightlife', note: "80 S Pauahi, Blaisdell Hotel basement. Rumored site of Hawaii's first liquor license. Craft cocktails, pizza. Fri/Sat cover after 8pm." },
      { name: "Senia", type: 'restaurant', note: "75 N King (one block west). James Beard\u2013nominated. 12-course chef's counter Fri/Sat $225pp. \u00C0 la carte Tue\u2013Sat from 5:30pm." },
      { name: "Hawaii Theatre", type: 'cultural', note: "1130 Bethel at Pauahi. Restored 1922 theater. Best live shows in downtown Honolulu." },
      { name: "Artizen by MW (HiSAM)", type: 'restaurant', note: "250 S Hotel at Hawaii State Art Museum. Counter-serve Mon\u2013Sat 10:30am\u20132:30pm. Great pre-gallery lunch." },
      { name: "Bethel Street Gallery", type: 'cultural', note: "On Bethel near Pauahi. Largest artist-run gallery in Hawaii. All local artists. Free to browse." }
    ]
  },
  {
    id: 'bethel',
    name: 'Bethel Street',
    subtitle: 'Downtown Cultural Spine',
    neighborhood: 'Downtown',
    neighborhoods: ['Downtown', 'Chinatown'],
    vibe: 'arts',
    coords: [[21.3072,-157.8575],[21.3087,-157.8584],[21.3100,-157.8594],[21.3115,-157.8603],[21.3128,-157.8612],[21.3140,-157.8620]],
    center: [21.3105, -157.8595],
    zoom: 17,
    summary: "Downtown Honolulu's cultural corridor connecting the financial district at King Street to Chinatown's gallery scene at Hotel Street. Murphy's Bar & Grill at 2 Merchant (corner of Bethel) has been here since 1891 and appeared on Diners, Drive-Ins and Dives. Hawaii Theatre anchors the Chinatown end. Bethel Street Gallery is Hawaii's largest artist-run gallery.",
    insiderTip: "Murphy's is the unofficial Friday lunch spot for downtown's legal and government crowd \u2014 bar fills by noon, corned beef is the move. Hawaii Theatre validates at Chinatown Gateway garage. The Honolulu Festival (April 2026) closes Bethel and Nuuanu to cars \u2014 the best street party in the city.",
    bestTime: "Weekday lunch for Murphy's; evenings for Hawaii Theatre; First Friday for galleries",
    parking: "Chinatown Gateway Plaza garage at 1050 Bethel. Street parking on Merchant for Murphy's.",
    warnings: "Bethel between Beretania and King feels desolate at night. Bethel Union wine bar and Bethel Street Tap Room both permanently closed 2025.",
    spots: [
      { name: "Murphy's Bar & Grill", type: 'nightlife', note: "2 Merchant St at Bethel. Irish pub since 1891. On Diners, Drive-Ins and Dives. Corned beef, Guinness. Mon\u2013Fri 11am\u20139/10pm. Closed weekends." },
      { name: "Hawaii Theatre", type: 'cultural', note: "1130 Bethel. Restored 1922, National Register of Historic Places. Best concerts and stage productions downtown." },
      { name: "Fete", type: 'restaurant', note: "2 N Hotel (Hotel & Nuuanu). 2022 James Beard finalist. Farm-to-table modern American. Book ahead." },
      { name: "Bethel Street Gallery", type: 'cultural', note: "On Bethel near Hotel. Hawaii's largest artist-run gallery. Free to browse. All local artists." },
      { name: "Kan Zaman", type: 'restaurant', note: "1028 Nuuanu Ave (just off Bethel). Moroccan and Lebanese in a candlelit setting. Most atmospheric room in Chinatown." }
    ]
  },
  {
    id: 'cooke',
    name: 'Cooke Street',
    subtitle: "Kaka'ako Warehouse Row",
    neighborhood: "Kaka'ako",
    neighborhoods: ["Kaka'ako"],
    vibe: 'arts',
    coords: [[21.2960,-157.8580],[21.2960,-157.8548],[21.2960,-157.8515],[21.2960,-157.8483],[21.2960,-157.8450]],
    center: [21.2960, -157.8515],
    zoom: 16,
    summary: "Kaka'ako's ground-level arts and food street. Warehouses that didn't become condos became galleries and plate lunch clusters. Honolulu Beerworks left 328 Cooke in Nov 2024 for Kalihi. SALT at Our Kaka'ako (660 Ala Moana / Cooke corner) fills the void with Moku Kitchen, Highway Inn, 9Bar HNL. The Cooke & Queen intersection still holds one of Honolulu's legendary plate lunch clusters: five spots in one block since the '90s.",
    insiderTip: "The plate lunch cluster at Cooke & Queen (Top's Deli, Queen's BBQ, Red Cafe, Cooke Street Diner, Karen's Kitchen \u2014 since 1993) is a Kaka'ako institution. Cooke Street Market at 725 Kapiolani does poke bowls and boba. POW! WOW! murals along Cooke and alleys \u2014 Cooke-Auahi-Pohukaina loop is a 20-30 min walk.",
    bestTime: 'Weekday lunch for plate lunches; Saturday for SALT farmers market; First Friday for galleries',
    parking: "SALT surface lot off Cooke \u2014 free 2 hrs with validation. Ward Village garage from Auahi. Street parking hit-or-miss.",
    warnings: "328 Cooke (former Honolulu Beerworks) is vacant. Kaka'ako mid-construction \u2014 street routing changes without notice.",
    spots: [
      { name: "SALT at Our Kaka'ako", type: 'shopping', note: "660 Ala Moana (Cooke corner). 40+ shops: Moku Kitchen, Highway Inn, Morning Brew, Lanikai Juice, 9Bar HNL, Bevy." },
      { name: "Moku Kitchen", type: 'restaurant', note: "At SALT. Chef Merriman's pizza and rotisserie. Wood-fired, local sourcing. Best casual dinner in Kaka'ako." },
      { name: "Plate Lunch Cluster", type: 'restaurant', note: "Cooke & Queen. Five spots: Top's Deli, Queen's BBQ, Red Cafe, Cooke Street Diner, Karen's Kitchen. Since the '90s. Cash preferred." },
      { name: "Cooke Street Market", type: 'restaurant', note: "725 Kapiolani, Suite C122. Poke bowls, boba, Uncle's Ice Cream Sandwiches. Daily 10am\u20135pm." },
      { name: "9Bar HNL", type: 'coffee', note: "At SALT. Specialty coffee and cocktails. One of Honolulu's best third-wave coffee spots." },
      { name: "POW! WOW! Murals", type: 'cultural', note: "Along Cooke and side alleys. International artists repaint annually. Free \u2014 Cooke to Auahi to Pohukaina is the best loop." }
    ]
  },
  {
    id: 'kapiolani',
    name: 'Kapiolani Boulevard',
    subtitle: 'Korean BBQ & Ramen Mile',
    neighborhood: 'Ala Moana',
    neighborhoods: ['Ala Moana', "Kaka'ako", 'McCully-Moiliili'],
    vibe: 'food',
    coords: [[21.2920,-157.8468],[21.2942,-157.8450],[21.2970,-157.8430],[21.2995,-157.8412],[21.3022,-157.8394],[21.3048,-157.8376],[21.3075,-157.8355]],
    center: [21.2995, -157.8415],
    zoom: 15,
    summary: "Honolulu's great food boulevard \u2014 3 miles from Ward Village to McCully. Yanagi Sushi (762, since 1978) anchors downtown. The 1100\u20131700 block is pure Korean BBQ and Japanese dining. Sura Hawaii at 1726 does AYCE Korean BBQ until 2am. Kapiolani Seafood at 1538 is locals-only all-day dim sum. Shokudo at 1585 permanently closed early 2026.",
    insiderTip: "Yu Chun at 1159 has the best naengmyeon (Korean cold noodles) on the island \u2014 order mul naengmyeon even in summer. Gyu-Kaku at 1221 validates parking in their Hopaka St garage for 3 hours \u2014 easiest free parking on the boulevard. Kapiolani Seafood at 1538: photo-menu dim sum, everything $6\u2013$9, no carts.",
    bestTime: 'Dinner 6\u20139pm for Korean BBQ; Sura until 2am Tue\u2013Sun; weekday lunch for dim sum',
    parking: "Gyu-Kaku (1221) validates 3 hrs in Hopaka St garage. McCully Shopping Center (1960) and Market City (2919) have large free lots. Street meters scarce.",
    warnings: "Shokudo (1585) permanently closed 2026. JINYA Ramen at Ward Village also closed Feb 2026. Sura closed Mondays. Almost no free street parking 1200\u20132200 stretch.",
    spots: [
      { name: "Yanagi Sushi", type: 'restaurant', note: "762 Kapiolani. Since 1978. Sashimi platters, omakase. Old-guard Honolulu sushi institution." },
      { name: "Yu Chun Korean", type: 'restaurant', note: "1159 Kapiolani. Best naengmyeon (cold noodles) on the island. Mul naengmyeon is the signature." },
      { name: "Gyu-Kaku Japanese BBQ", type: 'restaurant', note: "1221 Kapiolani. Japanese BBQ with free validated parking in Hopaka St garage up to 3 hrs." },
      { name: "Kapiolani Seafood", type: 'restaurant', note: "1538 Kapiolani. All-day dim sum, photo menu, $6\u2013$9 items. Open 9am\u201310pm weekdays, 8:30am weekends." },
      { name: "Sura Hawaii", type: 'restaurant', note: "1726 Kapiolani. AYCE Korean BBQ until 2am Tue\u2013Sun. Meats cut in-house. Best late-night KBBQ on the island." },
      { name: "Stage Restaurant", type: 'restaurant', note: "1250 Kapiolani, 2nd floor Honolulu Design Center. Modern American dinner Tue\u2013Sat 5\u201310pm. Underrated." },
      { name: "Artizen by MW", type: 'restaurant', note: "888 Kapiolani. Counter-serve cafe. Lunch box sets, pastries. Mon\u2013Sat 10:30am\u20137pm." }
    ]
  },
  {
    id: 'n-king-kalihi',
    name: 'N. King Street / Kalihi',
    subtitle: 'The Ethnic Food Corridor',
    neighborhood: 'Kalihi-Palama',
    neighborhoods: ['Kalihi-Palama', 'Kapalama'],
    vibe: 'food',
    coords: [[21.3168,-157.8680],[21.3195,-157.8655],[21.3225,-157.8628],[21.3255,-157.8600],[21.3283,-157.8572],[21.3312,-157.8545],[21.3340,-157.8518]],
    center: [21.3255, -157.8600],
    zoom: 15,
    summary: "The most ethnically diverse food corridor on O'ahu with zero tourist presence. N. King through Kalihi-Palama is where Honolulu's Pacific Islander (Samoan, Tongan), Southeast Asian (Vietnamese, Filipino), and East Asian (Japanese, Korean) communities built their food culture. Talofa Polynesian Market does palusami, turkey tail, and octopus sashimi. Kikuya's $12.95 bento is two entrees plus tempura, soup, salad, rice. This is not curated authenticity \u2014 it's Tuesday lunch for locals.",
    insiderTip: "Talofa Polynesian Market (717 N. King) is the real deal for Samoan food \u2014 they don't advertise. Kikuya (1315 N. King) $12.95 lunch bento is 2 entrees from 12 choices + tempura, soup, salad, rice. Upscale Hawaii (1333 N. King) is 24-hour plate lunch with premium proteins. Gulick Delicatessen (1512 Gulick Ave, one block off King) is an okazuya open from 5am.",
    bestTime: 'Weekday lunch 11am\u20131:30pm; Saturday morning for Talofa',
    parking: "Easy \u2014 not a tourist zone. Street parking and free surface lots at strip malls.",
    warnings: "Hours are local-style unpredictable. Cash preferred at many spots. Evening options limited mid-week.",
    spots: [
      { name: "Talofa Polynesian Market", type: 'restaurant', note: "717 N. King. Samoan/Pacific Islander market with cooked foods: palusami, turkey tail, octopus, taro, breadfruit." },
      { name: "Kikuya Restaurant", type: 'restaurant', note: "1315 N. King. Neighborhood Japanese. $12.95 bento: 2 entrees from 12 choices + tempura, soup, salad, rice." },
      { name: "Kieu Vietnamese Cuisine", type: 'restaurant', note: "164 N. King. Opens 7:30am for morning pho. Closes around 3pm. Local workers, not tourists." },
      { name: "Upscale Hawaii", type: 'restaurant', note: "1333 N. King. Open 24/7. Plate lunch: NY strip, rib eye, garlic shrimp, lobster tail." },
      { name: "Gulick Delicatessen", type: 'restaurant', note: "1512 Gulick Ave (one block off King). Okazuya open Mon\u2013Fri 5am\u20133pm. Sweet & sour spare ribs, shoyu chicken, chow fun." }
    ]
  },
  {
    id: 'liliha',
    name: 'Liliha Street',
    subtitle: 'Old Honolulu, Still Standing',
    neighborhood: 'Liliha',
    neighborhoods: ['Liliha'],
    vibe: 'food',
    coords: [[21.3165,-157.8612],[21.3178,-157.8580],[21.3190,-157.8548],[21.3202,-157.8518],[21.3215,-157.8488]],
    center: [21.3190, -157.8548],
    zoom: 15,
    summary: "What Honolulu looked like before the resort economy. The original Liliha Bakery (515 N. Kuakini, since 1950) is famous for coco puffs but the insider move is the beef curry and beef stew \u2014 items that do NOT exist at any other location. Helena's Hawaiian Food (1240 N. School, since 1946) won a James Beard America's Classic Award. Jane's Fountain has duct-taped booths from the 1940s. Liliha Food Court (414 N. School, opened Oct 2025) adds fresh vendor energy.",
    insiderTip: "The beef curry at the original Liliha Bakery (515 N. Kuakini) does NOT exist at Ala Moana, Nimitz, or Waikiki locations \u2014 locals consider this one of Honolulu's best-kept food secrets. Helena's is Tue\u2013Fri ONLY 10am\u20137:30pm \u2014 the pipikaula (Hawaiian jerky beef) and short ribs are the order.",
    bestTime: "Mid-morning (9-11am) for Liliha Bakery; lunch Tue\u2013Fri for Helena's",
    parking: "Street parking on Liliha and side streets. Helena's tiny lot is genuinely difficult. Liliha Food Court lot at 414 N. School.",
    warnings: "Helena's is closed Sat, Sun, and Mon \u2014 catches everyone off guard. The original Liliha Bakery is on N. Kuakini St, NOT Liliha St itself.",
    spots: [
      { name: "Liliha Bakery (Original)", type: 'bakery', note: "515 N. Kuakini. Since 1950. Coco puffs, grilled butter rolls. ONLY location with beef curry and beef stew. Daily 6am\u201310pm." },
      { name: "Helena's Hawaiian Food", type: 'restaurant', note: "1240 N. School. Since 1946. James Beard America's Classic. Short ribs, pipikaula, fried butterfish. Tue\u2013Fri 10am\u20137:30pm only." },
      { name: "Jane's Fountain", type: 'restaurant', note: "Classic 1940s counter diner. Duct-taped booths, letterboard menu. Liver and onions, pork tofu, soda floats." },
      { name: "Liliha Food Court", type: 'restaurant', note: "414 N. School (former Foodland). Opened Oct 2025. Jalapeno's Mexican, Mermaid Poke, Mingalar Burmese, Dave's Ice Cream. Daily 10am\u20139pm." },
      { name: "L&L Drive-Inn (Original)", type: 'restaurant', note: "Liliha neighborhood claims the original L&L \u2014 origin point of the plate lunch chain now found across the mainland." }
    ]
  },
  {
    id: 'dillingham',
    name: 'Dillingham Boulevard',
    subtitle: 'Industrial Grindz',
    neighborhood: 'Kapalama',
    neighborhoods: ['Kapalama', 'Kalihi-Palama'],
    vibe: 'food',
    coords: [[21.3128,-157.8758],[21.3152,-157.8718],[21.3180,-157.8678],[21.3208,-157.8638],[21.3238,-157.8598],[21.3265,-157.8558],[21.3292,-157.8518]],
    center: [21.3208, -157.8638],
    zoom: 15,
    summary: "From outside, Dillingham is auto shops and warehouses. Look deeper and it's one of Honolulu's most interesting food streets. Young's Fish Market (since 1951) cooks kalua pig in an actual imu. Ha Long Pho is widely considered the best pho on O'ahu. Bob's Bar-B-Que runs from 6:30am to 11pm since the 1970s. Honolulu Beerworks reopened at their massive new Kalihi taproom (1632 Hart St, May 2025) with 12+ taps and two beer gardens.",
    insiderTip: "Young's Fish Market (1286 Kalani St, City Square) cooks kalua pig in an imu \u2014 meaningfully different from steam-table versions. Ha Long Pho (1414 Dillingham #101) \u2014 siblings Janice and Paul Nguyen's recipes from their uncle Thomas. Honolulu Beerworks' new Kalihi space (1632 Hart) has free parking and is a massive upgrade.",
    bestTime: "Lunch 11am\u20131pm for Young's and Ha Long; Bob's any time from 6:30am; Beerworks Thu\u2013Sat afternoons",
    parking: "Abundant. Industrial corridor with large free surface lots at every shopping center. No meters.",
    warnings: "Young's sells out before 1pm \u2014 go before noon. Ha Long Pho closed Sundays. Dillingham is high-traffic \u2014 crossing on foot requires care.",
    spots: [
      { name: "Young's Fish Market", type: 'restaurant', note: "1286 Kalani St (City Square at 1199 Dillingham). Since 1951. Kalua pig from actual imu, lau lau, haupia, poke. Sells out early." },
      { name: "Ha Long Pho", type: 'restaurant', note: "1414 Dillingham #101. Best pho on O'ahu. Daily 10am\u20139pm, closed Sundays." },
      { name: "Bob's Bar-B-Que", type: 'restaurant', note: "1366 Dillingham. Since the 1970s. Open 6:30am\u201311pm daily. Teriyaki beef, baby back ribs, chicken katsu. Open-air picnic seating." },
      { name: "Honolulu Beerworks", type: 'nightlife', note: "1632 Hart St (near Iwilei). O'ahu's craft beer pioneer since 2014. 12+ taps, two beer gardens. Reopened May 2025. Tue\u2013Sat." },
      { name: "Sugoi Bento", type: 'restaurant', note: "City Square, 1199 Dillingham. Hamburger steak with thick brown gravy. Generous portions." },
      { name: "Kapalama Shopping Center", type: 'shopping', note: "1210 Dillingham. Korean grocery, OB beer, banchan kits, deli, and a mu'umu'u shop with locally-printed fabrics." }
    ]
  },
  {
    id: 'piikoi',
    name: "Pi\u02BBikoi Street",
    subtitle: 'Japanese Food Strip',
    neighborhood: 'Ala Moana',
    neighborhoods: ['Ala Moana', 'McCully-Moiliili'],
    vibe: 'food',
    coords: [[21.2920,-157.8468],[21.2928,-157.8460],[21.2935,-157.8448],[21.2942,-157.8435],[21.2950,-157.8420]],
    center: [21.2935, -157.8445],
    zoom: 17,
    summary: "The block between Ala Moana Blvd and S. King is Honolulu's most compressed Japanese food corridor. Ichiriki Nabe at 510 draws regulars for shabu shabu. Totoya at 436 brought its viral kaisendon here. Piikoi Steak at 514 (opened 2025) runs two items \u2014 beef or pork \u2014 on sizzling iron. Taiyo Ramen (451) permanently closed 2025 when the owner retired.",
    insiderTip: "Totoya has the same lines here as Kaimuki \u2014 go at 11am open or right at 5pm. Piikoi Steak takes no reservations and has few seats; arrive early. From Waikiki: Ala Moana Blvd right on Pi\u02BBikoi, strip mall on right before Kona St.",
    bestTime: 'Weekday dinner 5\u20138pm to avoid weekend waits',
    parking: "Small shared strip mall lot. Street parking on Kona St. Ala Moana Center garage 5-min walk.",
    warnings: "Taiyo Ramen permanently closed 2025. Ichiriki draws long weekend waits.",
    spots: [
      { name: "Ichiriki Nabe", type: 'restaurant', note: "510 Pi\u02BBikoi. Shabu shabu, sukiyaki, nabe hot pot. Mon\u2013Thu 11am\u20139:30pm, Fri\u2013Sat until 10:30pm." },
      { name: "Totoya (Pi\u02BBikoi)", type: 'restaurant', note: "436 Pi\u02BBikoi. Second location of the viral seafood bowl spot. Negitoro bowls, kaisendon from Japan." },
      { name: "Piikoi Steak", type: 'restaurant', note: "514 Pi\u02BBikoi. No reservations. Beef or pork on sizzling iron skillet. Lunch 11:30am, dinner from 6pm. Opened 2025." },
      { name: "938 Pi\u02BBikoi Cafe", type: 'coffee', note: "Former Bakery & Table space. Espresso, hojicha and matcha lattes." }
    ]
  },
  {
    id: 'beretania',
    name: 'S. Beretania Street',
    subtitle: 'Hidden Food Row',
    neighborhood: 'Punchbowl',
    neighborhoods: ['Punchbowl', 'Makiki-Tantalus', 'McCully-Moiliili'],
    vibe: 'food',
    coords: [[21.3045,-157.8560],[21.3020,-157.8530],[21.2995,-157.8500],[21.2970,-157.8470],[21.2945,-157.8440],[21.2918,-157.8410]],
    center: [21.2985, -157.8495],
    zoom: 15,
    summary: "The government-district spine most visitors drive past. Locals know the cluster at 1234\u20131296 S. Beretania: Kevin's Kitchen (Hong Kong roast meats, opened June 2025), Asian Mix (plate lunches since 2012), and Epi-Ya Boulangerie. H\u014D\u02BBili\u02BBili Market by Farm Link (2065, opened Oct 2025) merges locally sourced groceries with craft pizza. Club Melo at 2012 provides karaoke nightlife.",
    insiderTip: "Kevin's Kitchen shares the Times Supermarket lot at 1296 S. Beretania. Order char siu, roast duck, or roast goose before 2pm \u2014 best cuts sell out. Asian Mix (1234) has been a local sleeper hit since 2012 \u2014 huge portions, low prices.",
    bestTime: "Weekday lunch 11am\u20131:30pm; evenings for Club Melo karaoke",
    parking: "Times Supermarket lot at 1290 validates. Safeway parking structure at 1234. Street parking sparse near government district.",
    warnings: "Kevin's Kitchen closed Tuesdays. Roast duck/goose sell out by early afternoon. Government corridor deserted after 5pm.",
    spots: [
      { name: "Kevin's Kitchen", type: 'restaurant', note: "1296 S. Beretania. HK roast meats: char siu, roast duck, roast goose. Mon/Wed\u2013Sun 9:30am\u20138:30pm. Opened June 2025." },
      { name: "Asian Mix", type: 'restaurant', note: "1234 S. Beretania (Safeway lot). Since 2012. Mix plates, roasted meats. Huge portions. Daily 10:30am\u20138pm." },
      { name: "Epi-Ya Boulangerie", type: 'bakery', note: "Times complex. French bakery: croissants, baguettes. Popular for breakfast." },
      { name: "H\u014D\u02BBili\u02BBili Market", type: 'restaurant', note: "2065 S. Beretania. Opened Oct 2025. Local-sourced grocery + craft pizza, sandwiches, garlic dough balls." },
      { name: "Club Melo", type: 'nightlife', note: "2012 S. Beretania. Karaoke bar. Mon\u2013Thu 5pm\u2013midnight, Fri\u2013Sat 5pm\u20132am." },
      { name: "Times Supermarket", type: 'shopping', note: "1290 S. Beretania. Full grocery, poke counter, plate lunch grab-and-go. Validates parking." }
    ]
  },
  {
    id: 'mccully',
    name: 'McCully Street',
    subtitle: 'Asian Food Dense',
    neighborhood: 'McCully-Moiliili',
    neighborhoods: ['McCully-Moiliili'],
    vibe: 'food',
    coords: [[21.2880,-157.8365],[21.2895,-157.8358],[21.2910,-157.8350],[21.2925,-157.8342],[21.2940,-157.8335]],
    center: [21.2910, -157.8350],
    zoom: 16,
    summary: "One of Honolulu's most walkable neighborhoods (Walk Score 91). McCully Shopping Center at 1960 Kapiolani anchors: Fook Yuen Chinese Seafood, Pho 777, Bozu izakaya (2F \u2014 easy to miss). Udon Yonpachi at 1111 McCully (opened Aug 2025) is the breakout: house-made firmer, chewier noodles with silky broth. Mostly local-facing, no tourist scene.",
    insiderTip: "Bozu (McCully Shopping Center 2F) is best-value izakaya in Honolulu \u2014 Japanese comfort food at real prices. Udon Yonpachi has a tiny room, no reservations \u2014 arrive at 11am open or wait. Fook Yuen for dim sum on weekend mornings.",
    bestTime: 'Weekday lunch or early weekday dinner 5\u20136:30pm',
    parking: "McCully Shopping Center free surface lot off Kapiolani. Side streets for overflow. Avoid McCully St during rush hour.",
    warnings: "McCully Buffet (930 McCully) permanently closed 2025. Bozu is on the 2nd floor \u2014 easy to miss. Udon Yonpachi closed Sundays.",
    spots: [
      { name: "Udon Yonpachi", type: 'restaurant', note: "1111 McCully at Young St. Opened Aug 2025. House-made chewy udon. Mon\u2013Sat 11am\u20132pm & 5\u201310pm. Closed Sun. No reservations." },
      { name: "Bozu Japanese", type: 'restaurant', note: "McCully Shopping Center 2F. Izakaya: sushi, karaage, sake, draft beer. Best-value Japanese in the area." },
      { name: "Fook Yuen Chinese Seafood", type: 'restaurant', note: "McCully Shopping Center. Dim sum and Chinese seafood. 20+ year local institution. Braised tofu, deep-fried squid." },
      { name: "Pho 777", type: 'restaurant', note: "McCully Shopping Center. Vietnamese pho. Student and neighborhood staple." },
      { name: "Hot Pot Heaven", type: 'restaurant', note: "McCully Shopping Center. AYCE hot pot. Popular with the college crowd." },
      { name: "CoCo Ichibanya", type: 'restaurant', note: "1960 Kapiolani. Japanese curry chain from Nagoya. Infinitely customizable spice level." }
    ]
  },
  {
    id: 'ala-moana-blvd',
    name: 'Ala Moana Boulevard',
    subtitle: 'Ocean-Side Commerce',
    neighborhood: 'Kakaako',
    neighborhoods: ['Kakaako', 'Ala Moana', 'Downtown'],
    vibe: 'mixed',
    coords: [
      [21.2934, -157.8498],
      [21.2960, -157.8560],
      [21.3005, -157.8600],
      [21.3040, -157.8630],
      [21.3070, -157.8650],
      [21.3095, -157.8660]
    ],
    center: [21.3005, -157.8590],
    zoom: 15,
    summary: "Honolulu's main waterfront artery stretching from Ala Moana Center through Ward Village and Kakaako all the way to the harbor and Aloha Tower. The boulevard parallels the ocean, connecting the island's biggest mall to the state's biggest fish auction. Ward Village's Auahi Street section has become a serious restaurant row, while the harbor end delivers working-waterfront realness.",
    insiderTip: "Skip the Ala Moana Center food court — walk across the street to Moku Kitchen or Merriman's at Ward Village instead. At the harbor end, Nico's Pier 38 fish plate lunch (market catch, 2 scoops rice, mac salad) is $14 and sourced from the auction next door. La Mariana Sailing Club off Sand Island Access Rd is the last real tiki bar in Hawaii — locals only, no tourist buses.",
    bestTime: 'Weekday lunch at Nico\'s (11am-1pm), sunset drinks at La Mariana',
    parking: "Ala Moana Center garage is free first 2 hrs. Ward Village has a central garage off Auahi. Nico's has its own small lot at Pier 38 — fills by noon. La Mariana has marina lot parking.",
    warnings: "Scratch Kitchen at Ward (1170 Auahi) closed in late 2025. Aloha Tower observation deck currently closed per Dept of Transportation. Traffic on the boulevard is brutal 4-6pm — take side streets if you can.",
    spots: [
      { name: "Moku Kitchen", type: 'restaurant', note: "660 Ala Moana Blvd. Chef Peter Merriman's farm-to-table concept. Monkeypod Mai Tai is award-winning. Mon-Sun 11am-9pm (10pm Thu-Sat)." },
      { name: "Merriman's Honolulu", type: 'restaurant', note: "1108 Auahi St at Ward Village. Hawaii Regional Cuisine flagship. 90% island-sourced ingredients. Mon-Sun 11am-9pm. Reservations recommended." },
      { name: "Nori Bar", type: 'restaurant', note: "1000 Auahi St. Crisp-nori hand rolls with Koshihikari rice and local fish. Affordable sushi done right. Open daily 11am-10pm." },
      { name: "Fat Cheeks Hawaii", type: 'restaurant', note: "1200 Ala Moana Blvd at Ward Centre. Lobster rolls, sandwiches. The butter-poached lobster roll is the move." },
      { name: "Tonkatsu Kuro", type: 'restaurant', note: "1000 Auahi St. 72-hour-aged Kurobuta pork tonkatsu and soba. Opened 2025. Lines form by 11:30am." },
      { name: "Nico's Pier 38", type: 'restaurant', note: "1129 N Nimitz Hwy. Auction-fresh seafood — literally next to the fish auction. Plate lunch $14, furikake ahi $22. Mon-Sat 6:30am-9pm, Sun 10am-9pm." },
      { name: "La Mariana Sailing Club", type: 'nightlife', note: "50 Sand Island Access Rd. Hawaii's oldest tiki bar (est. 1957). Vintage tiki decor, mai tais, 80-boat marina. Tue-Sat 11am-8pm. No Sunday, no Monday." },
      { name: "Ala Moana Center", type: 'shopping', note: "1450 Ala Moana Blvd. World's largest open-air mall. 350+ shops. Liliha Bakery, Gen Korean BBQ, Jade Dynasty inside. Free parking first 2 hrs." }
    ]
  },
  {
    id: 'fort-street-mall',
    name: 'Fort Street Mall',
    subtitle: 'Downtown Lunch Rush',
    neighborhood: 'Downtown',
    neighborhoods: ['Downtown'],
    vibe: 'food',
    coords: [
      [21.3085, -157.8610],
      [21.3098, -157.8605],
      [21.3110, -157.8600],
      [21.3125, -157.8595],
      [21.3140, -157.8588]
    ],
    center: [21.3110, -157.8600],
    zoom: 17,
    summary: "Honolulu's only pedestrian mall — a car-free stretch in the heart of downtown running from Hotel Street to Nimitz Highway. Lined with mid-century office buildings, banyan trees, and lunch counters that feed the government and finance workers. Not glamorous, but deeply functional and unmistakably local. The open-air market on First Fridays brings it alive after hours.",
    insiderTip: "Fort Street Cafe is the undisputed king of this mall — their garlic chicken plate with white rice and a spring roll is $8 and feeds two. Get there before 11:30am or the state government workers clean them out. Murphy's Bar at 2 Merchant St (one block east) is the downtown power-lunch pub — legislators, lawyers, judges all eat here.",
    bestTime: 'Weekday lunch 11am-1pm. Dead on weekends.',
    parking: "Ali'i Place garage on Alakea & Hotel. Harbor Court garage at Bethel & Nimitz. Street meters are 2-hr max. Most office buildings have paid parking with validation.",
    warnings: "The mall empties out after 2pm and is mostly deserted on weekends. Some homelessness around Nimitz end. Not a nighttime destination except during First Friday events.",
    spots: [
      { name: "Fort Street Cafe", type: 'restaurant', note: "1152 Fort St Mall. Vietnamese-Thai fusion. Garlic chicken, pad thai, BBQ pork spring rolls. $5-$10 plates. Mon-Fri 7am-6pm, Sat from 8:30am." },
      { name: "The Lunch Spot", type: 'restaurant', note: "900 Fort St Mall Ste 140. Breakfast and lunch counter. Mon-Fri breakfast 7-9am, lunch 11am-2:30pm. Simple, fast, local." },
      { name: "Murphy's Bar & Grill", type: 'restaurant', note: "2 Merchant St (one block east). Irish pub since 1987. Power-lunch crowd. Burgers, fish & chips, cold Guinness. Mon-Fri 11am-9pm (10pm Fri)." },
      { name: "Cafe Julia", type: 'restaurant', note: "1040 Richards St in the historic YWCA Laniakea building. Named for architect Julia Morgan. Lunch Mon-Fri 11am-2pm. Courtyard dining." },
      { name: "Paris Baguette", type: 'bakery', note: "1000 Bishop St (at Fort St intersection). Korean bakery chain, Hawaii's first location opened Feb 2024. Pastries, sandwiches, coffee. Daily 6am-6pm." },
      { name: "Fort Street Mall Open Market", type: 'shopping', note: "First Friday of each month. Local vendors, crafts, food stalls along the pedestrian mall. Part of the broader Chinatown First Friday art walk." }
    ]
  },
  {
    id: 'ward-ave',
    name: 'Ward Avenue',
    subtitle: 'Village in Transition',
    neighborhood: 'Kakaako',
    neighborhoods: ['Kakaako', 'Ala Moana'],
    vibe: 'mixed',
    coords: [
      [21.3050, -157.8570],
      [21.3030, -157.8565],
      [21.3010, -157.8558],
      [21.2985, -157.8548],
      [21.2960, -157.8540]
    ],
    center: [21.3010, -157.8555],
    zoom: 16,
    summary: "Ward Avenue is the spine of Ward Village, Honolulu's biggest mixed-use redevelopment. The real action is on the perpendicular Auahi Street corridor, where condo towers meet a serious restaurant row. A new pedestrian bridge to Kewalo Basin completed in May 2025 connects the village to the waterfront. The neighborhood is transforming fast — new towers, new restaurants, new energy.",
    insiderTip: "Tonkatsu Kuro at 1000 Auahi is the current hottest table in the neighborhood — arrive before 11:30am or expect a wait. Rinka at the Ae'o tower (1001 Queen) is the splurge sushi pick. For a cheap lunch, Fat Cheeks lobster roll beats anything in Waikiki at half the price. The pedestrian bridge to Kewalo Basin is a great sunset walk.",
    bestTime: 'Weekday lunch or weekend brunch',
    parking: "Ward Village central garage off Auahi St. South Shore Market has limited surface parking. Street parking on Ward Ave itself is mostly metered.",
    warnings: "Scratch Kitchen at South Shore Market (1170 Auahi) closed late 2025. Construction is ongoing on several condo towers — expect dust and detours on side streets. Weekend brunch lines at Merriman's can hit 45 min.",
    spots: [
      { name: "Tonkatsu Kuro", type: 'restaurant', note: "1000 Auahi St Ste 134. 72-hour-aged Kurobuta pork tonkatsu. Opened Feb 2025. Lines form by 11:30am. Worth the wait." },
      { name: "Rinka", type: 'restaurant', note: "1001 Queen St Ste 105 (Ae'o tower). Authentic Japanese — sushi, sashimi, soba, tempura. Reservations on Resy." },
      { name: "Fat Cheeks Hawaii", type: 'restaurant', note: "1200 Ala Moana Blvd. Lobster rolls and sandwiches. Butter-poached lobster roll is the signature." },
      { name: "Nori Bar", type: 'restaurant', note: "1000 Auahi St. Hand-roll bar with local fish, crisp nori, Koshihikari rice. Open daily. Takeout sushi boxes available." },
      { name: "Istanbul Hawaii", type: 'restaurant', note: "Ward Village. Turkish cuisine — kebabs, meze, pide. One of the more unique dining options in the area." },
      { name: "South Shore Market", type: 'shopping', note: "1170 Auahi St. Curated retail: Patagonia, local boutiques, pop-ups. The ground floor of Ward Village's lifestyle wing." },
      { name: "Kewalo Basin Pedestrian Bridge", type: 'attraction', note: "Completed May 2025. Connects Ward Village to Kewalo Basin Harbor and Ala Moana Beach Park. Great sunset walk." }
    ]
  },
  {
    id: 'bishop-st',
    name: 'Bishop Street',
    subtitle: 'Financial District Fuel',
    neighborhood: 'Downtown',
    neighborhoods: ['Downtown'],
    vibe: 'food',
    coords: [
      [21.3060, -157.8615],
      [21.3080, -157.8610],
      [21.3100, -157.8605],
      [21.3120, -157.8598],
      [21.3145, -157.8590]
    ],
    center: [21.3100, -157.8605],
    zoom: 17,
    summary: "Honolulu's Wall Street — a canyon of bank towers, law firms, and government buildings with a surprising coffee and lunch scene. The AC Hotel (opened 2024) at 1111 Bishop brought three new restaurants to the block. The street feeds the white-collar workforce Mon-Fri and goes quiet on weekends. Cafe Daisy and Honolulu Coffee are the morning anchors; The Dotted Line is the after-work scene.",
    insiderTip: "Honolulu Cafe at 741 Bishop has been here almost 20 years — it's where the old-school downtown crowd gets soup, sandwiches, and real conversation before 2pm. For something newer, Cafe Daisy at 1132 Bishop roasts premium Hawaiian beans in-house. The Dotted Line at the AC Hotel has live music Mon/Wed/Fri happy hour and $7 pupus.",
    bestTime: 'Weekday morning coffee or lunch 11am-1pm. Ghost town on weekends.',
    parking: "Building garages with validation are the move. Street meters on Bishop are short — 30 min to 1 hr. Ali'i Place garage on Alakea is closest public option.",
    warnings: "Nearly everything on Bishop closes by 2-3pm. Weekend hours are rare except for Cafe Daisy (Sat-Sun 8am-2pm). The Dotted Line is the only real dinner option on the street.",
    spots: [
      { name: "Honolulu Coffee - Bishop", type: 'coffee', note: "1001 Bishop St. Kona coffee roaster. Mon-Fri 6:30am-1:30pm. Quick morning fuel for the finance crowd." },
      { name: "Cafe Daisy", type: 'coffee', note: "1132 Bishop St Ste 131. Premium Hawaiian beans roasted in-house. Breakfast and lunch. Mon-Fri 7am-3pm, Sat-Sun 8am-2pm." },
      { name: "Honolulu Cafe", type: 'restaurant', note: "741 Bishop St. Gourmet soups, sandwiches, salads. 20-year downtown institution. Mon-Fri 7am-2pm." },
      { name: "The Dotted Line", type: 'restaurant', note: "1111 Bishop St (AC Hotel). Global cuisine, executive lunch, dinner and cocktails. Live music Mon/Wed/Fri happy hour." },
      { name: "Common Ground", type: 'coffee', note: "1111 Bishop St (AC Hotel lobby). Local coffee blend, fresh pastries. Mon-Fri 7am-2pm, Sat 7-11am. Pet-friendly patio." },
      { name: "Paris Baguette", type: 'bakery', note: "1000 Bishop St Ste 104. Korean bakery chain. Pastries, cakes, sandwiches. Daily 6am-6pm. Hawaii's first location." },
      { name: "Yours Truly", type: 'nightlife', note: "1111 Bishop St (AC Hotel). Two-part bar concept nodding to downtown's history. Cocktails and pau hana vibes." }
    ]
  },
  {
    id: 'river-st',
    name: 'River Street',
    subtitle: 'Old Chinatown Soul',
    neighborhood: 'Chinatown',
    neighborhoods: ['Chinatown'],
    vibe: 'food',
    coords: [
      [21.3100, -157.8630],
      [21.3115, -157.8628],
      [21.3130, -157.8625],
      [21.3145, -157.8622],
      [21.3160, -157.8618]
    ],
    center: [21.3130, -157.8625],
    zoom: 17,
    summary: "The cultural heart of Honolulu's Chinatown — a stretch of Vietnamese pho houses, Chinese dim sum parlors, and the Chinatown Cultural Plaza that's been feeding the community since the 1970s. River Street Pedestrian Mall runs along Nu'uanu Stream with benches, statues, and a direct line into the Cultural Plaza. This is immigrant Honolulu at its most authentic and unpolished.",
    insiderTip: "Pho To-Chau at 1007 River is the OG — one of the first Vietnamese restaurants in Hawaii and still the most authentic pho on the island. Go at 9:30am open for no line. Fook Lam at 100 N Beretania (Cultural Plaza) is the dim sum pick — always a line, always worth it, strong Hong Kong energy. Duc's Bistro at 1188 Maunakea is the upscale outlier — French-Vietnamese fusion since 1992.",
    bestTime: 'Morning dim sum (9-11am) or pho lunch (11am-1pm)',
    parking: "Chinatown Gateway Plaza garage on Bethel. Cultural Plaza has a small lot. Street parking is scarce and sketchy — use a garage.",
    warnings: "Chinatown has real safety concerns, especially after dark around Aala Park. Stick to daytime visits. Most restaurants are cash-preferred. Cultural Plaza can feel deserted on weekdays — busiest on weekends. Char Hung Sut (64 N Pauahi) hours are limited — check before going.",
    spots: [
      { name: "Pho To-Chau", type: 'restaurant', note: "1007 River St. One of Hawaii's first Vietnamese restaurants. Pho and noodle soup specialists. Mon-Sun 9:30am-2:30pm. Cash preferred." },
      { name: "Fook Lam", type: 'restaurant', note: "100 N Beretania St (Cultural Plaza). Cantonese dim sum. Always a line, Hong Kong-style energy. The har gow and char siu bao are essential." },
      { name: "Duc's Bistro", type: 'restaurant', note: "1188 Maunakea St. French-Vietnamese fusion since 1992. The upscale Chinatown outlier. Reservations recommended for dinner." },
      { name: "Chinatown Cultural Plaza", type: 'cultural', note: "100 N Beretania St. Shops, restaurants, herbalists, services. A community hub since the 1970s. Best on weekend mornings." },
      { name: "Char Hung Sut", type: 'restaurant', note: "64 N Pauahi St. Chinatown's most famous manapua maker. Char siu bao, pork hash, noodles. Takeout boxes — check hours." },
      { name: "Pho Huong Lan", type: 'restaurant', note: "100 N Beretania St (Cultural Plaza). Vietnamese pho and banh mi. Another solid pho option in the plaza." }
    ]
  },
  {
    id: 'nimitz',
    name: 'Nimitz Highway',
    subtitle: 'Harbor & Fresh Catch',
    neighborhood: 'Iwilei',
    neighborhoods: ['Iwilei', 'Kalihi', 'Downtown'],
    vibe: 'food',
    coords: [
      [21.3088, -157.8650],
      [21.3105, -157.8695],
      [21.3120, -157.8740],
      [21.3138, -157.8790],
      [21.3155, -157.8840]
    ],
    center: [21.3120, -157.8740],
    zoom: 15,
    summary: "Industrial waterfront corridor where Honolulu's commercial fishing fleet meets a growing food scene. Pier 38 is the anchor — home to the only fresh tuna auction in the United States and three seafood restaurants pulling fish straight off the boats. Liliha Bakery's Nimitz location is a 24/7-energy local institution.",
    insiderTip: "The Honolulu Fish Auction runs at 5:30am daily — public tours ($25) available Saturday mornings by reservation at hawaii-seafood.org. Arrive at Nico's by 6:30am to eat alongside commercial fishermen. La Mariana Sailing Club (50 Sand Island Access Rd) is hidden off Nimitz in an industrial zone — Honolulu's last original 1957 tiki bar.",
    bestTime: 'Early morning 6-9am for fish auction and freshest catch; dinner at Thirty Eight or Upstairs',
    parking: "Free lot at Pier 38. La Mariana has its own lot. Liliha Bakery Nimitz has ample parking. Avoid the Nimitz shoulder — it's a tow zone.",
    warnings: "Uncle's Fish Market at Pier 38 permanently closed in 2020 — don't go looking for it. This is an industrial zone so sidewalks are sparse. Not walkable between clusters — drive between Pier 38 and Liliha Bakery.",
    spots: [
      { name: "Nico's Pier 38", type: 'restaurant', note: "Auction-fresh seafood since 2004. 1129 N Nimitz. Mon-Fri 6:30am-9pm, Sat-Sun extended hours. The furikake ahi is iconic." },
      { name: "Upstairs at Pier 38", type: 'restaurant', note: "Fine-dining sister to Nico's, same building upstairs. Locally sourced seafood. Mon-Fri 4-9pm, Sat-Sun 5-9pm." },
      { name: "Thirty Eight", type: 'restaurant', note: "Brand new harbor bistro at 1135 N Nimitz. Opened Feb 2026. Whole fried moi, hamachi crudo. Mon-Fri 5-9pm." },
      { name: "Pier 38 Fish Market", type: 'market', note: "Retail market at 1135 N Nimitz. MSC-certified. Fresh ahi, poke kits, sashimi. Tue-Sat 9am-4:30pm." },
      { name: "Honolulu Fish Auction", type: 'experience', note: "Only fresh tuna auction in the US. Public tours Sat by reservation ($25). Daily auction starts 5:30am." },
      { name: "Liliha Bakery (Nimitz)", type: 'bakery', note: "580 N Nimitz. Coco puffs, chantilly cake, loco moco. Daily 6:30am-10pm. The local gathering spot." },
      { name: "La Mariana Sailing Club", type: 'restaurant', note: "50 Sand Island Access Rd. Honolulu's OG tiki bar since 1957. Tue-Sat 11am-8pm. Hidden gem off Nimitz." }
    ]
  },
  {
    id: 'ala-wai',
    name: 'Ala Wai Blvd',
    subtitle: 'Canal-Side Local Loop',
    neighborhood: 'Waikiki',
    neighborhoods: ['Waikiki', 'McCully-Moiliili', 'Kapahulu'],
    vibe: 'mixed',
    coords: [
      [21.2870, -157.8345],
      [21.2862, -157.8300],
      [21.2852, -157.8250],
      [21.2838, -157.8200],
      [21.2818, -157.8160]
    ],
    center: [21.2850, -157.8250],
    zoom: 15,
    summary: "The anti-Waikiki strip. While tourists pack Kalakaua, this canal-side boulevard is where locals jog, paddle outrigger canoes, and walk their dogs. The paved Ala Wai Promenade runs the full length from McCully to Kapahulu with mountain and canal views. A handful of serious food spots anchor the cross streets.",
    insiderTip: "Outrigger canoe clubs practice along the canal near Ala Wai Community Park most evenings — Lokahi Canoe Club welcomes drop-ins. The sunset from the McCully bridge looking Diamond Head-ward is one of the most underrated views in Honolulu. Side Street Inn on Kapahulu (south end) is the gold-standard for local-style pupu.",
    bestTime: 'Early morning (6-8am) or sunset for the promenade walk; dinner on cross streets',
    parking: "Free parking at Ala Wai Community Park lot and along the boulevard (2-hour limit). Ala Wai Golf Course lot if you're golfing or eating at the snack bar.",
    warnings: "Do not swim or touch the canal water — it has a long history of water quality issues (cleanup project ongoing). The path is unlit in some stretches past McCully. Mosquitoes at dusk near the canal.",
    spots: [
      { name: "Ala Wai Promenade", type: 'experience', note: "2.5-mile paved canal-side path. Joggers, dog walkers, canoe club watchers. Mountain views the whole way." },
      { name: "Side Street Inn (Kapahulu)", type: 'restaurant', note: "614 Kapahulu Ave. Local pupu institution. Fried rice, pork chops. Tue-Fri 4-8:30pm, Sat-Sun noon-8:30pm." },
      { name: "Leonard's Bakery", type: 'bakery', note: "933 Kapahulu Ave. Malasadas since 1952. Haupia filled is the move. Open daily 5:30am-7pm. Celebrating 75 years." },
      { name: "Ala Wai Golf Course", type: 'experience', note: "404 Kapahulu. Public 18-hole course. L&L snack bar open to non-golfers daily 6am-7pm. $68 green fee." },
      { name: "Waiola Shave Ice", type: 'restaurant', note: "2135 Waiola St (one block off canal). Mon-Sat 10am-6pm, Sun 11am-6pm. Local institution." },
      { name: "Ala Wai Community Park", type: 'experience', note: "Soccer fields, dog park, basketball, playground, community garden. Canoe clubs practice along the canal." },
      { name: "L\u014Dkahi Canoe Club", type: 'experience', note: "Outrigger canoe paddling at the mouth of Ala Wai Canal. Open to all skill levels. Practice most evenings." }
    ]
  },
  {
    id: 'kukui',
    name: 'Kukui Street',
    subtitle: 'Chinatown Back Door',
    neighborhood: 'Chinatown',
    neighborhoods: ['Chinatown', 'Downtown'],
    vibe: 'food',
    coords: [
      [21.3135, -157.8640],
      [21.3140, -157.8610],
      [21.3148, -157.8580],
      [21.3155, -157.8550]
    ],
    center: [21.3143, -157.8595],
    zoom: 17,
    summary: "The quieter, residential edge of Chinatown that most visitors walk right past. Kukui Street connects the Chinatown Cultural Plaza to Downtown and holds some of the most authentic, no-frills eateries in the district. This is where Chinatown's older generation shops, eats dim sum, and does tai chi in the plaza courtyard.",
    insiderTip: "Chinatown Cultural Plaza (100 N Beretania at Kukui) has a courtyard where aunties and uncles do tai chi every morning at 7am — it's a scene. The lei shops on Maunakea (one block west) will custom-make leis if you order a day ahead. Giovedi on nearby Hotel St was named one of Bon App\u00E9tit's best new restaurants in 2025.",
    bestTime: 'Morning for dim sum and market shopping (7-11am); dinner for Giovedi and Livestock Tavern',
    parking: "Chinatown Gateway Plaza garage at River and Nimitz. Street meters free after 6pm and weekends.",
    warnings: "Chinatown has safety concerns after dark, especially north of Vineyard Blvd. Stick to the lit commercial blocks. Cash preferred at Cultural Plaza vendors.",
    spots: [
      { name: "Chinatown Cultural Plaza", type: 'cultural', note: "100 N Beretania St. Asian grocery, herbal medicine, bakeries. Morning tai chi in the courtyard. Festivals year-round." },
      { name: "Giovedi", type: 'restaurant', note: "10 N Hotel St. Italian-Asian fusion by Chef Bao Tran. Bon App\u00E9tit Best New Restaurant 2025. Tue-Sat 5-10pm. Reservations essential." },
      { name: "Livestock Tavern", type: 'restaurant', note: "49 N Hotel St. Seasonal American comfort food, meat-forward. Mon-Fri 5-10pm, Sat-Sun brunch + dinner." },
      { name: "Lucky Belly", type: 'restaurant', note: "50 N Hotel St. Ramen, bao, belly bowls. Mon-Sat, closed Sun. The belly bowl is the move." },
      { name: "F\u00EAte", type: 'restaurant', note: "2 N Hotel St. Seasonal New American. Bon App\u00E9tit Best New Restaurants 2025. Mon-Sat 11am-9/10pm. Closed Sun." },
      { name: "Kukui Plaza", type: 'landmark', note: "1255 Nu\u02BBuanu Ave at Kukui. Massive residential complex marking the Chinatown-Downtown boundary." }
    ]
  },
  {
    id: 'king-downtown',
    name: 'S. King Street Downtown',
    subtitle: 'Arts & History Mile',
    neighborhood: 'Downtown',
    neighborhoods: ['Downtown', 'Punchbowl', 'Thomas Square'],
    vibe: 'arts',
    coords: [
      [21.3068, -157.8620],
      [21.3050, -157.8580],
      [21.3030, -157.8540],
      [21.3010, -157.8500],
      [21.2990, -157.8460]
    ],
    center: [21.3030, -157.8540],
    zoom: 15,
    summary: "Honolulu's civic and cultural backbone. This stretch of South King runs past \u02BBIolani Palace (the only royal palace on US soil), through the government district, past Thomas Square Park with its rotating public sculpture program, and ends near the Honolulu Museum of Art. A quiet, walkable corridor rich in history and architecture.",
    insiderTip: "Capitol Modern (250 S Hotel, one block off King) is the free state art museum most people don't know exists — Wed-Sat 10am-4pm, no tickets needed. Thomas Square's rotating public sculptures change yearly. Cafe Julia inside the 1927 YWCA Lani\u0101kea building at 1040 Richards serves weekday lunch in one of the most beautiful courtyards in Honolulu.",
    bestTime: 'Weekday mid-morning to early afternoon for museums and walking; avoid rush hour traffic',
    parking: "Metered street parking on King. Ali\u02BBi Place garage at 1099 Alakea. One South King garage. Free on weekends at government buildings.",
    warnings: "Most museums closed Sunday-Monday. Government district empties after 5pm. Kokua Market on S. King permanently closed in 2024 — the space is now leased to Honolulu Coffee's Bakery on King.",
    spots: [
      { name: "\u02BBIolani Palace", type: 'cultural', note: "364 S King St. Only royal palace in the US. Tours Tue-Sat 9am-4pm. $30 guided, $25 self-guided." },
      { name: "Capitol Modern", type: 'cultural', note: "250 S Hotel St (formerly HiSAM). Free state art museum. Wed-Sat 10am-4pm. No tickets required." },
      { name: "Honolulu Museum of Art", type: 'cultural', note: "900 S Beretania (one block off King). World-class collection. Wed-Sun 10am-6pm, Thu until 9pm. $20 adults." },
      { name: "Cafe Julia", type: 'restaurant', note: "1040 Richards St at YWCA Lani\u0101kea. Weekday lunch in a gorgeous 1927 courtyard. Mon-Fri 6:30am-6pm." },
      { name: "Gyotaku Japanese Restaurant", type: 'restaurant', note: "1824 S King St. Where locals gather for authentic Japanese. Walk-in only (reservations 6+). Daily 11am-8pm." },
      { name: "Honolulu Coffee Bakery on King", type: 'coffee', note: "2643 S King (former K\u014Dkua Market). Le Cordon Bleu pastry chef Brian Sung. Croissants, loco moco, omurice. Opened July 2025." },
      { name: "Thomas Square Park", type: 'cultural', note: "S King at Victoria. Rotating public sculpture program. Shaded benches, historic banyan trees. Free." }
    ]
  },
  {
    id: 'university',
    name: 'University Avenue',
    subtitle: 'College Town Eats',
    neighborhood: 'Moiliili',
    neighborhoods: ['Moiliili', 'Manoa'],
    vibe: 'food',
    coords: [
      [21.2888, -157.8240],
      [21.2920, -157.8225],
      [21.2955, -157.8210],
      [21.2990, -157.8195],
      [21.3020, -157.8180]
    ],
    center: [21.2955, -157.8210],
    zoom: 16,
    summary: "The main artery linking UH Manoa to King Street, University Ave is a multicultural cheap-eats corridor fueled by student wallets. Egyptian-Hawaiian health food, bubble tea shops, Indian curry, and organic groceries all share the same half mile. No pretense, no reservations needed \u2014 just good food at real prices.",
    insiderTip: "Da Spot near King St is two restaurants in one \u2014 Egyptian/Mediterranean on one side, smoothie bar on the other. QQ Tea House uphill near campus is the go-to boba spot. Andy's Sandwiches at the top of the avenue (technically on Manoa Rd) is the pre-hike fuel stop every local knows.",
    bestTime: 'Weekday lunch 11am\u20131pm when UH is in session',
    parking: "Street parking on University is metered. Side streets off University toward Manoa are free but fill fast during the semester. UH parking structures available evenings/weekends.",
    warnings: "Blazin' Steaks at 1010 University permanently closed Jan 2026. Kokua Market co-op (S King/University) closed in 2024 after 50+ years. Traffic backs up badly during UH class changes.",
    spots: [
      { name: "Da Spot Health Foods", type: 'restaurant', note: "2469 S King (at University). Egyptian, Mediterranean, Thai, Hawaiian fusion. Vegan-friendly, halal options. Daily 11am\u20139pm. Under $15." },
      { name: "QQ Tea House", type: 'cafe', note: "931 University Ave. Boba and milk tea, student hangout. Mon\u2013Fri 11:30am\u20137:30pm. Taro milk tea is the move." },
      { name: "Cafe Maharani", type: 'restaurant', note: "2509 S King St. Indian cuisine since 2000. Dinner only 5\u20139pm daily. Butter chicken and garlic naan are the standards." },
      { name: "Andy's Sandwiches & Smoothies", type: 'restaurant', note: "2904 E Manoa Rd (top of University Ave). Sandwiches, smoothies, acai bowls. Mon\u2013Fri 7am\u20134pm. Pre-hike institution since 1977." },
      { name: "Down to Earth", type: 'market', note: "2525 S King St. Organic grocery + deli with hot bar, salad bar, smoothies. Founded 1977. Vegetarian/vegan staple." },
      { name: "Puck's Alley", type: 'mixed', note: "2600 S King. Multi-tenant food court area near UH. Rotating mix of restaurants and shops. Student social hub." }
    ]
  },
  {
    id: 'school-st',
    name: 'School Street',
    subtitle: 'Old-School Local',
    neighborhood: 'Kalihi',
    neighborhoods: ['Kalihi', 'Liliha'],
    vibe: 'food',
    coords: [
      [21.3215, -157.8565],
      [21.3225, -157.8530],
      [21.3238, -157.8490],
      [21.3250, -157.8450],
      [21.3265, -157.8410]
    ],
    center: [21.3238, -157.8490],
    zoom: 16,
    summary: "North School Street through Kalihi is the real-deal local food corridor \u2014 no tourists, no Instagram hype, just James Beard Award winners and multi-generational plate lunch joints. This is where Honolulu's working families have eaten for decades. Helena's Hawaiian Food alone is worth the trip, but the okazuyas and saimin shops seal it.",
    insiderTip: "Helena's is only open Tue\u2013Fri 10am\u20137:30pm \u2014 plan around that. Gulick Delicatessen on nearby Gulick Ave is a must-stop okazuya (Japanese deli) that sells out by noon. Mitsu-Ken's garlic chicken on N King is one of the best things you'll eat on the island \u2014 arrive before 10am or it's gone.",
    bestTime: 'Weekday late morning, 10am\u2013noon. Many spots close early or sell out.',
    parking: "Free street parking is generally available \u2014 this isn't a tourist area. Small lots at strip malls along School St.",
    warnings: "Many spots are cash-only or cash-preferred. Portions are huge but hours are short \u2014 most close by 2pm. Ethel's Grill on Kalihi St permanently closed late 2025.",
    spots: [
      { name: "Helena's Hawaiian Food", type: 'restaurant', note: "1240 N School St. James Beard Award winner, since 1946. Pipikaula short ribs, lau lau, poi. Tue\u2013Fri 10am\u20137:30pm. Cash preferred." },
      { name: "Palace Saimin", type: 'restaurant', note: "1256 N King St (near School). Saimin since 1946. Old-school counter seating, homemade noodles. Tue\u2013Fri 10am\u20138pm, Sat 10am\u20133pm." },
      { name: "Mitsu-Ken Okazu & Catering", type: 'restaurant', note: "2300 N King St. Famous garlic chicken. Okazuya since 1992. Opens 5am, sells out by noon. Go early." },
      { name: "Gulick Delicatessen", type: 'restaurant', note: "1512 Gulick Ave (off School St). Classic okazuya: fried noodles, chow fun, inari sushi, cone sushi. Sells out by noon daily." },
      { name: "Upscale Hawaii", type: 'restaurant', note: "1333 N King St. Steak and lobster plate lunches for $20. Daily 11am\u201311pm. The 'bomb sauce' is the signature." },
      { name: "Liliha Bakery", type: 'bakery', note: "515 N Kuakini St (near School/Liliha). Famous Coco Puffs \u2014 sells 5,000+ daily. Open 6am\u201310pm. Original location since 1950." }
    ]
  },
  {
    id: 'vineyard',
    name: 'Vineyard Boulevard',
    subtitle: 'Temples & Dim Sum',
    neighborhood: 'Liliha',
    neighborhoods: ['Liliha', 'Chinatown', 'Downtown'],
    vibe: 'mixed',
    coords: [
      [21.3155, -157.8615],
      [21.3168, -157.8575],
      [21.3178, -157.8535],
      [21.3190, -157.8490],
      [21.3200, -157.8450]
    ],
    center: [21.3178, -157.8535],
    zoom: 16,
    summary: "Vineyard Boulevard runs from Chinatown's Cultural Plaza through the Liliha neighborhood, passing Buddhist and Shinto temples, dim sum palaces, and one of Honolulu's most beloved bakeries. It's a living corridor of immigrant heritage \u2014 Chinese, Japanese, Filipino \u2014 where incense and char siu bao scent the same block.",
    insiderTip: "Start at Chinatown Cultural Plaza for dim sum at Tai Pan or Fook Lam (both open by 7am). Walk east on Vineyard \u2014 pass the Izumo Taishakyo Shinto shrine and Kwan Yin Temple. End at Liliha Bakery for Coco Puffs. Liliha Drive Inn on Liliha St has underrated plate lunches \u2014 garlic chicken and meat jun.",
    bestTime: 'Morning, 7\u201310am for dim sum. Temples are best visited early.',
    parking: "Free parking at Chinatown Cultural Plaza garage (validate at restaurants). Street parking on Vineyard is time-limited. Liliha Bakery has its own lot but it fills fast.",
    warnings: "The Liliha\u2013Vineyard 4-way intersection is notoriously confusing \u2014 6 roads converge. Dim sum carts at Fook Lam stop rolling by 1pm. Chinatown end can feel sketchy after dark.",
    spots: [
      { name: "Tai Pan Dim Sum", type: 'restaurant', note: "100 N Beretania (Chinatown Cultural Plaza). Dim sum to-go and dine-in. Daily 7am\u20139pm. Har gow and char siu bao are reliable." },
      { name: "Fook Lam Seafood", type: 'restaurant', note: "100 N Beretania (Chinatown Cultural Plaza). Cantonese dim sum and seafood. Daily 7am\u20139pm. Cart-service mornings." },
      { name: "Nice Day Chinese Seafood", type: 'restaurant', note: "1425 Liliha St. Dim sum and Chinese seafood. Mon\u2013Fri 8am\u20138pm. Larger space than Chinatown spots, less crowded." },
      { name: "Liliha Bakery", type: 'bakery', note: "515 N Kuakini St. The original \u2014 Coco Puffs, butter rolls, plate lunch counter. Open 6am\u201310pm daily. Honolulu institution since 1950." },
      { name: "Liliha Drive Inn", type: 'restaurant', note: "1408 Liliha St. Plate lunches: garlic chicken, kalbi, meat jun. Opens 9am. Parking entrance off Vineyard Blvd." },
      { name: "Kwan Yin Temple", type: 'cultural', note: "170 N Vineyard Blvd. Ornate Chinese Buddhist temple. Free to visit. Incense and offerings. Peaceful courtyard." },
      { name: "Izumo Taishakyo Mission", type: 'cultural', note: "215 N Kukui St (near Vineyard). Shinto shrine. Major destination during New Year's (hatsumode). Free to visit." }
    ]
  },
  {
    id: 'date-isenberg',
    name: 'Date St / Isenberg Area',
    subtitle: 'Japanese Food Hub',
    neighborhood: 'Moiliili',
    neighborhoods: ['Moiliili', 'McCully-Moiliili'],
    vibe: 'food',
    coords: [
      [21.2895, -157.8275],
      [21.2905, -157.8255],
      [21.2915, -157.8235],
      [21.2925, -157.8215],
      [21.2900, -157.8250]
    ],
    center: [21.2910, -157.8245],
    zoom: 17,
    summary: "The Date Street and Isenberg intersection zone in Moiliili is Honolulu's densest concentration of authentic Japanese dining outside of Japan. Yakitori, izakaya, okazuya, and sushi bars cluster within two blocks of each other, many run by Japanese expats. Fukuya has been here since 1939. The recent addition of Ribs & Broth adds Vietnamese flair to the mix.",
    insiderTip: "Fukuya Deli opens at 6am and sells out by noon \u2014 the cone sushi and fried chicken are essential. Tori Ton and Tenkichi are in the same building at 2334 S King (Tenkichi is upstairs). Dagon at 2671 S King is Honolulu's only Burmese restaurant \u2014 the fermented tea leaf salad is legendary. Torikyu at 2626 S King does excellent yakitori starting at 6pm.",
    bestTime: 'Lunch 11am\u20131pm for okazuya/deli; dinner 6\u20138pm for izakaya and yakitori',
    parking: "Puck's Alley lot (2600 S King) has some public parking. Street parking on Date, Isenberg, and side streets. The area is walkable from UH campus.",
    warnings: "Maple Garden (909 Isenberg) permanently closed April 2025 after decades. Sweet Home Cafe (2334 S King) closed late 2025. Many izakayas are dinner-only \u2014 check hours. Fukuya closed Mon\u2013Tue.",
    spots: [
      { name: "Fukuya Delicatessen", type: 'restaurant', note: "2710 S King St. Okazuya since 1939. Cone sushi, fried chicken, nishime. Wed\u2013Sun 6am\u20132pm. Sells out early." },
      { name: "Tori Ton", type: 'restaurant', note: "2334 S King St, Ste B. Yakitori izakaya. Grilled chicken skewers, draft beer. Mon\u2013Fri from 5pm. Part of the Totoya family." },
      { name: "Izakaya Tenkichi", type: 'restaurant', note: "2334 S King St, 2F (above Tori Ton). Tempura, sushi, handrolls. Lunch Wed\u2013Sun 11am\u20133pm, dinner nightly. New lunch menu launched 2025." },
      { name: "Dagon Burmese Cuisine", type: 'restaurant', note: "2671 S King St. Honolulu's only Burmese. Tea leaf salad, mohinga noodle soup. Wed\u2013Mon 5\u201310pm. Since 2013." },
      { name: "Torikyu", type: 'restaurant', note: "2626 S King St. Yakitori specialist. Intimate counter seating. Opens 6pm nightly. Replaced Kohnotori in 2016." },
      { name: "Imanas Tei", type: 'restaurant', note: "2626 S King St. Sushi bar and izakaya. Bamboo-ceiling ambiance. Mon\u2013Thu 5\u20139:30pm, Fri\u2013Sun adds 11am\u20132pm lunch." },
      { name: "Ribs & Broth", type: 'restaurant', note: "2700 S King St. Vietnamese \u2014 signature beef back rib pho ($25.95). Opened Dec 2025 in former Bangkok Chef space. Daily 11am\u201310pm." }
    ]
  },
  {
    id: 'waialae-east',
    name: 'Wai\u02BBalae Avenue East',
    subtitle: 'Suburban Strip-Mall Crawl',
    neighborhood: 'Kahala',
    neighborhoods: ['Kahala', 'Ainakoa', 'Niu Valley', 'Waialae-Kahala'],
    vibe: 'food',
    coords: [
      [21.2850, -157.7920],
      [21.2845, -157.7870],
      [21.2838, -157.7810],
      [21.2828, -157.7750],
      [21.2815, -157.7685]
    ],
    center: [21.2838, -157.7810],
    zoom: 15,
    summary: "Past Kahala Mall, Wai\u02BBalae Avenue sheds its indie charm and turns into a suburban corridor of strip-mall plazas hiding genuinely good food. This is where East Honolulu locals eat when they don\u2019t want to drive into Kaimuki. Gyotaku in Niu Valley Shopping Center is the anchor, and Kapa Hale quietly serves one of the best neighborhood menus on this side of town.",
    insiderTip: "Zippy\u2019s Kahala (4134 Wai\u02BBalae) is the best Zippy\u2019s location on the island \u2014 clean, fast, and the Napoleon\u2019s Bakery inside has liliko\u02BBi chiffon cake. Past the mall, Kapa Hale at 4614 Kilauea Ave does a killer wagyu loco moco. Gyotaku\u2019s Nattochos (natto + nachos) are legendary among regulars.",
    bestTime: 'Weekday dinner 5\u20137pm when the strip malls are mellow',
    parking: "Every plaza has its own lot \u2014 parking is never an issue out here. This is car-country Honolulu.",
    warnings: "Pho Time Niu Valley and Le Bistro in Niu Valley Shopping Center both permanently closed (2025\u20132026). Kozo Sushi Kahala (in-mall location at 4211 Wai\u02BBalae) closed \u2014 but the Kilauea Ave location (4618) is still open. The suburban stretch can feel dead after 8:30pm.",
    spots: [
      { name: "Gyotaku \u2014 Niu Valley", type: 'restaurant', note: "5728 Kalanianaole Hwy. Japanese fusion since the \u201990s. Nattochos, Okinawan sweet potato pie. Lunch & dinner daily." },
      { name: "Hangang Korean BBQ", type: 'restaurant', note: "5730 Kalanianaole Hwy, Niu Valley Shopping Center. Tabletop grill with high-quality meats. Open daily lunch & dinner." },
      { name: "Zippy\u2019s Kahala", type: 'restaurant', note: "4134 Wai\u02BBalae Ave. The best Zippy\u2019s \u2014 full diner, Napoleon\u2019s Bakery, and Kahala Sushi inside. 6am\u2013midnight daily." },
      { name: "Kapa Hale", type: 'restaurant', note: "4614 Kilauea Ave. Neighborhood eatery with wagyu loco moco and craft cocktails. In the plaza past Kahala Mall." },
      { name: "Kozo Sushi \u2014 Kahala", type: 'restaurant', note: "4618 Kilauea Ave (not the closed mall location). Conveyor belt sushi, hot dishes, and vegetarian options." },
      { name: "Whole Foods Kahala", type: 'shopping', note: "4211 Wai\u02BBalae Ave (inside Kahala Mall). Puka\u2019s counter inside serves poke bowls and craft beer." }
    ]
  },
  {
    id: 'kapahulu-upper',
    name: 'Upper Kapahulu',
    subtitle: 'Japanese Izakaya Row',
    neighborhood: 'Kapahulu',
    neighborhoods: ['Kapahulu', 'Kaimuki', 'Mo\u02BBili\u02BBili'],
    vibe: 'food',
    coords: [
      [21.2873, -157.8095],
      [21.2890, -157.8082],
      [21.2908, -157.8070],
      [21.2925, -157.8058],
      [21.2940, -157.8045]
    ],
    center: [21.2905, -157.8075],
    zoom: 16,
    summary: "The upper stretch of Kapahulu \u2014 from around the 600 block up toward the freeway \u2014 has quietly become Honolulu\u2019s densest izakaya and Japanese specialty corridor outside of Mo\u02BBili\u02BBili. Tonkatsu Tamafuji draws hour-long lines for aged pork katsu. Aburiya Ibushi does smoky robata until midnight on weekends. Newer arrivals like Gyoza Studio Kubota and Yakitori Glad have cemented this as a serious food destination.",
    insiderTip: "Tonkatsu Tamafuji (449 Kapahulu, 2nd floor) \u2014 go on a Wednesday at 4pm sharp when they open to skip the line. Aburiya Ibushi (740 Kapahulu) does late-night robata until 12:30am Fri\u2013Sat. Gyoza Studio Kubota (617 Kapahulu) is open until midnight \u2014 the pan-fried gyoza are perfect after drinks. Guava Smoked at 567 Kapahulu does smoked pork using invasive guava wood.",
    bestTime: 'Dinner 5\u20137pm weekdays; late-night Fri\u2013Sat at Ibushi or Kubota',
    parking: "More parking than lower Kapahulu. The buildings have small lots and Date Street side streets work. Campbell Ave behind Guava Smoked has spaces.",
    warnings: "Tonkatsu Tamafuji lines can be 60+ minutes on weekends \u2014 arrive before opening. They\u2019re closed Tuesdays. Yakitori Glad is reservation-only for dinner. Haili\u2019s Hawaiian Food at 760 Palani permanently closed June 2024 after 70 years.",
    spots: [
      { name: "Tonkatsu Tamafuji", type: 'restaurant', note: "449 Kapahulu Ave, 2nd floor. Aged pork loin katsu \u2014 the Jyukusei set is the move. Mon/Wed\u2013Fri from 4pm, Sat from 11am. Closed Tue." },
      { name: "Aburiya Ibushi", type: 'restaurant', note: "740 Kapahulu Ave. Robata-grilled meats and seafood in a smoky izakaya setting. Mon\u2013Thu 5\u201310:30pm, Fri\u2013Sun until midnight." },
      { name: "Gyoza Studio Kubota", type: 'restaurant', note: "617 Kapahulu Ave. Pan-fried gyoza specialist. Open 5pm\u2013midnight daily. Perfect late-night spot." },
      { name: "Yakitori Glad", type: 'restaurant', note: "766 Kapahulu Ave. Authentic Tokyo-style yakitori. Dinner only, reservations recommended. Gets busy fast." },
      { name: "Guava Smoked", type: 'restaurant', note: "567 Kapahulu Ave, 2nd floor. Smoked pork using invasive guava wood since 2011. Daily 11am\u20138pm." },
      { name: "Onoya Ramen", type: 'restaurant', note: "740 Kapahulu Ave. Rich tonkotsu ramen in the same building as Ibushi. Lunch and dinner." }
    ]
  },
  {
    id: 'manoa',
    name: 'M\u0101noa Road',
    subtitle: 'Valley College Town',
    neighborhood: 'M\u0101noa',
    neighborhoods: ['M\u0101noa', 'University'],
    vibe: 'food',
    coords: [
      [21.3000, -157.8120],
      [21.3020, -157.8095],
      [21.3038, -157.8065],
      [21.3052, -157.8035],
      [21.3070, -157.8010]
    ],
    center: [21.3035, -157.8065],
    zoom: 15,
    summary: "M\u0101noa Valley\u2019s food scene clusters around M\u0101noa Marketplace and the stretch of East M\u0101noa Road near UH. The marketplace has been completely revitalized \u2014 Dusty Grable\u2019s Little Plum and Lady Elaine anchored a 2024\u20132025 restaurant renaissance. Morning Glass Coffee is the cult favorite, Andy\u2019s Sandwiches is the 40-year institution, and Fendu Boulangerie bakes the best croissants on the island.",
    insiderTip: "Morning Glass Coffee (2955 E M\u0101noa Rd) \u2014 the mac & cheese pancakes are famous but the burekas are the real sleeper. Get there by 7:30am on weekdays or wait. Andy\u2019s (2904 E M\u0101noa Rd) is closed weekends \u2014 go Mon\u2013Fri for the turkey avocado sandwich. Little Plum\u2019s mochi churros are the new Kaimuki must-try. Lady Elaine\u2019s ras el hanout rib-eye is a splurge worth taking.",
    bestTime: 'Weekday morning 7\u20139am for coffee/bakery; dinner Tue\u2013Sat for Little Plum & Lady Elaine',
    parking: "M\u0101noa Marketplace has a large free lot. Street parking on Woodlawn Dr and E M\u0101noa Rd is usually available outside of UH class hours.",
    warnings: "Morning Glass gets packed on weekends \u2014 lines out the door by 9am. Andy\u2019s is closed Sat\u2013Sun. M\u0101noa gets more rain than anywhere in Honolulu \u2014 bring an umbrella. The valley road floods during heavy rain.",
    spots: [
      { name: "Morning Glass Coffee + Caf\u00E9", type: 'restaurant', note: "2955 E M\u0101noa Rd. Specialty coffee, mac & cheese pancakes, burekas. Tue\u2013Fri 7am\u20132pm, Sat\u2013Sun 8am\u20132pm." },
      { name: "Andy\u2019s Sandwiches & Smoothies", type: 'restaurant', note: "2904 E M\u0101noa Rd. 40+ year institution. Fresh sandwiches, smoothies, and salads. Mon\u2013Fri 7am\u20134pm. Closed weekends." },
      { name: "Fendu Boulangerie", type: 'restaurant', note: "M\u0101noa Marketplace. French hearth-baked bread, dark chocolate croissants, elegant desserts. Daily 7:30am\u20133pm." },
      { name: "Little Plum", type: 'restaurant', note: "2754 Woodlawn Dr, M\u0101noa Marketplace. Dusty Grable\u2019s Asian fusion \u2014 mochi churros, spicy eggplant teishoku. Mon\u2013Sat 11am\u20132pm & 5\u20139pm." },
      { name: "Lady Elaine", type: 'restaurant', note: "2752 Woodlawn Dr, M\u0101noa Marketplace. Mediterranean \u2014 ras el hanout rib-eye, harissa seafood stew. Mon\u2013Sat 11am\u20132pm & 5\u20139pm." },
      { name: "Nishi Moncho Ramen", type: 'restaurant', note: "2851 E M\u0101noa Rd. Rich tonkotsu and specialty ramen. Mon\u2013Fri 10:30am\u20139pm." },
      { name: "Le Crepe Cafe", type: 'restaurant', note: "M\u0101noa Marketplace. Savory crepes, acai bowls, waffles. Daily 9am\u20138pm. Solid brunch alternative." },
      { name: "Red Pepper Korean BBQ", type: 'restaurant', note: "M\u0101noa Marketplace. Tabletop grill Korean BBQ. Good value for the valley." }
    ]
  },
  {
    id: 'monsarrat-paki',
    name: 'Monsarrat / Paki Avenue',
    subtitle: 'Park-Side Plates',
    neighborhood: 'Kapi\u02BBolani Park',
    neighborhoods: ['Diamond Head', 'Waikiki', 'Kapi\u02BBolani'],
    vibe: 'food',
    coords: [
      [21.2680, -157.8148],
      [21.2670, -157.8160],
      [21.2660, -157.8180],
      [21.2658, -157.8200],
      [21.2665, -157.8225]
    ],
    center: [21.2665, -157.8185],
    zoom: 16,
    summary: "Where Monsarrat meets Paki Avenue at the edge of Kapi\u02BBolani Park, you get an open-air food corridor with park views. Pioneer Saloon serves some of the best plate lunches on the island from a tiny counter. The Wednesday People\u2019s Open Market at Monsarrat & Paki sells farm-direct produce. Sunday Royal Hawaiian Band concerts at the Waikiki Shell bandstand make this the best park-and-eat combo in Honolulu.",
    insiderTip: "Pioneer Saloon (3046 Monsarrat) \u2014 the garlic shrimp plate and hamburg steak are the moves. Get there before the noon rush. Diamond Head Market (3158 Monsarrat) just added weekend breakfast and a new okazuya pop-up as of late 2025 \u2014 get the blueberry cream cheese scones before they sell out by 9am. Wednesday People\u2019s Open Market at Monsarrat & Paki runs 10\u201311am only.",
    bestTime: 'Weekend morning 8\u201311am; Wednesday 10am for the farmers market',
    parking: "Kapi\u02BBolani Park Lot 1 at 2805 Monsarrat Ave is free. Street parking on Paki Ave and Monsarrat is usually available on weekdays.",
    warnings: "Diamond Head Market now charges a 3% credit card surcharge (as of Sep 2025). The park area gets crowded during weekend soccer tournaments and Honolulu Marathon season (December). No shade near the food spots \u2014 bring a hat.",
    spots: [
      { name: "Pioneer Saloon", type: 'restaurant', note: "3046 Monsarrat Ave. High-quality plate lunches \u2014 garlic shrimp, hamburg steak. Daily 11am\u20138pm. Counter service, outdoor seating." },
      { name: "Diamond Head Market & Grill", type: 'restaurant', note: "3158 Monsarrat Ave. 500+ plates daily. New weekend breakfast & okazuya pop-up (Dec 2025). 7:30am\u20138pm Mon\u2013Fri, weekends from 7am." },
      { name: "Bogart\u2019s Cafe", type: 'restaurant', note: "3045 Monsarrat Ave. Acai bowls, breakfast bagel sandwiches. Daily 7am\u20133pm. Pre-hike institution." },
      { name: "South Shore Grill", type: 'restaurant', note: "3114 Monsarrat Ave. Hawai\u02BBi\u2019s best fish tacos. Casual, fast, beach-ready." },
      { name: "People\u2019s Open Market", type: 'shopping', note: "Monsarrat & Paki intersection. Farm-direct produce, flowers. Wednesdays 10\u201311am only. Cash preferred." },
      { name: "Waikiki Shell / Bandstand", type: 'cultural', note: "Kapi\u02BBolani Park. Free Sunday afternoon Royal Hawaiian Band concerts. Check schedule for evening shows." }
    ]
  },
  {
    id: 'mokauea-sand-island',
    name: 'Mokauea St / Sand Island',
    subtitle: 'Industrial Plate Lunch',
    neighborhood: 'Kalihi',
    neighborhoods: ['Kalihi', 'Kalihi-Palama', 'Iwilei', 'Sand Island'],
    vibe: 'food',
    coords: [
      [21.3220, -157.8735],
      [21.3195, -157.8750],
      [21.3168, -157.8762],
      [21.3145, -157.8730],
      [21.3130, -157.8690]
    ],
    center: [21.3175, -157.8735],
    zoom: 15,
    summary: "Kalihi\u2019s industrial waterfront is where Honolulu\u2019s working class eats \u2014 plate lunch counters in warehouses, taco trucks next to auto shops, and the freshest fish at Pier 38. This is the corridor that gave us Highway Inn (now in Kaka\u02BBako and Waipahu) and still holds Alicia\u2019s Market, the 78-year-old Kalihi institution that survived a fire and came back stronger. No tourists, no pretense, just food.",
    insiderTip: "Kau Kau Grill (111 Sand Island Access Rd) recently relocated here \u2014 massive plate lunches, Mon\u2013Fri 8am\u20131:30pm, sells out early. Alicia\u2019s Market (267 Mokauea St) is back to the original counter after their fire rebuild \u2014 poke and plate lunch Mon\u2013Sat 10am\u20132pm. Taqueria La Marea (237 Kalihi St) does the best tacos in Honolulu, hands down, but they\u2019re only open Mon\u2013Fri 10am\u20133pm.",
    bestTime: 'Weekday lunch 10am\u20131pm. Everything closes early and most spots are closed weekends.',
    parking: "Industrial area \u2014 tons of street parking everywhere. Pier 38 has a dedicated lot.",
    warnings: "Most spots are weekday-lunch-only. Alicia\u2019s is still at half capacity after their fire rebuild. Highway Inn\u2019s Kalihi location is gone \u2014 they\u2019re now at SALT at Kaka\u02BBako, Bishop Museum, and Waipahu. Uncle\u2019s Fish Market at Pier 38 permanently closed in 2020 (now at Pearlridge). The industrial area is not pedestrian-friendly \u2014 drive between spots.",
    spots: [
      { name: "Alicia\u2019s Market", type: 'restaurant', note: "267 Mokauea St. Poke and plate lunch since 1946. Rebuilding after fire \u2014 original counter reopened Jan 2025. Mon\u2013Sat 10am\u20132pm." },
      { name: "Kau Kau Grill", type: 'restaurant', note: "111 Sand Island Access Rd. Massive plate lunches \u2014 recently relocated here (2025). Mon\u2013Fri 8am\u20131:30pm. Sells out." },
      { name: "Taqueria La Marea", type: 'restaurant', note: "237 Kalihi St. The best tacos in Honolulu. Authentic Mexican from a family operation. Mon\u2013Fri 10am\u20133pm." },
      { name: "Nico\u2019s Pier 38", type: 'restaurant', note: "1129 N Nimitz Hwy. Auction-fresh seafood. Fish and chips, poke platters. Mon\u2013Sat 6:30am\u20139pm, Sun 10am\u20139pm." },
      { name: "Upstairs at Pier 38", type: 'restaurant', note: "1129 N Nimitz Hwy, 2nd floor. Chef Nico Chaize\u2019s upscale waterfront dining. Mon\u2013Fri 4\u20139pm, Sat\u2013Sun 5\u20139pm." },
      { name: "Thirty Eight Restaurant", type: 'restaurant', note: "1135 N Nimitz Hwy. New harbor bistro (opened late 2025). Seafood and local plates. Mon\u2013Fri 10am\u20132pm lunch." },
      { name: "Pier 38 Fish Market", type: 'shopping', note: "1135 N Nimitz Hwy. Fresh-off-the-boat fish direct from the auction. Open to the public." },
      { name: "Zippy\u2019s Kalihi", type: 'restaurant', note: "904 Mokauea St. The O.G. Zippy\u2019s. Comfort food anchor of the neighborhood." }
    ]
  },
  {
    id: 'waialae-kahala',
    name: 'Waialae Avenue \u2014 Kahala',
    subtitle: 'Upscale Neighborhood Eats',
    neighborhood: 'Kahala',
    neighborhoods: ['Kahala', 'Kaimuki'],
    vibe: 'food',
    coords: [
      [21.2850, -157.7920],
      [21.2852, -157.7890],
      [21.2855, -157.7860],
      [21.2858, -157.7830],
      [21.2862, -157.7800],
      [21.2865, -157.7775]
    ],
    center: [21.2857, -157.7845],
    zoom: 16,
    summary: "Where Kaimuki\u2019s indie energy meets Kahala money. The K\u016B\u2018ono Marketplace anchors the strip with Foodland\u2019s upscale Kahala MKT, the farm-to-table restaurant et al., and J. Dolan\u2019s pizza. Past 12th Ave the vibe shifts from walkable storefronts to strip-mall clusters and residential buffers before hitting Kahala Mall and Whole Foods.",
    insiderTip: "Kahala MKT by Foodland is the best grocery store on the island \u2014 poke counter rivals any standalone shop. Grab a drink at et al.\u2019s bar while someone else shops. Free parking lot in front. J. Dolan\u2019s late-night pizza (until midnight Fri\u2013Sat) is the best post-bar move in East Honolulu.",
    bestTime: 'Weekday dinner, 5\u20137pm for et al. happy hour',
    parking: "Free lot at K\u016B\u2018ono Marketplace. Kahala Mall has a massive garage. Street parking on Waialae is metered until 6pm.",
    warnings: "Et al. needs reservations for dinner, especially weekends. Kahala Mall food court is underwhelming \u2014 skip it for the standalone spots. The stretch between K\u016B\u2018ono and Kahala Mall is car-dependent, not walkable.",
    spots: [
      { name: "et al.", type: 'restaurant', note: "4210 Waialae Ave. Full-service restaurant inside K\u016B\u2018ono Marketplace. Seasonal multi-regional menu, great bar. Reservations recommended." },
      { name: "Kahala MKT by Foodland", type: 'shopping', note: "4210 Waialae Ave. Premium grocery with outstanding poke counter, hot bar, and curated local products. Free parking." },
      { name: "J. Dolan\u2019s \u2014 Kahala", type: 'restaurant', note: "4210 Waialae Ave, K\u016B\u2018ono Marketplace. NY-style pizza. Open late Fri\u2013Sat. Spinach garlic pie is the move." },
      { name: "Daiichi Ramen", type: 'restaurant', note: "4210 Waialae Ave, Ste 406. Rich tonkotsu broth. Daily 10am\u201310pm. Less crowded than the Chinatown original." },
      { name: "Lanikai Juice \u2014 Kahala", type: 'restaurant', note: "4210 Waialae Ave, K\u016B\u2018ono Marketplace. Acai bowls, cold-pressed juice. Weekends open at 7am." },
      { name: "Whole Foods \u2014 Kahala", type: 'shopping', note: "4211 Waialae Ave, inside Kahala Mall. Hawaii\u2019s first location. Poke bar, hot bar, Puka\u2019s Bar & Restaurant inside. Daily 7am\u201310pm." },
      { name: "Kahala Mall", type: 'shopping', note: "4211 Waialae Ave. 100+ shops including Apple, Macy\u2019s, Barnes & Noble. Center Stage hosts live local performances weekly." }
    ]
  },
  {
    id: '12th-ave',
    name: '12th Avenue',
    subtitle: 'Destination Dining Block',
    neighborhood: 'Kaimuki',
    neighborhoods: ['Kaimuki'],
    vibe: 'food',
    coords: [
      [21.2850, -157.7920],
      [21.2840, -157.7920],
      [21.2830, -157.7920],
      [21.2820, -157.7920],
      [21.2810, -157.7920]
    ],
    center: [21.2830, -157.7920],
    zoom: 17,
    summary: "A single residential block that punches absurdly above its weight. Koko Head Cafe anchors with the island\u2019s best brunch. Miro Kaimuki does prix fixe that rivals Waikiki at half the price. Via Gelato is the late-night sweet spot. The famous 12th Ave Grill closed in 2022 but its spirit lives on \u2014 every new tenant here knows they\u2019re cooking in hallowed ground.",
    insiderTip: "Koko Head Cafe launched dinner service in 2025 (Fri\u2013Mon 5\u20139pm) \u2014 it\u2019s excellent and way less crowded than brunch. Miro switched to \u00e0 la carte in Jan 2026, so you can finally just get one dish without the full prix fixe commitment. Via Gelato\u2019s ube and li hing mui flavors rotate \u2014 ask what\u2019s fresh.",
    bestTime: 'Weekday brunch 8\u20139am to beat lines, or Fri\u2013Mon dinner',
    parking: "Small public lot accessible from 11th or 12th Ave. Street parking on residential blocks. Arrive early on weekends.",
    warnings: "Koko Head Cafe weekend brunch wait: 45\u201390 min. No reservations for brunch. 12th Ave Grill is permanently closed (2022) \u2014 don\u2019t go looking for it. Marujuu closed Tuesdays.",
    spots: [
      { name: "Koko Head Cafe", type: 'restaurant', note: "1120 12th Ave. Chef Lee Anne Wong\u2019s brunch institution. Cornflake French toast, dumplings. Now serving dinner Fri\u2013Mon 5\u20139pm." },
      { name: "Miro Kaimuki", type: 'restaurant', note: "1108 12th Ave C. Italian-Japanese fusion. Switched to \u00e0 la carte Jan 2026. Prix fixe still available ($135). Wed\u2013Sun 5\u20139pm." },
      { name: "Marujuu", type: 'restaurant', note: "1145C 12th Ave. Japanese hamburg steak on sizzling platters. Anime decor. Opened Nov 2025. New curry specials Feb 2026." },
      { name: "Totoya", type: 'restaurant', note: "1127 12th Ave. Negitoro kaisen bowls. Lines from day one in 2024. Now also in Ala Moana and expanding to Aiea." },
      { name: "Koa Pancake House", type: 'restaurant', note: "1139 12th Ave. Old-school breakfast. No frills, just solid pancakes, eggs, and local plates. Daily 6:30am\u20132pm." },
      { name: "Via Gelato", type: 'restaurant', note: "1142 12th Ave. Artisan gelato since 2013. Rotating tropical flavors \u2014 ube, li hing mui, haupia. Open until 10\u201311pm." }
    ]
  },
  {
    id: '11th-ave',
    name: '11th Avenue',
    subtitle: 'The Hidden Food Court',
    neighborhood: 'Kaimuki',
    neighborhoods: ['Kaimuki'],
    vibe: 'food',
    coords: [
      [21.2850, -157.7935],
      [21.2840, -157.7935],
      [21.2830, -157.7935],
      [21.2820, -157.7935],
      [21.2810, -157.7935]
    ],
    center: [21.2830, -157.7935],
    zoom: 17,
    summary: "Kaimuki\u2019s stealth dining block. While Waialae gets the foot traffic, 11th Ave quietly stacks heavy hitters in a single municipal lot complex. Kaimuki Shokudo is the best izakaya outside of Chinatown. Moke\u2019s is a brunch institution. O\u2018ahu Grill does authentic Hawaiian food that locals drive across town for. Rise Cafe is the newest add \u2014 keto-friendly brunch from a husband-wife team.",
    insiderTip: "The 1127 and 1135\u20131137 addresses are essentially one open-air complex with shared parking. You can brunch at Moke\u2019s, walk 30 feet to Rise Cafe for coffee, then come back for dinner at Kaimuki Shokudo \u2014 all without moving your car. Himalayan Kitchen upstairs at 1137 does legit Nepali momos and dal bhat.",
    bestTime: 'Weekday lunch avoids all lines',
    parking: "Municipal lot accessible from 11th or 12th Ave. Free but fills by noon on weekends. Street parking on residential side streets.",
    warnings: "Moke\u2019s weekend wait can be 30\u201360 min (no reservations for brunch, lunch reservations only 11am\u20132pm). Himalayan Kitchen had a health scare in Dec 2025 \u2014 reopened with green placard after corrections. Kaimuki Shokudo open until midnight (1am Fri\u2013Sat), great late-night option.",
    spots: [
      { name: "Kaimuki Shokudo", type: 'restaurant', note: "1127 11th Ave. Soba + izakaya. Tokyo-inspired, lively atmosphere. Lunch 11:30am\u20133:30pm, dinner until midnight (1am Fri\u2013Sat)." },
      { name: "Moke\u2019s Bread & Breakfast", type: 'restaurant', note: "1127 11th Ave, Ste 201. Lilikoi pancakes are legendary. 2025 SBA Family-Owned Business of the Year. Closed Mon." },
      { name: "O\u2018ahu Grill", type: 'restaurant', note: "1137 11th Ave, Ste 104. Chef Johnny\u2019s authentic Hawaiian \u2014 garlic shrimp, squid luau, lau lau. Daily 11am\u20139pm." },
      { name: "Himalayan Kitchen", type: 'restaurant', note: "1137 11th Ave, Ste 205. Nepali-Indian \u2014 momos, dal bhat, tikka masala. Open 7 days. Lunch and dinner." },
      { name: "Rise Cafe", type: 'restaurant', note: "1135 11th Ave. Keto-friendly brunch from Dr. Jodi + Jeff. Opened mid-2025 in former AV Restaurant space. Mon\u2013Sat, closed Tue." },
      { name: "Earl", type: 'restaurant', note: "Moved from 1137 11th Ave to Market City (2919 Kapiolani Blvd). Sandwiches. Worth the short drive." }
    ]
  },
  {
    id: 'harding-ave',
    name: 'Harding Avenue',
    subtitle: 'Kaimuki Back Street',
    neighborhood: 'Kaimuki',
    neighborhoods: ['Kaimuki'],
    vibe: 'mixed',
    coords: [
      [21.2810, -157.8040],
      [21.2810, -157.8000],
      [21.2810, -157.7960],
      [21.2810, -157.7920]
    ],
    center: [21.2810, -157.7980],
    zoom: 16,
    summary: "The quiet residential backbone of Kaimuki, one block south of Waialae. Harding doesn\u2019t have the restaurant density of Waialae but it has anchor spots locals know. Coffee Bean & Tea Leaf is the neighborhood\u2019s default WFH office. The stretch overlaps with the 11th\u201312th Ave food blocks at its eastern end. More of a \u2018live here\u2019 street than a \u2018visit\u2019 street.",
    insiderTip: "Coffee Bean on Harding (2939) has better parking and less crowd than any Waialae coffee spot. If you\u2019re apartment hunting in Kaimuki, Harding between 10th and 12th is the sweet spot \u2014 walkable to everything, quieter than Waialae, and street parking actually exists.",
    bestTime: 'Morning for coffee, otherwise pass-through',
    parking: "Easier than Waialae. Street parking usually available. Coffee Bean has its own small lot.",
    warnings: "Kaimuki Superette (formerly on Waialae near Harding) permanently closed Oct 2024. Its menu items moved to Mud Hen Water. Big City Diner Kaimuki (3565 Waialae) closed May 2024 after 26 years. Not much to do on Harding itself after dark.",
    spots: [
      { name: "Coffee Bean & Tea Leaf", type: 'cafe', note: "2939 Harding Ave. Kaimuki\u2019s default remote-work spot. Decent parking, reliable wifi, outdoor seating." },
      { name: "Lotus Cafe", type: 'cafe', note: "3565 Waialae Ave (corner near Harding). New in 2024. Green World Coffee Farm beans, house-baked focaccia, grilled cheese. Daily 7am\u20134pm." },
      { name: "The Curb Kaimuki", type: 'cafe', note: "3408 Waialae Ave (nearby). Multi-roaster specialty coffee. Reopened under new owners. Mon\u2013Fri 6:30am\u20132pm, weekends 7am\u20132pm." },
      { name: "Nana Ai Katsu", type: 'restaurant', note: "3585 Waialae Ave (nearby). Premium Kurobuta tonkatsu. Layered and crispy. Preorder recommended. Mon\u2013Fri lunch + dinner." }
    ]
  },
  {
    id: 'kilauea-ave',
    name: 'Kilauea Avenue',
    subtitle: 'Kahala Border Run',
    neighborhood: 'Kahala',
    neighborhoods: ['Kahala', 'Kaimuki'],
    vibe: 'food',
    coords: [
      [21.2850, -157.7920],
      [21.2840, -157.7905],
      [21.2825, -157.7895],
      [21.2810, -157.7885],
      [21.2795, -157.7875]
    ],
    center: [21.2822, -157.7897],
    zoom: 16,
    summary: "A short diagonal running from Waialae toward the coast, marking the border between Kaimuki and Kahala. Mostly residential, but the 4614 complex is a quiet culinary destination anchored by Kapa Hale \u2014 one of the best Hawaii Regional Cuisine restaurants on the island. McDonald\u2019s and Subway are here too, but you\u2019re coming for Chef Keaka Lee.",
    insiderTip: "Kapa Hale\u2019s happy hour pho specials started late 2025 and are a steal. Their noodle bar pop-ups happen twice a year around Thanksgiving and December \u2014 follow @4614kapahale on Instagram for announcements. The autumn tasting menu ($69 + $25 wine pairing) is one of Honolulu\u2019s best prix fixe values.",
    bestTime: 'Dinner Wed\u2013Sun, or weekend brunch at Kapa Hale',
    parking: "Small lot at 4614 complex. Residential street parking available but respect the neighborhood.",
    warnings: "Kapa Hale is closed Tuesdays. Reservations strongly recommended \u2014 small restaurant, fills fast. The rest of Kilauea Ave is residential with nothing else of note for visitors.",
    spots: [
      { name: "Kapa Hale", type: 'restaurant', note: "4614 Kilauea Ave, Ste 102. Modern Hawaii Regional Cuisine by Chef Keaka Lee. OpenTable Diners\u2019 Choice 2024\u20132025. Tasting menus + \u00e0 la carte." },
      { name: "Kozo Sushi \u2014 Kilauea", type: 'restaurant', note: "4618 Kilauea Ave. Conveyor belt sushi, hot dishes, and vegetarian options. Open daily." },
      { name: "Subway \u2014 Kilauea", type: 'restaurant', note: "4614 Kilauea Ave. Standard chain. Mentioned only for landmark reference." }
    ]
  },
  {
    id: 'ena-rd',
    name: 'Ena Road',
    subtitle: 'Izakaya Alley',
    neighborhood: 'Waikiki',
    neighborhoods: ['Waikiki'],
    vibe: 'food',
    coords: [
      [21.2842, -157.8356],
      [21.2835, -157.8345],
      [21.2822, -157.8330],
      [21.2808, -157.8315]
    ],
    center: [21.2825, -157.8335],
    zoom: 17,
    summary: "Waikiki's under-the-radar Japanese dining corridor, running from Ala Moana Blvd up to Kalakaua through a cluster of izakayas, ramen shops, and late-night hangouts. Grittier than Kalakaua — walk-up storefronts, neon signs, and the kind of places where the menu is better in Japanese.",
    insiderTip: "Start dinner at Chiba-Ken for sushi izakaya, then walk to Irish Rose Saloon — the real Waikiki dive bar since 1985 with live bands nightly and cheap drinks.",
    bestTime: 'Evenings 6pm-11pm, especially Thu-Sat',
    parking: "Street parking on Ena metered until 6pm. Prince Waikiki garage has validated parking for hotel diners.",
    warnings: "Chiba-Ken is dinner-only starting 5:30pm, closed Mondays. Waikiki Yokocho in the nearby Shopping Plaza is permanently closed.",
    spots: [
      { name: 'Chiba-Ken', type: 'restaurant', note: 'Sushi izakaya at 468 Ena Rd. Reopened Dec 2025. Dinner only from 5:30pm, closed Mon. Teishoku sets, legit sashimi.' },
      { name: 'Aloha Kitchen', type: 'restaurant', note: '432 Ena Rd. Hawaii regional breakfast/lunch — loco moco, acai bowls, kimchi fried rice. Tue-Sat 7:30am-1pm.' },
      { name: 'Irish Rose Saloon', type: 'bar', note: '478 Ena Rd. Waikiki dive bar since 1985. Live bands every night, cheap pints. Open noon-2am.' },
      { name: 'Camado Ramen Tavern', type: 'restaurant', note: 'Craft ramen and sake bar. Late-night option in the Ena Road corridor.' },
      { name: 'Prince Waikiki 100 Sails', type: 'restaurant', note: 'At the Ala Moana end of Ena. Contemporary Pacific cuisine, harbor views. Happy hour 5-6:30pm.' }
    ]
  },
  {
    id: 'seaside-ave',
    name: 'Seaside Avenue',
    subtitle: 'Waikiki Food Tower',
    neighborhood: 'Waikiki',
    neighborhoods: ['Waikiki'],
    vibe: 'mixed',
    coords: [
      [21.2780, -157.8270],
      [21.2786, -157.8263],
      [21.2793, -157.8255],
      [21.2800, -157.8248]
    ],
    center: [21.2790, -157.8260],
    zoom: 17,
    summary: "Seaside Avenue packs more dining per square foot than any other block in Waikiki, anchored by the Waikiki Shopping Plaza and Hyatt Centric. The street went through a massive dining reinvention in 2024-2025 with Stix Asia food hall, Botanico, and Nori Bar turning it into a vertical food district.",
    insiderTip: "Stix Asia in the Shopping Plaza basement has 17 Asian vendors for under $20. Buho rooftop for sunset margaritas. Botanico is the Zetton group's 12th Oahu restaurant.",
    bestTime: 'Dinner time 5pm-9pm for full selection; Stix Asia good for lunch',
    parking: "Validated parking at Hyatt Centric (349 Seaside). Waikiki Shopping Plaza garage accessible from Lauula Street.",
    warnings: "Waikiki Yokocho permanently closed — replaced by Stix Asia. Buho rooftop wait can be 45+ min on weekend evenings.",
    spots: [
      { name: 'Stix Asia Food Hall', type: 'restaurant', note: 'Shopping Plaza basement. 17 Asian vendors — ramen, sushi, bao, Thai. Replaced Waikiki Yokocho.' },
      { name: 'Botanico Waikiki', type: 'restaurant', note: 'Opened Nov 2025. Italian-Mediterranean by Zetton group. Ground floor Shopping Plaza. Daily 11:30am-11pm.' },
      { name: 'Buho Cocina y Cantina', type: 'bar', note: '5th floor rooftop, Shopping Plaza. Mexican-Hawaiian fusion, craft margaritas. Live DJ weekends.' },
      { name: 'Heavenly Island Lifestyle', type: 'restaurant', note: '342 Seaside. All-day Hawaiian cafe. Validated parking at Hyatt Centric across the street.' },
      { name: 'natuRe Waikiki', type: 'restaurant', note: '413 Seaside Ave, 2nd floor. Upscale sustainable French-New American by Chef Nae Ogawa. Dinner only.' },
      { name: 'Nori Bar Waikiki', type: 'restaurant', note: 'At Hyatt Centric. Sushi, kaisendon bowls, cocktails. Second location after Ward Village.' }
    ]
  },
  {
    id: 'royal-hawaiian-ave',
    name: 'Royal Hawaiian Avenue',
    subtitle: 'Late-Night Izakaya Row',
    neighborhood: 'Waikiki',
    neighborhoods: ['Waikiki'],
    vibe: 'nightlife',
    coords: [
      [21.2788, -157.8280],
      [21.2793, -157.8271],
      [21.2800, -157.8260],
      [21.2808, -157.8248],
      [21.2815, -157.8237]
    ],
    center: [21.2800, -157.8260],
    zoom: 17,
    summary: "Royal Hawaiian Avenue runs parallel to Kalakaua through Waikiki's hotel district and has quietly become the go-to strip for izakayas, tiki bars, and late-night eats. Waikiki Shokudo anchors the north end with 1am closing, Cuckoo Coconuts brings tiki vibes.",
    insiderTip: "Waikiki Shokudo at 355 Royal Hawaiian is the late-night move — open until 1am with izakaya small plates. Cuckoo Coconuts does free live music 7-10pm nightly.",
    bestTime: 'Evening and late night, 7pm-midnight',
    parking: "Royal Hawaiian Center garage — enter from Royal Hawaiian Ave at Don Ho Lane. Validated with purchase.",
    warnings: "Cuckoo Coconuts opens at 5pm only. Waikiki Food Hall vendors have varying schedules.",
    spots: [
      { name: 'Waikiki Shokudo', type: 'restaurant', note: '355 Royal Hawaiian Ave. Izakaya by the Shokudo family. Open 5pm-1am daily. Sashimi, small plates, sake.' },
      { name: 'Cuckoo Coconuts', type: 'bar', note: '333 Royal Hawaiian Ave. Tiki bar — drinks in coconuts, live music 7-10pm nightly. 5pm-11:30pm.' },
      { name: 'Waikiki Food Hall', type: 'restaurant', note: 'Royal Hawaiian Center Bldg C, 3rd level. Multiple vendors. Open 8am-11pm daily.' },
      { name: 'Noi Thai Cuisine', type: 'restaurant', note: 'Royal Hawaiian Center. Upscale Thai with ocean views. Spicy beef cucumber salad prepared tableside.' },
      { name: 'Kulu Kulu', type: 'cafe', note: 'Royal Hawaiian Center. Japanese bakery-cafe, cream puffs, matcha pastries.' },
      { name: "Penny's Waikiki Malasadas", type: 'bakery', note: 'Royal Hawaiian Center. Fresh malasadas — the Waikiki alternative to Leonard\'s.' }
    ]
  },
  {
    id: 'pensacola-st',
    name: 'Pensacola Street',
    subtitle: 'Old-School Local Eats',
    neighborhood: 'Makiki',
    neighborhoods: ['Makiki', 'Ala Moana'],
    vibe: 'food',
    coords: [
      [21.3060, -157.8430],
      [21.3030, -157.8420],
      [21.3000, -157.8408],
      [21.2965, -157.8395]
    ],
    center: [21.3010, -157.8412],
    zoom: 16,
    summary: "Pensacola Street cuts through residential Makiki between Beretania and Kapiolani with old-school local eateries most tourists never find. Chun Wah Kam has been here for decades, MW Restaurant brings James Beard-caliber dining.",
    insiderTip: "Chun Wah Kam at 537 Pensacola — fast dim sum, char siu noodles, manapua. Opens 8am, closes 4pm. MW Restaurant on Kapiolani at Pensacola — chef Wade Ueoka's fried chicken is legendary.",
    bestTime: 'Weekday lunch 11am-1pm for Chun Wah Kam; MW dinner Wed-Sat',
    parking: "Street parking on Pensacola is free but competitive during lunch. MW has its own small lot.",
    warnings: "Chun Wah Kam closes at 4pm. MW Restaurant is dinner only (5-9pm), closed Sundays. Mikiya is pricey ($70-100pp for all-you-can-eat wagyu).",
    spots: [
      { name: 'Chun Wah Kam', type: 'restaurant', note: '537 Pensacola St. Dim sum, char siu, noodles. Mon-Sun 8am-4pm. Cash-friendly, no-frills.' },
      { name: 'MW Restaurant', type: 'restaurant', note: '888 Kapiolani at Pensacola. Chefs Wade Ueoka & Michelle Karr-Ueoka. Hawaii Regional Cuisine. Dinner Mon-Sat 5-9pm.' },
      { name: 'Mikiya Wagyu Shabu House', type: 'restaurant', note: '1221 Kapiolani at Pensacola. All-you-can-eat A5 wagyu shabu-shabu. Expanding to Kapahulu in 2026.' },
      { name: 'Fujikami Florist', type: 'shop', note: "Hawaii's oldest florist, on Pensacola since 1987. Not food, but a neighborhood institution." }
    ]
  },
  {
    id: 'wilder-ave',
    name: 'Wilder Avenue',
    subtitle: 'Quiet Neighborhood Bites',
    neighborhood: 'Makiki',
    neighborhoods: ['Makiki', 'Punahou', 'McCully'],
    vibe: 'food',
    coords: [
      [21.3025, -157.8440],
      [21.3015, -157.8390],
      [21.3005, -157.8340],
      [21.2998, -157.8290]
    ],
    center: [21.3010, -157.8365],
    zoom: 16,
    summary: "A sleepy residential corridor connecting Makiki to McCully with the brand-new Makanai cafe and the Makiki Shopping Village anchoring the food scene. Sparse but rewarding for those who know.",
    insiderTip: "Makanai at 1249 Wilder opened Dec 2025 — yuzu egg sando and earl grey matcha latte. Makiki Shopping Village at 1231 has L&L, Sushi Man, and Peppa's all in one complex.",
    bestTime: 'Morning 7am-noon for Makanai; lunch for Makiki Shopping Village',
    parking: "Easy street parking — this is residential. Makiki Shopping Village has a small lot.",
    warnings: "Makiki Inn is permanently closed. Not a destination food street — come specifically for Makanai or the shopping village.",
    spots: [
      { name: 'Makanai', type: 'cafe', note: '1249 Wilder Ave. Opened Dec 2025. Coffee, matcha, sandos on Mille Fete bread. Daily 6:30am-4:30pm.' },
      { name: 'L&L Hawaiian Barbecue (Makiki)', type: 'restaurant', note: '1231 Wilder Ave in Makiki Shopping Village. Classic plate lunch. Mon-Fri 8am-9pm, Sat-Sun 7:30am-9pm.' },
      { name: 'Makiki Sushiman', type: 'restaurant', note: '1231 Wilder Ave in Makiki Shopping Village. Neighborhood sushi counter. Daily 10am-8pm.' },
      { name: "Peppa's (Makiki)", type: 'restaurant', note: 'Makiki Shopping Village. Quick Korean BBQ and local grinds.' }
    ]
  },
  {
    id: 'queen-st',
    name: 'Queen Street',
    subtitle: 'Brewery Row',
    neighborhood: "Kaka'ako",
    neighborhoods: ["Kaka'ako", 'Downtown'],
    vibe: 'food',
    coords: [
      [21.3040, -157.8630],
      [21.3020, -157.8590],
      [21.2990, -157.8545],
      [21.2965, -157.8505],
      [21.2945, -157.8465]
    ],
    center: [21.2990, -157.8545],
    zoom: 16,
    summary: "Queen Street runs from downtown through Kaka'ako, anchored by Aloha Beer Co. — winner of the 2025 Hale 'Aina Award for Best Brewpub. This is where Honolulu's craft brewery scene lives, with Hana Koa Brewing a block south.",
    insiderTip: "Aloha Beer's daily happy hour 2-6pm — $5 house pints, $7 pupu menu. They swapped locations with Waikiki Brewing in 2024 and now have a massive production facility at 831 Queen plus the taproom at 700.",
    bestTime: 'Happy hour 2-6pm weekdays; Saturday brunch at Aloha Beer',
    parking: "Aloha Beer has valet for $5 with validation. Street parking on Queen is metered but easy midday.",
    warnings: "Waikiki Brewing Kaka'ako (831 Queen) closed in 2024 — now Aloha Beer's production facility. Construction detours from condo towers.",
    spots: [
      { name: 'Aloha Beer Co.', type: 'bar', note: "700 Queen St. 13 rotating taps, beer garden, elevated pub food. 2025 Hale 'Aina Best Brewpub." },
      { name: 'Hana Koa Brewing', type: 'bar', note: "962 Kawaiaha'o St. Full production brewery with kitchen, two bars. Spacious indoor/outdoor." },
      { name: '53 By The Sea', type: 'restaurant', note: '53 Ahui St. Oceanfront fine dining since 2012. Sunset views, tasting menus. Reservations required.' },
      { name: 'Plate Lunch Cluster', type: 'restaurant', note: "Queen & Cooke intersection. Top's Deli, Queen's BBQ, Red Cafe. Cash preferred. Weekday lunch." },
      { name: "Doraku Sushi Kaka'ako", type: 'restaurant', note: "1009 Kapi'olani Blvd near Queen. Sushi, izakaya, craft cocktails." }
    ]
  },
  {
    id: 'merchant-st',
    name: 'Merchant Street',
    subtitle: "Honolulu's Oldest Street",
    neighborhood: 'Downtown',
    neighborhoods: ['Downtown', 'Chinatown'],
    vibe: 'mixed',
    coords: [
      [21.3088, -157.8632],
      [21.3098, -157.8618],
      [21.3110, -157.8602],
      [21.3122, -157.8588],
      [21.3135, -157.8572]
    ],
    center: [21.3110, -157.8602],
    zoom: 17,
    summary: "Honolulu's original commercial street and a National Register Historic District since 1973. Today anchored by Podmore — Chef Anthony Rush and Katherine Nomura's gastropub — and Murphy's Bar & Grill since 1987.",
    insiderTip: "Podmore is from the Senia team — chicken pot pie ($26) and scallops ($38) are the dinner moves. O-I-DE Kitchen at 212 Merchant is the sleeper lunch hit — Mon-Fri 11am-2:30pm only.",
    bestTime: 'Weekday lunch 11am-1:30pm; Thu-Sat evening for Podmore cocktails',
    parking: "Ali'i Place garage at 1099 Alakea. Street meters on Merchant are short — 30 min to 1 hr. Free on weekends at government lots.",
    warnings: "Brue Bar (119 Merchant) closed. Murphy's now closed Sat-Sun. Most of Merchant empties after 3pm except Podmore.",
    spots: [
      { name: 'Podmore', type: 'restaurant', note: '202 Merchant St. By Senia\'s Anthony Rush & Katherine Nomura. Gastropub, cocktails, weekend brunch.' },
      { name: "Murphy's Bar & Grill", type: 'restaurant', note: '2 Merchant St. Irish pub since 1987. Burgers, fish & chips, cold Guinness. Mon-Fri 11am-9pm.' },
      { name: 'O-I-DE Kitchen', type: 'restaurant', note: '212 Merchant St. Bento, donburi from former Okonomiyaki Chibo owners. Mon-Fri 11am-2:30pm.' },
      { name: 'Kamehameha V Post Office', type: 'landmark', note: 'Corner of Merchant & Bethel. Built 1871 — first reinforced concrete building in Hawai\'i.' },
      { name: 'Melchers Building', type: 'landmark', note: '51 Merchant St. Built 1854 — oldest commercial building in the district.' }
    ]
  },
  {
    id: 'alakea-st',
    name: 'Alakea Street',
    subtitle: 'Downtown Lunch Lane',
    neighborhood: 'Downtown',
    neighborhoods: ['Downtown'],
    vibe: 'food',
    coords: [
      [21.3050, -157.8618],
      [21.3070, -157.8613],
      [21.3090, -157.8607],
      [21.3110, -157.8600]
    ],
    center: [21.3080, -157.8610],
    zoom: 17,
    summary: "A weekday lunch corridor in the heart of the government and business district. Onigiri Onibe — a Fukuoka chain with 35 onigiri varieties — opened in summer 2025 and immediately drew lines.",
    insiderTip: "Onigiri Onibe at 921 Alakea — 35 varieties of made-to-order onigiri with premium Japanese rice. Get there before noon or popular fillings sell out. Alakea Steak does Korean-style garlic steak plates for $10-12.",
    bestTime: 'Weekday lunch 11am-1pm. Dead on weekends.',
    parking: "Ali'i Place garage at 1099 Alakea. Street meters 1-2 hr max.",
    warnings: "Ma'ona Musubi and Honolulu Seafood Restaurant both closed. Strictly weekday — everything shutters by 3pm.",
    spots: [
      { name: 'Onigiri Onibe', type: 'restaurant', note: '921 Alakea St. Fukuoka chain, 35 onigiri varieties. Mon-Fri 7am-2pm, Sat 10am-2pm.' },
      { name: 'Alakea Steak', type: 'restaurant', note: '201 S King St at Alakea. Korean-style steak plates. Mon-Fri 6am-3pm, Sat 8am-1pm. Cash preferred.' },
      { name: 'Capitol Modern', type: 'cultural', note: '250 S Hotel St. Free state art museum. Wed-Sat 10am-4pm. First Friday events.' },
      { name: 'Cafe Julia', type: 'restaurant', note: '1040 Richards St nearby. YWCA Lani\u0101kea building (1927). Courtyard lunch Mon-Fri.' }
    ]
  },
  {
    id: 'keahole-hawaii-kai',
    name: 'Keahole Street',
    subtitle: 'Suburban Surf & Turf',
    neighborhood: 'Hawaii Kai',
    neighborhoods: ['Hawaii Kai', 'East Honolulu'],
    vibe: 'food',
    coords: [
      [21.2893, -157.7080],
      [21.2898, -157.7048],
      [21.2905, -157.7010],
      [21.2920, -157.6990],
      [21.2935, -157.6965]
    ],
    center: [21.2905, -157.7010],
    zoom: 16,
    summary: "Hawaii Kai's commercial spine runs through Hawaii Kai Towne Center and Koko Marina — packed with restaurants from chain-reliable to genuinely excellent. Where East Side families eat after beach days at Sandy Beach or Hanauma Bay.",
    insiderTip: "Moena Cafe closes at 2:30pm and the wait gets brutal by 9am weekends — go at 7am sharp. Kona Brewing's waterfront lanai at Koko Marina has live music Wednesdays.",
    bestTime: 'Weekday mornings for brunch; Friday evenings for Koko Marina waterfront',
    parking: "Both shopping centers have large free lots. Koko Marina fills on weekend evenings.",
    warnings: "Weekend brunch waits at Moena exceed 45 min. Kalanianaole Hwy traffic backs up badly heading back toward town after 4pm.",
    spots: [
      { name: 'Moena Cafe', type: 'restaurant', note: 'Koko Marina. Brunch destination — acai bowls, crab cake eggs benedict. Opens 7am, closes 2:30pm.' },
      { name: 'Kona Brewing Co.', type: 'restaurant', note: 'Koko Marina waterfront brewpub. Longboard Lager, solid pizzas. Live music Wednesdays.' },
      { name: "Teddy's Bigger Burgers", type: 'restaurant', note: '377 Keahole. Hand-formed burgers and thick shakes. Since 1998.' },
      { name: "Fatboy's Hawaii Kai", type: 'restaurant', note: 'Plate lunches and poke bowls. Generous portions at fair prices.' },
      { name: 'Assaggio Hawaii Kai', type: 'restaurant', note: 'Koko Marina. Southern Italian since 1995. Lobster ravioli is the signature.' },
      { name: 'Island Brew Coffeehouse', type: 'cafe', note: '377 Keahole. Local roasts, sandwiches. Open 6am-6pm. Good remote work spot.' },
      { name: 'Koko i-naba', type: 'restaurant', note: 'Koko Marina. Authentic Japanese, ingredients sourced from Japan.' }
    ]
  },
  {
    id: 'kam-hwy',
    name: 'Kamehameha Highway',
    subtitle: 'The Plate Lunch Highway',
    neighborhood: 'Kalihi',
    neighborhoods: ['Kalihi', 'Moanalua', 'Aiea', 'Pearl City'],
    vibe: 'food',
    coords: [
      [21.3265, -157.8675],
      [21.3380, -157.8790],
      [21.3560, -157.8970],
      [21.3720, -157.9260],
      [21.3910, -157.9580]
    ],
    center: [21.3600, -157.9100],
    zoom: 13,
    summary: "The original highway connecting Honolulu to the Leeward side is a plate lunch pilgrimage route. From Upscale Hawaii's 24/7 steak-and-lobster plates in Kalihi to Shiro's 65-variety saimin menu in Aiea — no pretension, just flavor density.",
    insiderTip: "Shiro's Saimin Haven in Waimalu makes fresh noodles daily — never frozen. Get the wonton saimin with extra char siu. Upscale Hawaii is 24/7 and does a $20 steak-and-lobster plate.",
    bestTime: 'Lunch rush 11am-1pm; Upscale Hawaii is 24/7 for late-night',
    parking: "Each spot has its own lot. Shiro's shares Waimalu Shopping Center lot. Street parking on Kam Hwy is a bad idea during rush hour.",
    warnings: "Kam Highway traffic brutal 7-9am and 3-6pm. Rail construction has narrowed lanes through Aiea. Some spots cash-only.",
    spots: [
      { name: 'Upscale Hawaii', type: 'restaurant', note: '1333 N King St, Kalihi. 24/7 plate lunch with NY steak, lobster tail. $20 steak-lobster combo. Started as a food truck 2013.' },
      { name: "Shiro's Saimin Haven", type: 'restaurant', note: '98-020 Kam Hwy, Aiea. 65 saimin varieties, fresh noodles daily. Since 1969. 7am-9pm.' },
      { name: "Zippy's Pearl City", type: 'restaurant', note: '806 Kam Hwy. The mothership. Chili, oxtail soup, Napoleon\'s Bakery pastries. Since 1966.' },
      { name: 'The Alley at Aiea Bowl', type: 'restaurant', note: '99-115 Aiea Heights Dr. Award-winning plate lunches inside a bowling alley. Lemon crunch cake is legendary.' },
      { name: "Nico's Pier 38", type: 'restaurant', note: '1129 N Nimitz Hwy. Pierside seafood + fish market with poke bar. Mon-Sat 6:30am-9pm.' }
    ]
  },
  {
    id: 'salt-lake-blvd',
    name: 'Salt Lake Boulevard',
    subtitle: 'Hidden Asian Enclaves',
    neighborhood: 'Salt Lake',
    neighborhoods: ['Salt Lake', 'Moanalua', 'Aliamanu'],
    vibe: 'food',
    coords: [
      [21.3350, -157.8920],
      [21.3375, -157.8870],
      [21.3410, -157.8810],
      [21.3450, -157.8760]
    ],
    center: [21.3390, -157.8850],
    zoom: 15,
    summary: "Salt Lake's strip malls hold some of the most authentic Asian food on the island. Salt Lake Shopping Center and the plazas along the boulevard are anchored by multi-generational family restaurants that cater to locals, not tourists.",
    insiderTip: "Soon's Kal-Bi in Salt Lake Shopping Center has been smoking kalbi since 1984 — short ribs marinated overnight. Royal Palace Chinese has been family-run since 1963.",
    bestTime: 'Weekday lunch 11am-1pm when the local office crowd comes through',
    parking: "Salt Lake Shopping Center has a large lot shared with Safeway. Plaza lots along the boulevard are small.",
    warnings: "Heavy commuter traffic during rush hours. Some spots close early (8-9pm). Not a nightlife area.",
    spots: [
      { name: "Soon's Kal-Bi Drive-In", type: 'restaurant', note: '898 Ala Lilikoi St, Salt Lake Shopping Center. Korean BBQ short ribs marinated overnight. Since 1984.' },
      { name: 'Royal Palace Chinese', type: 'restaurant', note: '4510 Salt Lake Blvd. Family-owned since 1963. Cantonese-style. Daily 10am-8pm.' },
      { name: 'Sun Sun Ramen & Curry', type: 'restaurant', note: '848 Ala Lilikoi St. Japanese comfort food — ramen and katsu curry.' },
      { name: 'Islander Drive Inn', type: 'restaurant', note: 'Salt Lake Shopping Center. Local-style plate lunches. Quick, cheap, satisfying.' },
      { name: 'Pad Thai Restaurant', type: 'restaurant', note: 'Salt Lake Shopping Center. Thai staples in a no-frills strip mall setting.' }
    ]
  },
  {
    id: 'n-school-gulick',
    name: 'N. School Street',
    subtitle: 'Filipino Food Belt',
    neighborhood: 'Kalihi',
    neighborhoods: ['Kalihi', 'Kalihi Valley'],
    vibe: 'food',
    coords: [
      [21.3280, -157.8630],
      [21.3310, -157.8610],
      [21.3350, -157.8580],
      [21.3390, -157.8550],
      [21.3420, -157.8530]
    ],
    center: [21.3350, -157.8580],
    zoom: 15,
    summary: "Upper N. School Street through Kalihi is the heart of Honolulu's Filipino community — grocery stores with whole lechon in the window, bakeries with ensaymada, and takeout counters serving pinakbet and sinigang. Helena's Hawaiian Food anchors the strip as a James Beard Award winner.",
    insiderTip: "Ilocos Best at 2225 N School St is the real deal for Ilocano-style Filipino food — empanada, bagnet, pinakbet. Gulick Delicatessen arrives before 10am or the best items sell out.",
    bestTime: 'Early morning for Gulick Deli (opens 5am weekdays); lunch for Filipino spots',
    parking: "Street parking along N School St available but competitive during lunch. Gulick Deli has a tiny lot.",
    warnings: "Many spots cash-only. Gulick Deli closes at 3pm. Helena's closed weekends and Monday. Respect the community.",
    spots: [
      { name: "Helena's Hawaiian Food", type: 'restaurant', note: '1240 N School St. James Beard Award 2000. Pipikaula short ribs, laulau. Tue-Fri 10am-7:30pm. Since 1946.' },
      { name: 'Ilocos Best', type: 'restaurant', note: '2225 N School St. Ilocano Filipino — empanada, bagnet, pinakbet. The real deal.' },
      { name: 'Gulick Delicatessen', type: 'restaurant', note: '1512 Gulick Ave. Okazuya-style Japanese takeout. Mon-Fri from 5am, Sat from 6:30am. Closed Sun.' },
      { name: 'Nisshodo Candy Store', type: 'shop', note: '1095 Dillingham Blvd nearby. Handmade mochi, manju, chichi dango. Mon-Sat 7am-2pm.' },
      { name: 'Liliha Bakery (Nimitz)', type: 'bakery', note: '580 N Nimitz Hwy nearby. Same legendary coco puffs, bigger space, more parking.' }
    ]
  },
  {
    id: 'kuakini-st',
    name: 'Kuakini Street',
    subtitle: 'Bakery & Saimin Row',
    neighborhood: 'Liliha',
    neighborhoods: ['Liliha', "Nu'uanu"],
    vibe: 'food',
    coords: [
      [21.3195, -157.8560],
      [21.3175, -157.8535],
      [21.3150, -157.8505],
      [21.3130, -157.8480]
    ],
    center: [21.3165, -157.8520],
    zoom: 16,
    summary: "A quiet residential street above downtown anchored by Liliha Bakery — one of Honolulu's most beloved institutions since 1950. The stretch between Liliha St and N King has hidden spots where neighborhood regulars eat.",
    insiderTip: "Liliha Bakery's original at 515 N Kuakini closes the coffee shop at 3pm. Get there early — the coco puffs sell nearly 10,000 per day. The diner side does excellent oxtail soup tourists skip for pastries.",
    bestTime: 'Early morning 6-8am — beat the coco puff crowd and get a diner counter seat',
    parking: "Liliha Bakery has a small lot that fills quickly. Street parking on Kuakini and surrounding residential streets.",
    warnings: "20-30 min waits on weekends at Liliha Bakery original. Palace Saimin is Tue-Sat only. This is a residential neighborhood.",
    spots: [
      { name: 'Liliha Bakery (Original)', type: 'bakery', note: '515 N Kuakini St. Since 1950. Coco puffs with chantilly frosting, oxtail soup, loco moco. Coffee shop 6am-3pm.' },
      { name: 'Palace Saimin', type: 'restaurant', note: '1256 N King St nearby. Since 1946. Saimin, udon, wontons, beef sticks. Tue-Sat.' },
      { name: 'Liliha Bakery (Nimitz)', type: 'bakery', note: '580 N Nimitz Hwy. Larger second location. Same coco puffs, more parking, less wait.' }
    ]
  }
];

export function getStreetsForNeighborhood(name) {
  const lower = name.toLowerCase();
  return STREET_CORRIDORS.filter(s =>
    s.neighborhoods.some(n => n.toLowerCase() === lower)
  );
}
