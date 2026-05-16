import Link from "next/link";

import AdminShell from "@/components/AdminShell";

const ambassadors = [
  {
    name: "Bojan Ratej",
    slug: "bojan-ratej",
    status: "Aktiven",
    region: "Štajerska",
    place: "Maribor",
    email: "bojan@bojanonbike.si",
    phone: "+386 ...",
    image: "",
    bio: "Lokalni poznavalec Pohorja, Štajerske, gozdnih poti, razgledov in doživetij ob trasi.",
    content: {
      trails: 2,
      providers: 3,
      experiences: 2,
      points: 3,
    },
    permissions: ["Štajerska"],
  },
  {
    name: "Ambasador Gorenjske",
    slug: "ambasador-gorenjske",
    status: "V pripravi",
    region: "Gorenjska",
    place: "Bled",
    email: "—",
    phone: "—",
    image: "",
    bio: "Profil je pripravljen za lokalnega ambasadorja Gorenjske.",
    content: {
      trails: 1,
      providers: 0,
      experiences: 1,
      points: 0,
    },
    permissions: ["Gorenjska"],
  },
  {
    name: "Ambasador Primorske",
    slug: "ambasador-primorske",
    status: "V pripravi",
    region: "Primorska",
    place: "Kras / Vipavska dolina",
    email: "—",
    phone: "—",
    image: "",
    bio: "Profil je pripravljen za lokalnega ambasadorja Primorske.",
    content: {
      trails: 0,
      providers: 0,
      experiences: 0,
      points: 0,
    },
    permissions: ["Primorska"],
  },
];

const activeAmbassadors = ambassadors.filter(
  (ambassador) => ambassador.status === "Aktiven"
).length;

const totalTrails = ambassadors.reduce(
  (sum, ambassador) => sum + ambassador.content.trails,
  0
);

const totalProviders = ambassadors.reduce(
  (sum, ambassador) => sum + ambassador.content.providers,
  0
);

const totalExperiences = ambassadors.reduce(
  (sum, ambassador) => sum + ambassador.content.experiences,
  0
);

export default function AdminAmbassadorsPage() {
  return (
    <AdminShell active="ambasadorji">
      <div className="space-y-8">
        <section className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-8 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Admin / Ambasadorji
            </p>
            <h1 className="text-4xl font-black tracking-tight text-white">
              Upravljanje ambasadorjev
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400">
              Tukaj urejaš osebe, ki predstavljajo posamezne regije. Ambasador
              ima svoje kontaktne podatke, fotografijo, opis, regijo in kasneje
              tudi dostop samo do vsebin svoje regije.
            </p>
          </div>

          <Link
            href="/admin/ambasadorji/nov"
            className="mt-6 inline-flex rounded-full bg-[#c58b46] px-6 py-4 text-sm font-bold text-black md:mt-0"
          >
            + Dodaj ambasadorja
          </Link>
        </section>

        <section className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          <div className="rounded-[20px] border border-white/10 bg-black/20 p-4 sm:p-6">
            <div className="text-3xl font-black sm:text-4xl">
              {ambassadors.length}
            </div>
            <div className="mt-1 text-xs leading-tight text-zinc-400 sm:text-sm">
              vsi ambasadorji
            </div>
          </div>

          <div className="rounded-[20px] border border-white/10 bg-black/20 p-4 sm:p-6">
            <div className="text-3xl font-black sm:text-4xl">
              {activeAmbassadors}
            </div>
            <div className="mt-1 text-xs leading-tight text-zinc-400 sm:text-sm">
              aktivni
            </div>
          </div>

          <div className="rounded-[20px] border border-white/10 bg-black/20 p-4 sm:p-6">
            <div className="text-3xl font-black sm:text-4xl">
              {totalTrails}
            </div>
            <div className="mt-1 text-xs leading-tight text-zinc-400 sm:text-sm">
              oddane ture
            </div>
          </div>

          <div className="rounded-[20px] border border-white/10 bg-black/20 p-4 sm:p-6">
            <div className="text-3xl font-black sm:text-4xl">
              {totalProviders}
            </div>
            <div className="mt-1 text-xs leading-tight text-zinc-400 sm:text-sm">
              ponudniki
            </div>
          </div>

          <div className="rounded-[20px] border border-white/10 bg-black/20 p-4 sm:p-6">
            <div className="text-3xl font-black sm:text-4xl">
              {totalExperiences}
            </div>
            <div className="mt-1 text-xs leading-tight text-zinc-400 sm:text-sm">
              doživetja
            </div>
          </div>
        </section>

        <section className="grid gap-5">
          {ambassadors.map((ambassador) => (
            <article
              key={ambassador.slug}
              className="rounded-[32px] border border-white/10 bg-black/20 p-6"
            >
              <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-[28px] border border-white/10 bg-[#07110b] text-5xl">
                    {ambassador.image ? (
                      <img
                        src={ambassador.image}
                        alt={ambassador.name}
                        className="h-full w-full rounded-[28px] object-cover"
                      />
                    ) : (
                      "👤"
                    )}
                  </div>

                  <div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-4 py-2 text-xs font-bold ${
                          ambassador.status === "Aktiven"
                            ? "bg-emerald-500/10 text-emerald-300"
                            : "bg-yellow-500/10 text-yellow-300"
                        }`}
                      >
                        {ambassador.status}
                      </span>

                      <span className="rounded-full border border-white/10 bg-[#07110b] px-4 py-2 text-xs text-zinc-300">
                        {ambassador.region}
                      </span>

                      <span className="rounded-full border border-white/10 bg-[#07110b] px-4 py-2 text-xs text-zinc-300">
                        {ambassador.place}
                      </span>
                    </div>

                    <h2 className="text-3xl font-black tracking-tight text-white">
                      {ambassador.name}
                    </h2>

                    <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">
                      {ambassador.bio}
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-[#07110b] p-4">
                        <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                          Email
                        </div>
                        <div className="mt-2 font-bold">{ambassador.email}</div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-[#07110b] p-4">
                        <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                          Telefon
                        </div>
                        <div className="mt-2 font-bold">{ambassador.phone}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-[#07110b] p-5">
                  <div className="mb-4 text-xs uppercase tracking-[0.25em] text-[#c58b46]">
                    Vsebina in pravice
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="text-2xl font-black">
                        {ambassador.content.trails}
                      </div>
                      <div className="mt-1 text-xs text-zinc-500">ture</div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="text-2xl font-black">
                        {ambassador.content.providers}
                      </div>
                      <div className="mt-1 text-xs text-zinc-500">ponudniki</div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="text-2xl font-black">
                        {ambassador.content.experiences}
                      </div>
                      <div className="mt-1 text-xs text-zinc-500">doživetja</div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="text-2xl font-black">
                        {ambassador.content.points}
                      </div>
                      <div className="mt-1 text-xs text-zinc-500">znamenitosti</div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-[#c58b46]/20 bg-[#c58b46]/10 p-4 text-sm leading-7 text-zinc-300">
                    Dostop samo do regije:{" "}
                    <strong>{ambassador.permissions.join(", ")}</strong>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={`/admin/ambasadorji/${ambassador.slug}`}
                      className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black"
                    >
                      Uredi
                    </Link>

                    <Link
                      href={`/admin/regije/${ambassador.region
                        .toLowerCase()
                        .replace("š", "s")
                        .replace("č", "c")
                        .replace("ž", "z")}`}
                      className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300"
                    >
                      Regija
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-8">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
            Pomembno za kasneje
          </p>
          <h2 className="text-3xl font-black tracking-tight text-white">
            Ambasador ni podatek regije, ampak samostojen profil.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-400">
            Regija bo kasneje samo izbrala ambasadorja. Vsi kontaktni podatki,
            fotografija, opis in pravice pa se urejajo tukaj v modulu
            Ambasadorji.
          </p>
        </section>
      </div>
    </AdminShell>
  );
}
