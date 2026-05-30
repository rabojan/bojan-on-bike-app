"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const regions = ["Vse", "Štajerska", "Koroška", "Gorenjska", "Primorska", "Notranjska", "Dolenjska", "Prekmurje"];
const types = ["Vse", "Razgled", "Narava", "Kulturna dediščina", "Sakralni objekt", "Geološka posebnost", "Zgodovinska točka", "Foto točka", "Postanek ob poti", "Drugo"];

type Znamenitost = {
  id: string;
  ime: string;
  tip: string | null;
  regija: string;
  lokacija: string | null;
  kratek_opis: string | null;
  hero_image: string | null;
};

export default function ZnamenitostiList({ znamenitosti }: { znamenitosti: Znamenitost[] }) {
  const [activeRegion, setActiveRegion] = useState("Vse");
  const [activeType, setActiveType] = useState("Vse");

  const filtered = useMemo(() => znamenitosti.filter((z) => {
    const regionMatch = activeRegion === "Vse" || z.regija === activeRegion;
    const typeMatch = activeType === "Vse" || z.tip === activeType;
    return regionMatch && typeMatch;
  }), [znamenitosti, activeRegion, activeType]);

  return (
    <>
      <section className="border-y border-white/10 bg-[#0b1a10]/70 px-6 py-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Filtriraj znamenitosti</div>
            </div>
            <div className="text-sm text-zinc-500">
              {`${filtered.length} ${filtered.length === 1 ? "znamenitost" : "znamenitosti"}`}
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-zinc-500">Pokrajina</span>
              <select value={activeRegion} onChange={(e) => setActiveRegion(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-[#c58b46]/60">
                {regions.map((r) => <option key={r}>{r}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-zinc-500">Tip</span>
              <select value={activeType} onChange={(e) => setActiveType(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-[#c58b46]/60">
                {types.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Izbrane znamenitosti</div>
            <h2 className="mt-3 font-serif text-3xl font-black italic tracking-tight md:text-4xl">
              Točke, ki ostanejo v spominu.
            </h2>
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center text-zinc-500">Ni znamenitosti s temi filtri.</div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((z) => (
                <article key={z.id} className="flex h-full flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1a10]">
                  <div className="relative h-52 overflow-hidden bg-black/30">
                    {z.hero_image ? (
                      <img src={z.hero_image} alt={z.ime}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="text-5xl opacity-20">🗺️</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07110b]/80 via-[#07110b]/20 to-transparent" />
                    {z.tip && (
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-200 backdrop-blur">
                          {z.tip}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 text-sm text-zinc-500">
                      {z.regija}{z.lokacija ? ` · ${z.lokacija}` : ""}
                    </div>
                    <h2 className="font-serif text-2xl font-black italic leading-tight text-white">{z.ime}</h2>
                    {z.kratek_opis && (
                      <p className="mt-3 text-sm leading-7 text-zinc-400 line-clamp-3">{z.kratek_opis}</p>
                    )}
                    <Link href={`/znamenitosti/${z.id}`}
                      className="mt-auto pt-6 inline-flex w-full justify-center rounded-full bg-[#c58b46] px-6 py-3.5 text-sm font-black text-black transition hover:opacity-90">
                      Poglej znamenitost
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
