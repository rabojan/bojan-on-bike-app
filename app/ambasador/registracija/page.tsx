"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import { supabase } from "@/lib/supabase";

const regions = [
  "Štajerska",
  "Gorenjska",
  "Primorska",
  "Koroška",
  "Notranjska",
  "Dolenjska",
  "Prekmurje",
  "Osrednja Slovenija",
];

export default function AmbassadorRegistrationPage() {
  const router = useRouter();
  const [ime, setIme] = useState("");
  const [priimek, setPriimek] = useState("");
  const [kraj, setKraj] = useState("");
  const [regija, setRegija] = useState("");
  const [email, setEmail] = useState("");
  const [geslo, setGeslo] = useState("");
  const [potrdiGeslo, setPotrdiGeslo] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const gesloMismatch = potrdiGeslo.length > 0 && geslo !== potrdiGeslo;
  const gesloStrong = geslo.length >= 8;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (gesloMismatch || !gesloStrong) return;

    setError("");
    setLoading(true);

    // Ustvari Supabase Auth račun — profil se ustvari ob potrditvi emaila
    const { error: authError } = await supabase.auth.signUp({
      email,
      password: geslo,
      options: {
        data: {
          ime: `${ime} ${priimek}`.trim(),
          regija,
          kraj,
        },
        emailRedirectTo: `${window.location.origin}/ambasador/registracija/potrdi`,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/ambasador/registracija/potrdi");
  }

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/predlagaj-turo" />

      <section className="px-5 py-16">
        <div className="mx-auto max-w-xl">

          <div className="mb-8 text-center">
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
              Kolesarski ambasadorji
            </div>
            <h1 className="mt-4 font-serif text-4xl font-black italic leading-tight">
              Ustvari ambasadorski profil.
            </h1>
            <p className="mt-3 text-sm leading-7 text-zinc-500">
              Registracija je brezplačna. Po potrditvi emaila dobiš dostop do
              svojega ambasadorskega kotička.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
              <div className="mb-5 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Osebni podatki
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">Ime *</span>
                  <input
                    required
                    value={ime}
                    onChange={(e) => setIme(e.target.value)}
                    placeholder="npr. Bojan"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 text-sm outline-none transition focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">Priimek *</span>
                  <input
                    required
                    value={priimek}
                    onChange={(e) => setPriimek(e.target.value)}
                    placeholder="npr. Ratej"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 text-sm outline-none transition focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">Kraj *</span>
                  <input
                    required
                    value={kraj}
                    onChange={(e) => setKraj(e.target.value)}
                    placeholder="npr. Maribor"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 text-sm outline-none transition focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">Regija *</span>
                  <select
                    required
                    value={regija}
                    onChange={(e) => setRegija(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 text-sm outline-none transition focus:border-[#c58b46]/60"
                  >
                    <option value="">— izberi regijo —</option>
                    {regions.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </label>
              </div>

              {regija && (
                <div className="mt-4 rounded-2xl border border-[#c58b46]/20 bg-[#c58b46]/5 p-4 text-sm text-zinc-400">
                  Postaneš{" "}
                  <span className="font-bold text-[#f4d7ad]">
                    Ambasador regije {regija}
                  </span>
                  . Ture, ki jih predlagaš, bodo vidne pod to regijo.
                </div>
              )}
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
              <div className="mb-5 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Podatki za prijavo
              </div>

              <div className="space-y-5">
                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">Email *</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tvoj@email.si"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 text-sm outline-none transition focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="block space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-zinc-300">Geslo *</span>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-xs text-zinc-500 hover:text-zinc-300"
                    >
                      {showPassword ? "Skrij" : "Pokaži"}
                    </button>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={geslo}
                    onChange={(e) => setGeslo(e.target.value)}
                    placeholder="Vsaj 8 znakov"
                    className={`w-full rounded-2xl border bg-[#07110b] px-5 py-4 text-sm outline-none transition ${
                      geslo.length > 0
                        ? gesloStrong
                          ? "border-emerald-500/40 focus:border-emerald-500/60"
                          : "border-red-500/30 focus:border-red-500/50"
                        : "border-white/10 focus:border-[#c58b46]/60"
                    }`}
                  />
                  {geslo.length > 0 && (
                    <p className={`text-xs font-bold ${gesloStrong ? "text-emerald-400" : "text-red-400"}`}>
                      {gesloStrong ? "✓ Geslo je dovolj dolgo" : "Geslo mora imeti vsaj 8 znakov"}
                    </p>
                  )}
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">Potrdi geslo *</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={potrdiGeslo}
                    onChange={(e) => setPotrdiGeslo(e.target.value)}
                    placeholder="Ponovi geslo"
                    className={`w-full rounded-2xl border bg-[#07110b] px-5 py-4 text-sm outline-none transition ${
                      potrdiGeslo.length > 0
                        ? gesloMismatch
                          ? "border-red-500/30 focus:border-red-500/50"
                          : "border-emerald-500/40 focus:border-emerald-500/60"
                        : "border-white/10 focus:border-[#c58b46]/60"
                    }`}
                  />
                  {potrdiGeslo.length > 0 && (
                    <p className={`text-xs font-bold ${gesloMismatch ? "text-red-400" : "text-emerald-400"}`}>
                      {gesloMismatch ? "✗ Gesli se ne ujemata" : "✓ Gesli se ujemata"}
                    </p>
                  )}
                </label>
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={gesloMismatch || !gesloStrong || loading}
              className="w-full rounded-full bg-[#c58b46] px-6 py-4 text-sm font-black text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? "Ustvarjam profil..." : "Ustvari ambasadorski profil"}
            </button>

            <p className="text-center text-xs leading-6 text-zinc-600">
              Po oddaji boš prejel potrditveni email. S potrditvijo dobiš dostop
              do ambasadorskega kotička.
            </p>

          </form>

          <div className="mt-6 text-center text-sm text-zinc-500">
            Imaš že profil?{" "}
            <Link
              href="/ambasador/prijava"
              className="font-bold text-[#c58b46] hover:underline"
            >
              Prijavi se
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
