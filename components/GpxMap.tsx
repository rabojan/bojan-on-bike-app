"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Polyline, CircleMarker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { GpxPoint } from "@/lib/parseGpx";

function FitBounds({ points }: { points: GpxPoint[] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    const lats = points.map((p) => p.lat);
    const lngs = points.map((p) => p.lng);
    map.fitBounds([
      [Math.min(...lats), Math.min(...lngs)],
      [Math.max(...lats), Math.max(...lngs)],
    ], { padding: [24, 24] });
  }, [map, points]);
  return null;
}

type Props = {
  points: GpxPoint[];
  height?: number;
};

export default function GpxMap({ points, height = 360 }: Props) {
  if (points.length === 0) return null;

  const start = points[0];
  const end = points[points.length - 1];
  const polyline = points.map((p): [number, number] => [p.lat, p.lng]);
  const center: [number, number] = [start.lat, start.lng];

  return (
    <>
      <style>{`.map-base-bright img { filter: brightness(2.8) contrast(1.05) saturate(0.6); }`}</style>
      <MapContainer
        center={center}
        zoom={12}
        style={{ height, width: "100%", borderRadius: "inherit", background: "#07110b" }}
        zoomControl={true}
        scrollWheelZoom={false}
      >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
        className="map-base-bright"
      />
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={19}
      />
      <FitBounds points={points} />
      <Polyline
        positions={polyline}
        pathOptions={{ color: "#c58b46", weight: 3, opacity: 0.9 }}
      />
      {/* start */}
      <CircleMarker
        center={[start.lat, start.lng]}
        radius={7}
        pathOptions={{ color: "#07110b", fillColor: "#22c55e", fillOpacity: 1, weight: 2 }}
      />
      {/* end */}
      <CircleMarker
        center={[end.lat, end.lng]}
        radius={7}
        pathOptions={{ color: "#07110b", fillColor: "#c58b46", fillOpacity: 1, weight: 2 }}
      />
    </MapContainer>
    </>
  );
}
