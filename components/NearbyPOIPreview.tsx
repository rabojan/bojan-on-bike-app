"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { minDistanceToPolyline, formatDistance } from "@/lib/distance";

type GpxPoint = { lat: number; lng: number };

type NearbyPonudnik = {
  id: string;
  ime: string;
  tip: string | null;
  lokacija: string | null;
  hero_image: string | null;
  distanceM: number;
};

type NearbyZnamenitost = {
  id: string;
  ime: string;
  tip: string | null;
  kratek_opis: string | null;
  hero_image: string | null;
  distanceM: number;
};

const MAX_DIST = 2000; // 2 km

export default function NearbyPOIPreview({ points }: { points: GpxPoint[] }) {
  const [ponudniki, setPonudniki] = useState<NearbyPonudnik[]>([]);
  const [znamenitosti, setZnamenitosti] = useState<NearbyZnamenitost[]>([]);
  const [loading, setLoading] = useState(true);

  // Stringify points za stabilno primerjavo v useEffect
  const pointsKey = points.length;

  useEffect(() => {
    if (points.length === 0) return;

    async function load() {
      setLoading(true);

      const [{ data: vsiPonudniki }, { data: vseZnamenitosti }] = await Promise.all([
        supabase
          .from("predlogi_ponudnikov")
          .select("id, ime, tip, lokacija, hero_image, lat, lng")
          .eq("status", "approved")
          .not("lat", "is", null)
          .not("lng", "is", null),
        supabase
          .from("predlogi_znamenitosti")
          .select("id, ime, tip, kratek_opis, hero_image, lat, lng")
          .eq("status", "approved")
          .not("lat", "is", null)
          .not("lng", "is", null),
      ]);

      if (vsiPonudniki) {
        const nearby = (vsiPonudniki as (NearbyPonudnik & { lat: number; lng: number })[])
          .map((p) => ({ ...p, distanceM: minDistanceToPolyline(p.lat, p.lng, points) }))
          .filter((p) => p.distanceM <= MAX_DIST)
          .sort((a, b) => a.distanceM - b.distanceM);
        setPonudniki(nearby);
      }

      if (vseZnamenitosti) {
        const nearby = (vseZnamenitosti as (NearbyZnamenitost & { lat: number; lng: number })[])
          .map((z) => ({ ...z, distanceM: minDistanceToPolyline(z.lat, z.lng, points) }))
          .filter((z) => z.distanceM <= MAX_DIST)
          .sort((a, b) => a.distanceM - b.distanceM);
        setZnamenitosti(nearby);
      }

      setLoading(false);
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointsKey]);

  if (loading) {
    return (
      <div className="rounded-[32px] border border-white/10 bg-black/20 p-7">
        <div className="mb-1 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
          Ponudniki in znamenitosti ob trasi
        </div>
        <p className="mt-4 text-sm text-zinc-500">Iščem v bazi...</p>
      </div>
    );
  }

  return (
    <div className="rounded-[32px] border border-white/10 bg-black/20 p-7">
      <div className="mb-1 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
        Ponudniki in znamenitosti ob trasi
      </div>
      <p className="mb-6 text-sm text-zinc-500">
        Vsi, ki so v bazi in so oddaljeni do 2 km od trase. Prikazali se bodo avtomatsko na objavljeni turi.
      </p>

      <div className="grid gap-6 md:grid-cols-2">

        {/* ── Ponudniki ── */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-sm font-bold text-zinc-300">Ponudniki</span>
            <span className="rounded-full bg-[#c58b46]/15 px-2 py-0.5 text-[10px] font-black text-[#c58b46]">
              {ponudniki.length}
            </span>
          </div>

          {ponudniki.length === 0 ? (
            <p className="text-sm text-zinc-600 italic">Ni ponudnikov v 2 km od trase.</p>
          ) : (
            <div className="space-y-2">
              {ponudniki.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3"
                >
                  {p.hero_image ? (
                    <img
                      src={p.hero_image}
                      alt={p.ime}
                      className="h-9 w-9 shrink-0 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#c58b46]/10 text-base">
                      🏠
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-white">{p.ime}</div>
                    {p.tip && <div className="truncate text-xs text-zinc-500">{p.tip}</div>}
                  </div>
                  <span className="shrink-0 text-[11px] text-zinc-500">{formatDistance(p.distanceM)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Znamenitosti ── */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-sm font-bold text-zinc-300">Znamenitosti</span>
            <span className="rounded-full bg-[#c58b46]/15 px-2 py-0.5 text-[10px] font-black text-[#c58b46]">
              {znamenitosti.length}
            </span>
          </div>

          {znamenitosti.length === 0 ? (
            <p className="text-sm text-zinc-600 italic">Ni znamenitosti v 2 km od trase.</p>
          ) : (
            <div className="space-y-2">
              {znamenitosti.map((z) => (
                <div
                  key={z.id}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3"
                >
                  {z.hero_image ? (
                    <img
                      src={z.hero_image}
                      alt={z.ime}
                      className="h-9 w-9 shrink-0 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#c58b46]/10 text-base">
                      📍
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-white">{z.ime}</div>
                    {z.tip && <div className="truncate text-xs text-zinc-500">{z.tip}</div>}
                  </div>
                  <span className="shrink-0 text-[11px] text-zinc-500">{formatDistance(z.distanceM)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Opomba */}
      <div className="mt-6 rounded-2xl border border-white/8 bg-black/20 px-5 py-4 text-sm leading-7 text-zinc-500">
        <span className="font-bold text-zinc-400">Manjka kak ponudnik ali znamenitost?</span>{" "}
        Dodaj ga v Ponudnike ali Znamenitosti <em>po tem, ko bo tura objavljena</em>,
        sistem ga bo samodejno prikazal ob tej turi takoj, ko bo vnesen v bazo.
      </div>
    </div>
  );
}
