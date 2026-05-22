"use client";

import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { useEffect, useMemo, useState } from "react";
import PageHero from "@/components/PageHero";

const regions = ["Vse", "Štajerska", "Gorenjska", "Primorska", "Koroška", "Notranjska", "Dolenjska", "Prekmurje"];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/š/g, "s")
    .replace(/č/g, "c")
    .replace(/ž/g, "z")
    .replace(/ć/g, "c")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const difficulties = ["Vse", "Lahka", "Srednja", "Zahtevna"];

const feelings = [
  "Vse",
  "Družinam prijazno",
  "e-bike friendly",
  "Za pare",
  "Gozdni pobeg",
  "Lokalni postanek",
  "Vikend ideja",
];

const tours = [
  {
    title: "Gozdni flow nad Mariborom",
    slug: "gozdni-flow-nad-mariborom",
    region: "Štajerska",
    area: "Pohorje",
    type: "MTB",
    distance: "32 km",
    elevation: "890 vm",
    difficulty: "Srednja",
    feelings: ["e-bike friendly", "Gozdni pobeg", "Lokalni postanek"],
    description: "Tura skozi pohorske gozdove, razglede in spuste, z dovolj prostora za postanek in lep kolesarski dan nad mestom.",
    image: "https://images.unsplash.com/photo-1669372701525-06dde0779ba6?q=80&w=1600&auto=format&fit=crop",
    surface: { asphalt: 10, gravel: 25, forest: 65 },
  },
  {
    title: "Med vinogradi in griči",
    slug: "med-vinogradi-in-grici",
    region: "Štajerska",
    area: "Slovenske gorice",
    type: "Gravel",
    distance: "48 km",
    elevation: "620 vm",
    difficulty: "Lahka",
    feelings: ["Za pare", "Lokalni postanek", "e-bike friendly"],
    description: "Mehkejši ritmi, vinske ceste, razgledi in postanki pri lokalnih ponudnikih.",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1600&auto=format&fit=crop",
    surface: { asphalt: 45, gravel: 40, forest: 15 },
  },
  {
    title: "Alpski pobeg ob vodi",
    slug: "alpski-pobeg-ob-vodi",
    region: "Gorenjska",
    area: "Alpe",
    type: "Bikepacking",
    distance: "86 km",
    elevation: "1450 vm",
    difficulty: "Zahtevna",
    feelings: ["Vikend ideja", "Gozdni pobeg", "Družinam prijazno"],
    description: "Večdnevna izkušnja med rekami, prelazi, vasicami in nepozabno naravo.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    surface: { asphalt: 30, gravel: 50, forest: 20 },
  },
];

function SurfaceBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-zinc-400">{label}</span>
        <span className="font-semibold">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <div className="h-full rounded-full bg-[#c58b46]" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}


function PremiumMiniProfile({ path }: { path?: string }) {
  const fallbackPath = "M0 58 C90 48 130 30 190 34 C250 38 285 18 345 24 C410 30 470 54 560 44 C610 40 635 42 640 42";
  const finalPath = path || fallbackPath;

  return (
    <svg viewBox="0 0 640 86" className="h-full w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="premiumProfileFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#c58b46" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#c58b46" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={`${finalPath} L640 86 L0 86 Z`} fill="url(#premiumProfileFill)" />
      <path
        d={finalPath}
        fill="none"
        stroke="#c58b46"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
    </svg>
  );
}

function PremiumSurfaceLine({
  surface,
}: {
  surface?: { asphalt?: number; gravel?: number; forest?: number };
}) {
  const asphalt = surface?.asphalt ?? 45;
  const gravel = surface?.gravel ?? 35;
  const forest = surface?.forest ?? 20;

  return (
    <div>
      <div className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-zinc-600">
        Sestava podlage
      </div>
      <div className="flex h-2 overflow-hidden rounded-full bg-white/10">
        <div className="bg-[#c58b46]" style={{ width: `${asphalt}%` }} />
        <div className="bg-[#746b3d]" style={{ width: `${gravel}%` }} />
        <div className="bg-emerald-500" style={{ width: `${forest}%` }} />
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-bold text-zinc-600">
        <span>• Asfalt {asphalt}%</span>
        <span>• Makadam {gravel}%</span>
        <span>• Gozdne poti {forest}%</span>
      </div>
    </div>
  );
}


const tourHighestBySlug: Record<string, string> = {
  "gozdni-flow-nad-mariborom": "1.120",
  "med-vinogradi-in-grici": "540",
  "alpski-pobeg-ob-vodi": "1.680",
  "soska-kolesarska-pot": "420",
  "kranjska-gora-panorama": "970",
  "prekmurska-ravninska-pot": "220",
  "koroska-pot-ob-dravi": "680",
  "dolenjska-pot-med-gradovi": "510",
};

function metricValue(value: unknown, suffix: string) {
  const raw = String(value ?? "").trim();
  if (!raw) return "—";
  if (raw.toLowerCase().includes(suffix.toLowerCase())) return raw;
  return `${raw} ${suffix}`;
}

function PremiumTourCard({ tour, index }: { tour: any; index: number }) {
  const href = `/main-preview/ture/${tour.slug}`;
  const feelings = tour.feelings ?? tour.feeling ?? [];
  const region = tour.region ?? "";
  const area = tour.area ?? "";
  const type = tour.type ?? "";
  const highest = tour.highest ?? tour.highestPoint ?? tour.maxElevation ?? tourHighestBySlug[tour.slug] ?? "—";
  const season = tour.season ?? "Apr–Nov";
  const ambassador = tour.ambassador ?? tour.author ?? "Bojan Ratej";
  const ambassadorRole =
    tour.ambassadorRole ?? (region ? `Ambasador ${region}` : "Lokalni ambasador");

  return (
    <article className="group flex h-[790px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1a10] transition duration-300 hover:-translate-y-1 hover:border-[#c58b46]/40">
      <div
        className="relative h-[250px] shrink-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${tour.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a10] via-[#0b1a10]/25 to-black/10" />

        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-200 backdrop-blur">
          {tour.difficulty}
        </div>

        <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-200 backdrop-blur">
          {type}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#c58b46]">
            {region}{area ? ` · ${area}` : ""}
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-6">
        <div className="mb-4 flex h-[30px] flex-wrap items-start gap-2 overflow-hidden">
          {feelings.slice(0, 3).map((item: string) => (
            <span
              key={item}
              className="rounded-full border border-[#c58b46]/25 bg-[#c58b46]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#f4d7ad]"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-[34px_1fr] gap-3">
          <div className="pt-1 font-serif text-2xl font-black italic leading-none text-[#f4d7ad]/35">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="min-w-0">
            <h2 className="h-[68px] overflow-hidden font-serif text-[25px] font-black italic leading-[1.05] tracking-tight text-white">
              {tour.title}
            </h2>

            <p className="mt-3 h-[84px] overflow-hidden text-sm leading-7 text-zinc-400">
              {tour.description}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-4 overflow-hidden rounded-2xl border border-white/10 bg-black/15">
          {[
            [metricValue(tour.distance, "km"), "dolžina"],
            [metricValue(tour.elevation, "vm"), "vzpon"],
            [metricValue(highest, "m"), "najvišje"],
            [season, "sezona"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="min-w-0 border-r border-white/10 px-2 py-3 text-center last:border-r-0"
            >
              <div className="whitespace-nowrap font-serif text-[14px] font-black leading-none tracking-tight text-[#f4d7ad] md:text-[15px]">
                {value}
              </div>
              <div className="mt-2 whitespace-nowrap text-[9px] font-black uppercase tracking-[0.12em] text-zinc-400 md:text-[10px]">
                {label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <div className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-600">
            Višinski profil
          </div>
          <div className="h-[72px]">
            <PremiumMiniProfile path={tour.profile} />
          </div>
        </div>

        <div className="mt-4 h-[58px]">
          <PremiumSurfaceLine surface={tour.surface} />
        </div>

        <div className="mt-auto flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <div className="truncate text-[10px] font-black uppercase tracking-[0.18em] text-zinc-600">
              {ambassadorRole}
            </div>
            <div className="mt-1 truncate text-xs font-black uppercase tracking-[0.14em] text-[#f4d7ad]">
              {ambassador}
            </div>
          </div>

          <Link
            href={href}
            className="shrink-0 text-[10px] font-black uppercase tracking-[0.18em] text-[#c58b46]"
          >
            Oglej si turo →
          </Link>
        </div>
      </div>
    </article>
  );
}


export default function ToursPage() {
  const [activeRegion, setActiveRegion] = useState("Vse");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const regionFromUrl = params.get("pokrajina") || params.get("regija");

    if (!regionFromUrl) return;

    const matchedRegion = regions.find(
      (region) => slugify(region) === regionFromUrl
    );

    if (matchedRegion) {
      setActiveRegion(matchedRegion);
    }
  }, []);

  const [activeDifficulty, setActiveDifficulty] = useState("Vse");
  const [activeFeeling, setActiveFeeling] = useState("Vse");

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const regionMatch = activeRegion === "Vse" || tour.region === activeRegion;
      const difficultyMatch =
        activeDifficulty === "Vse" || tour.difficulty === activeDifficulty;
      const feelingMatch =
        activeFeeling === "Vse" || tour.feelings.includes(activeFeeling);

      return regionMatch && difficultyMatch && feelingMatch;
    });
  }, [activeRegion, activeDifficulty, activeFeeling]);

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/" active="ture" />

            <PageHero
        eyebrow="Kolesarski dnevi"
        title="Poišči turo, ki paše tvojemu dnevu."
        titleClassName="font-serif italic"
        description="Izberi po pokrajini, zahtevnosti ali občutku. Vsaka tura ostane praktična za kolesarja, a je zasnovana kot cel dan: pot, razgled, postanek in doživetje ob poti."
        image="/images/preview/hero-family-bike.png"
        imageAlt="Kolesarska tura skozi gozd"
        imagePosition="center"
      />

      <section className="border-y border-white/10 bg-[#0b1a10]/70 px-6 py-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#c58b46]">
                Poišči turo zase
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
                Izberi pokrajino, zahtevnost ali občutek dneva. Filtri so tu kot pomoč — glavna zgodba ostaja tura.
              </p>
            </div>

            <div className="text-sm text-zinc-500">
              {filteredTours.length} {filteredTours.length === 1 ? "tura" : "ture"}
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                Pokrajina
              </span>
              <select
                value={activeRegion}
                onChange={(event) => setActiveRegion(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-[#c58b46]/60"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                Zahtevnost
              </span>
              <select
                value={activeDifficulty}
                onChange={(event) => setActiveDifficulty(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-[#c58b46]/60"
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                Občutek
              </span>
              <select
                value={activeFeeling}
                onChange={(event) => setActiveFeeling(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-[#c58b46]/60"
              >
                {feelings.map((feeling) => (
                  <option key={feeling} value={feeling}>
                    {feeling}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#c58b46]">
                Izbrane ture
              </div>
              <h2 className="mt-3 font-serif text-4xl font-black italic tracking-tight md:text-5xl">
                Ture, ki ustrezajo tvoji izbiri.
              </h2>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {filteredTours.map((tour, index) => (
              <PremiumTourCard key={tour.slug} tour={tour} index={index} />
            ))}
          </div>
        </div>
      </section>
    
      <section className="border-y border-white/10 bg-[#07130b] px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[36px] border border-[#c58b46]/20 bg-[#c58b46]/10 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Skupnost lokalnih kolesarjev
            </div>

            <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-white md:text-4xl font-serif italic">
              Poznaš pot, ki si zasluži mesto med izbranimi turami?
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">
              Predlagaj traso, ki jo poznaš, si jo prevozil ali bi jo priporočil
              drugim. Tura ostane povezana s teboj, mi pa jo pomagamo pripraviti
              za objavo.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              href="/predlagaj-turo"
              className="rounded-full bg-[#c58b46] px-7 py-4 text-sm font-black text-black"
            >
              Predlagaj svojo turo
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
