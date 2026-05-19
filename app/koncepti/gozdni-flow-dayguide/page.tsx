import Link from "next/link";

const photos = {
  hero:
    "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=2400&q=85",
  forest:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85",
  view:
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=85",
  stop:
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85",
  gravel:
    "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1600&q=85",
};

const routeStats = [
  ["32 km", "dolžina"],
  ["890 vm", "vzpon"],
  ["Srednja", "zahtevnost"],
  ["65%", "gozdna pot"],
];

const dayTags = [
  "gravel ali e-bike",
  "gozdni pobeg",
  "razgled nad mestom",
  "postanek ob poti",
];

const timeline = [
  {
    km: "0 km",
    title: "Start iz mesta",
    text: "Začneš blizu Maribora in se hitro premakneš iz vsakdanjega ritma proti zelenemu robu Pohorja.",
  },
  {
    km: "7 km",
    title: "Gozdni vzpon",
    text: "Tempo se umiri. Cesta postane tišja, senca gostejša, tura pa dobi svoj pravi značaj.",
  },
  {
    km: "17 km",
    title: "Razgledni trenutek",
    text: "Del poti, kjer se splača ustaviti. Ne zaradi aplikacije, ampak zaradi občutka prostora.",
  },
  {
    km: "24 km",
    title: "Postanek",
    text: "Rudijev dom je tisti premor, ki iz trase naredi dan. Kava, voda, trenutek brez hitenja.",
  },
  {
    km: "32 km",
    title: "Miren zaključek",
    text: "Makadam in gozdni odseki te vrnejo nazaj z občutkom, da si bil nekaj ur res zunaj.",
  },
];

const stories = [
  {
    image: photos.forest,
    eyebrow: "Prvi občutek",
    title: "Ko gozd prevzame ritem.",
    text: "To je del, kjer se tura odmakne od mesta. Ni najpomembnejši podatek, ampak občutek, da vožnja postane mirnejša.",
  },
  {
    image: photos.view,
    eyebrow: "Trenutek poti",
    title: "Razgled, kjer se ustaviš.",
    text: "Dobra tura ima vsaj en trenutek, ko ne gledaš več v števec. Ta razgled je eden takih.",
  },
  {
    image: photos.stop,
    eyebrow: "Postanek",
    title: "Kolesarski dan potrebuje premor.",
    text: "Postanek ni dodatek. Je del izkušnje. Tukaj tura postane bolj človeška in manj tehnična.",
  },
];

const stops = [
  {
    type: "Kulinarika",
    title: "Rudijev dom na Pohorju",
    distance: "0,8 km od trase",
    text: "Dober postanek po vzponu. Primeren za kavo, vodo ali trenutek, ko se dan malo ustavi.",
  },
  {
    type: "Razgled",
    title: "Pogled nad Mariborom",
    distance: "0,5 km od trase",
    text: "Kratek odmik od trase, ki turi doda spomin. Vreden postanka, posebej v jasnem vremenu.",
  },
  {
    type: "Narava",
    title: "Pohorski gozdni odsek",
    distance: "ob trasi",
    text: "Del poti, kjer je jasno, zakaj ta tura ne sme biti samo GPX, ampak doživetje.",
  },
];

export default function GozdniFlowDayguideConcept() {
  return (
    <main className="min-h-screen bg-[#020805] text-white">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${photos.hero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020805] via-[#020805]/82 to-[#020805]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020805] via-transparent to-black/35" />

        <header className="relative z-10 mx-auto flex max-w-[1500px] items-center justify-between px-6 py-6">
          <Link href="/" className="text-sm font-black text-white">
            Bojan on Bike
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/ture/gozdni-flow-nad-mariborom"
              className="rounded-full border border-white/15 bg-black/25 px-5 py-3 text-sm font-bold backdrop-blur-md"
            >
              Nazaj na turo
            </Link>
            <Link
              href="/predlagaj-turo"
              className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-black text-black"
            >
              Predlagaj turo
            </Link>
          </div>
        </header>

        <div className="relative z-10 mx-auto grid min-h-[860px] max-w-[1500px] gap-10 px-6 pb-14 pt-16 lg:grid-cols-[1fr_470px] lg:items-end">
          <div>
            <div className="inline-flex rounded-full border border-[#c58b46]/30 bg-[#c58b46]/15 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-[#c58b46] backdrop-blur-md">
              Premium kolesarski dan
            </div>

            <h1 className="mt-7 max-w-5xl text-6xl font-black leading-[0.92] tracking-tight md:text-8xl">
              Gozdni flow nad Mariborom.
            </h1>

            <p className="mt-7 max-w-3xl text-xl leading-9 text-zinc-200">
              Tura za dan, ko želiš iz mesta v gozd, na razgled in do postanka,
              ki vožnjo spremeni v doživetje. GPX je osnova, ampak razlog za
              pot je občutek dneva.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {dayTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <aside className="rounded-[42px] border border-white/15 bg-[#06130b]/80 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Tura na kratko
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {routeStats.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[24px] border border-white/10 bg-black/25 p-4"
                >
                  <div className="text-2xl font-black text-white">{value}</div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 overflow-hidden rounded-[28px] border border-white/10 bg-black/30">
              <iframe
                title="Zemljevid trase"
                src="https://www.openstreetmap.org/export/embed.html?bbox=15.55%2C46.50%2C15.78%2C46.62&layer=mapnik"
                className="h-[240px] w-full border-0 grayscale-[20%]"
              />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-black text-black">
                Prenesi GPX
              </button>
              <button className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300">
                Odpri zemljevid
              </button>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#07130b] px-6 py-20">
        <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.42em] text-[#c58b46]">
              Kakšen dan te čaka?
            </div>
            <h2 className="mt-5 text-5xl font-black leading-none tracking-tight md:text-7xl">
              Ne samo vožnja. Dan zunaj.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-9 text-zinc-400">
              Ta stran mora pomagati izbrati dan, ne samo traso. Zato so tukaj
              GPX, zemljevid in podatki, ampak tudi občutek, postanek, razgled
              in lokalni namig.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Za koga", "za gravel, e-bike in rekreativne kolesarje"],
              ["Ritem", "miren vzpon, gozd in makadamski zaključek"],
              ["Zapomniš si", "razgled, postanek in občutek Pohorja"],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-[34px] border border-white/10 bg-black/20 p-6"
              >
                <div className="text-xs uppercase tracking-[0.25em] text-[#c58b46]">
                  {title}
                </div>
                <div className="mt-4 text-xl font-black leading-7 text-white">
                  {text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <div className="text-xs uppercase tracking-[0.42em] text-[#c58b46]">
                Potek dneva
              </div>
              <h2 className="mt-5 text-5xl font-black leading-none tracking-tight md:text-7xl">
                Tura v petih trenutkih.
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-9 text-zinc-400">
              Timeline združi uporabnost in zgodbo: veš, kje si na poti, hkrati
              pa razumeš, zakaj je posamezen del vreden vožnje.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-[22px] top-0 hidden h-full w-px bg-white/10 md:block" />

            <div className="grid gap-5">
              {timeline.map((item) => (
                <article
                  key={item.km}
                  className="grid gap-5 rounded-[34px] border border-white/10 bg-[#07110b] p-5 md:grid-cols-[90px_1fr_auto] md:items-center md:p-6"
                >
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c58b46] text-sm font-black text-black">
                    {item.km}
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-3xl text-sm leading-7 text-zinc-500">
                      {item.text}
                    </p>
                  </div>

                  <div className="rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-zinc-400">
                    ob trasi
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#07130b] px-6 py-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-12">
            <div className="text-xs uppercase tracking-[0.42em] text-[#c58b46]">
              Kaj si boš zapomnil?
            </div>
            <h2 className="mt-5 max-w-4xl text-5xl font-black leading-none tracking-tight md:text-7xl">
              Tri zgodbe, zaradi katerih tura ostane v glavi.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {stories.map((story) => (
              <article
                key={story.title}
                className="overflow-hidden rounded-[42px] border border-white/10 bg-[#06130b]"
              >
                <div
                  className="h-[360px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${story.image})` }}
                />
                <div className="p-7">
                  <div className="text-xs uppercase tracking-[0.3em] text-[#c58b46]">
                    {story.eyebrow}
                  </div>
                  <h3 className="mt-4 text-3xl font-black text-white">
                    {story.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-zinc-400">
                    {story.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="text-xs uppercase tracking-[0.42em] text-[#c58b46]">
              Ob poti
            </div>
            <h2 className="mt-5 text-5xl font-black leading-none tracking-tight md:text-7xl">
              Postanki, ki naredijo kolesarski dan.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-9 text-zinc-400">
              Tukaj Bojan on Bike postane več kot karta. Pokaže, kje se ustaviš,
              kaj pogledaš in zakaj je vredno sestopiti s kolesa.
            </p>
          </div>

          <div className="grid gap-5">
            {stops.map((stop) => (
              <article
                key={stop.title}
                className="grid gap-5 rounded-[38px] border border-white/10 bg-[#07110b] p-5 md:grid-cols-[160px_1fr_auto] md:items-center"
              >
                <div className="flex h-28 items-center justify-center rounded-[30px] border border-[#c58b46]/20 bg-[#c58b46]/10 text-xs font-black uppercase tracking-[0.25em] text-[#c58b46]">
                  {stop.type}
                </div>

                <div>
                  <h3 className="text-2xl font-black text-white">
                    {stop.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-zinc-500">
                    {stop.text}
                  </p>
                </div>

                <div className="rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-zinc-400">
                  {stop.distance}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-[1500px] gap-8 rounded-[48px] border border-[#c58b46]/20 bg-[#c58b46]/10 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div>
            <div className="text-xs uppercase tracking-[0.42em] text-[#c58b46]">
              Skupnost lokalnih kolesarjev
            </div>
            <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-tight md:text-5xl">
              Poznaš pot, ki bi lahko postala tak kolesarski dan?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-300">
              Predlagaj jo. Iščemo trase, ki imajo zgodbo, postanek, razgled,
              lokalni podpis in občutek, da jih je vredno deliti.
            </p>
          </div>

          <Link
            href="/predlagaj-turo"
            className="rounded-full bg-[#c58b46] px-8 py-4 text-sm font-black text-black"
          >
            Predlagaj svojo turo
          </Link>
        </div>
      </section>
    </main>
  );
}
