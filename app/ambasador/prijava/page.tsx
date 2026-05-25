"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";

export default function AmbassadorLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    // Začasna prijava brez Supabase — za prototip
    if (email && password) {
      localStorage.setItem("bojan_ambassador_logged_in", "true");
      router.push("/ambasador/koticek");
    }
  }

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/predlagaj-turo" />

      <section className="flex min-h-[calc(100vh-64px)] items-center justify-center px-5 py-16">
        <div className="w-full max-w-md">

          {/* Glava */}
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

          {/* Forma */}
          <div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
            <div className="space-y-5">
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-zinc-300">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tvoj@email.si"
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 text-sm outline-none transition focus:border-[#c58b46]/60"
                />
              </label>

              <label className="block space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-zinc-300">Geslo</span>
                  <button
                    type="button"
                    className="text-xs text-[#c58b46] hover:underline"
                  >
                    Pozabljeno geslo?
                  </button>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 text-sm outline-none transition focus:border-[#c58b46]/60"
                />
              </label>
            </div>

            {/* Supabase Auth — prijava */}
            <button
              type="button"
              onClick={handleLogin}
              className="mt-7 w-full rounded-full bg-[#c58b46] px-6 py-4 text-sm font-black text-black transition hover:opacity-90"
            >
              Prijavi se
            </button>

            <div className="mt-5 rounded-2xl border border-dashed border-white/10 bg-black/20 p-4 text-center text-xs leading-6 text-zinc-600">
              {/* Supabase Auth: signInWithPassword() */}
              Prijava bo aktivna po integraciji Supabase Auth.
            </div>
          </div>

          {/* Registracija link */}
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
