"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import AmbassadorShell from "@/components/AmbassadorShell";
import { supabase } from "@/lib/supabase";

const LocationPicker = dynamic(() => import("@/components/LocationPicker"), { ssr: false });

const regions = ["Štajerska", "Koroška", "Gorenjska", "Primorska", "Notranjska", "Dolenjska", "Prekmurje"];
const providerTypes = ["Planinski dom", "Vinotoč", "Gostilna", "Hotel", "Hostel", "Kavarna / bistro", "Drugo"];


type Feature = { title: string; description: string };

export default function NovPonudnikPage() {
  const router = useRouter();

  const [ime, setIme] = useState("");
  const [tip, setTip] = useState("");
  const [regija, setRegija] = useState("Štajerska");
  const [lokacija, setLokacija] = useState("");
  const [telefon, setTelefon] = useState("");
  const [spletna, setSpletna] = useState("");
  const [zakaj, setZakaj] = useState("");
  const [citat, setCitat] = useState("");
  const [opis, setOpis] = useState("");
  const [hasPolnilnica, setHasPolnilnica] = useState(false);

  const [features, setFeatures] = useState<Feature[]>([
    { title: "", description: "" },
    { title: "", description: "" },
    { title: "", description: "" },
  ]);

  // Hero image
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState("");

  // Gallery (6 slots, 3×2)
  const [galFiles, setGalFiles] = useState<(File | null)[]>(Array(6).fill(null));
  const [galPreviews, setGalPreviews] = useState<string[]>(Array(6).fill(""));

  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateFeature(i: number, field: keyof Feature, value: string) {
    setFeatures((prev) => prev.map((f, idx) => idx === i ? { ...f, [field]: value } : f));
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

    // Upload hero image
    let heroUrl: string | null = null;
    if (heroFile) {
      heroUrl = await uploadImage(heroFile, `${profil.id}/${Date.now()}-hero-${heroFile.name}`);
    }

    // Upload gallery images
    const galUrls: string[] = [];
    for (let i = 0; i < galFiles.length; i++) {
      const f = galFiles[i];
      if (f) {
        const url = await uploadImage(f, `${profil.id}/${Date.now()}-gal${i}-${f.name}`);
        if (url) galUrls.push(url);
      }
    }

    const featuresClean = features.filter(f => f.title.trim());

    const { error: dbError } = await supabase.from("predlogi_ponudnikov").insert({
      ambasador_id: profil.id,
      ime, tip: tip || null, regija,
      lokacija: lokacija || null,
      lat: lat ?? null,
      lng: lng ?? null,
      telefon: telefon || null,
      spletna_stran: spletna || null,
      zakaj, citat: citat || null, opis,
      bike_friendly_opis: hasPolnilnica ? JSON.stringify(["e-bike polnilnica"]) : null,
      hero_image: heroUrl,
      features: featuresClean.length > 0 ? featuresClean : null,
      galerija: galUrls.length > 0 ? galUrls : null,
    });

    if (dbError) { setError("Napaka pri shranjevanju. Poskusi znova."); setLoading(false); return; }

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
        jeRevizija: false,
      }),
    }).catch(() => {});

    router.push("/ambasador/koticek/ponudniki");
  }

  return (
    <AmbassadorShell>
      <div className="space-y-8">

        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Ambasadorski kotiček / Ponudniki / Nov</div>
              <h1 className="mt-4 font-serif text-4xl font-black italic leading-tight text-white">Predlagaj ponudnika.</h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">
                Izpolni vse razdelke: bolj popoln kot je predlog, hitreje bo objavljen.
              </p>
            </div>
            <Link href="/ambasador/koticek/ponudniki" className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">← Nazaj</Link>
          </div>
        </section>

        {/* ── 1. OSNOVNA INFORMACIJA ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Osnovna informacija</div>
          <p className="mb-5 text-sm text-zinc-500">Prikaže se v naslovu in kontaktnem razdelku.</p>
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
                <option value="">Izberi tip...</option>
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
            <div className="col-span-2">
              <button type="button" onClick={() => setHasPolnilnica((v) => !v)}
                className={`flex items-center gap-3 rounded-2xl border px-5 py-4 text-sm font-bold transition ${hasPolnilnica ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" : "border-white/10 bg-[#07110b] text-zinc-400 hover:border-white/20"}`}>
                <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${hasPolnilnica ? "border-emerald-400 bg-emerald-400" : "border-zinc-600"}`}>
                  {hasPolnilnica && <span className="text-[10px] font-black text-black">✓</span>}
                </span>
                🔋 Ima e-bike polnilnico
              </button>
              <p className="mt-2 text-xs text-zinc-600">Označi, če ponudnik nudi polnilnico za e-kolesarje.</p>
            </div>
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
            searchPlaceholder="Išči: Dom na Boču, Rudijev dom, Vinska klet..."
            hint="Vpiši ime ponudnika ali bližnji kraj, nato klikni na karti za natančno lokacijo."
          />
        </section>

        {/* ── 3. PRVI VTIS + ZAKAJ SE USTAVITI ── */}
        <section className="rounded-[32px] border border-[#c58b46]/15 bg-[#c58b46]/5 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Prvi vtis o ponudniku</div>
          <p className="mb-4 text-sm text-zinc-500">Prikaže se kot subtitle pod naslovom strani. Največ 180 znakov.</p>
          <textarea rows={2} maxLength={180} value={zakaj} onChange={(e) => setZakaj(e.target.value)}
            placeholder="Kratek, udaren vtis — kaj kolesarj najprej začuti, ko pride sem."
            className="w-full resize-none rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-7 outline-none focus:border-[#c58b46]/60" />
          <div className={`mb-5 text-right text-xs font-bold ${zakaj.length > 160 ? "text-amber-400" : "text-zinc-600"}`}>
            {180 - zakaj.length} znakov preostane
          </div>

          <div className="border-t border-[#c58b46]/15 pt-5">
            <span className="text-sm font-bold text-zinc-300">Zakaj se ustaviti</span>
            <p className="mb-4 mt-1 text-xs text-zinc-500">Stavek, ki ga ambasador sporoča o ponudniku — prikaže se v zlatem boxu na strani.</p>
            <input maxLength={110} value={citat} onChange={(e) => setCitat(e.target.value)}
              placeholder='npr. "Najboljša goveja juha pod Bočem."'
              className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
            <div className={`mt-1.5 text-right text-xs font-bold ${citat.length > 95 ? "text-amber-400" : "text-zinc-600"}`}>
              {110 - citat.length} znakov preostane
            </div>
          </div>
        </section>

        {/* ── 3. OPIS PONUDNIKA ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Opis ponudnika</div>
          <p className="mb-5 text-sm text-zinc-500">Prikaže se na strani ponudnika — opiši prostor, vzdušje in zakaj je vreden postanka. Največ 440 znakov.</p>
          <label className="block space-y-2">
            <span className="text-sm font-bold text-zinc-300">Opis *</span>
            <textarea rows={5} maxLength={440} value={opis} onChange={(e) => setOpis(e.target.value)}
              placeholder="Rudijev dom stoji na... Tu se kolesarji ustavljajo ker..."
              className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-7 outline-none focus:border-[#c58b46]/60" />
            <div className={`text-right text-xs font-bold ${opis.length > 400 ? "text-amber-400" : "text-zinc-600"}`}>
              {440 - opis.length} znakov preostane
            </div>
          </label>
        </section>

        {/* ── 4. POUDARKI PONUDNIKA (3) ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Poudarki ponudnika</div>
          <p className="mb-5 text-sm text-zinc-500">3 kratke kartice ki obiskovalcu pokažejo bistvo ponudnika. Napiši kar je za tega ponudnika resnično značilno.</p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: "Hrana in pijača", titlePh: "npr. Domača kuhinja", descPh: "npr. Topel obrok po turi, domači okusi in lokalne specialitete." },
              { label: "Ambient in vzdušje", titlePh: "npr. Domačen ambient", descPh: "npr. Toplo, umirjeno vzdušje — idealno za počitek po zahtevni turi." },
              { label: "Okolica in lega", titlePh: "npr. Razgled na dolino", descPh: "npr. Terasa z pogledom na Pohorje, tih kotiček sredi narave." },
            ].map(({ label, titlePh, descPh }, i) => (
              <div key={i} className="rounded-[20px] border border-white/10 bg-[#07110b] p-4">
                <div className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{label}</div>
                <div className="space-y-3">
                  <label className="block space-y-1.5">
                    <span className="text-xs font-semibold text-zinc-400">Naslov</span>
                    <input value={features[i]?.title ?? ""} onChange={(e) => updateFeature(i, "title", e.target.value)}
                      placeholder={titlePh}
                      className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm outline-none focus:border-[#c58b46]/60" />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="text-xs font-semibold text-zinc-400">Opis</span>
                    <input value={features[i]?.description ?? ""} onChange={(e) => updateFeature(i, "description", e.target.value)}
                      placeholder={descPh}
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
          <p className="mb-5 text-sm text-zinc-500">Hero slika + do 6 slik v galeriji. Naloži jih neposredno s svojega računalnika ali telefona.</p>

          {/* Hero slika */}
          <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#07110b]">
            <div className="flex min-h-[200px] items-center justify-center bg-black/20 p-8 text-center">
              {heroPreview ? (
                <img src={heroPreview} alt="Hero predogled" className="max-h-[220px] rounded-xl object-cover" />
              ) : (
                <div>
                  <div className="text-5xl">📷</div>
                  <div className="mt-4 text-xl font-black text-zinc-300">Hero slika ponudnika</div>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-400">
                    Glavna slika, prikaže se v heroju in katalogu.
                  </p>
                </div>
              )}
            </div>
            <div className="border-t border-white/10 p-5">
              <label className="flex cursor-pointer items-center justify-center rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black transition hover:opacity-90">
                {heroFile ? "Zamenjaj hero sliko" : "Izberi hero sliko"}
                <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleHeroChange} />
              </label>
            </div>
          </div>

          {/* Galerija 3×2 */}
          <div className="mt-6">
            <div className="mb-3 text-sm font-semibold text-zinc-300">Galerija <span className="font-normal text-zinc-600">(do 6 slik)</span></div>
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
            <p className="mt-3 text-xs text-zinc-600">Klik na polje odpre izbiralnik datotek. Na naloženi sliki klikni za zamenjavo.</p>
          </div>
        </section>

        {error && <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">{error}</div>}

        <div className="flex justify-end gap-3">
          <Link href="/ambasador/koticek/ponudniki" className="rounded-full border border-white/10 px-6 py-3.5 text-sm font-bold text-zinc-300 transition hover:border-white/20">Prekliči</Link>
          <button type="button" onClick={handleSubmit} disabled={loading}
            className="rounded-full bg-[#c58b46] px-8 py-3.5 text-sm font-black text-black transition hover:opacity-90 disabled:opacity-50">
            {loading ? "Shranjujem..." : "Oddaj predlog ponudnika"}
          </button>
        </div>

      </div>
    </AmbassadorShell>
  );
}
