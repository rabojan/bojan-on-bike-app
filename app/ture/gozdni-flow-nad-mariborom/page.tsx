"use client";

import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

const TrailMap = dynamic(() => import("@/components/TrailMap"), { ssr: false });

const trail = {
  title: "Gozdni flow nad Mariborom",
  region: "Štajerska",
  destination: "Pohorje",
  distanceKm: 32,
  elevationVm: 890,
  difficulty: "Srednja",
  season: "April - November",
  latitude: 46.5547,
  longitude: 15.6459,
  surface: {
    asphalt: 10,
    gravel: 25,
    forest: 65,
  },
  hero: "https://images.unsplash.com/photo-1669372701525-06dde0779ba6?q=80&w=1800&auto=format&fit=crop",
};

const trailTags = [
  "e-bike friendly",
  "gozdni pobeg",
  "razgled nad mestom",
  "lokalni postanek",
];

const trailRhythm = ["Gozd", "Razgled", "Flow spust", "Postanek"];

const moments = [
  {
    title: "Vstop v pohorski gozd",
    km: "4 km",
    time: "dopoldan",
    text: "Ko mesto ostane za tabo, se ritem ture spremeni. Zrak je hladnejši, gozd gostejši in vožnja bolj osredotočena.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Razgled nad Mariborom",
    km: "13 km",
    time: "pozno dopoldne",
    text: "Kratek postanek za pogled proti mestu. To je poudarek, ko tura ni več samo vožnja, ampak občutek prostora.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Flow spust skozi gozd",
    km: "24 km",
    time: "popoldan",
    text: "Tekoči odseki, gozdna podlaga in občutek hitrosti brez hitenja. Zaključek ture, ki ostane v nogah in glavi.",
    image:
    "https://images.unsplash.com/photo-1669372701525-06dde0779ba6?q=80&w=1200&auto=format&fit=crop",
  },
];

const providers = [
  {
    name: "Rudijev dom na Pohorju",
    slug: "rudijev-dom-na-pohorju",
    types: ["Kulinarika", "Prenočišče"],
    charging: true,
    distance: "ob trasi",
    latitude: 46.5639,
    longitude: 15.6226,
    moment: "idealno za kosilo po gozdnem delu",
    description:
      "Topel domač obrok, terasa med gozdovi in dobra točka za pravi kolesarski postanek.",
    phone: "031 344 640",
    image:
      "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Gorska hiša Pohorje",
    slug: "gorska-hisa-pohorje",
    types: ["Prenočišče", "Kulinarika"],
    charging: true,
    distance: "500 m od trase",
    latitude: 46.5528,
    longitude: 15.6079,
    moment: "za vikend pobeg ali večdnevno turo",
    description:
      "Mirna nastanitev za kolesarje, z možnostjo večerje, zajtrka in varnega prostora za kolesa.",
    phone: "041 555 888",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
  },
];

const gallery = [
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544191696-102dbdaeeaa5?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
];

export default function TrailPage() {
  const [weight, setWeight] = useState(88);
  const [battery, setBattery] = useState(900);
  const [mode, setMode] = useState("Trail");
  const [galleryIndex, setGalleryIndex] = useState(0);

  const batteryResult = useMemo(() => {
    const base = mode === "Eco" ? 180 : mode === "Trail" ? 280 : 420;
    const usedWh = Math.round(base + weight * 0.9 + trail.elevationVm * 0.12);
    const usedPercent = Math.min(Math.round((usedWh / battery) * 100), 100);
    const remaining = Math.max(100 - usedPercent, 0);

    return {
      usedWh,
      usedPercent,
      remaining,
      message:
        remaining > 50
          ? `Odlično! Prideš domov s približno ${remaining}% baterije.`
          : remaining > 25
          ? "Doseg bo dovolj, ampak pazi na porabo baterije."
          : "Pozor! Za to turo potrebuješ večjo baterijo ali Eco način.",
    };
  }, [weight, battery, mode]);

  const nextGallery = () => {
    setGalleryIndex((current) => (current + 1) % gallery.length);
  };

  const prevGallery = () => {
    setGalleryIndex((current) =>
      current === 0 ? gallery.length - 1 : current - 1
    );
  };

  const desktopGallery = [
    gallery[galleryIndex],
    gallery[(galleryIndex + 1) % gallery.length],
    gallery[(galleryIndex + 2) % gallery.length],
  ];

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/ture" active="ture" />

      <section className="relative flex min-h-[680px] items-end overflow-hidden pt-28">
        <img
          src={trail.hero}
          alt={trail.title}
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#07110b]/60 to-[#07110b]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20">
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-[#c58b46]/40 bg-[#c58b46]/10 px-4 py-2 text-sm">
              {trail.region}
            </span>
            <span className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm">
              {trail.destination}
            </span>
            <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
              e-bike friendly
            </span>
          </div>

          <h1 className="mt-7 max-w-4xl text-5xl font-black leading-tight md:text-7xl">
            {trail.title}
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-300">
            Gozdni flow nad Mariborom poveže pohorski gozd, razgled nad mestom,
            tekoče odseke in lokalni postanek v kolesarski dan, ki ostane v
            nogah in glavi.
          </p>

          <div className="mt-7 flex flex-wrap gap-2 text-sm text-zinc-300">
            {trailRhythm.map((item, index) => (
              <span key={item} className="inline-flex items-center gap-2">
                <span>{item}</span>
                {index < trailRhythm.length - 1 && (
                  <span className="text-[#c58b46]">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b1a10]/80 px-6 py-6">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[28px] border border-white/10 bg-[#07110b]/80 p-4 shadow-2xl shadow-black/10 md:p-5">
            <div className="grid gap-5 lg:grid-cols-[1fr_1.35fr] lg:items-center">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-[#c58b46]">
                  Na kratko
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {trailTags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        tag === "e-bike friendly"
                          ? "border border-emerald-400/40 bg-emerald-500/10 text-emerald-300"
                          : "border border-white/10 bg-black/20 text-zinc-300"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {[
                  [`${trail.distanceKm} km`, "dolžina"],
                  [`${trail.elevationVm} vm`, "višinci"],
                  [trail.difficulty, "zahtevnost"],
                  ["★★★★☆", "ocena"],
                  [trail.season, "sezona"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                  >
                    <div className="text-lg font-black leading-tight text-white">
                      {value}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[36px] border border-[#c58b46]/20 bg-gradient-to-br from-[#102417] via-[#0b1a10] to-[#07110b] p-6 shadow-2xl shadow-black/20 md:p-8">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#c58b46]/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-r from-emerald-500/5 to-transparent" />

            <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.4fr] lg:items-center">
              <div>
                <div className="mb-5 text-sm uppercase tracking-[0.3em] text-[#c58b46]">
                  Izbral lokalni ambasador
                </div>

                <div className="flex items-center gap-5">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[24px] border border-white/10 bg-[#07110b] text-4xl shadow-xl shadow-black/20">
                    👤
                  </div>

                  <div>
                    <div className="text-3xl font-black text-white">
                      Bojan Ratej
                    </div>
                    <div className="mt-1 text-base font-semibold text-zinc-300">
                      Ambasador Štajerske
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-black/20 p-6 md:p-7">
                <p className="text-xl font-black leading-9 text-white md:text-2xl">
                  “Ta tura najbolje pokaže, kako hitro lahko iz mesta prideš v
                  pravi pohorski gozd, razgled in mir.”
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["lokalni izbor", "pozna teren", "priporočen postanek"].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[#c58b46]/30 bg-[#c58b46]/10 px-3 py-1.5 text-xs font-semibold text-[#f4d7ad]"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c58b46]">
            Podlaga ture
          </div>

          <div className="grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-center">
            <div>
              <h2 className="text-4xl font-black">Kakšna je vožnja?</h2>
              <p className="mt-5 max-w-xl leading-8 text-zinc-400">
                Podlaga pove, kakšen občutek lahko pričakuješ na turi: koliko je
                asfalta, makadama in gozdnih poti.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
              <div className="space-y-6">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-zinc-400">Asfalt</span>
                    <span className="font-bold">{trail.surface.asphalt}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#c58b46]"
                      style={{ width: `${trail.surface.asphalt}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-zinc-400">Makadam</span>
                    <span className="font-bold">{trail.surface.gravel}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#c58b46]"
                      style={{ width: `${trail.surface.gravel}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-zinc-400">Gozdna pot</span>
                    <span className="font-bold">{trail.surface.forest}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#c58b46]"
                      style={{ width: `${trail.surface.forest}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c58b46]">
            Zemljevid ture
          </div>
          <h2 className="text-4xl font-black">Trasa ture.</h2>

          <div className="mt-10 overflow-hidden rounded-[28px] border border-white/10">
            <TrailMap
              latitude={trail.latitude}
              longitude={trail.longitude}
              title={trail.title}
              pois={providers.map((provider) => ({
                name: provider.name,
                latitude: provider.latitude,
                longitude: provider.longitude,
                distance: provider.distance,
                slug: provider.slug,
                types: provider.types,
                charging: provider.charging,
              }))}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              disabled
              className="cursor-not-allowed rounded-2xl bg-white/10 px-6 py-3 text-sm font-semibold text-zinc-500"
            >
              GPX še ni dodan
            </button>
            <button
              disabled
              className="cursor-not-allowed rounded-2xl border border-white/10 bg-black/20 px-6 py-3 text-sm font-semibold text-zinc-500"
            >
              Strava link še ni dodan
            </button>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/10 bg-[#0b1a10] px-6 py-20">
        <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#c58b46]/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-10 grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <div className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c58b46]">
                Na poti
              </div>
              <h2 className="text-4xl font-black md:text-5xl">
                Kaj doživiš na poti.
              </h2>
            </div>

            <p className="max-w-2xl leading-8 text-zinc-300">
              Kratek pregled trenutkov, ki določijo značaj ture: vstop v gozd,
              razgled nad mestom in zaključni flow skozi pohorske odseke.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <article className="group overflow-hidden rounded-[34px] border border-white/10 bg-[#07110b] shadow-2xl shadow-black/20">
              <div className="relative min-h-[420px]">
                <img
                  src={moments[0].image}
                  alt={moments[0].title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07110b] via-[#07110b]/35 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8">
                  <div className="mb-4 flex gap-2">
                    <span className="rounded-full border border-[#c58b46]/30 bg-[#c58b46]/10 px-3 py-1.5 text-xs text-[#f4d7ad]">
                      {moments[0].km}
                    </span>
                    <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-zinc-200">
                      {moments[0].time}
                    </span>
                  </div>
                  <h3 className="text-3xl font-black md:text-4xl">
                    {moments[0].title}
                  </h3>
                  <p className="mt-4 max-w-2xl leading-7 text-zinc-300">
                    {moments[0].text}
                  </p>
                </div>
              </div>
            </article>

            <div className="grid gap-6">
              {moments.slice(1).map((item) => (
                <article
                  key={item.title}
                  className="grid overflow-hidden rounded-[28px] border border-white/10 bg-[#07110b] md:grid-cols-[0.85fr_1fr] lg:grid-cols-1"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-52 w-full object-cover md:h-full lg:h-44"
                  />
                  <div className="p-6">
                    <div className="mb-4 flex gap-2">
                      <span className="rounded-full border border-[#c58b46]/30 bg-[#c58b46]/10 px-3 py-1.5 text-xs text-[#f4d7ad]">
                        {item.km}
                      </span>
                      <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-zinc-300">
                        {item.time}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black">{item.title}</h3>
                    <p className="mt-4 leading-7 text-zinc-400">
                      {item.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c58b46]/30 to-transparent" />
        <div className="pointer-events-none absolute -left-28 bottom-10 h-72 w-72 rounded-full bg-[#c58b46]/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
            <div className="flex flex-col justify-between rounded-[34px] border border-white/10 bg-gradient-to-br from-[#102417] to-[#07110b] p-7 md:p-8">
              <div>
                <div className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c58b46]">
                  Ponudniki ob tej turi
                </div>

                <h2 className="text-4xl font-black md:text-5xl">
                  Kje se dan ustavi.
                </h2>

                <p className="mt-5 leading-8 text-zinc-300">
                  Tukaj se tura spremeni v doživetje: domača hrana, prenočišče,
                  terasa, pogled in možnost polnjenja e-kolesa.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {["kosilo po turi", "e-bike polnilnica", "možnost prenočitve"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold text-zinc-300"
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {providers.map((provider, index) => (
                <article
                  key={provider.name}
                  className={`overflow-hidden rounded-[30px] border border-white/10 bg-[#0b1a10] shadow-2xl shadow-black/10 ${
                    index === 0 ? "md:translate-y-8" : ""
                  }`}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07110b] via-transparent to-transparent" />
                    <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                      {provider.distance}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4 flex flex-wrap gap-2">
                      {provider.types.map((type) => (
                        <span
                          key={type}
                          className="rounded-full border border-[#c58b46]/30 bg-[#c58b46]/10 px-3 py-1.5 text-xs text-[#f4d7ad]"
                        >
                          {type}
                        </span>
                      ))}
                      {provider.charging && (
                        <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-300">
                          🔋 e-bike polnilnica
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-black">{provider.name}</h3>
                    <p className="mt-4 leading-7 text-zinc-400">
                      {provider.description}
                    </p>

                    <div className="mt-5 rounded-2xl border border-[#c58b46]/20 bg-[#c58b46]/10 p-4 text-sm font-semibold leading-6 text-[#f4d7ad]">
                      {provider.moment}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <a
                        href={`tel:${provider.phone.replace(/\s/g, "")}`}
                        className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-zinc-300"
                      >
                        Pokliči
                      </a>
                      <a
                        href="#"
                        className="rounded-full bg-[#c58b46] px-4 py-2 text-sm font-semibold text-black"
                      >
                        Spletna stran
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b1a10] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c58b46]">
            Vreme na turi
          </div>
          <h2 className="text-4xl font-black">Prognoza za lokacijo ture.</h2>
          <div className="mt-8 grid grid-cols-3 gap-3 md:mt-10 md:gap-5">
            {[
              ["Danes", "18°", "🌤️"],
              ["Jutri", "15°", "🌦️"],
              ["Pojutrišnjem", "12°", "🌧️"],
            ].map(([label, temp, icon]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-black/20 p-4 md:rounded-[28px] md:p-6"
              >
                <div className="text-[9px] uppercase tracking-[0.04em] text-zinc-500 md:text-xs md:tracking-[0.2em]">{label}
                </div>
                <div className="mt-3 text-3xl md:mt-4 md:text-4xl">{icon}</div>
                <div className="mt-2 text-xl font-black md:mt-4 md:text-3xl">{temp}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-[#c58b46]/20 bg-[#0b1a10] p-8 md:p-10">
          <div className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c58b46]">
            eBike kalkulator dosega
          </div>
          <h2 className="text-4xl font-black">
            Bosch Performance Line CX izračun.
          </h2>
          <p className="mt-5 max-w-3xl leading-8 text-zinc-300">
            Vnesi svojo težo, kapaciteto baterije in izberi način vožnje.
            Izračun je vezan na dolžino in višino te ture.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="space-y-5">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 outline-none"
              />
              <input
                type="number"
                value={battery}
                onChange={(e) => setBattery(Number(e.target.value))}
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 outline-none"
              />
              <div className="grid grid-cols-3 gap-3">
                {["Eco", "Trail", "eMTB"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setMode(item)}
                    className={`rounded-2xl px-4 py-3 font-semibold transition ${
                      mode === item
                        ? "bg-[#c58b46] text-black"
                        : "border border-white/10 bg-black/20"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 md:rounded-[28px] md:p-6">
              <div className="flex items-center justify-between">
                <div className="text-zinc-400">Poraba za turo</div>
                <div className="text-2xl font-black">
                  {batteryResult.usedWh} Wh ({batteryResult.usedPercent}%)
                </div>
              </div>
              <div className="mt-6 h-4 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#36d399]"
                  style={{ width: `${batteryResult.remaining}%` }}
                />
              </div>
              <div className="mt-4 text-zinc-400">
                Ostane približno {batteryResult.remaining}% baterije.
              </div>
              <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-300">
                {batteryResult.message}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b1a10] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c58b46]">
            Utrinki s ture
          </div>

          <h2 className="text-4xl font-black">Doživetje poti.</h2>

          <p className="mt-4 max-w-2xl leading-7 text-zinc-400">
            Galerija prikazuje izbrane trenutke ture. Na računalniku vidiš tri
            fotografije, na telefonu eno — naprej in nazaj se premikaš s
            puščicami na robu slike.
          </p>

          <div className="relative mt-10 hidden md:block">
            <button
              onClick={prevGallery}
              className="absolute left-0 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/50 px-5 py-4 text-3xl font-light text-white backdrop-blur transition hover:bg-[#c58b46] hover:text-black"
            >
              ‹
            </button>

            <div className="grid grid-cols-3 gap-5">
              {desktopGallery.map((image, index) => (
                <img
                  key={`${image}-${index}`}
                  src={image}
                  alt="Galerija ture"
                  className="h-[300px] w-full rounded-[28px] object-cover"
                />
              ))}
            </div>

            <button
              onClick={nextGallery}
              className="absolute right-0 top-1/2 z-20 translate-x-1/2 -translate-y-1/2 rounded-full bg-black/50 px-5 py-4 text-3xl font-light text-white backdrop-blur transition hover:bg-[#c58b46] hover:text-black"
            >
              ›
            </button>

            <div className="mt-5 text-center text-sm text-zinc-500">
              {galleryIndex + 1} / {gallery.length}
            </div>
          </div>

          <div className="relative mt-10 md:hidden">
            <img
              src={gallery[galleryIndex]}
              alt="Galerija ture"
              className="h-[340px] w-full rounded-[28px] object-cover"
            />

            <button
              onClick={prevGallery}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 px-4 py-3 text-3xl font-light text-white backdrop-blur"
            >
              ‹
            </button>

            <button
              onClick={nextGallery}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 px-4 py-3 text-3xl font-light text-white backdrop-blur"
            >
              ›
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white backdrop-blur">
              {galleryIndex + 1} / {gallery.length}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
