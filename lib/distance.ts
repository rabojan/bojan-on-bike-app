// Haversine formula — razdalja med dvema GPS točkama v metrih
export function haversineMeters(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
): number {
  const R = 6371000; // radij Zemlje v metrih
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Minimalna razdalja od točke do GPX polilonije (v metrih)
export function minDistanceToPolyline(
  lat: number,
  lng: number,
  points: { lat: number; lng: number }[],
): number {
  let min = Infinity;
  for (const p of points) {
    const d = haversineMeters(lat, lng, p.lat, p.lng);
    if (d < min) min = d;
  }
  return min;
}

// Berljiv prikaz razdalje
export function formatDistance(meters: number): string {
  if (meters < 100) return "ob trasi";
  if (meters < 1000) return `${Math.round(meters / 50) * 50} m od trase`;
  return `${(meters / 1000).toFixed(1)} km od trase`;
}
