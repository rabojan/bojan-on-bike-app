"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import AmbassadorShell from "@/components/AmbassadorShell";
import { supabase } from "@/lib/supabase";

const regions = ["Štajerska", "Koroška", "Gorenjska", "Primorska", "Notranjska", "Dolenjska", "Prekmurje"];
const attractionTypes = ["Razgled", "Narava", "Kulturna dediščina", "Sakralni objekt", "Geološka posebnost", "Zgodovinska točka", "Foto točka", "Postanek ob poti", "Drugo"];

export default function UrejiZnamenitostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loadingData, setLoadingData] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [existingHeroUrl, setExistingHeroUrl] = useState<string | null>(null);

  const [ime, setIme] = useState("");
  const [tip, setTip] = useState("");
  const [regija, setRegija] = useState("Štajerska");
  const [obmocje, setObmocje] = useState("");
  const [kratekOpis, setKratekOpis] = useState("");
  const [opis, setOpis] = useState("");
  const [zakaj, setZakaj] = useState("");
  const [lokacija, setLokacija] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [razdalja, setRazdalja] = useState("");
  const [namig, setNamig] = useState("");
  const [wikipedia, setWikipedia] = useState("");
  const [googleMaps, setGoogleMaps] = useState("");

  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState("");
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
        .from("predlogi_znamenitosti")
        .select("*")
        .eq("id", id)
        .eq("ambasador_id", profil.id)
        .single();

      if (fetchErr || !data) { setNotFound(true); setLoadingData(false); return; }

      setIme(data.ime ?? "");
      setTip(data.tip ?? "");
      setRegija(data.regija ?? "Štajerska");
      setObmocje(data.obmocje ?? "");
      setKratekOpis(data.kratek_opis ?? "");
      setOpis(data.opis ?? "");
      setZakaj(data.zakaj ?? "");
      setLokacija(data.lokacija ?? "");
      setLatitude(data.latitude ?? "");
      setLongitude(data.longitude ?? "");
      setRazdalja(data.razdalja_od_trase ?? "");
      setNamig(data.namig_za_obisk ?? "");
      setWikipedia(data.wikipedia_url ?? "");
      setGoogleMaps(data.google_maps_url ?? "");
      setExistingHeroUrl(data.hero_image ?? null);
      if (data.hero_image) setHeroPreview(data.hero_image);

      setLoadingData(false);
    }
    load();
  }, [id, router]);

  function handleHeroChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setHeroFile(file); setHeroPreview(URL.createObjectURL(file));
  }
  async function uploadImage(file: File, path: string): Promise<string | null> {
    const { error: uploadErr } = await supabase.storage.from("slike").upload(path, file, { upsert: true });
    if (uploadErr) return null;
    return supabase.storage.from("slike").getPublicUrl(path).data.publicUrl;
  }

  async function handleSubmit() {
    if (!ime || !kratekOpis || !opis) { setError("Ime, kratek opis in zgodba so obvezni."); return; }
    setError(""); setLoading(true);

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setError("Nisi prijavljen."); setLoading(false); return; }

    const { data: profil } = await supabase.from("ambasadorji").select("id").eq("user_id", session.user.id).single();
    if (!profil) { setError("Ambasadorski profil ni najden."); setLoading(false); return; }

    let heroUrl = existingHeroUrl;
    if (heroFile) heroUrl = await uploadImage(heroFile, `${profil.id}/${Date.now()}-hero-${heroFile.name}`);

    const { error: dbError } = await supabase
      .from("predlogi_znamenitosti")
      .update({
        ime,
        tip: tip || null,
        regija,
        obmocje: obmocje || null,
        kratek_opis: kratekOpis,
        opis,
        zakaj: zakaj || null,
        lokacija: lokacija || null,
        latitude: latitude || null,
        longitude: longitude || null,
        razdalja_od_trase: razdalja || null,
        namig_za_obisk: namig || null,
        wikipedia_url: wikipedia || null,
        google_maps_url: googleMaps || null,
        hero_image: heroUrl,
        status: "pending",
        admin_opomba: null,
      })
      .eq("id", id)
      .eq("ambasador_id", profil.id);

    if (dbError) { setError("Napaka pri shranjevanju."); setLoading(false); return; }
    router.push("/ambasador/koticek/znamenitosti");
  }

  if (loadingData) {
    return <AmbassadorShell><div className="flex min-h-[400px] items-center justify-center text-zinc-500">Nalagam...</div></AmbassadorShell>;
  }
  if (notFound) {
    return (
      <AmbassadorShell>
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 text-center">
          <div className="text-5xl">🗺️</div>
          <h1 className="font-serif text-3xl font-black italic">Znamenitost ni najdena.</h1>
          <Link href="/ambasador/koticek/znamenitosti" className="rounded-full bg-[#c58b46] px-8 py-4 text-sm font-black text-black">← Nazaj</Link>
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
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Ambasadorski kotiček / Znamenitosti / Uredi</div>
              <h1 className="mt-4 font-serif text-4xl font-black italic leading-tight text-white">Uredi predlog znamenitosti.</h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">Po shranitvi bo predlog znova šel v uredniški pregled.</p>
            </div>
            <Link href="/ambasador/koticek/znamenitosti" className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">← Nazaj</Link>
          </div>
        </section>

        {/* ── 1. OSNOVNA INFORMACIJA ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Osnovna informacija</div>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="col-span-2 block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Ime znamenitosti *</span>
              <input value={ime} onChange={(e) => setIme(e.target.value)} placeholder="npr. Razgled nad Mariborom"
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Tip</span>
              <select value={tip} onChange={(e) => setTip(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60">
                <option value="">— izberi tip —</option>
                {attractionTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Regija *</span>
              <select value={regija} onChange={(e) => setRegija(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60">
                {regions.map((r) => <option key={r}>{r}</option>)}
              </select>
            </label>
            <label className="col-span-2 block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Območje</span>
              <input value={obmocje} onChange={(e) => setObmocje(e.target.value)} placeholder="npr. Pohorje"
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
            </label>
          </div>
        </section>

        {/* ── 2. OPIS ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Opis znamenitosti</div>
          <div className="space-y-5">
            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Kratek opis *</span>
              <textarea rows={2} value={kratekOpis} onChange={(e) => setKratekOpis(e.target.value)}
                placeholder="Ena ali dve povedi..."
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-7 outline-none focus:border-[#c58b46]/60" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Zgodba / opis *</span>
              <textarea rows={5} value={opis} onChange={(e) => setOpis(e.target.value)}
                placeholder="To je ena tistih točk..."
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-7 outline-none focus:border-[#c58b46]/60" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Ambasadorjev namig</span>
              <textarea rows={3} value={zakaj} onChange={(e) => setZakaj(e.target.value)}
                placeholder="Tukaj se vedno ustavim..."
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-7 outline-none focus:border-[#c58b46]/60" />
            </label>
          </div>
        </section>

        {/* ── 3. SLIKA ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Slika znamenitosti</div>
          <p className="mb-5 text-sm text-zinc-500">Naloži novo sliko samo če hočeš zamenjati obstoječo.</p>
          <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#07110b]">
            <div className="flex min-h-[160px] items-center justify-center bg-black/20 p-6 text-center">
              {heroPreview ? (
                <img src={heroPreview} alt="Predogled slike" className="max-h-[200px] rounded-xl object-cover" />
              ) : (
                <div><div className="text-4xl">🗺️</div><div className="mt-3 font-bold text-zinc-300">Slika znamenitosti</div></div>
              )}
            </div>
            <div className="border-t border-white/10 p-4">
              <label className="flex cursor-pointer items-center justify-center rounded-full bg-[#c58b46] px-5 py-2.5 text-sm font-bold text-black transition hover:opacity-90">
                {heroPreview ? "Zamenjaj sliko" : "Naloži sliko"}
                <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleHeroChange} />
              </label>
            </div>
          </div>
        </section>

        {/* ── 4. LOKACIJA ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Lokacija</div>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="col-span-2 block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Opis lokacije</span>
              <input value={lokacija} onChange={(e) => setLokacija(e.target.value)}
                placeholder="npr. Razgledna točka leži nad Mariborom..."
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Latitude (GPS)</span>
              <input value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="npr. 46.5547"
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Longitude (GPS)</span>
              <input value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="npr. 15.6459"
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
            </label>
            <label className="col-span-2 block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Oddaljenost od trase</span>
              <input value={razdalja} onChange={(e) => setRazdalja(e.target.value)} placeholder="npr. 200 m od trase"
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
            </label>
          </div>
        </section>

        {/* ── 5. NAMIG IN POVEZAVE ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Namig za obisk in povezave</div>
          <div className="space-y-5">
            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Namig za obisk</span>
              <textarea rows={3} value={namig} onChange={(e) => setNamig(e.target.value)}
                placeholder="Najlepši občutek je ob jasnem vremenu..."
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-7 outline-none focus:border-[#c58b46]/60" />
            </label>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-sm font-bold text-zinc-300">Wikipedia URL</span>
                <input type="url" value={wikipedia} onChange={(e) => setWikipedia(e.target.value)} placeholder="https://sl.wikipedia.org/wiki/..."
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-bold text-zinc-300">Google Maps URL</span>
                <input type="url" value={googleMaps} onChange={(e) => setGoogleMaps(e.target.value)} placeholder="https://maps.google.com/..."
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
              </label>
            </div>
          </div>
        </section>

        {error && <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">{error}</div>}

        <div className="flex justify-end gap-3">
          <Link href="/ambasador/koticek/znamenitosti" className="rounded-full border border-white/10 px-6 py-3.5 text-sm font-bold text-zinc-300 transition hover:border-white/20">Prekliči</Link>
          <button type="button" onClick={handleSubmit} disabled={loading}
            className="rounded-full bg-[#c58b46] px-8 py-3.5 text-sm font-black text-black transition hover:opacity-90 disabled:opacity-50">
            {loading ? "Shranjujem..." : "Shrani in pošlji v pregled"}
          </button>
        </div>

      </div>
    </AmbassadorShell>
  );
}
