import Link from "next/link";

import AdminShell from "@/components/AdminShell";

type Region = {
  name: string;
  slug: string;
  status: "Aktivna" | "Čaka na objavo";
  headline: string;
  description: string;
  areas: string[];
  trails: string[];
  providers: string[];
  experiences: string[];
  points: string[];
};

type RegionAmbassador = {
  name: string;
  role: "Ambasador regije" | "TOP ambasador regije";
  image?: string;
};

const regions: Region[] = [
  {
    name: "Štajerska",
    slug: "stajerska",
    status: "Aktivna",
    headline: "Gozdovi, vinogradi in razgledi nad mesti.",
    description:
      "Regija za ture čez Pohorje, Slovenske gorice, vinske poti in krajše doživljajske izlete.",
    areas: ["Pohorje", "Slovenske gorice", "Dravsko polje"],
    trails: ["Gozdni flow nad Mariborom", "Med vinogradi in griči"],
    providers: [
      "Rudijev dom na Pohorju",
      "Gorska hiša Pohorje",
      "Vinska klet med griči",
    ],
    experiences: ["Vinski kolesarski dan", "Pohorski flow in kosilo"],
    points: [
      "Razgled nad Mariborom",
      "Pohorski gozdni odsek",
      "Stara planinska pot",
    ],
  },
  {
    name: "Koroška",
    slug: "koroska",
    status: "Čaka na objavo",
    headline: "Mirne doline, gozdne ceste in gorski značaj.",
    description:
      "Koroška bo namenjena turam z več narave, manj gneče in močnim lokalnim karakterjem.",
    areas: ["Dravska dolina", "Peca", "Uršlja gora"],
    trails: [],
    providers: [],
    experiences: [],
    points: [],
  },
  {
    name: "Gorenjska",
    slug: "gorenjska",
    status: "Aktivna",
    headline: "Alpski razgledi, jezera in poti ob vodi.",
    description:
      "Regija za alpske pobege, družinske ture, razgledne poti in kolesarske dneve ob vodi.",
    areas: ["Bled", "Bohinj", "Kranjska Gora"],
    trails: ["Alpski pobeg ob vodi"],
    providers: [],
    experiences: ["Družinski e-bike izlet"],
    points: [],
  },
  {
    name: "Primorska",
    slug: "primorska",
    status: "Aktivna",
    headline: "Sonce, burja, Kras in poti proti morju.",
    description:
      "Primorska povezuje razglede, kulinariko, kamnite vasi, doline rek in daljše gravel dneve.",
    areas: ["Soška dolina", "Kras", "Vipavska dolina"],
    trails: [],
    providers: [],
    experiences: [],
    points: [],
  },
  {
    name: "Notranjska",
    slug: "notranjska",
    status: "Čaka na objavo",
    headline: "Jezera, gozdovi in skrivnostni kraški svet.",
    description:
      "Notranjska bo odlična za mirnejše ture, naravne posebnosti in poti z močnim občutkom odkrivanja.",
    areas: ["Cerkniško jezero", "Rakov Škocjan", "Snežnik"],
    trails: [],
    providers: [],
    experiences: [],
    points: [],
  },
  {
    name: "Dolenjska",
    slug: "dolenjska",
    status: "Čaka na objavo",
    headline: "Mehki griči, reke, zidanice in počasnejši ritem.",
    description:
      "Dolenjska je prostor za vinske poti, družinske ture, rečne odseke in lokalne postanke.",
    areas: ["Krka", "Gorjanci", "Novo mesto"],
    trails: [],
    providers: [],
    experiences: [],
    points: [],
  },
  {
    name: "Prekmurje",
    slug: "prekmurje",
    status: "Čaka na objavo",
    headline: "Ravnine, termalni kraji, Mura in odprti horizonti.",
    description:
      "Prekmurje bo primerno za lahkotnejše ture, e-bike dneve, kulinariko in družinske izlete.",
    areas: ["Mura", "Goričko", "Moravske Toplice"],
    trails: [],
    providers: [],
    experiences: [],
    points: [],
  },
];

const regionAmbassadors: Record<string, RegionAmbassador[]> = {
  stajerska: [{ name: "Bojan Ratej", role: "Ambasador regije" }],
  koroska: [{ name: "Maja Kovač", role: "Ambasador regije" }],
  gorenjska: [{ name: "Tomaž Zupan", role: "TOP ambasador regije" }],
  primorska: [{ name: "Nina Furlan", role: "Ambasador regije" }],
  notranjska: [{ name: "Rok Mlakar", role: "Ambasador regije" }],
  dolenjska: [{ name: "Petra Novak", role: "Ambasador regije" }],
  prekmurje: [{ name: "Matej Horvat", role: "Ambasador regije" }],
};

const totalTrails = regions.reduce((sum, region) => sum + region.trails.length, 0);
const totalProviders = regions.reduce((sum, region) => sum + region.providers.length, 0);
const totalExperiences = regions.reduce(
  (sum, region) => sum + region.experiences.length,
  0
);
const totalPoints = regions.reduce((sum, region) => sum + region.points.length, 0);

function ContentList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#07110b] p-3 sm:p-4">
      <div className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
        {title}
      </div>

      {items.length > 0 ? (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm font-semibold text-zinc-200"
            >
              {item}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-zinc-500">še ni povezano</div>
      )}
    </div>
  );
}

function AmbassadorList({ ambassadors }: { ambassadors: RegionAmbassador[] }) {
  if (ambassadors.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-4 text-sm text-zinc-500">
        Ambasadorji še niso povezani. Dodaš jih v modulu Ambasadorji.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {ambassadors.map((ambassador) => (
        <div
          key={ambassador.name}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#07110b] text-xl">
            {ambassador.image ? (
              <img
                src={ambassador.image}
                alt={ambassador.name}
                className="h-full w-full object-cover"
              />
            ) : (
              "👤"
            )}
          </div>

          <div className="min-w-0">
            <div className="truncate text-sm font-black text-white">
              {ambassador.name}
            </div>
            <div className="mt-1 text-xs font-semibold text-zinc-400">
              {ambassador.role === "TOP ambasador regije"
                ? "⭐ TOP ambasador regije"
                : "Ambasador regije"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

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
              Tukaj urejaš slovenske regije, območja in vsebine, ki so z njimi
              povezane: ture, ponudnike, znamenitosti, doživetja in ambasadorje.
            </p>
          </div>

          <Link
            href="/admin/regije/nova"
            className="mt-6 inline-flex rounded-full bg-[#c58b46] px-6 py-4 text-sm font-bold text-black md:mt-0"
          >
            + Dodaj regijo
          </Link>
        </section>

        <section className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          <div className="rounded-[20px] border border-white/10 bg-black/20 p-4">
            <div className="text-3xl font-black sm:text-4xl">
              {regions.length}
            </div>
            <div className="mt-1 text-[11px] leading-tight text-zinc-400 sm:text-sm">
              vse regije
            </div>
          </div>

          <div className="rounded-[20px] border border-white/10 bg-black/20 p-4">
            <div className="text-3xl font-black sm:text-4xl">{totalTrails}</div>
            <div className="mt-1 text-[11px] leading-tight text-zinc-400 sm:text-sm">
              vse ture
            </div>
          </div>

          <div className="rounded-[20px] border border-white/10 bg-black/20 p-4">
            <div className="text-3xl font-black sm:text-4xl">
              {totalProviders}
            </div>
            <div className="mt-1 text-[11px] leading-tight text-zinc-400 sm:text-sm">
              vsi ponudniki
            </div>
          </div>

          <div className="rounded-[20px] border border-white/10 bg-black/20 p-4">
            <div className="text-3xl font-black sm:text-4xl">
              {totalExperiences}
            </div>
            <div className="mt-1 text-[11px] leading-tight text-zinc-400 sm:text-sm">
              vsa doživetja
            </div>
          </div>

          <div className="rounded-[20px] border border-white/10 bg-black/20 p-4">
            <div className="text-3xl font-black sm:text-4xl">{totalPoints}</div>
            <div className="mt-1 text-[11px] leading-tight text-zinc-400 sm:text-sm">
              vse znamenitosti
            </div>
          </div>
        </section>

        <section className="grid gap-5">
          {regions.map((region) => {
            const ambassadors = regionAmbassadors[region.slug] ?? [];

            return (
              <article
                key={region.slug}
                className="rounded-[32px] border border-white/10 bg-black/20 p-6"
              >
                <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
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

                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <div className="rounded-2xl border border-white/10 bg-[#07110b] p-3 sm:p-4">
                        <div className="text-xl font-black sm:text-2xl">
                          {region.trails.length}
                        </div>
                        <div className="mt-1 text-xs text-zinc-500">ture</div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-[#07110b] p-3 sm:p-4">
                        <div className="text-xl font-black sm:text-2xl">
                          {region.providers.length}
                        </div>
                        <div className="mt-1 text-xs text-zinc-500">
                          ponudniki
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-[#07110b] p-3 sm:p-4">
                        <div className="text-xl font-black sm:text-2xl">
                          {region.experiences.length}
                        </div>
                        <div className="mt-1 text-xs text-zinc-500">
                          doživetja
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-[#07110b] p-3 sm:p-4">
                        <div className="text-xl font-black sm:text-2xl">
                          {region.points.length}
                        </div>
                        <div className="mt-1 text-xs text-zinc-500">
                          znamenitosti
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="rounded-[24px] border border-white/10 bg-[#07110b] p-5">
                      <div className="mb-4 text-xs uppercase tracking-[0.25em] text-[#c58b46]">
                        Ambasadorji regije
                      </div>

                      <AmbassadorList ambassadors={ambassadors} />

                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                          href={`/admin/regije/${region.slug}`}
                          className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black"
                        >
                          Uredi regijo
                        </Link>

                        <Link
                          href="/admin/ambasadorji"
                          className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300"
                        >
                          Ambasadorji
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
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <ContentList title="Ture v regiji" items={region.trails} />
                  <ContentList title="Ponudniki" items={region.providers} />
                  <ContentList title="Doživetja" items={region.experiences} />
                  <ContentList title="Znamenitosti" items={region.points} />
                </div>
              </article>
            );
          })}
        </section>

        <section className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-8">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
            Povezava z ambasadorji
          </p>
          <h2 className="text-3xl font-black tracking-tight text-white">
            Regije prikazujejo povezane ambasadorje.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-400">
            Regija ostaja prostor za urejanje območja, opisa in povezanih
            vsebin. Podatki ambasadorjev se urejajo v modulu Ambasadorji, tukaj
            pa se prikaže samo kompakten seznam oseb, ki so povezane s to
            regijo.
          </p>
        </section>
      </div>
    </AdminShell>
  );
}
