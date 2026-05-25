"use client";

import Link from "next/link";
import { useState } from "react";
import AmbassadorShell from "@/components/AmbassadorShell";

const regions = ["Štajerska", "Koroška", "Gorenjska", "Primorska", "Notranjska", "Dolenjska", "Prekmurje"];
const trailTypes = ["MTB", "Gravel", "E-bike", "Bikepacking", "Cesta"];
const difficulties = ["Lahka", "Srednja", "Zahtevna"];

export default function NovaTuraPage() {
  const [trailType, setTrailType] = useState("MTB");
  const [difficulty, setDifficulty] = useState("Srednja");

  return (
    <AmbassadorShell>
      <div className="space-y-8">

        {/* ── Glava ── */}
        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Ambasadorski kotiček / Ture / Nova</div>
              <h1 className="mt-4 font-serif text-4xl font-black italic leading-tight text-white">
                Predlagaj novo turo.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">
                Izpolni podatke o trasi. Po oddaji gre predlog v pregled — ko je odobren,
                se pojavi na platformi pod tvojim imenom.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/ambasador/koticek/ture"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">
                ← Nazaj
              </Link>
              <button className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black transition hover:opacity-90">
                Oddaj predlog
              </button>
            </div>
          </div>
        </section>

        {/* ── Forma ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-6 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Osnovni podatki</div>
          <div className="grid gap-5 md:grid-cols-2">

            <label className="col-span-2 block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Ime ture *</span>
              <input placeholder="npr. Pohorski veliki krog do Areha"
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Regija *</span>
              <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60">
                {regions.map((r) => <option key={r}>{r}</option>)}
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Območje</span>
              <input placeholder="npr. Pohorje, Mariborsko"
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
            </label>

            <label className="col-span-2 block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Zakaj ta tura? Tvoj ambasadorski namig *</span>
              <textarea rows={4} placeholder="Kaj naredi to turo posebno? Kateri del je nepozaben? Kdaj je najboljši čas?"
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-7 outline-none focus:border-[#c58b46]/60" />
            </label>

          </div>
        </section>

        {/* ── Podatki trase ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-6 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Podatki trase</div>
          <div className="space-y-6">

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="space-y-2">
                <span className="text-sm font-bold text-zinc-300">Razdalja (km)</span>
                <input type="number" placeholder="npr. 45"
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3.5 text-sm outline-none focus:border-[#c58b46]/60" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-bold text-zinc-300">Vzpon (vm)</span>
                <input type="number" placeholder="npr. 1200"
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3.5 text-sm outline-none focus:border-[#c58b46]/60" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-bold text-zinc-300">Ocenjeni čas</span>
                <input placeholder="npr. 4–6 ur"
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3.5 text-sm outline-none focus:border-[#c58b46]/60" />
              </label>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-bold text-zinc-300">Tip trase</span>
              <div className="flex flex-wrap gap-2">
                {trailTypes.map((t) => (
                  <button key={t} onClick={() => setTrailType(t)}
                    className={`rounded-full border px-5 py-2.5 text-sm font-bold transition ${trailType === t ? "border-[#c58b46]/60 bg-[#c58b46]/10 text-[#f4d7ad]" : "border-white/10 bg-[#07110b] text-zinc-400 hover:border-white/20"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-bold text-zinc-300">Težavnost</span>
              <div className="flex gap-3">
                {difficulties.map((d) => (
                  <button key={d} onClick={() => setDifficulty(d)}
                    className={`flex-1 rounded-2xl border py-3.5 text-sm font-bold transition ${difficulty === d ? "border-[#c58b46]/60 bg-[#c58b46]/10 text-[#f4d7ad]" : "border-white/10 bg-[#07110b] text-zinc-400 hover:border-white/20"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-bold text-zinc-300">Podlaga (%)</span>
              <div className="grid gap-3 sm:grid-cols-3">
                {[{ label: "Asfalt" }, { label: "Makadam" }, { label: "Gozdna pot" }].map((s) => (
                  <label key={s.label} className="space-y-1.5">
                    <span className="text-xs text-zinc-500">{s.label}</span>
                    <input type="number" min="0" max="100" placeholder="0"
                      className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none focus:border-[#c58b46]/60" />
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-bold text-zinc-300">GPX datoteka</span>
              <label className="flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-white/20 py-6 transition hover:border-[#c58b46]/40">
                <span className="text-sm text-zinc-500">↑ Naloži .gpx</span>
                <input type="file" accept=".gpx" className="hidden" />
              </label>
            </div>

          </div>
        </section>

        {/* ── Oddaj ── */}
        <div className="flex justify-end gap-3">
          <Link href="/ambasador/koticek/ture"
            className="rounded-full border border-white/10 px-6 py-3.5 text-sm font-bold text-zinc-300 transition hover:border-white/20">
            Prekliči
          </Link>
          <button className="rounded-full bg-[#c58b46] px-8 py-3.5 text-sm font-black text-black transition hover:opacity-90">
            Oddaj predlog ture
          </button>
        </div>

      </div>
    </AmbassadorShell>
  );
}
