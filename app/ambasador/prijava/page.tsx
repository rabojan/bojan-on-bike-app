"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import { supabase } from "@/lib/supabase";

export default function AmbassadorLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) return;
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Email ali geslo ni pravilno.");
      setLoading(false);
      return;
    }

    router.push("/ambasador/koticek");
  }

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/predlagaj-turo" />

      <section className="flex min-h-[calc(100vh-64px)] items-center justify-center px-5 py-16">
        <div className="w-full max-w-md">

          <div className="mb-8 text-center">
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
              Kolesarski ambasadorji
            </div>
            <h1 className="mt-4 font-serif text-4xl font-black italic leading-tight">
              Dobrodošel nazaj.
            </h1>
            <p className="mt-3 text-sm leading-7 text-zinc-500">
              Prijavi se v svoj ambasadorski kotiček.
            </p>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
            <div className="space-y-5">
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-zinc-300">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="tvoj@email.si"
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 text-sm outline-none transition focus:border-[#c58b46]/60"
                />
              </label>

              <label className="block space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-zinc-300">Geslo</span>
                  <button type="button" className="text-xs text-[#c58b46] hover:underline">
                    Pozabljeno geslo?
                  </button>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 text-sm outline-none transition focus:border-[#c58b46]/60"
                />
              </label>
            </div>

            {error && (
              <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handleLogin}
              disabled={loading || !email || !password}
              className="mt-7 w-full rounded-full bg-[#c58b46] px-6 py-4 text-sm font-black text-black transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Preverjam..." : "Prijavi se"}
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-zinc-500">
            Še nimaš profila?{" "}
            <Link
              href="/ambasador/registracija"
              className="font-bold text-[#c58b46] hover:underline"
            >
              Ustvari ambasadorski profil
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
