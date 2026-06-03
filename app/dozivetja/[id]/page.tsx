"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import { supabase } from "@/lib/supabase";

type RitemKorak = { time: string; title: string; text: string };
type Poudarek = { badge: string; title: string; text: string; image?: string };

type Doziveto = {
  id: string;
  ime: string;
  regija: string | null;
  obmocje: string | null;
  hero_image: string | null;
  doziveto_naslov: string | null;
  doziveto_ciljna_skupina: string[] | null;
  doziveto_uvod: string | null;
  zakaj: string | null;
  km: number | null;
  visinska_razlika: number | null;
  tezavnost: string | null;
  tipi: string[] | null;
  ritem_dneva: RitemKorak[] | null;
  poudarki: Poudarek[] | null;
};

type Ponudnik = {
  id: string;
  ime: string;
  tip: string | null;
  opis: string | null;
  zakaj: string | null;
  hero_image: string | null;
  lat: number | null;
  lng: number | null;
};

type Znamenitost = {
  id: string;
  ime: string;
  tip: string | null;
  kratek_opis: string | null;
  hero_image: string | null;
  lat: number | null;
  lng: number | null;
};

const RADIUS_KM = 2;

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function DozivetjeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [d, setD] = useState<Doziveto | null>(null);
  const [ponudniki, setPonudniki] = useState<Ponudnik[]>([]);
  const [znamenitosti, setZnamenitosti] = useState<Znamenitost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function load() {
      const { data } = await supabase
        .from("predlogi_tur")
        .select("id, ime, regija, obmocje, hero_image, doziveto_naslov, doziveto_ciljna_skupina, doziveto_uvod, zakaj, km, visinska_razlika, tezavnost, tipi, ritem_dneva, poudarki")
        .eq("id", id)
        .eq("je_doziveto", true)
        .eq("status", "approved")
        .single();

      if (!data) { setNotFound(true); setLoading(false); return; }
      setD(data as Doziveto);

      // Naloži ponudnike in znamenitosti v bližini
      const [ponRes, znRes] = await Promise.all([
        supabase.from("predlogi_ponudnikov").select("id, ime, tip, opis, zakaj, hero_image, lat, lng").eq("status", "approved"),
        supabase.from("predlogi_znamenitosti").select("id, ime, tip, kratek_opis, hero_image, lat, lng").eq("status", "approved"),
      ]);

      // Filtriraj po bližini — rabimo center ture
      // Uporabimo enostavno hevristiko: vzamemo first ponudnike ki imajo koordinate
      // Ko bo GPX integriran, bomo to računali bolj natančno
      setPonudniki((ponRes.data ?? []) as Ponudnik[]);
      setZnamenitosti((znRes.data ?? []) as Znamenitost[]);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#07110b] text-white">
        <SiteHeader backHref="/dozivetja" active="dozivetja" />
        <div className="py-40 text-center text-zinc-500">Nalagam...</div>
      </main>
    );
  }

  if (notFound || !d) {
    return (
      <main className="min-h-screen bg-[#07110b] text-white">
        <SiteHeader backHref="/dozivetja" active="dozivetja" />
        <div className="py-40 text-center text-zinc-500">Doživetje ni bilo najdeno.</div>
      </main>
    );
  }

  const naslov = d.doziveto_naslov || d.ime;
  const ritem = (d.ritem_dneva ?? []).filter(k => k.title?.trim());
  const poudarki = (d.poudarki ?? []).filter(p => p.title?.trim());

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/dozivetja" active="dozivetja" />

      {/* ── HERO ── */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden pt-24">
        {d.hero_image ? (
          <img src={d.hero_image} alt={naslov}
            className="absolute inset-0 h-full w-full object-cover opacity-50" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b1a10] to-[#07110b]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#07110b]/50 to-[#07110b]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16">
          <div className="flex flex-wrap gap-2 mb-6">
            {d.doziveto_ciljna_skupina?.map((s) => (
              <span key={s} className="rounded-full border border-[#c58b46]/40 bg-[#c58b46]/10 px-4 py-2 text-sm text-[#f4d7ad]">
                {s}
              </span>
            ))}
            {d.regija && (
              <span className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-zinc-300">
                {d.regija}{d.obmocje ? ` · ${d.obmocje}` : ""}
              </span>
            )}
          </div>

          <h1 className="font-serif text-5xl font-black italic leading-tight text-white md:text-7xl [text-shadow:_1px_1px_0_rgba(0,0,0,0.9)]">
            {naslov}
          </h1>

          {d.doziveto_uvod && (
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200 [text-shadow:_1px_1px_0_rgba(0,0,0,0.8)]">
              {d.doziveto_uvod}
            </p>
          )}
        </div>
      </section>

      {/* ── RITEM DNEVA ── */}
      {ritem.length > 0 && (
        <section className="border-y border-white/10 bg-[#0b1a10] px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Kako izgleda ta dan</div>
            <h2 className="mt-3 font-serif text-4xl font-black italic">Korak za korakom.</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-5">
              {ritem.map((korak, i) => (
                <div key={i} className="rounded-[24px] border border-white/10 bg-[#07110b] p-5">
                  {korak.time && (
                    <div className="mb-3 text-xl font-black text-[#c58b46]">{korak.time}</div>
                  )}
                  <div className="font-bold text-white">{korak.title}</div>
                  {korak.text && (
                    <p className="mt-2 text-xs leading-6 text-zinc-400">{korak.text}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PONUDNIKI ── */}
      {ponudniki.length > 0 && (
        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Kje se ustaviš</div>
            <h2 className="mt-3 font-serif text-4xl font-black italic">Postanki, ki naredijo dan.</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {ponudniki.slice(0, 3).map((p) => (
                <article key={p.id} className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1a10]">
                  {p.hero_image && (
                    <img src={p.hero_image} alt={p.ime} className="h-48 w-full object-cover" />
                  )}
                  <div className="p-6">
                    {p.tip && <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#c58b46]">{p.tip}</div>}
                    <h3 className="font-serif text-xl font-black italic">{p.ime}</h3>
                    {p.zakaj && <p className="mt-3 text-sm leading-6 text-zinc-400">{p.zakaj}</p>}
                    <Link href={`/ponudniki/${p.id}`}
                      className="mt-5 inline-flex rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-zinc-300 transition hover:border-[#c58b46]/40">
                      Poglej ponudnika →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ZNAMENITOSTI ── */}
      {znamenitosti.length > 0 && (
        <section className="border-y border-white/10 bg-[#0b1a10] px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Kaj ne smeš zamuditi</div>
            <h2 className="mt-3 font-serif text-4xl font-black italic">Točke, ki dajo dan smisel.</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {znamenitosti.slice(0, 3).map((z) => (
                <article key={z.id} className="overflow-hidden rounded-[28px] border border-white/10 bg-[#07110b]">
                  {z.hero_image && (
                    <img src={z.hero_image} alt={z.ime} className="h-48 w-full object-cover" />
                  )}
                  <div className="p-6">
                    {z.tip && <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#c58b46]">{z.tip}</div>}
                    <h3 className="font-serif text-xl font-black italic">{z.ime}</h3>
                    {z.kratek_opis && <p className="mt-3 text-sm leading-6 text-zinc-400">{z.kratek_opis}</p>}
                    <Link href={`/znamenitosti/${z.id}`}
                      className="mt-5 inline-flex rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-zinc-300 transition hover:border-[#c58b46]/40">
                      Poglej znamenitost →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── AMBASADORJEV NAMIG ── */}
      {d.zakaj && (
        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl rounded-[32px] border border-[#c58b46]/20 bg-[#c58b46]/5 p-8 md:p-10 text-center">
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Ambasadorjev namig</div>
            <p className="mt-6 font-serif text-2xl font-black italic leading-9 text-white">
              &ldquo;{d.zakaj}&rdquo;
            </p>
          </div>
        </section>
      )}

      {/* ── TURA NA DNO ── */}
      <section className="border-t border-white/10 bg-[#0b1a10] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Tura ki te pelje skozi vse to</div>
          <h2 className="mt-3 font-serif text-3xl font-black italic">{d.ime}</h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {d.km && <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300">{d.km} km</span>}
            {d.visinska_razlika && <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300">{d.visinska_razlika} vm</span>}
            {d.tezavnost && <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300">{d.tezavnost}</span>}
            {d.tipi?.map((t) => <span key={t} className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300">{t}</span>)}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/ture/${d.id}`}
              className="rounded-full border border-white/10 px-6 py-3.5 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">
              Odpri turo s tehničnimi podatki →
            </Link>
            <Link href="/dozivetja"
              className="rounded-full bg-[#c58b46] px-6 py-3.5 text-sm font-black text-black transition hover:opacity-90">
              ← Vsa doživetja
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
