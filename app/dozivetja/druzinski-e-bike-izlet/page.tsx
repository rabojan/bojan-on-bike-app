import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

type TimelineStep = {
  time: string;
  icon: string;
  title: string;
  description: string;
  provider?: {
    name: string;
    href: string;
    type: string;
    distance: string;
    quote?: string;
  };
  attraction?: {
    name: string;
    href: string;
    type: string;
    distance: string;
  };
};

const experience = {
  title: "Družinski e-bike izlet",
  eyebrow: "E-bike · Štajerska · Pohorje",
  image:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
  mood: "Gozd, ki počaka. Tempo, ki ga narekujete vi. Dan za celo družino.",
  story:
    "Pohorje ni samo za tekmovalce. Ta dan je zasnovan za družine — odseki, ki so obvladljivi za otroke, postanki, kjer se vsi nasmejijo, in tempo, ki dovoli, da dan res dihate skupaj. E-bike poskrbi, da ne zmanjka energije pred koncem.",

  timeline: [
    {
      time: "08:30",
      icon: "👨‍👩‍👧",
      title: "Start za vse",
      description:
        "Parkirišče ob spodnjem delu Pohorja. Koles naloženih, nahrbtnikov napolnjenih. Dobro jutro, gozd.",
    },
    {
      time: "09:00",
      icon: "🔋",
      title: "Vzpon brez stresa",
      description:
        "E-bike poskrbi, da vzpon ne izčrpa. Otroci in starši v istem tempu, v isti zgodbi.",
    },
    {
      time: "10:30",
      icon: "🌲",
      title: "Gozdni postanek",
      description:
        "Mirno mesto med drevesi. Malica, opazovanje narave, kratek počitek.",
      attraction: {
        name: "Pohorski gozdni odsek",
        href: "/znamenitosti/pohorski-gozdni-odsek",
        type: "Narava",
        distance: "na trasi",
      },
    },
    {
      time: "12:00",
      icon: "🍲",
      title: "Kosilo pri Rudijevem domu",
      description:
        "Terasa z razgledom, domača hrana in polnilnica za baterije. Za otroke je to že sam po sebi cilj.",
      provider: {
        name: "Rudijev dom na Pohorju",
        href: "/ponudniki/rudijev-dom-na-pohorju",
        type: "Planinska koča · Hrana · E-bike polnilnica",
        distance: "ob trasi",
        quote: "Polnilnica za baterije in za dušo. Oba.",
      },
    },
    {
      time: "13:30",
      icon: "🚵",
      title: "Povratek po gozdnih poteh",
      description:
        "Nazaj s spusti, ki so ravno prav dolgimi za otroke. Smeh je vključen.",
    },
    {
      time: "15:30",
      icon: "🏁",
      title: "Konec, ki se ga zapomni",
      description:
        "Utrujeni in zadovoljni. Otroci bodo prosili, da greste spet.",
    },
  ] as TimelineStep[],

  trail: {
    name: "Gozdni flow nad Mariborom",
    href: "/ture/gozdni-flow-nad-mariborom",
    gpx: "/gpx/gozdni-flow-nad-mariborom.gpx",
    mapsUrl: "https://maps.google.com/?q=46.5118,15.6012",
    km: "32 km",
    vm: "890 vm",
    time: "3–5 ur",
    type: "MTB / E-bike",
    difficulty: "Srednja",
    surface: { asphalt: 10, gravel: 25, forest: 65 },
  },
};

export default function DruzinskiEBikeIzletPage() {
  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/dozivetja" active="dozivetja" />

      {/* ── HERO ── */}
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <img
          src={experience.image}
          alt={experience.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-[#07110b]/30 to-[#07110b]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07110b]/80 via-[#07110b]/30 to-transparent" />

        <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 md:px-6 md:pb-28">
          <div className="max-w-2xl">
            <div className="mb-5 text-[10px] font-black uppercase tracking-[0.38em] text-[#c58b46]">
              Doživetje · {experience.eyebrow}
            </div>
            <h1 className="font-serif text-6xl font-black italic leading-[0.9] tracking-[-0.045em] text-white md:text-8xl">
              {experience.title}
            </h1>
            <p className="mt-8 max-w-lg text-xl leading-9 text-zinc-200 md:text-2xl md:leading-10">
              {experience.mood}
            </p>
          </div>
          <div className="mt-14 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
            ↓ Razišči dan
          </div>
        </div>
      </section>

      {/* ── ZAKAJ TA DAN ── */}
      <section className="border-y border-[#c58b46]/15 bg-[#0b1a10] px-5 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 text-[10px] font-black uppercase tracking-[0.38em] text-[#c58b46]">
            Zakaj ta dan?
          </div>
          <p className="max-w-2xl text-base leading-8 text-zinc-400">
            {experience.story}
          </p>
        </div>
      </section>

      {/* ── RITEM DNEVA ── */}
      <section className="px-5 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="text-[10px] font-black uppercase tracking-[0.38em] text-[#c58b46]">
            Ritem dneva
          </div>
          <h2 className="mt-4 font-serif text-4xl font-black italic leading-tight md:text-5xl">
            Kako izgleda cel dan.
          </h2>

          <div className="relative mt-16">
            <div className="absolute left-[1.35rem] top-0 h-full w-px bg-gradient-to-b from-[#c58b46]/50 via-[#c58b46]/20 to-transparent md:left-[1.6rem]" />

            <div className="space-y-0">
              {experience.timeline.map((step, i) => (
                <div key={i} className="relative flex gap-6 pb-12 md:gap-10">
                  <div className="relative shrink-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c58b46]/40 bg-[#0b1a10] text-lg md:h-12 md:w-12">
                      {step.icon}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5">
                    <div className="text-[10px] font-black uppercase tracking-[0.28em] text-[#c58b46]">
                      {step.time}
                    </div>
                    <h3 className="mt-2 font-serif text-2xl font-black italic">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-base leading-7 text-zinc-400">
                      {step.description}
                    </p>

                    {step.provider && (
                      <Link
                        href={step.provider.href}
                        className="mt-4 block rounded-[18px] border border-[#c58b46]/25 bg-[#0b1a10] p-5 transition hover:border-[#c58b46]/50"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#c58b46]">
                              {step.provider.type}
                            </div>
                            <div className="mt-1.5 font-serif text-lg font-black italic">
                              {step.provider.name}
                            </div>
                            {step.provider.quote && (
                              <p className="mt-2 text-sm italic leading-6 text-zinc-500">
                                &ldquo;{step.provider.quote}&rdquo;
                              </p>
                            )}
                          </div>
                          <div className="shrink-0 text-right text-xs text-zinc-500">
                            {step.provider.distance}
                          </div>
                        </div>
                      </Link>
                    )}

                    {step.attraction && (
                      <Link
                        href={step.attraction.href}
                        className="mt-4 block rounded-[18px] border border-white/10 bg-[#0b1a10] p-5 transition hover:border-[#c58b46]/35"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="min-w-0">
                            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">
                              {step.attraction.type}
                            </div>
                            <div className="mt-1.5 font-serif text-lg font-black italic">
                              {step.attraction.name}
                            </div>
                          </div>
                          <div className="shrink-0 text-right text-xs text-zinc-500">
                            {step.attraction.distance}
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRASA V PODATKIH ── */}
      <section className="border-t border-white/10 bg-[#0b1a10] px-5 py-16 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-[10px] font-black uppercase tracking-[0.38em] text-zinc-500">
            Trasa v podatkih
          </div>
          <h3 className="mt-3 font-serif text-2xl font-black italic text-zinc-300">
            {experience.trail.name}
          </h3>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              experience.trail.km,
              experience.trail.vm,
              experience.trail.time,
              experience.trail.type,
              experience.trail.difficulty,
            ].map((v) => (
              <span
                key={v}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-400"
              >
                {v}
              </span>
            ))}
          </div>

          <p className="mt-5 text-sm text-zinc-600">
            Podlaga: Asfalt {experience.trail.surface.asphalt}% · Makadam{" "}
            {experience.trail.surface.gravel}% · Gozdna pot{" "}
            {experience.trail.surface.forest}%
          </p>

          <div className="mt-7 flex h-44 items-center justify-center overflow-hidden rounded-[20px] border border-white/10 bg-black/30 md:h-56">
            <div className="text-center">
              <div className="text-2xl">🗺️</div>
              <p className="mt-2 text-sm text-zinc-600">
                Interaktivni zemljevid bo na voljo kmalu
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={experience.trail.gpx}
              download
              className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black transition hover:opacity-90"
            >
              ↓ Prenesi GPX
            </a>
            <a
              href={experience.trail.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-zinc-400 transition hover:border-[#c58b46]/40 hover:text-[#f4d7ad]"
            >
              Odpri v Google Maps
            </a>
            <Link
              href={experience.trail.href}
              className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-zinc-500 transition hover:border-[#c58b46]/40 hover:text-[#f4d7ad]"
            >
              Samo tura →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
