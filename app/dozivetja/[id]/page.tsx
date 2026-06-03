"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import SiteHeader from "@/components/SiteHeader";
import { supabase } from "@/lib/supabase";
import { parseGpx, type ParsedGpx } from "@/lib/parseGpx";
import { minDistanceToPolyline, formatDistance } from "@/lib/distance";

const GpxMap = dynamic(() => import("@/components/GpxMap"), { ssr: false });

// ── types ─────────────────────────────────────────────────────────────────────

type RitemKorak = { time: string; title: string; text: string };
type Poudarek = { badge: string; title: string; text: string; image?: string };

type Doziveto = {
  id: string;
  ime: string;
  regija: string | null;
  obmocje: string | null;
  hero_image: string | null;
  galerija: string[] | null;
  doziveto_naslov: string | null;
  doziveto_ciljna_skupina: string[] | null;
  doziveto_uvod: string | null;
  doziveto_podnaslov: string | null;
  zakaj: string | null;
  km: number | null;
  visinska_razlika: number | null;
  cas_ur: number | null;
  tezavnost: string | null;
  tipi: string[] | null;
  ritem_dneva: RitemKorak[] | null;
  poudarki: Poudarek[] | null;
  gpx_url: string | null;
  ambasador: {
    ime: string;
    regija: string | null;
    foto_url: string | null;
  } | null;
};

type Ponudnik = {
  id: string;
  ime: string;
  tip: string | null;
  zakaj: string | null;
  hero_image: string | null;
  lat: number | null;
  lng: number | null;
  distanceKm?: number;
};

type Znamenitost = {
  id: string;
  ime: string;
  tip: string | null;
  kratek_opis: string | null;
  hero_image: string | null;
  lat: number | null;
  lng: number | null;
  distanceKm?: number;
};

function casDisplay(casUr: number | null): string {
  if (!casUr) return "—";
  if (casUr <= 2) return "1–2 uri";
  if (casUr <= 3) return "2–3 ure";
  if (casUr <= 5) return "3–5 ur";
  if (casUr <= 7) return "5–7 ur";
  if (casUr <= 9) return "Cel dan";
  return "Več dni";
}

// ── Časovnica korak ───────────────────────────────────────────────────────────

function RitemStep({ korak, index, total }: { korak: RitemKorak; index: number; total: number }) {
  return (
    <div className="relative flex gap-5">
      {/* Vertikalna linija */}
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#c58b46] bg-[#07110b] text-sm font-black text-[#c58b46]">
          {index + 1}
        </div>
        {index < total - 1 && (
          <div className="mt-1 w-px flex-1 bg-gradient-to-b from-[#c58b46]/40 to-transparent" style={{ minHeight: 40 }} />
        )}
      </div>
      {/* Vsebina */}
      <div className="pb-10">
        {korak.time && (
          <div className="mb-1 text-xs font-black uppercase tracking-[0.22em] text-[#c58b46]">{korak.time}</div>
        )}
        <h3 className="font-serif text-xl font-black italic text-white">{korak.title}</h3>
        {korak.text && (
          <p className="mt-2 max-w-xl text-sm leading-7 text-zinc-400">{korak.text}</p>
        )}
      </div>
    </div>
  );
}

// ── Kartica ponudnika ─────────────────────────────────────────────────────────

function PonudnikCard({ p }: { p: Ponudnik }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1a10] transition hover:-translate-y-1 hover:border-[#c58b46]/35">
      <div className="relative h-52 overflow-hidden bg-black/30">
        {p.hero_image ? (
          <img src={p.hero_image} alt={p.ime} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl opacity-10">🏡</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a10] via-transparent to-transparent" />
        {p.tip && (
          <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-200 backdrop-blur">
            {p.tip}
          </div>
        )}
        {p.distanceKm !== undefined && (
          <div className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-[10px] font-black text-[#c58b46] backdrop-blur">
            {formatDistance(p.distanceKm)}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl font-black italic text-white">{p.ime}</h3>
        {p.zakaj && (
          <p className="mt-3 flex-1 text-sm leading-7 text-zinc-400 line-clamp-3">{p.zakaj}</p>
        )}
        <Link href={`/ponudniki/${p.id}`}
          className="mt-5 inline-flex justify-center rounded-full border border-[#c58b46]/40 px-5 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-[#c58b46] transition hover:bg-[#c58b46] hover:text-black">
          Več o ponudniku →
        </Link>
      </div>
    </article>
  );
}

// ── Kartica znamenitosti ──────────────────────────────────────────────────────

function ZnamenitostCard({ z }: { z: Znamenitost }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1a10] transition hover:-translate-y-1 hover:border-[#c58b46]/35">
      <div className="relative h-48 overflow-hidden bg-black/30">
        {z.hero_image ? (
          <img src={z.hero_image} alt={z.ime} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl opacity-10">📍</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a10] via-transparent to-transparent" />
        {z.tip && (
          <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#f4d7ad] backdrop-blur">
            {z.tip}
          </div>
        )}
        {z.distanceKm !== undefined && (
          <div className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-[10px] font-black text-[#c58b46] backdrop-blur">
            {formatDistance(z.distanceKm)}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl font-black italic text-white">{z.ime}</h3>
        {z.kratek_opis && (
          <p className="mt-3 flex-1 text-sm leading-7 text-zinc-400 line-clamp-3">{z.kratek_opis}</p>
        )}
        <Link href={`/znamenitosti/${z.id}`}
          className="mt-5 inline-flex justify-center rounded-full border border-white/10 px-5 py-2.5 text-xs font-bold text-zinc-300 transition hover:border-[#c58b46]/40 hover:text-white">
          Poglej znamenitost →
        </Link>
      </div>
    </article>
  );
}

// ── Glavna stran ──────────────────────────────────────────────────────────────

export default function DozivetjeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [d, setD] = useState<Doziveto | null>(null);
  const [gpxData, setGpxData] = useState<ParsedGpx | null>(null);
  const [nearbyPonudniki, setNearbyPonudniki] = useState<Ponudnik[]>([]);
  const [nearbyZnamenitosti, setNearbyZnamenitosti] = useState<Znamenitost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function load() {
      const { data, error } = await supabase
        .from("predlogi_tur")
        .select("id, ime, regija, obmocje, hero_image, galerija, doziveto_naslov, doziveto_podnaslov, doziveto_ciljna_skupina, doziveto_uvod, zakaj, km, visinska_razlika, cas_ur, tezavnost, tipi, ritem_dneva, poudarki, gpx_url, ambasadorji(ime, regija, foto_url)")
        .eq("id", id)
        .eq("je_doziveto", true)
        .eq("status", "approved")
        .single();

      if (error || !data) { setNotFound(true); setLoading(false); return; }

      const ambRaw = data.ambasadorji;
      const amb = Array.isArray(ambRaw)
        ? (ambRaw[0] as { ime: string; regija: string | null; foto_url: string | null } ?? null)
        : (ambRaw as { ime: string; regija: string | null; foto_url: string | null } | null);
      setD({ ...data, ambasador: amb } as Doziveto);

      // Naloži GPX
      let points: ParsedGpx["points"] = [];
      if (data.gpx_url) {
        try {
          const res = await fetch(data.gpx_url);
          const text = await res.text();
          const parsed = parseGpx(text);
          setGpxData(parsed);
          points = parsed.points;
        } catch { /* GPX ni obvezen */ }
      }

      // Naloži ponudnike in znamenitosti
      const [ponRes, znRes] = await Promise.all([
        supabase.from("predlogi_ponudnikov").select("id, ime, tip, zakaj, hero_image, lat, lng").eq("status", "approved"),
        supabase.from("predlogi_znamenitosti").select("id, ime, tip, kratek_opis, hero_image, lat, lng").eq("status", "approved"),
      ]);

      const allPon = (ponRes.data ?? []) as Ponudnik[];
      const allZn = (znRes.data ?? []) as Znamenitost[];

      if (points.length > 0) {
        const ponBlizu = allPon
          .map(p => ({ ...p, distanceKm: p.lat && p.lng ? minDistanceToPolyline(p.lat, p.lng, points) : Infinity }))
          .filter(p => p.distanceKm <= 2)
          .sort((a, b) => a.distanceKm - b.distanceKm)
          .slice(0, 4);
        const znBlizu = allZn
          .map(z => ({ ...z, distanceKm: z.lat && z.lng ? minDistanceToPolyline(z.lat, z.lng, points) : Infinity }))
          .filter(z => z.distanceKm <= 3)
          .sort((a, b) => a.distanceKm - b.distanceKm)
          .slice(0, 4);
        setNearbyPonudniki(ponBlizu);
        setNearbyZnamenitosti(znBlizu);
      } else {
        setNearbyPonudniki(allPon.slice(0, 4));
        setNearbyZnamenitosti(allZn.slice(0, 4));
      }

      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#07110b] text-white">
        <SiteHeader backHref="/dozivetja" active="dozivetja" />
        <div className="py-40 text-center text-zinc-500">Nalagam doživetje...</div>
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

  // Dinamičen naslov časovnice
  function generirajNaslovCasovnice(): string {
    const casovnica = ritem.filter(k => k.time?.trim());
    const prviCas = casovnica[0]?.time ?? null;
    const zadnjiCas = casovnica[casovnica.length - 1]?.time ?? null;
    const uvod = (d.doziveto_uvod ?? "").toLowerCase();
    const podnaslov = (d.doziveto_podnaslov ?? "").toLowerCase();
    const besedilo = uvod + " " + podnaslov;

    // Ključne besede → tematski naslov
    if (besedilo.includes("vino") || besedilo.includes("vinograd") || besedilo.includes("klet")) {
      if (prviCas && zadnjiCas && prviCas !== zadnjiCas) return `Od ${prviCas} do ${zadnjiCas} med vinogradi`;
      return "Dan med vinogradi";
    }
    if (besedilo.includes("gozd") || besedilo.includes("gozdni")) {
      if (prviCas && zadnjiCas && prviCas !== zadnjiCas) return `Od ${prviCas} do ${zadnjiCas} skozi gozd`;
      return "Dan v gozdu";
    }
    if (besedilo.includes("razgled") || besedilo.includes("vrh") || besedilo.includes("gora")) {
      if (prviCas && zadnjiCas && prviCas !== zadnjiCas) return `Od ${prviCas} do ${zadnjiCas} proti vrhu`;
      return "Dan z razgledom";
    }
    if (besedilo.includes("družin") || besedilo.includes("otrok")) {
      if (prviCas && zadnjiCas && prviCas !== zadnjiCas) return `Družinski dan od ${prviCas} do ${zadnjiCas}`;
      return "Družinski kolesarski dan";
    }
    if (besedilo.includes("par") || besedilo.includes("romantič")) {
      if (prviCas && zadnjiCas && prviCas !== zadnjiCas) return `Dan za dva od ${prviCas} do ${zadnjiCas}`;
      return "Dan za dva na kolesu";
    }
    // Splošni naslov iz časov
    if (prviCas && zadnjiCas && prviCas !== zadnjiCas) return `Od ${prviCas} do ${zadnjiCas}`;
    if (prviCas) return `Začetek ob ${prviCas}`;
    return "Potek dneva";
  }

  const naslovCasovnice = generirajNaslovCasovnice();

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/dozivetja" active="dozivetja" />

      {/* ══ 1. HERO ══════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[85vh] items-end overflow-hidden pt-24">
        {d.hero_image ? (
          <img src={d.hero_image} alt={naslov}
            className="absolute inset-0 h-full w-full object-cover opacity-55" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#102417] to-[#07110b]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-[#07110b]/40 to-[#07110b]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20">
          {/* Tagi */}
          <div className="mb-6 flex flex-wrap gap-2">
            {d.doziveto_ciljna_skupina?.map((s) => (
              <span key={s} className="rounded-full border border-[#c58b46]/40 bg-black/40 px-4 py-2 text-sm font-bold text-[#f4d7ad] backdrop-blur">
                {s}
              </span>
            ))}
            {d.regija && (
              <span className="rounded-full border border-white/15 bg-black/40 px-4 py-2 text-sm text-zinc-300 backdrop-blur">
                {d.regija}{d.obmocje ? ` · ${d.obmocje}` : ""}
              </span>
            )}
          </div>

          {/* Naslov */}
          <h1 className="font-serif text-6xl font-black italic leading-[0.9] tracking-tight text-white md:text-8xl [text-shadow:_2px_2px_0_rgba(0,0,0,0.9),_-1px_-1px_0_rgba(0,0,0,0.5)]">
            {naslov}
          </h1>

          {/* Podnaslov */}
          {d.doziveto_podnaslov && (
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-zinc-200 [text-shadow:_1px_1px_0_rgba(0,0,0,1)]">
              {d.doziveto_podnaslov}
            </p>
          )}

          {/* Metriki */}
          {(d.km || d.visinska_razlika || d.cas_ur || d.tezavnost) && (
            <div className="mt-10 inline-flex divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-black/50 backdrop-blur">
              {d.km && (
                <div className="px-5 py-3 text-center">
                  <div className="text-lg font-black text-[#f4d7ad]">{d.km} km</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">dolžina</div>
                </div>
              )}
              {d.visinska_razlika && (
                <div className="px-5 py-3 text-center">
                  <div className="text-lg font-black text-[#f4d7ad]">{d.visinska_razlika} vm</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">vzpon</div>
                </div>
              )}
              {d.cas_ur && (
                <div className="px-5 py-3 text-center">
                  <div className="text-lg font-black text-[#f4d7ad]">{casDisplay(d.cas_ur)}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">čas</div>
                </div>
              )}
              {d.tezavnost && (
                <div className="px-5 py-3 text-center">
                  <div className="text-lg font-black text-[#f4d7ad]">{d.tezavnost}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">zahtevnost</div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ══ 2. AMBASADOR + UREDNIŠKI UVOD ════════════════════════════════════ */}
      {(d.ambasador || d.zakaj || d.doziveto_uvod) && (
        <section className="border-y border-white/10 bg-[#0b1a10] px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-start">
              {/* Ambasador */}
              {d.ambasador && (
                <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#07110b]">
                    {d.ambasador.foto_url ? (
                      <img src={d.ambasador.foto_url} alt={d.ambasador.ime} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-2xl">👤</div>
                    )}
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#c58b46]">Izbral ambasador</div>
                    <div className="mt-1 font-serif text-lg font-black italic text-white">{d.ambasador.ime}</div>
                    {d.ambasador.regija && <div className="text-xs text-zinc-500">{d.ambasador.regija}</div>}
                  </div>
                </div>
              )}
              {/* Uredniški uvod + citat */}
              <div className="space-y-6">
                {d.doziveto_uvod && (
                  <p className="text-lg leading-9 text-zinc-300">{d.doziveto_uvod}</p>
                )}
                {d.zakaj && (
                  <blockquote className="border-l-2 border-[#c58b46]/40 pl-6 font-serif text-xl italic leading-8 text-zinc-400">
                    &ldquo;{d.zakaj}&rdquo;
                  </blockquote>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══ 3. RITEM DNEVA — VERTIKALNA ČASOVNICA ════════════════════════════ */}
      {ritem.length > 0 && (
        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Kako izgleda ta dan</div>
                <h2 className="mt-4 font-serif text-5xl font-black italic leading-tight text-white md:text-6xl">
                  {naslovCasovnice}
                </h2>
                <p className="mt-6 text-base leading-8 text-zinc-400">
                  Vsak dan ima svoj ritem. Tukaj je prikazan potek dneva — kdaj kje si in kaj te čaka na poti.
                </p>
              </div>
              <div>
                {ritem.map((korak, i) => (
                  <RitemStep key={i} korak={korak} index={i} total={ritem.length} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══ 4. POUDARKI POTI ═════════════════════════════════════════════════ */}
      {poudarki.length > 0 && (
        <section className="border-y border-white/10 bg-[#0b1a10] px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Poudarki poti</div>
            <h2 className="mt-4 font-serif text-4xl font-black italic">Trenutki, ki ostanejo v spominu.</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {poudarki.map((p, i) => (
                <article key={i} className="overflow-hidden rounded-[26px] border border-white/10 bg-[#07110b]">
                  {p.image ? (
                    <div className="h-56 overflow-hidden">
                      <img src={p.image} alt={p.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                    </div>
                  ) : (
                    <div className="flex h-56 items-center justify-center bg-black/20 text-6xl opacity-10">🚵</div>
                  )}
                  <div className="p-6">
                    {p.badge && (
                      <span className="rounded-full border border-[#c58b46]/30 bg-[#c58b46]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#f4d7ad]">
                        {p.badge}
                      </span>
                    )}
                    <h3 className="mt-3 font-serif text-xl font-black italic text-white">{p.title}</h3>
                    {p.text && <p className="mt-3 text-sm leading-7 text-zinc-400">{p.text}</p>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ 5. ZEMLJEVID ═════════════════════════════════════════════════════ */}
      {(gpxData || nearbyPonudniki.length > 0) && (
        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Trasa in postanki</div>
            <h2 className="mt-4 font-serif text-4xl font-black italic">Kje vse te ta dan pelje.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
              Na zemljevidu vidiš traso ture in vse postanke ob poti. Klikni na pin za več informacij.
            </p>
            <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10" style={{ height: 520 }}>
              {gpxData ? (
                <GpxMap
                  points={gpxData.points}
                  height={520}
                  ponudniki={nearbyPonudniki.filter(p => p.lat != null && p.lng != null).map(p => ({ id: p.id, ime: p.ime, tip: p.tip, lat: p.lat!, lng: p.lng! }))}
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-[#0b1a10] text-zinc-600">
                  <div className="text-center">
                    <div className="text-4xl">🗺️</div>
                    <p className="mt-3 text-sm">GPX trasa še ni naložena.</p>
                  </div>
                </div>
              )}
            </div>
            {d.gpx_url && (
              <div className="mt-5">
                <a href={d.gpx_url} download
                  className="inline-flex items-center gap-2 rounded-full border border-[#c58b46]/40 px-6 py-3 text-sm font-black text-[#c58b46] transition hover:bg-[#c58b46]/10">
                  ↓ Prenesi GPX datoteko
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══ 6. POSTANKI — PONUDNIKI ══════════════════════════════════════════ */}
      {nearbyPonudniki.length > 0 && (
        <section className="border-y border-white/10 bg-[#0b1a10] px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Kje se ustaviš</div>
            <h2 className="mt-4 font-serif text-4xl font-black italic">Postanki, ki naredijo dan.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
              Kulinarika, vino in prenočišča ob trasi — vsak potrjen ponudnik pozna kolesarje in ve, kaj potrebuješ.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {nearbyPonudniki.map((p) => <PonudnikCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* ══ 7. ZNAMENITOSTI ══════════════════════════════════════════════════ */}
      {nearbyZnamenitosti.length > 0 && (
        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Kaj ne smeš zamuditi</div>
            <h2 className="mt-4 font-serif text-4xl font-black italic">Točke, ki dajo dan smisel.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
              Razgledi, naravne posebnosti in lokalne zgodbe ob poti — predlagane s strani ambasadorja.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {nearbyZnamenitosti.map((z) => <ZnamenitostCard key={z.id} z={z} />)}
            </div>
          </div>
        </section>
      )}

      {/* ══ 8. TURA NA DNO ═══════════════════════════════════════════════════ */}
      <section className="border-t border-white/10 bg-[#0b1a10] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Tura ki te pelje skozi vse to</div>
              <h2 className="mt-4 font-serif text-4xl font-black italic text-white">{d.ime}</h2>
              <p className="mt-3 text-sm text-zinc-500">
                Vsi tehnični podatki, GPX, podlaga in poudarki poti so na strani ture.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {d.km && <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300">{d.km} km</span>}
                {d.visinska_razlika && <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300">{d.visinska_razlika} vm</span>}
                {d.tezavnost && <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300">{d.tezavnost}</span>}
                {d.tipi?.map((t) => <span key={t} className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300">{t}</span>)}
              </div>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <Link href={`/ture/${d.id}`}
                className="inline-flex justify-center rounded-full bg-[#c58b46] px-7 py-4 text-sm font-black text-black transition hover:opacity-90">
                Odpri turo s tehničnimi podatki →
              </Link>
              <Link href="/dozivetja"
                className="inline-flex justify-center rounded-full border border-white/10 px-7 py-4 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">
                ← Vsa doživetja
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
