"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = L.divIcon({
  className: "",
  html: `<div style="
    width:32px;height:32px;border-radius:50% 50% 50% 0;
    background:#c58b46;border:3px solid #fff;
    transform:rotate(-45deg);margin-left:-8px;margin-top:-28px;
    box-shadow:0 2px 8px rgba(0,0,0,0.5);
  "></div>`,
  iconSize: [32, 32],
  iconAnchor: [8, 32],
});

function ClickHandler({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({ click(e) { onPick(e.latlng.lat, e.latlng.lng); } });
  return null;
}

function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 16, { duration: 1.2 });
  }, [map, lat, lng]);
  return null;
}

function InitCenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  const done = useRef(false);
  useEffect(() => {
    if (!done.current) { map.setView([lat, lng], 15); done.current = true; }
  }, [map, lat, lng]);
  return null;
}

type Props = {
  lat: number | null;
  lng: number | null;
  onPick: (lat: number, lng: number) => void;
};

const SLO_CENTER: [number, number] = [46.15, 14.99];

export default function LocationPicker({ lat, lng, onPick }: Props) {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [flyTarget, setFlyTarget] = useState<{ lat: number; lng: number } | null>(null);
  const [searchError, setSearchError] = useState("");

  const center: [number, number] = lat && lng ? [lat, lng] : SLO_CENTER;
  const zoom = lat && lng ? 15 : 8;

  async function handleSearch() {
    const q = query.trim();
    if (!q) return;
    setSearching(true);
    setSearchError("");
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1&countrycodes=si`,
        { headers: { "Accept-Language": "sl" } }
      );
      const data = await res.json();
      if (data.length > 0) {
        const { lat: la, lon: ln } = data[0];
        setFlyTarget({ lat: parseFloat(la), lng: parseFloat(ln) });
      } else {
        setSearchError("Lokacija ni najdena. Poskusi z bolj natančnim imenom.");
      }
    } catch {
      setSearchError("Napaka pri iskanju. Poskusi znova.");
    }
    setSearching(false);
  }

  return (
    <div className="overflow-hidden rounded-[20px] border border-white/10">

      {/* Search bar */}
      <div className="flex gap-2 border-b border-white/10 bg-[#07110b] p-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Išči lokacijo: npr. Rudijev dom, Pohorje..."
          className="flex-1 rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-[#c58b46]/50"
        />
        <button
          onClick={handleSearch}
          disabled={searching}
          className="rounded-xl bg-[#c58b46] px-4 py-2.5 text-sm font-black text-black transition hover:opacity-90 disabled:opacity-50"
        >
          {searching ? "..." : "Išči"}
        </button>
      </div>

      {searchError && (
        <div className="border-b border-red-500/20 bg-red-500/10 px-4 py-2 text-xs text-red-300">{searchError}</div>
      )}

      {/* Map */}
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: 380, width: "100%" }}
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          maxZoom={19}
        />
        <ClickHandler onPick={onPick} />
        {lat && lng && !flyTarget && <InitCenter lat={lat} lng={lng} />}
        {flyTarget && <FlyTo lat={flyTarget.lat} lng={flyTarget.lng} />}
        {lat && lng && <Marker position={[lat, lng]} icon={markerIcon} />}
      </MapContainer>

      {/* Coordinates bar */}
      <div className="border-t border-white/10 bg-[#07110b] px-5 py-3">
        {lat && lng ? (
          <div className="flex items-center gap-3">
            <span className="text-[#c58b46]">📍</span>
            <span className="font-mono text-sm text-zinc-300">{lat.toFixed(5)}, {lng.toFixed(5)}</span>
            <span className="ml-auto text-xs text-zinc-500">Klikni na karti za premik markerja</span>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-sm text-zinc-500">
            <span>👆</span>
            <span>Išči lokacijo zgoraj ali klikni na karti za postavitev markerja</span>
          </div>
        )}
      </div>
    </div>
  );
}
