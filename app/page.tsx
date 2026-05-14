"use client";

import { useState } from "react";

const featuredTrails = [
  {
    region: "Pohorje",
    type: "MTB",
    title: "Gozdni flow nad Mariborom",
    text: "Ture skozi pohorske gozdove, razglede in spuste, ki so ustvarjeni za pravi kolesarski dan.",
  },
  {
    region: "Slovenske gorice",
    type: "Gravel / e-bike",
    title: "Med vinogradi in griči",
    text: "Mehkejši ritmi, vinske ceste, razgledi in postanki pri lokalnih ponudnikih.",
  },
  {
    region: "Soška dolina",
    type: "Bikepacking",
    title: "Alpski pobeg ob vodi",
    text: "Večdnevna izkušnja med rekami, prelazi, vasicami in nepozabno naravo.",
  },
];

const regions = [
  "Pohorje",
  "Maribor",
  "Slovenske gorice",
  "Soška dolina",
  "Istra",
  "Goriška",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">

      {/* NAVBAR */}
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">

          <div className="text-lg font-bold tracking-wide">
            Bojan on Bike
          </div>

          {/* DESKTOP MENU */}
          <nav className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
            <a className="transition hover:text-white" href="#">
              Ture
            </a>

            <a className="transition hover:text-white" href="#">
              Regije
            </a>

            <a className="transition hover:text-white" href="#">
              Doživetja
            </a>

            <a className="transition hover:text-white" href="#">
              Ponudniki
            </a>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
          >
            <div className="space-y-1">
              <div className="h-[2px] w-5 bg-white" />
              <div className="h-[2px] w-5 bg-white" />
              <div className="h-[2px] w-5 bg-white" />
            </div>
          </button>

        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="border-t border-white/10 bg-black/95 backdrop-blur-2xl md:hidden">

            <nav className="flex flex-col px-5 py-6">

              <a
                href="#"
                className="border-b border-white/5 py-4 text-lg"
              >
                Ture
              </a>

              <a
                href="#"
                className="border-b border-white/5 py-4 text-lg"
              >
                Regije
              </a>

              <a
                href="#"
                className="border-b border-white/5 py-4 text-lg"
              >
                Doživetja
              </a>

              <a
                href="#"
                className="py-4 text-lg"
              >
                Ponudniki
              </a>

            </nav>

          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1669372701525-06dde0779ba6?auto=format&fit=crop&fm=jpg&q=85&w=3000"
          alt="MTB kolesar na gozdni poti"
          className="absolute inset-0 h-full w-full object-cover object-[42%_center] opacity-65 md:object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-24">

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

      {/* FEATURED */}
      <section className="px-5 py-24">

        <div className="mx-auto max-w-7xl">

          <div className="mb-12">

            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-500">
              Izpostavljeno
            </p>

            <h2 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
              Ture, ki niso samo trase, ampak zgodbe.
            </h2>

          </div>

          <div className="grid gap-6 md:grid-cols-3">

            {featuredTrails.map((trail) => (
              <article
                key={trail.title}
                className="rounded-3xl border border-white/10 bg-zinc-950 p-7 transition hover:-translate-y-1 hover:border-white/20"
              >

                <div className="mb-5 text-sm text-zinc-500">
                  {trail.region} • {trail.type}
                </div>

                <h3 className="mb-4 text-2xl font-bold">
                  {trail.title}
                </h3>

                <p className="leading-7 text-zinc-400">
                  {trail.text}
                </p>

              </article>
            ))}

          </div>

        </div>

      </section>

      {/* REGIONS */}
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
              <div
                key={region}
                className="rounded-2xl border border-white/10 bg-black p-5 text-lg font-semibold"
              >
                {region}
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* EXPERIENCE */}
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

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-5 py-10 text-sm text-zinc-500">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">

          <p>© 2026 Bojan on Bike</p>

          <p>
            Mobile-first kolesarska platforma za Slovenijo.
          </p>

        </div>

      </footer>

    </main>
  );
}