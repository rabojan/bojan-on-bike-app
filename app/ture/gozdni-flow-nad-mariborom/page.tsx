"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

const TrailMap = dynamic(() => import("@/components/TrailMap"), {
  ssr: false,
});

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
  gpxUrl: "",
  stravaUrl: "",
  hero:
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1800&auto=format&fit=crop",
};

const experienceMoments = [
  {
    title: "Vstop v pohorski gozd",
    km: "4 km",
    bestTime: "dopoldan",
    text: "Ko mesto ostane za tabo, se ritem ture spremeni. Zrak je hladnejši, gozd gostejši in vožnja bolj osredotočena.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Razgled nad Mariborom",
    km: "13 km",
    bestTime: "pozno dopoldne",
    text: "Kratek postanek za pogled proti mestu. To je trenutek, ko tura ni več samo vožnja, ampak občutek prostora.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Flow spust skozi gozd",
    km: "24 km",
    bestTime: "popoldan",
    text: "Tekoči odseki, gozdna podlaga in občutek hitrosti brez hitenja. Zaključek ture, ki ostane v nogah in glavi.",
    image:
      "https://images.unsplash.com/photo-1544191696-102dbdaeeaa5?q=80&w=1400&auto=format&fit=crop",
  },
];

const trailProviders = [
  {
    name: "Rudijev dom na Pohorju",
    type: ["Kulinarika", "Prenočišče"],
    charging: true,
    distance: "ob trasi",
    moment: "idealno za kosilo po gozdnem delu",
    description:
      "Topel domač obrok, terasa med gozdovi in dobra točka za pravi kolesarski postanek.",
    phone: "031 344 640",
    website: "#",
    image:
      "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "Gorska hiša Pohorje",
    type: ["Prenočišče", "Kulinarika"],
    charging: true,
    distance: "500 m od trase",
    moment: "za vikend pobeg ali večdnevno turo",
    description:
      "Mirna nastanitev za kolesarje, z možnostjo večerje, zajtrka in varnega prostora za kolesa.",
    phone: "041 555 888",
    website: "#",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1400&auto=format&fit=crop",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=1400&auto=format&fit=crop",
];

export default function TrailPage() {
  const [weight, setWeight] = useState(88);
  const [battery, setBattery] = useState(900);
  const [mode, setMode] = useState("Trail");

  const batteryResult = useMemo(() => {
    const baseConsumption =
      mode === "Eco" ? 180 : mode === "Trail" ? 280 : 420;

    const weightFactor = weight * 0.9;
    const elevationFactor = trail.elevationVm * 0.12;
    const totalConsumption = baseConsumption + weightFactor + elevationFactor;

    const usedPercent = Math.min(
      Math.round((totalConsumption / battery) * 100),
      100
    );

    const remaining = Math.max(100 - usedPercent, 0);

    return {
      usedWh: Math.round(totalConsumption),
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

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#07110b]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-black tracking-tight">
            Bojan on Bike
          </Link>

          <nav className="hidden gap-7 text-sm md:flex">
            <Link href="/ture" className="hover:text-[#c58b46]">
              Ture
            </Link>
            <Link href="/#dozivetja" className="hover:text-[#c58b46]">
              Doživetja
            </Link>
            <Link href="/ponudniki" className="hover:text-[#c58b46]">
              Ponudniki
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative flex min-h-[680px] items-end overflow-hidden pt-28">
        <img
          src={trail.hero}
          alt={trail.title}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#07110b]/60 to-[#07110b]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20">
          <div className="flex flex-wrap gap-3">
            <div className="rounded-full border border-[#c58b46]/40 bg-[#c58b46]/10 px-4 py-2 text-sm">
              {trail.region}
            </div>

            <div className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm">
              {trail.destination}
            </div>

            <div className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
              e-bike friendly
            </div>
          </div>

          <h1 className="mt-7 max-w-4xl text-5xl font-black leading-tight md:text-7xl">
            {trail.title}
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-300">
            Tura ni samo številka na zemljevidu. Je pobeg nad mesto, vonj
            pohorskega gozda, postanek ob poti in občutek, da si dan preživel
            točno tako, kot ga mora kolesar.
          </p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b1a10] px-6 py-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-5">
          {[
            [`${trail.distanceKm} km`, "dolžina"],
            [`${trail.elevationVm} vm`, "višina"],
            [trail.difficulty, "težavnost"],
            ["★★★★☆", "ocena"],
            [trail.season, "sezona"],
          ].map((item) => (
            <div
              key={item[0]}
              className="rounded-2xl border border-white/10 bg-black/20 p-5"
            >
              <div className="text-2xl font-black">{item[0]}</div>

              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                {item[1]}
              </div>
            </div>
          ))}
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

      <section className="border-y border-white/10 bg-[#0b1a10] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c58b46]">
            Kaj te čaka na poti
          </div>

          <h2 className="max-w-4xl text-4xl font-black">
            Doživetveni trenutki ture.
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-zinc-300">
            Ne gre samo za kilometre, ampak za občutke, razglede, postanke in
            trenutke, zaradi katerih si turo zapomniš.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {experienceMoments.map((moment) => (
              <article
                key={moment.title}
                className="overflow-hidden rounded-[28px] border border-white/10 bg-[#07110b]"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={moment.image}
                    alt={moment.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-[#c58b46]/30 bg-[#c58b46]/10 px-3 py-1.5 text-xs text-[#f4d7ad]">
                      {moment.km}
                    </span>

                    <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-zinc-300">
                      {moment.bestTime}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black">{moment.title}</h3>

                  <p className="mt-4 leading-7 text-zinc-400">
                    {moment.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>