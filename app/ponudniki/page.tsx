"use client";

import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { useMemo, useState } from "react";
import PageHero from "@/components/PageHero";

const filters = ["Vsi", "Kulinarika", "Vino", "Prenočišče", "Bike servis", "Lokalni produkti"];

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
    website: "https://rudijev-dom.si",
    href: "/ponudniki/rudijev-dom-na-pohorju",
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
    website: "",
    href: "",
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
    website: "",
    href: "",
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
        eyebrow="Ponudniki ob poti"
        title="Postanki, ki naredijo kolesarski dan."
        description="Lokalna kulinarika, vino, prenočišča in bike-friendly točke ob izbranih turah. Ne samo km — cel dan."
        image="/hero-ponudniki.png"
        imageAlt="Druženje ob hrani po kolesarski turi"
        imagePosition="center"
        mobileImagePosition="center 55%"
      />

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

          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[#c58b46] bg-[#c58b46]/15 px-5 py-4">
            <span className="text-xl">🏅</span>
            <p className="text-sm text-zinc-300">
              <span className="font-bold text-white">Ponudnike lahko dodajajo samo kolesarski ambasadorji in admin.</span>
              {"  "}
              <Link href="/predlagaj-turo" className="font-bold text-[#c58b46] underline underline-offset-2 hover:text-[#f4d7ad]">Postani ambasador →</Link>
            </p>
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
                        className="rounded-full border border-[#c58b46]/35 bg-black/25 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#f4d7ad]"
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

                  <h2 className="font-serif text-3xl font-black italic">{provider.name}</h2>

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

                  <div className="mt-auto flex items-center gap-3 pt-7">
                    {provider.href && (
                      <Link
                        href={provider.href}
                        className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-black text-black transition hover:opacity-90"
                      >
                        Ogled
                      </Link>
                    )}

                    <a
                      href={`tel:${provider.phone.replace(/\s/g, "")}`}
                      className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:border-[#c58b46]/40"
                    >
                      Pokliči
                    </a>

                    {provider.website && (
                      <a
                        href={provider.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:border-[#c58b46]/40"
                      >
                        WWW
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAMO AMBASADORJI ── */}
      <section className="border-t border-white/10 bg-[#0b1a10] px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 rounded-[32px] border border-white/10 bg-black/20 p-7 md:flex-row md:items-center md:gap-10">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#c58b46]/30 bg-[#c58b46]/10 text-2xl">
              🏅
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
                Kdo lahko doda ponudnika?
              </div>
              <p className="mt-2 text-base font-semibold leading-7 text-zinc-200">
                Ponudnike lahko dodajajo samo registrirani kolesarski ambasadorji in glavni admin.
              </p>
              <p className="mt-1 text-sm leading-7 text-zinc-500">
                Tako zagotavljamo, da za vsak vnos stoji preverjena lokalna oseba, ki teren pozna iz prve roke.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col">
              <Link
                href="/predlagaj-turo"
                className="rounded-full bg-[#c58b46] px-6 py-3 text-center text-sm font-black text-black"
              >
                Postani ambasador
              </Link>
              <Link
                href="/ambasador/prijava"
                className="rounded-full border border-white/10 px-6 py-3 text-center text-sm font-bold text-zinc-300 hover:border-[#c58b46]/40"
              >
                Prijava
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
