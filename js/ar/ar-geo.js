// Pure math utilities for AR geolocation — no DOM, no side effects

const EARTH_RADIUS_MI = 3958.8;
const DEG = Math.PI / 180;

/**
 * Haversine distance between two coordinates in miles.
 */
export function haversineDistance(lat1, lng1, lat2, lng2) {
  const dLat = (lat2 - lat1) * DEG;
  const dLng = (lng2 - lng1) * DEG;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * DEG) * Math.cos(lat2 * DEG) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_MI * Math.asin(Math.sqrt(a));
}

/**
 * Initial bearing from point 1 to point 2 in degrees (0–360, 0=north, 90=east).
 */
export function bearing(lat1, lng1, lat2, lng2) {
  const φ1 = lat1 * DEG;
  const φ2 = lat2 * DEG;
  const Δλ = (lng2 - lng1) * DEG;
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return ((Math.atan2(y, x) / DEG) + 360) % 360;
}

/**
 * Signed angular difference b − a, normalized to [−180, +180].
 * Positive means b is clockwise from a.
 */
export function angleDiff(a, b) {
  let d = ((b - a) % 360 + 540) % 360 - 180;
  return d;
}

/**
 * Enrich an array of POIs with distance and bearing from the user,
 * sort by distance, and return the result (does not mutate originals).
 */
export function enrichAndSort(userLat, userLng, pois) {
  return pois
    .map(p => ({
      ...p,
      distance: haversineDistance(userLat, userLng, p.lat, p.lng),
      bearing: bearing(userLat, userLng, p.lat, p.lng),
    }))
    .sort((a, b) => a.distance - b.distance);
}
