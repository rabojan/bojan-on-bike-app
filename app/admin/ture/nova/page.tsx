"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import AdminShell from "@/components/AdminShell";
import ElevationChart from "@/components/ElevationChart";
import NearbyPOIPreview from "@/components/NearbyPOIPreview";
import { supabase } from "@/lib/supabase";
import { parseGpx, type ParsedGpx } from "@/lib/parseGpx";

const GpxMap = dynamic(() => import("@/components/GpxMap"), { ssr: false });

const regions = ["Štajerska", "Koroška", "Gorenjska", "Primorska", "Notranjska", "Dolenjska", "Prekmurje"];
const trailTypes = ["MTB", "Gravel", "E-bike friendly", "Bikepacking", "Cesta", "Family friendly"];
const difficulties = ["Lahka", "Srednja", "Zahtevna"];
const casOptions = ["1–2 uri", "2–3 ure", "3–5 ur", "5–7 ur", "Cel dan", "Več dni"];
const casUrMap: Record<string, number> = {
  "1–2 uri": 1.5, "2–3 ure": 2.5, "3–5 ur": 4, "5–7 ur": 6, "Cel dan": 8, "Več dni": 16,
};

type RitemKorak = { time: string; title: string; text: string };
type Poudarek = { badge: string; title: string; text: string; image?: string };

export default function AdminNovaTuraPage() {
  const router = useRouter();

  const [ime, setIme] = useState("");
  const [regija, setRegija] = useState("Štajerska");
  const [obmocje, setObmocje] = useState("");
  const [opis, setOpis] = useState("");
  const [prviVtis, setPrviVtis] = useState("");
  const [zakaj, setZakaj] = useState("");
  const [km, setKm] = useState("");
  const [vm, setVm] = useState("");
  const [cas, setCas] = useState("");
  const [tipi, setTipi] = useState<string[]>(["MTB"]);
  const [tezavnost, setTezavnost] = useState("Srednja");
  const [obcutek, setObcutek] = useState("");
  const [obcutki, setObcutki] = useState<string[]>([]);
  const [asfalt, setAsfalt] = useState("");
  const [makadam, setMakadam] = useState("");
  const [gozd, setGozd] = useState("");

  const surfaceSum = useMemo(
    () => (Number(asfalt) || 0) + (Number(makadam) || 0) + (Number(gozd) || 0),
    [asfalt, makadam, gozd],
  );

  useEffect(() => {
    supabase.from("obcutki").select("naziv").order("vrstni_red").then(({ data }) => {
      setObcutki((data ?? []).map((o: { naziv: string }) => o.naziv));
    });
  }, []);

  const [gpxFile, setGpxFile] = useState<File | null>(null);
  const [gpxParsed, setGpxParsed] = useState<ParsedGpx | null>(null);
  const [gpxError, setGpxError] = useState("");

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
  const [poudarekFiles, setPoudarekFiles] = useState<(File | null)[]>([null, null, null]);
  const [poudarekPreviews, setPoudarekPreviews] = useState<string[]>(["", "", ""]);

  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState("");

  const [galFiles, setGalFiles] = useState<(File | null)[]>(Array(8).fill(null));
  const [galPreviews, setGalPreviews] = useState<string[]>(Array(8).fill(""));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggleTip(tip: string) {
    setTipi((prev) => prev.includes(tip) ? prev.filter((t) => t !== tip) : [...prev, tip]);
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

  function handlePoudarekImageChange(i: number, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPoudarekFiles((prev) => prev.map((f, idx) => idx === i ? file : f));
    setPoudarekPreviews((prev) => prev.map((p, idx) => idx === i ? URL.createObjectURL(file) : p));
  }

  function handleHeroChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setHeroFile(file);
    setHeroPreview(URL.createObjectURL(file));
  }

  function handleGalChange(i: number, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setGalFiles((prev) => prev.map((f, idx) => idx === i ? file : f));
    setGalPreviews((prev) => prev.map((p, idx) => idx === i ? URL.createObjectURL(file) : p));
  }

  async function handleGpxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setGpxError(""); setGpxParsed(null);
    if (!file.name.toLowerCase().endsWith(".gpx")) { setGpxError("Prosim naloži .gpx datoteko"); return; }
    try {
      const text = await file.text();
      const result = parseGpx(text);
      if (result.km === 0) { setGpxError("GPX ne vsebuje slednih točk."); return; }
      setGpxFile(file);
      setGpxParsed(result);
      setKm(String(result.km));
      setVm(String(result.vm));
    } catch { setGpxError("Napaka pri branju GPX."); }
  }

  function sanitizeFilename(name: string): string {
    return name
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-zA-Z0-9._-]/g, "-")
      .replace(/-+/g, "-")
      .toLowerCase();
  }

  async function uploadImage(file: File, path: string): Promise<string | null> {
    const { error: uploadErr } = await supabase.storage.from("slike").upload(path, file, { upsert: true });
    if (uploadErr) return null;
    return supabase.storage.from("slike").getPublicUrl(path).data.publicUrl;
  }

  async function handleSubmit() {
    if (!ime || !opis || !zakaj) { setError("Ime, opis in namig so obvezni."); return; }
    setError(""); setLoading(true);

    const ts = Date.now();

    // Upload GPX
    let gpxUrl: string | null = null;
    if (gpxFile) {
      const filename = `admin/gpx/${ts}-${sanitizeFilename(gpxFile.name)}`;
      const { error: uploadError } = await supabase.storage.from("slike").upload(filename, gpxFile, { upsert: true });
      if (uploadError) {
        setError(`Napaka pri nalaganju GPX: ${uploadError.message}`);
        setLoading(false);
        return;
      }
      gpxUrl = supabase.storage.from("slike").getPublicUrl(filename).data.publicUrl;
    }

    // Upload hero image
    let heroUrl: string | null = null;
    if (heroFile) {
      heroUrl = await uploadImage(heroFile, `admin/${ts}-hero-${sanitizeFilename(heroFile.name)}`);
    }

    // Upload gallery images
    const galUrls: string[] = [];
    for (let i = 0; i < galFiles.length; i++) {
      const f = galFiles[i];
      if (f) {
        const url = await uploadImage(f, `admin/${ts}-gal${i}-${sanitizeFilename(f.name)}`);
        if (url) galUrls.push(url);
      }
    }

    const ritemClean = ritemDneva.filter(k => k.title.trim());

    // Upload poudarek images
    const poudarkyFinal: Poudarek[] = [];
    for (let i = 0; i < poudarki.length; i++) {
      const p = poudarki[i];
      if (!p.title.trim()) continue;
      let image: string | undefined = undefined;
      if (poudarekFiles[i]) {
        const url = await uploadImage(poudarekFiles[i]!, `admin/poudarki/${ts}-p${i}-${sanitizeFilename(poudarekFiles[i]!.name)}`);
        if (url) image = url;
      }
      poudarkyFinal.push({ ...p, ...(image ? { image } : {}) });
    }

    const { error: dbError } = await supabase.from("predlogi_tur").insert({
      ambasador_id: null,
      status: "approved",
      ime, regija,
      obmocje: obmocje || null,
      opis, zakaj,
      prvi_vtis: prviVtis || null,
      km: km ? parseFloat(km) : null,
      visinska_razlika: vm ? parseInt(vm) : null,
      cas_ur: cas ? (casUrMap[cas] ?? null) : null,
      tipi, tezavnost,
      obcutek: obcutek ? [obcutek] : null,
      podlaga_asfalt: asfalt ? parseInt(asfalt) : 0,
      podlaga_makadam: makadam ? parseInt(makadam) : 0,
      podlaga_gozd: gozd ? parseInt(gozd) : 0,
      gpx_url: gpxUrl,
      hero_image: heroUrl,
      ritem_dneva: ritemClean.length > 0 ? ritemClean : null,
      poudarki: poudarkyFinal.length > 0 ? poudarkyFinal : null,
      galerija: galUrls.length > 0 ? galUrls : null,
    });

    if (dbError) { setError("Napaka pri shranjevanju. Poskusi znova."); setLoading(false); return; }

    router.push("/admin/ture");
  }

  return (
    <AdminShell active="ture">
      <div className="space-y-8">

        {/* ── Glava ── */}
        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Admin / Ture / Nova</div>
              <h1 className="mt-4 font-serif text-4xl font-black italic leading-tight text-white">Dodaj novo turo.</h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">
                Tura bo ob shranjevanju takoj objavljena. Izpolni vse razdelke.
              </p>
            </div>
            <Link href="/admin/ture" className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">← Nazaj na ture</Link>
          </div>
        </section>

        {/* ── 1. GPX ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">GPX datoteka</div>
          <p className="mb-5 text-sm text-zinc-500">Razdalja in vzpon se izpolnita samodejno. Obiskovalci jo bodo lahko prenesli.</p>
          {!gpxParsed ? (
            <label className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-[24px] border-2 border-dashed border-white/10 bg-[#07110b] px-6 py-12 text-center transition hover:border-[#c58b46]/30">
              <div className="text-4xl">📍</div>
              <div>
                <div className="font-bold text-zinc-300">Klikni in izberi GPX datoteko</div>
                <div className="mt-1 text-sm text-zinc-500">Podpira format .gpx</div>
              </div>
              <input type="file" accept=".gpx" onChange={handleGpxChange} className="hidden" />
            </label>
          ) : (
            <div className="space-y-4">
              <div className="rounded-[24px] border border-emerald-500/20 bg-emerald-500/5 p-5">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <div className="font-bold text-emerald-300">GPX prebran: {gpxFile?.name}</div>
                    <div className="mt-1 text-sm text-zinc-400">
                      Razdalja: <span className="font-bold text-white">{gpxParsed.km} km</span>
                      {" · "}
                      Vzpon: <span className="font-bold text-white">{gpxParsed.vm} vm</span>
                      {" · "}
                      Višina: <span className="font-bold text-white">{gpxParsed.minEle}–{gpxParsed.maxEle} m</span>
                    </div>
                  </div>
                  <label className="ml-auto cursor-pointer rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-zinc-400 hover:border-white/20">
                    Zamenjaj
                    <input type="file" accept=".gpx" onChange={(e) => { setGpxFile(null); setGpxParsed(null); setKm(""); setVm(""); handleGpxChange(e); }} className="hidden" />
                  </label>
                </div>
              </div>

              {gpxParsed.points.length > 0 && (
                <div className="overflow-hidden rounded-[20px] border border-white/10" style={{ height: 300 }}>
                  <GpxMap points={gpxParsed.points} height={300} />
                </div>
              )}

              {gpxParsed.profile.length > 1 && (
                <ElevationChart
                  profile={gpxParsed.profile}
                  km={gpxParsed.km}
                  vm={gpxParsed.vm}
                  minEle={gpxParsed.minEle}
                  maxEle={gpxParsed.maxEle}
                />
              )}
            </div>
          )}
          {gpxError && <p className="mt-3 text-sm text-red-400">{gpxError}</p>}
        </section>

        {/* ── 1b. PONUDNIKI IN ZNAMENITOSTI OB TRASI ── */}
        {gpxParsed && gpxParsed.points.length > 0 && (
          <NearbyPOIPreview points={gpxParsed.points} />
        )}

        {/* ── 2. OSNOVNA INFORMACIJA ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Osnovna informacija</div>
          <p className="mb-5 text-sm text-zinc-500">Prikaže se v naslovu ture.</p>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="col-span-2 block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Ime ture *</span>
              <input value={ime} onChange={(e) => setIme(e.target.value)} placeholder="npr. Pohorski veliki krog do Areha"
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Regija *</span>
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

        {/* ── 3. OPIS TURE ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Opis ture</div>
          <p className="mb-5 text-sm text-zinc-500">Glavna zgodba, prikaže se pod naslovom na javni strani.</p>
          <textarea rows={5} value={opis} onChange={(e) => setOpis(e.target.value)}
            placeholder="Tura se začne pri... Gozd te popelje... Na vrhu se odpre razgled..."
            className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-7 outline-none focus:border-[#c58b46]/60" />
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-zinc-600">Prvih 160 znakov se prikaže pod naslovom ture.</span>
            <span className={opis.length > 160 ? "font-bold text-[#c58b46]" : "text-zinc-600"}>
              {opis.length} / 160+
            </span>
          </div>
        </section>

        {/* ── 4. PRVI VTIS ── */}
        <section className="rounded-[32px] border border-[#c58b46]/15 bg-[#c58b46]/5 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Prvi vtis o turi</div>
          <p className="mb-4 text-sm text-zinc-500">Prikaže se kot subtitle pod imenom ture v katalogu. Največ 90 znakov.</p>
          <textarea rows={2} maxLength={90} value={prviVtis} onChange={(e) => setPrviVtis(e.target.value)}
            placeholder="Kratek, udaren vtis — kaj kolesarj najprej začuti na tej turi."
            className="w-full resize-none rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-7 outline-none focus:border-[#c58b46]/60" />
          <div className={`mb-0 text-right text-xs font-bold ${prviVtis.length > 75 ? "text-amber-400" : "text-zinc-600"}`}>
            {90 - prviVtis.length} znakov preostane
          </div>
        </section>

        {/* ── 5. UREDNIŠKI NAMIG ── */}
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
          <p className="mb-5 text-sm text-zinc-500">5 korakov ki opišejo potek dneva: ura, naslov in kratek opis. Prikaže se kot časovnica na strani ture.</p>
          <div className="grid gap-4 md:grid-cols-5">
            {ritemDneva.map((korak, i) => (
              <div key={i} className="rounded-[20px] border border-white/10 bg-[#07110b] p-4">
                <div className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">Korak {i + 1}</div>
                <label className="mb-1 block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Ura</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="09:30"
                  maxLength={5}
                  value={korak.time}
                  onChange={(e) => handleTimeInput(i, e.target.value)}
                  className="mb-4 w-full rounded-xl border border-[#c58b46]/30 bg-black/30 px-3 py-2 text-center text-sm font-black text-[#c58b46] outline-none focus:border-[#c58b46]/60"
                />
                <label className="mb-1 block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Naslov</label>
                <input
                  value={korak.title}
                  onChange={(e) => updateRitem(i, "title", e.target.value)}
                  placeholder="npr. Zgodnji štart"
                  className="mb-4 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm font-bold outline-none focus:border-[#c58b46]/60"
                />
                <label className="mb-1 block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Opis</label>
                <textarea
                  rows={3}
                  value={korak.text}
                  onChange={(e) => updateRitem(i, "text", e.target.value)}
                  placeholder="Zjutraj so poti mirne..."
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs leading-6 text-zinc-400 outline-none focus:border-[#c58b46]/60"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. POUDARKI NA PROGI ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Poudarki na progi</div>
          <p className="mb-5 text-sm text-zinc-500">3 kartice ki izpostavijo posebne trenutke na trasi. Prikazane so kot galerija kart na strani ture.</p>
          <div className="space-y-4">
            {poudarki.map((p, i) => (
              <div key={i} className="rounded-[20px] border border-white/10 bg-[#07110b] p-4">
                <div className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-zinc-500">Poudarek {i + 1}</div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="space-y-1.5">
                    <span className="text-xs text-zinc-500">Oznaka / badge</span>
                    <input value={p.badge} onChange={(e) => updatePoudarek(i, "badge", e.target.value)}
                      placeholder="npr. km 4–12 ali razgled"
                      className="w-full rounded-xl border border-[#c58b46]/25 bg-black/20 px-3 py-2.5 text-sm font-bold text-[#f4d7ad] outline-none placeholder:font-normal placeholder:text-zinc-600 focus:border-[#c58b46]/60" />
                  </label>
                  <label className="space-y-1.5">
                    <span className="text-xs text-zinc-500">Naslov kartice</span>
                    <input value={p.title} onChange={(e) => updatePoudarek(i, "title", e.target.value)}
                      placeholder="npr. Flow skozi pohorske gozdove"
                      className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm outline-none focus:border-[#c58b46]/60" />
                  </label>
                </div>
                <label className="mt-3 block space-y-1.5">
                  <span className="text-xs text-zinc-500">Opis</span>
                  <textarea rows={2} value={p.text} onChange={(e) => updatePoudarek(i, "text", e.target.value)}
                    placeholder="Tura se začne z občutkom pobega iz mesta..."
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm leading-6 outline-none focus:border-[#c58b46]/60" />
                </label>
                <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-4">
                  {poudarekPreviews[i] ? (
                    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10">
                      <img src={poudarekPreviews[i]} alt="Predogled" className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-xl border border-dashed border-white/15 bg-black/20 text-lg text-zinc-600">🖼</div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <label className="cursor-pointer rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-zinc-400 transition hover:border-[#c58b46]/40 hover:text-[#c58b46]">
                      {poudarekPreviews[i] ? "Zamenjaj sliko" : "Dodaj sliko"}
                      <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
                        onChange={(e) => handlePoudarekImageChange(i, e)} />
                    </label>
                    {poudarekPreviews[i] && (
                      <button type="button" onClick={() => {
                        setPoudarekFiles((prev) => prev.map((f, idx) => idx === i ? null : f));
                        setPoudarekPreviews((prev) => prev.map((pr, idx) => idx === i ? "" : pr));
                      }} className="rounded-full border border-red-500/20 px-4 py-2 text-xs font-bold text-red-400 transition hover:bg-red-500/10">
                        Odstrani
                      </button>
                    )}
                  </div>
                  <span className="ml-auto text-[10px] text-zinc-600">Slika je neobvezna.</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. TEHNIČNI PODATKI ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Tehnične podrobnosti</div>
          <p className="mb-5 text-sm text-zinc-500">Razdalja in vzpon se izpolnita iz GPX, ročno popravi samo če je treba.</p>
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="space-y-2">
                <span className="text-sm font-bold text-zinc-300">Dolžina trase (km)</span>
                <input type="number" value={km} onChange={(e) => setKm(e.target.value)} placeholder="45"
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3.5 text-sm outline-none focus:border-[#c58b46]/60" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-bold text-zinc-300">Skupni vzpon (vm)</span>
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
                <p className="text-xs text-zinc-500">Izberi vzdušje, ki najbolje opisuje to turo.</p>
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
              <p className="text-xs text-zinc-500">Skupna vsota mora biti točno 100 %.</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {([["Asfalt", asfalt, setAsfalt], ["Makadam", makadam, setMakadam], ["Gozdna pot", gozd, setGozd]] as [string, string, (v: string) => void][]).map(([label, val, setter]) => (
                  <label key={label} className="space-y-1.5">
                    <span className="text-xs text-zinc-500">{label}</span>
                    <input type="number" min="0" max="100" value={val} onChange={(e) => setter(e.target.value)} placeholder="0"
                      className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none focus:border-[#c58b46]/60" />
                  </label>
                ))}
              </div>
              <div className={`rounded-2xl border p-4 text-sm font-bold transition ${
                surfaceSum === 100 ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : surfaceSum === 0 ? "border-white/10 bg-black/20 text-zinc-500"
                : "border-red-500/30 bg-red-500/10 text-red-400"
              }`}>
                {surfaceSum === 100
                  ? "✓ Skupaj 100 %, podlaga je pravilno vnesena."
                  : surfaceSum === 0
                    ? "Vnesi deleže podlag (skupaj mora biti 100 %)."
                    : `Skupaj: ${surfaceSum} %, vsota mora biti točno 100 %.`}
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. SLIKE ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Galerija z utrinki</div>
          <p className="mb-5 text-sm text-zinc-500">Hero slika + do 8 slik v galeriji.</p>

          <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#07110b]">
            <div className="flex min-h-[180px] items-center justify-center bg-black/20 p-6 text-center">
              {heroPreview ? (
                <img src={heroPreview} alt="Hero predogled" className="max-h-[200px] rounded-xl object-cover" />
              ) : (
                <div>
                  <div className="text-4xl">🖼️</div>
                  <div className="mt-3 font-bold text-zinc-300">Hero slika ture</div>
                  <p className="mt-1 text-sm text-zinc-500">Glavna slika za katalog in vrh strani.</p>
                </div>
              )}
            </div>
            <div className="flex gap-3 border-t border-white/10 p-4">
              <label className="flex-1 cursor-pointer rounded-full bg-[#c58b46] px-4 py-2 text-center text-sm font-bold text-black transition hover:opacity-90">
                {heroFile ? "Zamenjaj hero sliko" : "Naloži hero sliko"}
                <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleHeroChange} />
              </label>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 text-sm font-bold text-zinc-300">Galerija <span className="font-normal text-zinc-600">(do 8 slik)</span></div>
            <div className="grid grid-cols-4 gap-3">
              {galFiles.map((_, i) => (
                <label key={i} className="group cursor-pointer">
                  <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/20 bg-black/20 transition group-hover:border-[#c58b46]/40">
                    {galPreviews[i] ? (
                      <img src={galPreviews[i]} alt={`Galerija ${i + 1}`} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-xl text-zinc-600 group-hover:text-zinc-400">+</span>
                    )}
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleGalChange(i, e)} />
                </label>
              ))}
            </div>
            <p className="mt-3 text-xs text-zinc-600">Klik na polje odpre izbiralnik datotek.</p>
          </div>
        </section>

        {error && <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">{error}</div>}

        <div className="flex justify-end gap-3">
          <Link href="/admin/ture" className="rounded-full border border-white/10 px-6 py-3.5 text-sm font-bold text-zinc-300 transition hover:border-white/20">Prekliči</Link>
          <button type="button" onClick={handleSubmit} disabled={loading}
            className="rounded-full bg-[#c58b46] px-8 py-3.5 text-sm font-black text-black transition hover:opacity-90 disabled:opacity-50">
            {loading ? "Shranjujem..." : "Objavi turo"}
          </button>
        </div>

      </div>
    </AdminShell>
  );
}
