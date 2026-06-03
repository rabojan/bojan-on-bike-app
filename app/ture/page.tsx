"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import { useEffect, useMemo, useState } from "react";
import PageHero from "@/components/PageHero";
import { supabase } from "@/lib/supabase";

const regions = ["Vse", "Štajerska", "Koroška", "Gorenjska", "Primorska", "Notranjska", "Dolenjska", "Prekmurje"];
const difficulties = ["Vse", "Lahka", "Srednja", "Zahtevna"];

const slugify = (value: string) =>
  value.toLowerCase()
    .replace(/š/g, "s").replace(/č/g, "c").replace(/ž/g, "z")
    .replace(/ć/g, "c").replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

function casDisplay(casUr: number | null): string {
  if (!casUr) return "—";
  if (casUr <= 2) return "1–2 uri";
  if (casUr <= 3) return "2–3 ure";
  if (casUr <= 5) return "3–5 ur";
  if (casUr <= 7) return "5–7 ur";
  if (casUr <= 9) return "Cel dan";
  return "Več dni";
}

function SurfaceBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-zinc-400">{label}</span>
        <span className="font-semibold">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <div className="h-full rounded-full bg-[#c58b46]" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

type Tura = {
  id: string;
  ime: string;
  regija: string;
  obmocje: string | null;
  opis: string | null;
  prvi_vtis: string | null;
  km: number | null;
  visinska_razlika: number | null;
  cas_ur: number | null;
  tipi: string[] | null;
  obcutek: string[] | null;
  tezavnost: string | null;
  podlaga_asfalt: number;
  podlaga_makadam: number;
  podlaga_gozd: number;
  hero_image: string | null;
};

export default function TurePage() {
  const router = useRouter();
  const [ture, setTure] = useState<Tura[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRegion, setActiveRegion] = useState("Vse");
  const [activeDifficulty, setActiveDifficulty] = useState("Vse");
  const [activeVibe, setActiveVibe] = useState("Vse");
  const [vibes, setVibes] = useState<string[]>(["Vse"]);

  // Naloži občutke iz baze
  useEffect(() => {
    supabase.from("obcutki").select("naziv").order("vrstni_red").then(({ data }) => {
      setVibes(["Vse", ...(data ?? []).map((o: { naziv: string }) => o.naziv)]);
    });
  }, []);

  // Beri URL parametre ob prvem nalaganju
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const regionFromUrl = params.get("pokrajina") || params.get("regija");
    const diffFromUrl = params.get("tezavnost");
    const vibeFromUrl = params.get("obcutek");
    if (regionFromUrl) {
      const matched = regions.find((r) => slugify(r) === regionFromUrl);
      if (matched) setActiveRegion(matched);
    }
    if (diffFromUrl) {
      const matched = difficulties.find((d) => slugify(d) === diffFromUrl);
      if (matched) setActiveDifficulty(matched);
    }
    if (vibeFromUrl) {
      const matched = vibes.find((v) => slugify(v) === vibeFromUrl);
      if (matched) setActiveVibe(matched);
    }
  }, []);

  // Posodobi URL ko se filter spremeni (za deljenje linkov)
  function updateUrl(region: string, difficulty: string, vibe: string) {
    const params = new URLSearchParams();
    if (region !== "Vse") params.set("pokrajina", slugify(region));
    if (difficulty !== "Vse") params.set("tezavnost", slugify(difficulty));
    if (vibe !== "Vse") params.set("obcutek", slugify(vibe));
    const qs = params.toString();
    router.replace(qs ? `/ture?${qs}` : "/ture", { scroll: false });
  }

  function handleRegionChange(value: string) {
    setActiveRegion(value);
    updateUrl(value, activeDifficulty, activeVibe);
  }

  function handleDifficultyChange(value: string) {
    setActiveDifficulty(value);
    updateUrl(activeRegion, value, activeVibe);
  }

  function handleVibeChange(value: string) {
    setActiveVibe(value);
    updateUrl(activeRegion, activeDifficulty, value);
  }

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("predlogi_tur")
        .select("id, ime, regija, obmocje, opis, prvi_vtis, km, visinska_razlika, cas_ur, tipi, obcutek, tezavnost, podlaga_asfalt, podlaga_makadam, podlaga_gozd, hero_image")
        .eq("status", "approved")
        .order("created_at", { ascending: false });
      setTure(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = useMemo(() => ture.filter((t) => {
    const regionMatch = activeRegion === "Vse" || t.regija === activeRegion;
    const diffMatch = activeDifficulty === "Vse" || t.tezavnost === activeDifficulty;
    const vibeMatch = activeVibe === "Vse" || (t.obcutek ?? []).includes(activeVibe);
    return regionMatch && diffMatch && vibeMatch;
  }), [ture, activeRegion, activeDifficulty, activeVibe]);

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/" active="ture" />

      <PageHero
        eyebrow="Kolesarski dnevi"
        title="Poišči turo, ki paše tvojemu dnevu."
        description="Izberi po pokrajini, zahtevnosti ali občutku. Vsaka tura ostane praktična za kolesarja, a je zasnovana kot cel dan: pot, razgled, postanek in doživetje ob poti."
        image="/hero-ture.png"
        imageAlt="Skupina zadovoljnih kolesarjev na poti"
        imagePosition="center"
        mobileImagePosition="center 60%"
        brightnessClass="brightness-100"
      />

      <section className="border-y border-white/10 bg-[#0b1a10]/70 px-6 py-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Poišči turo zase</div>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
                Izberi pokrajino ali zahtevnost. Filtri so tu kot pomoč, glavna zgodba ostaja tura.
              </p>
            </div>
            <div className="text-sm text-zinc-500">
              {loading ? "—" : `${filtered.length} ${filtered.length === 1 ? "tura" : "ture"}`}
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-zinc-500">Pokrajina</span>
              <select value={activeRegion} onChange={(e) => handleRegionChange(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-[#c58b46]/60">
                {regions.map((r) => <option key={r}>{r}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-zinc-500">Zahtevnost</span>
              <select value={activeDifficulty} onChange={(e) => handleDifficultyChange(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-[#c58b46]/60">
                {difficulties.map((d) => <option key={d}>{d}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-zinc-500">Občutek</span>
              <select value={activeVibe} onChange={(e) => handleVibeChange(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-[#c58b46]/60">
                {vibes.map((v) => <option key={v}>{v}</option>)}
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Izbrane ture</div>
            <h2 className="mt-3 font-serif text-3xl font-black italic tracking-tight md:text-4xl">
              Ture, ki ustrezajo tvoji izbiri.
            </h2>
          </div>

          {loading ? (
            <div className="py-20 text-center text-zinc-500">Nalagam ture...</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-zinc-500">Ni tur s temi filtri.</div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              {filtered.map((tura) => (
                <article key={tura.id} className="flex h-full flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1a10]">
                  <div className="relative h-64 overflow-hidden bg-black/30">
                    {tura.hero_image ? (
                      <img src={tura.hero_image} alt={tura.ime}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="text-5xl opacity-20">🚵</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a10] via-[#0b1a10]/40 to-transparent" />
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <div className="mb-4 flex items-center justify-between gap-4 text-sm text-zinc-400">
                      <span>{tura.regija}{tura.obmocje ? ` • ${tura.obmocje}` : ""}</span>
                      <span>{tura.tipi?.join(", ") ?? ""}</span>
                    </div>

                    <h2 className="font-serif text-3xl font-black italic leading-tight">{tura.ime}</h2>

                    {tura.prvi_vtis && (
                      <p className="mt-3 text-sm leading-7 text-zinc-400 line-clamp-3">{tura.prvi_vtis}</p>
                    )}

                    <div className="mt-6 flex flex-wrap gap-3 text-sm">
                      {tura.km != null && <span className="rounded-full border border-white/10 px-4 py-2">{tura.km} km</span>}
                      {tura.visinska_razlika != null && <span className="rounded-full border border-white/10 px-4 py-2">{tura.visinska_razlika} vm</span>}
                      {tura.cas_ur != null && <span className="rounded-full border border-white/10 px-4 py-2">{casDisplay(tura.cas_ur)}</span>}
                      {tura.tezavnost && <span className="rounded-full border border-white/10 px-4 py-2">{tura.tezavnost}</span>}
                    </div>

                    {(tura.podlaga_asfalt > 0 || tura.podlaga_makadam > 0 || tura.podlaga_gozd > 0) && (
                      <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                        <div className="mb-5 font-bold">Podlaga</div>
                        <div className="space-y-4">
                          {tura.podlaga_asfalt > 0 && <SurfaceBar label="Asfalt" value={tura.podlaga_asfalt} />}
                          {tura.podlaga_makadam > 0 && <SurfaceBar label="Makadam" value={tura.podlaga_makadam} />}
                          {tura.podlaga_gozd > 0 && <SurfaceBar label="Gozdna pot" value={tura.podlaga_gozd} />}
                        </div>
                      </div>
                    )}

                    <Link href={`/ture/${tura.id}`}
                      className="mt-auto pt-7 inline-flex w-full justify-center rounded-full bg-[#c58b46] px-6 py-4 text-sm font-black text-black transition hover:opacity-90">
                      Odpri turo
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#07110b] px-6 py-16">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-[#c58b46]/20 bg-[#c58b46]/10">
          <div className="grid md:grid-cols-[1fr_auto] md:items-center">
            <div className="p-8 md:p-10">
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Kolesarski ambasadorji</div>
              <h3 className="mt-4 font-serif text-3xl font-black italic leading-tight">
                Poznaš pot, ki bi jo drugi morali doživeti?
              </h3>
              <p className="mt-4 max-w-xl leading-8 text-zinc-400">
                Postani ambasador in predlagaj ture iz svoje regije. Vsaka potrjena tura dobi svojo stran in postane del platforme.
              </p>
            </div>
            <div className="p-8 md:p-10">
              <Link href="/ambasador/prijava"
                className="inline-flex rounded-full bg-[#c58b46] px-8 py-4 text-sm font-black text-black transition hover:opacity-90">
                Postani ambasador
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
