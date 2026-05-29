"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import SiteHeader from "@/components/SiteHeader";
import ElevationChart from "@/components/ElevationChart";
import { supabase } from "@/lib/supabase";
import { parseGpx, type ParsedGpx } from "@/lib/parseGpx";
import { minDistanceToPolyline, formatDistance } from "@/lib/distance";

const GpxMap = dynamic(() => import("@/components/GpxMap"), { ssr: false });

// ── helpers ──────────────────────────────────────────────────────────────────

function casDisplay(casUr: number | null): string {
  if (!casUr) return "—";
  if (casUr <= 2) return "1–2 uri";
  if (casUr <= 3) return "2–3 ure";
  if (casUr <= 5) return "3–5 ur";
  if (casUr <= 7) return "5–7 ur";
  if (casUr <= 9) return "Cel dan";
  return "Več dni";
}

// ── types ─────────────────────────────────────────────────────────────────────

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

// ── sub-components ───────────────────────────────────────────────────────────

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/15 bg-black/25 px-4 py-2 text-xs font-bold text-zinc-100 backdrop-blur-md">
      {children}
    </span>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-r border-white/10 px-5 py-5 last:border-r-0 md:px-8">
      <div className="text-2xl font-black leading-none text-[#f4d7ad]">{value}</div>
      <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">{label}</div>
    </div>
  );
}

function SurfaceBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm font-bold text-zinc-300">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-[#c58b46]" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function HighlightCard({ image, badge, title, text }: { image?: string; badge: string; title: string; text: string }) {
  return (
    <article className="overflow-hidden rounded-[26px] border border-white/10 bg-[#0b1a10]">
      {image ? (
        <div className="h-[230px] bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
          <div className="flex h-full items-start p-4">
            <span className="rounded-full border border-[#c58b46]/35 bg-black/45 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#f4d7ad] backdrop-blur">
              {badge}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex h-[230px] items-start bg-black/20 p-4">
          <span className="rounded-full border border-[#c58b46]/35 bg-black/45 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#f4d7ad]">
            {badge}
          </span>
        </div>
      )}
      <div className="p-6">
        <h3 className="font-serif text-2xl font-bold italic leading-tight text-white">{title}</h3>
        <p className="mt-4 min-h-[84px] text-sm leading-7 text-zinc-400">{text}</p>
      </div>
    </article>
  );
}

function ProviderCard({ image, type, title, distance, text, href }: {
  image?: string; type: string; title: string; distance: string; text: string; href?: string;
}) {
  return (
    <article className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0b1a10] transition hover:-translate-y-1 hover:border-[#c58b46]/35">
      <div className="relative h-[190px] bg-cover bg-center bg-black/30"
        style={image ? { backgroundImage: `url(${image})` } : {}}>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a10] via-transparent to-transparent" />
        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-200 backdrop-blur">
          {type}
        </div>
        <div className="absolute bottom-4 right-4 text-[10px] font-black uppercase tracking-[0.16em] text-[#c58b46]">
          {distance}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-serif text-2xl font-bold italic text-white">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-zinc-400">{text}</p>
        {href && (
          <Link href={href}
            className="mt-5 inline-block rounded-full border border-[#c58b46]/40 px-5 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-[#c58b46] transition hover:bg-[#c58b46] hover:text-black">
            Ogled ponudnika
          </Link>
        )}
      </div>
    </article>
  );
}

function PoiCard({ image, type, title, distance, text }: {
  image?: string; type: string; title: string; distance: string; text: string;
}) {
  return (
    <article className="overflow-hidden rounded-[22px] border border-white/10 bg-[#0b1a10]">
      <div className="relative h-[150px] bg-cover bg-center bg-black/30"
        style={image ? { backgroundImage: `url(${image})` } : {}}>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a10] via-transparent to-transparent" />
        <div className="absolute left-3 top-3 rounded-full bg-black/45 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#f4d7ad]">
          {type}
        </div>
        <div className="absolute bottom-3 right-3 rounded-full bg-black/45 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#c58b46]">
          {distance}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-xl font-bold italic text-white">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p>
      </div>
    </article>
  );
}

function WeatherCard() {
  const days: [string, string, string, string][] = [
    ["Danes", "☀️", "18°", "delno jasno"],
    ["Jutri", "🌤️", "15°", "sončno"],
    ["Pojutrišnjem", "🌧️", "12°", "možna ploha"],
  ];
  return (
    <div className="rounded-[24px] border border-white/10 bg-[#0b1a10] p-5">
      <div className="text-[10px] font-black uppercase tracking-[0.24em] text-zinc-500">Vreme na progi</div>
      <h3 className="mt-2 font-serif text-xl font-black italic text-white">Napoved za lokacijo</h3>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {days.map(([day, icon, temp, text]) => (
          <div key={day} className="rounded-2xl border border-white/10 bg-black/15 p-3 text-center">
            <div className="text-[10px] font-bold text-zinc-500">{day}</div>
            <div className="mt-2 text-2xl">{icon}</div>
            <div className="mt-1 text-2xl font-black text-[#f4d7ad]">{temp}</div>
            <div className="mt-1 text-[11px] text-zinc-500">{text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BoschCard({ km, vm }: { km: number; vm: number }) {
  const [weight, setWeight] = useState(88);
  const [battery, setBattery] = useState(900);
  const [mode, setMode] = useState("Trail");

  const batteryResult = useMemo(() => {
    const base = mode === "Eco" ? 180 : mode === "Trail" ? 280 : 420;
    const usedWh = Math.round(base + weight * 0.9 + vm * 0.12);
    const usedPercent = Math.min(Math.round((usedWh / battery) * 100), 100);
    const remaining = Math.max(100 - usedPercent, 0);
    return {
      usedWh, usedPercent, remaining,
      message: remaining > 50
        ? `Odlično! Prideš domov s približno ${remaining}% baterije.`
        : remaining > 25
          ? "Doseg bo dovolj, ampak pazi na porabo baterije."
          : "Pozor! Za to turo potrebuješ večjo baterijo ali Eco način.",
    };
  }, [weight, battery, mode, vm]);

  return (
    <div className="rounded-[24px] border border-[#c58b46]/25 bg-[#0b1a10] p-5">
      <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[#c58b46]">eBike kalkulator dosega</div>
      <h3 className="mt-2 font-serif text-xl font-black italic text-white">Bosch Performance Line CX</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-500">
        Bosch uporabljamo kot referenčni izračun. Vezan je na dolžino ({km} km) in višino ({vm} vm) te ture.
      </p>

      <div className="mt-5 space-y-5">
        <label className="block">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">Teža kolesarja</span>
            <span className="text-xl font-black text-[#f4d7ad]">{weight} kg</span>
          </div>
          <input type="range" min="50" max="120" step="1" value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full accent-[#c58b46]" />
          <div className="mt-1 flex justify-between text-[10px] font-bold text-zinc-600">
            <span>50 kg</span><span>120 kg</span>
          </div>
        </label>

        <label className="block">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">Kapaciteta baterije</span>
            <span className="text-xl font-black text-[#f4d7ad]">{battery} Wh</span>
          </div>
          <input type="range" min="250" max="1000" step="25" value={battery}
            onChange={(e) => setBattery(Number(e.target.value))}
            className="w-full accent-[#c58b46]" />
          <div className="mt-1 flex justify-between text-[10px] font-bold text-zinc-600">
            <span>250 Wh</span><span>1000 Wh</span>
          </div>
        </label>

        <div>
          <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">Način podpore</div>
          <div className="grid grid-cols-3 gap-2">
            {["Eco", "Trail", "eMTB"].map((item) => (
              <button key={item} onClick={() => setMode(item)}
                className={`rounded-2xl px-3 py-3 text-xs font-semibold transition ${mode === item
                  ? "bg-[#c58b46] text-black"
                  : "border border-white/10 bg-black/20 text-zinc-300"}`}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-zinc-400">Poraba za turo</div>
          <div className="text-xl font-black text-white">{batteryResult.usedWh} Wh ({batteryResult.usedPercent}%)</div>
        </div>
        <div className="mt-5 h-4 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-[#36d399]" style={{ width: `${batteryResult.remaining}%` }} />
        </div>
        <div className="mt-4 text-sm text-zinc-400">Ostane približno {batteryResult.remaining}% baterije.</div>
        <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-bold text-emerald-300">
          {batteryResult.message}
        </div>
      </div>
    </div>
  );
}

// ── main page ─────────────────────────────────────────────────────────────────

type NearbyPonudnik = {
  id: string;
  ime: string;
  tip: string | null;
  opis: string | null;
  hero_image: string | null;
  distanceM: number;
};

export default function TuraDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [tura, setTura] = useState<Tura | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [gpxData, setGpxData] = useState<ParsedGpx | null>(null);
  const [nearbyPonudniki, setNearbyPonudniki] = useState<NearbyPonudnik[]>([]);

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
      setTura({ ...data, ambasador: amb });
      setLoading(false);

      if (data.gpx_url) {
        try {
          const res = await fetch(data.gpx_url as string);
          const xml = await res.text();
          const parsed = parseGpx(xml);
          if (parsed.points.length > 0) {
            setGpxData(parsed);

            // Poišči ponudnike v radiju 2 km od trase
            const { data: vsiPonudniki } = await supabase
              .from("predlogi_ponudnikov")
              .select("id, ime, tip, opis, hero_image, lat, lng")
              .eq("status", "approved")
              .not("lat", "is", null)
              .not("lng", "is", null);

            if (vsiPonudniki) {
              const MAX_DIST = 2000; // 2 km
              const nearby = vsiPonudniki
                .map((p) => ({
                  id: p.id,
                  ime: p.ime,
                  tip: p.tip,
                  opis: p.opis,
                  hero_image: p.hero_image,
                  distanceM: minDistanceToPolyline(p.lat, p.lng, parsed.points),
                }))
                .filter((p) => p.distanceM <= MAX_DIST)
                .sort((a, b) => a.distanceM - b.distanceM);
              setNearbyPonudniki(nearby);
            }
          }
        } catch { /* tiho */ }
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#080f0b] text-white">
        <SiteHeader backHref="/ture" active="ture" />
        <div className="flex min-h-[60vh] items-center justify-center text-zinc-500">Nalagam turo...</div>
      </main>
    );
  }

  if (notFound || !tura) {
    return (
      <main className="min-h-screen bg-[#080f0b] text-white">
        <SiteHeader backHref="/ture" active="ture" />
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
          <div className="text-6xl">🚵</div>
          <h1 className="font-serif text-3xl font-black italic">Tura ni najdena.</h1>
          <p className="text-zinc-500">Ta tura morda še ni bila odobrena ali ne obstaja.</p>
          <Link href="/ture" className="rounded-full bg-[#c58b46] px-8 py-4 text-sm font-black text-black">← Vse ture</Link>
        </div>
      </main>
    );
  }

  // Build stats
  const stats = [
    tura.km != null ? { value: `${tura.km} km`, label: "Dolžina trase" } : null,
    tura.visinska_razlika != null ? { value: `${tura.visinska_razlika} vm`, label: "Skupni vzpon" } : null,
    gpxData && gpxData.maxEle > 0 ? { value: `${Math.round(gpxData.maxEle)} m`, label: "Najvišja točka" } : null,
    tura.tezavnost ? { value: tura.tezavnost, label: "Zahtevnost" } : null,
    tura.cas_ur != null ? { value: casDisplay(tura.cas_ur), label: "Ocenjeni čas" } : null,
  ].filter(Boolean) as { value: string; label: string }[];

  const hasSurface = tura.podlaga_asfalt > 0 || tura.podlaga_makadam > 0 || tura.podlaga_gozd > 0;
  const hasEbike = tura.km != null && tura.visinska_razlika != null;

  return (
    <main className="min-h-screen bg-[#080f0b] text-white">
      <SiteHeader backHref="/ture" active="ture" />

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] overflow-hidden">
        {tura.hero_image && (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${tura.hero_image})` }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-[#07110b]/20 to-[#07110b]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07110b]/45 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[calc(92vh-80px)] max-w-6xl flex-col justify-end px-6 pb-16 pt-36">
          <div className="max-w-4xl">
            <div className="text-xs font-black uppercase tracking-[0.34em] text-[#c58b46]">
              {tura.tipi?.join(" · ")}{tura.regija ? ` · ${tura.regija}` : ""}{tura.obmocje ? ` · ${tura.obmocje}` : ""}
            </div>

            <h1 className="mt-6 font-serif text-6xl font-black italic leading-[0.9] tracking-tight text-white md:text-8xl">
              {tura.ime}
            </h1>

            {tura.opis && (
              <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300">
                {tura.opis.length > 160 ? `${tura.opis.slice(0, 160).trimEnd()}…` : tura.opis}
              </p>
            )}

            {tura.tipi && tura.tipi.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {tura.tipi.map((t) => <Pill key={t}>{t}</Pill>)}
                {tura.gpx_url && <Pill>GPX pripravljen</Pill>}
              </div>
            )}

            <div className="mt-9 flex flex-wrap gap-4">
              {tura.gpx_url && (
                <a href={tura.gpx_url} download
                  className="rounded-full bg-[#c58b46] px-7 py-3 text-sm font-black text-black transition hover:brightness-110">
                  Naloži GPX
                </a>
              )}
              {gpxData && (
                <button
                  onClick={() => document.getElementById("gpx-karta")?.scrollIntoView({ behavior: "smooth" })}
                  className="rounded-full border border-[#c58b46]/40 px-7 py-3 text-sm font-black text-[#f4d7ad] transition hover:bg-[#c58b46]/10">
                  Preglej GPX
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      {stats.length > 0 && (
        <section className="border-y border-white/10 bg-[#0b1a10]">
          <div className="mx-auto grid max-w-6xl" style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}>
            {stats.map((s) => <Metric key={s.label} value={s.value} label={s.label} />)}
          </div>
        </section>
      )}

      {/* ── MAIN CONTENT + SIDEBAR ── */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start lg:grid-cols-[1fr_360px]">

        {/* ── MAIN ── */}
        <div className="min-w-0">

          {/* Ambassador + Opis */}
          {(tura.ambasador || tura.zakaj || tura.opis) && (
            <section className="border-b border-white/10 px-6 py-14">
              <div className="rounded-[28px] border border-[#c58b46]/25 bg-[#0b1a10] p-7">
                <div className="grid gap-6 md:grid-cols-[260px_1fr] md:items-center">
                  <div className="flex items-center gap-4">
                    {tura.ambasador?.foto_url ? (
                      <img src={tura.ambasador.foto_url} alt={tura.ambasador.ime}
                        className="h-16 w-16 rounded-full border-2 border-[#c58b46]/35 object-cover" />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#c58b46]/35 bg-[#c58b46]/10 text-2xl">
                        🚴
                      </div>
                    )}
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[#c58b46]">Izbral lokalni ambasador</div>
                      <div className="mt-1 text-2xl font-bold">{tura.ambasador?.ime ?? "Ambasador"}</div>
                      <div className="text-xs font-bold text-zinc-500">
                        Ambasador {tura.ambasador?.regija ?? tura.regija}
                      </div>
                    </div>
                  </div>
                  {tura.zakaj && (
                    <blockquote className="border-l border-[#c58b46]/35 pl-6 text-lg font-semibold leading-8 text-zinc-300">
                      &ldquo;{tura.zakaj}&rdquo;
                    </blockquote>
                  )}
                </div>
              </div>

              {tura.ambasador?.kratek_opis && (
                <div className="mt-6 rounded-[24px] border border-white/10 bg-[#0b1a10] p-6">
                  <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[#c58b46]">Ambasadorjev namig</div>
                  <h3 className="mt-2 font-serif text-2xl font-bold italic">Tura z najlepšimi trenutki.</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">{tura.ambasador.kratek_opis}</p>
                </div>
              )}
            </section>
          )}

          {/* Ritem dneva */}
          {tura.ritem_dneva && tura.ritem_dneva.length > 0 && (
            <section className="border-b border-white/10 px-6 py-16">
              <div className="text-xs font-black uppercase tracking-[0.34em] text-[#c58b46]">Ritem dneva</div>
              <h2 className="mt-3 font-serif text-4xl font-bold italic">Od jutra do mirnega zaključka.</h2>
              <div className="mt-10 grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(tura.ritem_dneva.length, 5)}, 1fr)` }}>
                {tura.ritem_dneva.map((korak, i) => (
                  <div key={i} className="border-l border-[#c58b46]/30 pl-5">
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-[#c58b46]">{korak.time || `${i + 1}.`}</div>
                    <h3 className="mt-3 font-serif text-xl font-bold italic">{korak.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">{korak.text}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Poudarki */}
          {tura.poudarki && tura.poudarki.length > 0 && (
            <section className="border-b border-white/10 px-6 py-16">
              <div className="text-xs font-black uppercase tracking-[0.34em] text-[#c58b46]">Poudarki na progi</div>
              <h2 className="mt-4 font-serif text-5xl font-bold italic leading-tight">Kaj te čaka na poti</h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-400">
                Najprej vidiš turo, nato kdo jo je izbral, potem pa takoj dobiš odgovor: zakaj bi šel na to pot in kaj boš na njej doživel.
              </p>
              <div className="mt-10 grid gap-5 lg:grid-cols-3">
                {tura.poudarki.map((p, i) => (
                  <HighlightCard key={i} image={p.image} badge={p.badge} title={p.title} text={p.text} />
                ))}
              </div>
            </section>
          )}

          {/* Ponudniki */}
          <section className="border-b border-white/10 px-6 py-16">
            <div className="text-xs font-black uppercase tracking-[0.34em] text-[#c58b46]">Postanek, ki dopolni dan</div>
            <h2 className="mt-3 font-serif text-4xl font-bold italic">Postanki, ki naredijo kolesarski dan.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
              Ponudniki niso dodatek na koncu. So razlog, da se tura spremeni v dan, ki ga priporočiš prijatelju.
            </p>
            <div className="mt-8">
              {nearbyPonudniki.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2">
                  {nearbyPonudniki.map((p) => (
                    <Link key={p.id} href={`/ponudniki/${p.id}`}
                      className="group flex overflow-hidden rounded-[24px] border border-white/10 bg-[#0b1a10] transition hover:border-[#c58b46]/35">
                      <div className="relative w-36 shrink-0 bg-black/30 bg-cover bg-center"
                        style={p.hero_image ? { backgroundImage: `url(${p.hero_image})` } : {}}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0b1a10]/40" />
                        {!p.hero_image && <div className="flex h-full items-center justify-center text-3xl opacity-20">🏡</div>}
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-5">
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            {p.tip && <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#c58b46]">{p.tip}</span>}
                            <span className="ml-auto rounded-full border border-[#c58b46]/30 px-3 py-1 text-[10px] font-black text-[#c58b46]">
                              {formatDistance(p.distanceM)}
                            </span>
                          </div>
                          <h3 className="mt-2 font-serif text-xl font-bold italic text-white">{p.ime}</h3>
                          {p.opis && <p className="mt-2 text-xs leading-6 text-zinc-400 line-clamp-2">{p.opis}</p>}
                        </div>
                        <div className="mt-3 text-xs font-black text-[#c58b46] transition group-hover:underline">Poglej ponudnika →</div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="rounded-[24px] border border-dashed border-white/10 bg-[#0b1a10] py-14 text-center">
                  <div className="text-3xl opacity-30">🏡</div>
                  <div className="mt-4 font-black text-white">V radiju 2 km ni dodanih ponudnikov.</div>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-7 text-zinc-500">
                    Ko bo ambasador dodal ponudnika v bližini te trase, se bo samodejno prikazal tukaj.
                  </p>
                  <Link href="/ponudniki"
                    className="mt-5 inline-flex rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-400 transition hover:border-[#c58b46]/40 hover:text-[#c58b46]">
                    Oglej si vse ponudnike
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* Technical: Kakšna je vožnja */}
          {(hasSurface || gpxData) && (
            <section id="voznja" className="border-b border-white/10 px-6 py-16">
              <div className="rounded-[30px] border border-white/10 bg-[#0b1a10] p-7 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:gap-6">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.34em] text-[#c58b46]">Tehnične podrobnosti</div>
                  <h2 className="mt-3 font-serif text-4xl font-bold italic">Kakšna je vožnja?</h2>
                  <p className="mt-4 text-sm leading-7 text-zinc-400">
                    Gozdna, razgibana in igriva. Dovolj podatkov, da veš, kaj te čaka — in dovolj občutka, da razumeš, zakaj je tura vredna dneva.
                  </p>
                  <div className="mt-7 grid grid-cols-2 gap-3">
                    {([
                      tura.km != null ? ["Dolžina", `${tura.km} km`] : null,
                      tura.visinska_razlika != null ? ["Skupni vzpon", `${tura.visinska_razlika} vm`] : null,
                      gpxData && gpxData.maxEle > 0 ? ["Najvišja točka", `${Math.round(gpxData.maxEle)} m`] : null,
                      gpxData && gpxData.minEle > 0 ? ["Najnižja točka", `${Math.round(gpxData.minEle)} m`] : null,
                      tura.tezavnost ? ["Zahtevnost", tura.tezavnost] : null,
                      tura.tipi && tura.tipi.length > 0 ? ["Tip kolesa", tura.tipi.join(" / ")] : null,
                    ] as ([string, string] | null)[]).filter((x): x is [string, string] => x !== null).map(([label, value]) => (
                      <div key={label as string} className="rounded-2xl border border-white/10 bg-black/15 p-4">
                        <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#c58b46]">{label}</div>
                        <div className="mt-2 text-lg font-black text-zinc-100">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-col justify-between lg:mt-0">
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.34em] text-[#c58b46]">Sestava podlage</div>
                    <h3 className="mt-3 font-serif text-4xl font-bold italic">Razgibana, gozdna in igriva</h3>
                    {hasSurface && (
                      <div className="mt-7 space-y-5">
                        {tura.podlaga_asfalt > 0 && <SurfaceBar label="Asfalt" value={tura.podlaga_asfalt} />}
                        {tura.podlaga_makadam > 0 && <SurfaceBar label="Makadam" value={tura.podlaga_makadam} />}
                        {tura.podlaga_gozd > 0 && <SurfaceBar label="Gozdna pot" value={tura.podlaga_gozd} />}
                      </div>
                    )}
                  </div>
                  {gpxData && (
                    <div className="mt-8">
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

          {/* GPX Map */}
          {gpxData && (
            <section id="gpx-karta" className="border-b border-white/10 px-6 py-16">
              <div className="text-xs font-black uppercase tracking-[0.34em] text-[#c58b46]">Trasa ture</div>
              <h2 className="mt-3 font-serif text-4xl font-bold italic">Kje gre pot?</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
                Zemljevid in GPX sta osnova. Najprej vidiš občutek dneva, potem pa točno pot, ki jo lahko preneseš na svojo napravo.
              </p>
              <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10" style={{ height: 480 }}>
                <GpxMap points={gpxData.points} height={480} />
              </div>
              {tura.gpx_url && (
                <div className="mt-5 flex gap-3">
                  <a href={tura.gpx_url} download
                    className="rounded-full border border-[#c58b46]/40 px-5 py-3 text-xs font-black text-[#c58b46] transition hover:bg-[#c58b46]/10">
                    Prenesi GPX
                  </a>
                </div>
              )}
            </section>
          )}

          {/* Znamenitosti */}
          <section className="border-b border-white/10 px-6 py-16">
            <div className="text-xs font-black uppercase tracking-[0.34em] text-[#c58b46]">Znamenitosti ob poti</div>
            <h2 className="mt-3 font-serif text-4xl font-bold italic">Razlogi, da se ustaviš.</h2>
            <div className="mt-8">
              <div className="rounded-[22px] border border-dashed border-white/10 bg-[#0b1a10] py-14 text-center">
                <div className="text-3xl opacity-30">⛰️</div>
                <div className="mt-4 font-black text-white">Na tej trasi ni dodanih znamenitosti.</div>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-7 text-zinc-500">
                  Ambasador za to turo še ni označil lokalnih razgledov in zanimivosti.
                </p>
                <Link href="/znamenitosti"
                  className="mt-5 inline-flex rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-400 transition hover:border-[#c58b46]/40 hover:text-[#c58b46]">
                  Oglej si vse znamenitosti
                </Link>
              </div>
            </div>
          </section>

          {/* Galerija */}
          {tura.galerija && tura.galerija.length > 0 && (
            <section className="px-6 py-16">
              <div className="text-xs font-black uppercase tracking-[0.34em] text-[#c58b46]">Galerija z utrinki</div>
              <h2 className="mt-3 font-serif text-4xl font-bold italic">Tura v slikah.</h2>
              <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
                {tura.galerija.map((url, i) => (
                  <div key={i}
                    className={`rounded-[24px] bg-cover bg-center ${i === 0 ? "col-span-2 row-span-2 h-[420px]" : "h-[204px]"}`}
                    style={{ backgroundImage: `url(${url})` }} />
                ))}
              </div>
            </section>
          )}

        </div>

        {/* ── SIDEBAR ── */}
        <aside className="hidden self-start border-l border-white/10 px-6 py-10 lg:sticky lg:top-20 lg:block">
          <div className="space-y-5">
            <WeatherCard />

            {hasEbike && (
              <BoschCard km={tura.km!} vm={tura.visinska_razlika!} />
            )}

            <div className="rounded-[24px] border border-white/10 bg-[#0b1a10] p-5">
              <div className="text-[10px] font-black uppercase tracking-[0.24em] text-zinc-500">Hitri povzetek</div>
              <div className="mt-4 space-y-3 text-sm">
                {([
                  tura.tipi && tura.tipi.length > 0 ? ["Za koga", tura.tipi.join(" / ")] : null,
                  tura.tezavnost ? ["Zahtevnost", tura.tezavnost] : null,
                  tura.regija ? ["Regija", tura.regija] : null,
                  tura.obmocje ? ["Območje", tura.obmocje] : null,
                  tura.cas_ur != null ? ["Čas", casDisplay(tura.cas_ur)] : null,
                ] as ([string, string] | null)[]).filter((x): x is [string, string] => x !== null).map(([label, value]) => (
                  <div key={label as string} className="flex justify-between border-b border-white/10 pb-3 last:border-0">
                    <span className="text-zinc-500">{label}</span>
                    <span className="font-bold text-zinc-200">{value}</span>
                  </div>
                ))}
              </div>
              {tura.gpx_url && (
                <a href={tura.gpx_url} download
                  className="mt-5 block w-full rounded-full border border-[#c58b46]/35 px-4 py-3 text-center text-xs font-black uppercase tracking-[0.12em] text-[#c58b46] transition hover:bg-[#c58b46] hover:text-black">
                  Prenesi GPX
                </a>
              )}
            </div>
          </div>
        </aside>

      </div>

      {/* ── CTA ── */}
      <section className="border-t border-white/10 bg-[#0b1a10] px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[30px] border border-[#c58b46]/25 bg-[#11170d] p-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.3em] text-[#c58b46]">Predlagaj svojo turo</div>
            <h2 className="mt-3 font-serif text-4xl font-bold italic">Poznaš lokalno pot, ki si zasluži biti tukaj?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
              Pomagaj nam graditi zbirko kolesarskih dni, ki imajo zgodbo, ritem, postanek in lokalni podpis.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/ambasador/prijava"
              className="rounded-full bg-[#c58b46] px-7 py-3 text-center text-sm font-black text-black transition hover:brightness-110">
              Predlagaj svojo turo
            </Link>
            <Link href="/ture"
              className="rounded-full border border-[#c58b46]/35 px-7 py-3 text-center text-sm font-black text-[#c58b46] transition hover:bg-[#c58b46]/10">
              Vse ture
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
