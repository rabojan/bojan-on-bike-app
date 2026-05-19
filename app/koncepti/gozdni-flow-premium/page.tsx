import Link from "next/link";

const heroImage = "/images/trails/gozdni-flow-nad-mariborom.jpg";
const momentImages = ["/images/trails/pohorje-forest.jpg", "/images/trails/razgled-maribor.jpg", "/images/trails/pohorje-stop.jpg"];

const moments = [
  {
    eyebrow: "Začetek dneva",
    title: "Mesto ostane zadaj.",
    text: "Prvi kilometri niso namenjeni dokazovanju. Počasi zapustiš mestni ritem in se prestaviš v gozd, kjer tura dobi svoj pravi značaj.",
  },
  {
    eyebrow: "Trenutek za ustaviti",
    title: "Razgled, ki spremeni tempo.",
    text: "Na poti pride trenutek, ko ne gledaš več v števec. Ustaviš se, pogledaš proti mestu in razumeš, zakaj ta dan ni samo vožnja.",
  },
  {
    eyebrow: "Zaključek poti",
    title: "Makadam za miren konec.",
    text: "Zadnji del ni samo povratek. Je tisti lep, umirjen zaključek, ko imaš občutek, da si bil nekaj ur res zunaj.",
  },
];

const details = [
  ["Občutek", "gozdni pobeg"],
  ["Najlepši čas", "zgodaj dopoldne"],
  ["Za koga", "gravel · e-bike"],
  ["Postanek", "Rudijev dom"],
];

const stops = [
  {
    label: "Postanek",
    title: "Rudijev dom na Pohorju",
    text: "Kraj, kjer tura dobi premor. Ne zaradi nuje, ampak zato, ker dober kolesarski dan potrebuje svoj postanek.",
  },
  {
    label: "Razgled",
    title: "Pogled nad Mariborom",
    text: "Kratek trenutek, ki pove več kot številke. Tukaj se pot spremeni v spomin.",
  },
  {
    label: "Narava",
    title: "Pohorski gozdni odsek",
    text: "Najboljši del ture ni nujno najtežji. Včasih je to del, kjer se vse umiri.",
  },
];

export default function PremiumTrailConceptPage() {
  return (
    <main className="min-h-screen bg-[#020805] text-white">
      <section className="relative min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020805] via-[#020805]/72 to-[#020805]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020805] via-transparent to-black/40" />

        <header className="relative z-10 mx-auto flex max-w-[1500px] items-center justify-between px-6 py-6">
          <Link href="/ture/gozdni-flow-nad-mariborom" className="text-sm font-black">
            Bojan on Bike
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/ture/gozdni-flow-nad-mariborom"
              className="rounded-full border border-white/15 bg-black/20 px-5 py-3 text-sm font-bold text-white backdrop-blur-md"
            >
              Nazaj na trenutno turo
            </Link>
            <Link
              href="/predlagaj-turo"
              className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-black text-black"
            >
              Predlagaj turo
            </Link>
          </div>
        </header>

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-[1500px] items-end gap-12 px-6 pb-16 lg:grid-cols-[1fr_420px]">
          <div className="max-w-5xl">
            <div className="text-xs uppercase tracking-[0.55em] text-[#c58b46]">
              Kolesarski dan na Pohorju
            </div>

            <h1 className="mt-6 max-w-5xl text-6xl font-black leading-[0.88] tracking-tight md:text-8xl lg:text-9xl">
              Dan, ko mesto izgine za gozdom.
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-zinc-200 md:text-2xl md:leading-10">
              Gozdni flow nad Mariborom ni samo trasa. Je počasen prehod iz
              mestnega ritma v gozd, razgled, postanek in občutek, da si bil
              nekaj ur res zunaj.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              {["32 km", "890 vm", "gozdni pobeg", "e-bike friendly"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur-xl"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <aside className="rounded-[42px] border border-white/15 bg-black/35 p-7 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
            <div className="text-xs uppercase tracking-[0.45em] text-[#c58b46]">
              Bojanov namig
            </div>

            <p className="mt-5 text-2xl font-black leading-9">
              Če greš poleti, začni zgodaj. Najlepši del je takrat, ko je gozd
              še tih, cesta prazna in imaš pri razgledu občutek, da je jutro
              samo tvoje.
            </p>

            <div className="mt-7 grid gap-3">
              {details.map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[120px_1fr] gap-4 border-t border-white/10 pt-4"
                >
                  <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                    {label}
                  </div>
                  <div className="text-sm font-black text-white">{value}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <div className="text-xs uppercase tracking-[0.45em] text-[#c58b46]">
                Ne izberi samo trase
              </div>
              <h2 className="mt-5 text-5xl font-black leading-none tracking-tight md:text-7xl">
                Izberi občutek dneva.
              </h2>
            </div>

            <p className="max-w-3xl text-xl leading-9 text-zinc-400">
              Tehnični podatki so pomembni, ampak niso razlog, zakaj si boš
              turo zapomnil. Zapomnil si boš svetlobo v gozdu, razgled, miren
              makadam in postanek, ki pride ob pravem trenutku.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {moments.map((moment, index) => (
              <article
                key={moment.title}
                className="group relative min-h-[560px] overflow-hidden rounded-[46px] border border-white/10 bg-[#07110b]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${momentImages[index]})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />

                <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
                  <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                    {moment.eyebrow}
                  </div>
                  <h3 className="mt-4 text-4xl font-black leading-tight">
                    {moment.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-zinc-300">
                    {moment.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#07130b] px-6 py-24">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="sticky top-10 self-start">
            <div className="text-xs uppercase tracking-[0.45em] text-[#c58b46]">
              Ob poti
            </div>

            <h2 className="mt-5 max-w-2xl text-5xl font-black leading-none tracking-tight md:text-7xl">
              Ne spreglej tistega, kar naredi dan.
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-9 text-zinc-400">
              Tura ni dobra samo zaradi linije na zemljevidu. Dobra postane
              zaradi krajev, ljudi, postankov in trenutkov, ki jih najdeš ob poti.
            </p>
          </div>

          <div className="grid gap-5">
            {stops.map((stop, index) => (
              <article
                key={stop.title}
                className="grid gap-6 rounded-[42px] border border-white/10 bg-black/20 p-6 md:grid-cols-[180px_1fr] md:p-7"
              >
                <div className="flex aspect-square items-center justify-center rounded-[34px] border border-[#c58b46]/20 bg-[#c58b46]/10 text-5xl font-black text-[#c58b46]">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="flex flex-col justify-center">
                  <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                    {stop.label}
                  </div>
                  <h3 className="mt-3 text-3xl font-black text-white">
                    {stop.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-8 text-zinc-400">
                    {stop.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-[1500px] gap-8 rounded-[48px] border border-[#c58b46]/20 bg-[#c58b46]/10 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div>
            <div className="text-xs uppercase tracking-[0.45em] text-[#c58b46]">
              Skupnost lokalnih kolesarjev
            </div>

            <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-tight md:text-5xl">
              Poznaš pot, ki ima tak občutek?
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-300">
              Predlagaj jo. Ne iščemo samo kilometrov, ampak kolesarske dneve,
              ki imajo zgodbo, ritem, postanek in lokalni podpis.
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
