"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import { supabase } from "@/lib/supabase";
import { minDistanceToPolyline, formatDistance } from "@/lib/distance";
import { parseGpx } from "@/lib/parseGpx";

type Feature = { title: string; description: string };

type Ponudnik = {
  id: string;
  ime: string;
  tip: string | null;
  regija: string;
  lokacija: string | null;
  telefon: string | null;
  spletna_stran: string | null;
  zakaj: string | null;
  opis: string | null;
  bike_friendly_opis: string | null;
  citat: string | null;
  hero_image: string | null;
  features: Feature[] | null;
  galerija: string[] | null;
  lat: number | null;
  lng: number | null;
  ambasador: { ime: string; regija: string; foto_url: string | null } | null;
};

type NearbyTura = {
  id: string;
  ime: string;
  tipi: string[] | null;
  tezavnost: string | null;
  km: number | null;
  distance: number;
};

export default function PonudnikDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [ponudnik, setPonudnik] = useState<Ponudnik | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [nearbyTure, setNearbyTure] = useState<NearbyTura[]>([]);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("predlogi_ponudnikov")
        .select("*, ambasadorji(ime, regija, foto_url)")
        .eq("id", id)
        .eq("status", "approved")
        .single();

      if (error || !data) { setNotFound(true); setLoading(false); return; }
      const raw = data as Record<string, unknown>;
      const amb = raw.ambasadorji as { ime: string; regija: string; foto_url: string | null } | null;
      const ponudnikData: Ponudnik = { ...data, ambasador: amb };
      setPonudnik(ponudnikData);
      setLoading(false);

      // Naloži ture in izračunaj razdalje
      if (ponudnikData.lat && ponudnikData.lng) {
        const { data: ture } = await supabase
          .from("predlogi_tur")
          .select("id, ime, tipi, tezavnost, km, gpx_url")
          .eq("status", "approved")
          .not("gpx_url", "is", null);

        if (ture && ture.length > 0) {
          const nearby: NearbyTura[] = [];
          for (const tura of ture) {
            if (!tura.gpx_url) continue;
            try {
              const res = await fetch(tura.gpx_url);
              if (!res.ok) continue;
              const text = await res.text();
              const parsed = parseGpx(text);
              if (parsed.points.length === 0) continue;
              const dist = minDistanceToPolyline(ponudnikData.lat!, ponudnikData.lng!, parsed.points);
              if (dist <= 2000) {
                nearby.push({ id: tura.id, ime: tura.ime, tipi: tura.tipi, tezavnost: tura.tezavnost, km: tura.km, distance: dist });
              }
            } catch { /* preskoči */ }
          }
          nearby.sort((a, b) => a.distance - b.distance);
          setNearbyTure(nearby);
        }
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#07110b] text-white">
        <SiteHeader backHref="/ponudniki" active="ponudniki" />
        <div className="flex min-h-screen items-center justify-center text-zinc-500">Nalagam...</div>
      </main>
    );
  }

  if (notFound || !ponudnik) {
    return (
      <main className="min-h-screen bg-[#07110b] text-white">
        <SiteHeader backHref="/ponudniki" active="ponudniki" />
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center">
          <div className="text-6xl">🏡</div>
          <h1 className="font-serif text-3xl font-black italic">Ponudnik ni najden.</h1>
          <Link href="/ponudniki" className="rounded-full bg-[#c58b46] px-8 py-4 text-sm font-black text-black">← Vsi ponudniki</Link>
        </div>
      </main>
    );
  }

  const features = (ponudnik.features ?? []).filter(f => f.title?.trim());

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/ponudniki" active="ponudniki" />

      {/* ── HERO ── */}
      <section className="relative min-h-[720px] overflow-hidden border-b border-white/10">
        {ponudnik.hero_image ? (
          <img src={ponudnik.hero_image} alt={ponudnik.ime}
            className="absolute inset-0 h-full w-full object-cover opacity-70" />
        ) : (
          <div className="absolute inset-0 bg-[#0b1a10]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07110b] via-[#07110b]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07110b] via-transparent to-black/40" />

        <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl flex-col justify-end px-6 pb-20 pt-28">
          <div className="max-w-4xl">
            <div className="text-[10px] font-black uppercase tracking-[0.38em] text-[#c58b46]">
              {ponudnik.regija && <span>{ponudnik.regija}</span>}
              {ponudnik.lokacija && <span> · {ponudnik.lokacija}</span>}
            </div>

            <h1 className="mt-6 max-w-4xl font-serif text-6xl font-black italic leading-[0.92] tracking-[-0.045em] text-white md:text-8xl">
              {ponudnik.ime}
            </h1>

            {ponudnik.zakaj && (
              <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-200 md:text-xl md:leading-9">
                {ponudnik.zakaj}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {ponudnik.tip && (
                <span className="rounded-full border border-[#c58b46]/35 bg-black/25 px-5 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#f4d7ad]">
                  {ponudnik.tip}
                </span>
              )}
              {features.slice(0, 3).map((f) => (
                <span key={f.title}
                  className="rounded-full border border-white/20 bg-black/25 px-5 py-2 text-xs font-black uppercase tracking-[0.16em] text-zinc-300">
                  {f.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VSEBINA ── */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_360px]">
        <div className="space-y-16">

          {/* Postanek, ki ima svoj ritem */}
          <section className="grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-start">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
                Kjer se kolesarski dan ustavi
              </div>
              <h2 className="mt-4 font-serif text-4xl font-black italic leading-tight md:text-5xl">
                Postanek, ki ima<br />svoj ritem.
              </h2>
              {ponudnik.opis && (
                <p className="mt-7 text-lg leading-9 text-zinc-400">{ponudnik.opis}</p>
              )}
              {ponudnik.bike_friendly_opis && (
                <p className="mt-6 text-lg leading-9 text-zinc-400">{ponudnik.bike_friendly_opis}</p>
              )}
            </div>

            {ponudnik.citat && (
              <div className="rounded-[28px] border border-[#c58b46]/20 bg-[#0b1a10] p-7">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c58b46]">
                  Zakaj se ustaviti
                </div>
                <p className="mt-5 font-serif text-2xl font-black italic leading-tight text-[#f4d7ad]">
                  &ldquo;{ponudnik.citat}&rdquo;
                </p>
                <div className="mt-5 text-sm font-semibold text-zinc-400">
                  Bojan on Bike izbor
                </div>
              </div>
            )}
          </section>

          {/* Dober postanek ni naključje */}
          {features.length > 0 && (
            <section>
              <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
                Kaj te čaka tukaj
              </div>
              <h2 className="mt-4 font-serif text-4xl font-black italic leading-tight md:text-5xl">
                Dober postanek ni naključje.
              </h2>

              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {features.map((f) => (
                  <div key={f.title} className="rounded-[22px] border border-white/10 bg-[#0b1a10] p-5">
                    <h3 className="font-bold text-[#f4d7ad]">{f.title}</h3>
                    {f.description && (
                      <p className="mt-3 text-sm leading-7 text-zinc-400">{f.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Katerim turam je ob poti */}
          {nearbyTure.length > 0 && (
            <section>
              <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
                Ture ob ponudniku
              </div>
              <h2 className="mt-4 font-serif text-4xl font-black italic leading-tight md:text-5xl">
                Katerim turam je ob poti.
              </h2>

              <div className="mt-8 space-y-4">
                {nearbyTure.map((tura) => (
                  <Link key={tura.id} href={`/ture/${tura.id}`}
                    className="group flex items-center justify-between gap-5 rounded-[22px] border border-white/10 bg-[#0b1a10] p-5 transition hover:border-[#c58b46]/45">
                    <div>
                      <div className="font-serif text-2xl font-black italic text-white group-hover:text-[#f4d7ad]">
                        {tura.ime}
                      </div>
                      {(tura.tipi ?? []).length > 0 && (
                        <div className="mt-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#c58b46]">
                          {(tura.tipi ?? []).join(" · ")}
                        </div>
                      )}
                    </div>
                    <div className="shrink-0 text-right text-sm text-zinc-500">
                      {formatDistance(tura.distance)}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Galerija */}
          {ponudnik.galerija && ponudnik.galerija.length > 0 && (
            <section>
              <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
                Galerija
              </div>
              <h2 className="mt-4 font-serif text-4xl font-black italic leading-tight md:text-5xl">
                {ponudnik.ime} v slikah.
              </h2>

              <div className="mt-8 grid gap-4 md:grid-cols-4">
                {ponudnik.galerija.map((url, index) => (
                  <div key={url} className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}>
                    <img src={url} alt={`${ponudnik.ime} ${index + 1}`}
                      className="h-full min-h-[180px] w-full rounded-[24px] object-cover" />
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* ── SIDEBAR ── */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[28px] border border-[#c58b46]/25 bg-[#0b1a10] p-7">
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
              Kontakt
            </div>

            <div className="mt-6 space-y-0 text-sm">
              {(
                [
                  ponudnik.tip ? ["Tip", ponudnik.tip] : null,
                  ["Regija", ponudnik.regija],
                  ponudnik.lokacija ? ["Lokacija", ponudnik.lokacija] : null,
                ].filter((x): x is [string, string] => x !== null)
              ).map(([label, value]) => (
                <div key={label}
                  className="flex justify-between gap-5 border-b border-white/10 py-4">
                  <span className="text-zinc-500">{label}</span>
                  <span className="text-right font-semibold text-[#f4d7ad]">{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3">
              {ponudnik.telefon && (
                <a href={`tel:${ponudnik.telefon.replace(/\s/g, "")}`}
                  className="rounded-full bg-[#c58b46] px-6 py-4 text-center text-sm font-black text-black transition hover:bg-[#f4d7ad]">
                  Pokliči: {ponudnik.telefon}
                </a>
              )}
              {ponudnik.spletna_stran && (
                <a href={ponudnik.spletna_stran} target="_blank" rel="noreferrer"
                  className="rounded-full border border-[#c58b46]/35 px-6 py-4 text-center text-sm font-bold text-[#f4d7ad] transition hover:border-[#c58b46]">
                  WWW
                </a>
              )}
              <Link href="/ponudniki"
                className="rounded-full border border-white/10 px-6 py-4 text-center text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">
                ← Vsi ponudniki
              </Link>
            </div>
          </div>

          {/* Ambassador kartica */}
          {ponudnik.ambasador && (
            <div className="mt-5 rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
                Predlagal ambasador
              </div>
              <div className="flex items-center gap-3">
                {ponudnik.ambasador.foto_url ? (
                  <img src={ponudnik.ambasador.foto_url} alt={ponudnik.ambasador.ime}
                    className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c58b46]/20 text-xs font-black text-[#c58b46]">
                    {ponudnik.ambasador.ime.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-bold text-white">{ponudnik.ambasador.ime}</div>
                  <div className="text-xs text-zinc-500">Ambasador {ponudnik.ambasador.regija}</div>
                </div>
              </div>
              {ponudnik.zakaj && (
                <p className="mt-4 text-sm leading-7 text-zinc-400 italic">
                  &ldquo;{ponudnik.zakaj}&rdquo;
                </p>
              )}
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}
