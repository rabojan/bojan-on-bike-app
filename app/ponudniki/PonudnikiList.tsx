"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const regions = ["Vse", "Štajerska", "Koroška", "Gorenjska", "Primorska", "Notranjska", "Dolenjska", "Prekmurje"];
const types = ["Vse", "Planinska koča", "Restavracija", "Vinska klet", "Bike shop", "Hotel / apartma", "Kavarna / bistro", "Drugo"];

type Ponudnik = {
  id: string;
  ime: string;
  tip: string | null;
  regija: string;
  lokacija: string | null;
  opis: string | null;
  hero_image: string | null;
  bike_friendly_opis: string | null;
};

function parseEbik(raw: string | null): string[] {
  if (!raw) return [];
  try { const arr = JSON.parse(raw); return Array.isArray(arr) ? arr : []; }
  catch { return []; }
}

export default function PonudnikiList({ ponudniki }: { ponudniki: Ponudnik[] }) {
  const [activeRegion, setActiveRegion] = useState("Vse");
  const [activeType, setActiveType] = useState("Vse");

  const filtered = useMemo(() => ponudniki.filter((p) => {
    const regionMatch = activeRegion === "Vse" || p.regija === activeRegion;
    const typeMatch = activeType === "Vse" || p.tip === activeType;
    return regionMatch && typeMatch;
  }), [ponudniki, activeRegion, activeType]);

  return (
    <>
      <section className="border-y border-white/10 bg-[#0b1a10]/70 px-6 py-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Filtriraj ponudnike</div>
            </div>
            <div className="text-sm text-zinc-500">
              {`${filtered.length} ${filtered.length === 1 ? "ponudnik" : "ponudnikov"}`}
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
              <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-zinc-500">Tip ponudnika</span>
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
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Izbrani ponudniki</div>
            <h2 className="mt-3 font-serif text-3xl font-black italic tracking-tight md:text-4xl">
              Postanki, ki so vredni tvoje ture.
            </h2>
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center text-zinc-500">Ni ponudnikov s temi filtri.</div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <article key={p.id} className="flex h-full flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1a10]">
                  <div className="relative h-52 overflow-hidden bg-black/30">
                    {p.hero_image ? (
                      <img src={p.hero_image} alt={p.ime}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="text-5xl opacity-20">🏡</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a10] via-[#0b1a10]/40 to-transparent" />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center justify-between text-sm text-zinc-500">
                      <span>{p.regija}{p.lokacija ? ` · ${p.lokacija}` : ""}</span>
                      {p.tip && <span className="rounded-full border border-white/10 px-3 py-1 text-xs">{p.tip}</span>}
                    </div>
                    <h2 className="font-serif text-2xl font-black italic leading-tight text-white">{p.ime}</h2>
                    {parseEbik(p.bike_friendly_opis).length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {parseEbik(p.bike_friendly_opis).map((s) => (
                          <span key={s} className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-emerald-300">
                            🔋 {s}
                          </span>
                        ))}
                      </div>
                    )}
                    {p.opis && (
                      <p className="mt-3 text-sm leading-7 text-zinc-400 line-clamp-3">{p.opis}</p>
                    )}
                    <Link href={`/ponudniki/${p.id}`}
                      className="mt-auto pt-6 inline-flex w-full justify-center rounded-full bg-[#c58b46] px-6 py-3.5 text-sm font-black text-black transition hover:opacity-90">
                      Poglej ponudnika
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
