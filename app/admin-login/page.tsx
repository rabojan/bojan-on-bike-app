"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const ADMIN_PASSWORD = "bojan2026";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("bojan_admin_logged_in", "true");
      router.push("/admin");
      return;
    }

    setError("Geslo ni pravilno.");
  }

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5">
        <img
          src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1800&auto=format&fit=crop"
          alt="Admin ozadje"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#07110b]/70 to-[#07110b]" />

        <div className="relative z-10 w-full max-w-md rounded-[36px] border border-white/10 bg-[#07110b]/90 p-8 shadow-2xl backdrop-blur-xl">
          <Link
            href="/"
            className="mb-8 inline-flex rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm font-semibold text-zinc-300"
          >
            ← Nazaj na stran
          </Link>

          <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
            Bojanova pisarna
          </div>

          <h1 className="mt-4 text-4xl font-black leading-tight">
            Vstop v Admin
          </h1>

          <p className="mt-5 leading-8 text-zinc-400">
            Tukaj boš urejal ture, doživetja, ponudnike, slike, GPX datoteke in
            zgodbe platforme Bojan on Bike.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-3 block text-sm font-semibold text-zinc-300">
                Geslo
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                placeholder="Vnesi geslo"
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none transition focus:border-[#c58b46]/60"
              />
            </div>

            {error && (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-[#c58b46] px-6 py-4 font-bold text-black transition hover:opacity-90"
            >
              Vstopi v pisarno
            </button>
          </form>

          <p className="mt-6 text-xs leading-6 text-zinc-600">
            To je začasna demo zaščita. Kasneje jo zamenjamo s pravim
            Supabase Auth loginom.
          </p>
        </div>
      </section>
    </main>
  );
}
