"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import AmbassadorShell from "@/components/AmbassadorShell";
import { supabase } from "@/lib/supabase";

const LocationPicker = dynamic(() => import("@/components/LocationPicker"), { ssr: false });

const regions = ["Štajerska", "Koroška", "Gorenjska", "Primorska", "Notranjska", "Dolenjska", "Prekmurje"];
const attractionTypes = ["Razgled", "Narava", "Kulturna dediščina", "Sakralni objekt", "Geološka posebnost", "Zgodovinska točka", "Foto točka", "Postanek ob poti", "Drugo"];

export default function NovaZnamenitostPage() {
  const router = useRouter();

  const [ime, setIme] = useState("");
  const [tip, setTip] = useState("");
  const [regija, setRegija] = useState("Štajerska");
  const [obmocje, setObmocje] = useState("");
  const [kratekOpis, setKratekOpis] = useState("");
  const [opis, setOpis] = useState("");
  const [zakaj, setZakaj] = useState("");
  const [lokacija, setLokacija] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [namig, setNamig] = useState("");
  const [wikipedia, setWikipedia] = useState("");
  const [googleMaps, setGoogleMaps] = useState("");

  // Hero image
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleHeroChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setHeroFile(file);
    setHeroPreview(URL.createObjectURL(file));
  }

  async function uploadImage(file: File, path: string): Promise<string | null> {
    const { error: uploadErr } = await supabase.storage.from("slike").upload(path, file, { upsert: true });
    if (uploadErr) return null;
    return supabase.storage.from("slike").getPublicUrl(path).data.publicUrl;
  }

  async function handleSubmit() {
    if (!ime || !kratekOpis || !opis) {
      setError("Ime, kratek opis in zgodba so obvezni.");
      return;
    }
    setError("");
    setLoading(true);

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setError("Nisi prijavljen."); setLoading(false); return; }

    const { data: profil } = await supabase.from("ambasadorji").select("id, ime, regija").eq("user_id", session.user.id).single();
    if (!profil) { setError("Ambasadorski profil ni najden."); setLoading(false); return; }

    // Upload hero image
    let heroUrl: string | null = null;
    if (heroFile) {
      heroUrl = await uploadImage(heroFile, `${profil.id}/${Date.now()}-hero-${heroFile.name}`);
    }

    const { error: dbError } = await supabase.from("predlogi_znamenitosti").insert({
      ambasador_id: profil.id,
      ime,
      tip: tip || null,
      regija,
      lokacija: lokacija || null,
      lat: lat ?? null,
      lng: lng ?? null,
      kratek_opis: kratekOpis,
      opis,
      zakaj: zakaj || null,
      namig_za_obisk: namig || null,
      wikipedia_url: wikipedia || null,
      google_maps_url: googleMaps || null,
      hero_image: heroUrl,
    });

    if (dbError) { setError("Napaka pri shranjevanju. Poskusi znova."); setLoading(false); return; }

    fetch("/api/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "nova_prijava",
        predlogTip: "znamenitost",
        predlogIme: ime,
        predlogRegija: regija,
        ambasadorIme: (profil as { id: string; ime?: string; regija?: string }).ime ?? null,
        ambasadorRegija: (profil as { id: string; ime?: string; regija?: string }).regija ?? null,
        jeRevizija: false,
      }),
    }).catch(() => {});

    router.push("/ambasador/koticek/znamenitosti");
  }

  return (
    <AmbassadorShell>
      <div className="space-y-8">

        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Ambasadorski kotiček / Znamenitosti / Nova</div>
              <h1 className="mt-4 font-serif text-4xl font-black italic leading-tight text-white">Predlagaj znamenitost.</h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">
                Označi točko ob tvojih trasah: razgled, naravna posebnost, kulturni objekt. Po potrditvi dobi svojo stran na platformi.
              </p>
            </div>
            <Link href="/ambasador/koticek/znamenitosti" className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">← Nazaj</Link>
          </div>
        </section>

        {/* ── 1. OSNOVNA INFORMACIJA ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Osnovna informacija</div>
          <p className="mb-5 text-sm text-zinc-500">Prikaže se v naslovu in filtrih.</p>
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
                <option value="">Izberi tip...</option>
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
          <p className="mb-5 text-sm text-zinc-500">Prikaže se na javni strani znamenitosti.</p>
          <div className="space-y-5">

            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Kratek opis *</span>
              <p className="text-xs text-zinc-500">Ena ali dve povedi, prikaže se pod naslovom kot uvod.</p>
              <textarea rows={2} value={kratekOpis} onChange={(e) => setKratekOpis(e.target.value)}
                placeholder="Kratek postanek nad mestom, kjer se odpre pogled proti Mariboru..."
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-7 outline-none focus:border-[#c58b46]/60" />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Zgodba / opis *</span>
              <p className="text-xs text-zinc-500">Daljši opis, prikaže se v razdelku "Zakaj se ustaviti" na strani.</p>
              <textarea rows={5} value={opis} onChange={(e) => setOpis(e.target.value)}
                placeholder="To je ena tistih točk, kjer se tura za trenutek ustavi. Pod tabo ostane mesto..."
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-7 outline-none focus:border-[#c58b46]/60" />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Ambasadorjev namig</span>
              <p className="text-xs text-zinc-500">Tvoje osebno priporočilo: zakaj točno ta točka, kdaj jo obiskati.</p>
              <textarea rows={3} value={zakaj} onChange={(e) => setZakaj(e.target.value)}
                placeholder="Tukaj se vedno ustavim. Mesto pod tabo, gozd za hrbtom..."
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-7 outline-none focus:border-[#c58b46]/60" />
            </label>

          </div>
        </section>

        {/* ── 3. SLIKA ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Slika znamenitosti</div>
          <p className="mb-5 text-sm text-zinc-500">Glavna slika, ki bo prikazana na strani znamenitosti. Naloži jo s svojega računalnika ali telefona.</p>

          <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#07110b]">
            <div className="flex min-h-[180px] items-center justify-center bg-black/20 p-6 text-center">
              {heroPreview ? (
                <img src={heroPreview} alt="Predogled slike" className="max-h-[200px] rounded-xl object-cover" />
              ) : (
                <div>
                  <div className="text-4xl">🗺️</div>
                  <div className="mt-3 font-bold text-zinc-300">Slika znamenitosti</div>
                  <p className="mt-1 text-sm text-zinc-500">Razgled, naravna posebnost, kulturni objekt...</p>
                </div>
              )}
            </div>
            <div className="border-t border-white/10 p-4">
              <label className="flex cursor-pointer items-center justify-center rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black transition hover:opacity-90">
                {heroFile ? "Zamenjaj sliko" : "Izberi sliko"}
                <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleHeroChange} />
              </label>
            </div>
          </div>
        </section>

        {/* ── 4. LOKACIJA ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Lokacija na karti</div>
          <p className="mb-5 text-sm text-zinc-500">Klikni na karti in postavi marker točno na lokacijo znamenitosti. Razdalja od kolesarskih tras se izračuna samodejno.</p>

          <label className="mb-5 block space-y-2">
            <span className="text-sm font-bold text-zinc-300">Opis lokacije</span>
            <input value={lokacija} onChange={(e) => setLokacija(e.target.value)}
              placeholder="npr. Razgledna točka leži nad Mariborom, nekoliko odmaknjena od glavne trase..."
              className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
          </label>

          <LocationPicker
            lat={lat}
            lng={lng}
            onPick={(la, ln) => { setLat(la); setLng(ln); }}
            searchPlaceholder="Npr. 'Žička kartuzija', 'Šentilj', 'Pohorje'..."
            hint="Vpiši polno ime znamenitosti ali bližnje naselje. Nato klikni točno na karti za natančno lokacijo pineka."
          />
        </section>

        {/* ── 5. NAMIG IN POVEZAVE ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Namig za obisk in povezave</div>
          <p className="mb-5 text-sm text-zinc-500">Prikaže se v razdelku "Namig za obisk" in kot gumbi na strani.</p>
          <div className="space-y-5">

            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Namig za obisk</span>
              <p className="text-xs text-zinc-500">Kdaj je najboljši obisk, kako priti tja, kaj vzeti s seboj...</p>
              <textarea rows={3} value={namig} onChange={(e) => setNamig(e.target.value)}
                placeholder="Najlepši občutek je ob jasnem vremenu ali pozno popoldne, ko se svetloba spusti nad mesto..."
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-7 outline-none focus:border-[#c58b46]/60" />
            </label>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-sm font-bold text-zinc-300">Spletna stran</span>
                <input type="url" value={wikipedia} onChange={(e) => setWikipedia(e.target.value)} placeholder="https://..."
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
            {loading ? "Shranjujem..." : "Oddaj predlog znamenitosti"}
          </button>
        </div>

      </div>
    </AmbassadorShell>
  );
}
