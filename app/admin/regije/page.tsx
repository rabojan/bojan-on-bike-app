import Link from "next/link";

import AdminShell from "@/components/AdminShell";

const regions = [
  {
    name: "Štajerska",
    slug: "stajerska",
    status: "Aktivna",
    headline: "Gozdovi, vinogradi in razgledi nad mesti.",
    description:
      "Regija za ture čez Pohorje, Slovenske gorice, vinske poti in krajše doživljajske izlete.",
    areas: ["Pohorje", "Slovenske gorice", "Dravsko polje"],
    trails: 2,
    providers: 3,
    experiences: 2,
    points: 3,
    ambassador: "kasneje",
  },
  {
    name: "Koroška",
    slug: "koroska",
    status: "V pripravi",
    headline: "Mirne doline, gozdne ceste in gorski značaj.",
    description:
      "Koroška bo namenjena turam z več narave, manj gneče in močnim lokalnim karakterjem.",
    areas: ["Dravska dolina", "Peca", "Uršlja gora"],
    trails: 0,
    providers: 0,
    experiences: 0,
    points: 0,
    ambassador: "ni določen",
  },
  {
    name: "Gorenjska",
    slug: "gorenjska",
    status: "Aktivna",
    headline: "Alpski razgledi, jezera in poti ob vodi.",
    description:
      "Regija za alpske pobege, družinske ture, razgledne poti in kolesarske dneve ob vodi.",
    areas: ["Bled", "Bohinj", "Kranjska Gora"],
    trails: 1,
    providers: 0,
    experiences: 0,
    points: 0,
    ambassador: "kasneje",
  },
  {
    name: "Primorska",
    slug: "primorska",
    status: "Aktivna",
    headline: "Sonce, burja, Kras in poti proti morju.",
    description:
      "Primorska povezuje razglede, kulinariko, kamnite vasi, doline rek in daljše gravel dneve.",
    areas: ["Soška dolina", "Kras", "Vipavska dolina"],
    trails: 1,
    providers: 0,
    experiences: 0,
    points: 0,
    ambassador: "kasneje",
  },
  {
    name: "Notranjska",
    slug: "notranjska",
    status: "V pripravi",
    headline: "Jezera, gozdovi in skrivnostni kraški svet.",
    description:
      "Notranjska bo odlična za mirnejše ture, naravne posebnosti in poti z močnim občutkom odkrivanja.",
    areas: ["Cerkniško jezero", "Rakov Škocjan", "Snežnik"],
    trails: 0,
    providers: 0,
    experiences: 0,
    points: 0,
    ambassador: "ni določen",
  },
  {
    name: "Dolenjska",
    slug: "dolenjska",
    status: "V pripravi",
    headline: "Mehki griči, reke, zidanice in počasnejši ritem.",
    description:
      "Dolenjska je prostor za vinske poti, družinske ture, rečne odseke in lokalne postanke.",
    areas: ["Krka", "Gorjanci", "Novo mesto"],
    trails: 0,
    providers: 0,
    experiences: 0,
    points: 0,
    ambassador: "ni določen",
  },
  {
    name: "Prekmurje",
    slug: "prekmurje",
    status: "V pripravi",
    headline: "Ravnine, termalni kraji, Mura in odprti horizonti.",
    description:
      "Prekmurje bo primerno za lahkotnejše ture, e-bike dneve, kulinariko in družinske izlete.",
    areas: ["Mura", "Goričko", "Moravske Toplice"],
    trails: 0,
    providers: 0,
    experiences: 0,
    points: 0,
    ambassador: "ni določen",
  },
];

const activeRegions = regions.filter((region) => region.status === "Aktivna").length;
const totalTrails = regions.reduce((sum, region) => sum + region.trails, 0);
const totalProviders = regions.reduce((sum, region) => sum + region.providers, 0);
const totalPoints = regions.reduce((sum, region) => sum + region.points, 0);

export default function AdminRegionsPage() {
  return (
    <AdminShell active="regije">
      <div className="space-y-8">
        <section className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-8 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Admin / Regije
            </p>
            <h1 className="text-4xl font-black tracking-tight text-white">
              Upravljanje regij
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400">
              Tukaj urejaš slovenske regije, območja, povezane ture,
              ponudnike, znamenitosti in kasneje ambasadorje regij.
            </p>
          </div>

          <Link
            href="/admin/regije/nova"
            className="mt-6 inline-flex rounded-full bg-[#c58b46] px-6 py-4 text-sm font-bold text-black md:mt-0"
          >
            + Dodaj regijo
          </Link>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-4xl font-black">{regions.length}</div>
            <div className="mt-2 text-sm text-zinc-400">vse regije</div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-4xl font-black">{activeRegions}</div>
            <div className="mt-2 text-sm text-zinc-400">aktivne regije</div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-4xl font-black">{totalTrails}</div>
            <div className="mt-2 text-sm text-zinc-400">povezane ture</div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-4xl font-black">{totalProviders}</div>
            <div className="mt-2 text-sm text-zinc-400">ponudniki</div>
          </div>
        </section>

        <section className="grid gap-5">
          {regions.map((region) => (
            <article
              key={region.slug}
              className="rounded-[32px] border border-white/10 bg-black/20 p-6"
            >
              <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-4 py-2 text-xs font-bold ${
                        region.status === "Aktivna"
                          ? "bg-emerald-500/10 text-emerald-300"
                          : "bg-yellow-500/10 text-yellow-300"
                      }`}
                    >
                      {region.status}
                    </span>

                    {region.areas.map((area) => (
                      <span
                        key={area}
                        className="rounded-full border border-white/10 bg-[#07110b] px-4 py-2 text-xs text-zinc-300"
                      >
                        {area}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-3xl font-black tracking-tight text-white">
                    {region.name}
                  </h2>

                  <p className="mt-3 text-lg font-bold text-zinc-200">
                    {region.headline}
                  </p>

                  <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-400">
                    {region.description}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-4">
                    <div className="rounded-2xl border border-white/10 bg-[#07110b] p-4">
                      <div className="text-2xl font-black">{region.trails}</div>
                      <div className="mt-1 text-xs text-zinc-500">ture</div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#07110b] p-4">
                      <div className="text-2xl font-black">{region.providers}</div>
                      <div className="mt-1 text-xs text-zinc-500">ponudniki</div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#07110b] p-4">
                      <div className="text-2xl font-black">{region.experiences}</div>
                      <div className="mt-1 text-xs text-zinc-500">doživetja</div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#07110b] p-4">
                      <div className="text-2xl font-black">{region.points}</div>
                      <div className="mt-1 text-xs text-zinc-500">znamenitosti</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-[#07110b] p-5">
                  <div className="mb-4 text-xs uppercase tracking-[0.25em] text-[#c58b46]">
                    Uredniški status
                  </div>

                  <div className="grid gap-3 text-sm">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                        Ambasador
                      </div>
                      <div className="mt-2 font-bold">{region.ambassador}</div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                        Mediji
                      </div>
                      <div className="mt-2 font-bold">
                        hero slika še ni dodana
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={`/admin/regije/${region.slug}`}
                      className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black"
                    >
                      Uredi
                    </Link>

                    <Link
                      href={`/ture?pokrajina=${region.slug}`}
                      className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300"
                    >
                      Predogled
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-8">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
            Naslednja faza
          </p>
          <h2 className="text-3xl font-black tracking-tight text-white">
            Regije bodo kasneje povezane z ambasadorji.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-400">
            Ko bo modul ambasadorjev pripravljen, bo lahko vsaka regija dobila
            lokalnega urednika, priporočene ture, izpostavljene ponudnike in
            svoj uredniški status.
          </p>
        </section>
      </div>
    </AdminShell>
  );
}
