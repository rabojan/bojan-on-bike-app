import Link from "next/link";
import type { ReactNode } from "react";

const photos = {
  emtb: "/images/concepts/emtb-reference.png",
  forest:
    "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=90",
  view:
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=90",
  hut:
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1400&q=90",
  mountains:
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=90",
  ambassador:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=90",
};

const stats = [
  ["32 km", "Dolžina ture"],
  ["890 vm", "Skupni vzpon"],
  ["Srednja", "Težavnost"],
  ["4,6 / 5", "Ocena"],
  ["April – November", "Najlepši čas"],
];

const story = [
  {
    title: "eMTB flow skozi pohorske gozdove",
    image: photos.emtb,
    text:
      "Tura je najbolj smiselna z gorskim ali električnim gorskim kolesom. Širše gume, vzmetenje in stabilnost pridejo do izraza na gozdnih odsekih nad mestom.",
  },
  {
    title: "Razgled nad Mariborom",
    image: photos.view,
    text:
      "Na višjih delih se odpre pogled proti mestu in Dravi. To je tisti del poti, kjer se ustaviš, vdihneš in razumeš, zakaj si šel navzgor.",
  },
  {
    title: "Mir med drevesi",
    image: photos.forest,
    text:
      "Gozdne povezave umirijo ritem dneva. Ni vse v hitrosti — del doživetja je tudi občutek, da si za nekaj ur izven vsakdana.",
  },
];

const providers = [
  {
    image: photos.hut,
    title: "Rudijev dom na Pohorju",
    tags: ["Koča", "Hrana & pijača"],
    text:
      "Topel postanek po vzponu, dobra hrana in terasa, kjer tura za trenutek postane bolj družabna.",
    meta: "Pohorje",
  },
  {
    image: photos.mountains,
    title: "Gorska hiša Pohorje",
    tags: ["Koča", "Razgled"],
    text:
      "Miren kotiček za pavzo, kavo ali pozno kosilo. Dober občutek, ko veš, da ima tvoj kolesarski dan lep zaključek.",
    meta: "Areh / Pohorje",
  },
];

const weather = [
  ["Danes", "18°", "Delno oblačno"],
  ["Jutri", "15°", "Sveže"],
  ["Popoldne", "12°", "Možna ploha"],
];

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="text-[11px] uppercase tracking-[0.35em] text-[#c58b46]">
      {children}
    </div>
  );
}

function ImageBlock({
  src,
  alt,
  className = "",
  contain = false,
}: {
  src: string;
  alt: string;
  className?: string;
  contain?: boolean;
}) {
  return (
    <div className={`overflow-hidden bg-[#07140d] ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`h-full w-full ${
          contain ? "object-contain p-4" : "object-cover"
        }`}
      />
    </div>
  );
}

export default function GozdniFlowLayoutPage() {
  return (
    <main className="min-h-screen bg-[#04110a] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#04110a]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
          <Link href="/" className="text-sm font-semibold">
            Bojan on Bike
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
            <Link href="/ture" className="text-[#c58b46]">
              Ture
            </Link>
            <Link href="/dozivetja">Doživetja</Link>
            <Link href="/ponudniki">Ponudniki</Link>
            <Link href="/znamenitosti">Znamenitosti</Link>
          </nav>

          <Link
            href="/ture/gozdni-flow-nad-mariborom"
            className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-zinc-200"
          >
            ← Nazaj na trenutno turo
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-55"
          style={{ backgroundImage: `url(${photos.forest})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04110a]/88 via-[#04110a]/62 to-[#04110a]/18" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04110a] via-transparent to-transparent" />

        <div className="relative mx-auto grid max-w-[1400px] gap-10 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-10 lg:py-24">
          <div>
            <Eyebrow>eMTB / MTB tura nad Mariborom</Eyebrow>
            <h1 className="mt-4 max-w-3xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Gozdni flow nad
              <br />
              Mariborom
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200 md:text-xl">
              Gorsko-kolesarski dan po razgibanih pohorskih poteh, idealen za
              eMTB ali MTB kolo. Gozdni odseki, razgledi in postanek naredijo iz
              trase pravi dan nad Mariborom.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["eMTB / MTB", "Gozdne poti", "Razgledi", "Postanek ob poti"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 bg-black/25 px-4 py-2 text-sm font-medium text-zinc-200"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="rounded-[34px] border border-white/10 bg-white/8 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <ImageBlock
              src={photos.emtb}
              alt="Električno gorsko kolo za turo Gozdni flow nad Mariborom"
              contain
              className="h-[390px] rounded-[28px] bg-white"
            />
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-[#06160d]/92">
          <div className="mx-auto grid max-w-[1400px] px-6 lg:grid-cols-5 lg:px-10">
            {stats.map(([value, label], index) => (
              <div
                key={label}
                className={`px-6 py-6 ${
                  index !== 4 ? "lg:border-r lg:border-white/10" : ""
                }`}
              >
                <div className="text-3xl font-black">{value}</div>
                <div className="mt-2 text-sm text-zinc-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
        <div className="rounded-[28px] border border-white/10 bg-[#07160f] p-6 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="flex items-center gap-4 lg:min-w-[360px]">
              <ImageBlock
                src={photos.ambassador}
                alt="Bojan Ratej"
                className="h-16 w-16 rounded-full"
              />
              <div>
                <Eyebrow>Izbral lokalni ambasador</Eyebrow>
                <div className="mt-1 text-2xl font-bold">Bojan Ratej</div>
                <div className="text-sm text-zinc-400">
                  Lokalni vodnik & ambasador
                </div>
              </div>
            </div>

            <div className="h-px flex-1 bg-white/10 lg:h-16 lg:w-px lg:flex-none" />

            <blockquote className="max-w-3xl text-lg leading-8 text-zinc-200">
              “Ena tistih tur, kjer gozd dela svoje in misli se umirijo. Hitri
              flow odseki, odprti razgledi in mirne povezave — popoln krog nad
              mestom.”
            </blockquote>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-6 lg:px-10">
        <div className="text-center">
          <Eyebrow>Poudarki na progi</Eyebrow>
          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
            Kaj te čaka na poti
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
            Najprej vidiš turo, nato kdo jo je izbral, potem pa takoj dobiš
            odgovor: zakaj bi šel na to pot in kaj boš na njej doživel.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {story.map((item, index) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-[28px] border border-white/10 bg-[#06140d]"
            >
              <ImageBlock
                src={item.image}
                alt={item.title}
                contain={index === 0}
                className={`h-64 ${index === 0 ? "bg-white" : ""}`}
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="mt-4 min-h-[112px] text-base leading-7 text-zinc-300">
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.25fr]">
          <div className="rounded-[28px] border border-white/10 bg-[#06140d] p-7">
            <Eyebrow>Kako poteka vožnja</Eyebrow>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Razgibana, gozdna in igriva
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-300">
              Najlepše jo doživiš na pravem gorskem ali električnem gorskem
              kolesu. Tura ni ekstremna, je pa dovolj raznolika, da ima svoj
              ritem.
            </p>

            <div className="mt-7 space-y-5">
              {[
                ["Gozdne poti", 55],
                ["Singletraili", 25],
                ["Makadam", 20],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-semibold text-zinc-200">{label}</span>
                    <span className="text-zinc-400">{value}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#c58b46]"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#06140d] p-7">
            <Eyebrow>Trasa ture</Eyebrow>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Zemljevid & potek ture
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-300">
              GPX in zemljevid ostaneta ključna, samo nista več prva stvar, ki
              nosi občutek. Najprej vidiš, zakaj je tura vredna dneva, potem
              preveriš traso.
            </p>

            <div className="mt-6 overflow-hidden rounded-[24px] border border-white/10">
              <iframe
                title="Trasa ture"
                src="https://www.openstreetmap.org/export/embed.html?bbox=15.55%2C46.50%2C15.72%2C46.60&layer=mapnik"
                className="h-[420px] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10">
        <div className="rounded-[28px] border border-white/10 bg-[#06140d] p-7">
          <Eyebrow>Postanek, ki dopolni dan</Eyebrow>
          <h2 className="mt-3 text-3xl font-black tracking-tight">
            Priporočeni postanki & ponudniki
          </h2>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {providers.map((item) => (
              <article
                key={item.title}
                className="grid overflow-hidden rounded-[26px] border border-white/10 bg-[#07160f] md:grid-cols-[220px_1fr]"
              >
                <ImageBlock src={item.image} alt={item.title} className="min-h-[220px]" />
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#c58b46]/30 bg-[#c58b46]/10 px-3 py-1 text-xs font-semibold text-[#ddb37a]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-4 text-2xl font-bold">{item.title}</h3>
                  <p className="mt-4 text-base leading-7 text-zinc-300">
                    {item.text}
                  </p>
                  <div className="mt-4 text-sm text-zinc-500">📍 {item.meta}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.2fr]">
          <div className="rounded-[28px] border border-white/10 bg-[#06140d] p-7">
            <Eyebrow>Vreme na progi</Eyebrow>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Napoved za lokacijo
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {weather.map(([day, temp, note]) => (
                <div
                  key={day}
                  className="rounded-[22px] border border-white/10 bg-black/10 p-5"
                >
                  <div className="text-sm text-zinc-400">{day}</div>
                  <div className="mt-4 text-4xl font-black">{temp}</div>
                  <div className="mt-2 text-sm text-zinc-500">{note}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#06140d] p-7">
            <Eyebrow>Bosch e-bike izračun</Eyebrow>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Bosch Performance Line CX
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-[220px_1fr]">
              <ImageBlock
                src={photos.emtb}
                alt="eMTB kolo za Bosch izračun"
                contain
                className="h-[180px] rounded-[24px] bg-white"
              />
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Predviden doseg</span>
                  <span className="font-semibold text-white">46 km (52%)</span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[52%] rounded-full bg-emerald-400" />
                </div>
                <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                  Dovolj energije za celotno turo z nekaj rezerve.
                </div>
                <button className="mt-5 w-full rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black">
                  Izračunaj doseg
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10">
        <Eyebrow>Galerija z utrinki</Eyebrow>
        <h2 className="mt-3 text-3xl font-black tracking-tight">Utrinki s poti</h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {[photos.emtb, photos.view, photos.forest, photos.mountains, photos.emtb].map(
            (image, index) => (
              <ImageBlock
                key={`${image}-${index}`}
                src={image}
                alt={`Utrinek ${index + 1}`}
                contain={image === photos.emtb}
                className={`h-64 rounded-[24px] border border-white/10 ${
                  image === photos.emtb ? "bg-white" : ""
                }`}
              />
            ),
          )}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-12 lg:px-10 lg:pb-20">
        <div className="flex flex-col gap-6 rounded-[30px] border border-[#c58b46]/15 bg-[#2a2113]/45 px-8 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Eyebrow>Predlagaj svojo turo</Eyebrow>
            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Imaš podobno traso?
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">
              Če poznaš odlično eMTB ali MTB turo nad mestom, jo predlagaj.
              Iščemo poti, ki imajo lep občutek, zgodbo in dober lokalni podpis.
            </p>
          </div>

          <Link
            href="/predlagaj-turo"
            className="inline-flex rounded-full bg-[#c58b46] px-6 py-3 text-sm font-bold text-black"
          >
            Predlagaj svojo turo
          </Link>
        </div>
      </section>
    </main>
  );
}
