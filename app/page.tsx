"use client";

import { useState } from "react";

const menuItems = [
  { label: "Ture", href: "/ture" },
  { label: "Doživetja", href: "#dozivetja" },
  { label: "Ponudniki", href: "/ponudniki" },
];

const topTrails = [
  {
    rank: "01",
    title: "Gozdni flow nad Mariborom",
    region: "Štajerska",
    destination: "Pohorje",
    distance: "32 km",
    elevation: "890 vm",
    type: "MTB",
    image:
      "https://images.unsplash.com/photo-1669372701525-06dde0779ba6?auto=format&fit=crop&q=85&w=1400",
  },
  {
    rank: "02",
    title: "Med vinogradi in griči",
    region: "Štajerska",
    destination: "Slovenske gorice",
    distance: "48 km",
    elevation: "620 vm",
    type: "Gravel",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=85&w=1400",
  },
  {
    rank: "03",
    title: "Alpski pobeg ob vodi",
    region: "Primorska",
    destination: "Soška dolina",
    distance: "86 km",
    elevation: "1450 vm",
    type: "Bikepacking",
    image:
      "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?auto=format&fit=crop&q=85&w=1400",
  },
];

const regions = [
  "Štajerska",
  "Koroška",
  "Gorenjska",
  "Primorska",
  "Notranjska",
  "Dolenjska",
  "Prekmurje",
];

const stats = [
  { value: "30+", label: "za aktivne raziskovalce" },
  { value: "7", label: "slovenskih pokrajin" },
  { value: "100%", label: "e-bike friendly" },
];

const howItWorks = [
  {
    step: "01",
    title: "Izberi pokrajino",
    text: "Začni pri širšem prostoru: Štajerska, Primorska, Koroška, Gorenjska ali druga slovenska pokrajina.",
  },
  {
    step: "02",
    title: "Odkrij turo",
    text: "Poglej dolžino, višince, težavnost, podlago, vreme in e-bike doseg.",
  },
  {
    step: "03",
    title: "Sestavi doživetje",
    text: "Turi dodaš postanke, razglede, kulinariko, nastanitve in lokalne ponudnike ob poti.",
  },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace("š", "s")
    .replace("č", "c")
    .replace("ž", "z")
    .replace("ć", "c")
    .replace("đ", "d")
    .replace(/\s+/g, "-");
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#07110b]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <a href="/" className="text-lg font-bold tracking-wide">
            Bojan on Bike
          </a>

          <nav className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
            {menuItems.map((item) => (
              <a key={item.label} className="transition hover:text-white" href={item.href}>
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

      <section className="relative flex min-h-screen items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1669372701525-06dde0779ba6?auto=format&fit=crop&fm=jpg&q=85&w=3000"
          alt="MTB kolesar na gozdni poti"
          className="absolute inset-0 h-full w-full object-cover object-[42%_center] opacity-70 md:object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#07110b]/85 via-[#07110b]/55 to-[#07110b]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07110b]/85 via-[#07110b]/35 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex rounded-full border border-[#c58b46]/30 bg-[#c58b46]/15 px-4 py-2 text-sm text-[#f4d7ad] backdrop-blur">
              Slovenija • MTB • gravel • bikepacking • doživetja
            </div>

            <h1 className="mb-7 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Odkrij Slovenijo
              <br />
              skozi kolo.
            </h1>

            <p className="mb-10 max-w-2xl text-lg leading-8 text-zinc-200 md:text-xl">
              Premium spletna platforma za odkrivanje kolesarskih tur,
              pokrajin, lokalnih ponudnikov in doživetij ob poti.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="/ture"
                className="rounded-full bg-[#c58b46] px-8 py-4 text-center font-semibold text-black transition hover:bg-[#d9a35d]"
              >
                Razišči ture
              </a>

              <a
                href="#pokrajine"
                className="rounded-full border border-white/20 bg-black/25 px-8 py-4 text-center font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Odkrij pokrajine
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b1a10] px-5 py-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-[#07110b] px-6 py-5">
              <div className="text-2xl font-black text-[#f4d7ad]">{stat.value}</div>
              <div className="mt-1 text-sm text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#c58b46]">
              Zadnja dodana tura
            </p>
            <h2 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
              Sveža ideja za naslednji kolesarski dan.
            </h2>
          </div>

          <article className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1a10] md:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[360px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1669372701525-06dde0779ba6?auto=format&fit=crop&q=85&w=1800"
                alt="Gorsko kolesarjenje po gozdu"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07110b]/80 via-transparent to-transparent" />
            </div>

            <div className="flex flex-col justify-center p-8 md:p-12">
              <div className="mb-6 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full border border-white/10 px-4 py-2 text-zinc-300">
                  Štajerska
                </span>
                <span className="rounded-full border border-white/10 px-4 py-2 text-zinc-300">
                  Pohorje
                </span>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-300">
                  e-bike friendly
                </span>
              </div>

              <h3 className="mb-5 text-4xl font-black leading-tight">
                Gozdni flow nad Mariborom
              </h3>

              <p className="mb-8 text-lg leading-8 text-zinc-400">
                Tura skozi pohorske gozdove, razglede in spuste, ki so ustvarjeni
                za pravi kolesarski dan nad mestom.
              </p>

              <div className="mb-8 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/10 bg-[#07110b] p-4">
                  <div className="font-bold">32 km</div>
                  <div className="text-xs text-zinc-500">dolžina</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#07110b] p-4">
                  <div className="font-bold">890 vm</div>
                  <div className="text-xs text-zinc-500">višinci</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#07110b] p-4">
                  <div className="font-bold">Srednja</div>
                  <div className="text-xs text-zinc-500">težavnost</div>
                </div>
              </div>

              <a
                href="/ture"
                className="rounded-full bg-[#c58b46] px-8 py-4 text-center font-semibold text-black transition hover:bg-[#d9a35d]"
              >
                Oglej si turo
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b1a10] px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#c58b46]">
                TOP 3
              </p>

              <h2 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
                Ture po izboru kolesarjev.
              </h2>
            </div>

            <a
              href="/ture"
              className="w-fit rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Vse ture
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {topTrails.map((trail) => (
              <article
                key={trail.title}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[#07110b] transition hover:-translate-y-1 hover:border-[#c58b46]/40"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={trail.image}
                    alt={trail.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07110b]/90 to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full bg-[#c58b46] px-4 py-2 text-sm font-black text-black">
                    {trail.rank}
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-3 text-sm text-zinc-500">
                    {trail.region} • {trail.destination}
                  </div>

                  <h3 className="mb-5 text-2xl font-bold leading-tight">
                    {trail.title}
                  </h3>

                  <div className="mb-6 flex flex-wrap gap-3 text-sm">
                    <span className="rounded-full border border-white/10 px-3 py-2">
                      {trail.distance}
                    </span>
                    <span className="rounded-full border border-white/10 px-3 py-2">
                      {trail.elevation}
                    </span>
                    <span className="rounded-full border border-white/10 px-3 py-2">
                      {trail.type}
                    </span>
                  </div>

                  <a
                    href={`/ture?pokrajina=${slugify(trail.region)}`}
                    className="block w-full rounded-full border border-[#c58b46]/40 px-5 py-3 text-center font-semibold transition hover:bg-[#c58b46] hover:text-black"
                  >
                    Poglej več
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#07110b] px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#c58b46]">
              Kako deluje
            </p>
            <h2 className="text-4xl font-bold md:text-5xl">
              Od ideje do popolnega kolesarskega dne.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {howItWorks.map((item) => (
              <div
                key={item.step}
                className="rounded-[2rem] border border-white/10 bg-[#0b1a10] p-8"
              >
                <div className="mb-8 text-sm font-semibold text-[#c58b46]">
                  {item.step}
                </div>
                <h3 className="mb-4 text-2xl font-bold">{item.title}</h3>
                <p className="leading-7 text-zinc-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pokrajine" className="border-b border-white/10 bg-[#0b1a10] px-5 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#c58b46]">
              Pokrajine
            </p>
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              Vsaka pokrajina ima svoj ritem.
            </h2>
            <p className="text-lg leading-8 text-zinc-400">
              Klik na pokrajino te odpelje na katalog tur, kjer je filter za to
              pokrajino že vklopljen.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {regions.map((region) => (
              <a
                key={region}
                href={`/ture?pokrajina=${slugify(region)}`}
                className="rounded-2xl border border-white/10 bg-[#07110b] p-5 text-lg font-semibold transition hover:-translate-y-1 hover:border-[#c58b46]/40 hover:bg-[#102417]"
              >
                {region}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="dozivetja" className="px-5 py-24">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#102417] to-[#07110b] p-8 md:p-12">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#c58b46]">
              Doživetja ob poti
            </p>
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              Ne gre samo za kilometre.
            </h2>
            <p className="mb-8 text-lg leading-8 text-zinc-400">
              Bojan on Bike bo pomagal sestaviti celoten kolesarski dan: turo,
              postanek, razgled, kosilo, zgodbo in občutek pokrajine.
            </p>

            <a
              href="/ture"
              className="inline-block rounded-full bg-[#c58b46] px-8 py-4 font-semibold text-black transition hover:bg-[#d9a35d]"
            >
              Začni raziskovati
            </a>
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