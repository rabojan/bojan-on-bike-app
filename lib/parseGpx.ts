export type GpxPoint = { lat: number; lng: number; ele: number };
export type GpxProfilePoint = { dist: number; ele: number }; // dist in km

export type ParsedGpx = {
  km: number;
  vm: number;
  minEle: number;
  maxEle: number;
  points: GpxPoint[];          // downsampled track (for map polyline)
  profile: GpxProfilePoint[];  // elevation profile (for chart)
};

function haversineM(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function downsample<T>(arr: T[], max: number): T[] {
  if (arr.length <= max) return arr;
  const step = arr.length / max;
  return Array.from({ length: max }, (_, i) => arr[Math.floor(i * step)]);
}

export function parseGpx(xml: string): ParsedGpx {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  const nodes = Array.from(doc.querySelectorAll("trkpt"));

  if (nodes.length === 0) {
    return { km: 0, vm: 0, minEle: 0, maxEle: 0, points: [], profile: [] };
  }

  const raw: GpxPoint[] = nodes.map((pt) => ({
    lat: parseFloat(pt.getAttribute("lat") ?? "0"),
    lng: parseFloat(pt.getAttribute("lon") ?? "0"),
    ele: parseFloat(pt.querySelector("ele")?.textContent ?? "0"),
  }));

  // cumulative distance in meters
  const cumDist: number[] = [0];
  let totalDist = 0;
  let totalGain = 0;
  let minEle = raw[0].ele;
  let maxEle = raw[0].ele;

  for (let i = 1; i < raw.length; i++) {
    const d = haversineM(raw[i - 1].lat, raw[i - 1].lng, raw[i].lat, raw[i].lng);
    totalDist += d;
    cumDist.push(totalDist);

    if (raw[i].ele > raw[i - 1].ele) totalGain += raw[i].ele - raw[i - 1].ele;
    if (raw[i].ele < minEle) minEle = raw[i].ele;
    if (raw[i].ele > maxEle) maxEle = raw[i].ele;
  }

  const km = Math.round(totalDist / 100) / 10;
  const vm = Math.round(totalGain);

  // build elevation profile — sample every sampleInterval meters, max 400 points
  const sampleInterval = Math.max(50, totalDist / 400);
  const profile: GpxProfilePoint[] = [];
  let nextSample = 0;

  for (let i = 0; i < raw.length; i++) {
    if (cumDist[i] >= nextSample || i === raw.length - 1) {
      profile.push({
        dist: Math.round(cumDist[i] / 10) / 100,
        ele: Math.round(raw[i].ele),
      });
      nextSample += sampleInterval;
    }
  }

  // downsample track points for the map (max 800)
  const points = downsample(raw, 800);

  return {
    km,
    vm,
    minEle: Math.round(minEle),
    maxEle: Math.round(maxEle),
    points,
    profile,
  };
}
