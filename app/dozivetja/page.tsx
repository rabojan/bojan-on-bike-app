"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import PageHero from "@/components/PageHero";

const filters = [
  "Vsi",
  "Vinsko doživetje",
  "Družinski izlet",
  "Kulinarična tura",
  "Razgledna pot",
  "Vikend pobeg",
  "Zgodbe krajev",
  "e-bike dan",
  "MTB flow",
];

const experiences = [
  {
    title: "Vinski kolesarski dan",
    region: "Štajerska",
    area: "Slovenske gorice",
    type: "Vinsko doživetje",
    image:
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1400&auto=format&fit=crop",
    description:
      "Lahkotna vožnja med griči, postanek pri vinski kleti, domača kulinarika in razgled, ki naredi dan poseben.",
    trail: { name: "Med vinogradi in griči", href: "/ture/med-vinogradi-in-grici" },
    provider: { name: "Vinska klet med griči", href: "/ponudniki" },
    highlight: "Vinogradniške terase",
    href: "/dozivetja/vinski-kolesarski-dan",
  },
  {
    title: "Družinski e-bike izlet",
    region: "Štajerska",
    area: "Pohorje",
    type: "Družinski izlet",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop",
    description:
      "Varnejše poti, krajše razdalje, lepi postanki in dovolj prostora, da lahko v dnevu uživa cela družina.",
    trail: { name: "Gozdni flow nad Mariborom", href: "/ture/gozdni-flow-nad-mariborom" },
    provider: { name: "Rudijev dom na Pohorju", href: "/ponudniki/rudijev-dom-na-pohorju" },
    highlight: "Pohorski gozdni odsek",
    href: "/dozivetja/druzinski-e-bike-izlet",
  },
  {
    title: "Pohorski flow in kosilo",
    region: "Štajerska",
    area: "Pohorje",
    type: "MTB flow",
    image:
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=1400&auto=format&fit=crop",
    description:
      "Gozdni odseki, občutek svobode, nato pa zaslužen postanek pri lokalnem ponudniku ob poti.",
    trail: { name: "Gozdni flow nad Mariborom", href: "/ture/gozdni-flow-nad-mariborom" },
    provider: { name: "Rudijev dom na Pohorju", href: "/ponudniki/rudijev-dom-na-pohorju" },
    highlight: "Razgled nad Mariborom",
    href: "/dozivetja/pohorski-flow-in-kosilo",
  },
];

export default function DozivetjaPage() {
  const [activeFilter, setActiveFilter] = useState("Vsi");

  const filtered = useMemo(() => {
    if (activeFilter === "Vsi") return experiences;
    return experiences.filter((e) => e.type === activeFilter);
  }, [activeFilter]);

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/" active="dozivetja" />

      <PageHero
        eyebrow="Doživetja ob poti"
        title="Tura je šele začetek lepega dne."
        description="Skrbno izbrane kombinacije ture, postanka in doživetja. Ne samo km — cel dan, ki si ga zapomniš."
        image="/hero-dozivetja.png"
        imageAlt="Kolesarsko doživetje v naravi"
        imagePosition="center"
        mobileImagePosition="75% 55%"
      />

      {/* ── FILTRI ── */}
      <section className="border-y border-white/10 bg-[#0b1a10] px-5 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
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

      {/* ── KARTICE ── */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
              Izbrana doživetja
            </div>
            <h2 className="mt-3 font-serif text-4xl font-black italic md:text-5xl">
              Ideje za dan, ki si ga zapomniš.
            </h2>
          </div>
          <div className="text-sm text-zinc-500">
            {filtered.length} {filtered.length === 1 ? "doživetje" : "doživetja"}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] px-8 py-16 text-center text-zinc-500">
            Za izbrani filter trenutno ni doživetij.
          </div>
        ) : (
          <div className="grid items-stretch gap-8 md:grid-cols-3">
            {filtered.map((experience) => (
              <article
                key={experience.title}
                className="group flex h-full flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1a10] transition hover:-translate-y-1 hover:border-[#c58b46]/40"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a10] via-transparent to-transparent" />
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full border border-[#c58b46]/40 bg-black/50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#f4d7ad] backdrop-blur">
                      {experience.type}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <div className="mb-2 text-xs text-zinc-500">
                    {experience.region} · {experience.area}
                  </div>

                  <h3 className="font-serif text-2xl font-black italic leading-tight">
                    {experience.title}
                  </h3>

                  <p className="mt-4 flex-1 text-sm leading-7 text-zinc-400">
                    {experience.description}
                  </p>

                  {/* TRIO */}
                  <div className="mt-6 space-y-2.5 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="shrink-0 text-[#c58b46]">⬡</span>
                      <Link href={experience.trail.href} className="text-zinc-300 hover:text-[#f4d7ad]">
                        {experience.trail.name}
                      </Link>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="shrink-0 text-[#c58b46]">◎</span>
                      <Link href={experience.provider.href} className="text-zinc-400 hover:text-[#f4d7ad]">
                        {experience.provider.name}
                      </Link>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="shrink-0 text-[#c58b46]">◈</span>
                      <span className="text-zinc-500">{experience.highlight}</span>
                    </div>
                  </div>

                  <Link
                    href={experience.href}
                    className="mt-6 inline-flex justify-center rounded-full bg-[#c58b46] px-5 py-3 text-sm font-black text-black transition hover:opacity-90"
                  >
                    Oglej si dan
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ── ZAKAJ DOŽIVETJA ── */}
      <section className="border-y border-white/10 bg-[#0b1a10] px-5 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-white/10">
          <div className="grid md:grid-cols-2">
            <div className="min-h-[380px]">
              <img
                src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1600&auto=format&fit=crop"
                alt="Druženje po turi"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-14">
              <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
                Zakaj doživetja
              </div>
              <h2 className="mt-5 font-serif text-4xl font-black italic leading-tight md:text-5xl">
                Ker se najboljše ture končajo z zgodbo.
              </h2>
              <p className="mt-6 text-base leading-9 text-zinc-400">
                Dobra kolesarska ideja ni samo črta na zemljevidu. Je trenutek,
                ko se ustaviš na razgledu, spiješ kavo v majhnem kraju, odkriješ
                lokalno zgodbo ali se po turi usedeš za mizo z ljudmi, s katerimi
                si delil dan.
              </p>
              <Link
                href="/ponudniki"
                className="mt-8 inline-flex w-fit rounded-full bg-[#c58b46] px-6 py-4 text-sm font-black text-black"
              >
                Odkrij ponudnike
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
