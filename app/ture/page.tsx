"use client";

import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { useMemo, useState } from "react";

const regions = ["Vse", "Štajerska", "Gorenjska", "Primorska", "Koroška", "Notranjska", "Dolenjska", "Prekmurje"];
const difficulties = ["Vse", "Lahka", "Srednja", "Zahtevna"];

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
    description: "Tura skozi pohorske gozdove, razglede in spuste, ki so ustvarjeni za pravi kolesarski dan.",
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
  const [activeDifficulty, setActiveDifficulty] = useState("Vse");

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const regionMatch = activeRegion === "Vse" || tour.region === activeRegion;
      const difficultyMatch = activeDifficulty === "Vse" || tour.difficulty === activeDifficulty;
      return regionMatch && difficultyMatch;
    });
  }, [activeRegion, activeDifficulty]);

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/" active="ture" />

      <section className="relative flex min-h-[560px] items-end overflow-hidden px-6 pb-20 pt-28">
        <img
          src="https://images.unsplash.com/photo-1669372701525-06dde0779ba6?q=80&w=1800&auto=format&fit=crop"
          alt="Kolesarske ture"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#07110b]/65 to-[#07110b]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <div className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c58b46]">
            Katalog tur
          </div>

          <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-7xl lg:text-8xl">
            Najdi svojo naslednjo kolesarsko avanturo.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-200 md:text-xl md:leading-9">
            Filtriraj ture po pokrajini in težavnosti. Vsaka tura je zasnovana kot doživetje: trasa, podlaga, vreme, eBike doseg in ponudniki ob poti.
          </p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b1a10] px-6 py-10">
        <div className="mx-auto max-w-6xl space-y-8">
          <div>
            <div className="mb-4 text-xs uppercase tracking-[0.25em] text-zinc-500">
              Pokrajina
            </div>
            <div className="flex flex-wrap gap-3">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setActiveRegion(region)}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                    activeRegion === region
                      ? "bg-[#c58b46] text-black"
                      : "border border-white/10 bg-black/20 text-zinc-300 hover:border-[#c58b46]/40"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 text-xs uppercase tracking-[0.25em] text-zinc-500">
              Težavnost
            </div>
            <div className="flex flex-wrap gap-3">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setActiveDifficulty(difficulty)}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                    activeDifficulty === difficulty
                      ? "bg-[#c58b46] text-black"
                      : "border border-white/10 bg-black/20 text-zinc-300 hover:border-[#c58b46]/40"
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-sm text-zinc-500">
            Prikazano: {filteredTours.length} tur
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
    </main>
  );
}