import Link from "next/link";

import AdminShell from "@/components/AdminShell";

const trails = [
  {
    title: "Pohorski veliki krog do Areha",
    region: "Štajerska",
    status: "Čaka na objavo",
    meta: "92 km · 1450 vm",
    note: "Predlog je poslan in čaka, da ga pripravimo za javno objavo.",
    action: "Odpri predlog",
  },
  {
    title: "Gozdni flow nad Mariborom",
    region: "Štajerska",
    status: "Objavljeno",
    meta: "32 km · 890 vm",
    note: "Tura je objavljena in povezana s tvojim ambasadorskim profilom.",
    action: "Poglej turo",
  },
  {
    title: "Makadamski krog ob Dravi",
    region: "Štajerska",
    status: "Vrnjeno v dopolnitev",
    meta: "54 km · 620 vm",
    note: "Pred objavo je treba dopolniti nekaj podatkov ali utrinkov.",
    action: "Dopolni predlog",
  },
  {
    title: "Razgledni krog nad mestom",
    region: "Štajerska",
    status: "Osnutek",
    meta: "41 km · 720 vm",
    note: "Predlog še ni poslan. Lahko ga dokončaš in pošlješ v objavo.",
    action: "Nadaljuj urejanje",
  },
];

const filters = ["Vse", "Osnutek", "Čaka na objavo", "Objavljeno", "Vrnjeno v dopolnitev"];

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "Objavljeno"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
      : status === "Vrnjeno v dopolnitev"
        ? "border-[#c58b46]/20 bg-[#c58b46]/10 text-[#c58b46]"
        : status === "Osnutek"
          ? "border-white/10 bg-white/5 text-zinc-400"
          : "border-blue-300/20 bg-blue-300/10 text-blue-200";

  return (
    <span className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs font-bold ${tone}`}>
      {status}
    </span>
  );
}

export default function AmbassadorTrailsPage() {
  return (
    <AdminShell active="ambasadorji">
      <div className="space-y-8">
        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Ambasadorski kotiček / Moje ture
              </div>

              <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
                Tvoje ture in predlogi
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400">
                Tukaj vidiš vse svoje predloge: osnutke, ture, ki čakajo na objavo,
                objavljene ture in tiste, ki jih je treba še dopolniti.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/ambasador/koticek"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300"
              >
                ← Nazaj v kotiček
              </Link>

              <Link
                href="/admin/predlog-ture/nova"
                className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black"
              >
                + Predlagaj novo turo
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <div className="flex min-h-[150px] items-center justify-center rounded-[26px] border border-white/10 bg-[#07110b] p-5 text-center">
            <div>
              <div className="text-5xl font-black leading-none text-white">7</div>
              <div className="mt-3 text-sm font-bold leading-none text-zinc-500">
                vseh oddanih
              </div>
            </div>
          </div>

          <div className="flex min-h-[150px] items-center justify-center rounded-[26px] border border-white/10 bg-[#07110b] p-5 text-center">
            <div>
              <div className="text-5xl font-black leading-none text-white">4</div>
              <div className="mt-3 text-sm font-bold leading-none text-zinc-500">
                objavljenih
              </div>
            </div>
          </div>

          <div className="flex min-h-[150px] items-center justify-center rounded-[26px] border border-white/10 bg-[#07110b] p-5 text-center">
            <div>
              <div className="text-5xl font-black leading-none text-white">3</div>
              <div className="mt-3 text-sm font-bold leading-none text-zinc-500">
                čakajo
              </div>
            </div>
          </div>

          <div className="flex min-h-[150px] items-center justify-center rounded-[26px] border border-[#c58b46]/20 bg-[#c58b46]/10 p-5 text-center">
            <div>
              <div className="text-5xl font-black leading-none text-white">16</div>
              <div className="mt-3 text-sm font-bold leading-none text-zinc-300">
                do TOP oznake
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Pregled predlogov
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-white">
                Status vsake tvoje ture.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
                Objavljene ture so že javno vidne. Predloge, ki čakajo ali so
                vrnjeni v dopolnitev, lahko spremljaš tukaj.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
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
              ))}
            </div>
          </div>

          <div className="mt-7 grid gap-4">
            {trails.map((trail) => (
              <article
                key={trail.title}
                className="grid gap-5 rounded-[28px] border border-white/10 bg-black/20 p-5 md:grid-cols-[1fr_auto] md:items-center"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-black leading-tight text-white">
                      {trail.title}
                    </h3>

                    <StatusBadge status={trail.status} />
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2 text-sm text-zinc-500">
                    <span>{trail.region}</span>
                    <span>·</span>
                    <span>{trail.meta}</span>
                  </div>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-500">
                    {trail.note}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 md:justify-end">
                  <button className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300">
                    {trail.action}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
