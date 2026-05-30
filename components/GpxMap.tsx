"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup, useMap } from "react-leaflet";
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

export type MapPonudnik = {
  id: string;
  ime: string;
  tip: string | null;
  lat: number;
  lng: number;
};

type Props = {
  points: GpxPoint[];
  height?: number;
  ponudniki?: MapPonudnik[];
};

export default function GpxMap({ points, height = 360, ponudniki = [] }: Props) {
  if (points.length === 0) return null;

  const start = points[0];
  const end = points[points.length - 1];
  const polyline = points.map((p): [number, number] => [p.lat, p.lng]);
  const center: [number, number] = [start.lat, start.lng];

  return (
    <>
      <style>{`
        .map-base-bright img { filter: brightness(2.8) contrast(1.05) saturate(0.6); }
        .ponudnik-popup .leaflet-popup-content-wrapper {
          background: #0b1a10;
          border: 1px solid rgba(197,139,70,0.4);
          border-radius: 14px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6);
          padding: 0;
        }
        .ponudnik-popup .leaflet-popup-content {
          margin: 0;
          min-width: 160px;
        }
        .ponudnik-popup .leaflet-popup-tip-container { display: none; }
        .ponudnik-popup .leaflet-popup-close-button {
          color: #71717a;
          font-size: 18px;
          top: 8px;
          right: 10px;
        }
        .ponudnik-popup .leaflet-popup-close-button:hover { color: #f4d7ad; }
      `}</style>
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
      {/* ponudniki ob trasi */}
      {ponudniki.map((p) => (
        <CircleMarker
          key={p.id}
          center={[p.lat, p.lng]}
          radius={9}
          pathOptions={{ color: "#07110b", fillColor: "#ffffff", fillOpacity: 0.92, weight: 2.5 }}
        >
          <Popup className="ponudnik-popup" closeButton={true} minWidth={160}>
            <div style={{ padding: "14px 16px 4px" }}>
              {p.tip && (
                <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.28em", textTransform: "uppercase", color: "#c58b46", marginBottom: 5 }}>
                  {p.tip}
                </div>
              )}
              <div style={{ fontSize: 15, fontWeight: 800, color: "#f4d7ad", lineHeight: 1.2, marginBottom: 12 }}>
                {p.ime}
              </div>
              <a
                href={`/ponudniki/${p.id}`}
                style={{ display: "block", textAlign: "center", background: "#c58b46", color: "#000", borderRadius: 100, padding: "8px 14px", fontSize: 11, fontWeight: 900, textDecoration: "none", marginBottom: 12 }}
              >
                Ogled ponudnika →
              </a>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
    </>
  );
}
