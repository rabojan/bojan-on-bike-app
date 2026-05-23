import Link from "next/link";

import SiteHeader from "@/components/SiteHeader";
import PageHero from "@/components/PageHero";

const experiences = [
  {
    title: "Vinski kolesarski dan",
    subtitle: "Slovenske gorice",
    image:
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1400&auto=format&fit=crop",
    description:
      "Lahkotna vožnja med griči, postanek pri vinski kleti, domača kulinarika in razgled, ki naredi dan poseben.",
    tags: ["Vino", "Kulinarika", "Gravel"],
  },
  {
    title: "Družinski e-bike izlet",
    subtitle: "Pohorje",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop",
    description:
      "Varnejše poti, krajše razdalje, lepi postanki in dovolj prostora, da lahko v dnevu uživa cela družina.",
    tags: ["Družina", "e-bike", "Narava"],
  },
  {
    title: "Pohorski flow in kosilo",
    subtitle: "Maribor",
    image:
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=1400&auto=format&fit=crop",
    description:
      "Gozdni odseki, občutek svobode, nato pa zaslužen postanek pri lokalnem ponudniku ob poti.",
    tags: ["MTB", "Gozd", "Kosilo"],
  },
];

const themes = [
  "Vinska doživetja",
  "Družinski izleti",
  "Kulinarične ture",
  "Razgledne poti",
  "Zgodbe krajev",
  "Vikend pobegi",
];

export default function DozivetjaPage() {
  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/" active="dozivetja" />

            <PageHero
        eyebrow="Doživetja ob poti"
        title="Tura je šele začetek lepega dne."
        description="Tukaj najdeš skrbno izbrane kolesarske ideje, kjer se vožnja poveže z razgledi, lokalno hrano, vinom, druženjem in zgodbami krajev."
        image="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1800&auto=format&fit=crop"
        imageAlt="Kolesarsko doživetje v naravi"
        ctaHref="/ture"
        ctaLabel="Odkrij ture"
        imagePosition="center"
      />

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24">
        <div className="mb-12 max-w-3xl">
          <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
            Izbrana doživetja
          </div>

          <h2 className="mt-4 font-serif text-4xl font-black italic md:text-5xl">
            Ideje za kolesarski dan, ki si ga zapomniš.
          </h2>

          <p className="mt-6 leading-8 text-zinc-400">
            Ne gre samo za kilometre. Gre za to, kje se ustaviš, koga srečaš,
            kaj poješ, kaj vidiš in kakšen občutek odneseš domov.
          </p>
        </div>

        <div className="grid items-stretch gap-8 md:grid-cols-3">
          {experiences.map((experience) => (
            <article
              key={experience.title}
              className="flex h-full flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1a10]"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07110b] via-transparent to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-7">
                <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
                  {experience.subtitle}
                </div>

                <h3 className="mt-4 font-serif text-3xl font-black italic leading-tight">
                  {experience.title}
                </h3>

                <p className="mt-5 flex-1 leading-8 text-zinc-300">
                  {experience.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {experience.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#c58b46]/35 bg-black/25 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-[#f4d7ad]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href="/ture"
                  className="mt-7 inline-flex justify-center rounded-full border border-[#c58b46]/40 bg-[#c58b46] px-5 py-3 text-sm font-black text-black"
                >
                  Poglej povezane ture
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b1a10] px-5 py-16 md:px-6 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
              Tematska doživetja
            </div>

            <h2 className="mt-4 font-serif text-4xl font-black italic md:text-5xl">
              Izberi občutek, ne samo trase.
            </h2>

            <p className="mt-6 leading-8 text-zinc-400">
              Nekateri iščejo razgled. Drugi dobro kosilo. Tretji miren dan z
              družino. Bojan on Bike lahko ture poveže v zgodbe, ki imajo svoj
              namen.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {themes.map((theme) => (
              <div
                key={theme}
                className="rounded-[22px] border border-white/10 bg-black/20 p-4 text-base font-black sm:p-6 sm:text-xl"
              >
                {theme}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24">
        <div className="overflow-hidden rounded-[36px] border border-white/10 bg-black/20">
          <div className="grid md:grid-cols-2">
            <div className="min-h-[420px]">
              <img
                src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1600&auto=format&fit=crop"
                alt="Druženje po turi"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-8 md:p-14">
              <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
                Zakaj doživetja
              </div>

              <h2 className="mt-5 font-serif text-4xl font-black italic leading-tight md:text-5xl">
                Ker se najboljše ture končajo z zgodbo.
              </h2>

              <p className="mt-8 text-lg leading-9 text-zinc-300">
                Dobra kolesarska ideja ni samo črta na zemljevidu. Je trenutek,
                ko se ustaviš na razgledu, spiješ kavo v majhnem kraju, odkriješ
                lokalno zgodbo ali se po turi usedeš za mizo z ljudmi, s katerimi
                si delil dan.
              </p>

              <Link
                href="/ponudniki"
                className="mt-8 inline-flex w-fit rounded-full bg-[#c58b46] px-6 py-4 text-sm font-black text-black"
              >
                Odkrij ponudnike
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
