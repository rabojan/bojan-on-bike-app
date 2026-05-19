import Link from "next/link";

import AdminShell from "@/components/AdminShell";

const reviewItems = [
  {
    type: "Predlog ture",
    title: "Pohorski veliki krog do Areha",
    author: "Bojan Ratej",
    region: "Štajerska",
    status: "Čaka na objavo",
    description:
      "Nova tura z GPX traso, poudarki poti, predlaganimi ponudniki in utrinki.",
    href: "/admin/v-pregled/ture/pohorski-veliki-krog-do-areha",
  },
  {
    type: "Novi ponudnik",
    title: "Bar Miško",
    author: "Bojan Ratej",
    region: "Štajerska",
    status: "Novo",
    description:
      "Predlagan postanek ob trasi. Potrebno je preveriti podatke, tip ponudnika in povezavo s turo.",
    href: "/admin/ponudniki/nov",
  },
  {
    type: "Nova znamenitost",
    title: "Razgled nad dolino",
    author: "Maja Kovač",
    region: "Gorenjska",
    status: "Novo",
    description:
      "Predlagana razgledna točka ob trasi. Potrebno je preveriti lokacijo, opis in fotografijo.",
    href: "/admin/znamenitosti/nova",
  },
  {
    type: "Predlagan popravek",
    title: "Gozdni flow nad Mariborom",
    author: "Bojan Ratej",
    region: "Štajerska",
    status: "Popravek",
    description:
      "Ambasador predlaga dopolnitev opisa in zamenjavo enega utrinka poti.",
    href: "/admin/ture/gozdni-flow-nad-mariborom",
  },
];

const stats = [
  { value: "6", label: "v pregledu" },
  { value: "3", label: "predlogi tur" },
  { value: "2", label: "nove vsebine" },
  { value: "1", label: "popravek" },
];

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "Čaka na objavo"
      ? "border-blue-300/20 bg-blue-300/10 text-blue-200"
      : status === "Novo"
        ? "border-[#c58b46]/20 bg-[#c58b46]/10 text-[#c58b46]"
        : "border-white/10 bg-white/5 text-zinc-300";

  return (
    <span className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs font-bold ${tone}`}>
      {status}
    </span>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-h-[140px] items-center justify-center rounded-[26px] border border-white/10 bg-[#07110b] p-5 text-center">
      <div>
        <div className="text-5xl font-black leading-none text-white">{value}</div>
        <div className="mt-3 text-sm font-bold leading-none text-zinc-500">
          {label}
        </div>
      </div>
    </div>
  );
}

export default function AdminReviewPage() {
  return (
    <AdminShell active="v-pregled">
      <div className="space-y-8">
        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Uredniški pregled
              </div>

              <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
                Kaj čaka na tvojo odločitev?
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400">
                Tukaj se zbirajo predlogi tur, novi ponudniki, znamenitosti in
                popravki, ki pridejo od ambasadorjev. Namen pregleda ni
                spreminjati njihove ture, ampak preveriti, da ima objava vse
                potrebne podatke, delujoč GPX in jasno predstavitev.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300"
              >
                ← Nazaj na pregled
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </section>

        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Vnosni predali
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-white">
                Predlogi, ki čakajo na pregled.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
                Vsak vnos lahko odpreš, preveriš in potem objaviš, vrneš v
                dopolnitev ali arhiviraš.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["Vse", "Ture", "Ponudniki", "Znamenitosti", "Popravki"].map(
                (filter) => (
                  <button
                    key={filter}
                    className={`rounded-full border px-4 py-2 text-xs font-bold ${
                      filter === "Vse"
                        ? "border-[#c58b46]/20 bg-[#c58b46] text-black"
                        : "border-white/10 text-zinc-400"
                    }`}
                  >
                    {filter}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="mt-7 grid gap-4">
            {reviewItems.map((item) => (
              <article
                key={`${item.type}-${item.title}`}
                className="grid gap-5 rounded-[28px] border border-white/10 bg-black/20 p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
              >
                <div className="min-w-0">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <div className="rounded-full border border-[#c58b46]/20 bg-[#c58b46]/10 px-3 py-2 text-xs font-bold text-[#c58b46]">
                      {item.type}
                    </div>

                    <StatusBadge status={item.status} />
                  </div>

                  <h3 className="text-xl font-black leading-tight text-white">
                    {item.title}
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-2 text-sm text-zinc-500">
                    <span>{item.author}</span>
                    <span>·</span>
                    <span>{item.region}</span>
                  </div>

                  <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-500">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 md:justify-end">
                  <Link
                    href={item.href}
                    className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300"
                  >
                    Odpri
                  </Link>

                  <button className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-black text-black">
                    Objavi
                  </button>

                  <button className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-400">
                    Vrni
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-[#c58b46]/20 bg-[#c58b46]/10 p-6 md:p-7">
          <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
            Uredniško pravilo
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-tight text-white">
            Tura ostane ambasadorjeva.
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-300">
            Pregled pomeni preverjanje kakovosti objave: GPX, osnovni podatki,
            povezane vsebine, jasnost opisa in vizualna predstavitev. Ne gre za
            to, da se ambasadorju vzame avtorstvo ture, ampak da je končna objava
            uporabna, lepa in zanesljiva za druge kolesarje.
          </p>
        </section>
      </div>
    </AdminShell>
  );
}
