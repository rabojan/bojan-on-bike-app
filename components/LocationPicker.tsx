"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
    map.flyTo([lat, lng], 17, { duration: 1.2 });
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

type NominatimResult = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
};

type Props = {
  lat: number | null;
  lng: number | null;
  onPick: (lat: number, lng: number) => void;
};

const SLO_CENTER: [number, number] = [46.15, 14.99];

export default function LocationPicker({ lat, lng, onPick }: Props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [flyTarget, setFlyTarget] = useState<{ lat: number; lng: number } | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const center: [number, number] = lat && lng ? [lat, lng] : SLO_CENTER;
  const zoom = lat && lng ? 15 : 8;

  // Zapri dropdown ob kliku zunaj
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.length < 2) { setSuggestions([]); setShowDropdown(false); return; }
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=6&countrycodes=si`,
        { headers: { "Accept-Language": "sl" } }
      );
      const data: NominatimResult[] = await res.json();
      setSuggestions(data);
      setShowDropdown(data.length > 0);
    } catch {
      setSuggestions([]);
    }
    setLoading(false);
  }, []);

  function handleInput(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 320);
  }

  function handleSelect(result: NominatimResult) {
    const la = parseFloat(result.lat);
    const ln = parseFloat(result.lon);
    setQuery(result.display_name.split(",")[0]); // samo prvo ime, ne cel naslov
    setSuggestions([]);
    setShowDropdown(false);
    setFlyTarget({ lat: la, lng: ln });
    onPick(la, ln); // marker se postavi samodejno
  }

  // Skrajšaj dolg Nominatim display_name za prikaz v dropdownu
  function formatSuggestion(name: string): { main: string; sub: string } {
    const parts = name.split(",").map((s) => s.trim());
    return {
      main: parts[0],
      sub: parts.slice(1, 3).join(", "),
    };
  }

  return (
    <div className="overflow-hidden rounded-[20px] border border-white/10">

      {/* Search bar z autocomplete */}
      <div ref={wrapperRef} className="relative border-b border-white/10 bg-[#07110b] p-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => handleInput(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
              placeholder="Išči: Dom na Boču, Vinska klet Jeruzalem..."
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-[#c58b46]/50"
            />
            {loading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">...</div>
            )}
          </div>
        </div>

        {/* Dropdown z predlogi */}
        {showDropdown && suggestions.length > 0 && (
          <div className="absolute left-3 right-3 top-full z-50 mt-1 overflow-hidden rounded-xl border border-white/10 bg-[#0b1a10] shadow-2xl">
            {suggestions.map((s) => {
              const { main, sub } = formatSuggestion(s.display_name);
              return (
                <button
                  key={s.place_id}
                  onMouseDown={() => handleSelect(s)}
                  className="flex w-full items-start gap-3 border-b border-white/5 px-4 py-3 text-left transition last:border-0 hover:bg-[#c58b46]/10"
                >
                  <span className="mt-0.5 shrink-0 text-[#c58b46]">📍</span>
                  <div>
                    <div className="text-sm font-bold text-white">{main}</div>
                    {sub && <div className="mt-0.5 text-xs text-zinc-500">{sub}</div>}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

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
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; CARTO'
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
            <span className="ml-auto text-xs text-zinc-500">Klikni na karti za natančnejšo postavitev</span>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-sm text-zinc-500">
            <span>👆</span>
            <span>Začni tipkati ime lokacije ali klikni direktno na karti</span>
          </div>
        )}
      </div>
    </div>
  );
}
