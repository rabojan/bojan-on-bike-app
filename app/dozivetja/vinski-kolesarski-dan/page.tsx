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
    image: string;
  };
  attraction?: {
    name: string;
    href: string;
    type: string;
    distance: string;
    image: string;
  };
  posebnosti?: Array<{ icon: string; text: string }>;
};

const experience = {
  title: "Vinski kolesarski dan",
  eyebrow: "Gravel · Štajerska · Slovenske gorice",
  image:
    "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1600&auto=format&fit=crop",
  mood: "Mehki vzponi, vinski razgledi, pogovor ob kozarcu. Dan brez ciljev.",
  story:
    "To ni tura za rekorde. Med vinskimi griči se dan odvija počasneje — asfalt se izmenjuje z makadamom, med vzponi se odpirajo pogledi na vinograde in doline, pri postanku pa te pričaka lokalni pridelek in pogovor, ki ga ne dobiš nikjer drugje. Dan, ki se ga zapomniš.",

  timeline: [
    {
      time: "08:00",
      icon: "🌅",
      title: "Start med griči",
      description: "Zjutraj, ko vinograde oblije prva svetloba. Kolo na traso, pogled naprej.",
    },
    {
      time: "09:30",
      icon: "🚵",
      title: "Mehki vzponi",
      description: "Gravel pot med terasami. Ni strmih klancev — samo ritem, ki ga izbereš sam.",
    },
    {
      time: "11:00",
      icon: "🌄",
      title: "Vinogradniška terasa",
      description: "Razgled na dolino in vinograde. Eden lepših pogledov v Slovenskih goricah.",
      attraction: {
        name: "Vinogradniške terase",
        href: "/znamenitosti",
        type: "Razgled · Narava",
        distance: "ob trasi",
        image:
          "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=800&auto=format&fit=crop",
      },
    },
    {
      time: "12:30",
      icon: "🍷",
      title: "Postanek pri vinski kleti",
      description: "Degustacija, pogovor z vinarjem in odmor v senci.",
      provider: {
        name: "Vinska klet Jurančič",
        href: "/ponudniki/vinska-klet-jurancic",
        type: "Vinska klet · Degustacija",
        distance: "300 m od trase",
        image:
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop",
      },
      posebnosti: [
        { icon: "🧀", text: "Lokalni prigrizki ob degustaciji" },
        { icon: "🚲", text: "Kolo pustiš v dvorišču" },
      ],
    },
    {
      time: "14:00",
      icon: "🏘️",
      title: "Vasi in lokalne poti",
      description: "Nazaj skozi vaške ulice, ki jih ni na nobenem turističnem zemljevidu.",
    },
    {
      time: "16:00",
      icon: "🏁",
      title: "Konec dneva",
      description: "Zložiš kolo in si misliš: naslednjič pridem prej. In dlje.",
    },
  ] as TimelineStep[],

  trail: {
    name: "Med vinogradi in griči",
    gpx: "/gpx/med-vinogradi-in-grici.gpx",
    km: "48 km",
    vm: "620 vm",
    time: "3–5 ur",
    type: "Gravel",
    difficulty: "Lahka",
    surface: { asphalt: 45, gravel: 40, forest: 15 },
  },
};

function TimelineCard({
  label,
  labelColor,
  name,
  href,
  type,
  distance,
  image,
  borderClass,
}: {
  label: string;
  labelColor: string;
  name: string;
  href: string;
  type: string;
  distance: string;
  image: string;
  borderClass: string;
}) {
  return (
    <div className="w-48 shrink-0 md:w-56">
      <div className={`mb-2 text-[9px] font-black uppercase tracking-[0.28em] ${labelColor}`}>
        {label}
      </div>
      <Link
        href={href}
        className={`block overflow-hidden rounded-[16px] border ${borderClass} bg-[#0b1a10] transition`}
      >
        <div className="px-4 pt-4 pb-3">
          <div className="font-serif text-sm font-black italic leading-snug">{name}</div>
          <div className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-zinc-600">{type}</div>
        </div>
        <img src={image} alt={name} className="h-24 w-full object-cover" />
        <div className="px-4 py-3">
          <div className="text-[10px] text-zinc-500">{distance}</div>
        </div>
      </Link>
    </div>
  );
}

export default function VinskoDozivetjePage() {
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

                    {(step.provider || step.attraction) && (
                      <div className="mt-5 flex flex-wrap gap-4">
                        {step.provider && (
                          <TimelineCard
                            label="Ponudnik"
                            labelColor="text-[#c58b46]"
                            name={step.provider.name}
                            href={step.provider.href}
                            type={step.provider.type}
                            distance={step.provider.distance}
                            image={step.provider.image}
                            borderClass="border-[#c58b46]/25 hover:border-[#c58b46]/55"
                          />
                        )}
                        {step.attraction && (
                          <TimelineCard
                            label="Znamenitost"
                            labelColor="text-zinc-500"
                            name={step.attraction.name}
                            href={step.attraction.href}
                            type={step.attraction.type}
                            distance={step.attraction.distance}
                            image={step.attraction.image}
                            borderClass="border-white/10 hover:border-[#c58b46]/35"
                          />
                        )}
                      </div>
                    )}

                    {step.posebnosti && step.posebnosti.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {step.posebnosti.map((p, j) => (
                          <span
                            key={j}
                            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-zinc-500"
                          >
                            {p.icon} {p.text}
                          </span>
                        ))}
                      </div>
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

          <div className="mt-6">
            <a
              href={experience.trail.gpx}
              download
              className="inline-flex rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black transition hover:opacity-90"
            >
              ↓ Prenesi GPX
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
