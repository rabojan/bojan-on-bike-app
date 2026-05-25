"use client";

import Link from "next/link";
import { useState } from "react";
import AmbassadorShell from "@/components/AmbassadorShell";

const providers = [
  { title: "Rudijev dom na Pohorju", type: "Planinska koča", status: "Objavljeno", region: "Štajerska", note: "Objavljeno in vidno na platformi." },
  { title: "Vinska klet Jurančič", type: "Vinska klet", status: "Čaka na objavo", region: "Štajerska", note: "Predlog čaka na pregled uredništva." },
];

const filters = ["Vse", "Čaka na objavo", "Objavljeno", "Potreben popravek"];

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "Objavljeno" ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
    : status === "Potreben popravek" ? "border-[#c58b46]/20 bg-[#c58b46]/10 text-[#c58b46]"
    : "border-white/10 bg-white/5 text-zinc-400";
  return <span className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-bold ${tone}`}>{status}</span>;
}

export default function AmbassadorPonudnikiPage() {
  const [activeFilter, setActiveFilter] = useState("Vse");
  const filtered = providers.filter((p) => activeFilter === "Vse" || p.status === activeFilter);

  return (
    <AmbassadorShell>
      <div className="space-y-8">

        {/* ── Glava ── */}
        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Ambasadorski kotiček / Ponudniki</div>
              <h1 className="mt-4 font-serif text-4xl font-black italic leading-tight text-white">
                Tvoji predlagani ponudniki.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">
                Predlagaj lokalne ponudnike, ki jih priporočaš ob tvojih trasah — koče, kleti,
                bifeji, bike shopsi. Vsak potrjen ponudnik dobi svojo stran na platformi.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/ambasador/koticek"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">
                ← Kotiček
              </Link>
              <Link href="/ambasador/koticek/ponudniki/nova"
                className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black transition hover:opacity-90">
                + Predlagaj ponudnika
              </Link>
            </div>
          </div>
        </section>

        {/* ── Statistike ── */}
        <section className="grid gap-4 sm:grid-cols-3">
          {[
            { value: String(providers.length), label: "vseh predlaganih" },
            { value: String(providers.filter(p => p.status === "Objavljeno").length), label: "objavljenih" },
            { value: String(providers.filter(p => p.status === "Čaka na objavo").length), label: "čakajo na pregled" },
          ].map((s) => (
            <div key={s.label} className="flex min-h-[120px] flex-col items-center justify-center rounded-[26px] border border-white/10 bg-[#07110b] p-5 text-center">
              <div className="text-4xl font-black leading-none text-white">{s.value}</div>
              <div className="mt-3 text-sm font-bold text-zinc-500">{s.label}</div>
            </div>
          ))}
        </section>

        {/* ── Seznam ── */}
        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-black text-white">Pregled predlaganih ponudnikov.</h2>
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
            {filtered.map((p) => (
              <article key={p.title}
                className="grid gap-4 rounded-[28px] border border-white/10 bg-black/20 p-5 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-black text-white">{p.title}</h3>
                    <StatusBadge status={p.status} />
                  </div>
                  <div className="mt-1.5 text-sm text-zinc-500">{p.type} · {p.region}</div>
                  <p className="mt-2 text-sm leading-7 text-zinc-600">{p.note}</p>
                </div>
                <button className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40 hover:text-white">
                  Odpri
                </button>
              </article>
            ))}

            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <div className="text-3xl">🏪</div>
                <p className="mt-4 text-sm text-zinc-600">Ni predlaganih ponudnikov s tem statusom.</p>
                <Link href="/ambasador/koticek/ponudniki/nova"
                  className="mt-5 inline-flex rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black transition hover:opacity-90">
                  + Predlagaj prvega
                </Link>
              </div>
            )}
          </div>
        </section>

      </div>
    </AmbassadorShell>
  );
}
