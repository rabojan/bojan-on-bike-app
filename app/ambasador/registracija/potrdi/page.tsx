import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export default function RegistrationConfirmPage() {
  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/predlagaj-turo" />

      <section className="flex min-h-[calc(100vh-64px)] items-center justify-center px-5 py-16">
        <div className="mx-auto max-w-lg text-center">

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
                ["Pošiljatelj", "noreply@bojanonbike.si"],
                ["Zadeva", "Potrdi ambasadorski profil — Bojan on Bike"],
                ["Veljavnost", "Potrditvena povezava velja 24 ur"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between border-b border-white/10 pb-4 last:border-0 last:pb-0">
                  <span className="text-zinc-500">{label}</span>
                  <span className="font-semibold text-zinc-300">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-sm leading-7 text-zinc-600">
            Emaila ne vidiš? Preveri mapo Nezaželena pošta (Spam).
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

        </div>
      </section>
    </main>
  );
}
