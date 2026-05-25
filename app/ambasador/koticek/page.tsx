import Link from "next/link";
import AmbassadorShell from "@/components/AmbassadorShell";

const proposals = [
  { title: "Pohorski veliki krog do Areha", region: "Štajerska", status: "Čaka na objavo", meta: "92 km · 1450 vm" },
  { title: "Gozdni flow nad Mariborom", region: "Štajerska", status: "Objavljeno", meta: "32 km · 890 vm" },
  { title: "Makadamski krog ob Dravi", region: "Štajerska", status: "Potreben popravek", meta: "54 km · 620 vm" },
];

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "Objavljeno"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
      : status === "Potreben popravek"
        ? "border-[#c58b46]/20 bg-[#c58b46]/10 text-[#c58b46]"
        : "border-white/10 bg-white/5 text-zinc-400";
  return (
    <span className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-bold ${tone}`}>
      {status}
    </span>
  );
}

export default function AmbassadorDashboardPage() {
  return (
    <AmbassadorShell>
      <div className="space-y-8">

        {/* ── Pozdrav ── */}
        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Ambasadorski kotiček
              </div>
              <h1 className="mt-4 font-serif text-4xl font-black italic leading-tight text-white md:text-5xl">
                Dobrodošel nazaj, Bojan.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400">
                Tukaj spremljaš svoje predloge tur, ponudnikov in znamenitosti.
                Vsaka objavljena vsebina ostane povezana s tvojim profilom.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/ambasador/koticek/ture/nova"
                className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black transition hover:opacity-90">
                + Nova tura
              </Link>
              <Link href="/ambasador/koticek/profil"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">
                Uredi profil
              </Link>
            </div>
          </div>
        </section>

        {/* ── Statistike ── */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { value: "7", label: "tur predlaganih" },
            { value: "4", label: "tur objavljenih" },
            { value: "2", label: "ponudnikov" },
            { value: "3", label: "znamenitosti" },
          ].map((s) => (
            <div key={s.label} className="flex min-h-[130px] flex-col items-center justify-center rounded-[26px] border border-white/10 bg-[#07110b] p-5 text-center">
              <div className="text-5xl font-black leading-none text-white">{s.value}</div>
              <div className="mt-3 text-sm font-bold text-zinc-500">{s.label}</div>
            </div>
          ))}
        </section>

        {/* ── TOP ambasador progress ── */}
        <section className="rounded-[32px] border border-[#c58b46]/20 bg-[#c58b46]/10 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-[#c58b46]">TOP ambasador</div>
              <h2 className="mt-2 text-xl font-black text-white">Še 16 objavljenih tur do TOP oznake</h2>
              <p className="mt-1.5 text-sm text-zinc-400">Vsaka potrjena tura, ponudnik ali znamenitost šteje k napredku.</p>
            </div>
            <div className="sm:w-48">
              <div className="mb-2 flex justify-between text-xs font-bold text-zinc-400">
                <span>4 / 20</span><span>20%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-black/30">
                <div className="h-full w-[20%] rounded-full bg-[#c58b46]" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Zadnje ture ── */}
        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Zadnji predlogi</div>
              <h2 className="mt-3 text-2xl font-black text-white">Tvoje ture in status.</h2>
            </div>
            <Link href="/ambasador/koticek/ture"
              className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">
              Vse ture →
            </Link>
          </div>

          <div className="space-y-3">
            {proposals.map((p) => (
              <div key={p.title} className="flex flex-wrap items-center justify-between gap-4 rounded-[22px] border border-white/10 bg-black/20 p-5">
                <div>
                  <div className="font-black text-white">{p.title}</div>
                  <div className="mt-1 text-sm text-zinc-500">{p.region} · {p.meta}</div>
                </div>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </div>
        </section>

        {/* ── Hitri dostop ── */}
        <section className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Ponudniki", desc: "Predlagaj lokalne ponudnike ob tvojih trasah.", href: "/ambasador/koticek/ponudniki", cta: "Odpri →" },
            { label: "Znamenitosti", desc: "Dodaj razglede, naravne točke in kulturo ob poti.", href: "/ambasador/koticek/znamenitosti", cta: "Odpri →" },
            { label: "Profil", desc: "Uredi svojo ambasadorsko vizitko in podatke.", href: "/ambasador/koticek/profil", cta: "Odpri →" },
          ].map((item) => (
            <Link key={item.label} href={item.href}
              className="flex flex-col justify-between rounded-[28px] border border-white/10 bg-[#07110b] p-6 transition hover:border-[#c58b46]/30">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-[#c58b46]">{item.label}</div>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{item.desc}</p>
              </div>
              <div className="mt-5 text-sm font-black text-zinc-300">{item.cta}</div>
            </Link>
          ))}
        </section>

      </div>
    </AmbassadorShell>
  );
}
