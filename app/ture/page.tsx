"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const tours = [
  {
    title: "Gozdni flow nad Mariborom",
    region: "Štajerska",
    regionSlug: "stajerska",
    destination: "Pohorje",
    type: "MTB",
    distance: "32 km",
    elevation: "890 m",
    difficulty: "Srednja",
    image:
      "https://images.unsplash.com/photo-1669372701525-06dde0779ba6?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Med vinogradi in griči",
    region: "Štajerska",
    regionSlug: "stajerska",
    destination: "Slovenske gorice",
    type: "Gravel",
    distance: "48 km",
    elevation: "620 m",
    difficulty: "Lahka",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Alpski pobeg ob vodi",
    region: "Primorska",
    regionSlug: "primorska",
    destination: "Soška dolina",
    type: "Bikepacking",
    distance: "86 km",
    elevation: "1450 m",
    difficulty: "Zahtevna",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1400&auto=format&fit=crop",
  },
];

const regions = [
  { label: "Vse", value: "vse" },
  { label: "Štajerska", value: "stajerska" },
  { label: "Gorenjska", value: "gorenjska" },
  { label: "Primorska", value: "primorska" },
  { label: "Koroška", value: "koroska" },
  { label: "Notranjska", value: "notranjska" },
  { label: "Dolenjska", value: "dolenjska" },
  { label: "Prekmurje", value: "prekmurje" },
];

const difficulties = ["Vse", "Lahka", "Srednja", "Zahtevna"];

export default function TurePage() {
  const searchParams = useSearchParams();
  const pokrajinaFromUrl = searchParams.get("pokrajina") || "vse";

  const [activeRegion, setActiveRegion] = useState(pokrajinaFromUrl);
  const [activeDifficulty, setActiveDifficulty] = useState("Vse");

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const regionMatch =
        activeRegion === "vse" || tour.regionSlug === activeRegion;

      const difficultyMatch =
        activeDifficulty === "Vse" || tour.difficulty === activeDifficulty;

      return regionMatch && difficultyMatch;
    });
  }, [activeRegion, activeDifficulty]);

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 bg-black/80 px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="/" className="text-lg font-bold">
            Bojan on Bike
          </a>

          <a href="/" className="text-sm text-zinc-400 hover:text-white">
            Nazaj na prvo stran
          </a>
        </div>
      </header>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/40">
            Katalog tur
          </p>

          <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
            Najdi svojo naslednjo kolesarsko avanturo.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60">
            Tukaj bodo vse ture. Filtriraš jih po pokrajini in težavnosti.
          </p>
        </div>
      </section>

      <section className="border-y border-white/10 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-white/40">
              Pokrajina
            </p>

            <div className="flex flex-wrap gap-3">
              {regions.map((region) => (
                <button
                  key={region.value}
                  onClick={() => setActiveRegion(region.value)}
                  className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${
                    activeRegion === region.value
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-black text-white/70 hover:border-white/30 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {region.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-white/40">
              Težavnost
            </p>

            <div className="flex flex-wrap gap-3">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setActiveDifficulty(difficulty)}
                  className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${
                    activeDifficulty === difficulty
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-black text-white/70 hover:border-white/30 hover:bg-white/10 hover:text-white"
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
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-sm text-zinc-500">
            Prikazano: {filteredTours.length} tur
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {filteredTours.map((tour) => (
              <article
                key={tour.title}
                className="overflow-hidden rounded-[32px] border border-white/10 bg-zinc-950"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="mb-3 flex items-center justify-between text-sm text-white/70">
                      <span>
                        {tour.region} • {tour.destination}
                      </span>
                      <span>{tour.type}</span>
                    </div>

                    <h2 className="text-3xl font-bold">{tour.title}</h2>
                  </div>
                </div>

                <div className="space-y-8 p-6">
                  <div className="flex flex-wrap gap-3">
                    <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80">
                      {tour.distance}
                    </span>

                    <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80">
                      {tour.elevation}
                    </span>

                    <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80">
                      {tour.difficulty}
                    </span>
                  </div>

                  <button className="w-full rounded-full bg-white px-6 py-4 font-semibold text-black transition hover:bg-white/90">
                    Odpri turo
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}