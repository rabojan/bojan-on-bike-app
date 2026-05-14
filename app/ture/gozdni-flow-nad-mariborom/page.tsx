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
    "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&q=85&w=1200",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=85&w=1200",
    "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&q=85&w=1200",
  ],
};

const menuItems = [
  { label: "Ture", href: "/ture" },
  { label: "Doživetja", href: "/#dozivetja" },
  { label: "Ponudniki", href: "#" },
];

const dayPlan = [
  {
    time: "09:00",
    title: "Start nad mestom",
    text: "Začetek ture v mirnejšem ritmu, idealno za ogrevanje nog in pripravo na vzpon proti gozdu.",
  },
  {
    time: "10:30",
    title: "Gozdni odseki in prvi razgledi",
    text: "Tura se dvigne v pohorske gozdove, kjer pride do izraza pravi MTB občutek: senca, vonj gozda in tekoč ritem.",
  },
  {
    time: "12:00",
    title: "Postanek ob poti",
    text: "Čas za domačo hrano, kavo ali pijačo pri ponudniku ob trasi. Tukaj tura postane doživetje, ne samo vožnja.",
  },
  {
    time: "14:00",
    title: "Flow spust proti Mariboru",
    text: "Zaključni del je namenjen užitku: gozdna pot, lažji spust in občutek, da si naredil pravi kolesarski dan.",
  },
];

const providers = [
  {
    name: "Rudijev dom na Pohorju",
    types: ["Kulinarika", "Prenočitev"],
    story:
      "Domača postojanka za topel obrok, pijačo in počitek po gozdnem delu ture.",
    phone: "031 344 640",
    website: "Spletna stran",
    distance: "ob trasi",
    image:
      "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?auto=format&fit=crop&q=85&w=1200",
  },
  {
    name: "Pohorska razgledna točka",
    types: ["Razgled", "Fototočka"],
    story:
      "Kratek postanek za fotografijo, razgled proti Mariboru in občutek odprtega prostora nad mestom.",
    phone: "",
    website: "",
    distance: "300 m s trase",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=85&w=1200",
  },
  {
    name: "Lokalna kolesarska postaja",
    types: ["Voda", "Servis", "Polnilnica"],
    story:
      "Uporabna točka za dolivanje vode, hiter pregled kolesa in počitek pred zaključnim delom ture.",
    phone: "",
    website: "",
    distance: "blizu trase",
    image:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=85&w=1200",
  },
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

function providerIcon(type: string) {
  if (type === "Kulinarika") return "🍽️";
  if (type === "Vino") return "🍷";
  if (type === "Prenočitev") return "🛏️";
  if (type === "Razgled") return "📸";
  if (type === "Fototočka") return "📷";
  if (type === "Voda") return "💧";
  if (type === "Servis") return "🔧";
  if (type === "Polnilnica") return "🔋";
  return "📍";
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
          data.daily.temperature_2m_max
            .slice(0, 3)
            .map((temp: number, i: number) => ({
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
              <a
                key={item.label}
                href={item.href}
                className="transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
          >
            <span
              className={`absolute h-[2px] w-5 bg-white transition ${
                menuOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            />

            <span
              className={`absolute h-[2px] w-5 bg-white transition ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />

            <span
              className={`absolute h-[2px] w-5 bg-white transition ${
                menuOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
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
            Tura ni samo številka na zemljevidu. Je pobeg nad mesto, vonj
            pohorskega gozda, postanek ob poti in občutek, da si dan preživel
            točno tako, kot ga mora kolesar.
          </p>
        </div>
      </section>
    </main>
  );
}