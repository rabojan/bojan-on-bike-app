"use client";

import "leaflet/dist/leaflet.css";

import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";

type Poi = {
  name: string;
  latitude: number;
  longitude: number;
  distance: string;
  types: string[];
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
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10">
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
            radius={8}
            pathOptions={{
              color: "#22c55e",
              fillColor: "#22c55e",
              fillOpacity: 0.85,
            }}
          >
            <Popup>
              <strong>{poi.name}</strong>
              <br />
              {poi.types.join(" • ")}
              <br />
              {poi.distance}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
