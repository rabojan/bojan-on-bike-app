"use client";

import Link from "next/link";
import { useState } from "react";
import AdminShell from "@/components/AdminShell";

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

const trailOptions = [
  "Gozdni flow nad Mariborom",
  "Med vinogradi in griči",
  "Alpski pobeg ob vodi",
];

const experienceTypes = [
  "MTB flow", "Vinsko doživetje", "Družinski izlet", "Kulinarična tura",
  "Razgledna pot", "Vikend pobeg", "Zgodbe krajev", "E-bike dan",
];

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
      <div className="mb-5 flex items-center gap-3">
        <input
          value={step.icon}
          onChange={(e) => onChange(step.id, "icon", e.target.value)}
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
          <button onClick={() => onMoveUp(index)} disabled={index === 0}
            className="rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-sm text-zinc-400 transition hover:border-white/20 disabled:opacity-20">↑</button>
          <button onClick={() => onMoveDown(index)} disabled={index === total - 1}
            className="rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-sm text-zinc-400 transition hover:border-white/20 disabled:opacity-20">↓</button>
          <button onClick={() => onRemove(step.id)}
            className="rounded-lg border border-red-900/40 bg-red-950/20 px-2.5 py-1.5 text-sm text-red-400 transition hover:border-red-600/50">✕</button>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">Naslov sklopa *</span>
          <input value={step.title} onChange={(e) => onChange(step.id, "title", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-[#c58b46]/50" />
        </label>

        <label className="block space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">Opis — ena vrstica</span>
          <input value={step.description} onChange={(e) => onChange(step.id, "description", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-[#c58b46]/50" />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#c58b46]">Ponudnik</span>
            <select value={step.provider} onChange={(e) => onChange(step.id, "provider", e.target.value)}
              className="w-full rounded-xl border border-[#c58b46]/20 bg-black/20 px-4 py-3 text-sm outline-none focus:border-[#c58b46]/50">
              <option value="">— brez ponudnika —</option>
              {providerOptions.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>

          <label className="block space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">Znamenitost</span>
            <select value={step.attraction} onChange={(e) => onChange(step.id, "attraction", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-[#c58b46]/50">
              <option value="">— brez znamenitosti —</option>
              {attractionOptions.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </label>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">Posebnosti ob poti</span>
          {step.posebnosti.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {step.posebnosti.map((p, j) => (
                <span key={j} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-zinc-400">
                  {p}
                  <button onClick={() => removePosebnost(j)} className="ml-0.5 text-zinc-600 transition hover:text-red-400">×</button>
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <input value={newPosebnost} onChange={(e) => setNewPosebnost(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addPosebnost())}
              placeholder="npr. 🔧 Bike servis ob poti"
              className="flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm outline-none focus:border-[#c58b46]/50" />
            <button onClick={addPosebnost}
              className="rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm font-bold text-zinc-400 transition hover:border-[#c58b46]/40 hover:text-[#f4d7ad]">
              + Dodaj
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

let nextId = 10;

export default function EditPohorskiFlowPage() {
  const [status, setStatus] = useState("Objavljeno");
  const [selectedTrail, setSelectedTrail] = useState("Gozdni flow nad Mariborom");
  const [selectedTypes, setSelectedTypes] = useState(["MTB flow"]);

  const [steps, setSteps] = useState<Step[]>([
    { id: 1, time: "07:30", icon: "☕", title: "Jutro na sedlu", description: "Parkiraš, zatesteš pedala, narediš en globok vdih. Pohorje je jutro.", provider: "", attraction: "", posebnosti: [] },
    { id: 2, time: "08:00", icon: "⛰️", title: "Vzpon skozi gozd", description: "Prvih 400 vm vzpona med smrekami. Ritem se ustali, dihanje se poglablja.", provider: "", attraction: "", posebnosti: ["🔧 Bike servis 2 km pred vzponom"] },
    { id: 3, time: "10:00", icon: "🌅", title: "Razgled nad Mariborom", description: "Odpre se mesto. Kratek postanek — ne za GPS, ampak za pogled.", provider: "", attraction: "Razgled nad Mariborom", posebnosti: [] },
    { id: 4, time: "11:00", icon: "🌲", title: "Flow odseki", description: "Tisto, za kar si prišel. Enosledniki med drevesi, ki tečejo sami.", provider: "", attraction: "Pohorski gozdni odsek", posebnosti: [] },
    { id: 5, time: "12:30", icon: "🥾", title: "Stara planinska pot", description: "Kratek odmik od trase. Kos živega arhiva — pot, ki je tu že sto let.", provider: "", attraction: "Stara planinska pot", posebnosti: [] },
    { id: 6, time: "13:00", icon: "🍲", title: "Kosilo pri Rudijevem domu", description: "Terasa, juha in zaslužena tišina. Tura se počasi zaključuje.", provider: "Rudijev dom na Pohorju", attraction: "", posebnosti: ["🔋 E-bike polnilnica", "🚿 Tuš za kolesarje"] },
    { id: 7, time: "15:00", icon: "🏁", title: "Spust in konec", description: "Nazaj v dolino. Noge so težke, glava pa lahka.", provider: "", attraction: "", posebnosti: [] },
  ]);

  const addStep = () => {
    setSteps((prev) => [...prev, { id: nextId++, time: "", icon: "📍", title: "", description: "", provider: "", attraction: "", posebnosti: [] }]);
  };

  const updateStep = (id: number, field: keyof Step, value: string | string[]) => {
    setSteps((prev) => prev.map((s) => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeStep = (id: number) => setSteps((prev) => prev.filter((s) => s.id !== id));

  const moveStep = (index: number, direction: number) => {
    setSteps((prev) => {
      const next = [...prev];
      const [removed] = next.splice(index, 1);
      next.splice(index + direction, 0, removed);
      return next;
    });
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]);
  };

  return (
    <AdminShell active="dozivetja">
      <div className="space-y-8">

        {/* ── Glava ── */}
        <section className="flex flex-col gap-5 rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Admin / Doživetja / Uredi</div>
            <h1 className="mt-4 text-4xl font-black">Pohorski flow in kosilo</h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-500">
              Uredi časovne sklope, ponudnike, znamenitosti in posebnosti dneva.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/dozivetja/pohorski-flow-in-kosilo" target="_blank"
              className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:border-white/20">
              Predogled ↗
            </Link>
            <Link href="/admin/dozivetja"
              className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:border-white/20">
              ← Nazaj
            </Link>
            <button className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black transition hover:opacity-90">
              Shrani spremembe
            </button>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[1fr_320px]">
          <div className="space-y-8">

            {/* ── Osnovni podatki ── */}
            <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
              <div className="mb-6 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Osnovni podatki</div>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="col-span-2 space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Naslov doživetja *</span>
                  <input defaultValue="Pohorski flow in kosilo"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
                </label>

                <label className="col-span-2 space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Tagline (mood) *</span>
                  <input defaultValue="Jutranjo meglo zamenjaj za razgled. Vzpon nagradi s posedanjem."
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
                </label>

                <label className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Regija *</span>
                  <input defaultValue="Štajerska" className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
                </label>

                <label className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Območje</span>
                  <input defaultValue="Pohorje" className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
                </label>

                <label className="col-span-2 space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Zakaj ta dan? *</span>
                  <textarea defaultValue="Pohorje te vsakič preseneti. Ko se enkrat ujameš v flow med drevesi, pozabiš na čas. Spusti, ki se iztečejo v mirne gozdne poti, višinski razgledi in nazadnje Rudijev dom z juho, ki jo nisi naročil, ampak si jo zaslužil. Ta dan je nagrajevanje sebe."
                    rows={4}
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-8 outline-none focus:border-[#c58b46]/60" />
                </label>
              </div>
            </section>

            {/* ── Ritem dneva — BUILDER ── */}
            <section className="rounded-[32px] border border-[#c58b46]/20 bg-black/20 p-7">
              <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Ritem dneva</div>
              <p className="mb-7 text-sm leading-7 text-zinc-500">
                {steps.length} {steps.length === 1 ? "korak" : "korakov"} · Povleci z ↑↓ za spremembo vrstnega reda
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

          </div>

          {/* ── Stranska kolona ── */}
          <div className="space-y-6">

            <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Status</div>
              <select value={status} onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none focus:border-[#c58b46]/60">
                <option>Čaka na objavo</option>
                <option>Oddano v pregled</option>
                <option>Potrebni popravki</option>
                <option>Objavljeno</option>
                <option>Arhivirano</option>
              </select>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Hero slika</div>
              <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[#07110b]">
                <img src="/hero-gozdni-flow.png" alt="Hero" className="h-36 w-full object-cover opacity-80" />
                <div className="border-t border-white/10 p-4">
                  <label className="flex cursor-pointer items-center justify-center rounded-full border border-white/10 px-5 py-3 text-xs font-bold text-zinc-400 transition hover:border-[#c58b46]/40">
                    Zamenjaj sliko
                    <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Trasa v podatkih</div>
              <select value={selectedTrail} onChange={(e) => setSelectedTrail(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none focus:border-[#c58b46]/60">
                <option value="">— izberi turo —</option>
                {trailOptions.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Tip doživetja</div>
              <div className="space-y-2">
                {experienceTypes.map((type) => (
                  <label key={type} className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 transition hover:border-white/20">
                    <input type="checkbox" checked={selectedTypes.includes(type)} onChange={() => toggleType(type)} className="accent-[#c58b46]" />
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
