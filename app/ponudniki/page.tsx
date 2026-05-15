"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const filters = ["Vsi", "Kulinarika", "Vino", "Prenočišče", "Polnilnica"];

const providers = [
  {
    name: "Rudijev dom na Pohorju",
    region: "Štajerska",
    location: "Pohorje",
    types: ["Kulinarika", "Prenočišče", "Polnilnica"],
    description:
      "Topel domač obrok, terasa med gozdovi in dobra izhodiščna točka za kolesarski dan na Pohorju.",
    phone: "031 344 640",
    website: "#",
    image:
      "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?q=80&w=1400&auto=format&fit=crop",
    nearbyTrail: "Gozdni flow nad Mariborom",
  },
  {
    name: "Vinska klet med griči",
    region: "Štajerska",
    location: "Slovenske gorice",
    types: ["Vino", "Kulinarika"],
    description:
      "Butična vinska izkušnja med griči, primerna za počasnejše gravel ali e-bike ture.",
    phone: "040 222 111",
    website: "#",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1400&auto=format&fit=crop",
    nearbyTrail: "Med vinogradi in griči",
  },
  {
    name: "Gorska hiša Pohorje",
    region: "Štajerska",
    location: "Pohorje",
    types: ["Prenočišče", "Kulinarika"],
    description:
      "Mirna nastanitev za kolesarje, z možnostjo večerje, zajtrka in varnega prostora za kolesa.",
    phone: "041 555 888",
    website: "#",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1400&auto=format&fit=crop",
    nearbyTrail: "Gozdni flow nad Mariborom",
  },
];

export default function ProvidersPage() {
  const [activeFilter, setActiveFilter] = useState("Vsi");

  const filteredProviders = useMemo(() => {
    if (activeFilter === "Vsi") return providers;
    return providers.filter((provider) => provider.types.includes(activeFilter));
  }, [activeFilter]);

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#07110b]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-black tracking-tight">
            Bojan on Bike
          </Link>

          <nav className="hidden gap-8 text-sm md:flex">
            <Link href="/ture" className="hover:text-[#c58b46]">
              Ture
            </Link>
            <Link href="/#dozivetja" className="hover:text-[#c58b46]">
              Doživetja
            </Link>
            <Link href="/ponudniki" className="text-[#c58b46]">
              Ponudniki
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative flex min-h-[620px] items-end overflow-hidden px-6 pb-24 pt-32">
        <img
          src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1800&auto=format&fit=crop"
          alt="Ponudniki ob kolesarskih turah"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#07110b]/70 to-[#07110b]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c58b46]">
            Ponudniki ob poti
          </div>

          <h1 className="max-w-5xl text-6xl font-black leading-tight md:text-8xl">
            Kjer se tura spremeni v doživetje.
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-9 text-zinc-300">
            Kulinarika, vino, prenočišča in e-bike polnilnice ob izbranih
            kolesarskih turah po Sloveniji.
          </p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b1a10] px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-6 py-3 font-semibold transition ${
                  activeFilter === filter
                    ? "bg-[#c58b46] text-black"
                    : "border border-white/10 bg-black/20 text-zinc-300 hover:border-[#c58b46]/40"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-sm text-zinc-500">
            Prikazano: {filteredProviders.length} ponudnikov
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {filteredProviders.map((provider) => (
              <article
                key={provider.name}
                className="overflow-hidden rounded-[36px] border border-white/10 bg-[#0b1a10]"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#07110b] via-transparent to-transparent" />
                </div>

                <div className="p-8">
                  <div className="mb-5 flex flex-wrap gap-2">
                    {provider.types.map((type) => (
                      <span
                        key={type}
                        className="rounded-full border border-[#c58b46]/30 bg-[#c58b46]/10 px-4 py-2 text-sm text-[#f4d7ad]"
                      >
                        {type}
                      </span>
                    ))}
                  </div>

                  <div className="mb-3 text-sm text-zinc-500">
                    {provider.region} • {provider.location}
                  </div>

                  <h2 className="text-3xl font-black">{provider.name}</h2>

                  <p className="mt-5 leading-8 text-zinc-400">
                    {provider.description}
                  </p>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-zinc-300">
                    Ob turi:{" "}
                    <span className="font-semibold text-[#f4d7ad]">
                      {provider.nearbyTrail}
                    </span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={`tel:${provider.phone.replace(/\s/g, "")}`}
                      className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:border-[#c58b46]/40"
                    >
                      Pokliči
                    </a>

                    <a
                      href={provider.website}
                      className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                    >
                      Spletna stran
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}