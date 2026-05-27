"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import { supabase } from "@/lib/supabase";

type Znamenitost = {
  id: string;
  ime: string;
  tip: string | null;
  regija: string;
  obmocje: string | null;
  lokacija: string | null;
  kratek_opis: string | null;
  opis: string | null;
  zakaj: string | null;
  namig_za_obisk: string | null;
  latitude: string | null;
  longitude: string | null;
  razdalja_od_trase: string | null;
  wikipedia_url: string | null;
  google_maps_url: string | null;
  hero_image: string | null;
  ambasador: { ime: string; regija: string } | null;
};

export default function ZnamenitostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [z, setZ] = useState<Znamenitost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("predlogi_znamenitosti")
        .select("*, ambasadorji(ime, regija)")
        .eq("id", id)
        .eq("status", "approved")
        .single();

      if (error || !data) { setNotFound(true); setLoading(false); return; }
      const raw = data as Record<string, unknown>;
      const amb = raw.ambasadorji as { ime: string; regija: string } | null;
      setZ({ ...data, ambasador: amb });
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#07110b] text-white">
        <SiteHeader backHref="/znamenitosti" active="znamenitosti" />
        <div className="flex min-h-screen items-center justify-center text-zinc-500">Nalagam...</div>
      </main>
    );
  }

  if (notFound || !z) {
    return (
      <main className="min-h-screen bg-[#07110b] text-white">
        <SiteHeader backHref="/znamenitosti" active="znamenitosti" />
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center">
          <div className="text-6xl">🗺️</div>
          <h1 className="font-serif text-3xl font-black italic">Znamenitost ni najdena.</h1>
          <Link href="/znamenitosti" className="rounded-full bg-[#c58b46] px-8 py-4 text-sm font-black text-black">← Vse znamenitosti</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/znamenitosti" active="znamenitosti" />

      {/* ── HERO ── */}
      <section className="relative min-h-[480px] overflow-hidden border-b border-white/10 md:min-h-[560px]">
        {z.hero_image ? (
          <img src={z.hero_image} alt={z.ime}
            className="absolute inset-0 h-full w-full object-cover opacity-75" />
        ) : (
          <div className="absolute inset-0 bg-[#0b1a10]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#07110b]/30 to-[#07110b]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07110b]/60 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[480px] max-w-6xl flex-col justify-end px-6 pb-16 pt-32 md:min-h-[560px] md:pb-20">
          <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
            {z.regija}{z.obmocje ? ` · ${z.obmocje}` : ""}
          </div>
          <h1 className="mt-4 font-serif text-5xl font-black italic leading-tight md:text-6xl">{z.ime}</h1>
          {z.tip && (
            <span className="mt-4 inline-flex rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-zinc-200 backdrop-blur">
              {z.tip}
            </span>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-16 lg:grid-cols-[1fr_320px]">
          <div className="space-y-12">

            {/* Kratek opis */}
            {z.kratek_opis && (
              <p className="text-xl leading-9 text-zinc-300">{z.kratek_opis}</p>
            )}

            {/* Zakaj se ustaviti */}
            {z.opis && (
              <section>
                <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Zakaj se ustaviti</div>
                <p className="leading-9 text-zinc-300">{z.opis}</p>
              </section>
            )}

            {/* Ambasadorjev namig */}
            {z.zakaj && (
              <section className="rounded-[28px] border border-[#c58b46]/20 bg-[#c58b46]/5 p-8">
                <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Ambasadorjev namig</div>
                <p className="leading-8 text-zinc-300 before:content-['"'] after:content-['"']">{z.zakaj}</p>
                {z.ambasador && (
                  <div className="mt-4 text-sm font-bold text-zinc-500">
                    🚴 {z.ambasador.ime} · Ambasador {z.ambasador.regija}
                  </div>
                )}
              </section>
            )}

            {/* Namig za obisk */}
            {z.namig_za_obisk && (
              <section>
                <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Namig za obisk</div>
                <p className="leading-8 text-zinc-300">{z.namig_za_obisk}</p>
              </section>
            )}

          </div>

          {/* ── SIDEBAR ── */}
          <aside className="space-y-5">

            {/* Lokacija */}
            <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <div className="mb-5 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Lokacija</div>
              <div className="space-y-3 text-sm text-zinc-400">
                {z.lokacija && <p>{z.lokacija}</p>}
                {z.razdalja_od_trase && (
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-600">📍</span>
                    <span>{z.razdalja_od_trase}</span>
                  </div>
                )}
                {z.latitude && z.longitude && (
                  <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 font-mono text-xs">
                    {z.latitude}, {z.longitude}
                  </div>
                )}
              </div>
              <div className="mt-5 flex flex-col gap-3">
                {z.google_maps_url && (
                  <a href={z.google_maps_url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#c58b46] px-5 py-2.5 text-sm font-bold text-black transition hover:opacity-90">
                    Odpri v Google Maps
                  </a>
                )}
                {z.wikipedia_url && (
                  <a href={z.wikipedia_url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-2.5 text-sm font-bold text-zinc-300 transition hover:border-white/20">
                    Preberi na Wikipediji
                  </a>
                )}
              </div>
            </div>

            {/* Meta */}
            <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-600">Regija</div>
                  <div className="mt-1 font-bold text-zinc-300">{z.regija}</div>
                </div>
                {z.obmocje && (
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-600">Območje</div>
                    <div className="mt-1 font-bold text-zinc-300">{z.obmocje}</div>
                  </div>
                )}
                {z.tip && (
                  <div className="col-span-2">
                    <div className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-600">Tip</div>
                    <div className="mt-1 font-bold text-zinc-300">{z.tip}</div>
                  </div>
                )}
              </div>
            </div>

            <Link href="/znamenitosti"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-400 transition hover:border-white/20">
              ← Vse znamenitosti
            </Link>

          </aside>
        </div>
      </div>
    </main>
  );
}
