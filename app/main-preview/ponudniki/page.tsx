"use client";

import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { useMemo, useState } from "react";
import PageHero from "@/components/PageHero";

const filters = ["Vsi", "Kulinarika", "Vino", "Prenočišče"];

const providers = [
  {
    name: "Rudijev dom na Pohorju",
    slug: "rudijev-dom-na-pohorju",
    region: "Štajerska",
    location: "Pohorje",
    types: ["Kulinarika", "Prenočišče"],
    hasCharging: true,
    description:
      "Topel domač obrok, terasa med gozdovi in dobra izhodiščna točka za kolesarski dan na Pohorju.",
    phone: "031 344 640",
    website: "#",
    image:
      "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?q=80&w=1400&auto=format&fit=crop",
    nearbyTrails: [
      { name: "Gozdni flow nad Mariborom", distance: "ob trasi" },
      { name: "Pohorski razgledi", distance: "700 m od trase" },
    ],
  },
  {
    name: "Vinska klet med griči",
    slug: "vinska-klet-med-grici",
    region: "Štajerska",
    location: "Slovenske gorice",
    types: ["Vino", "Kulinarika"],
    hasCharging: false,
    description:
      "Butična vinska izkušnja med griči, primerna za počasnejše gravel ali e-bike ture.",
    phone: "040 222 111",
    website: "#",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1400&auto=format&fit=crop",
    nearbyTrails: [
      { name: "Med vinogradi in griči", distance: "300 m od trase" },
    ],
  },
  {
    name: "Gorska hiša Pohorje",
    slug: "gorska-hisa-pohorje",
    region: "Štajerska",
    location: "Pohorje",
    types: ["Prenočišče", "Kulinarika"],
    hasCharging: true,
    description:
      "Mirna nastanitev za kolesarje, z možnostjo večerje, zajtrka in varnega prostora za kolesa.",
    phone: "041 555 888",
    website: "#",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1400&auto=format&fit=crop",
    nearbyTrails: [
      { name: "Gozdni flow nad Mariborom", distance: "500 m od trase" },
    ],
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
      <SiteHeader backHref="/" active="ponudniki" />

            <PageHero
        eyebrow="Bojan on Bike · Ponudniki"
        title="Kjer se tura spremeni v doživetje."
        titleClassName="font-serif italic"
        description="Kulinarika, vino, prenočišča, e-bike polnilnice in lokalni postanki ob izbranih kolesarskih turah. Samo tisti kraji, kjer se vožnja zares spremeni v del dneva."
        image="https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1800&auto=format&fit=crop"
        imageAlt="Druženje ob hrani po kolesarski turi"
        ctaHref="/main-preview/ponudniki"
        ctaLabel="Oglej si ponudnike"
        secondaryHref="/predlagaj-turo"
        secondaryLabel="Predlagaj ponudnika"
        imagePosition="center"
      />

      <section className="border-y border-white/10 bg-[#0b1a10]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {[
            ["8", "ponudnikov"],
            ["5", "pokrajin"],
            ["4", "e-bike polnilnice"],
            ["Vsi", "preverjeni lokalno"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="border-r border-white/10 px-6 py-8 last:border-r-0 md:py-10"
            >
              <div className="font-serif text-4xl font-black leading-none text-[#f4d7ad] md:text-5xl">
                {value}
              </div>
              <div className="mt-3 text-[10px] font-black uppercase tracking-[0.28em] text-zinc-500">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#07110b] px-6 py-6">
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

      <section className="border-b border-white/10 bg-[#07110b] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-[10px] font-black uppercase tracking-[0.34em] text-[#c58b46]">
            Izpostavljeni ponudnik
          </div>

          <article className="overflow-hidden rounded-[36px] border border-[#c58b46]/20 bg-[#0b1a10]">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[420px] overflow-hidden">
                <img
                  src={providers[0].image}
                  alt={providers[0].name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07110b] via-[#07110b]/20 to-transparent" />

                <div className="absolute left-6 top-6 flex flex-wrap gap-2">
                  {providers[0].types.slice(0, 3).map((type) => (
                    <span
                      key={type}
                      className="rounded-full border border-white/15 bg-black/35 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white"
                    >
                      {type}
                    </span>
                  ))}
                </div>

                <div className="absolute bottom-6 right-6 text-[10px] font-black uppercase tracking-[0.22em] text-[#c58b46]">
                  Ob trasi
                </div>
              </div>

              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="text-[10px] font-black uppercase tracking-[0.34em] text-[#c58b46]">
                  Idealno za kosilo po gozdnem delu
                </div>

                <h2 className="mt-4 max-w-xl font-serif text-4xl font-black italic leading-tight text-white md:text-5xl">
                  {providers[0].name}
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                  Topel domač postanek, terasa med gozdovi in tista točka, kjer tura dobi pravi ritem. Rudijev dom je kraj, kjer se kolesarski dan ne konča samo pri kilometrih, ampak pri hrani, razgledu in občutku, da si si postanek zaslužil.
                </p>

                <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="mb-4 text-[10px] font-black uppercase tracking-[0.28em] text-[#c58b46]">
                    Ture ob ponudniku
                  </div>

                  <div className="space-y-3">
                    {providers[0].nearbyTrails.map((trail) => (
                      <div
                        key={trail.name}
                        className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-b-0 last:pb-0"
                      >
                        <a
                          href={
                            trail.name === "Gozdni flow nad Mariborom"
                              ? "/main-preview/ture/gozdni-flow-nad-mariborom"
                              : "/main-preview/ture"
                          }
                          className="font-semibold text-[#f4d7ad] transition hover:text-[#c58b46]"
                        >
                          {trail.name}
                        </a>
                        <span className="shrink-0 text-sm text-zinc-500">{trail.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="/main-preview/ponudniki/rudijev-dom-na-pohorju"
                    className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black transition hover:bg-[#f4d7ad]"
                  >
                    Oglej si ponudnika
                  </a>
                  <a
                    href={`tel:${providers[0].phone.replace(/\s/g, "")}`}
                    className="rounded-full border border-[#c58b46]/40 px-6 py-3 text-sm font-bold text-[#f4d7ad] transition hover:border-[#c58b46]"
                  >
                    Pokliči
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.34em] text-[#c58b46]">
                Vsi ponudniki
              </div>
              <h2 className="mt-4 font-serif text-4xl font-black italic leading-tight text-white md:text-5xl">
                Lokalni postanki ob poti.
              </h2>
            </div>

            <div className="hidden text-sm text-zinc-500 md:block">
              {filteredProviders.length} rezultati
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {filteredProviders.map((provider) => (
              <article
                key={provider.name}
              id={provider.slug}
                className="flex h-full flex-col overflow-hidden rounded-[36px] border border-white/10 bg-[#0b1a10]"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#07110b] via-transparent to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-8">
                  <div className="mb-5 flex flex-wrap gap-2">
                    {provider.types.map((type) => (
                      <span
                        key={type}
                        className="rounded-full border border-[#c58b46]/30 bg-[#c58b46]/10 px-4 py-2 text-sm text-[#f4d7ad]"
                      >
                        {type}
                      </span>
                    ))}

                    {provider.hasCharging && (
                      <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
                        🔋 e-bike polnilnica
                      </span>
                    )}
                  </div>

                  <div className="mb-3 text-sm text-zinc-500">
                    {provider.region} • {provider.location}
                  </div>

                  <h2 className="font-serif text-3xl font-black italic leading-tight text-white">{provider.name}</h2>

                  <p className="mt-5 leading-8 text-zinc-400">
                    {provider.description}
                  </p>

                  <div className="mt-7 rounded-2xl border border-white/10 bg-black/20 p-5">
                    <div className="mb-4 text-sm uppercase tracking-[0.2em] text-[#c58b46]">
                      Ture ob ponudniku
                    </div>

                    <div className="space-y-3">
                      {provider.nearbyTrails.map((trail) => (
                        <div
                          key={trail.name}
                          className="flex items-start justify-between gap-4 border-b border-white/10 pb-3 last:border-b-0 last:pb-0"
                        >
                          <span className="font-semibold text-[#f4d7ad]">
                            {trail.name}
                          </span>
                          <span className="shrink-0 text-right text-sm text-zinc-500">
                            {trail.distance}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-3 pt-7">
                    <a
                      href={`tel:${provider.phone.replace(/\s/g, "")}`}
                      className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:border-[#c58b46]/40"
                    >
                      Pokliči
                    </a>

                    <a
                      href={provider.website}
                      className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-black text-black transition hover:bg-[#f4d7ad]"
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
