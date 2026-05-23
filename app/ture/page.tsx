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
        description="Izberi po pokrajini, zahtevnosti ali občutku. Vsaka tura ostane praktična za kolesarja, a je zasnovana kot cel dan: pot, razgled, postanek in doživetje ob poti."
        image="https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?q=80&w=1800&auto=format&fit=crop"
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
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <div className="text-xs uppercase tracking-[0.25em] text-[#c58b46]">
              Izbrane ture
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              Ture, ki ustrezajo tvoji izbiri.
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {filteredTours.map((tour) => (
              <article
                key={tour.slug}
                className="flex h-full flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1a10]"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07110b] via-transparent to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <div className="mb-4 flex items-center justify-between gap-4 text-sm text-zinc-400">
                    <span>{tour.region} • {tour.area}</span>
                    <span>{tour.type}</span>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {tour.feelings.map((feeling) => (
                      <span
                        key={feeling}
                        className="rounded-full border border-[#c58b46]/30 bg-[#c58b46]/10 px-3 py-1.5 text-xs font-semibold text-[#f4d7ad]"
                      >
                        {feeling}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-3xl font-black leading-tight">{tour.title}</h2>

                  <p className="mt-5 leading-7 text-zinc-400">{tour.description}</p>

                  <div className="mt-6 flex flex-wrap gap-3 text-sm">
                    <span className="rounded-full border border-white/10 px-4 py-2">{tour.distance}</span>
                    <span className="rounded-full border border-white/10 px-4 py-2">{tour.elevation}</span>
                    <span className="rounded-full border border-white/10 px-4 py-2">{tour.difficulty}</span>
                  </div>

                  <div className="mt-7 rounded-2xl border border-white/10 bg-black/20 p-5">
                    <div className="mb-5 font-bold">Podlaga</div>
                    <div className="space-y-4">
                      <SurfaceBar label="Asfalt" value={tour.surface.asphalt} />
                      <SurfaceBar label="Makadam" value={tour.surface.gravel} />
                      <SurfaceBar label="Gozdna pot" value={tour.surface.forest} />
                    </div>
                  </div>

                  <Link
                    href={`/ture/${tour.slug}`}
                    className="mt-auto inline-flex w-full justify-center rounded-full bg-[#c58b46] px-6 py-4 text-sm font-bold text-black transition hover:opacity-90"
                  >
                    Odpri turo
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    
      <section className="border-y border-white/10 bg-[#07110b] px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[36px] border border-[#c58b46]/20 bg-[#c58b46]/10 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Skupnost lokalnih kolesarjev
            </div>

            <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-white md:text-4xl">
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
