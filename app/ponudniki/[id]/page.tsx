"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import { supabase } from "@/lib/supabase";

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
  ambasador: { ime: string; regija: string } | null;
};

export default function PonudnikDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [ponudnik, setPonudnik] = useState<Ponudnik | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("predlogi_ponudnikov")
        .select("*, ambasadorji(ime, regija)")
        .eq("id", id)
        .eq("status", "approved")
        .single();

      if (error || !data) { setNotFound(true); setLoading(false); return; }
      const raw = data as Record<string, unknown>;
      const amb = raw.ambasadorji as { ime: string; regija: string } | null;
      setPonudnik({ ...data, ambasador: amb });
      setLoading(false);
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

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/ponudniki" active="ponudniki" />

      {/* ── HERO ── */}
      <section className="relative min-h-[480px] overflow-hidden border-b border-white/10 md:min-h-[560px]">
        {ponudnik.hero_image ? (
          <img src={ponudnik.hero_image} alt={ponudnik.ime}
            className="absolute inset-0 h-full w-full object-cover opacity-75" />
        ) : (
          <div className="absolute inset-0 bg-[#0b1a10]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-[#07110b]/20 to-[#07110b]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07110b]/45 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[480px] max-w-6xl flex-col justify-end px-6 pb-16 pt-32 md:min-h-[560px] md:pb-20">
          <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
            {ponudnik.regija}{ponudnik.lokacija ? ` · ${ponudnik.lokacija}` : ""}
          </div>
          <h1 className="mt-4 font-serif text-5xl font-black italic leading-tight md:text-6xl">{ponudnik.ime}</h1>
          {ponudnik.tip && (
            <span className="mt-4 inline-flex rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-zinc-200 backdrop-blur">
              {ponudnik.tip}
            </span>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-16 lg:grid-cols-[1fr_320px]">
          <div className="space-y-14">

            {/* Citat */}
            {ponudnik.citat && (
              <blockquote className="border-l-2 border-[#c58b46] pl-6 font-serif text-2xl italic text-[#f4d7ad]">
                {ponudnik.citat}
              </blockquote>
            )}

            {/* Opis */}
            {ponudnik.opis && (
              <section>
                <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">O ponudniku</div>
                <p className="text-lg leading-9 text-zinc-300">{ponudnik.opis}</p>
              </section>
            )}

            {/* Zakaj se ustaviti */}
            {ponudnik.zakaj && (
              <section className="rounded-[28px] border border-[#c58b46]/20 bg-[#c58b46]/5 p-8">
                <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Zakaj se ustaviti</div>
                <p className="leading-8 text-zinc-300">{ponudnik.zakaj}</p>
                {ponudnik.ambasador && (
                  <div className="mt-4 text-sm font-bold text-zinc-500">
                    🚴 {ponudnik.ambasador.ime} · Ambasador {ponudnik.ambasador.regija}
                  </div>
                )}
              </section>
            )}

            {/* Bike friendly */}
            {ponudnik.bike_friendly_opis && (
              <section>
                <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Bike-friendly</div>
                <p className="leading-8 text-zinc-300">{ponudnik.bike_friendly_opis}</p>
              </section>
            )}

            {/* Features */}
            {ponudnik.features && ponudnik.features.length > 0 && (
              <section>
                <div className="mb-6 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Dober postanek ni naključje</div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {ponudnik.features.map((f, i) => (
                    <div key={i} className="rounded-[22px] border border-white/10 bg-[#0b1a10] p-5">
                      <div className="font-bold text-white">{f.title}</div>
                      {f.description && <p className="mt-2 text-sm leading-6 text-zinc-400">{f.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Galerija */}
            {ponudnik.galerija && ponudnik.galerija.length > 0 && (
              <section>
                <div className="mb-6 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">V slikah</div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {ponudnik.galerija.map((url, i) => (
                    <img key={i} src={url} alt={`${ponudnik.ime} — ${i + 1}`}
                      className="aspect-square w-full rounded-2xl object-cover" />
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* ── SIDEBAR ── */}
          <aside className="space-y-5">
            <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <div className="mb-5 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Kontakt</div>
              <div className="space-y-3 text-sm">
                {ponudnik.lokacija && (
                  <div className="flex items-start gap-3 text-zinc-400">
                    <span className="text-zinc-600">📍</span>
                    <span>{ponudnik.lokacija}, {ponudnik.regija}</span>
                  </div>
                )}
                {ponudnik.telefon && (
                  <a href={`tel:${ponudnik.telefon}`} className="flex items-center gap-3 text-zinc-400 transition hover:text-white">
                    <span className="text-zinc-600">📞</span>
                    <span>{ponudnik.telefon}</span>
                  </a>
                )}
                {ponudnik.spletna_stran && (
                  <a href={ponudnik.spletna_stran} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#f4d7ad] transition hover:text-white">
                    <span className="text-zinc-600">🌐</span>
                    <span className="truncate">{ponudnik.spletna_stran.replace(/^https?:\/\//, "")}</span>
                  </a>
                )}
              </div>
            </div>

            <Link href="/ponudniki"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-400 transition hover:border-white/20">
              ← Vsi ponudniki
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
