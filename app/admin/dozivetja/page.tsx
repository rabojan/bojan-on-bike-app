import Link from "next/link";

import AdminShell from "@/components/AdminShell";

const experiences = [
  {
    title: "Vinski kolesarski dan",
    slug: "vinski-kolesarski-dan",
    type: "Vinsko doživetje",
    region: "Štajerska",
    status: "Objavljeno",
    trails: 1,
    providers: 1,
    attractions: 1,
    updated: "Danes",
    description:
      "Lahkotna vožnja med griči, postanek pri vinski kleti in občutek dneva, ki se konča za mizo.",
  },
  {
    title: "Družinski e-bike izlet",
    slug: "druzinski-e-bike-izlet",
    type: "Družinski izlet",
    region: "Pohorje",
    status: "Osnutek",
    trails: 1,
    providers: 1,
    attractions: 2,
    updated: "V pripravi",
    description:
      "Krajša razdalja, varnejši odseki in dovolj postankov, da lahko v dnevu uživa cela družina.",
  },
  {
    title: "Pohorski flow in kosilo",
    slug: "pohorski-flow-in-kosilo",
    type: "Kulinarična tura",
    region: "Štajerska",
    status: "Osnutek",
    trails: 1,
    providers: 2,
    attractions: 1,
    updated: "V pripravi",
    description:
      "Gozdni odseki, občutek svobode in postanek pri lokalnem ponudniku ob poti.",
  },
];

export default function AdminExperiencesPage() {
  return (
    <AdminShell active="dozivetja">
      <div className="space-y-8">
        <section className="flex flex-col gap-5 rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Admin / Doživetja
            </div>

            <h1 className="mt-4 text-4xl font-black">Doživetja</h1>

            <p className="mt-5 max-w-3xl leading-8 text-zinc-400">
              Tukaj urejaš ideje za kolesarski dan: vinska doživetja,
              družinske izlete, kulinarične ture, razgledne poti, vikend pobege
              in zgodbe krajev.
            </p>
          </div>

          <Link
            href="/admin/dozivetja/novo"
            className="rounded-full bg-[#c58b46] px-6 py-4 text-sm font-bold text-black"
          >
            + Dodaj doživetje
          </Link>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-4xl font-black">3</div>
            <div className="mt-2 text-sm text-zinc-400">vsa doživetja</div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-4xl font-black">1</div>
            <div className="mt-2 text-sm text-zinc-400">objavljeno</div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-4xl font-black">2</div>
            <div className="mt-2 text-sm text-zinc-400">osnutka</div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-4xl font-black">4</div>
            <div className="mt-2 text-sm text-zinc-400">tipi doživetij</div>
          </div>
        </section>

        <section className="grid gap-5">
          {experiences.map((experience) => (
            <article
              key={experience.slug}
              className="rounded-[32px] border border-white/10 bg-black/20 p-6"
            >
              <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-4 py-2 text-xs font-bold ${
                        experience.status === "Objavljeno"
                          ? "bg-emerald-500/10 text-emerald-300"
                          : "bg-yellow-500/10 text-yellow-300"
                      }`}
                    >
                      {experience.status}
                    </span>

                    <span className="rounded-full border border-white/10 bg-[#07110b] px-4 py-2 text-xs text-zinc-300">
                      {experience.type}
                    </span>

                    <span className="rounded-full border border-white/10 bg-[#07110b] px-4 py-2 text-xs text-zinc-300">
                      {experience.region}
                    </span>
                  </div>

                  <h2 className="text-3xl font-black">{experience.title}</h2>

                  <p className="mt-4 max-w-3xl leading-8 text-zinc-400">
                    {experience.description}
                  </p>

                  <div className="mt-5 text-sm text-zinc-500">
                    Zadnja sprememba: {experience.updated}
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-[#07110b] p-5">
                  <div className="mb-4 text-xs uppercase tracking-[0.25em] text-[#c58b46]">
                    Povezave
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="text-2xl font-black">
                        {experience.trails}
                      </div>
                      <div className="mt-1 text-sm text-zinc-500">tura</div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="text-2xl font-black">
                        {experience.providers}
                      </div>
                      <div className="mt-1 text-sm text-zinc-500">
                        ponudnik
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="text-2xl font-black">
                        {experience.attractions}
                      </div>
                      <div className="mt-1 text-sm text-zinc-500">
                        znamenitost
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={`/admin/dozivetja/${experience.slug}`}
                      className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black"
                    >
                      Uredi
                    </Link>

                    <Link
                      href="/dozivetja"
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
      </div>
    </AdminShell>
  );
}
