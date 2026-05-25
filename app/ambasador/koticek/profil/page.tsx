import Link from "next/link";
import AmbassadorShell from "@/components/AmbassadorShell";

const regions = ["Štajerska", "Koroška", "Gorenjska", "Primorska", "Notranjska", "Dolenjska", "Prekmurje"];

export default function AmbassadorProfilePage() {
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
              <button className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black transition hover:opacity-90">
                Shrani profil
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">

          {/* ── Javna podoba ── */}
          <div className="rounded-[32px] border border-white/10 bg-[#07110b] p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-[#c58b46]">Javna podoba</div>
            <div className="mt-6 flex flex-col items-center rounded-[28px] border border-white/10 bg-black/20 p-6 text-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-[32px] border border-white/10 bg-[#0b1a10] text-5xl">
                🚴
              </div>
              <h2 className="mt-5 text-2xl font-black text-white">Bojan Ratej</h2>
              <p className="mt-1.5 text-sm font-semibold text-zinc-400">Ambasador Štajerske</p>
              <p className="mt-4 max-w-xs text-sm leading-7 text-zinc-500">
                Lokalni kolesar, ki rad poveže dobro traso, lep razgled in postanek, ki naredi dan boljši.
              </p>
              <label className="mt-6 inline-flex cursor-pointer rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">
                Zamenjaj sliko
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
            <div className="mt-5 rounded-2xl border border-[#c58b46]/20 bg-[#c58b46]/10 p-4 text-sm leading-7 text-zinc-300">
              Sprememba profila ne vpliva na že objavljene ture — posodobi samo tvoj prikaz.
            </div>
          </div>

          {/* ── Podatki ── */}
          <div className="rounded-[32px] border border-white/10 bg-[#07110b] p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-[#c58b46]">Podatki profila</div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">

              <label className="block space-y-2">
                <span className="text-sm font-bold text-zinc-300">Ime in priimek</span>
                <input defaultValue="Bojan Ratej"
                  className="h-14 w-full rounded-2xl border border-white/10 bg-[#0b1a10] px-4 text-white outline-none focus:border-[#c58b46]/60" />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-bold text-zinc-300">Email</span>
                <input defaultValue="bojan@bojanonbike.si" type="email"
                  className="h-14 w-full rounded-2xl border border-white/10 bg-[#0b1a10] px-4 text-white outline-none focus:border-[#c58b46]/60" />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-bold text-zinc-300">Regija ambasadorja</span>
                <select defaultValue="Štajerska"
                  className="h-14 w-full rounded-2xl border border-white/10 bg-[#0b1a10] px-4 text-white outline-none focus:border-[#c58b46]/60">
                  {regions.map((r) => <option key={r}>{r}</option>)}
                </select>
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-bold text-zinc-300">Kraj / območje</span>
                <input defaultValue="Maribor, Pohorje"
                  className="h-14 w-full rounded-2xl border border-white/10 bg-[#0b1a10] px-4 text-white outline-none focus:border-[#c58b46]/60" />
              </label>

              <label className="col-span-2 block space-y-2">
                <span className="text-sm font-bold text-zinc-300">Kratek opis</span>
                <textarea rows={5} defaultValue="Lokalni kolesar, ki rad poveže dobro traso, lep razgled in postanek, ki naredi dan boljši."
                  className="w-full rounded-2xl border border-white/10 bg-[#0b1a10] px-4 py-4 leading-7 text-white outline-none focus:border-[#c58b46]/60" />
              </label>

            </div>

            <div className="mt-6 flex justify-end">
              <button className="rounded-full bg-[#c58b46] px-8 py-3.5 text-sm font-black text-black transition hover:opacity-90">
                Shrani profil
              </button>
            </div>
          </div>

        </section>
      </div>
    </AmbassadorShell>
  );
}
