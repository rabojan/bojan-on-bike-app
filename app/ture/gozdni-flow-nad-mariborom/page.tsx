"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

const TrailMap = dynamic(
  () => import("@/components/TrailMap"),
  {
    ssr: false,
  }
);

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
    const elevationFactor = 890 * 0.12;

    const totalConsumption =
      baseConsumption + weightFactor + elevationFactor;

    const percentUsed = Math.min(
      Math.round((totalConsumption / battery) * 100),
      100
    );

    const remaining = Math.max(100 - percentUsed, 0);

    return {
      usedWh: Math.round(totalConsumption),
      usedPercent: percentUsed,
      remaining,
      message:
        remaining > 50
          ? `Odlično! Prideš domov s približno ${remaining}% baterije.`
          : remaining > 25
          ? `Doseg bo dovolj, ampak pazi na porabo baterije.`
          : `Pozor! Za to turo potrebuješ večjo baterijo ali Eco način.`,
    };
  }, [weight, battery, mode]);

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      {/* NAVBAR */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#07110b]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight"
          >
            Bojan on Bike
          </Link>

          <nav className="hidden gap-8 text-sm md:flex">
            <Link href="/ture" className="hover:text-[#c58b46]">
              Ture
            </Link>

            <Link href="/" className="hover:text-[#c58b46]">
              Doživetja
            </Link>

            <Link href="/" className="hover:text-[#c58b46]">
              Ponudniki
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative flex min-h-screen items-end overflow-hidden pt-32">
        <img
          src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop"
          alt="Gozdni flow"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#07110b]/60 to-[#07110b]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24">
          <div className="flex flex-wrap gap-3">
            <div className="rounded-full border border-[#c58b46]/40 bg-[#c58b46]/10 px-5 py-2 text-sm">
              Štajerska
            </div>

            <div className="rounded-full border border-white/10 bg-black/30 px-5 py-2 text-sm">
              Pohorje
            </div>

            <div className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-5 py-2 text-sm text-emerald-300">
              e-bike friendly
            </div>
          </div>

          <h1 className="mt-8 max-w-4xl text-6xl font-black leading-tight md:text-8xl">
            Gozdni flow nad Mariborom
          </h1>

          <p className="mt-10 max-w-3xl text-xl leading-9 text-zinc-300">
            Tura ni samo številka na zemljevidu. Je pobeg nad
            mesto, vonj pohorskega gozda, postanek ob poti in
            občutek, da si dan preživel točno tako, kot ga mora
            kolesar.
          </p>
        </div>
      </section>

      {/* INFO */}
      <section className="border-y border-white/10 bg-[#0b1a10] px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-5">
          {[
            ["32 km", "dolžina"],
            ["890 vm", "višina"],
            ["Srednja", "težavnost"],
            ["★★★★☆", "ocena"],
            ["April - November", "sezona"],
          ].map((item) => (
            <div
              key={item[0]}
              className="rounded-3xl border border-white/10 bg-black/20 p-6"
            >
              <div className="text-3xl font-black">{item[0]}</div>

              <div className="mt-2 text-sm uppercase tracking-[0.2em] text-zinc-400">
                {item[1]}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MAP */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c58b46]">
            Zemljevid ture
          </div>

          <h2 className="text-5xl font-black">
            Trasa ture.
          </h2>

          <div className="mt-14 overflow-hidden rounded-[32px] border border-white/10">
            <TrailMap
              latitude={46.5547}
              longitude={15.6459}
              title="Gozdni flow nad Mariborom"
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-2xl bg-[#c58b46] px-8 py-4 font-semibold text-black transition hover:scale-[1.02]">
              Prenesi GPX
            </button>

            <button className="rounded-2xl border border-white/10 bg-black/30 px-8 py-4 font-semibold transition hover:border-[#c58b46]/40">
              Odpri v Stravi
            </button>
          </div>
        </div>
      </section>

      {/* WEATHER */}
      <section className="border-y border-white/10 bg-[#0b1a10] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c58b46]">
            Vreme na turi
          </div>

          <h2 className="text-5xl font-black">
            Prognoza za lokacijo ture.
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              ["Danes", "18°", "🌤️"],
              ["Jutri", "15°", "🌦️"],
              ["Pojutrišnjem", "12°", "🌧️"],
            ].map((day) => (
              <div
                key={day[0]}
                className="rounded-[32px] border border-white/10 bg-black/20 p-8"
              >
                <div className="text-sm uppercase tracking-[0.2em] text-zinc-400">
                  {day[0]}
                </div>

                <div className="mt-5 text-5xl">
                  {day[2]}
                </div>

                <div className="mt-5 text-4xl font-black">
                  {day[1]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EBIKE */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl rounded-[40px] border border-[#c58b46]/20 bg-[#0b1a10] p-10">
          <div className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c58b46]">
            eBike kalkulator dosega
          </div>

          <h2 className="text-5xl font-black">
            Bosch Performance Line CX izračun.
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
            Vnesi svojo težo, kapaciteto baterije in izberi način
            vožnje. Izračun je vezan na dolžino in višino te ture.
          </p>

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <label className="mb-3 block text-sm text-zinc-400">
                  Teža kolesarja (kg)
                </label>

                <input
                  type="number"
                  value={weight}
                  onChange={(e) =>
                    setWeight(Number(e.target.value))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-xl outline-none"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm text-zinc-400">
                  Baterija (Wh)
                </label>

                <input
                  type="number"
                  value={battery}
                  onChange={(e) =>
                    setBattery(Number(e.target.value))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {["Eco", "Trail", "eMTB"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setMode(item)}
                    className={`rounded-2xl px-4 py-4 font-semibold transition ${
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

            <div className="rounded-[32px] border border-white/10 bg-black/20 p-8">
              <div className="flex items-center justify-between">
                <div className="text-zinc-400">
                  Poraba za turo
                </div>

                <div className="text-3xl font-black">
                  {batteryResult.usedWh} Wh (
                  {batteryResult.usedPercent}%)
                </div>
              </div>

              <div className="mt-8 h-5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#36d399]"
                  style={{
                    width: `${Math.min(
                      batteryResult.remaining,
                      100
                    )}%`,
                  }}
                />
              </div>

              <div className="mt-5 text-zinc-400">
                Ostane približno{" "}
                {batteryResult.remaining}% baterije.
              </div>

              <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-lg text-emerald-300">
                {batteryResult.message}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="border-y border-white/10 bg-[#0b1a10] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c58b46]">
            Utrinki s ture
          </div>

          <h2 className="text-5xl font-black">
            Doživetje poti.
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {galleryImages.map((image) => (
              <div
                key={image}
                className="overflow-hidden rounded-[32px]"
              >
                <img
                  src={image}
                  alt="Galerija ture"
                  className="h-[320px] w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POI */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c58b46]">
            Postanki ob poti
          </div>

          <h2 className="text-5xl font-black">
            Kolesarski dan ni samo vožnja.
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
            Na trasi odkrivaš razglede, domačo hrano, vinske
            postanke in kraje, kjer se tura spremeni v pravo
            doživetje.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-[32px] border border-white/10 bg-black/20">
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1400&auto=format&fit=crop"
                alt="Ponudnik"
                className="h-[260px] w-full object-cover"
              />

              <div className="p-8">
                <div className="flex gap-3">
                  <div className="rounded-full bg-[#c58b46]/10 px-4 py-2 text-sm text-[#c58b46]">
                    Kulinarika
                  </div>

                  <div className="rounded-full bg-[#c58b46]/10 px-4 py-2 text-sm text-[#c58b46]">
                    Vino
                  </div>
                </div>

                <h3 className="mt-6 text-3xl font-bold">
                  Rudijev dom na Donački
                </h3>

                <p className="mt-4 text-zinc-300 leading-8">
                  Domača hrana, razgledna terasa in odličen
                  postanek za regeneracijo pred nadaljevanjem ture.
                </p>

                <button className="mt-8 rounded-2xl bg-[#c58b46] px-6 py-3 font-semibold text-black">
                  Odpri ponudnika
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[32px] border border-white/10 bg-black/20">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1400&auto=format&fit=crop"
                alt="Ponudnik"
                className="h-[260px] w-full object-cover"
              />

              <div className="p-8">
                <div className="flex gap-3">
                  <div className="rounded-full bg-[#c58b46]/10 px-4 py-2 text-sm text-[#c58b46]">
                    Prenočitev
                  </div>
                </div>

                <h3 className="mt-6 text-3xl font-bold">
                  Gorska hiša Pohorje
                </h3>

                <p className="mt-4 text-zinc-300 leading-8">
                  Mirna nastanitev s pogledom na gozdove in
                  prostorom za varno shranjevanje koles.
                </p>

                <button className="mt-8 rounded-2xl bg-[#c58b46] px-6 py-3 font-semibold text-black">
                  Odpri ponudnika
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}