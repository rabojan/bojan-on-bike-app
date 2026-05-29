"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import AmbassadorShell from "@/components/AmbassadorShell";
import { supabase } from "@/lib/supabase";

const LocationPicker = dynamic(() => import("@/components/LocationPicker"), { ssr: false });

const regions = ["Štajerska", "Koroška", "Gorenjska", "Primorska", "Notranjska", "Dolenjska", "Prekmurje"];
const providerTypes = ["Planinska koča", "Restavracija", "Vinska klet", "Bike shop", "Hotel / apartma", "Kavarna / bistro", "Drugo"];

type Feature = { title: string; description: string };

export default function UrejiPonudnikaPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loadingData, setLoadingData] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [existingHeroUrl, setExistingHeroUrl] = useState<string | null>(null);
  const [existingGalerija, setExistingGalerija] = useState<string[]>([]);

  const [ime, setIme] = useState("");
  const [tip, setTip] = useState("");
  const [regija, setRegija] = useState("Štajerska");
  const [lokacija, setLokacija] = useState("");
  const [telefon, setTelefon] = useState("");
  const [spletna, setSpletna] = useState("");
  const [zakaj, setZakaj] = useState("");
  const [opis, setOpis] = useState("");
  const [bikeFriendly, setBikeFriendly] = useState("");
  const [citat, setCitat] = useState("");

  const [features, setFeatures] = useState<Feature[]>([
    { title: "", description: "" }, { title: "", description: "" },
    { title: "", description: "" }, { title: "", description: "" },
    { title: "", description: "" }, { title: "", description: "" },
  ]);

  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState("");
  const [galFiles, setGalFiles] = useState<(File | null)[]>(Array(6).fill(null));
  const [galPreviews, setGalPreviews] = useState<string[]>(Array(6).fill(""));

  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push("/ambasador/prijava"); return; }

      const { data: profil } = await supabase
        .from("ambasadorji").select("id").eq("user_id", session.user.id).single();
      if (!profil) { setNotFound(true); setLoadingData(false); return; }

      const { data, error: fetchErr } = await supabase
        .from("predlogi_ponudnikov")
        .select("*")
        .eq("id", id)
        .eq("ambasador_id", profil.id)
        .single();

      if (fetchErr || !data) { setNotFound(true); setLoadingData(false); return; }

      setIme(data.ime ?? "");
      setTip(data.tip ?? "");
      setRegija(data.regija ?? "Štajerska");
      setLokacija(data.lokacija ?? "");
      setTelefon(data.telefon ?? "");
      setSpletna(data.spletna_stran ?? "");
      setZakaj(data.zakaj ?? "");
      setOpis(data.opis ?? "");
      setBikeFriendly(data.bike_friendly_opis ?? "");
      setCitat(data.citat ?? "");

      const initFeatures = [...(data.features ?? [])];
      while (initFeatures.length < 6) initFeatures.push({ title: "", description: "" });
      setFeatures(initFeatures.slice(0, 6));

      setLat(data.lat ?? null);
      setLng(data.lng ?? null);

      setExistingHeroUrl(data.hero_image ?? null);
      if (data.hero_image) setHeroPreview(data.hero_image);

      const galerija = data.galerija ?? [];
      setExistingGalerija(galerija);
      const previews = Array(6).fill("") as string[];
      galerija.forEach((url: string, i: number) => { if (i < 6) previews[i] = url; });
      setGalPreviews(previews);

      setLoadingData(false);
    }
    load();
  }, [id, router]);

  function updateFeature(i: number, field: keyof Feature, value: string) {
    setFeatures((prev) => prev.map((f, idx) => idx === i ? { ...f, [field]: value } : f));
  }
  function handleHeroChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setHeroFile(file); setHeroPreview(URL.createObjectURL(file));
  }
  function handleGalChange(i: number, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setGalFiles((prev) => prev.map((f, idx) => idx === i ? file : f));
    setGalPreviews((prev) => prev.map((p, idx) => idx === i ? URL.createObjectURL(file) : p));
  }
  async function uploadImage(file: File, path: string): Promise<string | null> {
    const { error: uploadErr } = await supabase.storage.from("slike").upload(path, file, { upsert: true });
    if (uploadErr) return null;
    return supabase.storage.from("slike").getPublicUrl(path).data.publicUrl;
  }

  async function handleSubmit() {
    if (!ime || !zakaj || !opis) { setError("Ime, priporočilo in opis so obvezni."); return; }
    setError(""); setLoading(true);

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setError("Nisi prijavljen."); setLoading(false); return; }

    const { data: profil } = await supabase.from("ambasadorji").select("id, ime, regija").eq("user_id", session.user.id).single();
    if (!profil) { setError("Ambasadorski profil ni najden."); setLoading(false); return; }

    let heroUrl = existingHeroUrl;
    if (heroFile) heroUrl = await uploadImage(heroFile, `${profil.id}/${Date.now()}-hero-${heroFile.name}`);

    const galUrls: string[] = [];
    for (let i = 0; i < 6; i++) {
      if (galFiles[i]) {
        const url = await uploadImage(galFiles[i]!, `${profil.id}/${Date.now()}-gal${i}-${galFiles[i]!.name}`);
        if (url) galUrls.push(url);
      } else if (existingGalerija[i]) {
        galUrls.push(existingGalerija[i]);
      }
    }

    const featuresClean = features.filter(f => f.title.trim());

    const { error: dbError } = await supabase
      .from("predlogi_ponudnikov")
      .update({
        ime, tip: tip || null, regija,
        lokacija: lokacija || null,
        lat: lat ?? null,
        lng: lng ?? null,
        telefon: telefon || null,
        spletna_stran: spletna || null,
        zakaj, opis,
        bike_friendly_opis: bikeFriendly || null,
        citat: citat || null,
        hero_image: heroUrl,
        features: featuresClean.length > 0 ? featuresClean : null,
        galerija: galUrls.length > 0 ? galUrls : null,
        status: "pending",
        admin_opomba: null,
      })
      .eq("id", id)
      .eq("ambasador_id", profil.id);

    if (dbError) { setError("Napaka pri shranjevanju."); setLoading(false); return; }

    fetch("/api/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "nova_prijava",
        predlogTip: "ponudnik",
        predlogIme: ime,
        predlogRegija: regija,
        ambasadorIme: (profil as { id: string; ime?: string; regija?: string }).ime ?? null,
        ambasadorRegija: (profil as { id: string; ime?: string; regija?: string }).regija ?? null,
        jeRevizija: true,
      }),
    }).catch(() => {});

    router.push("/ambasador/koticek/ponudniki");
  }

  if (loadingData) {
    return <AmbassadorShell><div className="flex min-h-[400px] items-center justify-center text-zinc-500">Nalagam...</div></AmbassadorShell>;
  }
  if (notFound) {
    return (
      <AmbassadorShell>
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 text-center">
          <div className="text-5xl">📍</div>
          <h1 className="font-serif text-3xl font-black italic">Ponudnik ni najden.</h1>
          <Link href="/ambasador/koticek/ponudniki" className="rounded-full bg-[#c58b46] px-8 py-4 text-sm font-black text-black">← Nazaj</Link>
        </div>
      </AmbassadorShell>
    );
  }

  return (
    <AmbassadorShell>
      <div className="space-y-8">

        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Ambasadorski kotiček / Ponudniki / Uredi</div>
              <h1 className="mt-4 font-serif text-4xl font-black italic leading-tight text-white">Uredi predlog ponudnika.</h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">Po shranitvi bo predlog znova šel v uredniški pregled.</p>
            </div>
            <Link href="/ambasador/koticek/ponudniki" className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">← Nazaj</Link>
          </div>
        </section>

        {/* ── 1. OSNOVNA INFORMACIJA ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Osnovna informacija</div>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="col-span-2 block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Ime ponudnika *</span>
              <input value={ime} onChange={(e) => setIme(e.target.value)} placeholder="npr. Rudijev dom na Pohorju"
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Tip ponudnika</span>
              <select value={tip} onChange={(e) => setTip(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60">
                <option value="">— izberi tip —</option>
                {providerTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Regija *</span>
              <select value={regija} onChange={(e) => setRegija(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60">
                {regions.map((r) => <option key={r}>{r}</option>)}
              </select>
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Kraj / lokacija</span>
              <input value={lokacija} onChange={(e) => setLokacija(e.target.value)} placeholder="npr. Pohorje, 2000 Maribor"
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Telefonska številka</span>
              <input type="tel" value={telefon} onChange={(e) => setTelefon(e.target.value)} placeholder="+386 41 123 456"
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Spletna stran</span>
              <input type="url" value={spletna} onChange={(e) => setSpletna(e.target.value)} placeholder="https://"
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
            </label>
          </div>
        </section>

        {/* ── 2. LOKACIJA NA KARTI ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Lokacija na karti</div>
          <p className="mb-5 text-sm text-zinc-500">
            Klikni na karti in postavi marker točno na lokacijo ponudnika. Koordinate se shranijo samodejno in se upoštevajo pri izračunu razdalje od kolesarskih tras.
          </p>
          <LocationPicker
            lat={lat}
            lng={lng}
            onPick={(la, ln) => { setLat(la); setLng(ln); }}
          />
        </section>

        {/* ── 3. ZAKAJ GA PRIPOROČAŠ ── */}
        <section className="rounded-[32px] border border-[#c58b46]/15 bg-[#c58b46]/5 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Zakaj ga priporočaš</div>
          <textarea rows={3} value={zakaj} onChange={(e) => setZakaj(e.target.value)}
            placeholder="Zakaj bi kolesarji postali ravno tukaj?"
            className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-7 outline-none focus:border-[#c58b46]/60" />
        </section>

        {/* ── 3. OPIS ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Opis za platformo</div>
          <div className="space-y-5">
            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Zgodba / opis ponudnika *</span>
              <textarea rows={5} value={opis} onChange={(e) => setOpis(e.target.value)}
                placeholder="Rudijev dom stoji na..."
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-7 outline-none focus:border-[#c58b46]/60" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Zakaj je bike-friendly?</span>
              <textarea rows={3} value={bikeFriendly} onChange={(e) => setBikeFriendly(e.target.value)}
                placeholder="Imajo polnilnico za e-kolesa..."
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-7 outline-none focus:border-[#c58b46]/60" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Citat</span>
              <input value={citat} onChange={(e) => setCitat(e.target.value)}
                placeholder="npr. Domača juha po vzponu..."
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
            </label>
          </div>
        </section>

        {/* ── 4. POUDARKI ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Poudarki ponudnika</div>
          <div className="grid gap-4 md:grid-cols-2">
            {features.map((f, i) => (
              <div key={i} className="rounded-[20px] border border-white/10 bg-[#07110b] p-4">
                <div className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Poudarek {i + 1}</div>
                <div className="space-y-3">
                  <label className="block space-y-1.5">
                    <span className="text-xs font-semibold text-zinc-400">Naslov</span>
                    <input value={f.title} onChange={(e) => updateFeature(i, "title", e.target.value)}
                      placeholder="npr. Domača kuhinja"
                      className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm outline-none focus:border-[#c58b46]/60" />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="text-xs font-semibold text-zinc-400">Opis</span>
                    <input value={f.description} onChange={(e) => updateFeature(i, "description", e.target.value)}
                      placeholder="npr. Topel obrok po turi."
                      className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm outline-none focus:border-[#c58b46]/60" />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. SLIKE ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Slike ponudnika</div>
          <p className="mb-5 text-sm text-zinc-500">Naloži novo sliko samo če hočeš zamenjati obstoječo.</p>
          <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#07110b]">
            <div className="flex min-h-[160px] items-center justify-center bg-black/20 p-6 text-center">
              {heroPreview ? (
                <img src={heroPreview} alt="Hero predogled" className="max-h-[200px] rounded-xl object-cover" />
              ) : (
                <div><div className="text-4xl">📷</div><div className="mt-3 font-bold text-zinc-300">Hero slika ponudnika</div></div>
              )}
            </div>
            <div className="border-t border-white/10 p-4">
              <label className="flex cursor-pointer items-center justify-center rounded-full bg-[#c58b46] px-5 py-2.5 text-sm font-bold text-black transition hover:opacity-90">
                {heroPreview ? "Zamenjaj hero sliko" : "Naloži hero sliko"}
                <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleHeroChange} />
              </label>
            </div>
          </div>
          <div className="mt-6">
            <div className="mb-3 text-sm font-bold text-zinc-300">Galerija <span className="font-normal text-zinc-600">(do 6 slik)</span></div>
            <div className="grid grid-cols-3 gap-3">
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
          <Link href="/ambasador/koticek/ponudniki" className="rounded-full border border-white/10 px-6 py-3.5 text-sm font-bold text-zinc-300 transition hover:border-white/20">Prekliči</Link>
          <button type="button" onClick={handleSubmit} disabled={loading}
            className="rounded-full bg-[#c58b46] px-8 py-3.5 text-sm font-black text-black transition hover:opacity-90 disabled:opacity-50">
            {loading ? "Shranjujem..." : "Shrani in pošlji v pregled"}
          </button>
        </div>

      </div>
    </AmbassadorShell>
  );
}
