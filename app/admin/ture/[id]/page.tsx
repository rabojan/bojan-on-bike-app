"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminShell from "@/components/AdminShell";
import { supabase } from "@/lib/supabase";

const regions = ["Štajerska", "Koroška", "Gorenjska", "Primorska", "Notranjska", "Dolenjska", "Prekmurje"];
const trailTypes = ["MTB", "Gravel", "E-bike friendly", "Bikepacking", "Cesta", "Family friendly"];
const difficulties = ["Lahka", "Srednja", "Zahtevna"];
const casOptions = ["1–2 uri", "2–3 ure", "3–5 ur", "5–7 ur", "Cel dan", "Več dni"];
const casUrMap: Record<string, number> = {
  "1–2 uri": 1.5, "2–3 ure": 2.5, "3–5 ur": 4, "5–7 ur": 6, "Cel dan": 8, "Več dni": 16,
};
const casUrToLabel = (v: number | null): string => {
  if (!v) return "";
  if (v <= 1.5) return "1–2 uri";
  if (v <= 2.5) return "2–3 ure";
  if (v <= 4) return "3–5 ur";
  if (v <= 6) return "5–7 ur";
  if (v <= 8) return "Cel dan";
  return "Več dni";
};

const ciljneSkupine = [
  "Za družine",
  "Za pare",
  "Za pustolovce",
  "E-bike friendly",
  "Vinska pot",
  "Gorski pobeg",
  "Vikend pobeg",
];

type RitemKorak = { time: string; title: string; text: string };
type Poudarek = { badge: string; title: string; text: string; image?: string };

export default function AdminUrediTuroPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Osnova
  const [ime, setIme] = useState("");
  const [regija, setRegija] = useState("Štajerska");
  const [obmocje, setObmocje] = useState("");
  const [opis, setOpis] = useState("");
  const [prviVtis, setPrviVtis] = useState("");
  const [zakaj, setZakaj] = useState("");
  const [km, setKm] = useState("");
  const [vm, setVm] = useState("");
  const [cas, setCas] = useState("");
  const [tipi, setTipi] = useState<string[]>([]);
  const [tezavnost, setTezavnost] = useState("Srednja");
  const [obcutek, setObcutek] = useState("");
  const [obcutki, setObcutki] = useState<string[]>([]);
  const [asfalt, setAsfalt] = useState("");
  const [makadam, setMakadam] = useState("");
  const [gozd, setGozd] = useState("");
  const [status, setStatus] = useState("approved");
  const [ritemDneva, setRitemDneva] = useState<RitemKorak[]>([
    { time: "", title: "", text: "" },
    { time: "", title: "", text: "" },
    { time: "", title: "", text: "" },
    { time: "", title: "", text: "" },
    { time: "", title: "", text: "" },
  ]);
  const [poudarki, setPoudarki] = useState<Poudarek[]>([
    { badge: "", title: "", text: "" },
    { badge: "", title: "", text: "" },
    { badge: "", title: "", text: "" },
  ]);

  // Doživetje
  const [jeDoziveto, setJeDoziveto] = useState(false);
  const [dozivetNaslov, setDozivetNaslov] = useState("");
  const [dozivetCiljna, setDozivetCiljna] = useState<string[]>([]);
  const [dozivetUvod, setDozivetUvod] = useState("");
  const [dozivetPodnaslov, setDozivetPodnaslov] = useState("");

  const surfaceSum = useMemo(
    () => (Number(asfalt) || 0) + (Number(makadam) || 0) + (Number(gozd) || 0),
    [asfalt, makadam, gozd],
  );

  useEffect(() => {
    supabase.from("obcutki").select("naziv").order("vrstni_red").then(({ data }) => {
      setObcutki((data ?? []).map((o: { naziv: string }) => o.naziv));
    });
  }, []);

  useEffect(() => {
    if (!id) return;
    supabase.from("predlogi_tur").select("*").eq("id", id).single().then(({ data }) => {
      if (!data) { setError("Tura ni bila najdena."); setLoading(false); return; }
      setIme(data.ime ?? "");
      setRegija(data.regija ?? "Štajerska");
      setObmocje(data.obmocje ?? "");
      setOpis(data.opis ?? "");
      setPrviVtis(data.prvi_vtis ?? "");
      setZakaj(data.zakaj ?? "");
      setKm(data.km != null ? String(data.km) : "");
      setVm(data.visinska_razlika != null ? String(data.visinska_razlika) : "");
      setCas(casUrToLabel(data.cas_ur));
      setTipi(data.tipi ?? []);
      setTezavnost(data.tezavnost ?? "Srednja");
      setObcutek((data.obcutek ?? [])[0] ?? "");
      setAsfalt(data.podlaga_asfalt != null ? String(data.podlaga_asfalt) : "");
      setMakadam(data.podlaga_makadam != null ? String(data.podlaga_makadam) : "");
      setGozd(data.podlaga_gozd != null ? String(data.podlaga_gozd) : "");
      setStatus(data.status ?? "approved");
      if (Array.isArray(data.ritem_dneva) && data.ritem_dneva.length > 0) {
        const filled = data.ritem_dneva.slice(0, 5);
        const padded = [...filled, ...Array(5 - filled.length).fill({ time: "", title: "", text: "" })];
        setRitemDneva(padded);
      }
      if (Array.isArray(data.poudarki) && data.poudarki.length > 0) {
        const filled = data.poudarki.slice(0, 3);
        const padded = [...filled, ...Array(3 - filled.length).fill({ badge: "", title: "", text: "" })];
        setPoudarki(padded);
      }
      setJeDoziveto(data.je_doziveto ?? false);
      setDozivetNaslov(data.doziveto_naslov ?? "");
      setDozivetCiljna(data.doziveto_ciljna_skupina ?? []);
      setDozivetUvod(data.doziveto_uvod ?? "");
      setDozivetPodnaslov(data.doziveto_podnaslov ?? "");
      setLoading(false);
    });
  }, [id]);

  function toggleTip(tip: string) {
    setTipi((prev) => prev.includes(tip) ? prev.filter((t) => t !== tip) : [...prev, tip]);
  }

  function toggleCiljna(skupina: string) {
    setDozivetCiljna((prev) => prev.includes(skupina) ? prev.filter((s) => s !== skupina) : [...prev, skupina]);
  }

  function updateRitem(i: number, field: keyof RitemKorak, value: string) {
    setRitemDneva((prev) => prev.map((k, idx) => idx === i ? { ...k, [field]: value } : k));
  }

  function handleTimeInput(i: number, raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, 4);
    const formatted = digits.length > 2 ? digits.slice(0, 2) + ":" + digits.slice(2) : digits;
    updateRitem(i, "time", formatted);
  }

  function updatePoudarek(i: number, field: keyof Poudarek, value: string) {
    setPoudarki((prev) => prev.map((p, idx) => idx === i ? { ...p, [field]: value } : p));
  }

  async function handleSubmit() {
    if (!ime) { setError("Ime ture je obvezno."); return; }
    setError(""); setSaving(true); setSuccess(false);

    const ritemClean = ritemDneva.filter(k => k.title.trim());
    const poudarkyClean = poudarki.filter(p => p.title.trim());

    const { error: dbError } = await supabase.from("predlogi_tur").update({
      ime, regija,
      obmocje: obmocje || null,
      opis: opis || null,
      prvi_vtis: prviVtis || null,
      zakaj: zakaj || null,
      km: km ? parseFloat(km) : null,
      visinska_razlika: vm ? parseInt(vm) : null,
      cas_ur: cas ? (casUrMap[cas] ?? null) : null,
      tipi, tezavnost,
      obcutek: obcutek ? [obcutek] : null,
      podlaga_asfalt: asfalt ? parseInt(asfalt) : 0,
      podlaga_makadam: makadam ? parseInt(makadam) : 0,
      podlaga_gozd: gozd ? parseInt(gozd) : 0,
      status,
      ritem_dneva: ritemClean.length > 0 ? ritemClean : null,
      poudarki: poudarkyClean.length > 0 ? poudarkyClean : null,
      je_doziveto: jeDoziveto,
      doziveto_naslov: jeDoziveto ? (dozivetNaslov || null) : null,
      doziveto_ciljna_skupina: jeDoziveto ? (dozivetCiljna.length > 0 ? dozivetCiljna : null) : null,
      doziveto_uvod: jeDoziveto ? (dozivetUvod || null) : null,
      doziveto_podnaslov: jeDoziveto ? (dozivetPodnaslov || null) : null,
    }).eq("id", id);

    setSaving(false);
    if (dbError) { setError("Napaka pri shranjevanju: " + dbError.message); return; }
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  }

  if (loading) {
    return (
      <AdminShell active="ture">
        <div className="py-20 text-center text-zinc-500">Nalagam turo...</div>
      </AdminShell>
    );
  }

  return (
    <AdminShell active="ture">
      <div className="space-y-8">

        {/* ── Glava ── */}
        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Admin / Ture / Uredi</div>
              <h1 className="mt-4 font-serif text-4xl font-black italic leading-tight text-white">{ime || "Uredi turo"}</h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">
                Uredi podatke ture. Spremembe se shranijo takoj.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/admin/ture" className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">← Nazaj na ture</Link>
              <Link href={`/ture/${id}`} target="_blank" className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">Predogled →</Link>
            </div>
          </div>
        </section>

        {/* ── 1. OSNOVNA INFORMACIJA ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Osnovna informacija</div>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="col-span-2 block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Ime ture *</span>
              <input value={ime} onChange={(e) => setIme(e.target.value)} placeholder="npr. Pohorski veliki krog do Areha"
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Regija</span>
              <select value={regija} onChange={(e) => setRegija(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60">
                {regions.map((r) => <option key={r}>{r}</option>)}
              </select>
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Območje</span>
              <input value={obmocje} onChange={(e) => setObmocje(e.target.value)} placeholder="npr. Pohorje"
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
            </label>
          </div>
        </section>

        {/* ── 2. OPIS ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Opis ture</div>
          <textarea rows={3} maxLength={160} value={opis} onChange={(e) => setOpis(e.target.value)}
            placeholder="Tura se začne pri..."
            className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-7 outline-none focus:border-[#c58b46]/60" />
          <div className="mt-2 flex justify-end text-xs">
            <span className={opis.length >= 150 ? "font-bold text-[#c58b46]" : "text-zinc-600"}>
              {opis.length} / 160
            </span>
          </div>
        </section>

        {/* ── 3. KRATEK OPIS ── */}
        <section className="rounded-[32px] border border-[#c58b46]/15 bg-[#c58b46]/5 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Kratek opis ture</div>
          <p className="mb-4 text-sm text-zinc-500">Prikaže se pod naslovom na javni strani. Največ 90 znakov.</p>
          <textarea rows={2} maxLength={90} value={prviVtis} onChange={(e) => setPrviVtis(e.target.value)}
            placeholder="Kratek, udaren vtis — kaj kolesarj najprej začuti na tej turi."
            className="w-full resize-none rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-7 outline-none focus:border-[#c58b46]/60" />
          <div className={`text-right text-xs font-bold ${prviVtis.length > 75 ? "text-amber-400" : "text-zinc-600"}`}>
            {90 - prviVtis.length} znakov preostane
          </div>
        </section>

        {/* ── 4. AMBASADORJEV NAMIG ── */}
        <section className="rounded-[32px] border border-[#c58b46]/15 bg-[#c58b46]/5 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Ambasadorjev namig</div>
          <p className="mb-5 text-sm text-zinc-500">Osebni citat, prikaže se na strani ture kot izpostavljeni namig.</p>
          <textarea rows={3} value={zakaj} onChange={(e) => setZakaj(e.target.value)}
            placeholder="Najlepše je, ko se megla še dviga med drevesi..."
            className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-7 outline-none focus:border-[#c58b46]/60" />
        </section>

        {/* ── 5. RITEM DNEVA ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Ritem dneva</div>
          <p className="mb-5 text-sm text-zinc-500">5 korakov ki opišejo potek dneva.</p>
          <div className="grid gap-4 md:grid-cols-5">
            {ritemDneva.map((korak, i) => (
              <div key={i} className="rounded-[20px] border border-white/10 bg-[#07110b] p-4">
                <div className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">Korak {i + 1}</div>
                <label className="mb-1 block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Ura</label>
                <input type="text" inputMode="numeric" placeholder="09:30" maxLength={5}
                  value={korak.time} onChange={(e) => handleTimeInput(i, e.target.value)}
                  className="mb-4 w-full rounded-xl border border-[#c58b46]/30 bg-black/30 px-3 py-2 text-center text-sm font-black text-[#c58b46] outline-none focus:border-[#c58b46]/60" />
                <label className="mb-1 block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Naslov</label>
                <input value={korak.title} onChange={(e) => updateRitem(i, "title", e.target.value)}
                  placeholder="npr. Zgodnji štart"
                  className="mb-4 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm font-bold outline-none focus:border-[#c58b46]/60" />
                <label className="mb-1 block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Opis</label>
                <textarea rows={3} value={korak.text} onChange={(e) => updateRitem(i, "text", e.target.value)}
                  placeholder="Zjutraj so poti mirne..."
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs leading-6 text-zinc-400 outline-none focus:border-[#c58b46]/60" />
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. POUDARKI ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Poudarki na progi</div>
          <p className="mb-5 text-sm text-zinc-500">3 kartice ki izpostavijo posebne trenutke na trasi.</p>
          <div className="space-y-4">
            {poudarki.map((p, i) => (
              <div key={i} className="rounded-[20px] border border-white/10 bg-[#07110b] p-4">
                <div className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-zinc-500">Poudarek {i + 1}</div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="space-y-1.5">
                    <span className="text-xs text-zinc-500">Oznaka / badge</span>
                    <input value={p.badge} onChange={(e) => updatePoudarek(i, "badge", e.target.value)}
                      placeholder="npr. km 4–12"
                      className="w-full rounded-xl border border-[#c58b46]/25 bg-black/20 px-3 py-2.5 text-sm font-bold text-[#f4d7ad] outline-none placeholder:font-normal placeholder:text-zinc-600 focus:border-[#c58b46]/60" />
                  </label>
                  <label className="space-y-1.5">
                    <span className="text-xs text-zinc-500">Naslov kartice</span>
                    <input value={p.title} onChange={(e) => updatePoudarek(i, "title", e.target.value)}
                      placeholder="npr. Flow skozi gozdove"
                      className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm outline-none focus:border-[#c58b46]/60" />
                  </label>
                </div>
                <label className="mt-3 block space-y-1.5">
                  <span className="text-xs text-zinc-500">Opis</span>
                  <textarea rows={2} value={p.text} onChange={(e) => updatePoudarek(i, "text", e.target.value)}
                    placeholder="Tura se začne z občutkom pobega iz mesta..."
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm leading-6 outline-none focus:border-[#c58b46]/60" />
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. TEHNIČNI PODATKI ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Tehnične podrobnosti</div>
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="space-y-2">
                <span className="text-sm font-bold text-zinc-300">Dolžina (km)</span>
                <input type="number" value={km} onChange={(e) => setKm(e.target.value)} placeholder="45"
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3.5 text-sm outline-none focus:border-[#c58b46]/60" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-bold text-zinc-300">Vzpon (vm)</span>
                <input type="number" value={vm} onChange={(e) => setVm(e.target.value)} placeholder="1200"
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3.5 text-sm outline-none focus:border-[#c58b46]/60" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-bold text-zinc-300">Ocenjeni čas</span>
                <select value={cas} onChange={(e) => setCas(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3.5 text-sm outline-none focus:border-[#c58b46]/60">
                  <option value="">Izberi...</option>
                  {casOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-bold text-zinc-300">Tip trase</span>
              <div className="flex flex-wrap gap-2">
                {trailTypes.map((t) => (
                  <button key={t} type="button" onClick={() => toggleTip(t)}
                    className={`rounded-full border px-5 py-2.5 text-sm font-bold transition ${tipi.includes(t) ? "border-[#c58b46]/60 bg-[#c58b46]/10 text-[#f4d7ad]" : "border-white/10 bg-[#07110b] text-zinc-400 hover:border-white/20"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {obcutki.length > 0 && (
              <label className="block space-y-2">
                <span className="text-sm font-bold text-zinc-300">Občutek ture</span>
                <select value={obcutek} onChange={(e) => setObcutek(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 text-sm outline-none focus:border-[#c58b46]/60">
                  <option value="">Izberi občutek...</option>
                  {obcutki.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </label>
            )}

            <div className="space-y-2">
              <span className="text-sm font-bold text-zinc-300">Zahtevnost</span>
              <div className="flex gap-3">
                {difficulties.map((d) => (
                  <button key={d} type="button" onClick={() => setTezavnost(d)}
                    className={`flex-1 rounded-2xl border py-3.5 text-sm font-bold transition ${tezavnost === d ? "border-[#c58b46]/60 bg-[#c58b46]/10 text-[#f4d7ad]" : "border-white/10 bg-[#07110b] text-zinc-400 hover:border-white/20"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-sm font-bold text-zinc-300">Sestava podlage (%)</span>
              <div className="grid gap-3 sm:grid-cols-3">
                {([["Asfalt", asfalt, setAsfalt], ["Makadam", makadam, setMakadam], ["Gozdna pot", gozd, setGozd]] as [string, string, (v: string) => void][]).map(([label, val, setter]) => (
                  <label key={label} className="space-y-1.5">
                    <span className="text-xs text-zinc-500">{label}</span>
                    <input type="number" min="0" max="100" value={val} onChange={(e) => setter(e.target.value)} placeholder="0"
                      className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none focus:border-[#c58b46]/60" />
                  </label>
                ))}
              </div>
              <div className={`rounded-2xl border p-4 text-sm font-bold ${
                surfaceSum === 100 ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : surfaceSum === 0 ? "border-white/10 bg-black/20 text-zinc-500"
                : "border-red-500/30 bg-red-500/10 text-red-400"
              }`}>
                {surfaceSum === 100 ? "✓ Skupaj 100 %" : surfaceSum === 0 ? "Vnesi deleže podlag." : `Skupaj: ${surfaceSum} % (mora biti 100 %)`}
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. STATUS ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Status objave</div>
          <select value={status} onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60">
            <option value="approved">Objavljeno</option>
            <option value="pending">Čaka na objavo</option>
            <option value="revision">V dopolnitvi</option>
            <option value="rejected">Zavrnjeno</option>
          </select>
        </section>

        {/* ── 9. DOŽIVETJE ── */}
        <section className={`rounded-[32px] border p-7 transition ${jeDoziveto ? "border-[#c58b46]/40 bg-[#c58b46]/5" : "border-white/10 bg-black/20"}`}>
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Doživetje</div>
          <p className="mb-6 text-sm text-zinc-500">
            Ko označiš turo kot doživetje, se pojavi tudi na strani /doživetja z zgodbenim prikazom. Na /ture ostane vidna kot prej.
          </p>

          <label className="flex cursor-pointer items-center gap-4">
            <div className={`relative h-7 w-12 rounded-full transition ${jeDoziveto ? "bg-[#c58b46]" : "bg-white/10"}`}>
              <div className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${jeDoziveto ? "left-6" : "left-1"}`} />
            </div>
            <input type="checkbox" checked={jeDoziveto} onChange={(e) => setJeDoziveto(e.target.checked)} className="hidden" />
            <span className="text-sm font-bold text-zinc-300">
              {jeDoziveto ? "Ta tura je označena kot doživetje 🏆" : "Označi kot doživetje"}
            </span>
          </label>

          {jeDoziveto && (
            <div className="mt-7 space-y-6">
              <label className="block space-y-2">
                <span className="text-sm font-bold text-zinc-300">Naslov doživetja</span>
                <p className="text-xs text-zinc-500">Zgodbeni naslov — ne ime ture. npr. "Dan v pohorskem gozdu"</p>
                <input value={dozivetNaslov} onChange={(e) => setDozivetNaslov(e.target.value)}
                  placeholder="npr. Družinski dan na Pohorju"
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-bold text-zinc-300">Podnaslov doživetja</span>
                <p className="text-xs text-zinc-500">Kratek opis vzdušja dneva. Prikaže se pod naslovom. Največ 90 znakov.</p>
                <textarea rows={2} maxLength={90} value={dozivetPodnaslov} onChange={(e) => setDozivetPodnaslov(e.target.value)}
                  placeholder="npr. Gozd, razgled, kosilo — cel dan brez hitenja."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-7 outline-none focus:border-[#c58b46]/60" />
                <div className={`text-right text-xs font-bold ${dozivetPodnaslov.length > 75 ? "text-amber-400" : "text-zinc-600"}`}>
                  {90 - dozivetPodnaslov.length} znakov preostane
                </div>
              </label>

              <div className="space-y-3">
                <span className="text-sm font-bold text-zinc-300">Ciljna skupina</span>
                <p className="text-xs text-zinc-500">Izberi vse ki ustrezajo.</p>
                <div className="flex flex-wrap gap-2">
                  {ciljneSkupine.map((skupina) => (
                    <button key={skupina} type="button" onClick={() => toggleCiljna(skupina)}
                      className={`rounded-full border px-5 py-2.5 text-sm font-bold transition ${dozivetCiljna.includes(skupina) ? "border-[#c58b46]/60 bg-[#c58b46]/10 text-[#f4d7ad]" : "border-white/10 bg-[#07110b] text-zinc-400 hover:border-white/20"}`}>
                      {skupina}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block space-y-2">
                <span className="text-sm font-bold text-zinc-300">Uredniški uvod</span>
                <p className="text-xs text-zinc-500">Bojanov glas — zakaj je ta dan poseben. Prikaže se na vrhu strani doživetja.</p>
                <textarea rows={4} value={dozivetUvod} onChange={(e) => setDozivetUvod(e.target.value)}
                  placeholder="Pohorje pozimi ni samo za smučarje. Ko je gozd tih in snega dovolj..."
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-7 outline-none focus:border-[#c58b46]/60" />
              </label>
            </div>
          )}
        </section>

        {error && <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">{error}</div>}
        {success && <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">✓ Shranjeno uspešno.</div>}

        <div className="flex justify-end gap-3">
          <Link href="/admin/ture" className="rounded-full border border-white/10 px-6 py-3.5 text-sm font-bold text-zinc-300 transition hover:border-white/20">Prekliči</Link>
          <button type="button" onClick={handleSubmit} disabled={saving}
            className="rounded-full bg-[#c58b46] px-8 py-3.5 text-sm font-black text-black transition hover:opacity-90 disabled:opacity-50">
            {saving ? "Shranjujem..." : "Shrani spremembe"}
          </button>
        </div>

      </div>
    </AdminShell>
  );
}
