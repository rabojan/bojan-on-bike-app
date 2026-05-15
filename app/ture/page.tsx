import Link from "next/link";

const trails = [
  {
    title: "Gozdni flow nad Mariborom",
    region: "Štajerska",
    distance: "32 km",
    elevation: "890 vm",
    difficulty: "Srednja",
    image:
      "https://images.unsplash.com/photo-1517821365201-7734f463f7f0?q=80&w=1600&auto=format&fit=crop",
    slug: "gozdni-flow-nad-mariborom",
  },
  {
    title: "Med vinogradi in griči",
    region: "Slovenske gorice",
    distance: "41 km",
    elevation: "620 vm",
    difficulty: "Lahka",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
    slug: "med-vinogradi-in-grici",
  },
];

export default function TrailsPage() {
  return (
    <main className="min-h-screen bg-[#06110b] text-white">
      <section className="border-b border-white/10 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-sm uppercase tracking-[0.3em] text-[#c58b46]">
            Kolesarske ture
          </div>

          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-tight md:text-7xl">
            Ture niso samo kilometri.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
            Premium gravel in e-bike ture po Sloveniji z doživetji,
            razgledi, lokalno kulinariko in preverjenimi ponudniki ob poti.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          {trails.map((trail) => (
            <Link
              key={trail.slug}
              href={`/ture/${trail.slug}`}
              className="group overflow-hidden rounded-[32px] border border-white/10 bg-black/20 transition hover:border-[#c58b46]/40"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={trail.image}
                  alt={trail.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-8">
                <div className="text-sm uppercase tracking-[0.2em] text-[#c58b46]">
                  {trail.region}
                </div>

                <h2 className="mt-4 text-3xl font-black">
                  {trail.title}
                </h2>

                <div className="mt-8 flex flex-wrap gap-3 text-sm text-zinc-300">
                  <div className="rounded-full border border-white/10 px-4 py-2">
                    {trail.distance}
                  </div>

                  <div className="rounded-full border border-white/10 px-4 py-2">
                    {trail.elevation}
                  </div>

                  <div className="rounded-full border border-white/10 px-4 py-2">
                    {trail.difficulty}
                  </div>
                </div>

                <div className="mt-8 inline-flex rounded-full bg-[#c58b46] px-5 py-3 text-sm font-semibold text-black">
                  Odpri turo
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}