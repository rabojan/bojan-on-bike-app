import Link from "next/link";

import SiteHeader from "@/components/SiteHeader";

const attractions = [
  {
    name: "Razgled nad Mariborom",
    type: "Razgled",
    region: "Pohorje",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1400&auto=format&fit=crop",
    description:
      "Kratek postanek nad mestom, kjer se odpre pogled proti Mariboru, Dravski dolini in pohorskim gozdovom.",
    tags: ["Razgled", "Foto točka", "Narava"],
    trails: [
      {
        title: "Gozdni flow nad Mariborom",
        href: "/ture/gozdni-flow-nad-mariborom",
        distance: "200 m od trase",
      },
    ],
  },
  {
    name: "Pohorski gozdni odsek",
    type: "Narava",
    region: "Pohorje",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1400&auto=format&fit=crop",
    description:
      "Mirnejši del poti med visokimi drevesi, kjer tura dobi pravi gozdni ritem in občutek pobega iz mesta.",
    tags: ["Narava", "Gozd", "Mir"],
    trails: [
      {
        title: "Gozdni flow nad Mariborom",
        href: "/ture/gozdni-flow-nad-mariborom",
        distance: "na trasi",
      },
    ],
  },
  {
    name: "Stara planinska pot",
    type: "Zgodovina",
    region: "Pohorje",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop",
    description:
      "Stara pot z lokalno zgodbo, ki turi doda občutek prostora, časa in povezave z ljudmi, ki so te kraje uporabljali pred nami.",
    tags: ["Zgodovina", "Lokalna zgodba", "Kultura"],
    trails: [
      {
        title: "Gozdni flow nad Mariborom",
        href: "/ture/gozdni-flow-nad-mariborom",
        distance: "700 m od trase",
      },
    ],
  },
];

const filters = [
  "Vse",
  "Razgled",
  "Narava",
  "Voda",
  "Zgodovina",
  "Kultura",
  "Foto točka",
];

export default function AttractionsPage() {
  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/" active="znamenitosti" />

      <section className="relative flex min-h-[680px] items-end overflow-hidden pt-24">
        <img
          src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1800&auto=format&fit=crop"
          alt="Znamenitosti ob kolesarskih poteh"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#07110b]/55 to-[#07110b]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 md:px-6 md:pb-24">
          <div className="max-w-4xl">
            <div className="mb-5 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Znamenitosti ob poteh
            </div>

            <h1 className="text-5xl font-black leading-none md:text-7xl">
              Včasih je razlog za turo ena sama točka.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-200 md:text-xl">
              Razgledi, slapovi, gozdne poti, zgodovinske točke in lokalne
              zgodbe. Izberi, kaj želiš videti — in odkrij ture, ki te peljejo
              mimo.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-16">
        <div className="mb-10">
          <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
            Odkrij po motivu
          </div>

          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            Kaj želiš doživeti ob poti?
          </h2>
        </div>

        <div className="mb-10 flex gap-3 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`shrink-0 rounded-full border px-5 py-3 text-sm font-semibold ${
                filter === "Vse"
                  ? "border-[#c58b46] bg-[#c58b46] text-black"
                  : "border-white/10 bg-black/20 text-zinc-300"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {attractions.map((attraction) => (
            <article
              key={attraction.name}
              className="flex h-full flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1a10]"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={attraction.image}
                  alt={attraction.name}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#07110b] via-transparent to-transparent" />

                <div className="absolute bottom-0 p-6">
                  <div className="text-xs uppercase tracking-[0.25em] text-[#c58b46]">
                    {attraction.type} · {attraction.region}
                  </div>

                  <h3 className="mt-3 text-3xl font-black leading-tight">
                    {attraction.name}
                  </h3>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="leading-8 text-zinc-300">
                  {attraction.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {attraction.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-7 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
                    Povezane ture
                  </div>

                  <div className="space-y-3">
                    {attraction.trails.map((trail) => (
                      <div key={trail.title}>
                        <div className="font-bold">{trail.title}</div>
                        <div className="mt-1 text-sm text-zinc-500">
                          {trail.distance}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={attraction.trails[0].href}
                  className="mt-7 inline-flex justify-center rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black"
                >
                  Poglej povezano turo
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-6 md:pb-28">
        <div className="overflow-hidden rounded-[36px] border border-white/10 bg-black/20">
          <div className="grid md:grid-cols-2">
            <div className="min-h-[420px]">
              <img
                src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop"
                alt="Postanek ob poti"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-8 md:p-14">
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Drug način odkrivanja
              </div>

              <h2 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
                Ne začneš vedno s turo.
              </h2>

              <p className="mt-8 text-lg leading-9 text-zinc-300">
                Včasih najprej vidiš razgled, slap ali zgodovinsko točko in si
                rečeš: tja bi šel. Zato so znamenitosti samostojen vhod v
                kolesarska doživetja.
              </p>

              <Link
                href="/ture"
                className="mt-8 inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm font-bold text-white"
              >
                Odkrij vse ture
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
