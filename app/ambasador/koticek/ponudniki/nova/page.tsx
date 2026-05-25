"use client";

import Link from "next/link";
import AmbassadorShell from "@/components/AmbassadorShell";

const regions = ["Štajerska", "Koroška", "Gorenjska", "Primorska", "Notranjska", "Dolenjska", "Prekmurje"];
const providerTypes = ["Planinska koča", "Restavracija", "Vinska klet", "Bike shop", "Hotel / apartma", "Kavarna / bistro", "Drugo"];

export default function NovPonudnikPage() {
  return (
    <AmbassadorShell>
      <div className="space-y-8">

        {/* ── Glava ── */}
        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Ambasadorski kotiček / Ponudniki / Nov</div>
              <h1 className="mt-4 font-serif text-4xl font-black italic leading-tight text-white">
                Predlagaj ponudnika.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">
                Predlagaj lokalni objekt ob tvojih trasah — koča, klet, bistro, bike shop.
                Po potrditvi dobi svojo stran in se poveže s tvojimi turami in doživetji.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/ambasador/koticek/ponudniki"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">
                ← Nazaj
              </Link>
              <button className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black transition hover:opacity-90">
                Oddaj predlog
              </button>
            </div>
          </div>
        </section>

        {/* ── Forma ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-6 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Podatki o ponudniku</div>
          <div className="grid gap-5 md:grid-cols-2">

            <label className="col-span-2 block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Ime ponudnika *</span>
              <input placeholder="npr. Rudijev dom na Pohorju"
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Tip ponudnika *</span>
              <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60">
                <option value="">— izberi tip —</option>
                {providerTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Regija *</span>
              <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60">
                {regions.map((r) => <option key={r}>{r}</option>)}
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Kraj / lokacija</span>
              <input placeholder="npr. Pohorje, 2000 Maribor"
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Spletna stran</span>
              <input type="url" placeholder="https://"
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60" />
            </label>

            <label className="col-span-2 block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Zakaj ga priporočaš? *</span>
              <textarea rows={4} placeholder="Kaj je posebnega pri tem ponudniku? Zakaj bi kolesarji postali tukaj?"
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-7 outline-none focus:border-[#c58b46]/60" />
            </label>

            <label className="col-span-2 block space-y-2">
              <span className="text-sm font-bold text-zinc-300">Kratek opis za platformo</span>
              <textarea rows={3} placeholder="Javni opis — kratko in jedrnato, za stran ponudnika."
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-7 outline-none focus:border-[#c58b46]/60" />
            </label>

          </div>
        </section>

        {/* ── Slika ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Fotografija</div>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 py-10 transition hover:border-[#c58b46]/40">
            <div className="text-3xl">📷</div>
            <p className="mt-3 text-sm text-zinc-500">Naloži fotografijo ponudnika</p>
            <p className="mt-1 text-xs text-zinc-600">JPG, PNG ali WEBP · max 5 MB</p>
            <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" />
          </label>
        </section>

        {/* ── Oddaj ── */}
        <div className="flex justify-end gap-3">
          <Link href="/ambasador/koticek/ponudniki"
            className="rounded-full border border-white/10 px-6 py-3.5 text-sm font-bold text-zinc-300 transition hover:border-white/20">
            Prekliči
          </Link>
          <button className="rounded-full bg-[#c58b46] px-8 py-3.5 text-sm font-black text-black transition hover:opacity-90">
            Oddaj predlog ponudnika
          </button>
        </div>

      </div>
    </AmbassadorShell>
  );
}
