"use client";

import "leaflet/dist/leaflet.css";

import { useState } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";

type Poi = {
  name: string;
  latitude: number;
  longitude: number;
  distance: string;
  types: string[];
  charging?: boolean;
};

type TrailMapProps = {
  latitude: number;
  longitude: number;
  title: string;
  pois?: Poi[];
};

export default function TrailMap({
  latitude,
  longitude,
  title,
  pois = [],
}: TrailMapProps) {
  const [selectedPoi, setSelectedPoi] = useState<Poi | null>(null);

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10">
      <MapContainer
        center={[latitude, longitude]}
        zoom={12}
        scrollWheelZoom={true}
        className="h-[520px] w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <CircleMarker
          center={[latitude, longitude]}
          radius={9}
          pathOptions={{
            color: "#c58b46",
            fillColor: "#c58b46",
            fillOpacity: 0.9,
          }}
        >
          <Popup>
            <strong>{title}</strong>
            <br />
            Začetek ture
          </Popup>
        </CircleMarker>

        {pois.map((poi) => (
          <CircleMarker
            key={poi.name}
            center={[poi.latitude, poi.longitude]}
            radius={9}
            eventHandlers={{
              click: () => setSelectedPoi(poi),
            }}
            pathOptions={{
              color: "#22c55e",
              fillColor: "#22c55e",
              fillOpacity: 0.9,
            }}
          />
        ))}
      </MapContainer>

      {selectedPoi && (
        <div
          className="fixed inset-0 z-[9999] flex items-end bg-black/55 p-4 backdrop-blur-sm md:items-center md:justify-center"
          onClick={() => setSelectedPoi(null)}
        >
          <div
            className="w-full max-w-lg rounded-[32px] border border-white/10 bg-[#07110b] p-6 shadow-2xl md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-5">
              <div>
                <div className="mb-3 text-xs uppercase tracking-[0.25em] text-[#c58b46]">
                  Ponudnik ob turi
                </div>

                <h3 className="text-3xl font-black text-white">
                  {selectedPoi.name}
                </h3>
              </div>

              <button
                onClick={() => setSelectedPoi(null)}
                className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-white"
              >
                ×
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedPoi.types.map((type) => (
                <span
                  key={type}
                  className="rounded-full border border-[#c58b46]/30 bg-[#c58b46]/10 px-4 py-2 text-sm text-[#f4d7ad]"
                >
                  {type}
                </span>
              ))}

              {selectedPoi.charging && (
                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
                  🔋 e-bike polnilnica
                </span>
              )}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                Oddaljenost od trase
              </div>

              <div className="mt-2 text-xl font-bold text-white">
                {selectedPoi.distance}
              </div>
            </div>

            <p className="mt-6 leading-8 text-zinc-300">
              Ta ponudnik je dodan kot postanek ob izbrani turi. Kasneje bo tukaj
              še opis ponudbe, fotografije, odpiralni čas, kontakt in povezava na
              celoten profil ponudnika.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black">
                Odpri ponudnika
              </button>

              <button
                onClick={() => setSelectedPoi(null)}
                className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300"
              >
                Zapri
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
