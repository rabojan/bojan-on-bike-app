"use client";

import dynamic from "next/dynamic";

const MiniMapDynamic = dynamic(() => import("./MiniMap"), { ssr: false });

export default function MiniMapWrapper({ lat, lng, label }: { lat: number; lng: number; label?: string }) {
  return <MiniMapDynamic lat={lat} lng={lng} label={label} />;
}
