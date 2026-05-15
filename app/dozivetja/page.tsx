import Image from "next/image";
import Link from "next/link";

import SiteHeader from "@/components/SiteHeader";

const experiences = [
  {
    title: "Vinska gravel avantura",
    subtitle: "Slovenske gorice",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1400&auto=format&fit=crop",
    description:
      "Počasni makadami med vinogradi, lokalne vinske kleti in sončni zahodi nad griči.",
  },
  {
    title: "Flow skozi pohorske gozdove",
    subtitle: "Pohorje",
    image:
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=1400&auto=format&fit=crop",
    description:
      "Flow spusti, gozdne poti in občutek popolnega pobega iz mesta.",
  },
  {
    title: "Coffee & Climb",
    subtitle: "Maribor",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1400&auto=format&fit=crop",
    description:
      "Jutranja kava, panoramski vzponi in počasno raziskovanje mesta.",
  },
];

export default function DozivetjaPage() {
  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/" active="dozivetja" />

      <section className="relative flex min-h-[70vh] items-end overflow-hidden pt-24">
        <Image
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1800&auto=format&fit=crop"
          alt="Doživetja"
          fill
          priority
          className="object-cover opacity-45"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#07110b] via-[#07110b]/40 to-black/10" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 md:px-6 md:pb-24">
          <div className="max-w-3xl">
            <div className="mb-5 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Kolesarska doživetja
            </div>

            <h1 className="text-5xl font-black leading-none md:text-7xl">
              Kolesarjenje ni samo cilj.
              <br />
              Je občutek poti.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl">
              Odkrij kurirana kolesarska doživetja, ki povezujejo naravo,
              kulinariko, lokalne zgodbe in počasno raziskovanje regij.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24">
        <div className="mb-12">
          <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
            Featured
          </div>

          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            Doživetja ob poti
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {experiences.map((experience) => (
            <article
              key={experience.title}
              className="group overflow-hidden rounded-[32px] border border-white/10 bg-black/20"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute bottom-0 p-6">
                  <div className="text-xs uppercase tracking-[0.25em] text-[#c58b46]">
                    {experience.subtitle}
                  </div>

                  <h3 className="mt-3 text-3xl font-black leading-tight">
                    {experience.title}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <p className="leading-8 text-zinc-300">
                  {experience.description}
                </p>

                <Link
                  href="/ture"
                  className="mt-6 inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#c58b46]/40 hover:bg-[#c58b46]/10"
                >
                  Odkrij ture
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-6 md:pb-28">
        <div className="overflow-hidden rounded-[36px] border border-white/10 bg-black/20">
          <div className="grid md:grid-cols-2">
            <div className="relative min-h-[420px]">
              <Image
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop"
                alt="Story"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-8 md:p-14">
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Editorial story
              </div>

              <h2 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
                Regije niso samo destinacije.
              </h2>

              <p className="mt-8 text-lg leading-9 text-zinc-300">
                Vsaka pot skriva lokalne zgodbe, razglede, ljudi in trenutke,
                zaradi katerih se želiš vrniti. Bojan on Bike ni zbirka GPX
                datotek — je vodič skozi doživetja na dveh kolesih.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
