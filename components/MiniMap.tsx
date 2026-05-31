"use client";

import { useEffect, useRef } from "react";

export default function MiniMap({ lat, lng, label }: { lat: number; lng: number; label?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    import("leaflet").then((L) => {
      import("leaflet/dist/leaflet.css");

      const map = L.map(containerRef.current!, {
        center: [lat, lng],
        zoom: 14,
        zoomControl: true,
        scrollWheelZoom: false,
        dragging: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);

      const icon = L.divIcon({
        html: `<div style="width:28px;height:28px;background:#c58b46;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.4)"></div>`,
        className: "",
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([lat, lng], { icon }).addTo(map);
      if (label) marker.bindPopup(label);

      mapRef.current = map;
    });

    return () => {
      if (mapRef.current) {
        (mapRef.current as { remove: () => void }).remove();
        mapRef.current = null;
      }
    };
  }, [lat, lng, label]);

  return <div ref={containerRef} className="h-full w-full" />;
}
