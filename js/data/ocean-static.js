// ── Ocean Static Data ──
// Lifeguard beaches, dangerous shorebreak, seasonal patterns

export const LIFEGUARD_BEACHES = [
  { name: "Ala Moana Beach Park", area: "Honolulu", lat: 21.2886, lng: -157.8453, hours: "9am-5:30pm daily", notes: "Year-round. Magic Island side is calmer." },
  { name: "Waikiki Beach", area: "Waikiki", lat: 21.2766, lng: -157.8278, hours: "9am-5:30pm daily", notes: "Multiple towers along the beach. Very attentive." },
  { name: "Kailua Beach Park", area: "Kailua", lat: 21.3976, lng: -157.7271, hours: "9am-5:30pm daily", notes: "Year-round. Popular and well-guarded." },
  { name: "Waimanalo Beach Park", area: "Waimanalo", lat: 21.3319, lng: -157.6942, hours: "9am-5:30pm daily", notes: "Strong currents possible. Watch for Portuguese man-o-war." },
  { name: "Sandy Beach", area: "Hawaii Kai", lat: 21.2857, lng: -157.6727, hours: "9am-5:30pm daily", notes: "Most rescues on Oahu. Dangerous shorebreak. Listen to guards." },
  { name: "Hanauma Bay", area: "Hawaii Kai", lat: 21.2690, lng: -157.6938, hours: "6:45am-4pm (closed Mondays/Tuesdays)", notes: "Shallow reef. Lifeguards on duty when park is open." },
  { name: "Makapu'u Beach", area: "Makapu'u", lat: 21.3161, lng: -157.6645, hours: "9am-5:30pm daily", notes: "Dangerous shorebreak. Bodyboard only — no swim fins." },
  { name: "Bellows Beach", area: "Waimanalo", lat: 21.3566, lng: -157.7096, hours: "Weekends & holidays only", notes: "On military base. Calm most of the year." },
  { name: "North Shore (Sunset Beach)", area: "North Shore", lat: 21.6740, lng: -158.0395, hours: "9am-5:30pm daily (winter season)", notes: "Winter = extreme. Summer = calm. Conditions change fast." },
  { name: "North Shore (Pipeline/Ehukai)", area: "North Shore", lat: 21.6651, lng: -158.0538, hours: "9am-5:30pm daily (winter season)", notes: "The most dangerous wave on Oahu. Do NOT enter water in winter." },
  { name: "Waimea Bay", area: "North Shore", lat: 21.6423, lng: -158.0656, hours: "9am-5:30pm daily", notes: "Summer = calm swimming hole. Winter = 30ft+ waves. Respect the conditions." },
  { name: "Haleiwa Beach Park", area: "Haleiwa", lat: 21.5963, lng: -158.1056, hours: "9am-5:30pm daily", notes: "Inside the harbor — calmer than open North Shore beaches." },
  { name: "Pokai Bay", area: "Waianae", lat: 21.4384, lng: -158.1905, hours: "9am-5:30pm daily", notes: "Protected bay — calmest swimming on the Leeward Coast." },
  { name: "Ko Olina Lagoons", area: "Ko Olina", lat: 21.3366, lng: -158.1224, hours: "No official lifeguards — resort staff monitor", notes: "Man-made lagoons. Very calm, family-friendly. Free public access." },
];

export const DANGEROUS_SHOREBREAK = [
  { name: "Sandy Beach", lat: 21.2857, lng: -157.6727, severity: "extreme", months: [0,1,2,3,4,5,6,7,8,9,10,11], desc: "Year-round dangerous shorebreak. #1 cause of spinal injuries on Oahu. Pros only." },
  { name: "Makapu'u Beach", lat: 21.3161, lng: -157.6645, severity: "extreme", months: [0,1,2,3,9,10,11], desc: "Strong east swells create pounding shore break. Bodyboard only when waves are up." },
  { name: "Pipeline (Banzai)", lat: 21.6651, lng: -158.0538, severity: "extreme", months: [10,11,0,1,2], desc: "Winter only. The most dangerous wave in the world. Shallow reef, 10-20ft+ barrels. Do NOT paddle out." },
  { name: "Waimea Bay", lat: 21.6423, lng: -158.0656, severity: "high", months: [10,11,0,1,2], desc: "Winter: massive waves, powerful rip currents. Summer: calm. Check conditions before entering." },
  { name: "Sunset Beach", lat: 21.6740, lng: -158.0395, severity: "high", months: [10,11,0,1,2], desc: "Winter: strong currents, big waves, shifting sandbars. Very deceptive — looks calmer than it is." },
  { name: "Yokohama Bay (Keawaula)", lat: 21.5536, lng: -158.2497, severity: "high", months: [10,11,0,1,2,3], desc: "Remote beach with powerful winter surf and strong currents. No lifeguard. Know your limits." },
  { name: "Ka'ena Point (north side)", lat: 21.5719, lng: -158.2714, severity: "extreme", months: [0,1,2,3,4,5,6,7,8,9,10,11], desc: "Never swim here. Extremely dangerous year-round. Strong currents, no rescue possible." },
];

export const RIP_CURRENT_HOTSPOTS = [
  { name: "Sandy Beach east end", lat: 21.2851, lng: -157.6710, tips: "Rips form on the east end near the rocks. Enter from the center." },
  { name: "North Shore (Sunset area)", lat: 21.6740, lng: -158.0395, tips: "Rips form along the entire North Shore in winter. Watch for channels of darker, calmer water." },
  { name: "Waimanalo (north end)", lat: 21.3420, lng: -157.6950, tips: "Rip currents near stream mouth at north end. Swim closer to the lifeguard tower." },
  { name: "Makaha Beach", lat: 21.4733, lng: -158.2178, tips: "Strong rip on the north side of the bay, especially in winter." },
  { name: "Haleiwa Beach", lat: 21.5963, lng: -158.1056, tips: "Rip at the mouth of the Anahulu Stream. Stay inside the harbor breakwall." },
];

export const TYPICAL_SURF_CONDITIONS = {
  north: {
    winter: { min: 6, max: 30, unit: "ft (faces)", desc: "November-February. Big wave season. 15-30+ ft faces at Pipe, Sunset, Waimea." },
    summer: { min: 1, max: 3, unit: "ft", desc: "May-September. Flat to small. Safe swimming on most North Shore beaches." },
  },
  south: {
    winter: { min: 1, max: 3, unit: "ft", desc: "November-February. Small to flat. Good swimming conditions." },
    summer: { min: 2, max: 8, unit: "ft", desc: "May-September. South swells bring fun surf to Waikiki, Ala Moana Bowls, Diamond Head." },
  },
  east: {
    winter: { min: 2, max: 5, unit: "ft", desc: "Tradewind swell. Consistent small waves." },
    summer: { min: 1, max: 4, unit: "ft", desc: "Tradewinds moderate. Calmer east-facing beaches." },
  },
  west: {
    winter: { min: 3, max: 15, unit: "ft", desc: "Northwest wrapping swells hit Makaha and the Leeward Coast." },
    summer: { min: 1, max: 3, unit: "ft", desc: "Calm summer conditions. Great for swimming and snorkeling." },
  },
};
