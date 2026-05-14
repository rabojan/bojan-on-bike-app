"use client";

import { useState } from "react";

const menuItems = ["Ture", "Regije", "Doživetja", "Ponudniki"];

const featuredTrails = [
  {
    region: "Pohorje",
    type: "MTB",
    title: "Gozdni flow nad Mariborom",
    distance: "32 km",
    elevation: "890 m",
    difficulty: "Srednja",
    difficultyStyle: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    surface: { asphalt: 10, gravel: 25, forest: 65 },
    text: "Tura skozi pohorske gozdove, razglede in spuste, ki so ustvarjeni za pravi kolesarski dan.",
  },
  {
    region: "Slovenske gorice",
    type: "Gravel / e-bike",
    title: "Med vinogradi in griči",
    distance: "48 km",
    elevation: "620 m",
    difficulty: "Lahka",
    difficultyStyle: "border-sky-500/30 bg-sky-500/10 text-sky-300",
    surface: { asphalt: 45, gravel: 40, forest: 15 },
    text: "Mehkejši ritmi, vinske ceste, razgledi in postanki pri lokalnih ponudnikih.",
  },
  {
    region: "Soška dolina",
    type: "Bikepacking",
    title: "Alpski pobeg ob vodi",
    distance: "86 km",
    elevation: "1450 m",
    difficulty: "Zahtevna",
    difficultyStyle: "border-orange-500/30 bg-orange-500/10 text-orange-300",
    surface: { asphalt: 30, gravel: 50, forest: 20 },
    text: "Večdnevna izkušnja med rekami, prelazi, vasicami in nepozabno naravo.",
  },
];

const regions = ["Pohorje", "Maribor", "Slovenske gorice", "Soška dolina", "Istra", "Goriška"];

const stats = [
  { value: "30+", label: "za aktivne raziskovalce" },
  { value: "6", label: "začetnih regij" },
  { value: "MTB", label: "e-bike / gravel" },
];

const howItWorks = [
  {
    step: "01",
    title: "Izberi regijo",
    text: "Začni pri prostoru: Pohorje, Soška dolina, Istra ali katera od prihodnjih kolesarskih regij.",
  },
  {
    step: "02",
    title: "Primerjaj ture",
    text: "Poglej dolžino, višince, težavnost in podlago. Hitro vidiš, katera tura je prava za tvoj dan.",
  },
  {
    step: "03",
    title: "Sestavi doživetje",
    text: "Turi dodaš postanke, razglede, kulinariko, nastanitve in lokalne ponudnike ob poti.",
  },
];

function SurfaceBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-zinc-400">{label}</span>
        <span className="font-semibold text-white">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-white" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <div className="text-lg font-bold tracking-wide">Bojan on Bike</div>

          <nav className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
            {menuItems.map((item) => (
              <a key={item} className="transition hover:text-white" href="#">
                {item}
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
        <div className="fixed inset-0 z-40 bg-black/95 px-5 pt-24 backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col">
            {menuItems.map((item) => (
              <a
                key={item}
                href="#"
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/10 py-6 text-3xl font-semibold"
              >
                {item}
              </a>
            ))}
          </nav>

          <p className="mt-8 max-w-sm text-zinc-400">
            Premium kolesarska platforma za raziskovanje Slovenije skozi ture,
            regije in lokalna doživetja.
          </p>
        </div>
      )}

      <section className="relative flex min-h-screen items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1669372701525-06dde0779ba6?auto=format&fit=crop&fm=jpg&q=85&w=3000"
          alt="MTB kolesar na gozdni poti"
          className="absolute inset-0 h-full w-full object-cover object-[42%_center] opacity-65 md:object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-zinc-200 backdrop-blur">
              Slovenija • MTB • e-bike • gravel • doživetja
            </div>

            <h1 className="mb-7 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Odkrij Slovenijo
              <br />
              skozi kolo.
            </h1>

            <p className="mb-10 max-w-2xl text-lg leading-8 text-zinc-200 md:text-xl">
              Premium spletna platforma za odkrivanje kolesarskih tur, regij,
              lokalnih ponudnikov in doživetij ob poti.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:bg-zinc-200">
                Razišči ture
              </button>

              <button className="rounded-full border border-white/25 bg-black/30 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/10">
                Odkrij regije
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-zinc-950 px-5 py-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-black px-6 py-5">
              <div className="text-2xl font-black">{stat.value}</div>
              <div className="mt-1 text-sm text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-500">
              Izbrane ture
            </p>
            <h2 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
              Ture, ki niso samo trase, ampak zgodbe.
            </h2>
          </div>

          <div className="grid items-stretch gap-6 md:grid-cols-3">
            {featuredTrails.map((trail) => (
              <article
                key={trail.title}
                className="group flex h-full flex-col rounded-[2rem] border border-white/10 bg-zinc-950/80 p-7 backdrop-blur transition hover:-translate-y-1 hover:border-white/20 hover:bg-zinc-900/80"
              >
                <div className="mb-6 flex items-center justify-between text-sm text-zinc-500">
                  <span>{trail.region}</span>
                  <span>{trail.type}</span>
                </div>

                <h3 className="mb-5 min-h-[86px] text-3xl font-bold leading-tight">
                  {trail.title}
                </h3>

                <div className="mb-6 flex flex-wrap gap-3">
                  <span className="rounded-full border border-white/10 px-4 py-2 text-sm">{trail.distance}</span>
                  <span className="rounded-full border border-white/10 px-4 py-2 text-sm">{trail.elevation}</span>
                  <span className={`rounded-full border px-4 py-2 text-sm ${trail.difficultyStyle}`}>
                    {trail.difficulty}
                  </span>
                </div>

                <p className="mb-7 min-h-[96px] text-lg leading-8 text-zinc-400">
                  {trail.text}
                </p>

                <div className="mb-7 space-y-4 rounded-2xl border border-white/10 bg-black p-5">
                  <div className="text-sm font-semibold text-white">Podlaga</div>
                  <SurfaceBar label="Asfalt" value={trail.surface.asphalt} />
                  <SurfaceBar label="Makadam" value={trail.surface.gravel} />
                  <SurfaceBar label="Gozdna pot" value={trail.surface.forest} />
                </div>

                <button className="mt-auto w-full rounded-full bg-white px-5 py-4 font-semibold text-black transition group-hover:scale-[1.02]">
                  Oglej si turo
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-zinc-950 px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-500">
              Kako deluje
            </p>
            <h2 className="text-4xl font-bold md:text-5xl">
              Od ideje do popolnega kolesarskega dne.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {howItWorks.map((item) => (
              <div key={item.step} className="rounded-[2rem] border border-white/10 bg-black p-8">
                <div className="mb-8 text-sm font-semibold text-zinc-500">{item.step}</div>
                <h3 className="mb-4 text-2xl font-bold">{item.title}</h3>
                <p className="leading-7 text-zinc-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-black px-5 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-500">
              Regije
            </p>

            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              Vsaka regija ima svoj ritem.
            </h2>

            <p className="text-lg leading-8 text-zinc-400">
              Platforma bo povezovala ture, razglede, zgodbe, kulinariko,
              nastanitve in lokalne ponudnike v eno jasno kolesarsko izkušnjo.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {regions.map((region) => (
              <div key={region} className="rounded-2xl border border-white/10 bg-zinc-950 p-5 text-lg font-semibold">
                {region}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-8 md:p-12">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-500">
              Doživetja ob poti
            </p>

            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              Ne gre samo za kilometre.
            </h2>

            <p className="mb-8 text-lg leading-8 text-zinc-400">
              Bojan on Bike bo pomagal sestaviti celoten kolesarski dan:
              turo, postanek, razgled, kosilo, zgodbo in občutek regije.
            </p>

            <button className="rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:bg-zinc-200">
              Začni raziskovati
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-10 text-sm text-zinc-500">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Bojan on Bike</p>
          <p>Mobile-first kolesarska platforma za Slovenijo.</p>
        </div>
      </footer>
    </main>
  );
}