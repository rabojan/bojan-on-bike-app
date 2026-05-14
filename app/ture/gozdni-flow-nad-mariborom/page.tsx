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

  hero:
    "https://images.unsplash.com/photo-1669372701525-06dde0779ba6?auto=format&fit=crop&q=85&w=2400",

  gallery: [
    "https://images.unsplash.com/photo-1669372701525-06dde0779ba6?auto=format&fit=crop&q=85&w=1200",
    "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&q=85&w=1200",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=85&w=1200",
  ],

  surface: {
    asphalt: 10,
    gravel: 25,
    forest: 65,
  },
};

const providers = [
  {
    name: "Rudijev dom na Pohorju",
    tags: ["Kulinarika", "Prenočitev"],
    description:
      "Topel domač obrok, sladica in terasa s pogledom proti gozdovom Pohorja.",
    image:
      "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?auto=format&fit=crop&q=85&w=1200",
  },
  {
    name: "Pohorska razgledna točka",
    tags: ["Razgled", "Fototočka"],
    description:
      "Postanek za razgled nad Mariborom in fotografijo ob robu gozda.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=85&w=1200",
  },
];

const dayPlan = [
  {
    time: "09:00",
    title: "Start nad mestom",
    text: "Počasen začetek proti pohorskim gozdovom in prvi občutek pobega iz mesta.",
  },
  {
    time: "10:30",
    title: "Flow skozi gozd",
    text: "Mešanica makadama in gozdnih poti ustvari pravi MTB ritem.",
  },
  {
    time: "12:00",
    title: "Postanek ob poti",
    text: "Kosilo ali kava pri lokalnem ponudniku med razgledom proti dolini.",
  },
  {
    time: "14:00",
    title: "Spust proti Mariboru",
    text: "Zaključni del ture je namenjen užitku in tekočemu spustu.",
  },
];

const modes = [
  { key: "eco", label: "Eco", distanceFactor: 3.5, elevationFactor: 12 },
  { key: "trail", label: "Trail", distanceFactor: 4.5, elevationFactor: 16 },
  { key: "emtb", label: "eMTB", distanceFactor: 6, elevationFactor: 20 },
];

function SurfaceBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
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
  if (code <= 82) return "🌦️";
  if (code >= 95) return "⛈️";
  return "⛅";
}

export default function TrailPage() {
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
          data.daily.temperature_2m_max.map(
            (temp: number, index: number) => ({
              label: labels[index],
              temp: Math.round(temp),
              icon: weatherIcon(data.daily.weathercode[index]),
            })
          )
        );
      });
  }, []);

  const batteryResult = useMemo(() => {
    const selected =
      modes.find((item) => item.key === mode) || modes[1];

    const weightFactor = 1 + ((weight - 88) / 88) * 0.15;

    const totalWh = Math.round(
      (trail.distanceKm * selected.distanceFactor +
        (trail.elevationVm / 100) * selected.elevationFactor) *
        weightFactor
    );

    const usedPercent = Math.round((totalWh / battery) * 100);
    const remaining = Math.max(0, 100 - usedPercent);

    let message = "";

    if (usedPercent > 100) {
      message = "Baterija ne zadostuje za to turo.";
    } else if (remaining >= 50) {
      message = `Odlično! Prideš domov s približno ${remaining}% baterije.`;
    } else if (remaining >= 25) {
      message = `Baterija zadostuje. Ostane približno ${remaining}%.`;
    } else {
      message = `Tura je na meji dosega.`;
    }

    return {
      totalWh,
      usedPercent,
      remaining,
      message,
    };
  }, [weight, battery, mode]);

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#07110b]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <a href="/" className="text-lg font-bold">
            Bojan on Bike
          </a>

          <nav className="hidden gap-8 text-sm text-zinc-300 md:flex">
            <a href="/ture">Ture</a>
            <a href="/">Doživetja</a>
            <a href="/">Ponudniki</a>
          </nav>
        </div>
      </header>

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
            Tura ni samo številka na zemljevidu. Je pobeg nad mesto,
            vonj pohorskega gozda, postanek ob poti in občutek, da si
            dan preživel točno tako, kot ga mora kolesar.
          </p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b1a10] px-5 py-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-5">
          <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
            <div className="text-3xl font-bold">{trail.distanceKm} km</div>
            <div className="mt-2 text-sm text-zinc-400">dolžina</div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
            <div className="text-3xl font-bold">{trail.elevationVm} vm</div>
            <div className="mt-2 text-sm text-zinc-400">vzpon</div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
            <div className="text-3xl font-bold">{trail.difficulty}</div>
            <div className="mt-2 text-sm text-zinc-400">težavnost</div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
            <div className="text-3xl font-bold">{trail.rating}</div>
            <div className="mt-2 text-sm text-zinc-400">ocena</div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
            <div className="text-3xl font-bold">{trail.season}</div>
            <div className="mt-2 text-sm text-zinc-400">sezona</div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c58b46]">
              Opis ture
            </p>

            <h2 className="text-5xl font-black leading-tight">
              Gozdna tura z razgledi in ritmom.
            </h2>

            <div className="mt-8 space-y-6 text-lg leading-8 text-zinc-300">
              <p>
                Tura je zasnovana kot doživetje nad mestom:
                začetek v bližini Maribora, nato vzpon proti
                pohorskim gozdovom, razgledišča, tekoči makadamski
                odseki in gozdne poti.
              </p>

              <p>
                To ni samo športna aktivnost. Je kombinacija narave,
                ritma vožnje, lokalnih postankov in občutka, da si
                za nekaj ur pobegnil iz vsakdanjega sveta.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[32px] border border-emerald-900/60 bg-[#102015]/90 p-8">
              <h3 className="mb-8 text-2xl font-bold">Podlaga</h3>

              <div className="space-y-6">
                <SurfaceBar
                  label="Asfalt"
                  value={trail.surface.asphalt}
                />

                <SurfaceBar
                  label="Makadam"
                  value={trail.surface.gravel}
                />

                <SurfaceBar
                  label="Gozdna pot"
                  value={trail.surface.forest}
                />
              </div>
            </div>

            <div className="rounded-[32px] border border-emerald-900/60 bg-[#102015]/90 p-8">
              <h3 className="mb-8 text-2xl font-bold">
                Vreme na lokaciji ture
              </h3>

              <div className="space-y-5">
                {weather.map((day) => (
                  <div
                    key={day.label}
                    className="flex items-center justify-between border-b border-white/5 pb-4"
                  >
                    <span className="text-zinc-300">{day.label}</span>

                    <span className="font-semibold">
                      {day.icon} {day.temp}°
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-sm text-zinc-500">
                Napoved je vezana na lokacijo ture.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b1a10] px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c58b46]">
            Zemljevid in GPX
          </p>

          <h2 className="text-5xl font-black">Trasa ture.</h2>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="flex min-h-[420px] items-center justify-center rounded-[32px] border border-white/10 bg-black/20">
              <div className="text-center">
                <div className="text-5xl">🗺️</div>

                <div className="mt-6 text-3xl font-bold">
                  GPX zemljevid
                </div>

                <p className="mt-4 text-zinc-400">
                  Tukaj bo prikazana prava GPS trasa ture.
                </p>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-black/20 p-8">
              <h3 className="text-2xl font-bold">
                Prenos GPX
              </h3>

              <p className="mt-5 leading-7 text-zinc-400">
                GPX datoteka bo omogočala uporabo v Garmin,
                Komoot, Bosch Flow in drugih aplikacijah.
              </p>

              <button className="mt-10 w-full rounded-full bg-[#c58b46] px-6 py-4 font-semibold text-black transition hover:opacity-90">
                Prenesi GPX
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto max-w-7xl rounded-[40px] border border-emerald-900/60 bg-[#102015]/90 p-10 md:p-14">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c58b46]">
            eBike kalkulator dosega
          </p>

          <h2 className="text-4xl font-black">
            Bosch Performance Line CX izračun.
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-zinc-400">
            Izračun je narejen za e-kolesa z Bosch Performance
            Line CX motorjem.
          </p>

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <div className="space-y-8">
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
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-lg outline-none"
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
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-lg outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {modes.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setMode(item.key)}
                    className={`rounded-2xl px-4 py-4 font-semibold transition ${
                      mode === item.key
                        ? "bg-[#c58b46] text-black"
                        : "border border-white/10 bg-black/30"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-black/20 p-8">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-zinc-400">
                    Poraba za turo
                  </div>

                  <div className="mt-2 text-4xl font-black">
                    {batteryResult.totalWh} Wh
                  </div>
                </div>

                <div className="text-2xl font-bold">
                  {batteryResult.usedPercent}%
                </div>
              </div>

              <div className="mt-8 h-4 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#2ecc71]"
                  style={{
                    width: `${Math.min(
                      batteryResult.usedPercent,
                      100
                    )}%`,
                  }}
                />
              </div>

              <div className="mt-4 text-zinc-400">
                Ostane po turi približno{" "}
                {batteryResult.remaining}% baterije.
              </div>

              <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-emerald-300">
                {batteryResult.message}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b1a10] px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c58b46]">
            Doživetveni plan dneva
          </p>

          <h2 className="text-5xl font-black">
            Kako izgleda dan na turi.
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {dayPlan.map((item) => (
              <div
                key={item.time}
                className="rounded-[32px] border border-white/10 bg-black/20 p-8"
              >
                <div className="text-sm uppercase tracking-[0.25em] text-[#c58b46]">
                  {item.time}
                </div>

                <h3 className="mt-5 text-3xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-5 leading-8 text-zinc-400">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c58b46]">
            Ponudniki in POI ob poti
          </p>

          <h2 className="text-5xl font-black">
            Tura ni samo vožnja.
          </h2>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {providers.map((provider) => (
              <div
                key={provider.name}
                className="overflow-hidden rounded-[36px] border border-white/10 bg-black/20"
              >
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="h-72 w-full object-cover"
                />

                <div className="p-8">
                  <div className="mb-5 flex flex-wrap gap-3">
                    {provider.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#c58b46]/30 bg-[#c58b46]/10 px-4 py-2 text-sm text-[#f4d7ad]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-3xl font-bold">
                    {provider.name}
                  </h3>

                  <p className="mt-5 leading-8 text-zinc-400">
                    {provider.description}
                  </p>

                  <button className="mt-8 rounded-full bg-[#c58b46] px-6 py-4 font-semibold text-black transition hover:opacity-90">
                    Odpri ponudnika
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c58b46]">
            Galerija
          </p>

          <h2 className="text-5xl font-black">
            Utrinki s ture.
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {trail.gallery.map((image) => (
              <img
                key={image}
                src={image}
                alt="Galerija"
                className="h-80 w-full rounded-[32px] object-cover"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}