import Link from "next/link";

import AdminShell from "@/components/AdminShell";

const proposals = [
  {
    title: "Pohorski veliki krog do Areha",
    region: "Štajerska",
    status: "Čaka na objavo",
    meta: "92 km · 1450 vm",
  },
  {
    title: "Gozdni flow nad Mariborom",
    region: "Štajerska",
    status: "Objavljeno",
    meta: "32 km · 890 vm",
  },
  {
    title: "Makadamski krog ob Dravi",
    region: "Štajerska",
    status: "Vrnjeno v dopolnitev",
    meta: "54 km · 620 vm",
  },
];

function StatCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="flex min-h-[132px] items-center justify-center rounded-[22px] border border-white/10 bg-black/20 p-4 text-center">
      <div className="flex flex-col items-center justify-center">
        <div className="text-5xl font-black leading-none text-white">{value}</div>
        <div className="mt-3 text-sm font-bold leading-none text-zinc-500">
          {label}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "Objavljeno"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
      : status === "Vrnjeno v dopolnitev"
        ? "border-[#c58b46]/20 bg-[#c58b46]/10 text-[#c58b46]"
        : "border-white/10 bg-white/5 text-zinc-300";

  return (
    <span className={`whitespace-nowrap rounded-full border px-3 py-2 text-[11px] font-bold ${tone}`}>
      {status}
    </span>
  );
}

export default function AmbassadorDashboardPage() {
  return (
    <AdminShell active="ambasadorji">
      <div className="space-y-8">
        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Ambasadorski kotiček
              </div>

              <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
                Dobrodošel nazaj, Bojan
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400">
                Tukaj spremljaš svoje predloge, objavljene ture in napredek do
                TOP ambasadorja regije. Vsaka objavljena tura ostane povezana s
                teboj.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/predlog-ture/nova"
                className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black"
              >
                + Predlagaj novo turo
              </Link>

              <Link
                href="/admin/ambasador/profil"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300"
              >
                Uredi profil
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr_0.95fr]">
          <div className="flex min-h-[300px] flex-col justify-between rounded-[32px] border border-white/10 bg-[#07110b] p-6">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-[#c58b46]">
                Tvoj profil
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[24px] border border-white/10 bg-black/30 text-4xl">
                  🚴
                </div>

                <div className="min-w-0">
                  <div className="truncate text-3xl font-black text-white">
                    Bojan Ratej
                  </div>
                  <div className="mt-2 text-sm font-semibold text-zinc-400">
                    Ambasador Štajerske
                  </div>
                </div>
              </div>

              <p className="mt-6 text-sm leading-7 text-zinc-500">
                Tvoj lokalni pogled pomaga drugim izbrati lep kolesarski dan,
                ne samo trase.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-[#c58b46]/20 bg-[#c58b46]/10 p-4 text-sm leading-7 text-zinc-300">
              TOP oznaka se odklene pri 20 objavljenih oziroma potrjenih turah.
            </div>
          </div>

          <div className="flex min-h-[300px] flex-col justify-between rounded-[32px] border border-white/10 bg-[#07110b] p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-[#c58b46]">
              Moje ture
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <StatCard value="7" label="oddanih" />
              <StatCard value="4" label="objavljenih" />
              <StatCard value="3" label="čakajo" />
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-black text-white">Čaka na objavo</div>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    Predlogi, ki so poslani in čakajo, da jih pripravimo za
                    javno objavo.
                  </p>
                </div>

                <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-zinc-300">
                  3
                </span>
              </div>
            </div>
          </div>

          <div className="flex min-h-[300px] flex-col justify-between rounded-[32px] border border-[#c58b46]/20 bg-[#c58b46]/10 p-6">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-[#c58b46]">
                TOP ambasador
              </div>

              <h2 className="mt-5 text-xl font-black leading-tight text-white">
                Še 16 objavljenih tur
              </h2>

              <p className="mt-3 text-sm leading-7 text-zinc-300">
                Vsaka objavljena tura šteje k tvojemu ambasadorskemu profilu.
              </p>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs font-bold text-zinc-400">
                <span>4 / 20</span>
                <span>20%</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-black/30">
                <div className="h-full w-[20%] rounded-full bg-[#c58b46]" />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Zadnji predlogi
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-white">
                Tvoje ture in status.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
                Tukaj vidiš, kaj je že objavljeno, kaj čaka na objavo in kaj
                je treba še dopolniti.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/ambasador/ture"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300"
              >
                Vse moje ture
              </Link>

              <Link
                href="/admin/predlog-ture/nova"
                className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black"
              >
                + Nova tura
              </Link>
            </div>
          </div>

          <div className="mt-7 grid gap-4">
            {proposals.map((proposal) => (
              <div
                key={proposal.title}
                className="grid gap-4 rounded-[26px] border border-white/10 bg-black/20 p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
              >
                <div>
                  <div className="text-lg font-black leading-tight text-white md:text-xl">
                    {proposal.title}
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2 text-sm text-zinc-500">
                    <span>{proposal.region}</span>
                    <span>·</span>
                    <span>{proposal.meta}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 md:justify-end">
                  <StatusBadge status={proposal.status} />

                  <Link
                    href="/admin/ambasador/ture"
                    className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300"
                  >
                    Odpri
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
