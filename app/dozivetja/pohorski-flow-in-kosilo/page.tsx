import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

const experience = {
  title: "Pohorski flow in kosilo",
  eyebrow: "MTB · Štajerska · Pohorje",
  image: "/hero-gozdni-flow.png",
  mood: "Jutranjo meglo zamenjaj za razgled. Vzpon nagradi s posedanjem.",
  story:
    "Pohorje te vsakič preseneti. Ko se enkrat ujameš v flow med drevesi, pozabiš na čas. Spusti, ki se iztečejo v mirne gozdne poti, višinski razgledi in nazadnje Rudijev dom z juho, ki jo nisi naročil, ampak si jo zaslužil. Ta dan je nagrajevanje sebe.",

  timeline: [
    {
      time: "07:30",
      icon: "☕",
      title: "Jutro na sedlu",
      description:
        "Parkiraš, zatesteš pedala, narediš en globok vdih. Pohorje je jutro.",
    },
    {
      time: "08:00",
      icon: "⛰️",
      title: "Vzpon skozi gozd",
      description:
        "Prvih 400 vm vzpona med smrekami. Ritem se ustali, dihanje se poglablja.",
    },
    {
      time: "10:00",
      icon: "🌅",
      title: "Razgled nad Mariborom",
      description:
        "Odpre se mesto. Kratek postanek — ne za GPS, ampak za pogled.",
    },
    {
      time: "11:00",
      icon: "🌲",
      title: "Flow odseki",
      description:
        "Tisto, za kar si prišel. Enosledniki med drevesi, ki tečejo sami.",
    },
    {
      time: "13:00",
      icon: "🍲",
      title: "Kosilo pri Rudijevem domu",
      description:
        "Terasa, juha in zaslužena tišina. Tura se počasi zaključuje.",
    },
    {
      time: "15:00",
      icon: "🏁",
      title: "Spust in konec",
      description: "Nazaj v dolino. Noge so težke, glava pa lahka.",
    },
  ],

  provider: {
    name: "Rudijev dom na Pohorju",
    href: "/ponudniki/rudijev-dom-na-pohorju",
    distance: "ob trasi",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1600&auto=format&fit=crop",
    quote: "Juha, ki je nisi naročil, ampak si jo zaslužil.",
    description:
      "Rudijev dom je eden tistih redkih krajev, kjer se počutiš domače, čeprav si prvič. Domača kuhinja, terasa z razgledom in gostoljubnost, ki se jo zapomniš.",
  },

  trail: {
    name: "Gozdni flow nad Mariborom",
    href: "/ture/gozdni-flow-nad-mariborom",
    km: "32 km",
    vm: "890 vm",
    time: "3–5 ur",
    type: "MTB",
    difficulty: "Srednja",
    surface: { asphalt: 10, gravel: 25, forest: 65 },
  },

  attractions: [
    {
      name: "Razgled nad Mariborom",
      href: "/znamenitosti/razgled-nad-mariborom",
      type: "Razgled",
      distance: "200 m od trase",
    },
    {
      name: "Pohorski gozdni odsek",
      href: "/znamenitosti/pohorski-gozdni-odsek",
      type: "Narava",
      distance: "na trasi",
    },
    {
      name: "Stara planinska pot",
      href: "/znamenitosti/stara-planinska-pot",
      type: "Zgodovina",
      distance: "700 m od trase",
    },
  ],
};

export default function PohorskiFlowInKosiloPage() {
  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/dozivetja" active="dozivetja" />

      {/* ── HERO ── cinematic, cel zaslon, brez tehničnih podatkov */}
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

      {/* ── ZGODBA ── velik pull quote, čustveno, ne informativno */}
      <section className="border-y border-[#c58b46]/15 bg-[#0b1a10] px-5 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-[10px] font-black uppercase tracking-[0.38em] text-[#c58b46]">
            Zakaj ta dan?
          </div>
          <p className="font-serif text-3xl font-black italic leading-snug text-[#f4d7ad] md:text-4xl md:leading-snug">
            &ldquo;{experience.story}&rdquo;
          </p>
        </div>
      </section>

      {/* ── RITEM DNEVA ── vertikalna časovnica kot zgodba */}
      <section className="px-5 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="text-[10px] font-black uppercase tracking-[0.38em] text-[#c58b46]">
            Ritem dneva
          </div>
          <h2 className="mt-4 font-serif text-4xl font-black italic leading-tight md:text-5xl">
            Kako izgleda cel dan.
          </h2>

          <div className="relative mt-16">
            {/* Vertikalna linija */}
            <div className="absolute left-[1.35rem] top-0 h-full w-px bg-gradient-to-b from-[#c58b46]/50 via-[#c58b46]/20 to-transparent md:left-[1.6rem]" />

            <div className="space-y-0">
              {experience.timeline.map((step, i) => (
                <div key={i} className="relative flex gap-6 pb-12 md:gap-10">
                  {/* Node */}
                  <div className="relative shrink-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c58b46]/40 bg-[#0b1a10] text-lg md:h-12 md:w-12">
                      {step.icon}
                    </div>
                  </div>
                  <div className="pt-1.5">
                    <div className="text-[10px] font-black uppercase tracking-[0.28em] text-[#c58b46]">
                      {step.time}
                    </div>
                    <h3 className="mt-2 font-serif text-2xl font-black italic">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-xl leading-7 text-zinc-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── POSTANEK DNEVA ── atmosferska sekcija, ne kartica */}
      <section className="overflow-hidden border-y border-white/10">
        <div className="relative min-h-[560px] bg-[#0b1a10]">
          <img
            src={experience.provider.image}
            alt={experience.provider.name}
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a10] via-[#0b1a10]/90 to-[#0b1a10]/50" />

          <div className="relative mx-auto max-w-6xl px-5 py-20 md:grid md:grid-cols-[1fr_0.6fr] md:items-center md:gap-16 md:px-6 md:py-28">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.38em] text-[#c58b46]">
                Postanek dneva
              </div>
              <h2 className="mt-5 font-serif text-5xl font-black italic leading-tight text-white md:text-6xl">
                {experience.provider.name}.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-9 text-zinc-300">
                {experience.provider.description}
              </p>
              <blockquote className="mt-8 border-l-2 border-[#c58b46] pl-6 font-serif text-2xl italic leading-snug text-[#f4d7ad]">
                &ldquo;{experience.provider.quote}&rdquo;
              </blockquote>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href={experience.provider.href}
                  className="rounded-full bg-[#c58b46] px-7 py-4 text-sm font-black text-black transition hover:opacity-90"
                >
                  Spoznaj ponudnika
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KOLESARSKA OSNOVA ── trasa spodaj, sekundarno, zmanjšano */}
      <section className="px-5 py-16 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[32px] border border-white/8 bg-[#0b1a10] p-8 md:p-10">
            <div className="text-[10px] font-black uppercase tracking-[0.38em] text-zinc-500">
              Kolesarska osnova
            </div>
            <h3 className="mt-3 font-serif text-2xl font-black italic text-zinc-300">
              {experience.trail.name}
            </h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {[
                experience.trail.km,
                experience.trail.vm,
                experience.trail.time,
                experience.trail.type,
                experience.trail.difficulty,
              ].map((v) => (
                <span
                  key={v}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-500"
                >
                  {v}
                </span>
              ))}
            </div>
            <div className="mt-7 space-y-3">
              {[
                { label: "Asfalt", value: experience.trail.surface.asphalt },
                { label: "Makadam", value: experience.trail.surface.gravel },
                { label: "Gozdna pot", value: experience.trail.surface.forest },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="mb-1.5 flex justify-between text-xs text-zinc-600">
                    <span>{label}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/8">
                    <div
                      className="h-full rounded-full bg-[#c58b46]/40"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Link
              href={experience.trail.href}
              className="mt-8 inline-flex rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-zinc-500 transition hover:border-[#c58b46]/40 hover:text-[#f4d7ad]"
            >
              Samo tura →
            </Link>
          </div>
        </div>
      </section>

      {/* ── OB POTI ── znamenitosti */}
      <section className="px-5 pb-24 md:px-6 md:pb-32">
        <div className="mx-auto max-w-4xl">
          <div className="text-[10px] font-black uppercase tracking-[0.38em] text-[#c58b46]">
            Ob poti
          </div>
          <h2 className="mt-4 font-serif text-3xl font-black italic">
            Kar ne smeš zamuditi.
          </h2>
          <div className="mt-8 space-y-4">
            {experience.attractions.map((a) => (
              <Link
                key={a.name}
                href={a.href}
                className="group flex items-center justify-between gap-5 rounded-[22px] border border-white/10 bg-[#0b1a10] p-5 transition hover:border-[#c58b46]/45"
              >
                <div>
                  <div className="font-serif text-xl font-black italic group-hover:text-[#f4d7ad]">
                    {a.name}
                  </div>
                  <div className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                    {a.type}
                  </div>
                </div>
                <div className="shrink-0 text-right text-sm text-zinc-500">
                  {a.distance}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
