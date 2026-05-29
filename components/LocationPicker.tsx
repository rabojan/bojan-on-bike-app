"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default marker icon
const markerIcon = L.divIcon({
  className: "",
  html: `<div style="
    width:32px;height:32px;border-radius:50% 50% 50% 0;
    background:#c58b46;border:3px solid #fff;
    transform:rotate(-45deg);margin-left:-8px;margin-top:-28px;
    box-shadow:0 2px 8px rgba(0,0,0,0.4);
  "></div>`,
  iconSize: [32, 32],
  iconAnchor: [8, 32],
});

function ClickHandler({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  const didCenter = useRef(false);
  useEffect(() => {
    if (!didCenter.current) {
      map.setView([lat, lng], 14);
      didCenter.current = true;
    }
  }, [map, lat, lng]);
  return null;
}

type Props = {
  lat: number | null;
  lng: number | null;
  onPick: (lat: number, lng: number) => void;
};

// Center of Slovenia
const SLO_CENTER: [number, number] = [46.15, 14.99];

export default function LocationPicker({ lat, lng, onPick }: Props) {
  const center: [number, number] = lat && lng ? [lat, lng] : SLO_CENTER;
  const zoom = lat && lng ? 14 : 8;

  return (
    <div className="overflow-hidden rounded-[20px] border border-white/10">
      <style>{`.location-base img { filter: brightness(2.8) contrast(1.05) saturate(0.6); }`}</style>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: 340, width: "100%", background: "#07110b" }}
        scrollWheelZoom={false}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap &copy; CARTO'
          subdomains="abcd"
          maxZoom={19}
          className="location-base"
        />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />
        <ClickHandler onPick={onPick} />
        {lat && lng && (
          <>
            <RecenterMap lat={lat} lng={lng} />
            <Marker position={[lat, lng]} icon={markerIcon} />
          </>
        )}
      </MapContainer>
      <div className="border-t border-white/10 bg-[#07110b] px-5 py-3">
        {lat && lng ? (
          <div className="flex items-center gap-3">
            <span className="text-[#c58b46]">📍</span>
            <span className="font-mono text-sm text-zinc-300">
              {lat.toFixed(5)}, {lng.toFixed(5)}
            </span>
            <span className="ml-auto text-xs text-zinc-500">Klikni na karti za premik markerja</span>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-sm text-zinc-500">
            <span>👆</span>
            <span>Klikni na karti za označitev lokacije ponudnika</span>
          </div>
        )}
      </div>
    </div>
  );
}
