"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const menuItems = [
  { label: "Ture", href: "/ture" },
  { label: "Doživetja", href: "/#dozivetja" },
  { label: "Ponudniki", href: "#" },
];

const tours = [
  {
    title: "Gozdni flow nad Mariborom",
    region: "Štajerska",
    regionSlug: "stajerska",
    destination: "Pohorje",
    type: "MTB",
    distance: "32 km",
    elevation: "890 vm",
    difficulty: "Srednja",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=85&w=1400",
    surface: { asphalt: 10, gravel: 25, forest: 65 },
  },
  {
    title: "Med vinogradi in griči",
    region: "Štajerska",
    regionSlug: "stajerska",
    destination: "Slovenske gorice",
    type: "Gravel",
    distance: "48 km",
    elevation: "620 vm",
    difficulty: "Lahka",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=85&w=1400",
    surface: { asphalt: 45, gravel: 40, forest: 15 },
  },
  {
    title: "Alpski pobeg ob vodi",
    region: "Primorska",
    regionSlug: "primorska",
    destination: "Soška dolina",
    type: "Bikepacking",
    distance: "86 km",
    elevation: "1450 vm",
    difficulty: "Zahtevna",
    image:
      "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?auto=format&fit=crop&q=85&w=1400",
    surface: { asphalt: 30, gravel: 50, forest: 20 },
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

function TureContent() {
  const searchParams = useSearchParams();
  const pokrajinaFromUrl = searchParams.get("pokrajina") || "vse";

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState(pokrajinaFromUrl);
  const [activeDifficulty, setActiveDifficulty] = useState("Vse");

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const regionMatch = activeRegion === "vse" || tour.regionSlug === activeRegion;
      const difficultyMatch = activeDifficulty === "Vse" || tour.difficulty === activeDifficulty;
      return regionMatch && difficultyMatch;
    });
  }, [activeRegion, activeDifficulty]);

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#07110b]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <a href="/" className="text-lg font-bold tracking-wide">
            Bojan on Bike
          </a>

          <nav className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
            {menuItems.map((item) => (
              <a key={item.label} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
            aria-label="Odpri meni"
          >
            <span className={`absolute h-[2px] w-5 bg-white transition ${menuOpen ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-[2px] w-5 bg-white transition ${menuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute h-[2px] w-5 bg-white transition ${menuOpen ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#07110b]/95 px-5 pt-24 backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/10 py-6 text-3xl font-semibold"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}

      <section className="relative flex min-h-[620px] items-center overflow-hidden px-5 pt-24">
        <img
          src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=85&w=2400"
          alt="Kolesarska tura v naravi"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#07110b]/80 via-[#07110b]/55 to-[#07110b]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07110b]/85 via-[#07110b]/35 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c58b46]">
            Katalog tur
          </p>

          <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
            Najdi svojo naslednjo kolesarsko avanturo.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-300">
            Tukaj bodo vse ture. Filtriraš jih po pokrajini in težavnosti.
          </p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b1a10] px-5 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#c58b46]">
              Pokrajina
            </p>

            <div className="flex flex-wrap gap-3">
              {regions.map((region) => (
                <button
                  key={region.value}
                  onClick={() => setActiveRegion(region.value)}
                  className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${
                    activeRegion === region.value
                      ? "border-[#c58b46] bg-[#c58b46] text-black"
                      : "border-white/10 bg-[#07110b] text-white/70 hover:border-[#c58b46]/40 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {region.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#c58b46]">
              Težavnost
            </p>

            <div className="flex flex-wrap gap-3">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setActiveDifficulty(difficulty)}
                  className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${
                    activeDifficulty === difficulty
                      ? "border-[#c58b46] bg-[#c58b46] text-black"
                      : "border-white/10 bg-[#07110b] text-white/70 hover:border-[#c58b46]/40 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-sm text-zinc-500">
            Prikazano: {filteredTours.length} tur
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {filteredTours.map((tour) => (
              <article key={tour.title} className="overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1a10]">
                <div className="relative h-72 overflow-hidden">
                  <img src={tour.image} alt={tour.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07110b] via-[#07110b]/20 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="mb-3 flex items-center justify-between text-sm text-white/70">
                      <span>{tour.region} • {tour.destination}</span>
                      <span>{tour.type}</span>
                    </div>

                    <h2 className="text-3xl font-bold">{tour.title}</h2>
                  </div>
                </div>

                <div className="space-y-7 p-6">
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

                  <div className="space-y-4 rounded-2xl border border-white/10 bg-[#07110b] p-5">
                    <div className="font-semibold">Podlaga</div>
                    <SurfaceBar label="Asfalt" value={tour.surface.asphalt} />
                    <SurfaceBar label="Makadam" value={tour.surface.gravel} />
                    <SurfaceBar label="Gozdna pot" value={tour.surface.forest} />
                  </div>

                  <button className="w-full rounded-full bg-[#c58b46] px-6 py-4 font-semibold text-black transition hover:bg-[#d9a35d]">
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

export default function TurePage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#07110b] text-white" />}>
      <TureContent />
    </Suspense>
  );
}