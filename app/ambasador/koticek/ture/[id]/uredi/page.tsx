"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import AmbassadorShell from "@/components/AmbassadorShell";
import ElevationChart from "@/components/ElevationChart";
import { supabase } from "@/lib/supabase";
import { parseGpx, type ParsedGpx } from "@/lib/parseGpx";

const GpxMap = dynamic(() => import("@/components/GpxMap"), { ssr: false });

const regions = ["Štajerska", "Koroška", "Gorenjska", "Primorska", "Notranjska", "Dolenjska", "Prekmurje"];
const trailTypes = ["MTB", "Gravel", "E-bike", "Bikepacking", "Cesta"];
const difficulties = ["Lahka", "Srednja", "Zahtevna"];
const casOptions = ["1–2 uri", "2–3 ure", "3–5 ur", "5–7 ur", "Cel dan", "Več dni"];
const casUrMap: Record<string, number> = {
  "1–2 uri": 1.5, "2–3 ure": 2.5, "3–5 ur": 4, "5–7 ur": 6, "Cel dan": 8, "Več dni": 16,
};

function casUrToDisplay(casUr: number | null): string {
  if (!casUr) return "";
  let best = "";
  let bestDiff = Infinity;
  for (const [label, val] of Object.entries(casUrMap)) {
    const diff = Math.abs(val - casUr);
    if (diff < bestDiff) { bestDiff = diff; best = label; }
  }
  return best;
}

type RitemKorak = { time: string; title: string; text: string };
type Poudarek = { badge: string; title: string; text: string; image?: string };

export default function UrejiTuroPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loadingData, setLoadingData] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [billaObjavljena, setBilaObjavljena] = useState(false);

  // Existing data refs
  const [existingHeroUrl, setExistingHeroUrl] = useState<string | null>(null);
  const [existingGpxUrl, setExistingGpxUrl] = useState<string | null>(null);
  const [existingGalerija, setExistingGalerija] = useState<string[]>([]);

  // Form fields
  const [ime, setIme] = useState("");
  const [regija, setRegija] = useState("Štajerska");
  const [obmocje, setObmocje] = useState("");
  const [opis, setOpis] = useState("");
  const [zakaj, setZakaj] = useState("");
  const [km, setKm] = useState("");
  const [vm, setVm] = useState("");
  const [cas, setCas] = useState("");
  const [tipi, setTipi] = useState<string[]>(["MTB"]);
  const [tezavnost, setTezavnost] = useState("Srednja");
  const [asfalt, setAsfalt] = useState("");
  const [makadam, setMakadam] = useState("");
  const [gozd, setGozd] = useState("");

  const surfaceSum = useMemo(
    () => (Number(asfalt) || 0) + (Number(makadam) || 0) + (Number(gozd) || 0),
    [asfalt, makadam, gozd],
  );

  const [gpxFile, setGpxFile] = useState<File | null>(null);
  const [gpxParsed, setGpxParsed] = useState<ParsedGpx | null>(null);
  const [gpxError, setGpxError] = useState("");
  const [gpxFetchLoading, setGpxFetchLoading] = useState(false);
  const [gpxFetchError, setGpxFetchError] = useState<string | null>(null);

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

  // Naloži obstoječe podatke
  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push("/ambasador/prijava"); return; }

      const { data: profil } = await supabase
        .from("ambasadorji").select("id").eq("user_id", session.user.id).single();
      if (!profil) { setNotFound(true); setLoadingData(false); return; }

      const { data, error: fetchErr } = await supabase
        .from("predlogi_tur")
        .select("*")
        .eq("id", id)
        .eq("ambasador_id", profil.id)
        .single();

      if (fetchErr || !data) { setNotFound(true); setLoadingData(false); return; }

      setBilaObjavljena(data.status === "approved");

      // Predizpolni polja
      setIme(data.ime ?? "");
      setRegija(data.regija ?? "Štajerska");
      setObmocje(data.obmocje ?? "");
      setOpis(data.opis ?? "");
      setZakaj(data.zakaj ?? "");
      setKm(data.km != null ? String(data.km) : "");
      setVm(data.visinska_razlika != null ? String(data.visinska_razlika) : "");
      setCas(casUrToDisplay(data.cas_ur));
      setTipi(data.tipi ?? ["MTB"]);
      setTezavnost(data.tezavnost ?? "Srednja");
      setAsfalt(data.podlaga_asfalt > 0 ? String(data.podlaga_asfalt) : "");
      setMakadam(data.podlaga_makadam > 0 ? String(data.podlaga_makadam) : "");
      setGozd(data.podlaga_gozd > 0 ? String(data.podlaga_gozd) : "");

      const initRitem = [...(data.ritem_dneva ?? [])];
      while (initRitem.length < 5) initRitem.push({ time: "", title: "", text: "" });
      setRitemDneva(initRitem.slice(0, 5));

      const initPoudarki: Poudarek[] = [...(data.poudarki ?? [])];
      while (initPoudarki.length < 3) initPoudarki.push({ badge: "", title: "", text: "" });
      const slicedPoudarki = initPoudarki.slice(0, 3);
      setPoudarki(slicedPoudarki);
      setPoudarekPreviews(slicedPoudarki.map((p) => p.image ?? ""));

      setExistingHeroUrl(data.hero_image ?? null);
      if (data.hero_image) setHeroPreview(data.hero_image);

      setExistingGpxUrl(data.gpx_url ?? null);

      // Fetchni in parsiraj obstoječi GPX, da se prikažeta mapa in profil
      if (data.gpx_url) {
        setGpxFetchLoading(true);
        try {
          const res = await fetch(data.gpx_url);
          if (res.ok) {
            const text = await res.text();
            const parsed = parseGpx(text);
            if (parsed.km > 0) {
              setGpxParsed(parsed);
            } else {
              setGpxFetchError("GPX datoteka ne vsebuje slednih točk.");
            }
          } else {
            setGpxFetchError(`HTTP ${res.status} — datoteka ni dostopna.`);
          }
        } catch (e) {
          setGpxFetchError(`Napaka: ${e instanceof Error ? e.message : "neznana napaka"}`);
        } finally {
          setGpxFetchLoading(false);
        }
      }

      const galerija = data.galerija ?? [];
      setExistingGalerija(galerija);
      const previews = Array(8).fill("") as string[];
      galerija.forEach((url: string, i: number) => { if (i < 8) previews[i] = url; });
      setGalPreviews(previews);

      setLoadingData(false);
    }
    load();
  }, [id, router]);

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

  async function retryGpxFetch() {
    if (!existingGpxUrl) return;
    setGpxFetchLoading(true);
    setGpxFetchError(null);
    try {
      const res = await fetch(existingGpxUrl);
      if (res.ok) {
        const text = await res.text();
        const parsed = parseGpx(text);
        if (parsed.km > 0) {
          setGpxParsed(parsed);
        } else {
          setGpxFetchError("GPX datoteka ne vsebuje slednih točk.");
        }
      } else {
        setGpxFetchError(`HTTP ${res.status} — datoteka ni dostopna.`);
      }
    } catch (e) {
      setGpxFetchError(`Napaka: ${e instanceof Error ? e.message : "neznana napaka"}`);
    } finally {
      setGpxFetchLoading(false);
    }
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
      setGpxFile(file); setGpxParsed(result); setKm(String(result.km)); setVm(String(result.vm));
    } catch { setGpxError("Napaka pri branju GPX."); }
  }
  async function uploadImage(file: File, path: string): Promise<string | null> {
    const { error: uploadErr } = await supabase.storage.from("slike").upload(path, file, { upsert: true });
    if (uploadErr) return null;
    return supabase.storage.from("slike").getPublicUrl(path).data.publicUrl;
  }

  async function handleSubmit() {
    if (!ime || !opis || !zakaj) { setError("Ime, opis in ambasadorjev namig so obvezni."); return; }
    setError(""); setLoading(true);

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setError("Nisi prijavljen."); setLoading(false); return; }

    const { data: profil } = await supabase.from("ambasadorji").select("id, ime, regija").eq("user_id", session.user.id).single();
    if (!profil) { setError("Ambasadorski profil ni najden."); setLoading(false); return; }

    // GPX v slike bucket
    let gpxUrl = existingGpxUrl;
    if (gpxFile) {
      const filename = `gpx/${profil.id}/${Date.now()}-${gpxFile.name}`;
      const { error: uploadError } = await supabase.storage.from("slike").upload(filename, gpxFile, { upsert: true });
      if (uploadError) {
        setError(`Napaka pri nalaganju GPX datoteke: ${uploadError.message}. Poskusi znova ali stopi v stik z administratorjem.`);
        setLoading(false);
        return;
      }
      gpxUrl = supabase.storage.from("slike").getPublicUrl(filename).data.publicUrl;
    }

    // Hero slika
    let heroUrl = existingHeroUrl;
    if (heroFile) heroUrl = await uploadImage(heroFile, `${profil.id}/${Date.now()}-hero-${heroFile.name}`);

    // Galerija — obdrži obstoječe, zamenjaj novo naložene
    const galUrls: string[] = [];
    for (let i = 0; i < 8; i++) {
      if (galFiles[i]) {
        const url = await uploadImage(galFiles[i]!, `${profil.id}/${Date.now()}-gal${i}-${galFiles[i]!.name}`);
        if (url) galUrls.push(url);
      } else if (existingGalerija[i]) {
        galUrls.push(existingGalerija[i]);
      }
    }

    const ritemClean = ritemDneva.filter(k => k.title.trim());

    // Upload poudarek images and build final array (preserve existing URLs)
    const poudarkyFinal: Poudarek[] = [];
    for (let i = 0; i < poudarki.length; i++) {
      const p = poudarki[i];
      if (!p.title.trim()) continue;
      let image: string | undefined = p.image; // keep existing
      if (poudarekFiles[i]) {
        const url = await uploadImage(poudarekFiles[i]!, `${profil.id}/poudarki/${Date.now()}-p${i}-${poudarekFiles[i]!.name}`);
        if (url) image = url;
      }
      poudarkyFinal.push({ ...p, ...(image ? { image } : { image: undefined }) });
    }

    const { error: dbError } = await supabase
      .from("predlogi_tur")
      .update({
        ime, regija,
        obmocje: obmocje || null,
        opis, zakaj,
        km: km ? parseFloat(km) : null,
        visinska_razlika: vm ? parseInt(vm) : null,
        cas_ur: cas ? (casUrMap[cas] ?? null) : null,
        tipi, tezavnost,
        podlaga_asfalt: asfalt ? parseInt(asfalt) : 0,
        podlaga_makadam: makadam ? parseInt(makadam) : 0,
        podlaga_gozd: gozd ? parseInt(gozd) : 0,
        gpx_url: gpxUrl,
        hero_image: heroUrl,
        ritem_dneva: ritemClean.length > 0 ? ritemClean : null,
        poudarki: poudarkyFinal.length > 0 ? poudarkyFinal : null,
        galerija: galUrls.length > 0 ? galUrls : null,
        status: "pending",
        admin_opomba: null,
      })
      .eq("id", id)
      .eq("ambasador_id", profil.id);

    if (dbError) { setError("Napaka pri shranjevanju. Poskusi znova."); setLoading(false); return; }

    // Obvesti admina o resubmitu — fire & forget
    fetch("/api/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "nova_prijava",
        predlogTip: "tura",
        predlogIme: ime,
        predlogRegija: regija,
        ambasadorIme: (profil as { id: string; ime?: string; regija?: string }).ime ?? null,
        ambasadorRegija: (profil as { id: string; ime?: string; regija?: string }).regija ?? null,
        km: km || null,
        vm: vm || null,
        tezavnost: tezavnost || null,
        jeRevizija: true,
        jeObjavljena: billaObjavljena,
      }),
    }).catch(() => {});

    router.push("/ambasador/koticek/ture");
  }

  if (loadingData) {
    return (
      <AmbassadorShell>
        <div className="flex min-h-[400px] items-center justify-center text-zinc-500">Nalagam...</div>
      </AmbassadorShell>
    );
  }

  if (notFound) {
    return (
      <AmbassadorShell>
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 text-center">
          <div className="text-5xl">🚵</div>
          <h1 className="font-serif text-3xl font-black italic">Tura ni najdena.</h1>
          <Link href="/ambasador/koticek/ture" className="rounded-full bg-[#c58b46] px-8 py-4 text-sm font-black text-black">← Nazaj</Link>
        </div>
      </AmbassadorShell>
    );
  }

  return (
    <AmbassadorShell>
      <div className="space-y-8">

        {/* ── Glava ── */}
        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Ambasadorski kotiček / Ture / Uredi</div>
              <h1 className="mt-4 font-serif text-4xl font-black italic leading-tight text-white">Uredi predlog ture.</h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">
                Po shranitvi bo predlog znova šel v uredniški pregled.
              </p>
            </div>
            <Link href="/ambasador/koticek/ture" className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">← Nazaj</Link>
          </div>
        </section>

        {/* ── Opozorilo za objavljeno turo ── */}
        {billaObjavljena && (
          <section className="rounded-[28px] border border-[#c58b46]/30 bg-[#c58b46]/8 p-6">
            <div className="flex items-start gap-4">
              <div className="text-2xl">⚠️</div>
              <div>
                <div className="font-black text-[#c58b46]">Posodabljanje objavljene ture</div>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-zinc-300">
                  Ta tura je trenutno objavljena na platformi. Ko shraniš spremembe, bo tura začasno umaknjena z objave in poslana v ponovni uredniški pregled. Administrator bo moral spremembe znova potrditi, preden bo tura spet vidna obiskovalcem.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ── 1. GPX ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">GPX datoteka</div>
          <p className="mb-5 text-sm text-zinc-500">Naloži novo datoteko samo če hočeš zamenjati obstoječo.</p>
          {gpxParsed ? (
            /* ── STANJE A: GPX uspešno parsiran (nov ali obstoječ) ── */
            <div className="space-y-4">
              <div className="rounded-[24px] border border-emerald-500/20 bg-emerald-500/5 p-5">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <div className="font-bold text-emerald-300">
                      {gpxFile ? `Nova GPX: ${gpxFile.name}` : "GPX datoteka naložena"}
                    </div>
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
                    <input type="file" accept=".gpx" onChange={(e) => { setGpxFile(null); setGpxParsed(null); handleGpxChange(e); }} className="hidden" />
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
          ) : existingGpxUrl ? (
            /* ── STANJE B: URL obstaja v bazi, predogled se ni naložil ── */
            <div className="rounded-[24px] border border-amber-500/20 bg-amber-500/5 p-5">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-2xl">{gpxFetchLoading ? "⏳" : "⚠️"}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-amber-300">
                    {gpxFetchLoading ? "Nalagam GPX..." : "GPX je shranjen — karta se ni naložila"}
                  </div>
                  <div className="mt-1 text-sm text-zinc-500">
                    {km && `${km} km`}{vm && ` · ${vm} vm`}
                  </div>
                  {!gpxFetchLoading && gpxFetchError && (
                    <div className="mt-2 text-xs text-red-400 font-mono break-all">
                      {gpxFetchError}
                    </div>
                  )}
                  {!gpxFetchLoading && (
                    <a
                      href={existingGpxUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-xs text-zinc-500 underline hover:text-zinc-300 break-all">
                      Odpri GPX datoteko ↗
                    </a>
                  )}
                </div>
                <div className="flex shrink-0 gap-2">
                  {!gpxFetchLoading && (
                    <button type="button" onClick={retryGpxFetch}
                      className="rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-zinc-400 transition hover:border-[#c58b46]/40 hover:text-[#c58b46]">
                      Ponovi nalaganje
                    </button>
                  )}
                  <label className="cursor-pointer rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-zinc-400 transition hover:border-white/20">
                    Zamenjaj GPX
                    <input type="file" accept=".gpx" onChange={handleGpxChange} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          ) : (
            /* ── STANJE C: Ni GPX — prikaži upload ── */
            <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[24px] border-2 border-dashed border-white/10 bg-[#07110b] px-6 py-8 text-center transition hover:border-[#c58b46]/30">
              <div className="text-3xl">📍</div>
              <div className="font-bold text-zinc-400 text-sm">Klikni in izberi GPX datoteko</div>
              <input type="file" accept=".gpx" onChange={handleGpxChange} className="hidden" />
            </label>
          )}
          {gpxError && <p className="mt-3 text-sm text-red-400">{gpxError}</p>}
        </section>

        {/* ── 2. OSNOVNA INFORMACIJA ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Osnovna informacija</div>
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
          <textarea rows={5} value={opis} onChange={(e) => setOpis(e.target.value)}
            placeholder="Tura se začne pri..."
            className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-7 outline-none focus:border-[#c58b46]/60" />
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-zinc-600">Prvih 160 znakov se prikaže pod naslovom ture.</span>
            <span className={opis.length > 160 ? "font-bold text-[#c58b46]" : "text-zinc-600"}>
              {opis.length} / 160+
            </span>
          </div>
        </section>

        {/* ── 4. AMBASADORJEV NAMIG ── */}
        <section className="rounded-[32px] border border-[#c58b46]/15 bg-[#c58b46]/5 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Ambasadorjev namig</div>
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
                <input type="text" inputMode="numeric" placeholder="09:30" maxLength={5} value={korak.time} onChange={(e) => handleTimeInput(i, e.target.value)}
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
                {/* Slika poudareka */}
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
                        updatePoudarek(i, "image", "");
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
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Tehnični podatki</div>
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="space-y-2">
                <span className="text-sm font-bold text-zinc-300">Razdalja (km)</span>
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
                  <option value="">— izberi —</option>
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

            <div className="space-y-2">
              <span className="text-sm font-bold text-zinc-300">Težavnost</span>
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
                {([["Asfalt", asfalt, setAsfalt], ["Makadam / gravel", makadam, setMakadam], ["Gozdna pot", gozd, setGozd]] as [string, string, (v: string) => void][]).map(([label, val, setter]) => (
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
                {surfaceSum === 100 ? "✓ Skupaj 100 %." : surfaceSum === 0 ? "Vnesi deleže podlag." : `Skupaj: ${surfaceSum} % — mora biti 100 %.`}
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. SLIKE ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Slike ture</div>
          <p className="mb-5 text-sm text-zinc-500">Naloži novo sliko samo če hočeš zamenjati obstoječo.</p>

          <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#07110b]">
            <div className="flex min-h-[160px] items-center justify-center bg-black/20 p-6 text-center">
              {heroPreview ? (
                <img src={heroPreview} alt="Hero predogled" className="max-h-[200px] rounded-xl object-cover" />
              ) : (
                <div>
                  <div className="text-4xl">🖼️</div>
                  <div className="mt-3 font-bold text-zinc-300">Hero slika ture</div>
                </div>
              )}
            </div>
            <div className="flex gap-3 border-t border-white/10 p-4">
              <label className="flex-1 cursor-pointer rounded-full bg-[#c58b46] px-4 py-2 text-center text-sm font-bold text-black transition hover:opacity-90">
                {heroPreview ? "Zamenjaj hero sliko" : "Naloži hero sliko"}
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
          </div>
        </section>

        {error && <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">{error}</div>}

        <div className="flex justify-end gap-3">
          <Link href="/ambasador/koticek/ture" className="rounded-full border border-white/10 px-6 py-3.5 text-sm font-bold text-zinc-300 transition hover:border-white/20">Prekliči</Link>
          <button type="button" onClick={handleSubmit} disabled={loading}
            className="rounded-full bg-[#c58b46] px-8 py-3.5 text-sm font-black text-black transition hover:opacity-90 disabled:opacity-50">
            {loading ? "Shranjujem..." : "Shrani in pošlji v pregled"}
          </button>
        </div>

      </div>
    </AmbassadorShell>
  );
}
