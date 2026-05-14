"use client";

import { useEffect, useMemo, useState } from "react";

const trail = {
  title: "Gozdni flow nad Mariborom",
  region: "Štajerska",
  destination: "Pohorje",
  type: "MTB",
  distanceKm: 32,
  elevationVm: 890,
  difficulty: "Srednja",
  season: "April - November",
  rating: "★★★★☆",
  latitude: 46.565,
  longitude: 15.65,
  surface: {
    asphalt: 10,
    gravel: 25,
    forest: 65,
  },
  hero:
    "https://images.unsplash.com/photo-1669372701525-06dde0779ba6?auto=format&fit=crop&q=85&w=2600",
  gallery: [
    "https://images.unsplash.com/photo-1669372701525-06dde0779ba6?auto=format&fit=crop&q=85&w=1200",
    "https://images.unsplash.com/photo-1544191696-102dbdaeeaa5?auto=format&fit=crop&q=85&w=1200",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=85&w=1200",
  ],
};

const menuItems = [
  { label: "Ture", href: "/ture" },
  { label: "Doživetja", href: "/#dozivetja" },
  { label: "Ponudniki", href: "#" },
];

const modes = [
  { key: "eco", label: "Eco", baseKm: 3.5, baseVm: 12 },
  { key: "trail", label: "Trail", baseKm: 4.5, baseVm: 16 },
  { key: "emtb", label: "eMTB", baseKm: 6.0, baseVm: 20 },
];

function SurfaceBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-zinc-400">{label}</span>
        <span className="font-semibold">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[#c58b46]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function weatherIcon(code: number) {
  if (code === 0) return "☀️";
  if (code <= 3) return "⛅";
  if (code <= 48) return "🌫️";
  if (code <= 65) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌦️";
  if (code >= 95) return "⛈️";
  return "⛅";
}

export default function TrailDetailPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [weather, setWeather] = useState<
    { label: string; temp: number; icon: string }[]
  >([]);

  const [weight, setWeight] = useState(88);
  const [battery, setBattery] = useState(900);
  const [mode, setMode] = useState("trail");

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${trail.latitude}&longitude=${trail.longitude}&daily=temperature_2m_max,weathercode&forecast_days=3&timezone=auto`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.daily) return;

        const labels = ["Danes", "Jutri", "Pojutrišnjem"];

        setWeather(
          data.daily.temperature_2m_max.slice(0, 3).map((temp: number, i: number) => ({
            label: labels[i],
            temp: Math.round(temp),
            icon: weatherIcon(data.daily.weathercode[i]),
          }))
        );
      })
      .catch(() => setWeather([]));
  }, []);

  const batteryResult = useMemo(() => {
    const selectedMode = modes.find((item) => item.key === mode) || modes[1];

    const weightFactor = 1 + ((weight - 88) / 88) * 0.15;

    const totalWh = Math.round(
      (trail.distanceKm * selectedMode.baseKm +
        (trail.elevationVm / 100) * selectedMode.baseVm) *
        weightFactor
    );

    const usedPercent = Math.round((totalWh / battery) * 100);
    const remaining = Math.max(0, 100 - usedPercent);

    let message = "";
    let color = "#2ecc71";

    if (usedPercent > 100) {
      message = "Baterija ne zadostuje za to turo.";
      color = "#e74c3c";
    } else if (remaining >= 50) {
      message = `Odlično! Prideš domov s približno ${remaining}% baterije.`;
      color = "#2ecc71";
    } else if (remaining >= 25) {
      message = `Baterija zadostuje. Ostane približno ${remaining}%.`;
      color = "#2ecc71";
    } else if (remaining >= 10) {
      message = `Baterija bo blizu meje. Ostane približno ${remaining}%.`;
      color = "#f39c12";
    } else {
      message = `Tvegano. Ostane samo približno ${remaining}%.`;
      color = "#e67e22";
    }

    return {
      totalWh,
      usedPercent,
      remaining,
      message,
      color,
    };
  }, [weight, battery, mode]);

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#07110b]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <a href="/" className="text-lg font-bold tracking-wide">
            Bojan on Bike
          </a>

          <nav className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
            {menuItems.map((item) => (
              <a key={item.label} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
            aria-label="Odpri meni"
          >
            <span className={`absolute h-[2px] w-5 bg-white transition ${menuOpen ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-[2px] w-5 bg-white transition ${menuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute h-[2px] w-5 bg-white transition ${menuOpen ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#07110b]/95 px-5 pt-24 backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/10 py-6 text-3xl font-semibold"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}

      <section className="relative flex min-h-[720px] items-end overflow-hidden px-5 pb-16 pt-24">
        <img
          src={trail.hero}
          alt={trail.title}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#07110b]/55 via-[#07110b]/45 to-[#07110b]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07110b]/90 via-[#07110b]/35 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="mb-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-[#c58b46]/30 bg-[#c58b46]/15 px-4 py-2 text-[#f4d7ad]">
              {trail.region}
            </span>
            <span className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-zinc-200">
              {trail.destination}
            </span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-300">
              e-bike friendly
            </span>
          </div>

          <h1 className="max-w-4xl text-5xl font-black leading-tight md:text-7xl">
            {trail.title}
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-300">
            Dinamična MTB tura skozi pohorske gozdove, razglede in spuste nad
            Mariborom. Primerna za aktivne kolesarje, ki iščejo naravo, ritem
            in občutek pravega kolesarskega dne.
          </p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b1a10] px-5 py-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-5">
          <div className="rounded-2xl border border-white/10 bg-[#07110b] p-5">
            <div className="text-2xl font-black text-[#f4d7ad]">
              {trail.distanceKm} km
            </div>
            <div className="mt-1 text-sm text-zinc-500">dolžina</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#07110b] p-5">
            <div className="text-2xl font-black text-[#f4d7ad]">
              {trail.elevationVm} vm
            </div>
            <div className="mt-1 text-sm text-zinc-500">višinci</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#07110b] p-5">
            <div className="text-2xl font-black text-[#f4d7ad]">
              {trail.difficulty}
            </div>
            <div className="mt-1 text-sm text-zinc-500">težavnost</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#07110b] p-5">
            <div className="text-2xl font-black text-[#f4d7ad]">
              {trail.rating}
            </div>
            <div className="mt-1 text-sm text-zinc-500">ocena</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#07110b] p-5">
            <div className="text-xl font-black text-[#f4d7ad]">
              {trail.season}
            </div>
            <div className="mt-1 text-sm text-zinc-500">sezona</div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.65fr_0.35fr]">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#c58b46]">
              Opis ture
            </p>

            <h2 className="mb-6 text-4xl font-bold">
              Gozdna tura z razgledi in ritmom.
            </h2>

            <p className="mb-6 text-lg leading-8 text-zinc-400">
              Tura je zasnovana kot doživetje nad mestom: začetek v bližini
              Maribora, nato vzpon proti pohorskim gozdovom, razgledišča,
              tekoči makadamski odseki in gozdne poti, ki ustvarijo pravi
              občutek pobega v naravo.
            </p>

            <p className="text-lg leading-8 text-zinc-400">
              Kasneje bomo tukaj dodali GPX sled, priporočene postanke,
              opozorila, lokalne ponudnike, fotografije uporabnikov in nasvete
              za izvedbo ture.
            </p>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-[#0b1a10] p-6">
              <h3 className="mb-6 text-xl font-bold">Podlaga</h3>

              <div className="space-y-5">
                <SurfaceBar label="Asfalt" value={trail.surface.asphalt} />
                <SurfaceBar label="Makadam" value={trail.surface.gravel} />
                <SurfaceBar label="Gozdna pot" value={trail.surface.forest} />
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#0b1a10] p-6">
              <h3 className="mb-5 text-xl font-bold">Vreme na lokaciji ture</h3>

              {weather.length > 0 ? (
                <div className="space-y-3">
                  {weather.map((day) => (
                    <div
                      key={day.label}
                      className="flex items-center justify-between border-b border-white/10 pb-3 last:border-b-0 last:pb-0"
                    >
                      <span className="text-zinc-400">{day.label}</span>
                      <span className="font-semibold">
                        {day.icon} {day.temp}°
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-zinc-500">Vreme se nalaga...</p>
              )}

              <p className="mt-5 text-xs text-zinc-500">
                Napoved je vezana na lokacijo ture, ne na lokacijo uporabnika.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b1a10] px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#c58b46]">
              Zemljevid in GPX
            </p>

            <h2 className="text-4xl font-bold">Trasa ture.</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.7fr_0.3fr]">
            <div className="flex min-h-[420px] items-center justify-center rounded-[2rem] border border-white/10 bg-[#07110b]">
              <div className="text-center">
                <div className="mb-4 text-5xl">🗺️</div>
                <h3 className="mb-3 text-2xl font-bold">GPX zemljevid</h3>
                <p className="max-w-md text-zinc-400">
                  Tukaj bo prikazana trasa ture iz Strave ali naložene GPX
                  datoteke.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#07110b] p-6">
              <h3 className="mb-4 text-2xl font-bold">Prenos GPX</h3>

              <p className="mb-6 leading-7 text-zinc-400">
                Ko bo GPX datoteka dodana, bo uporabnik lahko prenesel turo za
                Garmin, Komoot, Bosch Flow ali drugo aplikacijo.
              </p>

              <button
                disabled
                className="w-full cursor-not-allowed rounded-full bg-white/10 px-6 py-4 font-semibold text-zinc-500"
              >
                GPX še ni dodan
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#c58b46]/20 bg-[#0b1a10] p-6 md:p-8">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#c58b46]">
            🔋 eBike kalkulator dosega
          </p>

          <h2 className="mb-4 text-3xl font-bold">
            Bosch Performance Line CX izračun.
          </h2>

          <p className="mb-8 max-w-3xl leading-7 text-zinc-400">
            Vnesi svojo težo, kapaciteto baterije in izberi način vožnje.
            Izračun je vezan na dolžino in višince te ture.
          </p>

          <div className="grid gap-8 lg:grid-cols-[0.45fr_0.55fr]">
            <div className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm text-zinc-400">
                  Teža kolesarja (kg)
                </span>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 text-white outline-none focus:border-[#c58b46]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-zinc-400">
                  Baterija (Wh)
                </span>
                <input
                  type="number"
                  value={battery}
                  onChange={(e) => setBattery(Number(e.target.value))}
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 text-white outline-none focus:border-[#c58b46]"
                />
              </label>

              <div className="grid grid-cols-3 gap-3">
                {modes.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setMode(item.key)}
                    className={`rounded-2xl border px-4 py-4 font-semibold transition ${
                      mode === item.key
                        ? "border-[#c58b46] bg-[#c58b46] text-black"
                        : "border-white/10 bg-[#07110b] text-zinc-400 hover:border-[#c58b46]/40"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#07110b] p-6">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-zinc-400">Poraba za to turo</span>
                <span className="text-2xl font-black text-[#f4d7ad]">
                  {batteryResult.totalWh} Wh ({batteryResult.usedPercent}%)
                </span>
              </div>

              <div className="mb-4 h-4 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(batteryResult.usedPercent, 100)}%`,
                    backgroundColor: batteryResult.color,
                  }}
                />
              </div>

              <div className="mb-6 text-sm text-zinc-500">
                Ostane po turi: približno {batteryResult.remaining}%
              </div>

              <div
                className="rounded-2xl border border-white/10 bg-black/20 p-5 font-semibold"
                style={{ color: batteryResult.color }}
              >
                {batteryResult.message}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b1a10] px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#c58b46]">
              Galerija
            </p>

            <h2 className="text-4xl font-bold">Utrinki s ture.</h2>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4">
            {trail.gallery.map((image) => (
              <div
                key={image}
                className="min-w-[82%] overflow-hidden rounded-[2rem] border border-white/10 sm:min-w-[48%] lg:min-w-[31%]"
              >
                <img
                  src={image}
                  alt="Utrinek s ture"
                  className="h-80 w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#102417] to-[#07110b] p-8 md:p-12">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#c58b46]">
            Doživetje ob poti
          </p>

          <h2 className="mb-5 text-4xl font-bold">
            Postanki in ponudniki pridejo v naslednji fazi.
          </h2>

          <p className="mb-8 max-w-3xl leading-8 text-zinc-400">
            Na tej turi bomo kasneje dodali priporočene razglede, gostilne,
            kavarne, kolesarske servise, nastanitve in posebna doživetja.
          </p>

          <a
            href="/ture"
            className="inline-block rounded-full bg-[#c58b46] px-8 py-4 font-semibold text-black transition hover:bg-[#d9a35d]"
          >
            Nazaj na vse ture
          </a>
        </div>
      </section>
    </main>
  );
}