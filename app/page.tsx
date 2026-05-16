"use client";

import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import PageHero from "@/components/PageHero";

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
  
  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader />

      

            <PageHero
        eyebrow="Slovenija · MTB · gravel · bikepacking · doživetja"
        title="Odkrij Slovenijo skozi kolo."
        description="Premium spletna platforma za odkrivanje kolesarskih tur, pokrajin, lokalnih ponudnikov in doživetij ob poti."
        image="/home-hero-desktop.png"
        mobileImage="/home-hero-mobile.png"
        imageAlt="Kolesarsko doživetje v naravi"
        ctaHref="/ture"
        ctaLabel="Razišči ture"
        secondaryHref="#pokrajine"
        secondaryLabel="Odkrij pokrajine"
        imagePosition="center 42%"
      />

      <section className="border-y border-white/10 bg-[#0b1a10] px-5 py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-2 sm:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-[#07110b] px-3 py-4 sm:px-6 sm:py-5">
              <div className="text-xl font-black text-[#f4d7ad] sm:text-2xl">{stat.value}</div>
              <div className="mt-1 text-[11px] leading-snug text-zinc-500 sm:text-sm">{stat.label}</div>
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
            <div className="relative h-72 overflow-hidden md:min-h-[360px] md:h-auto">
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

              <h3 className="mb-5 text-3xl font-black leading-tight sm:text-4xl">
                Gozdni flow nad Mariborom
              </h3>

              <p className="mb-7 text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
                Tura skozi pohorske gozdove, razglede in spuste, ki so ustvarjeni
                za pravi kolesarski dan nad mestom.
              </p>

              <div className="mb-8 grid grid-cols-3 gap-2 sm:gap-3">
                <div className="rounded-2xl border border-white/10 bg-[#07110b] p-3 sm:p-4">
                  <div className="font-bold">32 km</div>
                  <div className="text-xs text-zinc-500">dolžina</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#07110b] p-3 sm:p-4">
                  <div className="font-bold">890 vm</div>
                  <div className="text-xs text-zinc-500">višinci</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#07110b] p-3 sm:p-4">
                  <div className="font-bold">Srednja</div>
                  <div className="text-xs text-zinc-500">težavnost</div>
                </div>
              </div>

              <a
                href="/ture/gozdni-flow-nad-mariborom"
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
                <div className="relative h-48 overflow-hidden sm:h-56">
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
                    href={`/ture/${slugify(trail.title)}`}
                    className="block w-full rounded-full border border-[#c58b46]/40 px-5 py-3 text-center font-semibold transition hover:bg-[#c58b46] hover:text-black"
                  >
                    Oglej si turo
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      
            <section className="border-y border-white/10 bg-[#07110b] px-5 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-5 md:grid-cols-[1fr_0.8fr] md:items-end">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#c58b46]">
                Odkrij pot na svoj način
              </p>

              <h2 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
                Ne začne vsak z isto idejo.
              </h2>
            </div>

            <p className="max-w-xl text-lg leading-8 text-zinc-400">
              Nekdo najprej išče traso. Drugi dobro kosilo. Tretji razgled,
              slap ali zgodbo kraja. Bojan on Bike poveže vse v en kolesarski
              dan.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <a
              href="/ture"
              className="group flex h-full min-h-[360px] flex-col rounded-[2rem] border border-white/10 bg-[#0b1a10] p-8 transition hover:-translate-y-1 hover:border-[#c58b46]/50"
            >
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c58b46] text-black">
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="6" cy="17" r="3" />
                  <circle cx="18" cy="17" r="3" />
                  <path d="M8.5 17h4l2-6h-4l-2 6Z" />
                  <path d="M10.5 11 9 8h3" />
                  <path d="M14.5 11 17 17" />
                </svg>
              </div>

              <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#c58b46]">
                Ture
              </p>

              <h3 className="text-3xl font-bold leading-tight">
                Izberi traso.
              </h3>

              <p className="mt-5 leading-8 text-zinc-400">
                Poišči turo po pokrajini, težavnosti, razdalji in občutku, ki
                ga želiš doživeti na kolesu.
              </p>

              <div className="mt-auto pt-8 text-sm font-bold text-white">
                Razišči ture →
              </div>
            </a>

            <a
              href="/ponudniki"
              className="group flex h-full min-h-[360px] flex-col rounded-[2rem] border border-white/10 bg-[#0b1a10] p-8 transition hover:-translate-y-1 hover:border-[#c58b46]/50"
            >
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c58b46] text-black">
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 2v9" />
                  <path d="M4 2v5c0 2 1.5 4 3 4s3-2 3-4V2" />
                  <path d="M7 11v11" />
                  <path d="M17 2v20" />
                  <path d="M17 2c2 2 3 4.5 3 8h-3" />
                </svg>
              </div>

              <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#c58b46]">
                Ponudniki
              </p>

              <h3 className="text-3xl font-bold leading-tight">
                Najdi postanek.
              </h3>

              <p className="mt-5 leading-8 text-zinc-400">
                Kulinarika, vino, prenočišča, lokalni produkti in bike-friendly
                točke, ki turi dodajo pravi zaključek.
              </p>

              <div className="mt-auto pt-8 text-sm font-bold text-white">
                Odkrij ponudnike →
              </div>
            </a>

            <a
              href="/znamenitosti"
              className="group flex h-full min-h-[360px] flex-col rounded-[2rem] border border-white/10 bg-[#0b1a10] p-8 transition hover:-translate-y-1 hover:border-[#c58b46]/50"
            >
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c58b46] text-black">
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 21s7-5.2 7-12a7 7 0 0 0-14 0c0 6.8 7 12 7 12Z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>

              <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#c58b46]">
                Znamenitosti
              </p>

              <h3 className="text-3xl font-bold leading-tight">
                Začni z razlogom.
              </h3>

              <p className="mt-5 leading-8 text-zinc-400">
                Razgledi, slapovi, naravne posebnosti, zgodovinske točke in
                lokalne zgodbe, zaradi katerih izbereš pot.
              </p>

              <div className="mt-auto pt-8 text-sm font-bold text-white">
                Odkrij znamenitosti →
              </div>
            </a>
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
              href="/dozivetja"
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
