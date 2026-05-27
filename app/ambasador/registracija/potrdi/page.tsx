"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import { supabase } from "@/lib/supabase";

export default function RegistrationConfirmPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"waiting" | "creating" | "done" | "error">("waiting");

  useEffect(() => {
    // Poslušamo na auth spremembe — ko ambasador potrdi email, dobimo sejo
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          setStatus("creating");

          const { user } = session;
          const meta = user.user_metadata ?? {};

          // Preveri ali profil že obstaja
          const { data: existing } = await supabase
            .from("ambasadorji")
            .select("id")
            .eq("user_id", user.id)
            .single();

          if (!existing) {
            await supabase.from("ambasadorji").insert({
              user_id: user.id,
              ime: meta.ime ?? user.email ?? "Ambasador",
              email: user.email,
              regija: meta.regija ?? null,
              kraj: meta.kraj ?? null,
            });
          }

          setStatus("done");
          setTimeout(() => router.push("/ambasador/koticek"), 1500);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/predlagaj-turo" />

      <section className="flex min-h-[calc(100vh-64px)] items-center justify-center px-5 py-16">
        <div className="mx-auto max-w-lg text-center">

          {status === "done" ? (
            <>
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-4xl">
                ✅
              </div>
              <h1 className="mt-4 font-serif text-4xl font-black italic leading-tight">
                Profil aktiviran!
              </h1>
              <p className="mt-5 text-lg leading-8 text-zinc-400">
                Preusmerjam te v ambasadorski kotiček...
              </p>
            </>
          ) : status === "creating" ? (
            <>
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#c58b46]/30 bg-[#c58b46]/10 text-4xl">
                ⚙️
              </div>
              <h1 className="mt-4 font-serif text-4xl font-black italic leading-tight">
                Ustvarjam profil...
              </h1>
            </>
          ) : (
            <>
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-4xl">
                ✉️
              </div>

              <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
                Zadnji korak
              </div>

              <h1 className="mt-4 font-serif text-4xl font-black italic leading-tight md:text-5xl">
                Preveri svoj email.
              </h1>

              <p className="mt-5 text-lg leading-8 text-zinc-400">
                Poslali smo ti potrditveni email. Klikni na povezavo v njem in tvoj
                ambasadorski profil bo aktiviran.
              </p>

              <div className="mt-8 rounded-[28px] border border-white/10 bg-[#0b1a10] p-6 text-left">
                <div className="space-y-4 text-sm">
                  {[
                    ["Veljavnost", "Potrditvena povezava velja 24 ur"],
                    ["Ni emaila?", "Preveri mapo Nezaželena pošta"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between border-b border-white/10 pb-4 last:border-0 last:pb-0">
                      <span className="text-zinc-500">{label}</span>
                      <span className="font-semibold text-zinc-300">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/ambasador/prijava"
                  className="rounded-full bg-[#c58b46] px-7 py-4 text-sm font-black text-black"
                >
                  Že potrdil? Prijavi se
                </Link>
                <Link
                  href="/"
                  className="rounded-full border border-white/10 px-7 py-4 text-sm font-bold text-zinc-300"
                >
                  Nazaj na začetek
                </Link>
              </div>
            </>
          )}

        </div>
      </section>
    </main>
  );
}
