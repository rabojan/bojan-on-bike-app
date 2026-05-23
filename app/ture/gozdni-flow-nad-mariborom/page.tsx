"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const photos = {
  hero:
    "https://images.unsplash.com/photo-1669372701525-06dde0779ba6?auto=format&fit=crop&q=88&w=2400",
  forest:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=86&w=1400",
  view:
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=86&w=1400",
  hut:
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=86&w=1400",
  lake:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=86&w=1400",
  rider:
    "https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?auto=format&fit=crop&q=86&w=1400",
  mountains:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=86&w=1400",
};

const stats = [
  { value: "32 km", label: "Dolžina trase" },
  { value: "890 vm", label: "Skupni vzpon" },
  { value: "1.120 m", label: "Najvišja točka" },
  { value: "Srednja", label: "Zahtevnost" },
  { value: "Apr–Nov", label: "Najboljši čas" },
];

const highlights = [
  {
    image: photos.rider,
    badge: "km 4–12",
    title: "Flow skozi pohorske gozdove",
    text:
      "Tura se začne z občutkom pobega iz mesta. Gozdni odseki, mehka podlaga in tekoči zavoji hitro postavijo ritem dneva, medtem ko Maribor počasi ostaja za tabo.",
  },
  {
    image: photos.view,
    badge: "razgled",
    title: "Razgled nad Mariborom",
    text:
      "Ko se gozd za trenutek odpre, se pokaže mesto pod tabo. To je tisti postanek, kjer se vožnja spremeni v razgled in razumeš, zakaj se je splačalo zaviti navzgor.",
  },
  {
    image: photos.forest,
    badge: "mir",
    title: "Mir med drevesi",
    text:
      "Makadam, senca in gozdne povezave umirijo tempo. Tukaj vožnja ni samo premikanje po trasi, ampak občutek, da si res zunaj in da dan končno teče počasneje.",
  },
];

const dayPlan = [
  {
    time: "09:00",
    title: "Zgodnji štart",
    text: "Najlepši del ture je zjutraj, ko je gozd še tih in so poti manj obremenjene.",
  },
  {
    time: "10:15",
    title: "Gozdni ritem",
    text: "Prvi del prinese tekoče odseke, nekaj vzpona in pravi občutek eMTB vožnje.",
  },
  {
    time: "11:30",
    title: "Razgled in pavza",
    text: "Na višjem delu si vzemi nekaj minut za pogled proti mestu in Pohorju.",
  },
  {
    time: "12:15",
    title: "Postanek ob poti",
    text: "Rudijev dom je naravna točka za juho, kavo ali samo miren predah.",
  },
  {
    time: "13:30",
    title: "Spust nazaj",
    text: "Zaključek naj bo sproščen. Ne hiti — flow se začuti, ko pustiš kolesu dihati.",
  },
];

const providers = [
  {
    image: photos.hut,
    type: "Koča",
    title: "Rudijev dom na Pohorju",
    distance: "ob trasi",
    text:
      "Topel postanek po vzponu, domača hrana in terasa, kjer tura za trenutek postane bolj družabna.",
    href: "/main-preview/ponudniki/rudijev-dom-na-pohorju",
  },
  {
    image: photos.mountains,
    type: "Razgled",
    title: "Gorska hiša Pohorje",
    distance: "850 m od trase",
    text:
      "Mirna lokacija, svež zrak in dovolj prostora, da po vožnji še malo ostaneš v dnevu.",
    href: "/ponudniki",
  },
];

const pois = [
  {
    image: photos.view,
    type: "Razgled",
    title: "Pogled nad Mariborom",
    distance: "350 m od trase",
    text:
      "Kratek postanek, ki pove več kot številke. Tu se pot za trenutek spremeni v spomin.",
  },
  {
    image: photos.forest,
    type: "Narava",
    title: "Pohorski gozdni odsek",
    distance: "ob trasi",
    text:
      "Najboljši del ture ni nujno najhitrejši. Včasih je to del, kjer se vse umiri.",
  },
  {
    image: photos.lake,
    type: "Postanek",
    title: "Mirna točka ob poti",
    distance: "600 m od trase",
    text:
      "Prostor za vodo, fotografijo ali samo nekaj minut tišine pred nadaljevanjem.",
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/15 bg-black/25 px-4 py-2 text-xs font-bold text-zinc-100 backdrop-blur-md">
      {children}
    </span>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-r border-white/10 px-5 py-5 last:border-r-0 md:px-8">
      <div className="text-2xl font-black leading-none text-[#f4d7ad]">
        {value}
      </div>
      <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
        {label}
      </div>
    </div>
  );
}

function MiniElevationProfile() {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
      <div className="mb-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500">
        <span>Višinski profil</span>
        <span>GPX</span>
      </div>

      <svg
        viewBox="0 0 640 116"
        className="h-[116px] w-full"
        role="img"
        aria-label="Višinski profil poti"
      >
        <defs>
          <linearGradient id="elevFillV2" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#c58b46" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#c58b46" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        <line x1="20" x2="620" y1="24" y2="24" stroke="rgba(255,255,255,.07)" strokeDasharray="4 7" />
        <line x1="20" x2="620" y1="58" y2="58" stroke="rgba(255,255,255,.07)" strokeDasharray="4 7" />
        <line x1="20" x2="620" y1="92" y2="92" stroke="rgba(255,255,255,.07)" strokeDasharray="4 7" />

        <path
          d="M20 92 C70 86 105 76 142 64 C178 52 205 32 244 28 C282 24 305 52 342 50 C390 48 412 24 458 22 C498 20 520 48 554 60 C586 70 604 72 620 64 L620 100 L20 100 Z"
          fill="url(#elevFillV2)"
        />

        <path
          d="M20 92 C70 86 105 76 142 64 C178 52 205 32 244 28 C282 24 305 52 342 50 C390 48 412 24 458 22 C498 20 520 48 554 60 C586 70 604 72 620 64"
          fill="none"
          stroke="#c58b46"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />

        <circle cx="20" cy="92" r="4" fill="#c58b46" />
        <circle cx="458" cy="22" r="4" fill="#c58b46" />
        <circle cx="620" cy="64" r="4" fill="#c58b46" />

        <text x="20" y="114" textAnchor="middle" fill="rgba(237,240,232,.5)" fontSize="10" fontWeight="700">0 km</text>
        <text x="458" y="16" textAnchor="middle" fill="rgba(237,240,232,.62)" fontSize="10" fontWeight="700">1.120 m</text>
        <text x="620" y="114" textAnchor="middle" fill="rgba(237,240,232,.5)" fontSize="10" fontWeight="700">32 km</text>
      </svg>
    </div>
  );
}

function SurfaceBreakdown() {
  const surfaces = [
    { name: "Gozdne poti", value: "55%", width: "55%" },
    { name: "Singletraili", value: "30%", width: "30%" },
    { name: "Makadam", value: "15%", width: "15%" },
  ];

  return (
    <div className="space-y-5">
      {surfaces.map((surface) => (
        <div key={surface.name}>
          <div className="mb-2 flex justify-between text-sm font-bold text-zinc-300">
            <span>{surface.name}</span>
            <span>{surface.value}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[#c58b46]"
              style={{ width: surface.width }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function HighlightCard({
  image,
  badge,
  title,
  text,
}: {
  image: string;
  badge: string;
  title: string;
  text: string;
}) {
  return (
    <article className="overflow-hidden rounded-[26px] border border-white/10 bg-[#0b1a10]">
      <div
        className="h-[230px] bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="flex h-full items-start p-4">
          <span className="rounded-full border border-[#c58b46]/35 bg-black/45 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#f4d7ad] backdrop-blur">
            {badge}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold leading-tight text-white font-serif italic">
          {title}
        </h3>
        <p className="mt-4 min-h-[84px] text-sm leading-7 text-zinc-400">
          {text}
        </p>
      </div>
    </article>
  );
}

function ProviderCard({
  image,
  type,
  title,
  distance,
  text,
  href,
}: {
  image: string;
  type: string;
  title: string;
  distance: string;
  text: string;
  href?: string;
}) {
  return (
    <article className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0b1a10] transition hover:-translate-y-1 hover:border-[#c58b46]/35">
      <div
        className="relative h-[190px] bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a10] via-transparent to-transparent" />
        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-200 backdrop-blur">
          {type}
        </div>
        <div className="absolute bottom-4 right-4 text-[10px] font-black uppercase tracking-[0.16em] text-[#c58b46]">
          {distance}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white font-serif italic">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-zinc-400">{text}</p>
        {href ? (
          <Link href={href} className="mt-5 inline-block rounded-full border border-[#c58b46]/40 px-5 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-[#c58b46] transition hover:bg-[#c58b46] hover:text-black">
            Ogled ponudnika
          </Link>
        ) : (
          <button className="mt-5 rounded-full border border-[#c58b46]/40 px-5 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-[#c58b46] transition hover:bg-[#c58b46] hover:text-black">
            Ogled ponudnika
          </button>
        )}
      </div>
    </article>
  );
}

function PoiCard({
  image,
  type,
  title,
  distance,
  text,
}: {
  image: string;
  type: string;
  title: string;
  distance: string;
  text: string;
}) {
  return (
    <article className="overflow-hidden rounded-[22px] border border-white/10 bg-[#0b1a10]">
      <div
        className="relative h-[150px] bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a10] via-transparent to-transparent" />
        <div className="absolute left-3 top-3 rounded-full bg-black/45 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#f4d7ad]">
          {type}
        </div>
        <div className="absolute bottom-3 right-3 rounded-full bg-black/45 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#c58b46]">
          {distance}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-white font-serif italic">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p>
      </div>
    </article>
  );
}

function WeatherCard() {
  const days = [
    ["Danes", "☀️", "18°", "delno jasno"],
    ["Jutri", "🌤️", "15°", "sončno"],
    ["Pojutrišnjem", "🌧️", "12°", "možna ploha"],
  ];

  return (
    <div className="rounded-[24px] border border-white/10 bg-[#0b1a10] p-5">
      <div className="text-[10px] font-black uppercase tracking-[0.24em] text-zinc-500">
        Vreme na progi
      </div>
      <h3 className="mt-2 text-xl font-black text-white font-serif italic">
        Napoved za lokacijo
      </h3>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {days.map(([day, icon, temp, text]) => (
          <div key={day} className="rounded-2xl border border-white/10 bg-black/15 p-3 text-center">
            <div className="text-[10px] font-bold text-zinc-500">{day}</div>
            <div className="mt-2 text-2xl">{icon}</div>
            <div className="mt-1 text-2xl font-black text-[#f4d7ad]">
              {temp}
            </div>
            <div className="mt-1 text-[11px] text-zinc-500">{text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BoschCard() {
  const [weight, setWeight] = useState(88);
  const [battery, setBattery] = useState(900);
  const [mode, setMode] = useState("Trail");

  const batteryResult = useMemo(() => {
    const base = mode === "Eco" ? 180 : mode === "Trail" ? 280 : 420;
    const usedWh = Math.round(base + weight * 0.9 + 890 * 0.12);
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

  return (
    <div className="rounded-[24px] border border-[#c58b46]/25 bg-[#0b1a10] p-5">
      <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[#c58b46]">
        eBike kalkulator dosega
      </div>

      <h3 className="mt-2 text-xl font-black text-white font-serif italic">
        Bosch Performance Line CX
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500">
        Bosch uporabljamo kot referenčni izračun, ker je ena najpogostejših rešitev pri e-kolesih. Izračun je informativen in vezan na dolžino, višince, težo kolesarja, kapaciteto baterije in način podpore.
      </p>

      <div className="mt-5 space-y-5">
        <label className="block">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
              Teža kolesarja
            </span>
            <span className="text-xl font-black text-[#f4d7ad]">
              {weight} kg
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="120"
            step="1"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full accent-[#c58b46]"
          />
          <div className="mt-1 flex justify-between text-[10px] font-bold text-zinc-600">
            <span>50 kg</span>
            <span>120 kg</span>
          </div>
        </label>

        <label className="block">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
              Kapaciteta baterije
            </span>
            <span className="text-xl font-black text-[#f4d7ad]">
              {battery} Wh
            </span>
          </div>
          <input
            type="range"
            min="250"
            max="1000"
            step="25"
            value={battery}
            onChange={(e) => setBattery(Number(e.target.value))}
            className="w-full accent-[#c58b46]"
          />
          <div className="mt-1 flex justify-between text-[10px] font-bold text-zinc-600">
            <span>250 Wh</span>
            <span>1000 Wh</span>
          </div>
        </label>

        <div>
          <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
            Način podpore
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["Eco", "Trail", "eMTB"].map((item) => (
              <button
                key={item}
                onClick={() => setMode(item)}
                className={`rounded-2xl px-3 py-3 text-xs font-semibold transition ${
                  mode === item
                    ? "bg-[#c58b46] text-black"
                    : "border border-white/10 bg-black/20 text-zinc-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-zinc-400">Poraba za turo</div>
          <div className="text-xl font-black text-white">
            {batteryResult.usedWh} Wh ({batteryResult.usedPercent}%)
          </div>
        </div>

        <div className="mt-5 h-4 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-[#36d399]"
            style={{ width: `${batteryResult.remaining}%` }}
          />
        </div>

        <div className="mt-4 text-sm text-zinc-400">
          Ostane približno {batteryResult.remaining}% baterije.
        </div>

        <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-bold text-emerald-300">
          {batteryResult.message}
        </div>
      </div>
    </div>
  );
}

export default function PremiumTuraV2Page() {
  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07110b]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1480px] items-center justify-between px-6">
          <Link href="/" className="text-lg font-black text-white">
            Bojan <span className="font-normal text-[#f4d7ad]">on Bike</span>
          </Link>

          <nav className="hidden items-center gap-8 text-xs font-bold uppercase tracking-[0.12em] text-zinc-500 md:flex">
            <Link href="/ture" className="text-[#c58b46]">Ture</Link>
            <Link href="/dozivetja">Doživetja</Link>
            <Link href="/ponudniki">Ponudniki</Link>
            <Link href="/znamenitosti">Znamenitosti</Link>
          </nav>

          <Link
            href="/ture/gozdni-flow-nad-mariborom"
            className="rounded-full border border-[#c58b46]/35 px-5 py-2 text-xs font-black text-[#c58b46]"
          >
            ← Trenutna tura
          </Link>
        </div>
      </header>

      <section className="relative min-h-[92vh] overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${photos.hero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07110b]/70 via-[#07110b]/25 to-[#07110b]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07110b]/75 via-transparent to-transparent" />

        <div className="relative mx-auto flex min-h-[calc(92vh-64px)] max-w-[1480px] items-end px-6 pb-16">
          <div className="max-w-4xl">
            <div className="text-xs font-black uppercase tracking-[0.34em] text-[#c58b46]">
              MTB tura · Štajerska · Pohorje
            </div>
            <h1 className="mt-6 text-6xl font-black leading-[0.9] tracking-tight text-white md:text-8xl font-serif italic">
              Gozdni flow
              <br />
              nad Mariborom
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300">
              Pohorje se tukaj pokaže od najboljše strani. Gozdni enosledniki,
              razgled, ki ustavi dih, in Rudijev dom kot zaslužena nagrada.
              Tura, ki jo boš priporočil.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Pill>MTB / eMTB</Pill>
              <Pill>Gozdni pobeg</Pill>
              <Pill>Lokalni postanek</Pill>
              <Pill>GPX pripravljen</Pill>
            </div>

            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#voznja" className="rounded-full bg-[#c58b46] px-7 py-3 text-sm font-black text-black">
                Oglej si turo
              </a>
              <button className="rounded-full border border-[#c58b46]/40 px-7 py-3 text-sm font-black text-[#f4d7ad]">
                Prenesi GPX
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b1a10]">
        <div className="mx-auto grid max-w-[1480px] grid-cols-2 md:grid-cols-5">
          {stats.map((stat) => (
            <Metric key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>

      <div className="mx-auto grid max-w-[1480px] grid-cols-1 items-start lg:grid-cols-[1fr_360px]">
        <div className="min-w-0">
          <section className="border-b border-white/10 px-6 py-14">
            <div className="rounded-[28px] border border-[#c58b46]/25 bg-[#0b1a10] p-7">
              <div className="grid gap-6 md:grid-cols-[260px_1fr] md:items-center">
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
                    alt="Bojan Ratej"
                    className="h-16 w-16 rounded-full border-2 border-[#c58b46]/35 object-cover"
                  />
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[#c58b46]">
                      Izbral lokalni ambasador
                    </div>
                    <div className="mt-1 text-2xl font-bold">
                      Bojan Ratej
                    </div>
                    <div className="text-xs font-bold text-zinc-500">
                      Ambasador Štajerske
                    </div>
                  </div>
                </div>
                <blockquote className="border-l border-[#c58b46]/35 pl-6 text-lg font-semibold leading-8 text-zinc-300">
                  “Ena tistih tur, kjer gozd dela svoje in misli se umirijo.
                  Hitri flow odseki, odprti razgledi in mirne povezave — popoln
                  krog nad mestom.”
                </blockquote>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] border border-white/10 bg-[#0b1a10] p-6">
              <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[#c58b46]">
                Ambasadorjev namig
              </div>
              <h3 className="mt-2 text-2xl font-bold font-serif italic">
                Tura z najlepšimi jutri.
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">
                Najlepše je, ko se megla še dviga med drevesi. Pri Rudijevem
                domu si vzemi čas — ne zaradi kljukice, ampak zato, ker je to
                del dneva, ki si ga boš zapomnil.
              </p>
            </div>
          </section>

          <section className="border-b border-white/10 px-6 py-16">
            <div className="mx-auto max-w-[1180px] text-center">
              <div className="text-xs font-black uppercase tracking-[0.34em] text-[#c58b46]">
                Poudarki na progi
              </div>
              <h2 className="mt-4 text-5xl font-bold leading-tight font-serif italic">
                Kaj te čaka na poti
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-zinc-400">
                Najprej vidiš turo, nato kdo jo je izbral, potem pa takoj dobiš
                odgovor: zakaj bi šel na to pot in kaj boš na njej doživel.
              </p>

              <div className="mt-10 grid gap-5 lg:grid-cols-3">
                {highlights.map((item) => (
                  <HighlightCard key={item.title} {...item} />
                ))}
              </div>
            </div>
          </section>

          <section id="voznja" className="border-b border-white/10 px-6 py-16">
            <div className="mx-auto grid max-w-[1180px] gap-6 rounded-[30px] border border-white/10 bg-[#0b1a10] p-7 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.34em] text-[#c58b46]">
                  Tehnične podrobnosti
                </div>
                <h2 className="mt-3 text-4xl font-bold font-serif italic">
                  Kakšna je vožnja?
                </h2>
                <p className="mt-4 text-sm leading-7 text-zinc-400">
                  Gozdna, razgibana in igriva. Dovolj podatkov, da veš, kaj te
                  čaka — in dovolj občutka, da razumeš, zakaj je tura vredna
                  dneva.
                </p>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  {[
                    ["Dolžina", "32 km"],
                    ["Skupni vzpon", "890 vm"],
                    ["Skupni spust", "810 vm"],
                    ["Najvišja točka", "1.120 m"],
                    ["Najnižja točka", "278 m"],
                    ["Tip kolesa", "MTB / eMTB"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-black/15 p-4">
                      <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#c58b46]">
                        {label}
                      </div>
                      <div className="mt-2 text-lg font-black text-zinc-100">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.34em] text-[#c58b46]">
                    Sestava podlage
                  </div>
                  <h3 className="mt-3 text-4xl font-bold font-serif italic">
                    Razgibana, gozdna in igriva
                  </h3>

                  <div className="mt-7">
                    <SurfaceBreakdown />
                  </div>
                </div>

                <div className="mt-8">
                  <MiniElevationProfile />
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-white/10 px-6 py-16">
            <div className="mx-auto max-w-[1180px]">
              <div className="text-xs font-black uppercase tracking-[0.34em] text-[#c58b46]">
                Trasa ture
              </div>
              <h2 className="mt-3 text-4xl font-bold font-serif italic">
                Kje gre pot?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
                Zemljevid in GPX sta osnova. Najprej vidiš občutek dneva,
                potem pa točno pot, ki jo lahko preneseš na svojo napravo.
              </p>

              <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1a10]">
                <iframe
                  title="Zemljevid trase"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=15.55%2C46.50%2C15.78%2C46.62&layer=mapnik"
                  className="h-[520px] w-full border-0"
                />
              </div>

              <div className="mt-5 flex gap-3">
                <button className="rounded-full border border-[#c58b46]/40 px-5 py-3 text-xs font-black text-[#c58b46]">
                  Prenesi GPX
                </button>
              </div>
            </div>
          </section>

          <section className="border-b border-white/10 px-6 py-16">
            <div className="mx-auto max-w-[1180px]">
              <div className="text-xs font-black uppercase tracking-[0.34em] text-[#c58b46]">
                Ritem dneva
              </div>
              <h2 className="mt-3 text-4xl font-bold font-serif italic">
                Od jutra do mirnega zaključka.
              </h2>

              <div className="mt-10 grid gap-4 md:grid-cols-5">
                {dayPlan.map((item) => (
                  <div key={item.time} className="border-l border-[#c58b46]/30 pl-5">
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-[#c58b46]">
                      {item.time}
                    </div>
                    <h3 className="mt-3 text-xl font-bold font-serif italic">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-b border-white/10 px-6 py-16">
            <div className="mx-auto max-w-[1180px]">
              <div className="text-xs font-black uppercase tracking-[0.34em] text-[#c58b46]">
                Postanek, ki dopolni dan
              </div>
              <h2 className="mt-3 text-4xl font-bold font-serif italic">
                Postanki, ki naredijo kolesarski dan.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
                Ponudniki niso dodatek na koncu. So razlog, da se tura spremeni
                v dan, ki ga priporočiš prijatelju.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {providers.map((provider) => (
                  <ProviderCard key={provider.title} {...provider} />
                ))}
              </div>
            </div>
          </section>

          <section className="border-b border-white/10 px-6 py-16">
            <div className="mx-auto max-w-[1180px]">
              <div className="text-xs font-black uppercase tracking-[0.34em] text-[#c58b46]">
                Znamenitosti ob poti
              </div>
              <h2 className="mt-3 text-4xl font-bold font-serif italic">
                Razlogi, da se ustaviš.
              </h2>

              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {pois.map((poi) => (
                  <PoiCard key={poi.title} {...poi} />
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 py-16">
            <div className="mx-auto max-w-[1180px]">
              <div className="text-xs font-black uppercase tracking-[0.34em] text-[#c58b46]">
                Galerija z utrinki
              </div>
              <h2 className="mt-3 text-4xl font-bold font-serif italic">
                Tura v slikah.
              </h2>

              <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
                {[photos.view, photos.forest, photos.hut, photos.mountains].map((image, index) => (
                  <div
                    key={image}
                    className={index === 0 ? "col-span-2 row-span-2 h-[420px] rounded-[24px] bg-cover bg-center" : "h-[204px] rounded-[24px] bg-cover bg-center"}
                    style={{ backgroundImage: `url(${image})` }}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>

        <aside className="hidden self-start border-l border-white/10 px-6 py-10 lg:sticky lg:top-20 lg:block">
          <div className="space-y-5">
            <WeatherCard />
            <BoschCard />

            <div className="rounded-[24px] border border-white/10 bg-[#0b1a10] p-5">
              <div className="text-[10px] font-black uppercase tracking-[0.24em] text-zinc-500">
                Hitri povzetek
              </div>
              <div className="mt-4 space-y-3 text-sm">
                {[
                  ["Za koga", "MTB / eMTB"],
                  ["Najboljši čas", "zgodaj dopoldne"],
                  ["Glavni postanek", "Rudijev dom"],
                  ["Dodatni postanki", "možno dodati več"],
                  ["Občutek", "gozdni pobeg"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between border-b border-white/10 pb-3 last:border-0">
                    <span className="text-zinc-500">{label}</span>
                    <span className="font-bold text-zinc-200">{value}</span>
                  </div>
                ))}
              </div>

              <button className="mt-5 w-full rounded-full border border-[#c58b46]/35 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-[#c58b46] transition hover:bg-[#c58b46] hover:text-black">
                Dodaj postanek
              </button>
            </div>
          </div>
        </aside>
      </div>

      <section className="border-t border-white/10 bg-[#0b1a10] px-6 py-16">
        <div className="mx-auto grid max-w-[1180px] gap-8 rounded-[30px] border border-[#c58b46]/25 bg-[#11170d] p-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.3em] text-[#c58b46]">
              Predlagaj svojo turo
            </div>
            <h2 className="mt-3 text-4xl font-bold font-serif italic">
              Poznaš lokalno pot, ki si zasluži biti tukaj?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
              Pomagaj nam graditi zbirko kolesarskih dni, ki imajo zgodbo,
              ritem, postanek in lokalni podpis.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/predlagaj-turo" className="rounded-full bg-[#c58b46] px-7 py-3 text-center text-sm font-black text-black">
              Predlagaj svojo turo
            </Link>
            <Link href="/ture" className="rounded-full border border-[#c58b46]/35 px-7 py-3 text-center text-sm font-black text-[#c58b46]">
              Vse ture
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-xs text-zinc-600">
        <div className="mx-auto flex max-w-[1480px] justify-between">
          <span className="italic">Bojan on Bike</span>
          <span>© koncept premium ture</span>
        </div>
      </footer>
    </main>
  );
}
