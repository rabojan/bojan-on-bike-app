export default function TurePage() {
  const tours = [
    {
      title: "Gozdni flow nad Mariborom",
      region: "Štajerska",
      type: "MTB",
      distance: "32 km",
      elevation: "890 m",
      difficulty: "Srednja",
      image:
        "https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=1400&auto=format&fit=crop",
    },
    {
      title: "Med vinogradi in griči",
      region: "Primorska",
      type: "Gravel / e-bike",
      distance: "48 km",
      elevation: "620 m",
      difficulty: "Lahka",
      image:
        "https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=1400&auto=format&fit=crop",
    },
    {
      title: "Alpski pobeg ob vodi",
      region: "Gorenjska",
      type: "Road / Bikepacking",
      distance: "86 km",
      elevation: "1450 m",
      difficulty: "Zahtevna",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop",
    },
  ];

  const regions = [
    "Vse",
    "Štajerska",
    "Gorenjska",
    "Primorska",
    "Koroška",
    "Notranjska",
    "Dolenjska",
    "Prekmurje",
  ];

  const difficulties = ["Vse", "Lahka", "Srednja", "Zahtevna"];

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-white/10 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/40">
            Katalog tur
          </p>

          <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
            Najdi svojo naslednjo kolesarsko avanturo.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60">
            Razišči premium MTB, gravel, cestne in e-bike ture po Sloveniji.
            Filtriraj po pokrajini, težavnosti in tipu ture.
          </p>
        </div>
      </section>

      <section className="border-b border-white/10 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-white/40">
              Pokrajina
            </p>

            <div className="flex flex-wrap gap-3">
              {regions.map((region) => (
                <button
                  key={region}
                  className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/70 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  {region}
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
                  className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/70 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {tours.map((tour) => (
            <div
              key={tour.title}
              className="overflow-hidden rounded-[32px] border border-white/10 bg-[#050505]"
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
                    <span>{tour.region}</span>
                    <span>{tour.type}</span>
                  </div>

                  <h2 className="text-3xl font-bold">{tour.title}</h2>
                </div>
              </div>

              <div className="space-y-8 p-6">
                <div className="flex flex-wrap gap-3">
                  <div className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80">
                    {tour.distance}
                  </div>

                  <div className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80">
                    {tour.elevation}
                  </div>

                  <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
                    {tour.difficulty}
                  </div>
                </div>

                <button className="w-full rounded-full bg-white px-6 py-4 font-semibold text-black transition hover:bg-white/90">
                  Odpri turo
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}