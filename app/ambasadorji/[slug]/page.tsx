import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

const ambassadors: Record<string, {
  name: string;
  role: string;
  region: string;
  place: string;
  bio: string;
  story: string;
  isTop: boolean;
  trails: Array<{ title: string; href: string; meta: string }>;
  providers: Array<{ title: string; href: string; type: string }>;
  attractions: Array<{ title: string; href: string; type: string }>;
}> = {
  "bojan-ratej": {
    name: "Bojan Ratej",
    role: "Ambasador Štajerske",
    region: "Štajerska",
    place: "Maribor",
    bio: "Lokalni poznavalec Pohorja, Štajerske, gozdnih poti, razgledov in doživetij ob trasi.",
    story: "Bojan pozna vsak zavoj Pohorja. Ne samo kje so poti — ampak kdaj so mokre, kdaj je razgled najboljši in katera koča pripravi juho, ki jo po vzponu resnično zaslužiš. Vsaka vsebina na tej platformi iz Štajerske je bila filtrirana skozi lokalnega kolesarja z letnicami na nogah in zgodbo za vsakim predlogom.",
    isTop: false,
    trails: [
      { title: "Gozdni flow nad Mariborom", href: "/ture/gozdni-flow-nad-mariborom", meta: "32 km · 890 vm" },
    ],
    providers: [
      { title: "Rudijev dom na Pohorju", href: "/ponudniki/rudijev-dom-na-pohorju", type: "Planinska koča" },
    ],
    attractions: [
      { title: "Razgled nad Mariborom", href: "/znamenitosti/razgled-nad-mariborom", type: "Razgled" },
      { title: "Pohorski gozdni odsek", href: "/znamenitosti/pohorski-gozdni-odsek", type: "Narava" },
      { title: "Stara planinska pot", href: "/znamenitosti/stara-planinska-pot", type: "Kulturna dediščina" },
    ],
  },
  "tomaz-zupan": {
    name: "Tomaž Zupan",
    role: "TOP Ambasador Gorenjske",
    region: "Gorenjska",
    place: "Bled",
    bio: "Ambasador za alpske razglede, jezera, družinske e-bike izlete in poti ob vodi.",
    story: "Tomaž pokriva gorenjske ture ob vodi, razglede in družinske kolesarske dneve. Vsaka njegova tura ima v sebi zrcalno jezero ali goro na horizontu — ali oboje.",
    isTop: true,
    trails: [],
    providers: [],
    attractions: [],
  },
};

export function generateStaticParams() {
  return Object.keys(ambassadors).map((slug) => ({ slug }));
}

export default async function PublicAmbassadorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = ambassadors[slug] ?? ambassadors["bojan-ratej"];

  const totalContent = a.trails.length + a.providers.length + a.attractions.length;

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/" active="dozivetja" />

      {/* ── Hero ── */}
      <section className="relative flex min-h-[560px] items-end overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1a10] via-[#07110b] to-[#07110b]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,139,70,0.08),transparent_60%)]" />

        <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 md:px-6 md:pb-24">
          <div className="text-[10px] font-black uppercase tracking-[0.38em] text-[#c58b46]">
            Kolesarski ambasador · {a.region}
          </div>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-10">
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-[32px] border border-[#c58b46]/25 bg-[#0b1a10] text-6xl">
              🚴
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-serif text-5xl font-black italic leading-tight md:text-7xl">
                  {a.name}
                </h1>
                {a.isTop && (
                  <span className="rounded-full border border-[#c58b46]/50 bg-[#c58b46]/15 px-4 py-1.5 text-sm font-black text-[#f4d7ad]">
                    ★ TOP
                  </span>
                )}
              </div>
              <p className="mt-3 text-lg font-semibold text-zinc-400">{a.role} · {a.place}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-[1fr_0.7fr] md:px-6">
        <div className="space-y-10">

          {/* ── Zgodba ── */}
          <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-8">
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
              Kdo je {a.name.split(" ")[0]}?
            </div>
            <p className="mt-5 text-lg leading-9 text-zinc-300">{a.story}</p>
          </section>

          {/* ── Ture ── */}
          {a.trails.length > 0 && (
            <section>
              <div className="mb-5">
                <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Predlagane ture</div>
                <h2 className="mt-3 font-serif text-3xl font-black italic">Trase, ki jih priporoča.</h2>
              </div>
              <div className="space-y-3">
                {a.trails.map((t) => (
                  <Link key={t.title} href={t.href}
                    className="group flex items-center justify-between gap-5 rounded-[22px] border border-white/10 bg-[#0b1a10] p-5 transition hover:border-[#c58b46]/45">
                    <div className="font-serif text-xl font-black italic group-hover:text-[#f4d7ad]">{t.title}</div>
                    <div className="shrink-0 text-sm text-zinc-500">{t.meta}</div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ── Ponudniki ── */}
          {a.providers.length > 0 && (
            <section>
              <div className="mb-5">
                <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Predlagani ponudniki</div>
                <h2 className="mt-3 font-serif text-3xl font-black italic">Postanki ob trasi.</h2>
              </div>
              <div className="space-y-3">
                {a.providers.map((p) => (
                  <Link key={p.title} href={p.href}
                    className="group flex items-center justify-between gap-5 rounded-[22px] border border-white/10 bg-[#0b1a10] p-5 transition hover:border-[#c58b46]/45">
                    <div className="font-serif text-xl font-black italic group-hover:text-[#f4d7ad]">{p.title}</div>
                    <div className="shrink-0 text-sm text-zinc-500">{p.type}</div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ── Znamenitosti ── */}
          {a.attractions.length > 0 && (
            <section>
              <div className="mb-5">
                <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Predlagane znamenitosti</div>
                <h2 className="mt-3 font-serif text-3xl font-black italic">Točke, ki jih je vredno videti.</h2>
              </div>
              <div className="space-y-3">
                {a.attractions.map((z) => (
                  <Link key={z.title} href={z.href}
                    className="group flex items-center justify-between gap-5 rounded-[22px] border border-white/10 bg-[#0b1a10] p-5 transition hover:border-[#c58b46]/45">
                    <div className="font-serif text-xl font-black italic group-hover:text-[#f4d7ad]">{z.title}</div>
                    <div className="shrink-0 text-sm text-zinc-500">{z.type}</div>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* ── Sidebar ── */}
        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[28px] border border-[#c58b46]/25 bg-[#0b1a10] p-6">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c58b46]">Ambasador</div>
            <div className="mt-4 space-y-4 text-sm">
              {[
                ["Regija", a.region],
                ["Kraj", a.place],
                ["Vsebina", `${totalContent} predlogov`],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 border-b border-white/10 pb-4">
                  <span className="text-zinc-500">{label}</span>
                  <span className="font-semibold text-[#f4d7ad]">{value}</span>
                </div>
              ))}
              {a.isTop && (
                <div className="rounded-2xl border border-[#c58b46]/30 bg-[#c58b46]/10 p-3 text-center text-xs font-black text-[#f4d7ad]">
                  ★ TOP Ambasador
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
            <p className="text-sm leading-7 text-zinc-400">"{a.bio}"</p>
          </div>

          <Link href="/ambasador/registracija"
            className="block rounded-[28px] border border-[#c58b46]/25 bg-[#c58b46]/10 p-6 transition hover:bg-[#c58b46]/15">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c58b46]">Postani ambasador</div>
            <p className="mt-3 text-sm leading-7 text-zinc-300">
              Poznaš svojo regijo kot lastni žep? Pridruži se in pomagaj graditi platformo.
            </p>
            <div className="mt-4 text-sm font-black text-[#f4d7ad]">Izpolni prijavo →</div>
          </Link>
        </aside>
      </section>
    </main>
  );
}
