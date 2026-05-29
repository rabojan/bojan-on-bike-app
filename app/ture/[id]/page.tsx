"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import SiteHeader from "@/components/SiteHeader";
import ElevationChart from "@/components/ElevationChart";
import { supabase } from "@/lib/supabase";
import { parseGpx, type ParsedGpx } from "@/lib/parseGpx";

const GpxMap = dynamic(() => import("@/components/GpxMap"), { ssr: false });

function casDisplay(casUr: number | null): string {
  if (!casUr) return "—";
  if (casUr <= 2) return "1–2 uri";
  if (casUr <= 3) return "2–3 ure";
  if (casUr <= 5) return "3–5 ur";
  if (casUr <= 7) return "5–7 ur";
  if (casUr <= 9) return "Cel dan";
  return "Več dni";
}

type RitemKorak = { time: string; title: string; text: string };
type Poudarek = { badge: string; title: string; text: string; image?: string };

type Tura = {
  id: string;
  ime: string;
  regija: string;
  obmocje: string | null;
  opis: string | null;
  zakaj: string | null;
  km: number | null;
  visinska_razlika: number | null;
  cas_ur: number | null;
  tipi: string[] | null;
  tezavnost: string | null;
  podlaga_asfalt: number;
  podlaga_makadam: number;
  podlaga_gozd: number;
  gpx_url: string | null;
  hero_image: string | null;
  ritem_dneva: RitemKorak[] | null;
  poudarki: Poudarek[] | null;
  galerija: string[] | null;
  ambasador: {
    ime: string;
    regija: string | null;
    foto_url: string | null;
    kratek_opis: string | null;
  } | null;
};

function SurfaceBar({ label, value, color = "#c58b46" }: { label: string; value: number; color?: string }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-zinc-400">{label}</span>
        <span className="font-bold text-white">{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

export default function TuraDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [tura, setTura] = useState<Tura | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [gpxData, setGpxData] = useState<ParsedGpx | null>(null);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("predlogi_tur")
        .select("*, ambasadorji(ime, regija, foto_url, kratek_opis)")
        .eq("id", id)
        .eq("status", "approved")
        .single();

      if (error || !data) { setNotFound(true); setLoading(false); return; }

      const raw = data as Record<string, unknown>;
      const amb = raw.ambasadorji as { ime: string; regija: string | null; foto_url: string | null; kratek_opis: string | null } | null;
      setTura({
        ...data,
        ambasador: amb,
      });
      setLoading(false);

      if (data.gpx_url) {
        try {
          const res = await fetch(data.gpx_url as string);
          const xml = await res.text();
          const parsed = parseGpx(xml);
          if (parsed.points.length > 0) setGpxData(parsed);
        } catch { /* tiho */ }
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#07110b] text-white">
        <SiteHeader backHref="/ture" active="ture" />
        <div className="flex min-h-[60vh] items-center justify-center text-zinc-500">Nalagam turo...</div>
      </main>
    );
  }

  if (notFound || !tura) {
    return (
      <main className="min-h-screen bg-[#07110b] text-white">
        <SiteHeader backHref="/ture" active="ture" />
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center px-6">
          <div className="text-6xl">🚵</div>
          <h1 className="font-serif text-3xl font-black italic">Tura ni najdena.</h1>
          <p className="text-zinc-500">Ta tura morda še ni bila odobrena ali ne obstaja.</p>
          <Link href="/ture" className="rounded-full bg-[#c58b46] px-8 py-4 text-sm font-black text-black">
            ← Vse ture
          </Link>
        </div>
      </main>
    );
  }

  const hasGpx = !!tura.gpx_url;
  const hasSurface = tura.podlaga_asfalt > 0 || tura.podlaga_makadam > 0 || tura.podlaga_gozd > 0;

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/ture" active="ture" />

      {/* ── HERO ── */}
      <section className="relative min-h-[680px] overflow-hidden md:min-h-[780px]">
        {tura.hero_image ? (
          <img src={tura.hero_image} alt={tura.ime}
            className="absolute inset-0 h-full w-full object-cover opacity-70" />
        ) : (
          <div className="absolute inset-0 bg-[#0b1a10]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#07110b]/20 to-[#07110b]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07110b]/70 via-[#07110b]/20 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[680px] max-w-6xl flex-col justify-end px-6 pb-20 pt-36 md:min-h-[780px]">
          {/* Type badges */}
          {tura.tipi && tura.tipi.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {tura.tipi.map((t) => (
                <span key={t}
                  className="rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-200 backdrop-blur-sm">
                  {t}
                </span>
              ))}
              {tura.regija && (
                <span className="rounded-full border border-[#c58b46]/30 bg-black/40 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#c58b46] backdrop-blur-sm">
                  {tura.regija}
                </span>
              )}
            </div>
          )}

          <h1 className="max-w-3xl font-serif text-5xl font-black italic leading-[1.0] tracking-tight text-white md:text-7xl lg:text-8xl">
            {tura.ime}
          </h1>

          {tura.opis && (
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-200/80 md:text-lg md:leading-9 line-clamp-2">
              {tura.opis}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {hasGpx && (
              <a href={tura.gpx_url!} download
                className="inline-flex items-center gap-2 rounded-full bg-[#c58b46] px-6 py-3.5 text-sm font-black text-black transition hover:brightness-110">
                ↓ Naloži GPX
              </a>
            )}
            {gpxData && (
              <button
                onClick={() => document.getElementById("gpx-karta")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:border-white/40">
                Preglej karto →
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-y border-white/10 bg-[#0b1a10]">
        <div className="mx-auto flex max-w-6xl flex-wrap divide-x divide-white/10">
          {tura.km != null && (
            <div className="px-6 py-5 md:px-8">
              <div className="text-xl font-black text-[#f4d7ad]">{tura.km} <span className="text-xs font-normal text-zinc-400">km</span></div>
              <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-500">Dolžina</div>
            </div>
          )}
          {tura.visinska_razlika != null && (
            <div className="px-6 py-5 md:px-8">
              <div className="text-xl font-black text-[#f4d7ad]">{tura.visinska_razlika} <span className="text-xs font-normal text-zinc-400">vm</span></div>
              <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-500">Vzpon</div>
            </div>
          )}
          {tura.tezavnost && (
            <div className="px-6 py-5 md:px-8">
              <div className="text-xl font-black text-[#f4d7ad]">{tura.tezavnost}</div>
              <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-500">Zahtevnost</div>
            </div>
          )}
          {tura.cas_ur != null && (
            <div className="px-6 py-5 md:px-8">
              <div className="text-xl font-black text-[#f4d7ad]">{casDisplay(tura.cas_ur)}</div>
              <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-500">Ocenjeni čas</div>
            </div>
          )}
          <div className="ml-auto flex items-center px-6 py-4 md:px-8">
            <Link href="/ture"
              className="rounded-full border border-white/10 px-5 py-2.5 text-xs font-bold text-zinc-400 transition hover:border-white/20 hover:text-white">
              ← Vse ture
            </Link>
          </div>
        </div>
      </section>

      {/* ── AMBASADOR + OPIS ── */}
      {(tura.ambasador || tura.opis || tura.zakaj) && (
        <section className="bg-[#0b1a10]">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="grid gap-10 lg:grid-cols-[380px_1fr] lg:gap-16 lg:items-start">

              {/* Ambassador card */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  {tura.ambasador?.foto_url ? (
                    <img src={tura.ambasador.foto_url} alt={tura.ambasador.ime}
                      className="h-16 w-16 rounded-full object-cover ring-2 ring-[#c58b46]/30" />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#c58b46]/10 ring-2 ring-[#c58b46]/20 text-2xl">
                      🚴
                    </div>
                  )}
                  <div>
                    <div className="font-black text-white">{tura.ambasador?.ime ?? "Ambasador"}</div>
                    <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c58b46]">
                      Lokalni vodič · {tura.ambasador?.regija ?? tura.regija}
                    </div>
                  </div>
                </div>

                {tura.zakaj && (
                  <blockquote className="border-l-2 border-[#c58b46]/50 pl-5">
                    <p className="font-serif text-xl font-black italic leading-8 text-[#f4d7ad]">
                      &ldquo;{tura.zakaj}&rdquo;
                    </p>
                  </blockquote>
                )}

                {tura.ambasador?.kratek_opis && (
                  <p className="text-sm leading-7 text-zinc-400">{tura.ambasador.kratek_opis}</p>
                )}
              </div>

              {/* Main description */}
              {tura.opis && (
                <div>
                  <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Zgodba ture</div>
                  <p className="text-lg leading-9 text-zinc-300">{tura.opis}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── POUDARKI ── */}
      {tura.poudarki && tura.poudarki.length > 0 && (
        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Poudarki na progi</div>
            <h2 className="mb-12 font-serif text-4xl font-black italic leading-tight md:text-5xl">
              Kaj te čaka na poti.
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {tura.poudarki.map((p, i) => (
                <article key={i}
                  className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1a10]">
                  {p.image ? (
                    <div className="relative h-52 overflow-hidden">
                      <img src={p.image} alt={p.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07110b] via-transparent to-transparent" />
                    </div>
                  ) : (
                    <div className="flex h-40 items-center justify-center bg-black/20">
                      <span className="text-4xl opacity-20">🏔️</span>
                    </div>
                  )}
                  <div className="p-6">
                    {p.badge && (
                      <span className="mb-3 inline-block rounded-full border border-[#c58b46]/35 bg-black/25 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-[#f4d7ad]">
                        {p.badge}
                      </span>
                    )}
                    <h3 className="font-serif text-xl font-black italic leading-tight text-white">{p.title}</h3>
                    {p.text && <p className="mt-3 text-sm leading-7 text-zinc-400">{p.text}</p>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── STATS + ELEVATION SIDE BY SIDE ── */}
      {(hasSurface || gpxData) && (
        <section className="border-y border-white/10 bg-[#0b1a10]">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

              {/* Left: Kakšna je vožnja */}
              <div>
                <div className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Tehnični podatki</div>
                <h2 className="mb-8 font-serif text-3xl font-black italic">Kakšna je vožnja?</h2>

                <div className="mb-8 space-y-3">
                  {tura.km != null && (
                    <div className="flex items-center justify-between border-b border-white/5 py-3">
                      <span className="text-sm text-zinc-400">Skupna razdalja</span>
                      <span className="font-black text-white">{tura.km} km</span>
                    </div>
                  )}
                  {tura.visinska_razlika != null && (
                    <div className="flex items-center justify-between border-b border-white/5 py-3">
                      <span className="text-sm text-zinc-400">Skupni vzpon</span>
                      <span className="font-black text-white">{tura.visinska_razlika} vm</span>
                    </div>
                  )}
                  {gpxData && gpxData.maxEle > 0 && (
                    <div className="flex items-center justify-between border-b border-white/5 py-3">
                      <span className="text-sm text-zinc-400">Najvišja točka</span>
                      <span className="font-black text-white">{Math.round(gpxData.maxEle)} m</span>
                    </div>
                  )}
                  {gpxData && gpxData.minEle > 0 && (
                    <div className="flex items-center justify-between border-b border-white/5 py-3">
                      <span className="text-sm text-zinc-400">Najnižja točka</span>
                      <span className="font-black text-white">{Math.round(gpxData.minEle)} m</span>
                    </div>
                  )}
                  {tura.tezavnost && (
                    <div className="flex items-center justify-between border-b border-white/5 py-3">
                      <span className="text-sm text-zinc-400">Zahtevnost</span>
                      <span className="font-black text-white">{tura.tezavnost}</span>
                    </div>
                  )}
                  {tura.tipi && tura.tipi.length > 0 && (
                    <div className="flex items-center justify-between py-3">
                      <span className="text-sm text-zinc-400">Tip kolesa</span>
                      <span className="font-black text-white">{tura.tipi.join(" / ")}</span>
                    </div>
                  )}
                </div>

                {hasSurface && (
                  <div className="space-y-4">
                    <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">Podlaga trase</div>
                    {tura.podlaga_asfalt > 0 && <SurfaceBar label="Asfalt" value={tura.podlaga_asfalt} />}
                    {tura.podlaga_makadam > 0 && <SurfaceBar label="Makadam" value={tura.podlaga_makadam} />}
                    {tura.podlaga_gozd > 0 && <SurfaceBar label="Gozdna pot" value={tura.podlaga_gozd} />}
                  </div>
                )}
              </div>

              {/* Right: Elevation chart */}
              {gpxData && (
                <div>
                  <div className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Višinski profil</div>
                  <h2 className="mb-8 font-serif text-3xl font-black italic">Profil proge.</h2>
                  <ElevationChart
                    profile={gpxData.profile}
                    km={gpxData.km}
                    vm={gpxData.vm}
                    minEle={gpxData.minEle}
                    maxEle={gpxData.maxEle}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── GPX MAP ── */}
      {gpxData && (
        <section id="gpx-karta" className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Interaktivna karta</div>
            <h2 className="mb-8 font-serif text-4xl font-black italic leading-tight md:text-5xl">Kje gre pot?</h2>
            <div className="overflow-hidden rounded-[32px] border border-white/10" style={{ height: 480 }}>
              <GpxMap points={gpxData.points} height={480} />
            </div>
            {hasGpx && (
              <div className="mt-5 flex justify-center">
                <a href={tura.gpx_url!} download
                  className="inline-flex items-center gap-2 rounded-full border border-[#c58b46]/40 px-6 py-3 text-sm font-bold text-[#f4d7ad] transition hover:bg-[#c58b46]/10">
                  ↓ Prenesi GPX datoteko
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── RITEM DNEVA ── */}
      {tura.ritem_dneva && tura.ritem_dneva.length > 0 && (
        <section className="border-y border-white/10 bg-[#0b1a10] px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Ritem dneva</div>
            <h2 className="mb-12 font-serif text-4xl font-black italic leading-tight md:text-5xl">
              Od jutra do mirnega zaključka.
            </h2>

            {/* Mobile: vertical timeline */}
            <div className="space-y-0 md:hidden">
              {tura.ritem_dneva.map((korak, i) => (
                <div key={i} className="relative flex gap-6 pb-8 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c58b46]/40 bg-[#07110b] text-sm font-black text-[#c58b46]">
                      {i + 1}
                    </div>
                    {i < (tura.ritem_dneva?.length ?? 0) - 1 && (
                      <div className="mt-1 w-px flex-1 bg-white/10" />
                    )}
                  </div>
                  <div className="pb-2 pt-1.5">
                    {korak.time && <div className="mb-1 text-[10px] font-black text-[#c58b46]">{korak.time}</div>}
                    <h4 className="font-black text-white">{korak.title}</h4>
                    {korak.text && <p className="mt-1 text-sm leading-7 text-zinc-400">{korak.text}</p>}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: horizontal cards */}
            <div className="hidden md:grid md:gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(tura.ritem_dneva.length, 5)}, 1fr)` }}>
              {tura.ritem_dneva.map((korak, i) => (
                <div key={i} className="rounded-[20px] border border-white/10 bg-black/20 p-5">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#c58b46]/40 bg-[#07110b] text-xs font-black text-[#c58b46]">
                    {i + 1}
                  </div>
                  {korak.time && <div className="mb-1 text-[10px] font-black text-[#c58b46]">{korak.time}</div>}
                  <h4 className="font-black text-white">{korak.title}</h4>
                  {korak.text && <p className="mt-2 text-xs leading-6 text-zinc-500">{korak.text}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PONUDNIKI ── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Ponudniki ob poti</div>
          <h2 className="mb-3 font-serif text-4xl font-black italic leading-tight md:text-5xl">
            Postanki, ki naredijo kolesarski dan.
          </h2>
          <p className="mb-12 max-w-2xl text-base leading-8 text-zinc-400">
            Preverili smo jih osebno in zagotavljamo kakovost izkušnje.
          </p>

          <div className="rounded-[28px] border border-dashed border-white/10 bg-[#0b1a10]/50 py-16 text-center">
            <div className="text-4xl opacity-30">🏡</div>
            <div className="mt-5 font-black text-white">Ponudniki prihajajo kmalu.</div>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-zinc-500">
              Lokalne koče, restavracije in vinske kleti ob tej trasi bodo dodane v kratkem.
            </p>
            <Link href="/ponudniki"
              className="mt-6 inline-flex rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-400 transition hover:border-[#c58b46]/40 hover:text-[#c58b46]">
              Oglej si vse ponudnike
            </Link>
          </div>
        </div>
      </section>

      {/* ── ZNAMENITOSTI ── */}
      <section className="border-t border-white/10 bg-[#0b1a10] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Znamenitosti ob poti</div>
          <h2 className="mb-3 font-serif text-4xl font-black italic leading-tight md:text-5xl">
            Razlogi, da se ustaviš.
          </h2>
          <p className="mb-12 max-w-2xl text-base leading-8 text-zinc-400">
            Razgledi, narava, kulturna dediščina in skrite točke, ki jih pozna samo lokalni kolesar.
          </p>

          <div className="rounded-[28px] border border-dashed border-white/10 bg-black/20 py-16 text-center">
            <div className="text-4xl opacity-30">⛰️</div>
            <div className="mt-5 font-black text-white">Znamenitosti prihajajo kmalu.</div>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-zinc-500">
              Razgledi, naravne točke in kulturne znamenitosti ob tej trasi bodo dodane v kratkem.
            </p>
            <Link href="/znamenitosti"
              className="mt-6 inline-flex rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-400 transition hover:border-[#c58b46]/40 hover:text-[#c58b46]">
              Oglej si vse znamenitosti
            </Link>
          </div>
        </div>
      </section>

      {/* ── GALERIJA ── */}
      {tura.galerija && tura.galerija.length > 0 && (
        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Galerija</div>
            <h2 className="mb-10 font-serif text-4xl font-black italic leading-tight md:text-5xl">Tura v slikah.</h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {tura.galerija.map((url, i) => (
                <div key={i} className="group relative aspect-square overflow-hidden rounded-[20px]">
                  <img src={url} alt={`${tura.ime} — ${i + 1}`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BOTTOM CTA ── */}
      <section className="border-t border-white/10 bg-[#0b1a10] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[36px] border border-[#c58b46]/20 bg-[#c58b46]/5">
            <div className="grid md:grid-cols-[1fr_auto] md:items-center">
              <div className="p-8 md:p-10">
                <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Kolesarski ambasadorji</div>
                <h3 className="mt-4 font-serif text-3xl font-black italic leading-tight md:text-4xl">
                  Poznaš lokalno pot, ki si zasluži biti tukaj?
                </h3>
                <p className="mt-4 max-w-xl text-base leading-8 text-zinc-400">
                  Postani ambasador in predlagaj ture iz svoje regije. Vsaka potrjena tura dobi svojo stran in postane del platforme.
                </p>
              </div>
              <div className="p-8 md:p-10">
                <Link href="/ambasador/prijava"
                  className="inline-flex rounded-full bg-[#c58b46] px-8 py-4 text-sm font-black text-black transition hover:brightness-110">
                  Predlagaj turo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
