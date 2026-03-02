// ── Cultural Calendar Data ──
// Farmers markets, cultural events, fruit seasons, swell/whale info

export const FARMERS_MARKETS = [
  { name: "KCC Saturday Farmers Market", day: 6, hours: "7:30am-11am", lat: 21.2729, lng: -157.8015, area: "Diamond Head", tips: "The biggest and best — arrive early for fresh poi and local honey. Parking fills by 8am." },
  { name: "Kailua Town Farmers Market", day: 4, hours: "5pm-7:30pm", lat: 21.3928, lng: -157.7404, area: "Kailua", tips: "Thursday evening market with live music. Great for dinner ingredients and prepared food." },
  { name: "Kaka'ako Farmers Market", day: 6, hours: "8am-12pm", lat: 21.2960, lng: -157.8580, area: "Kakaako", tips: "Ward Village location. Smaller than KCC but more relaxed, great coffee vendors." },
  { name: "Pearlridge Farmers Market", day: 6, hours: "8am-12pm", lat: 21.3910, lng: -157.9846, area: "Aiea", tips: "West-side market with good prices. Local produce cheaper than KCC." },
  { name: "Mililani Farmers Market", day: 0, hours: "8am-11am", lat: 21.4497, lng: -158.0149, area: "Mililani", tips: "Sunday market popular with Central Oahu families." },
  { name: "Hale'iwa Farmers Market", day: 4, hours: "2pm-6pm", lat: 21.5791, lng: -158.1040, area: "Haleiwa", tips: "Thursday afternoon. Best tropical fruit selection on the North Shore." },
  { name: "Waialua Farmers Co-op Market", day: 6, hours: "8:30am-12pm", lat: 21.5764, lng: -158.1283, area: "Waialua", tips: "Small but authentic. Waialua Estate coffee and chocolate grown right here." },
  { name: "Manoa Marketplace Farmers Market", day: 0, hours: "7am-11am", lat: 21.3028, lng: -157.8095, area: "Manoa", tips: "Sunday morning. Good for tropical flowers and organic produce." },
  { name: "Windward Mall Farmers Market", day: 3, hours: "2:30pm-7:30pm", lat: 21.4049, lng: -157.7975, area: "Kaneohe", tips: "Wednesday afternoon. Fresh fish direct from local boats." },
  { name: "Kapiolani Community College Market", day: 2, hours: "4pm-7pm", lat: 21.2729, lng: -157.8015, area: "Diamond Head", tips: "Tuesday evening edition — same location as Saturday KCC but smaller, less crowded." },
  { name: "Hawaii Kai Towne Center Market", day: 1, hours: "5pm-8pm", lat: 21.2892, lng: -157.7046, area: "Hawaii Kai", tips: "Monday evening. Good prepared foods for grab-and-go dinner." },
  { name: "Waimanalo Homestead Market", day: 0, hours: "9am-2pm", lat: 21.3463, lng: -157.7143, area: "Waimanalo", tips: "Sunday in the heart of Hawaiian homestead land. Most affordable produce on Oahu." },
];

export const CULTURAL_EVENTS = [
  { name: "Chinese New Year", month: 1, area: "Chinatown", desc: "Lion dances, firecrackers, and food stalls throughout Chinatown. Late Jan or Feb depending on lunar calendar.", recurring: true },
  { name: "Punahou Carnival", month: 1, area: "Manoa", desc: "Hawaii's biggest school carnival — rides, games, malasadas. Early February. A true local tradition since 1932.", recurring: true },
  { name: "Great Aloha Run", month: 1, area: "Metro Honolulu", desc: "8.15-mile fun run from Aloha Tower to Aloha Stadium. Presidents' Day weekend. 20,000+ runners.", recurring: true },
  { name: "Honolulu Festival", month: 2, area: "Waikiki", desc: "Pacific cultural exchange — performances, craft fairs, fireworks off Waikiki. Early March.", recurring: true },
  { name: "Spam Jam", month: 3, area: "Waikiki", desc: "Kalakaua Ave block party celebrating Hawaii's love of Spam. Late April. Free tastings and music.", recurring: true },
  { name: "Lei Day", month: 4, area: "Waikiki", desc: "May 1st. Lei-making contests at Kapiolani Park, live Hawaiian music. 'May Day is Lei Day in Hawaii.'", recurring: true },
  { name: "King Kamehameha Day", month: 5, area: "Metro Honolulu", desc: "June 11th. Floral parade from downtown to Kapiolani Park. King Kamehameha statue draped in lei.", recurring: true },
  { name: "Lantern Floating Hawaii", month: 4, area: "Ala Moana", desc: "Memorial Day. 50,000+ floating lanterns at Ala Moana Beach at sunset. Profoundly moving. Arrive by 4pm.", recurring: true },
  { name: "Makahiki Festival", month: 9, area: "Waimea Valley", desc: "Ancient Hawaiian harvest festival — traditional games, hula, chanting. October at Waimea Valley.", recurring: true },
  { name: "Triple Crown of Surfing", month: 10, area: "North Shore", desc: "Nov-Dec. The world's most prestigious surf competition. Held when waves reach 20+ ft at Pipeline, Sunset, Haleiwa.", recurring: true },
  { name: "Vans Pipe Masters", month: 11, area: "North Shore", desc: "The final jewel of the Triple Crown. Banzai Pipeline in December. Free to watch from the beach.", recurring: true },
  { name: "Honolulu Marathon", month: 11, area: "Metro Honolulu", desc: "Second Sunday of December. One of the world's largest marathons. No cutoff time — walkers welcome.", recurring: true },
  { name: "Honolulu City Lights", month: 11, area: "Downtown", desc: "December. Giant Christmas displays at Honolulu Hale (City Hall). Shaka Santa is iconic. Free.", recurring: true },
  { name: "First Friday Chinatown", month: -1, area: "Chinatown", desc: "Monthly art walk every first Friday. Galleries, street food, live music. 5-9pm. Free. The best free cultural event.", recurring: true },
  { name: "Eddie Aikau Big Wave Invitational", month: 11, area: "Waimea Bay", desc: "Only held when waves reach 30+ ft. Can go years between events. The most prestigious big wave event in surfing.", recurring: true },
  { name: "Prince Lot Hula Festival", month: 6, area: "Moanalua Gardens", desc: "July. The largest non-competitive hula event in Hawaii. Free at Moanalua Gardens.", recurring: true },
  { name: "Aloha Festivals", month: 8, area: "Waikiki", desc: "September. Floral parade, block party on Kalakaua Ave. Celebrates Hawaiian culture with music and dance.", recurring: true },
  { name: "Pearl Harbor Day", month: 11, area: "Pearl Harbor", desc: "December 7th. Remembrance ceremony at USS Arizona Memorial. Very solemn and moving. Free.", recurring: true },
  { name: "Obon Season", month: 5, area: "Various", desc: "June-August. Buddhist Bon dances at temples island-wide. Free, open to all. Wear a yukata if you have one.", recurring: true },
  { name: "Koloa Plantation Days", month: 6, area: "Various", desc: "July. Celebrates Hawaii's plantation heritage with food, music, rodeo events.", recurring: true },
];

export const FRUIT_SEASONS = [
  { name: "Mango", months: [4, 5, 6, 7], peak: [5, 6], tips: "Peak June-July. Hayden and Rapoza varieties. Check trees in Manoa, Kailua — many residents give away excess." },
  { name: "Lychee", months: [4, 5, 6], peak: [5], tips: "Brief season May-June. Kaimuki and Manoa yards have the best trees. Sweet, fragrant, addictive." },
  { name: "Lilikoi (Passion Fruit)", months: [5, 6, 7, 8, 9, 10], peak: [6, 7, 8], tips: "Purple and yellow varieties. Grows wild on fences. The juice is incredible in cocktails and over shave ice." },
  { name: "Starfruit", months: [7, 8, 9, 10, 11], peak: [8, 9], tips: "Peak Aug-Sep. Eat when fully yellow with brown-tinged edges for maximum sweetness." },
  { name: "Rambutan", months: [7, 8, 9, 10], peak: [8, 9], tips: "Hairy red fruit, sweet translucent flesh inside. Available at North Shore fruit stands." },
  { name: "Dragon Fruit", months: [5, 6, 7, 8, 9, 10], peak: [7, 8], tips: "Peak summer. Red-fleshed variety is sweeter than white. Waialua and North Shore farms grow them." },
  { name: "Breadfruit (Ulu)", months: [5, 6, 7, 8, 9], peak: [6, 7], tips: "Traditional Hawaiian staple. Roasted, fried, or mashed. Look for it at farmers markets June-July." },
  { name: "Avocado", months: [7, 8, 9, 10, 11], peak: [8, 9, 10], tips: "Local varieties are HUGE compared to Hass. Sharwil variety is the best — creamy and rich." },
  { name: "Papaya", months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], peak: [5, 6, 7, 8], tips: "Year-round but peak summer. Sunrise papayas from Kapoho. Squeeze lime on it — the local way." },
  { name: "Pineapple", months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], peak: [3, 4, 5, 6], tips: "Year-round but peak spring-summer. Dole Plantation is tourist-priced — buy from roadside stands." },
  { name: "Guava", months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], peak: [7, 8, 9], tips: "Grows wild everywhere. Strawberry guava is invasive but delicious. Common in Manoa, Tantalus trails." },
  { name: "Coconut", months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], peak: [], tips: "Year-round. Young green coconuts for water, mature brown ones for meat. Never stand under coconut palms in wind." },
  { name: "Mountain Apple (Ohia Ai)", months: [5, 6, 7], peak: [6], tips: "Crisp, juicy, rose-flavored. Found on valley hikes in Manoa, Palolo, Aiea. Eat them fresh off the tree." },
  { name: "Soursop", months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], peak: [3, 4, 5], tips: "Spiky green fruit, creamy white flesh. Makes incredible smoothies and ice cream. Seasonal at farmers markets." },
];

export const SWELL_SEASONS = {
  north: { months: [10, 11, 0, 1, 2], label: "North Shore Season", desc: "November-March. Big wave season on the North Shore. Pipeline, Waimea, Sunset Beach come alive. 15-30+ ft faces." },
  south: { months: [4, 5, 6, 7, 8], label: "South Shore Season", desc: "May-September. Summer swells hit south-facing shores. Waikiki, Ala Moana Bowls, Diamond Head. 2-8 ft." },
  east: { months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], label: "Tradewind Swell", desc: "Year-round easterly tradewind chop. Affects Windward beaches. Small but consistent." },
};

export const WHALE_SEASON = {
  months: [10, 11, 0, 1, 2, 3],
  peak: [0, 1, 2],
  label: "Humpback Whale Season",
  desc: "November-April, peak January-March. Humpback whales migrate from Alaska. Best viewing: Makapu'u Lookout, North Shore.",
  tips: "Look for spouts and breaches from any elevated viewpoint on the south or west coast. Binoculars help. Whale watch boats leave from Ko Olina and Waianae."
};
