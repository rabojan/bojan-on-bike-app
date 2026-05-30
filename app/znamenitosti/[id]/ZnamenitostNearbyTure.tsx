"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { minDistanceToPolyline, formatDistance } from "@/lib/distance";
import { parseGpx } from "@/lib/parseGpx";

type NearbyTura = {
  id: string;
  ime: string;
  tipi: string[] | null;
  tezavnost: string | null;
  km: number | null;
  distance: number;
};

export default function ZnamenitostNearbyTure({ lat, lng }: { lat: number; lng: number }) {
  const [ture, setTure] = useState<NearbyTura[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("predlogi_tur")
        .select("id, ime, tipi, tezavnost, km, gpx_url")
        .eq("status", "approved")
        .not("gpx_url", "is", null);

      if (!data || data.length === 0) { setLoading(false); return; }

      const nearby: NearbyTura[] = [];
      for (const tura of data) {
        if (!tura.gpx_url) continue;
        try {
          const res = await fetch(tura.gpx_url);
          if (!res.ok) continue;
          const text = await res.text();
          const parsed = parseGpx(text);
          if (parsed.points.length === 0) continue;
          const dist = minDistanceToPolyline(lat, lng, parsed.points);
          if (dist <= 2000) {
            nearby.push({ id: tura.id, ime: tura.ime, tipi: tura.tipi, tezavnost: tura.tezavnost, km: tura.km, distance: dist });
          }
        } catch { /* preskoči */ }
      }

      nearby.sort((a, b) => a.distance - b.distance);
      setTure(nearby);
      setLoading(false);
    }
    load();
  }, [lat, lng]);

  if (loading) {
    return (
      <section>
        <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Ture ob znamenitosti</div>
        <div className="mt-6 text-sm text-zinc-600 animate-pulse">Iščem bližnje ture...</div>
      </section>
    );
  }

  if (ture.length === 0) return null;

  return (
    <section>
      <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Ture ob znamenitosti</div>
      <h2 className="mt-4 font-serif text-4xl font-black italic leading-tight md:text-5xl">
        Katerim turam je ob poti.
      </h2>

      <div className="mt-8 space-y-4">
        {ture.map((tura) => (
          <Link key={tura.id} href={`/ture/${tura.id}`}
            className="group flex items-center justify-between gap-5 rounded-[22px] border border-white/10 bg-[#0b1a10] p-5 transition hover:border-[#c58b46]/45">
            <div>
              <div className="font-serif text-2xl font-black italic text-white group-hover:text-[#f4d7ad]">
                {tura.ime}
              </div>
              <div className="mt-2 flex flex-wrap gap-3 text-[10px] font-black uppercase tracking-[0.22em] text-[#c58b46]">
                {(tura.tipi ?? []).length > 0 && <span>{(tura.tipi ?? []).join(" · ")}</span>}
                {tura.tezavnost && <span className="text-zinc-500">· {tura.tezavnost}</span>}
                {tura.km && <span className="text-zinc-500">· {tura.km} km</span>}
              </div>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-sm font-bold text-[#c58b46]">{formatDistance(tura.distance)}</div>
              <div className="text-xs text-zinc-600">od trase</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
