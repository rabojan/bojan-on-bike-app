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

const providerOptions = ["Rudijev dom na Pohorju", "Gorska hiša Pohorje", "Vinska klet Jurančič"];
const attractionOptions = ["Razgled nad Mariborom", "Pohorski gozdni odsek", "Stara planinska pot"];
const trailOptions = ["Gozdni flow nad Mariborom", "Med vinogradi in griči", "Alpski pobeg ob vodi"];
const experienceTypes = ["MTB flow", "Vinsko doživetje", "Družinski izlet", "Kulinarična tura", "Razgledna pot", "Vikend pobeg", "Zgodbe krajev", "E-bike dan"];

function StepCard({ step, index, total, onChange, onRemove, onMoveUp, onMoveDown }: {
  step: Step; index: number; total: number;
  onChange: (id: number, field: keyof Step, value: string | string[]) => void;
  onRemove: (id: number) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}) {
  const [newPosebnost, setNewPosebnost] = useState("");
  const addPosebnost = () => { if (!newPosebnost.trim()) return; onChange(step.id, "posebnosti", [...step.posebnosti, newPosebnost.trim()]); setNewPosebnost(""); };
  const removePosebnost = (j: number) => onChange(step.id, "posebnosti", step.posebnosti.filter((_, i) => i !== j));

  return (
    <div className="rounded-[24px] border border-white/10 bg-[#07110b] p-6">
      <div className="mb-5 flex items-center gap-3">
        <input value={step.icon} onChange={(e) => onChange(step.id, "icon", e.target.value)}
          className="w-14 rounded-xl border border-white/10 bg-black/20 py-3 text-center text-xl outline-none focus:border-[#c58b46]/50" />
        <input value={step.time} onChange={(e) => onChange(step.id, "time", e.target.value)} placeholder="07:30"
          className="w-24 rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-center text-sm font-bold text-[#c58b46] outline-none focus:border-[#c58b46]/50" />
        <div className="flex-1" />
        <div className="flex gap-1.5">
          <button onClick={() => onMoveUp(index)} disabled={index === 0} className="rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-sm text-zinc-400 disabled:opacity-20">↑</button>
          <button onClick={() => onMoveDown(index)} disabled={index === total - 1} className="rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-sm text-zinc-400 disabled:opacity-20">↓</button>
          <button onClick={() => onRemove(step.id)} className="rounded-lg border border-red-900/40 bg-red-950/20 px-2.5 py-1.5 text-sm text-red-400">✕</button>
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
                  {p} <button onClick={() => removePosebnost(j)} className="text-zinc-600 hover:text-red-400">×</button>
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <input value={newPosebnost} onChange={(e) => setNewPosebnost(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addPosebnost())}
              placeholder="npr. 🍷 Degustacija vključena"
              className="flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm outline-none focus:border-[#c58b46]/50" />
            <button onClick={addPosebnost} className="rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm font-bold text-zinc-400 hover:border-[#c58b46]/40 hover:text-[#f4d7ad]">+ Dodaj</button>
          </div>
        </div>
      </div>
    </div>
  );
}

let nextId = 20;

export default function EditVinskoDozivetjePage() {
  const [status, setStatus] = useState("Objavljeno");
  const [selectedTrail, setSelectedTrail] = useState("Med vinogradi in griči");
  const [selectedTypes, setSelectedTypes] = useState(["Vinsko doživetje"]);

  const [steps, setSteps] = useState<Step[]>([
    { id: 11, time: "08:00", icon: "🌅", title: "Start med griči", description: "Zjutraj, ko vinograde oblije prva svetloba.", provider: "", attraction: "", posebnosti: [] },
    { id: 12, time: "09:30", icon: "🚵", title: "Mehki vzponi", description: "Gravel pot med terasami. Ni strmih klancev — samo ritem.", provider: "", attraction: "", posebnosti: [] },
    { id: 13, time: "11:00", icon: "🌄", title: "Vinogradniška terasa", description: "Razgled na dolino in vinograde.", provider: "", attraction: "Razgled nad Mariborom", posebnosti: [] },
    { id: 14, time: "12:30", icon: "🍷", title: "Postanek pri vinski kleti", description: "Degustacija, pogovor z vinarjem in odmor v senci.", provider: "Vinska klet Jurančič", attraction: "", posebnosti: ["🧀 Lokalni prigrizki ob degustaciji", "🚲 Kolo pustiš v dvorišču"] },
    { id: 15, time: "14:00", icon: "🏘️", title: "Vasi in lokalne poti", description: "Nazaj skozi vaške ulice, ki jih ni na nobenem zemljevidu.", provider: "", attraction: "", posebnosti: [] },
    { id: 16, time: "16:00", icon: "🏁", title: "Konec dneva", description: "Zložiš kolo in si misliš: naslednjič pridem prej. In dlje.", provider: "", attraction: "", posebnosti: [] },
  ]);

  const addStep = () => setSteps((prev) => [...prev, { id: nextId++, time: "", icon: "📍", title: "", description: "", provider: "", attraction: "", posebnosti: [] }]);
  const updateStep = (id: number, field: keyof Step, value: string | string[]) => setSteps((prev) => prev.map((s) => s.id === id ? { ...s, [field]: value } : s));
  const removeStep = (id: number) => setSteps((prev) => prev.filter((s) => s.id !== id));
  const moveStep = (index: number, direction: number) => { setSteps((prev) => { const next = [...prev]; const [removed] = next.splice(index, 1); next.splice(index + direction, 0, removed); return next; }); };
  const toggleType = (type: string) => setSelectedTypes((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]);

  return (
    <AdminShell active="dozivetja">
      <div className="space-y-8">
        <section className="flex flex-col gap-5 rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Admin / Doživetja / Uredi</div>
            <h1 className="mt-4 text-4xl font-black">Vinski kolesarski dan</h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-500">Uredi časovne sklope, ponudnike, znamenitosti in posebnosti dneva.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/dozivetja/vinski-kolesarski-dan" target="_blank" className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-zinc-300">Predogled ↗</Link>
            <Link href="/admin/dozivetja" className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-zinc-300">← Nazaj</Link>
            <button className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black">Shrani spremembe</button>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
              <div className="mb-6 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Osnovni podatki</div>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="col-span-2 space-y-1.5"><span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Naslov *</span>
                  <input defaultValue="Vinski kolesarski dan" className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" /></label>
                <label className="col-span-2 space-y-1.5"><span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Tagline *</span>
                  <input defaultValue="Mehki vzponi, vinski razgledi, pogovor ob kozarcu. Dan brez ciljev." className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" /></label>
                <label className="space-y-1.5"><span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Regija</span>
                  <input defaultValue="Štajerska" className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" /></label>
                <label className="space-y-1.5"><span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Območje</span>
                  <input defaultValue="Slovenske gorice" className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" /></label>
                <label className="col-span-2 space-y-1.5"><span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Zakaj ta dan?</span>
                  <textarea defaultValue="To ni tura za rekorde. Med vinskimi griči se dan odvija počasneje — asfalt se izmenjuje z makadamom, med vzponi se odpirajo pogledi na vinograde in doline, pri postanku pa te pričaka lokalni pridelek in pogovor, ki ga ne dobiš nikjer drugje." rows={4}
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-8 outline-none focus:border-[#c58b46]/60" /></label>
              </div>
            </section>

            <section className="rounded-[32px] border border-[#c58b46]/20 bg-black/20 p-7">
              <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Ritem dneva</div>
              <p className="mb-7 text-sm leading-7 text-zinc-500">{steps.length} korakov</p>
              <div className="space-y-4">
                {steps.map((step, i) => (
                  <StepCard key={step.id} step={step} index={i} total={steps.length}
                    onChange={updateStep} onRemove={removeStep} onMoveUp={(idx) => moveStep(idx, -1)} onMoveDown={(idx) => moveStep(idx, 1)} />
                ))}
              </div>
              <button onClick={addStep} className="mt-5 flex w-full items-center justify-center gap-2 rounded-[20px] border border-dashed border-white/20 py-4 text-sm font-bold text-zinc-500 transition hover:border-[#c58b46]/40 hover:text-[#f4d7ad]">
                + Dodaj časovni sklop
              </button>
            </section>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Status</div>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none">
                <option>Čaka na objavo</option><option>Oddano v pregled</option><option>Potrebni popravki</option><option>Objavljeno</option><option>Arhivirano</option>
              </select>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Hero slika</div>
              <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[#07110b]">
                <div className="flex h-36 items-center justify-center bg-black/20"><span className="text-zinc-600 text-sm">Unsplash slika</span></div>
                <div className="border-t border-white/10 p-4">
                  <label className="flex cursor-pointer items-center justify-center rounded-full border border-white/10 px-5 py-3 text-xs font-bold text-zinc-400">
                    Zamenjaj sliko <input type="file" accept="image/*" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Trasa</div>
              <select value={selectedTrail} onChange={(e) => setSelectedTrail(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none">
                <option value="">— izberi —</option>
                {trailOptions.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Tip doživetja</div>
              <div className="space-y-2">
                {experienceTypes.map((type) => (
                  <label key={type} className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
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
