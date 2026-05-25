import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

const experience = {
  title: "Vinski kolesarski dan",
  eyebrow: "Vinsko doživetje · Štajerska · Slovenske gorice",
  image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1600&auto=format&fit=crop",
  description:
    "Lahkotna vožnja med griči, postanek pri vinski kleti, domača kulinarika in razgled, ki naredi dan poseben.",
  story:
    "To ni tura za rekorde. Med vinskimi griči se dan odvija počasneje — asfalt se izmenjuje z makadamom, med vzponi se odpirajo pogledi na vinograde in doline, pri postanku pa te pričaka lokalni pridelek in pogovor, ki ga ne dobiš nikjer drugje. Dan, ki se ga zapomniš.",
  highlights: [
    { icon: "🍷", title: "Vinska klet med griči", text: "Butična vinska izkušnja z razgledom. Priporoča se degustacija ob poti." },
    { icon: "🌄", title: "Vinogradniške terase", text: "Razgled na terasaste vinograde — ena lepših točk Slovenskih goric." },
    { icon: "🚵", title: "Lahkoten ritem", text: "Gravel pot z mehkimi vzponi. Primerna za e-bike in za pare." },
  ],
  trail: { name: "Med vinogradi in griči", href: "/ture/med-vinogradi-in-grici", km: "48 km", vm: "620 vm", type: "Gravel" },
  provider: { name: "Vinska klet med griči", href: "/ponudniki", distance: "300 m od trase" },
  attraction: { name: "Vinogradniške terase", href: "/znamenitosti" },
};

export default function VinskoDozivetjePage() {
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

            {/* Zgodba */}
            <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:p-10">
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Zakaj ta dan?</div>
              <h2 className="mt-4 font-serif text-3xl font-black italic leading-tight">
                Dan brez hitenja.
              </h2>
              <p className="mt-5 text-lg leading-9 text-zinc-300">{experience.story}</p>
            </section>

            {/* Poudarki */}
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

          {/* Sidebar */}
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

          </aside>
        </div>
      </div>
    </main>
  );
}
