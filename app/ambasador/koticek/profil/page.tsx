"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AmbassadorShell from "@/components/AmbassadorShell";
import { supabase } from "@/lib/supabase";

const regions = ["Štajerska", "Koroška", "Gorenjska", "Primorska", "Notranjska", "Dolenjska", "Prekmurje"];

export default function AmbassadorProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [ime, setIme] = useState("");
  const [regija, setRegija] = useState("");
  const [kraj, setKraj] = useState("");
  const [kratekOpis, setKratekOpis] = useState("");
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [fotoFile, setFotoFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setLoading(false); return; }

      const meta = session.user.user_metadata ?? {};
      setEmail(session.user.email ?? "");
      setUserId(session.user.id);

      const { data: profil } = await supabase
        .from("ambasadorji")
        .select("ime, regija, kraj, kratek_opis, foto_url")
        .eq("user_id", session.user.id)
        .single();

      if (profil) {
        // Podatki iz baze — če so prazni, vzamemo iz registracijskih metapodatkov
        setIme(profil.ime || meta.ime || "");
        setRegija(profil.regija || meta.regija || "");
        setKraj(profil.kraj || meta.kraj || "");
        setKratekOpis(profil.kratek_opis || "");
        setFotoUrl(profil.foto_url || null);
      } else {
        // Profil v bazi ne obstaja — predizpolni iz registracijskih podatkov
        setIme(meta.ime || "");
        setRegija(meta.regija || "");
        setKraj(meta.kraj || "");
      }

      setLoading(false);
    }
    load();
  }, []);

  function handleFotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setFotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSave() {
    if (!userId) return;
    setSaving(true);
    setError("");
    setSaved(false);

    let novaFotoUrl = fotoUrl;

    // Naloži sliko prek server API (service role key, brez RLS težav)
    if (fotoFile) {
      const form = new FormData();
      form.append("file", fotoFile);
      form.append("userId", userId);

      const res = await fetch("/api/avatar", { method: "POST", body: form });
      const json = await res.json();

      if (!res.ok) {
        setError(`Napaka pri nalaganju slike: ${json.error}`);
        setSaving(false);
        return;
      }

      novaFotoUrl = json.url;
      setFotoUrl(json.url);
      setFotoFile(null);
    }

    const { error: err } = await supabase
      .from("ambasadorji")
      .upsert(
        { user_id: userId, email, ime, regija, kraj, kratek_opis: kratekOpis, foto_url: novaFotoUrl },
        { onConflict: "user_id" }
      );

    setSaving(false);

    if (err) {
      setError(`Shranjevanje ni uspelo: ${err.message}`);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  }

  const prikaznaFoto = fotoPreview || fotoUrl;

  return (
    <AmbassadorShell>
      <div className="space-y-8">

        {/* ── Glava ── */}
        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Ambasadorski kotiček / Profil</div>
              <h1 className="mt-4 font-serif text-4xl font-black italic leading-tight text-white">
                Uredi svoj profil.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">
                Profil se prikaže ob tvojih objavljenih turah in pomaga obiskovalcem razumeti,
                kdo stoji za predlogom.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/ambasador/koticek"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">
                ← Kotiček
              </Link>
              <button
                onClick={handleSave}
                disabled={saving || loading}
                className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black transition hover:opacity-90 disabled:opacity-40">
                {saving ? "Shranjujem..." : "Shrani profil"}
              </button>
            </div>
          </div>

          {saved && (
            <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-sm font-bold text-emerald-300">
              ✓ Profil je bil uspešno shranjen.
            </div>
          )}
          {error && (
            <div className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-bold text-red-300">
              {error}
            </div>
          )}
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">

          {/* ── Javna podoba ── */}
          <div className="rounded-[32px] border border-white/10 bg-[#07110b] p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-[#c58b46]">Javna podoba</div>

            <div className="mt-6 flex flex-col items-center rounded-[28px] border border-white/10 bg-black/20 p-6 text-center">

              {/* Profilna slika */}
              <div className="relative">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-[32px] border-2 border-dashed border-white/20 bg-[#0b1a10] transition hover:border-[#c58b46]/60"
                >
                  {prikaznaFoto ? (
                    <img
                      src={prikaznaFoto}
                      alt="Profilna slika"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-5xl">🚴</span>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center rounded-[30px] bg-black/60 opacity-0 transition group-hover:opacity-100">
                    <span className="text-xs font-bold text-white">Zamenjaj</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-3 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-zinc-400 transition hover:border-[#c58b46]/40 hover:text-zinc-200"
                >
                  {prikaznaFoto ? "Zamenjaj sliko" : "Naloži sliko"}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFotoSelect}
                />
              </div>

              <h2 className="mt-5 text-2xl font-black text-white">
                {loading ? "—" : (ime || "Tvoje ime")}
              </h2>
              <p className="mt-1.5 text-sm font-semibold text-zinc-400">
                {regija ? `Ambasador ${regija}` : "Ambasador"}
              </p>
              {kraj && (
                <p className="mt-1 text-xs text-zinc-600">{kraj}</p>
              )}
              {kratekOpis && (
                <p className="mt-4 max-w-xs text-sm leading-7 text-zinc-500">
                  {kratekOpis}
                </p>
              )}
            </div>

            <div className="mt-5 rounded-2xl border border-[#c58b46]/20 bg-[#c58b46]/10 p-4 text-sm leading-7 text-zinc-300">
              Sprememba profila ne vpliva na že objavljene ture — posodobi samo tvoj prikaz pri novih objavah.
            </div>
          </div>

          {/* ── Podatki ── */}
          <div className="rounded-[32px] border border-white/10 bg-[#07110b] p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-[#c58b46]">Podatki profila</div>

            {loading ? (
              <div className="mt-8 text-center text-zinc-500">Nalagam profil...</div>
            ) : (
              <div className="mt-6 grid gap-5 md:grid-cols-2">

                <label className="block space-y-2">
                  <span className="text-sm font-bold text-zinc-300">Ime in priimek</span>
                  <input
                    value={ime}
                    onChange={(e) => setIme(e.target.value)}
                    placeholder="npr. Bojan Ratej"
                    className="h-14 w-full rounded-2xl border border-white/10 bg-[#0b1a10] px-4 text-white outline-none transition focus:border-[#c58b46]/60" />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-bold text-zinc-300">Email</span>
                  <input
                    value={email}
                    readOnly
                    className="h-14 w-full cursor-not-allowed rounded-2xl border border-white/5 bg-black/20 px-4 text-zinc-500 outline-none" />
                  <span className="text-xs text-zinc-600">Email ni mogoče spremeniti tukaj.</span>
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-bold text-zinc-300">Regija ambasadorja</span>
                  <select
                    value={regija}
                    onChange={(e) => setRegija(e.target.value)}
                    className="h-14 w-full rounded-2xl border border-white/10 bg-[#0b1a10] px-4 text-white outline-none transition focus:border-[#c58b46]/60">
                    <option value="">— izberi regijo —</option>
                    {regions.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-bold text-zinc-300">Kraj / območje</span>
                  <input
                    value={kraj}
                    onChange={(e) => setKraj(e.target.value)}
                    placeholder="npr. Maribor, Pohorje"
                    className="h-14 w-full rounded-2xl border border-white/10 bg-[#0b1a10] px-4 text-white outline-none transition focus:border-[#c58b46]/60" />
                </label>

                <label className="col-span-2 block space-y-2">
                  <span className="text-sm font-bold text-zinc-300">Kratek opis</span>
                  <textarea
                    rows={4}
                    value={kratekOpis}
                    onChange={(e) => setKratekOpis(e.target.value)}
                    placeholder="Povej kaj o sebi kot kolesarju — kaj te žene, katere poti poznaš, kaj rad odkritvaš..."
                    className="w-full rounded-2xl border border-white/10 bg-[#0b1a10] px-4 py-4 leading-7 text-white outline-none transition focus:border-[#c58b46]/60" />
                </label>

              </div>
            )}

            {!loading && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-full bg-[#c58b46] px-8 py-3.5 text-sm font-black text-black transition hover:opacity-90 disabled:opacity-40">
                  {saving ? "Shranjujem..." : "Shrani profil"}
                </button>
              </div>
            )}
          </div>

        </section>
      </div>
    </AmbassadorShell>
  );
}
