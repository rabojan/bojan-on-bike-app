"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/AdminShell";
import { supabase } from "@/lib/supabase";

type Step = {
  id: number;
  time: string;
  icon: string;
  title: string;
  description: string;
  provider_name: string;
  provider_link: string;
  attraction_name: string;
  attraction_link: string;
  posebnosti: string[];
};

const experienceTypes = [
  "MTB flow", "Vinsko doživetje", "Družinski izlet", "Kulinarična tura",
  "Razgledna pot", "Vikend pobeg", "Zgodbe krajev", "E-bike dan",
];
const regions = ["Štajerska", "Koroška", "Gorenjska", "Primorska", "Notranjska", "Dolenjska", "Prekmurje"];
const trailTypes = ["MTB", "Gravel", "E-bike friendly", "Bikepacking", "Cesta", "Family friendly"];
const difficulties = ["Lahka", "Srednja", "Zahtevna"];

let nextId = 2;

function StepCard({ step, index, total, onChange, onRemove, onMoveUp, onMoveDown }: {
  step: Step; index: number; total: number;
  onChange: (id: number, field: keyof Step, value: string | string[]) => void;
  onRemove: (id: number) => void;
  onMoveUp: (i: number) => void;
  onMoveDown: (i: number) => void;
}) {
  const [newPosebnost, setNewPosebnost] = useState("");
  const addP = () => {
    if (!newPosebnost.trim()) return;
    onChange(step.id, "posebnosti", [...step.posebnosti, newPosebnost.trim()]);
    setNewPosebnost("");
  };
  const removeP = (j: number) => {
    onChange(step.id, "posebnosti", step.posebnosti.filter((_, i) => i !== j));
  };

  return (
    <div className="rounded-[24px] border border-white/10 bg-[#07110b] p-6">
      <div className="mb-5 flex items-center gap-3">
        <input value={step.icon} onChange={(e) => onChange(step.id, "icon", e.target.value)}
          placeholder="☕" className="w-14 rounded-xl border border-white/10 bg-black/20 py-3 text-center text-xl outline-none focus:border-[#c58b46]/50" />
        <input value={step.time} onChange={(e) => onChange(step.id, "time", e.target.value)}
          placeholder="07:30" className="w-24 rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-center text-sm font-bold text-[#c58b46] outline-none focus:border-[#c58b46]/50" />
        <div className="flex-1" />
        <div className="flex gap-1.5">
          <button onClick={() => onMoveUp(index)} disabled={index === 0}
            className="rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-sm text-zinc-400 disabled:opacity-20">↑</button>
          <button onClick={() => onMoveDown(index)} disabled={index === total - 1}
            className="rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-sm text-zinc-400 disabled:opacity-20">↓</button>
          <button onClick={() => onRemove(step.id)}
            className="rounded-lg border border-red-900/40 bg-red-950/20 px-2.5 py-1.5 text-sm text-red-400">✕</button>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">Naslov sklopa *</span>
          <input value={step.title} onChange={(e) => onChange(step.id, "title", e.target.value)}
            placeholder="npr. Kosilo pri Rudijevem domu"
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-[#c58b46]/50" />
        </label>
        <label className="block space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">Opis (ena vrstica)</span>
          <input value={step.description} onChange={(e) => onChange(step.id, "description", e.target.value)}
            placeholder="npr. Terasa, juha in zaslužena tišina."
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-[#c58b46]/50" />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#c58b46]">Ponudnik</span>
            <input value={step.provider_name} onChange={(e) => onChange(step.id, "provider_name", e.target.value)}
              placeholder="ime ponudnika" className="w-full rounded-xl border border-[#c58b46]/20 bg-black/20 px-4 py-2.5 text-sm outline-none focus:border-[#c58b46]/50" />
            <input value={step.provider_link} onChange={(e) => onChange(step.id, "provider_link", e.target.value)}
              placeholder="/ponudniki/id" className="w-full rounded-xl border border-[#c58b46]/10 bg-black/10 px-4 py-2 text-xs text-zinc-500 outline-none focus:border-[#c58b46]/30" />
          </div>
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">Znamenitost</span>
            <input value={step.attraction_name} onChange={(e) => onChange(step.id, "attraction_name", e.target.value)}
              placeholder="ime znamenitosti" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm outline-none focus:border-[#c58b46]/50" />
            <input value={step.attraction_link} onChange={(e) => onChange(step.id, "attraction_link", e.target.value)}
              placeholder="/znamenitosti/id" className="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-2 text-xs text-zinc-500 outline-none focus:border-[#c58b46]/30" />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">Posebnosti ob poti</span>
          {step.posebnosti.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {step.posebnosti.map((p, j) => (
                <span key={j} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-zinc-400">
                  {p}
                  <button onClick={() => removeP(j)} className="ml-0.5 text-zinc-600 hover:text-red-400">×</button>
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <input value={newPosebnost} onChange={(e) => setNewPosebnost(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addP())}
              placeholder="npr. 🔧 Bike servis ob poti"
              className="flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm outline-none focus:border-[#c58b46]/50" />
            <button onClick={addP}
              className="rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm font-bold text-zinc-400 hover:border-[#c58b46]/40 hover:text-[#f4d7ad]">
              + Dodaj
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NovoDoziveljePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [regija, setRegija] = useState("Štajerska");
  const [obmocje, setObmocje] = useState("");
  const [zakaj, setZakaj] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [status, setStatus] = useState("draft");

  const [trailType, setTrailType] = useState("MTB");
  const [difficulty, setDifficulty] = useState("Srednja");
  const [trasaNaslov, setTrasaNaslov] = useState("");
  const [trasaKm, setTrasaKm] = useState("");
  const [trasaVm, setTrasaVm] = useState("");
  const [trasaCas, setTrasaCas] = useState("");
  const [trasaAsfalt, setTrasaAsfalt] = useState("");
  const [trasaMakadam, setTrasaMakadam] = useState("");
  const [trasaGozd, setTrasaGozd] = useState("");

  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState("");
  const [gpxFile, setGpxFile] = useState<File | null>(null);

  const [steps, setSteps] = useState<Step[]>([
    { id: 1, time: "", icon: "📍", title: "", description: "", provider_name: "", provider_link: "", attraction_name: "", attraction_link: "", posebnosti: [] },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addStep = () => {
    setSteps((prev) => [...prev, { id: nextId++, time: "", icon: "📍", title: "", description: "", provider_name: "", provider_link: "", attraction_name: "", attraction_link: "", posebnosti: [] }]);
  };
  const updateStep = (id: number, field: keyof Step, value: string | string[]) => {
    setSteps((prev) => prev.map((s) => s.id === id ? { ...s, [field]: value } : s));
  };
  const removeStep = (id: number) => setSteps((prev) => prev.filter((s) => s.id !== id));
  const moveStep = (index: number, dir: number) => {
    setSteps((prev) => { const next = [...prev]; const [r] = next.splice(index, 1); next.splice(index + dir, 0, r); return next; });
  };
  const toggleType = (type: string) => {
    setSelectedTypes((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]);
  };

  function handleHeroChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setHeroFile(file); setHeroPreview(URL.createObjectURL(file));
  }

  async function handleSubmit() {
    if (!title || !tagline) { setError("Naslov in tagline sta obvezna."); return; }
    setError(""); setLoading(true);

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setError("Nisi prijavljen."); setLoading(false); return; }

    // Upload hero image
    let heroUrl: string | null = null;
    if (heroFile) {
      const path = `dozivetja/${Date.now()}-${heroFile.name}`;
      const { error: uploadErr } = await supabase.storage.from("slike").upload(path, heroFile, { upsert: true });
      if (!uploadErr) heroUrl = supabase.storage.from("slike").getPublicUrl(path).data.publicUrl;
    }

    // Upload GPX
    let gpxUrl: string | null = null;
    if (gpxFile) {
      const path = `dozivetja/${Date.now()}-${gpxFile.name}`;
      const { error: uploadErr } = await supabase.storage.from("gpx-files").upload(path, gpxFile, { upsert: true });
      if (!uploadErr) gpxUrl = supabase.storage.from("gpx-files").getPublicUrl(path).data.publicUrl;
    }

    // Clean steps
    const ritemClean = steps
      .filter(s => s.title.trim())
      .map(({ id: _id, ...rest }) => ({
        ...rest,
        provider_name: rest.provider_name || null,
        provider_link: rest.provider_link || null,
        attraction_name: rest.attraction_name || null,
        attraction_link: rest.attraction_link || null,
        posebnosti: rest.posebnosti.filter(p => p.trim()),
      }));

    const { error: dbError } = await supabase.from("dozivetja").insert({
      title, tagline, regija,
      obmocje: obmocje || null,
      zakaj: zakaj || null,
      tip: selectedTypes.length > 0 ? selectedTypes : null,
      hero_image: heroUrl,
      status,
      ritem_dneva: ritemClean,
      trasa_naslov: trasaNaslov || null,
      trasa_km: trasaKm || null,
      trasa_vm: trasaVm || null,
      trasa_cas: trasaCas || null,
      trasa_tip: trailType,
      trasa_tezavnost: difficulty,
      trasa_asfalt: trasaAsfalt ? parseInt(trasaAsfalt) : 0,
      trasa_makadam: trasaMakadam ? parseInt(trasaMakadam) : 0,
      trasa_gozd: trasaGozd ? parseInt(trasaGozd) : 0,
      gpx_url: gpxUrl,
    });

    if (dbError) { setError("Napaka pri shranjevanju: " + dbError.message); setLoading(false); return; }
    router.push("/admin/dozivetja");
  }

  return (
    <AdminShell active="dozivetja">
      <div className="space-y-8">

        <section className="flex flex-col gap-5 rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Admin / Doživetja / Novo</div>
            <h1 className="mt-4 text-4xl font-black">Novo doživetje</h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-500">
              Sestavi dan korak za korakom. Vsak sklop je ena točka na javni strani.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/dozivetja" className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-zinc-300">← Nazaj</Link>
            <button onClick={handleSubmit} disabled={loading}
              className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black disabled:opacity-50">
              {loading ? "Shranjujem..." : "Shrani doživetje"}
            </button>
          </div>
        </section>

        {error && <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">{error}</div>}

        <div className="grid gap-8 xl:grid-cols-[1fr_320px]">
          <div className="space-y-8">

            {/* ── Osnovni podatki ── */}
            <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
              <div className="mb-6 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Osnovni podatki</div>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="col-span-2 space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Naslov doživetja *</span>
                  <input value={title} onChange={(e) => setTitle(e.target.value)}
                    placeholder="npr. Vinski kolesarski dan"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
                </label>
                <label className="col-span-2 space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Tagline (mood) *</span>
                  <input value={tagline} onChange={(e) => setTagline(e.target.value)}
                    placeholder="npr. Mehki vzponi, vinski razgledi, pogovor ob kozarcu."
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
                  <p className="text-xs text-zinc-600">Kratka atmosferska vrstica, prikaže se pod naslovom v heroju.</p>
                </label>
                <label className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Regija *</span>
                  <select value={regija} onChange={(e) => setRegija(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60">
                    {regions.map(r => <option key={r}>{r}</option>)}
                  </select>
                </label>
                <label className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Območje</span>
                  <input value={obmocje} onChange={(e) => setObmocje(e.target.value)} placeholder="npr. Pohorje"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
                </label>
                <label className="col-span-2 space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Zakaj ta dan?</span>
                  <textarea value={zakaj} onChange={(e) => setZakaj(e.target.value)}
                    placeholder="Kratka zgodba: zakaj je ta dan poseben, kemu je namenjen..."
                    rows={4} className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-8 outline-none focus:border-[#c58b46]/60" />
                </label>
              </div>
            </section>

            {/* ── Ritem dneva ── */}
            <section className="rounded-[32px] border border-[#c58b46]/20 bg-black/20 p-7">
              <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Ritem dneva</div>
              <p className="mb-7 text-sm leading-7 text-zinc-500">Dodaj sklope po vrstnem redu. Vsak sklop je en korak na javni strani.</p>
              <div className="space-y-4">
                {steps.map((step, i) => (
                  <StepCard key={step.id} step={step} index={i} total={steps.length}
                    onChange={updateStep} onRemove={removeStep}
                    onMoveUp={(idx) => moveStep(idx, -1)} onMoveDown={(idx) => moveStep(idx, 1)} />
                ))}
              </div>
              <button onClick={addStep}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-[20px] border border-dashed border-white/20 py-4 text-sm font-bold text-zinc-500 hover:border-[#c58b46]/40 hover:text-[#f4d7ad]">
                + Dodaj časovni sklop
              </button>
            </section>

            {/* ── Trasa v podatkih ── */}
            <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
              <div className="mb-6 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Trasa v podatkih</div>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="col-span-2 space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Naslov trase</span>
                  <input value={trasaNaslov} onChange={(e) => setTrasaNaslov(e.target.value)} placeholder="npr. Gozdna pot nad Pohorjem"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
                </label>
                <label className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Razdalja (km)</span>
                  <input value={trasaKm} onChange={(e) => setTrasaKm(e.target.value)} placeholder="npr. 32"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
                </label>
                <label className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Višinska razlika (vm)</span>
                  <input value={trasaVm} onChange={(e) => setTrasaVm(e.target.value)} placeholder="npr. 890"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
                </label>
                <label className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Čas</span>
                  <input value={trasaCas} onChange={(e) => setTrasaCas(e.target.value)} placeholder="npr. 3–5 ur"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
                </label>
                <label className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Tip trase</span>
                  <select value={trailType} onChange={(e) => setTrailType(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60">
                    {trailTypes.map(t => <option key={t}>{t}</option>)}
                  </select>
                </label>
                <div className="col-span-2 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Težavnost</span>
                  <div className="flex gap-3">
                    {difficulties.map((d) => (
                      <button key={d} type="button" onClick={() => setDifficulty(d)}
                        className={`flex-1 rounded-2xl border py-3.5 text-sm font-bold transition ${difficulty === d ? "border-[#c58b46]/60 bg-[#c58b46]/10 text-[#f4d7ad]" : "border-white/10 bg-[#07110b] text-zinc-400 hover:border-white/20"}`}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="col-span-2 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Podlaga (skupaj 100 %)</span>
                  <div className="grid grid-cols-3 gap-4">
                    {([["Asfalt %", trasaAsfalt, setTrasaAsfalt], ["Makadam %", trasaMakadam, setTrasaMakadam], ["Gozdna pot %", trasaGozd, setTrasaGozd]] as [string, string, (v: string) => void][]).map(([label, val, setter]) => (
                      <label key={label} className="space-y-1.5">
                        <span className="text-xs text-zinc-500">{label}</span>
                        <input type="number" min="0" max="100" value={val} onChange={(e) => setter(e.target.value)} placeholder="0"
                          className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-center outline-none focus:border-[#c58b46]/60" />
                      </label>
                    ))}
                  </div>
                </div>
                <div className="col-span-2 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">GPX datoteka</span>
                  {gpxFile ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                      <span className="text-emerald-300 text-sm font-bold">✅ {gpxFile.name}</span>
                      <button onClick={() => setGpxFile(null)} className="ml-auto text-xs text-zinc-500 hover:text-red-400">Odstrani</button>
                    </div>
                  ) : (
                    <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 bg-[#07110b] p-5 text-center hover:border-[#c58b46]/30">
                      <span className="text-2xl">📍</span>
                      <span className="text-sm text-zinc-500">Izberi .gpx datoteko</span>
                      <input type="file" accept=".gpx" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) setGpxFile(f); }} />
                    </label>
                  )}
                </div>
              </div>
            </section>

          </div>

          {/* ── Stranska kolona ── */}
          <div className="space-y-6">

            <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Status</div>
              <select value={status} onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none focus:border-[#c58b46]/60">
                <option value="draft">Osnutek</option>
                <option value="published">Objavljeno</option>
              </select>
              <p className="mt-3 text-xs text-zinc-600">Samo "Objavljeno" se prikaže na javni strani.</p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Hero slika *</div>
              <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[#07110b]">
                <div className="flex min-h-[160px] items-center justify-center bg-black/20 p-6 text-center">
                  {heroPreview ? (
                    <img src={heroPreview} alt="Hero" className="max-h-[180px] rounded-xl object-cover" />
                  ) : (
                    <div><div className="text-3xl">✨</div><p className="mt-3 text-xs text-zinc-500">Atmosferska slika dneva</p></div>
                  )}
                </div>
                <div className="border-t border-white/10 p-4">
                  <label className="flex cursor-pointer items-center justify-center rounded-full bg-[#c58b46] px-5 py-3 text-xs font-bold text-black">
                    {heroFile ? "Zamenjaj sliko" : "Izberi sliko"}
                    <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleHeroChange} />
                  </label>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Tip doživetja</div>
              <div className="space-y-2">
                {experienceTypes.map((type) => (
                  <label key={type} className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 hover:border-white/20">
                    <input type="checkbox" checked={selectedTypes.includes(type)} onChange={() => toggleType(type)} className="accent-[#c58b46]" />
                    <span className="text-sm font-semibold">{type}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>

        {error && <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">{error}</div>}

        <div className="flex justify-end gap-3 pb-8">
          <Link href="/admin/dozivetja" className="rounded-full border border-white/10 px-6 py-3.5 text-sm font-bold text-zinc-300">Prekliči</Link>
          <button onClick={handleSubmit} disabled={loading}
            className="rounded-full bg-[#c58b46] px-8 py-3.5 text-sm font-black text-black disabled:opacity-50">
            {loading ? "Shranjujem..." : "Shrani doživetje"}
          </button>
        </div>

      </div>
    </AdminShell>
  );
}
