"use client";

import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

type TrailMapProps = {
  latitude: number;
  longitude: number;
  title: string;
};

export default function TrailMap({
  latitude,
  longitude,
  title,
}: TrailMapProps) {
  return (
    <div className="overflow-hidden rounded-[32px] border border-white/10">
      <MapContainer
        center={[latitude, longitude]}
        zoom={11}
        scrollWheelZoom={true}
        className="h-[520px] w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[latitude, longitude]}>
          <Popup>
            <strong>{title}</strong>
            <br />
            Začetek ture
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}