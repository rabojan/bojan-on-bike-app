import Link from "next/link";

import AdminShell from "@/components/AdminShell";

const regionAmbassadors: Record<
  string,
  { name: string; role: string; image?: string }[]
> = {
  stajerska: [
    { name: "Bojan Ratej", role: "Ambasador regije" },
    { name: "Ana Potočnik", role: "TOP ambasador regije" },
  ],
  koroska: [
    { name: "Maja Kovač", role: "Ambasador regije" },
  ],
  gorenjska: [
    { name: "Tomaž Zupan", role: "TOP ambasador regije" },
  ],
  primorska: [
    { name: "Nina Furlan", role: "Ambasador regije" },
  ],
  notranjska: [
    { name: "Rok Mlakar", role: "Ambasador regije" },
  ],
  dolenjska: [
    { name: "Petra Novak", role: "Ambasador regije" },
  ],
  prekmurje: [
    { name: "Matej Horvat", role: "Ambasador regije" },
  ],
};

const regions = [
  {
    name: "Štajerska",
    slug: "stajerska",
    status: "Aktivna",
    headline: "Gozdovi, vinogradi in razgledi nad mesti.",
    description:
      "Regija za ture čez Pohorje, Slovenske gorice, vinske poti in krajše doživljajske izlete.",
    story:
      "Štajerska združuje pohorske gozdove, vinske ceste, razglede nad Mariborom in mehkejše kolesarske dneve med griči.",
    areas: ["Pohorje", "Slovenske gorice", "Dravsko polje"],
  },
  {
    name: "Koroška",
    slug: "koroska",
    status: "Čaka na objavo",
    headline: "Mirne doline, gozdne ceste in gorski značaj.",
    description:
      "Koroška bo namenjena turam z več narave, manj gneče in močnim lokalnim karakterjem.",
    story:
      "Koroška je prostor mirnih dolin, gozdnih poti, razgledov in kolesarskih dni stran od večjih množic.",
    areas: ["Dravska dolina", "Peca", "Uršlja gora"],
  },
  {
    name: "Gorenjska",
    slug: "gorenjska",
    status: "Aktivna",
    headline: "Alpski razgledi, jezera in poti ob vodi.",
    description:
      "Regija za alpske pobege, družinske ture, razgledne poti in kolesarske dneve ob vodi.",
    story:
      "Gorenjska povezuje alpsko pokrajino, jezera, razgledne ceste in ture, ki so primerne za nepozaben kolesarski dan.",
    areas: ["Bled", "Bohinj", "Kranjska Gora"],
  },
  {
    name: "Primorska",
    slug: "primorska",
    status: "Aktivna",
    headline: "Sonce, burja, Kras in poti proti morju.",
    description:
      "Primorska povezuje razglede, kulinariko, kamnite vasi, doline rek in daljše gravel dneve.",
    story:
      "Primorska je regija sonca, burje, kamnitih vasi, rek, razgledov in poti proti morju.",
    areas: ["Soška dolina", "Kras", "Vipavska dolina"],
  },
  {
    name: "Notranjska",
    slug: "notranjska",
    status: "Čaka na objavo",
    headline: "Jezera, gozdovi in skrivnostni kraški svet.",
    description:
      "Notranjska bo odlična za mirnejše ture, naravne posebnosti in poti z močnim občutkom odkrivanja.",
    story:
      "Notranjska je prostor jezer, gozdov, kraških posebnosti in mirnejšega kolesarskega raziskovanja.",
    areas: ["Cerkniško jezero", "Rakov Škocjan", "Snežnik"],
  },
  {
    name: "Dolenjska",
    slug: "dolenjska",
    status: "Čaka na objavo",
    headline: "Mehki griči, reke, zidanice in počasnejši ritem.",
    description:
      "Dolenjska je prostor za vinske poti, družinske ture, rečne odseke in lokalne postanke.",
    story:
      "Dolenjska povezuje mehkejše griče, reke, zidanice, lokalno kulinariko in počasnejši ritem dneva.",
    areas: ["Krka", "Gorjanci", "Novo mesto"],
  },
  {
    name: "Prekmurje",
    slug: "prekmurje",
    status: "Čaka na objavo",
    headline: "Ravnine, termalni kraji, Mura in odprti horizonti.",
    description:
      "Prekmurje bo primerno za lahkotnejše ture, e-bike dneve, kulinariko in družinske izlete.",
    story:
      "Prekmurje je regija odprtih horizontov, Mure, ravnin, termalnih krajev in lahkotnejših kolesarskih dni.",
    areas: ["Mura", "Goričko", "Moravske Toplice"],
  },
];

export function generateStaticParams() {
  return regions.map((region) => ({ slug: region.slug }));
}

export default async function EditRegionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const region = regions.find((item) => item.slug === slug) ?? regions[0];

  return (
    <AdminShell active="regije">
      <div className="space-y-8">
        <section className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-8 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Admin / Regije / Uredi regijo
            </p>
            <h1 className="text-4xl font-black tracking-tight text-white">
              Uredi regijo: {region.name}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400">
              Tukaj lahko spremeniš podatke regije, opis, območja in hero sliko.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
            <Link
              href="/admin/regije"
              className="rounded-full border border-white/10 px-6 py-4 text-sm font-bold text-zinc-200"
            >
              ← Nazaj na regije
            </Link>

            <button className="rounded-full bg-[#c58b46] px-6 py-4 text-sm font-bold text-black">
              Shrani spremembe
            </button>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <div className="space-y-6">
            <section className="rounded-[28px] border border-white/10 bg-black/20 p-6">
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Osnovni podatki
              </p>

              <div className="grid gap-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-zinc-300">
                    Ime regije *
                  </span>
                  <input
                    defaultValue={region.name}
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                  />
                </label>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-zinc-300">
                      URL slug *
                    </span>
                    <input
                      defaultValue={region.slug}
                      className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-zinc-300">
                      Status regije *
                    </span>
                    <select
                      defaultValue={region.status}
                      className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                    >
                      <option>Čaka na objavo</option>
                      <option>Aktivna</option>
                      <option>Arhivirana</option>
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-zinc-300">
                    Glavni stavek / pozicioniranje *
                  </span>
                  <input
                    defaultValue={region.headline}
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-zinc-300">
                    Kratek opis regije *
                  </span>
                  <textarea
                    defaultValue={region.description}
                    className="min-h-32 w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-zinc-300">
                    Daljša zgodba regije
                  </span>
                  <textarea
                    defaultValue={region.story}
                    className="min-h-48 w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-black/20 p-6">
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Območja v regiji
              </p>

              <div className="grid gap-4 md:grid-cols-3">
                {region.areas.map((area) => (
                  <input
                    key={area}
                    defaultValue={area}
                    className="rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                  />
                ))}
              </div>

              <button className="mt-4 w-full rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300">
                + Dodaj območje
              </button>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-black/20 p-6">
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Hero slika regije
              </p>

              <div className="rounded-[24px] border border-dashed border-white/15 bg-[#07110b] p-8 text-center">
                <div className="text-4xl">🖼️</div>
                <h2 className="mt-4 text-2xl font-black text-white">
                  Zamenjaj hero sliko regije
                </h2>

                <label className="mt-6 inline-flex cursor-pointer rounded-full bg-[#c58b46] px-8 py-4 text-sm font-bold text-black">
                  Izberi sliko
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                  />
                </label>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Povezani ambasadorji
              </p>

              <div className="rounded-[24px] border border-white/10 bg-[#07110b] p-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  {(regionAmbassadors[region.slug] ?? []).length > 0 ? (
                    (regionAmbassadors[region.slug] ?? []).map((ambassador) => (
                      <div
                        key={ambassador.name}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#07110b] text-2xl">
                          {ambassador.image ? (
                            <img
                              src={ambassador.image}
                              alt={ambassador.name}
                              className="h-full w-full rounded-2xl object-cover"
                            />
                          ) : (
                            "👤"
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="truncate text-sm font-black text-white">
                            {ambassador.name}
                          </div>
                          <div className="mt-1 truncate text-xs text-zinc-500">
                            {ambassador.role}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:col-span-2">
                      <div className="text-sm font-black text-white">
                        Ni povezanih ambasadorjev
                      </div>
                      <div className="mt-1 text-xs leading-5 text-zinc-500">
                        Ambasadorje dodaš in povežeš v modulu Ambasadorji.
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 rounded-2xl border border-[#c58b46]/20 bg-[#c58b46]/10 p-4 text-sm leading-7 text-zinc-300">
                  Regije ne urejajo ambasadorjev. Tukaj se samo prikažejo osebe,
                  ki so v modulu Ambasadorji povezane s to regijo.
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Samodejno povezane vsebine
              </p>

              <div className="rounded-[24px] border border-white/10 bg-[#07110b] p-6">
                <h2 className="text-2xl font-black text-white">
                  Vsebine se dodajo samodejno
                </h2>

                <p className="mt-4 text-sm leading-7 text-zinc-400">
                  Ture, ponudniki, doživetja in znamenitosti se ne izbirajo
                  ročno. Prikažejo se takrat, ko imajo pri sebi izbrano to
                  regijo.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
