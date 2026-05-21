import Link from "next/link";

const photos = {
  hero:
    "/images/preview/hero-family-bike.png",
  forest:
    "https://images.unsplash.com/photo-1669372701525-06dde0779ba6?auto=format&fit=crop&q=88&w=1400",
  wine:
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=88&w=1400",
  alpine:
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=88&w=1400",
  road:
    "https://images.unsplash.com/photo-1544191696-15693072e28b?auto=format&fit=crop&q=88&w=1400",
  panorama:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=88&w=1400",
  autumn:
    "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?auto=format&fit=crop&q=88&w=1400",
  river:
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=88&w=1400",
  table:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=88&w=1400",
};

const tours = [
  {
    number: "01",
    title: "Gozdni flow nad Mariborom",
    href: "/preview/ture/gozdni-flow-nad-mariborom",
    image: photos.forest,
    region: "Štajerska",
    type: "MTB / eMTB",
    feeling: ["e-bike", "gozdni pobeg", "lokalni postanek"],
    description:
      "Pohorski enosledniki, razgled nad mestom in Rudijev dom kot zaslužena nagrada. Tura, ki jo boš priporočil.",
    distance: "32",
    elevation: "890",
    highest: "1.120",
    season: "Apr–Nov",
    ambassador: "Bojan Ratej",
    ambassadorRole: "Ambasador Štajerske",
    difficulty: "Srednja",
    surface: [
      ["Gozdne poti", "55%", "55%"],
      ["Singletraili", "30%", "30%"],
      ["Makadam", "15%", "15%"],
    ],
    profile:
      "M18 74 C72 70 98 54 144 48 C190 42 210 26 250 24 C286 22 308 44 340 42 C388 40 410 23 456 22 C500 21 520 45 558 52 C590 58 610 60 622 56",
  },
  {
    number: "02",
    title: "Med vinogradi in griči",
    href: "/preview/ture/gozdni-flow-nad-mariborom",
    image: photos.wine,
    region: "Slovenske gorice",
    type: "Gravel",
    feeling: ["za pare", "vino", "kulinarika"],
    description:
      "Mehak ritem med vinogradnimi griči, z obveznim postankom pri butični vinski kleti in razgledom na Haloze.",
    distance: "48",
    elevation: "620",
    highest: "540",
    season: "Maj–Okt",
    ambassador: "Maja Kovač",
    ambassadorRole: "Ambasadorka Slovenskih goric",
    difficulty: "Lahka",
    surface: [
      ["Asfalt", "35%", "35%"],
      ["Makadam", "45%", "45%"],
      ["Gozdne poti", "20%", "20%"],
    ],
    profile:
      "M18 70 C84 60 118 48 160 50 C205 52 230 38 270 36 C322 35 356 54 402 56 C462 58 505 46 548 48 C588 50 606 58 622 60",
  },
  {
    number: "03",
    title: "Alpski pobeg ob vodi",
    href: "/preview/ture/gozdni-flow-nad-mariborom",
    image: photos.alpine,
    region: "Gorenjska",
    type: "Bikepacking",
    feeling: ["vikend", "narava", "spalni spot"],
    description:
      "Večdnevna pustolovščina med rekami, prelazi in vasmi. Za tiste, ki iščejo turo, ki jo boš pripovedoval še dolgo.",
    distance: "86",
    elevation: "1450",
    highest: "1.680",
    season: "Jun–Sep",
    ambassador: "Andrej Novak",
    ambassadorRole: "Ambasador Gorenjske",
    difficulty: "Zahtevna",
    surface: [
      ["Asfalt", "30%", "30%"],
      ["Makadam", "50%", "50%"],
      ["Gozdne poti", "20%", "20%"],
    ],
    profile:
      "M18 76 C68 70 104 62 144 44 C184 24 220 20 260 38 C298 56 326 44 364 30 C410 14 452 32 490 46 C540 62 590 70 622 74",
  },
  {
    number: "04",
    title: "Soška kolesarska pot",
    href: "/preview/ture/gozdni-flow-nad-mariborom",
    image: photos.road,
    region: "Primorska",
    type: "Cestno / Gravel",
    feeling: ["za pare", "razgledna", "e-bike"],
    description:
      "Turkizna reka kot stalni spremljevalec. Ravna trasa, nebeški razgledi in lokalna osteria — kolesarjenje kot mediteranski izlet.",
    distance: "62",
    elevation: "350",
    highest: "420",
    season: "Apr–Okt",
    ambassador: "Petra Kos",
    ambassadorRole: "Ambasadorka Primorske",
    difficulty: "Sproščena",
    surface: [
      ["Asfalt", "55%", "55%"],
      ["Makadam", "25%", "25%"],
      ["Gozdne poti", "20%", "20%"],
    ],
    profile:
      "M18 64 C82 60 140 58 190 50 C240 44 292 42 342 48 C410 52 470 50 530 54 C570 58 600 60 622 62",
  },
  {
    number: "05",
    title: "Kranjska Gora panorama",
    href: "/preview/ture/gozdni-flow-nad-mariborom",
    image: photos.panorama,
    region: "Gorenjska",
    type: "Gravel",
    feeling: ["razgledna", "narava", "vikend"],
    description:
      "Med triglavskim parkom in alpskimi vasmi. Vsak ovinek razkrije nov razgled, ki te prisili, da se ustaviš in pogledaš.",
    distance: "44",
    elevation: "780",
    highest: "970",
    season: "Jun–Sep",
    ambassador: "Lea Bertoncelj",
    ambassadorRole: "Ambasadorka Gorenjske",
    difficulty: "Srednja",
    surface: [
      ["Asfalt", "25%", "25%"],
      ["Makadam", "48%", "48%"],
      ["Gozdne poti", "27%", "27%"],
    ],
    profile:
      "M18 68 C78 56 124 48 C168 38 214 30 260 34 C320 40 350 58 398 60 C444 58 496 42 548 44 C590 46 608 52 622 54",
  },
  {
    number: "06",
    title: "Prekmurska ravninska pot",
    href: "/preview/ture/gozdni-flow-nad-mariborom",
    image: photos.autumn,
    region: "Prekmurje",
    type: "Cestno",
    feeling: ["za otroke", "kulinarika", "sproščeno"],
    description:
      "Prekmurje v svoji najboljši obliki — ravninska pot med bukovimi gozdovi, vinogradi in domačijami z bučnim oljem na mizi.",
    distance: "38",
    elevation: "120",
    highest: "220",
    season: "Mar–Nov",
    ambassador: "Eva Tkalec",
    ambassadorRole: "Ambasadorka Prekmurja",
    difficulty: "Lahka",
    surface: [
      ["Asfalt", "80%", "80%"],
      ["Makadam", "15%", "15%"],
      ["Gozdne poti", "5%", "5%"],
    ],
    profile:
      "M18 60 C100 59 150 60 220 58 C280 57 350 58 420 59 C490 60 560 58 622 59",
  },
  {
    number: "07",
    title: "Koroška pot ob Dravi",
    href: "/preview/ture/gozdni-flow-nad-mariborom",
    image: photos.river,
    region: "Koroška",
    type: "Gravel",
    feeling: ["narava", "gozdni pobeg", "vilen"],
    description:
      "Mirna dolina, zeleni hribi in Drava kot rdeča nit. Tura, ki ti pokaže, da Koroška skriva precej več, kot večina kolesarjev sploh ve.",
    distance: "52",
    elevation: "540",
    highest: "680",
    season: "Apr–Nov",
    ambassador: "Gregor Miller",
    ambassadorRole: "Ambasador Koroške",
    difficulty: "Srednja",
    surface: [
      ["Asfalt", "45%", "45%"],
      ["Makadam", "40%", "40%"],
      ["Gozdne poti", "15%", "15%"],
    ],
    profile:
      "M18 64 C80 56 132 50 196 48 C250 46 306 36 356 38 C420 42 470 56 520 54 C578 52 606 50 622 52",
  },
  {
    number: "08",
    title: "Dolenjska pot med gradovi",
    href: "/preview/ture/gozdni-flow-nad-mariborom",
    image: photos.table,
    region: "Dolenjska",
    type: "Gravel",
    feeling: ["kulinarika", "za pare", "razgledna"],
    description:
      "Grad za gradom, kozarec vina za kozarcem, Dolenjska v jeseni je eno tistih kolesarskih doživetij, ki te vrnejo v otroštvo in obljubijo, da se boš vrnil.",
    distance: "45",
    elevation: "340",
    highest: "510",
    season: "Apr–Nov",
    ambassador: "Nina Celar",
    ambassadorRole: "Ambasadorka Dolenjske",
    difficulty: "Sproščena",
    surface: [
      ["Asfalt", "55%", "55%"],
      ["Makadam", "33%", "33%"],
      ["Gozdne poti", "12%", "12%"],
    ],
    profile:
      "M18 62 C80 56 126 54 C178 50 226 42 280 44 C336 46 382 54 438 52 C500 48 568 50 622 46",
  },
];

const filters = [
  "vse",
  "Štajerska",
  "Gorenjska",
  "Primorska",
  "Koroška",
  "Dolenjska",
  "Prekmurje",
];

const types = ["vsi tipi", "MTB", "eMTB", "Gravel", "Cestno", "Bikepacking"];

function MiniProfile({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 640 96" className="h-[72px] w-full" role="img" aria-label="Mini višinski profil">
      <defs>
        <linearGradient id={`fill-${path.length}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#c8924a" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#c8924a" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={`${path} L622 86 L18 86 Z`} fill={`url(#fill-${path.length})`} />
      <path d={path} fill="none" stroke="#c8924a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
    </svg>
  );
}

function SurfaceLine({ surface }: { surface: string[][] }) {
  return (
    <div>
      <div className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-zinc-600">
        Sestava podlage
      </div>
      <div className="flex h-2 overflow-hidden rounded-full bg-white/10">
        {surface.map(([name, value, width], index) => (
          <div
            key={name}
            className={
              index === 0
                ? "bg-[#c8924a]"
                : index === 1
                  ? "bg-[#7c6b3e]"
                  : "bg-emerald-600"
            }
            style={{ width }}
            title={`${name} ${value}`}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-bold text-zinc-600">
        {surface.map(([name, value]) => (
          <span key={name}>
            <span className="text-[#c8924a]">•</span> {name} {value}
          </span>
        ))}
      </div>
    </div>
  );
}

function TourCard({ tour }: { tour: (typeof tours)[number] }) {
  const ambassadorRole =
    (tour as { ambassadorRole?: string; region: string }).ambassadorRole ??
    `Ambasador ${tour.region}`;

  return (
    <article className="group flex h-[790px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#0e1a11] transition duration-300 hover:-translate-y-1 hover:border-[#c8924a]/40">
      <div
        className="relative h-[250px] shrink-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${tour.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1a11] via-[#0e1a11]/25 to-black/10" />

        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-200 backdrop-blur">
          {tour.difficulty}
        </div>

        <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-200 backdrop-blur">
          {tour.type}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#c8924a]">
            {tour.region}
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-6">
        <div className="mb-4 flex h-[30px] flex-wrap items-start gap-2 overflow-hidden">
          {tour.feeling.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[#c8924a]/25 bg-[#c8924a]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#edd098]"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-[34px_1fr] gap-3">
          <div className="pt-1 font-serif text-2xl font-black italic leading-none text-[#edd098]/35">
            {tour.number}
          </div>

          <div className="min-w-0">
            <h2 className="h-[68px] overflow-hidden font-serif text-[25px] font-black italic leading-[1.05] tracking-tight text-white">
              {tour.title}
            </h2>

            <p className="mt-3 h-[84px] overflow-hidden text-sm leading-7 text-zinc-400">
              {tour.description}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-4 overflow-hidden rounded-2xl border border-white/10 bg-black/15">
          {[
            [`${tour.distance} km`, "dolžina"],
            [`${tour.elevation} vm`, "vzpon"],
            [`${tour.highest} m`, "najvišje"],
            [tour.season, "sezona"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="min-w-0 border-r border-white/10 px-2 py-3 text-center last:border-r-0"
            >
              <div className="whitespace-nowrap font-serif text-[14px] font-black leading-none tracking-tight text-[#edd098] md:text-[15px]">
                {value}
              </div>
              <div className="mt-2 whitespace-nowrap text-[9px] font-black uppercase tracking-[0.12em] text-zinc-400 md:text-[10px]">
                {label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <div className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-600">
            Višinski profil
          </div>
          <div className="h-[72px]">
            <MiniProfile path={tour.profile} />
          </div>
        </div>

        <div className="mt-4 h-[58px]">
          <SurfaceLine surface={tour.surface} />
        </div>

        <div className="mt-auto flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <div className="truncate text-[10px] font-black uppercase tracking-[0.18em] text-zinc-600">
              {ambassadorRole}
            </div>
            <div className="mt-1 truncate text-xs font-black uppercase tracking-[0.14em] text-[#edd098]">
              {tour.ambassador}
            </div>
          </div>

          <Link
            href={tour.href}
            className="shrink-0 text-[10px] font-black uppercase tracking-[0.18em] text-[#c8924a]"
          >
            Oglej si turo →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function PreviewTurePage() {
  return (
    <main className="min-h-screen bg-[#080f0b] text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080f0b]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1480px] items-center justify-between px-6">
          <Link href="/preview" className="font-serif text-lg font-black text-white">
            Bojan <span className="font-normal italic text-[#edd098]">on Bike</span>
          </Link>

          <nav className="hidden items-center gap-8 text-xs font-bold uppercase tracking-[0.12em] text-zinc-500 md:flex">
            <Link href="/preview/ture" className="text-[#c8924a]">Ture</Link>
            <Link href="/preview/dozivetja">Doživetja</Link>
            <Link href="/preview/ponudniki">Ponudniki</Link>
            <Link href="/preview/znamenitosti">Znamenitosti</Link>
          </nav>

          <Link
            href="/predlagaj-turo"
            className="rounded-full bg-[#c8924a] px-5 py-2 text-xs font-black text-black"
          >
            Predlagaj turo
          </Link>
        </div>
      </header>

      <section className="relative min-h-[660px] overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${photos.hero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080f0b]/45 via-[#080f0b]/50 to-[#080f0b]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080f0b]/75 via-[#080f0b]/45 to-transparent" />

        <div className="relative mx-auto max-w-[1480px] px-6 pb-16 pt-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.34em] text-[#c8924a]">
                Bojan on Bike · Ture
              </div>

              <h1 className="mt-6 max-w-5xl font-serif text-6xl font-black italic leading-[0.88] tracking-tight md:text-8xl">
                Poišči turo
                <br />
                za tvoj <span className="text-[#edd098]">dan.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
                Filtriraj po pokrajini, zahtevnosti in občutku. Vsaka tura
                vsebuje GPX, višinski profil, vreme, podlago in lokalni namig
                ambasadorja.
              </p>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-[#0e1a11]/80 p-6 backdrop-blur">
              <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[#c8924a]">
                Kako izbrati
              </div>
              <h2 className="mt-3 font-serif text-3xl font-bold italic">
                Ne izberi samo trase.
              </h2>
              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Izberi občutek dneva: gozdni pobeg, razgledno turo, družinski
                izlet, vikend avanturo ali postanek pri lokalnem ponudniku.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 overflow-hidden border-y border-white/10 bg-[#06170f]/95 backdrop-blur-md md:grid-cols-4">
          {[
            ["8", "tur v sistemu"],
            ["7", "pokrajin"],
            ["6", "ambasadorjev"],
            ["GPX", "za vse ture"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="min-h-[108px] border-b border-r border-white/10 px-7 py-6 last:border-r-0 md:border-b-0"
            >
              <div className="font-serif text-[32px] font-black leading-none tracking-tight text-[#edd098] md:text-[36px]">
                {value}
              </div>
              <div className="mt-3 text-[10px] font-black uppercase tracking-[0.28em] text-zinc-500">
                {label}
              </div>
            </div>
          ))}
        </div>

        <div className="relative left-1/2 right-1/2 mt-10 -ml-[50vw] -mr-[50vw] w-screen border-y border-white/10 bg-[#07130b]">
          <div className="mx-auto max-w-[1480px] px-6 py-4">
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-7">
                {filters.map((filter, index) => (
                  <button
                    key={filter}
                    className={
                      index === 0
                        ? "w-full rounded-full bg-[#c8924a] px-4 py-2 text-center text-[10px] font-black uppercase tracking-[0.14em] text-black"
                        : "w-full rounded-full border border-white/10 px-4 py-2 text-center text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500"
                    }
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                {types.map((type, index) => (
                  <button
                    key={type}
                    className={
                      index === 0
                        ? "w-full rounded-full bg-[#1a2115] px-4 py-2 text-center text-[10px] font-black uppercase tracking-[0.14em] text-[#edd098]"
                        : "w-full rounded-full border border-white/10 px-4 py-2 text-center text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500"
                    }
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-[1480px] px-6">
        </div>
      </section>

      <section className="mx-auto max-w-[1480px] px-6 py-16">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.34em] text-[#c8924a]">
              Izbor ambasadorjev
            </div>
            <h2 className="mt-3 font-serif text-4xl font-bold italic">
              Ture, ki ustrezajo tvoji izbiri.
            </h2>
          </div>
          <div className="hidden text-xs font-black uppercase tracking-[0.18em] text-zinc-600 md:block">
            {tours.length} rezultatov
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {tours.map((tour) => (
            <TourCard key={tour.title} tour={tour} />
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto grid max-w-[1280px] gap-8 rounded-[32px] border border-[#c8924a]/25 bg-[#11170d] p-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.3em] text-[#c8924a]">
              Skupnost ambasadorjev
            </div>
            <h2 className="mt-3 font-serif text-4xl font-bold italic">
              Poznaš pot, ki si zasluži biti tukaj?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
              Postani ambasador svoje pokrajine. Predlagaj turo in jo skupaj
              oblikujemo v pravo kolesarsko doživetje.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/predlagaj-turo"
              className="rounded-full bg-[#c8924a] px-7 py-3 text-center text-sm font-black text-black"
            >
              Predlagaj turo
            </Link>
            <Link
              href="/preview"
              className="rounded-full border border-[#c8924a]/35 px-7 py-3 text-center text-sm font-black text-[#c8924a]"
            >
              Nazaj na preview
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-xs text-zinc-600">
        <div className="mx-auto flex max-w-[1480px] justify-between">
          <span className="font-serif italic">Bojan on Bike</span>
          <span>© preview ture</span>
        </div>
      </footer>
    </main>
  );
}
