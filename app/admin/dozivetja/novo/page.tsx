"use client";

import Link from "next/link";
import { useState } from "react";
import AdminShell from "@/components/AdminShell";

// ── Types ──────────────────────────────────────────────────────────────────

type Step = {
  id: number;
  time: string;
  icon: string;
  title: string;
  description: string;
  provider: string;
  attraction: string;
  posebnosti: string[];
};

// ── Reference data ─────────────────────────────────────────────────────────

const providerOptions = [
  "Rudijev dom na Pohorju",
  "Gorska hiša Pohorje",
  "Vinska klet Jurančič",
];

const attractionOptions = [
  "Razgled nad Mariborom",
  "Pohorski gozdni odsek",
  "Stara planinska pot",
];

const trailTypes = ["MTB", "Gravel", "E-bike", "Bikepacking", "Cesta"];
const difficulties = ["Lahka", "Srednja", "Zahtevna"];

const experienceTypes = [
  "MTB flow", "Vinsko doživetje", "Družinski izlet", "Kulinarična tura",
  "Razgledna pot", "Vikend pobeg", "Zgodbe krajev", "E-bike dan",
];

// ── StepCard ───────────────────────────────────────────────────────────────

function StepCard({
  step, index, total, onChange, onRemove, onMoveUp, onMoveDown,
}: {
  step: Step;
  index: number;
  total: number;
  onChange: (id: number, field: keyof Step, value: string | string[]) => void;
  onRemove: (id: number) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}) {
  const [newPosebnost, setNewPosebnost] = useState("");

  const addPosebnost = () => {
    if (!newPosebnost.trim()) return;
    onChange(step.id, "posebnosti", [...step.posebnosti, newPosebnost.trim()]);
    setNewPosebnost("");
  };

  const removePosebnost = (j: number) => {
    onChange(step.id, "posebnosti", step.posebnosti.filter((_, i) => i !== j));
  };

  return (
    <div className="rounded-[24px] border border-white/10 bg-[#07110b] p-6">

      {/* Ura + ikona + kontrole */}
      <div className="mb-5 flex items-center gap-3">
        <input
          value={step.icon}
          onChange={(e) => onChange(step.id, "icon", e.target.value)}
          placeholder="☕"
          className="w-14 rounded-xl border border-white/10 bg-black/20 py-3 text-center text-xl outline-none focus:border-[#c58b46]/50"
        />
        <input
          value={step.time}
          onChange={(e) => onChange(step.id, "time", e.target.value)}
          placeholder="07:30"
          className="w-24 rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-center text-sm font-bold text-[#c58b46] outline-none focus:border-[#c58b46]/50"
        />
        <div className="flex-1" />
        <div className="flex gap-1.5">
          <button
            onClick={() => onMoveUp(index)}
            disabled={index === 0}
            className="rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-sm text-zinc-400 transition hover:border-white/20 disabled:opacity-20"
          >↑</button>
          <button
            onClick={() => onMoveDown(index)}
            disabled={index === total - 1}
            className="rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-sm text-zinc-400 transition hover:border-white/20 disabled:opacity-20"
          >↓</button>
          <button
            onClick={() => onRemove(step.id)}
            className="rounded-lg border border-red-900/40 bg-red-950/20 px-2.5 py-1.5 text-sm text-red-400 transition hover:border-red-600/50"
          >✕</button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Naslov */}
        <label className="block space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">Naslov sklopa *</span>
          <input
            value={step.title}
            onChange={(e) => onChange(step.id, "title", e.target.value)}
            placeholder="npr. Kosilo pri Rudijevem domu"
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-[#c58b46]/50"
          />
        </label>

        {/* Opis */}
        <label className="block space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">Opis — ena vrstica</span>
          <input
            value={step.description}
            onChange={(e) => onChange(step.id, "description", e.target.value)}
            placeholder="npr. Terasa, juha in zaslužena tišina."
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-[#c58b46]/50"
          />
        </label>

        {/* Ponudnik + Znamenitost */}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#c58b46]">Ponudnik</span>
            <select
              value={step.provider}
              onChange={(e) => onChange(step.id, "provider", e.target.value)}
              className="w-full rounded-xl border border-[#c58b46]/20 bg-black/20 px-4 py-3 text-sm outline-none focus:border-[#c58b46]/50"
            >
              <option value="">— brez ponudnika —</option>
              {providerOptions.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>

          <label className="block space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">Znamenitost</span>
            <select
              value={step.attraction}
              onChange={(e) => onChange(step.id, "attraction", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-[#c58b46]/50"
            >
              <option value="">— brez znamenitosti —</option>
              {attractionOptions.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </label>
        </div>

        {/* Posebnosti */}
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">Posebnosti ob poti</span>
          {step.posebnosti.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {step.posebnosti.map((p, j) => (
                <span
                  key={j}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-zinc-400"
                >
                  {p}
                  <button onClick={() => removePosebnost(j)} className="ml-0.5 text-zinc-600 transition hover:text-red-400">×</button>
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <input
              value={newPosebnost}
              onChange={(e) => setNewPosebnost(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addPosebnost())}
              placeholder="npr. 🔧 Bike servis ob poti"
              className="flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm outline-none focus:border-[#c58b46]/50"
            />
            <button
              onClick={addPosebnost}
              className="rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm font-bold text-zinc-400 transition hover:border-[#c58b46]/40 hover:text-[#f4d7ad]"
            >+ Dodaj</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

let nextId = 2;

export default function NewExperiencePage() {
  const [status, setStatus] = useState("Čaka na objavo");
  const [trailType, setTrailType] = useState("MTB");
  const [difficulty, setDifficulty] = useState("Srednja");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const [steps, setSteps] = useState<Step[]>([
    { id: 1, time: "", icon: "📍", title: "", description: "", provider: "", attraction: "", posebnosti: [] },
  ]);

  const addStep = () => {
    setSteps((prev) => [
      ...prev,
      { id: nextId++, time: "", icon: "📍", title: "", description: "", provider: "", attraction: "", posebnosti: [] },
    ]);
  };

  const updateStep = (id: number, field: keyof Step, value: string | string[]) => {
    setSteps((prev) => prev.map((s) => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeStep = (id: number) => {
    setSteps((prev) => prev.filter((s) => s.id !== id));
  };

  const moveStep = (index: number, direction: number) => {
    setSteps((prev) => {
      const next = [...prev];
      const [removed] = next.splice(index, 1);
      next.splice(index + direction, 0, removed);
      return next;
    });
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <AdminShell active="dozivetja">
      <div className="space-y-8">

        {/* ── Glava ── */}
        <section className="flex flex-col gap-5 rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Admin / Doživetja / Novo
            </div>
            <h1 className="mt-4 text-4xl font-black">Novo doživetje</h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-500">
              Sestavi dan korak za korakom. Vsak časovni sklop ima naslov, opis in po želji ponudnika ali znamenitost.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/dozivetja"
              className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:border-white/20"
            >← Nazaj</Link>
            <button className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black transition hover:opacity-90">
              Shrani predlog
            </button>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[1fr_320px]">
          <div className="space-y-8">

            {/* ── Osnovni podatki ── */}
            <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
              <div className="mb-6 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
                Osnovni podatki
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="col-span-2 space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Naslov doživetja *</span>
                  <input
                    placeholder="npr. Vinski kolesarski dan"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="col-span-2 space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Tagline (mood) *</span>
                  <input
                    placeholder="npr. Mehki vzponi, vinski razgledi, pogovor ob kozarcu."
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                  <p className="text-xs text-zinc-600">Kratka atmosferska vrstica — prikaže se pod naslovom v heroju.</p>
                </label>

                <label className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Regija *</span>
                  <input placeholder="npr. Štajerska" className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
                </label>

                <label className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Območje</span>
                  <input placeholder="npr. Pohorje" className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
                </label>

                <label className="col-span-2 space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Zakaj ta dan? *</span>
                  <textarea
                    placeholder="Kratka zgodba — zakaj je ta dan poseben, kemu je namenjen, kakšen je občutek..."
                    rows={4}
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-8 outline-none focus:border-[#c58b46]/60"
                  />
                  <p className="text-xs text-zinc-600">Prikaže se v sekciji "Zakaj ta dan?" — text-base, ne velik quote.</p>
                </label>
              </div>
            </section>

            {/* ── Ritem dneva ── BUILDER ── */}
            <section className="rounded-[32px] border border-[#c58b46]/20 bg-black/20 p-7">
              <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
                Ritem dneva
              </div>
              <p className="mb-7 text-sm leading-7 text-zinc-500">
                Dodaj časovne sklope po vrstnem redu. Vsak sklop je en korak na javni strani.
              </p>

              <div className="space-y-4">
                {steps.map((step, i) => (
                  <StepCard
                    key={step.id}
                    step={step}
                    index={i}
                    total={steps.length}
                    onChange={updateStep}
                    onRemove={removeStep}
                    onMoveUp={(idx) => moveStep(idx, -1)}
                    onMoveDown={(idx) => moveStep(idx, 1)}
                  />
                ))}
              </div>

              <button
                onClick={addStep}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-[20px] border border-dashed border-white/20 py-4 text-sm font-bold text-zinc-500 transition hover:border-[#c58b46]/40 hover:text-[#f4d7ad]"
              >
                + Dodaj časovni sklop
              </button>
            </section>

            {/* ── Trasa v podatkih ── */}
            <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
              <div className="mb-1 text-[10px] font-black uppercase tracking-[0.35em] text-zinc-500">
                Trasa v podatkih
              </div>
              <p className="mb-6 text-xs leading-6 text-zinc-600">
                Podatki trase so del tega doživetja — neodvisni od /ture.
              </p>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="col-span-2 space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Naslov trase</span>
                  <input placeholder="npr. Gozdna pot nad Pohorjem"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
                </label>

                <label className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Razdalja</span>
                  <input placeholder="npr. 32 km"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
                </label>

                <label className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Višinska razlika</span>
                  <input placeholder="npr. 890 vm"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
                </label>

                <label className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Čas</span>
                  <input placeholder="npr. 3–5 ur"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
                </label>

                <label className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Tip</span>
                  <select value={trailType} onChange={(e) => setTrailType(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60">
                    {trailTypes.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </label>

                <div className="col-span-2 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Težavnost</span>
                  <div className="flex gap-3">
                    {difficulties.map((d) => (
                      <label key={d} className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-bold transition ${difficulty === d ? "border-[#c58b46]/60 bg-[#c58b46]/10 text-[#f4d7ad]" : "border-white/10 bg-[#07110b] text-zinc-400 hover:border-white/20"}`}>
                        <input type="radio" name="difficulty" value={d} checked={difficulty === d} onChange={() => setDifficulty(d)} className="sr-only" />
                        {d}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="col-span-2 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Podlaga (skupaj 100%)</span>
                  <div className="grid grid-cols-3 gap-4">
                    {[["Asfalt", "0"], ["Makadam", "0"], ["Gozdna pot", "0"]].map(([label, def]) => (
                      <label key={label} className="space-y-1.5">
                        <span className="text-xs text-zinc-500">{label} %</span>
                        <input type="number" min="0" max="100" defaultValue={def}
                          className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-center outline-none focus:border-[#c58b46]/60" />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="col-span-2 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">GPX datoteka</span>
                  <div className="rounded-2xl border border-dashed border-white/15 bg-[#07110b] p-6 text-center">
                    <div className="text-2xl">📍</div>
                    <p className="mt-2 text-xs text-zinc-600">Naloži .gpx datoteko trase</p>
                    <label className="mt-3 inline-flex cursor-pointer rounded-full border border-white/10 px-5 py-2 text-xs font-bold text-zinc-400 transition hover:border-[#c58b46]/40">
                      Izberi GPX
                      <input type="file" accept=".gpx" className="hidden" />
                    </label>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* ── Stranska kolona ── */}
          <div className="space-y-6">

            {/* Status */}
            <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Status</div>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none focus:border-[#c58b46]/60"
              >
                <option>Čaka na objavo</option>
                <option>Oddano v pregled</option>
                <option>Potrebni popravki</option>
                <option>Objavljeno</option>
                <option>Arhivirano</option>
              </select>
            </div>

            {/* Hero slika */}
            <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Hero slika *</div>
              <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[#07110b]">
                <div className="flex min-h-[160px] items-center justify-center bg-black/20 p-6 text-center">
                  <div>
                    <div className="text-3xl">✨</div>
                    <p className="mt-3 text-xs leading-6 text-zinc-500">Atmosferska slika dneva</p>
                  </div>
                </div>
                <div className="border-t border-white/10 p-4">
                  <label className="flex cursor-pointer items-center justify-center rounded-full bg-[#c58b46] px-5 py-3 text-xs font-bold text-black">
                    Izberi sliko
                    <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            {/* Tip doživetja */}
            <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Tip doživetja</div>
              <div className="space-y-2">
                {experienceTypes.map((type) => (
                  <label key={type} className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 transition hover:border-white/20">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleType(type)}
                      className="accent-[#c58b46]"
                    />
                    <span className="text-sm font-semibold">{type}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </AdminShell>
  );
}
