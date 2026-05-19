import Link from "next/link";

const photos = {
  hero:
    "/images/concepts/emtb-reference.png",
  ambassador:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=90",
  highlightForest:
    "/images/concepts/emtb-reference.png",
  highlightView:
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=90",
  highlightTrail:
    "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=90",
  provider1:
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1400&q=90",
  provider2:
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=90",
  gallery1:
    "/images/concepts/emtb-reference.png",
  gallery2:
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=90",
  gallery3:
    "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=90",
  gallery4:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=90",
  gallery5:
    "/images/concepts/emtb-reference.png",
};

const stats = [
  { value: "32 km", label: "Dolžina ture", icon: "↻" },
  { value: "890 vm", label: "Skupni vzpon", icon: "↗" },
  { value: "Srednja", label: "Težavnost", icon: "△" },
  { value: "★★★★☆", label: "4,6 / 5 ocena", icon: "☆" },
  { value: "April – November", label: "Najboljši čas", icon: "◷" },
];

const highlights = [
  {
    image: photos.highlightForest,
    title: "Flow skozi pohorske gozdove",
    text:
      "Hitri, tekoči gozdni odseki med smrekami, koreninami in mehko podlago. Zavoj za zavojem, pravi MTB občutek nad mestom.",
  },
  {
    image: photos.highlightView,
    title: "Razgledi nad Mariborom",
    text:
      "Na višjih delih se odpre pogled proti mestu, Dravi in Pohorju. Kratek postanek, globok vdih in občutek, da se je splačalo zaviti navzgor.",
  },
  {
    image: photos.highlightTrail,
    title: "Mirne povezave za ravnovesje",
    text:
      "Makadamski in gozdni odseki povežejo dan v celoto. Tu tempo pade, pogovor steče in vožnja dobi bolj sproščen ritem.",
  },
];

const providers = [
  {
    image: photos.provider1,
    title: "Rudijev dom na Pohorju",
    tags: ["Koča", "Hrana & pijača"],
    text:
      "Topel postanek po vzponu, domača hrana in terasa, kjer tura za trenutek postane bolj družabna.",
    location: "Pohorje",
  },
  {
    image: photos.provider2,
    title: "Gorska hiša Pohorje",
    tags: ["Koča", "Razgled"],
    text:
      "Mirna lokacija, svež zrak in dovolj prostora, da po vožnji še malo ostaneš v dnevu.",
    location: "Areh / Pohorje",
  },
];

const gallery = [photos.highlightForest, photos.highlightView, photos.highlightTrail, photos.gallery4, photos.gallery5];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/15 bg-black/25 px-4 py-2 text-xs font-bold text-zinc-100 backdrop-blur-md">
      {children}
    </span>
  );
}

export default function GozdniFlowLayoutConceptPage() {
  return (
    <main className="min-h-screen bg-[#03100a] text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#03100a]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1420px] items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-black text-white">
            Bojan on Bike
          </Link>

          <nav className="hidden items-center gap-7 text-xs font-bold text-zinc-300 md:flex">
            <Link href="/ture" className="text-[#c58b46]">
              Ture
            </Link>
            <Link href="/dozivetja">Doživetja</Link>
            <Link href="/ponudniki">Ponudniki</Link>
            <Link href="/znamenitosti">Znamenitosti</Link>
          </nav>

          <Link
            href="/ture/gozdni-flow-nad-mariborom"
            className="rounded-full border border-[#c58b46]/35 px-5 py-2.5 text-xs font-black text-[#c58b46]"
          >
            ← Nazaj na trenutno turo
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden pt-[72px]">
        <div
          className="absolute inset-0 bg-contain bg-right bg-no-repeat opacity-95"
          style={{ backgroundImage: `url(${photos.hero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03100a]/76 via-[#03100a]/42 to-[#03100a]/8" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03100a]/92 via-transparent to-[#03100a]/12" />

        <div className="relative mx-auto grid min-h-[570px] max-w-[1420px] items-center px-6 py-20">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.45em] text-[#c58b46]">
              eMTB / MTB tura
            </div>

            <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Gozdni flow nad Mariborom
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200">
              Gorsko-kolesarska vožnja po razgibanih gozdnih poteh nad Mariborom.
              Hitri zavoji, razgledi, mir in tista prava pohorska energija.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Pill>Gozdne poti</Pill>
              <Pill>MTB flow</Pill>
              <Pill>Razgledi</Pill>
              <Pill>E-MTB friendly</Pill>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#06170f]">
        <div className="mx-auto grid max-w-[1420px] gap-0 px-6 md:grid-cols-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="grid min-h-[108px] grid-cols-[44px_1fr] items-center gap-4 border-white/10 py-6 md:border-r md:px-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c58b46]/40 text-xl font-black text-[#c58b46]">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-black leading-tight text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs font-bold text-zinc-500">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-[1180px] rounded-[28px] border border-[#c58b46]/25 bg-[#0a1d12] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.24)] md:p-7">
          <div className="grid gap-6 md:grid-cols-[320px_1fr] md:items-center">
            <div className="flex items-center gap-4">
              <div
                className="h-20 w-20 overflow-hidden rounded-full border border-white/10 bg-cover bg-center"
                style={{ backgroundImage: `url(${photos.ambassador})` }}
              />

              <div>
                <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                  Izbral lokalni ambasador
                </div>
                <div className="mt-2 text-2xl font-black text-white">
                  Bojan Ratej
                </div>
                <div className="mt-1 text-sm font-bold text-zinc-400">
                  Lokalni vodnik & ambasador
                </div>
              </div>
            </div>

            <blockquote className="border-l border-[#c58b46]/35 pl-6 text-lg font-semibold leading-8 text-zinc-300">
              “Ena tistih tur, kjer gozd dela svoje in misli se umirijo. Hitri
              flow odseki, odprti razgledi in mirne povezave — popoln krog nad
              mestom.”
            </blockquote>
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.45em] text-[#c58b46]">
              Poudarki na progi
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
              Kaj te čaka na poti
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-zinc-400">
              Gozdni flow, razgledi in mirne povezave se na tej turi zlijejo v
              popoln krog nad Mariborom. Razgibano, igrivo in vedno z občutkom
              svobode.
            </p>
          </div>

          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-[28px] border border-[#c58b46]/20 bg-[#081a10] shadow-[0_22px_70px_rgba(0,0,0,0.20)]"
              >
                <div
                  className="h-[230px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="p-5">
                  <h3 className="text-xl font-black text-[#c58b46]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto grid max-w-[1180px] gap-6 rounded-[28px] border border-white/10 bg-[#081a10] p-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Tehnične podrobnosti
            </div>
            <h2 className="mt-3 text-3xl font-black text-white">
              Podrobnosti o turi
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["Dolžina", "32 km"],
                ["Skupni vzpon", "890 vm"],
                ["Težavnost", "Srednja"],
                ["Priporočeno kolo", "eMTB / MTB"],
                ["Najvišja točka", "1.120 m"],
                ["Podlaga", "Gozdne poti, singletraili, makadam"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-black/20 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-[#c58b46]">
                    {label}
                  </div>
                  <div className="mt-2 text-sm font-black text-zinc-200">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Kakšna je vožnja?
            </div>
            <h2 className="mt-3 text-3xl font-black text-white">
              Razgibana, gozdna in igriva
            </h2>

            <div className="mt-7 space-y-5">
              {[
                ["Gozdne poti", "55%"],
                ["Singletraili", "30%"],
                ["Makadam", "15%"],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between text-sm font-bold text-zinc-300">
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#c58b46]"
                      style={{ width: value }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-[1180px]">
          <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
            Trasa ture
          </div>
          <h2 className="mt-3 text-3xl font-black text-white">
            Zemljevid & potek ture
          </h2>

          <div className="mt-6 overflow-hidden rounded-[28px] border border-white/10 bg-[#081a10]">
            <iframe
              title="Zemljevid trase"
              src="https://www.openstreetmap.org/export/embed.html?bbox=15.55%2C46.50%2C15.78%2C46.62&layer=mapnik"
              className="h-[360px] w-full border-0"
            />
          </div>

          <div className="mt-4 flex gap-3">
            <button className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300">
              Odpri v komoot
            </button>
            <button className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300">
              Prenesi GPX
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-[1180px] rounded-[28px] border border-[#c58b46]/20 bg-[#081a10] p-6">
          <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
            Postanek, ki dopolni dan
          </div>
          <h2 className="mt-3 text-3xl font-black text-white">
            Priporočeni postanki & ponudniki
          </h2>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {providers.map((provider) => (
              <article
                key={provider.title}
                className="grid gap-5 rounded-[24px] border border-white/10 bg-black/20 p-4 md:grid-cols-[220px_1fr]"
              >
                <div
                  className="min-h-[190px] rounded-[20px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${provider.image})` }}
                />
                <div className="flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2">
                    {provider.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#c58b46]/15 px-3 py-1 text-xs font-bold text-[#c58b46]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-3 text-xl font-black text-white">
                    {provider.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-zinc-400">
                    {provider.text}
                  </p>
                  <div className="mt-3 text-xs font-bold text-zinc-500">
                    📍 {provider.location}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto grid max-w-[1180px] gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[28px] border border-white/10 bg-[#081a10] p-6">
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Vreme na progi
            </div>
            <h2 className="mt-3 text-2xl font-black text-white">
              Napoved za lokacijo
            </h2>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                ["Danes", "☀️", "18°", "Delno oblačno"],
                ["Jutri", "🌤️", "15°", "Sončno"],
                ["Pojutrišnjem", "🌧️", "12°", "Možna ploha"],
              ].map(([day, icon, temp, text]) => (
                <div key={day} className="rounded-2xl bg-black/20 p-4">
                  <div className="text-xs font-bold text-zinc-500">{day}</div>
                  <div className="mt-3 text-2xl">{icon}</div>
                  <div className="mt-2 text-2xl font-black">{temp}</div>
                  <div className="mt-1 text-xs text-zinc-500">{text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-[#c58b46]/20 bg-[#081a10] p-6">
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Bosch e-bike izračun
            </div>
            <h2 className="mt-3 text-2xl font-black text-white">
              Bosch Performance Line CX
            </h2>
            <p className="mt-2 text-sm leading-7 text-zinc-500">
              Izračun dosega za vašo turo.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr]">
              <div className="space-y-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-300">
                  eMTB
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-300">
                  625 Wh
                </div>
                <button className="w-full rounded-full border border-[#c58b46]/40 px-5 py-3 text-sm font-black text-[#c58b46]">
                  Izračunaj doseg
                </button>
              </div>

              <div>
                <div className="flex justify-between text-sm font-black text-white">
                  <span>Predviden doseg</span>
                  <span>468 Wh (52%)</span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[52%] rounded-full bg-emerald-400" />
                </div>
                <div className="mt-5 rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-300">
                  Dovolj energije za celotno turo.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-[1180px]">
          <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
            Galerija z utrinki
          </div>
          <h2 className="mt-3 text-3xl font-black text-white">
            Utrinki s poti
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-5">
            {gallery.map((image, index) => (
              <div
                key={image}
                className="h-[170px] rounded-[22px] border border-white/10 bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="flex h-full items-end p-3">
                  <span className="rounded-full bg-black/45 px-3 py-1 text-xs font-bold backdrop-blur-md">
                    {index + 1}/5
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#151507] px-6 py-12">
        <div className="mx-auto grid max-w-[1180px] gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Predlagaj svojo turo
            </div>
            <h2 className="mt-3 text-3xl font-black text-white">
              Imaš podobno traso?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
              Če poznaš odlično eMTB / gorsko-kolesarsko turo nad mestom, jo predlagaj in jo morda
              kmalu dodamo med izbrane.
            </p>
          </div>

          <Link
            href="/predlagaj-turo"
            className="rounded-full bg-[#c58b46] px-7 py-4 text-sm font-black text-black"
          >
            Predlagaj svojo turo
          </Link>
        </div>
      </section>
    </main>
  );
}
