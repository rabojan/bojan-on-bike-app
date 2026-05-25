"use client";

import Link from "next/link";
import { useState } from "react";
import AmbassadorShell from "@/components/AmbassadorShell";

const trails = [
  { title: "Pohorski veliki krog do Areha", region: "Štajerska", status: "Čaka na objavo", meta: "92 km · 1450 vm", note: "Predlog je poslan in čaka na pregled." },
  { title: "Gozdni flow nad Mariborom", region: "Štajerska", status: "Objavljeno", meta: "32 km · 890 vm", note: "Tura je objavljena in vidna na platformi." },
  { title: "Makadamski krog ob Dravi", region: "Štajerska", status: "Potreben popravek", meta: "54 km · 620 vm", note: "Pred objavo je treba dopolniti nekaj podatkov." },
];

const filters = ["Vse", "Čaka na objavo", "Objavljeno", "Potreben popravek"];

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "Objavljeno" ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
    : status === "Potreben popravek" ? "border-[#c58b46]/20 bg-[#c58b46]/10 text-[#c58b46]"
    : "border-white/10 bg-white/5 text-zinc-400";
  return <span className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-bold ${tone}`}>{status}</span>;
}

export default function AmbassadorTurePage() {
  const [activeFilter, setActiveFilter] = useState("Vse");
  const filtered = trails.filter((t) => activeFilter === "Vse" || t.status === activeFilter);

  return (
    <AmbassadorShell>
      <div className="space-y-8">

        {/* ── Glava ── */}
        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Ambasadorski kotiček / Ture</div>
              <h1 className="mt-4 font-serif text-4xl font-black italic leading-tight text-white">
                Tvoje ture in predlogi.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">
                Tukaj vidiš vse predloge — od osnutkov do objavljenih tur. Vsaka objavljena tura je
                vezana na tvoj ambasadorski profil.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/ambasador/koticek"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">
                ← Kotiček
              </Link>
              <Link href="/ambasador/koticek/ture/nova"
                className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black transition hover:opacity-90">
                + Predlagaj turo
              </Link>
            </div>
          </div>
        </section>

        {/* ── Statistike ── */}
        <section className="grid gap-4 sm:grid-cols-4">
          {[
            { value: "7", label: "vseh predlogov" },
            { value: "4", label: "objavljenih" },
            { value: "2", label: "čakajo" },
            { value: "16", label: "do TOP oznake" },
          ].map((s) => (
            <div key={s.label} className={`flex min-h-[130px] flex-col items-center justify-center rounded-[26px] border p-5 text-center ${s.label === "do TOP oznake" ? "border-[#c58b46]/20 bg-[#c58b46]/10" : "border-white/10 bg-[#07110b]"}`}>
              <div className="text-4xl font-black leading-none text-white">{s.value}</div>
              <div className="mt-3 text-sm font-bold text-zinc-500">{s.label}</div>
            </div>
          ))}
        </section>

        {/* ── Seznam ── */}
        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-black text-white">Status vsake tvoje ture.</h2>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className={`rounded-full border px-4 py-2 text-xs font-bold transition ${activeFilter === f ? "border-[#c58b46]/30 bg-[#c58b46] text-black" : "border-white/10 text-zinc-400 hover:border-white/20"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filtered.map((trail) => (
              <article key={trail.title}
                className="grid gap-4 rounded-[28px] border border-white/10 bg-black/20 p-5 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-black text-white">{trail.title}</h3>
                    <StatusBadge status={trail.status} />
                  </div>
                  <div className="mt-1.5 text-sm text-zinc-500">{trail.region} · {trail.meta}</div>
                  <p className="mt-2 text-sm leading-7 text-zinc-600">{trail.note}</p>
                </div>
                <button className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40 hover:text-white">
                  Odpri
                </button>
              </article>
            ))}

            {filtered.length === 0 && (
              <div className="py-12 text-center text-sm text-zinc-600">
                Ni predlogov s tem statusom.
              </div>
            )}
          </div>
        </section>

      </div>
    </AmbassadorShell>
  );
}
