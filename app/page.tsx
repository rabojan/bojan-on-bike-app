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
    surface: "65% gozd • 25% makadam • 10% asfalt",
    text: "Dinamična tura skozi pohorske gozdove, razglede in naravne singletrail odseke.",
  },
  {
    region: "Slovenske gorice",
    type: "Gravel / e-bike",
    title: "Med vinogradi in griči",
    distance: "48 km",
    elevation: "620 m",
    difficulty: "Lahka",
    surface: "45% asfalt • 40% makadam • 15% gozd",
    text: "Razgledna kolesarska izkušnja med vinogradi, griči in lokalnimi postanki.",
  },
  {
    region: "Soška dolina",
    type: "Bikepacking",
    title: "Alpski pobeg ob vodi",
    distance: "86 km",
    elevation: "1450 m",
    difficulty: "Zahtevna",
    surface: "50% makadam • 30% asfalt • 20% gozd",
    text: "Večdnevna alpska avantura ob rekah, prelazih, vasicah in razgledih.",
  },
];

const regions = ["Pohorje", "Maribor", "Slovenske gorice", "Soška dolina", "Istra", "Goriška"];

const stats = [
  { value: "30+", label: "ciljna skupina" },
  { value: "6", label: "začetnih regij" },
  { value: "MTB", label: "e-bike / gravel" },
];

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
              Prve ture naj izgledajo kot premium izkušnje.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredTrails.map((trail) => (
              <article
                key={trail.title}
                className="rounded-3xl border border-white/10 bg-zinc-950 p-7 transition hover:-translate-y-1 hover:border-white/20"
              >
                <div className="mb-5 flex items-center justify-between text-sm text-zinc-500">
                  <span>{trail.region}</span>
                  <span>{trail.type}</span>
                </div>

                <h3 className="mb-4 text-2xl font-bold">{trail.title}</h3>
                <p className="mb-6 leading-7 text-zinc-400">{trail.text}</p>

                <div className="mb-6 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-2xl bg-black p-3">
                    <div className="font-bold">{trail.distance}</div>
                    <div className="text-xs text-zinc-500">dolžina</div>
                  </div>
                  <div className="rounded-2xl bg-black p-3">
                    <div className="font-bold">{trail.elevation}</div>
                    <div className="text-xs text-zinc-500">višinci</div>
                  </div>
                  <div className="rounded-2xl bg-black p-3">
                    <div className="font-bold">{trail.difficulty}</div>
                    <div className="text-xs text-zinc-500">težavnost</div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black p-4 text-sm text-zinc-400">
                  {trail.surface}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-zinc-950 px-5 py-24">
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
              <div key={region} className="rounded-2xl border border-white/10 bg-black p-5 text-lg font-semibold">
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