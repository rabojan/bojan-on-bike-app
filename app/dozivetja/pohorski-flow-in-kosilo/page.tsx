import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

const experience = {
  title: "Pohorski flow in kosilo",
  eyebrow: "MTB flow · Štajerska · Pohorje",
  image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=1600&auto=format&fit=crop",
  description:
    "Gozdni odseki, občutek svobode, nato pa zaslužen postanek pri lokalnem ponudniku ob poti.",
  story:
    "Pohorje te vsakič preseneti. Ko se enkrat ujameš v flow med drevesi, pozabiš na čas. Spusti, ki se iztečejo v mirne gozdne poti, višinski razgledi in nazadnje Rudijev dom z juho, ki jo nisi naročil, ampak si jo zaslužil. Ta dan je nagrajevanje sebe.",
  highlights: [
    { icon: "🌲", title: "Gozdni flow odseki", text: "Najboljše poti so med drevesi — enosledniki, ki tečejo z gozdom." },
    { icon: "🏔️", title: "Razgled nad Mariborom", text: "Ko se gozd odpre, se odpre mesto. Eden lepših pogledov na Štajersko." },
    { icon: "🍲", title: "Kosilo pri Rudijevem domu", text: "Domača hrana, terasa in zaslužen počitek po turi." },
  ],
  trail: { name: "Gozdni flow nad Mariborom", href: "/ture/gozdni-flow-nad-mariborom", km: "32 km", vm: "890 vm", type: "MTB" },
  provider: { name: "Rudijev dom na Pohorju", href: "/ponudniki/rudijev-dom-na-pohorju", distance: "ob trasi" },
  attraction: { name: "Razgled nad Mariborom", href: "/znamenitosti/razgled-nad-mariborom" },
};

export default function PohorskiFlowInKosiloPage() {
  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/dozivetja" active="dozivetja" />

      {/* HERO */}
      <section className="relative flex min-h-[75vh] items-end overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${experience.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07110b]/50 via-[#07110b]/30 to-[#07110b]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07110b]/60 via-transparent to-transparent" />

        <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 md:px-6 md:pb-20">
          <div className="max-w-3xl">
            <div className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-[#c58b46]">
              {experience.eyebrow}
            </div>
            <h1 className="font-serif text-5xl font-black italic leading-[0.92] tracking-[-0.045em] md:text-7xl">
              {experience.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
              {experience.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={experience.trail.href}
                className="rounded-full bg-[#c58b46] px-7 py-3 text-sm font-black text-black"
              >
                Oglej si turo
              </Link>
              <Link
                href="/dozivetja"
                className="rounded-full border border-white/10 px-7 py-3 text-sm font-bold text-zinc-300"
              >
                ← Vsa doživetja
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr]">
          <div className="space-y-8">

            <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:p-10">
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Zakaj ta dan?</div>
              <h2 className="mt-4 font-serif text-3xl font-black italic leading-tight">
                Flow, razgled in zasluženo kosilo.
              </h2>
              <p className="mt-5 text-lg leading-9 text-zinc-300">{experience.story}</p>
            </section>

            <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:p-10">
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Poudarki dneva</div>
              <h2 className="mt-4 font-serif text-3xl font-black italic">Kaj te čaka.</h2>
              <div className="mt-6 space-y-4">
                {experience.highlights.map((h) => (
                  <div key={h.title} className="flex gap-4 rounded-2xl border border-white/10 bg-black/20 p-5">
                    <div className="text-2xl">{h.icon}</div>
                    <div>
                      <div className="font-serif text-lg font-black italic">{h.title}</div>
                      <p className="mt-1 text-sm leading-6 text-zinc-400">{h.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">Tura</div>
              <Link href={experience.trail.href} className="mt-3 block font-serif text-xl font-black italic hover:text-[#f4d7ad]">
                {experience.trail.name}
              </Link>
              <div className="mt-3 flex flex-wrap gap-2">
                {[experience.trail.km, experience.trail.vm, experience.trail.type].map((v) => (
                  <span key={v} className="rounded-full border border-white/10 px-3 py-1.5 text-xs">{v}</span>
                ))}
              </div>
              <Link
                href={experience.trail.href}
                className="mt-4 block w-full rounded-full bg-[#c58b46] px-5 py-3 text-center text-sm font-black text-black"
              >
                Odpri turo
              </Link>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">Postanek</div>
              <div className="mt-3 font-serif text-xl font-black italic">{experience.provider.name}</div>
              <div className="mt-1 text-xs text-zinc-500">{experience.provider.distance}</div>
              <Link
                href={experience.provider.href}
                className="mt-4 block w-full rounded-full border border-white/10 px-5 py-3 text-center text-sm font-semibold text-zinc-300 hover:border-[#c58b46]/40"
              >
                Ogled ponudnika
              </Link>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">Znamenitost</div>
              <Link href={experience.attraction.href} className="mt-3 block font-serif text-xl font-black italic hover:text-[#f4d7ad]">
                {experience.attraction.name}
              </Link>
              <Link
                href={experience.attraction.href}
                className="mt-4 block w-full rounded-full border border-white/10 px-5 py-3 text-center text-sm font-semibold text-zinc-300 hover:border-[#c58b46]/40"
              >
                Ogled znamenitosti
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
