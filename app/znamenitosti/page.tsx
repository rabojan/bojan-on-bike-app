"use client";

import Link from "next/link";
import { useState } from "react";

import SiteHeader from "@/components/SiteHeader";
import PageHero from "@/components/PageHero";

const attractions = [
  {
    name: "Razgled nad Mariborom",
    slug: "razgled-nad-mariborom",
    type: "Razgled",
    region: "Štajerska",
    area: "Pohorje",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1400&auto=format&fit=crop",
    description:
      "Kratek postanek nad mestom, kjer se odpre pogled proti Mariboru, Dravski dolini in pohorskim gozdovom.",
    tags: ["Razgled", "Foto točka", "Narava"],
    trailsCount: 1,
  },
  {
    name: "Pohorski gozdni odsek",
    slug: "pohorski-gozdni-odsek",
    type: "Narava",
    region: "Štajerska",
    area: "Pohorje",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1400&auto=format&fit=crop",
    description:
      "Mirnejši del poti med visokimi drevesi, kjer tura dobi pravi gozdni ritem in občutek pobega iz mesta.",
    tags: ["Narava", "Foto točka"],
    trailsCount: 1,
  },
  {
    name: "Stara planinska pot",
    slug: "stara-planinska-pot",
    type: "Zgodovina",
    region: "Štajerska",
    area: "Pohorje",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop",
    description:
      "Stara pot z lokalno zgodbo, ki turi doda občutek prostora, časa in povezave z ljudmi, ki so te kraje uporabljali pred nami.",
    tags: ["Zgodovina", "Kultura"],
    trailsCount: 1,
  },
];

const filters = [
  "Vse",
  "Narava",
  "Razgled",
  "Voda / slap / jezero",
  "Zgodovina",
  "Kultura",
  "Arhitektura",
  "Foto točka",
  "Družinska zanimivost",
  "Wikipedia točka",
];

const regions = [
  "Vse regije",
  "Štajerska",
  "Gorenjska",
  "Primorska",
  "Koroška",
  "Notranjska",
  "Dolenjska",
  "Prekmurje",
];

export default function AttractionsPage() {
  const [activeType, setActiveType] = useState("Vse");
  const [activeRegion, setActiveRegion] = useState("Vse regije");

  const filteredAttractions = attractions.filter((attraction) => {
    const matchesType =
      activeType === "Vse" ||
      attraction.type === activeType ||
      attraction.tags.includes(activeType);

    const matchesRegion =
      activeRegion === "Vse regije" || attraction.region === activeRegion;

    return matchesType && matchesRegion;
  });

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/" active="znamenitosti" />

            <PageHero
        eyebrow="Znamenitosti ob poteh"
        title="Včasih je razlog za turo ena sama točka."
        description="Razgledi, slapovi, gozdne poti, zgodovinske točke in lokalne zgodbe. Izberi, kaj želiš videti — in odkrij ture, ki te peljejo mimo."
        image="/hero-znamenitosti.png"
        imageAlt="Znamenitosti ob kolesarskih poteh"
        imagePosition="center"
        mobileImagePosition="70% 60%"
      />

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-16">
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-[#c58b46] bg-[#c58b46]/15 px-5 py-4">
          <span className="text-xl">🏅</span>
          <p className="text-sm text-zinc-300">
            <span className="font-bold text-white">Znamenitosti lahko dodajajo samo kolesarski ambasadorji in admin.</span>
            {"  "}
            <Link href="/predlagaj-turo" className="font-bold text-[#c58b46] underline underline-offset-2 hover:text-[#f4d7ad]">Postani ambasador →</Link>
          </p>
        </div>

        <div className="mb-10">
          <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
            Odkrij po motivu
          </div>

          <h2 className="mt-4 font-serif text-4xl font-black italic md:text-5xl">
            Kaj želiš doživeti ob poti?
          </h2>
        </div>

        <div className="mb-8">
          <div className="mb-4 text-xs uppercase tracking-[0.35em] text-zinc-500">
            Tip znamenitosti
          </div>

          <div className="flex flex-wrap gap-3 pb-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveType(filter)}
                className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${
                  activeType === filter
                    ? "border-[#c58b46] bg-[#c58b46] text-black"
                    : "border-white/10 bg-black/20 text-zinc-300 hover:border-[#c58b46]/50 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <div className="mb-4 text-xs uppercase tracking-[0.35em] text-zinc-500">
            Regija
          </div>

          <div className="flex flex-wrap gap-3 pb-2">
            {regions.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setActiveRegion(region)}
                className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${
                  activeRegion === region
                    ? "border-[#c58b46] bg-[#c58b46] text-black"
                    : "border-white/10 bg-black/20 text-zinc-300 hover:border-[#c58b46]/50 hover:text-white"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        <div className="grid items-stretch gap-8 md:grid-cols-3">
          {filteredAttractions.map((attraction) => (
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

                <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur">
                  {attraction.region}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
                  {attraction.area}
                </div>

                <h3 className="mt-3 font-serif text-3xl font-black italic leading-tight">
                  {attraction.name}
                </h3>

                <p className="mt-5 min-h-[128px] leading-8 text-zinc-300">
                  {attraction.description}
                </p>

                <div className="mt-6 flex min-h-[40px] flex-wrap gap-2">
                  {attraction.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#c58b46]/35 bg-black/25 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-[#f4d7ad]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-7 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                    Povezane ture
                  </div>

                  <div className="mt-2 font-bold">
                    {attraction.trailsCount} povezana tura
                  </div>

                  <div className="mt-1 text-sm text-zinc-500">
                    Odpri znamenitost za ogled tur, ki peljejo mimo.
                  </div>
                </div>

                <Link
                  href={`/znamenitosti/${attraction.slug}`}
                  className="mt-auto inline-flex justify-center rounded-full bg-[#c58b46] px-5 py-3 text-sm font-black text-black"
                >
                  Odpri znamenitost
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
              <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
                Drug način odkrivanja
              </div>

              <h2 className="mt-5 font-serif text-4xl font-black italic leading-tight md:text-5xl">
                Ne začneš vedno s turo.
              </h2>

              <p className="mt-8 text-lg leading-9 text-zinc-300">
                Včasih najprej vidiš razgled, slap ali zgodovinsko točko in si
                rečeš: tja bi šel. Zato so znamenitosti samostojen vhod v
                kolesarska doživetja.
              </p>

              <Link
                href="/ture"
                className="mt-8 inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm font-black text-white"
              >
                Odkrij vse ture
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SAMO AMBASADORJI ── */}
      <section className="border-t border-white/10 bg-[#0b1a10] px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 rounded-[32px] border border-white/10 bg-black/20 p-7 md:flex-row md:items-center md:gap-10">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#c58b46]/30 bg-[#c58b46]/10 text-2xl">
              🏅
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
                Kdo lahko doda znamenitost?
              </div>
              <p className="mt-2 text-base font-semibold leading-7 text-zinc-200">
                Znamenitosti lahko dodajajo samo registrirani kolesarski ambasadorji in glavni admin.
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
