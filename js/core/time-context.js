// ── Time & Season Awareness ──
// Shared context for features that depend on current time/date/season

const OAHU_LAT = 21.46;
const OAHU_LNG = -157.97;

export function getTimeContext() {
  const now = new Date();
  const month = now.getMonth(); // 0-11
  const hour = now.getHours();
  const dayOfWeek = now.getDay(); // 0=Sun

  return {
    now,
    hour,
    dayOfWeek,
    month,
    dayOfMonth: now.getDate(),
    season: getSeason(month),
    isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
    swellSeason: getSwellSeason(month),
    whaleSeason: month >= 10 || month <= 3, // Nov-Apr
    sunrise: computeSunrise(now, OAHU_LAT, OAHU_LNG),
    sunset: computeSunset(now, OAHU_LAT, OAHU_LNG),
  };
}

function getSeason(month) {
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 10) return 'fall';
  return 'winter';
}

function getSwellSeason(month) {
  if (month >= 10 || month <= 2) return 'north'; // Nov-Mar: North Shore big waves
  if (month >= 4 && month <= 8) return 'south';  // May-Sep: South Shore swells
  return 'transitional';
}

// Simplified sunrise/sunset for Oahu (accurate to ~5 minutes)
function computeSunrise(date, lat, lng) {
  return computeSunTime(date, lat, lng, true);
}

function computeSunset(date, lat, lng) {
  return computeSunTime(date, lat, lng, false);
}

function computeSunTime(date, lat, lng, isSunrise) {
  const dayOfYear = getDayOfYear(date);
  const zenith = 90.833;

  // Convert longitude to hour value
  const lngHour = lng / 15;

  // Approximate time
  const t = isSunrise
    ? dayOfYear + ((6 - lngHour) / 24)
    : dayOfYear + ((18 - lngHour) / 24);

  // Sun's mean anomaly
  const M = (0.9856 * t) - 3.289;

  // Sun's true longitude
  let L = M + (1.916 * Math.sin(deg2rad(M))) + (0.020 * Math.sin(2 * deg2rad(M))) + 282.634;
  L = normalizeAngle(L);

  // Sun's right ascension
  let RA = rad2deg(Math.atan(0.91764 * Math.tan(deg2rad(L))));
  RA = normalizeAngle(RA);

  const lQuad = Math.floor(L / 90) * 90;
  const raQuad = Math.floor(RA / 90) * 90;
  RA += (lQuad - raQuad);
  RA /= 15;

  // Sun's declination
  const sinDec = 0.39782 * Math.sin(deg2rad(L));
  const cosDec = Math.cos(Math.asin(sinDec));

  // Sun's local hour angle
  const cosH = (Math.cos(deg2rad(zenith)) - (sinDec * Math.sin(deg2rad(lat)))) / (cosDec * Math.cos(deg2rad(lat)));

  if (cosH > 1 || cosH < -1) return null; // No sunrise/sunset

  let H;
  if (isSunrise) {
    H = 360 - rad2deg(Math.acos(cosH));
  } else {
    H = rad2deg(Math.acos(cosH));
  }
  H /= 15;

  // Local mean time of rising/setting
  const T = H + RA - (0.06571 * t) - 6.622;

  // Adjust to UTC, then to Hawaii (UTC-10)
  let UT = T - lngHour;
  UT = ((UT % 24) + 24) % 24;

  const hawaiiTime = ((UT - 10) % 24 + 24) % 24;
  const hours = Math.floor(hawaiiTime);
  const minutes = Math.round((hawaiiTime - hours) * 60);

  return { hours, minutes, formatted: formatTime(hours, minutes) };
}

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  return Math.floor(diff / 86400000);
}

function deg2rad(deg) { return deg * Math.PI / 180; }
function rad2deg(rad) { return rad * 180 / Math.PI; }
function normalizeAngle(a) { return ((a % 360) + 360) % 360; }

function formatTime(h, m) {
  const period = h >= 12 ? 'pm' : 'am';
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${m.toString().padStart(2, '0')}${period}`;
}

// Moon phase calculation for jellyfish predictions
export function getMoonPhase(date) {
  // Simplified moon phase calculation
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let c = 0, e = 0;
  if (month <= 2) {
    c = year - 1;
    e = month + 12;
  } else {
    c = year;
    e = month;
  }

  const jd = Math.floor(365.25 * (c + 4716)) + Math.floor(30.6001 * (e + 1)) + day - 1524.5;
  const daysSinceNew = jd - 2451549.5;
  const newMoons = daysSinceNew / 29.53058770576;
  const phase = ((newMoons % 1) + 1) % 1; // 0=new, 0.5=full

  return {
    phase, // 0-1 cycle
    daysSinceFullMoon: ((phase - 0.5 + 1) % 1) * 29.53,
    isFullMoon: Math.abs(phase - 0.5) < 0.03,
    isNewMoon: phase < 0.03 || phase > 0.97,
  };
}

export function getJellyfishRisk(date) {
  const moon = getMoonPhase(date || new Date());
  // Box jellyfish arrive on south-facing beaches 9-10 days after full moon
  const daysAfterFull = moon.daysSinceFullMoon;
  const risk = (daysAfterFull >= 8 && daysAfterFull <= 11) ? 'high' : 'low';
  const daysUntilWarning = daysAfterFull < 8 ? 8 - daysAfterFull : (29.53 - daysAfterFull) + 8;
  return { risk, daysAfterFull, daysUntilWarning: Math.round(daysUntilWarning) };
}
