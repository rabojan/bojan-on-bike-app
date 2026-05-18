import Link from "next/link";

import AdminShell from "@/components/AdminShell";

const regions = ["Štajerska", "Koroška", "Gorenjska", "Primorska", "Notranjska", "Dolenjska", "Prekmurje"];

const providers = ["Rudijev dom na Pohorju", "Gorska hiša Pohorje", "Vinska klet med griči"];

const points = ["Razgled nad Mariborom", "Pohorski gozdni odsek", "Stara planinska pot"];

const experiences = ["Vinski kolesarski dan", "Pohorski flow in kosilo"];

export default function NewTrailProposalPage() {
  return (
    <AdminShell active="predlog-ture">
      <div className="space-y-8">
        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Admin / Predlog ture / Nova tura
              </div>

              <h1 className="mt-4 text-4xl font-black tracking-tight text-white">
                Predlagaj novo turo
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400">
                Enoten dokument za ambasadorja: najprej opiše turo, izbere regijo,
                doda GPX in slike, nato poveže ponudnike, znamenitosti in doživetje dneva.
                Vse skupaj gre na koncu v uredniški pregled.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/ture"
                className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300"
              >
                ← Nazaj na ture
              </Link>

              <button className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-bold text-black">
                Shrani osnutek
              </button>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <section className="rounded-[32px] border border-white/10 bg-black/20 p-6">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                1 / Osnovni podatki ture
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm font-bold text-zinc-200">
                  Ime ture *
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                    placeholder="npr. Pohorski veliki krog do Areha"
                  />
                </label>

                <label className="space-y-2 text-sm font-bold text-zinc-200">
                  Regija *
                  <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none">
                    <option>Izberi regijo</option>
                    {regions.map((region) => (
                      <option key={region}>{region}</option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2 text-sm font-bold text-zinc-200">
                  Dolžina
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                    placeholder="npr. 92 km"
                  />
                </label>

                <label className="space-y-2 text-sm font-bold text-zinc-200">
                  Višinski metri
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                    placeholder="npr. 1450 m"
                  />
                </label>

                <label className="space-y-2 text-sm font-bold text-zinc-200">
                  Težavnost
                  <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none">
                    <option>Izberi težavnost</option>
                    <option>Lahka</option>
                    <option>Srednja</option>
                    <option>Zahtevna</option>
                    <option>Zelo zahtevna</option>
                  </select>
                </label>

                <label className="space-y-2 text-sm font-bold text-zinc-200">
                  Najboljša sezona
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                    placeholder="npr. pomlad, poletje, jesen"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-[32px] border border-white/10 bg-black/20 p-6">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                2 / Zgodba ture
              </div>

              <div className="space-y-4">
                <label className="block space-y-2 text-sm font-bold text-zinc-200">
                  Kratek opis *
                  <textarea
                    className="min-h-28 w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                    placeholder="Kaj je glavni občutek ture? Komu je namenjena?"
                  />
                </label>

                <label className="block space-y-2 text-sm font-bold text-zinc-200">
                  Daljša zgodba ture
                  <textarea
                    className="min-h-40 w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                    placeholder="Opiši potek dneva, vzpone, razglede, ritem vožnje in posebnosti poti..."
                  />
                </label>
              </div>
            </section>

            <section className="rounded-[32px] border border-white/10 bg-black/20 p-6">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                3 / GPX, slike in podlaga
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[24px] border border-dashed border-white/15 bg-[#07110b] p-6 text-center">
                  <div className="text-3xl">🗺️</div>
                  <div className="mt-3 text-lg font-black text-white">Naloži GPX</div>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    Kasneje se bo shranil v zaščiten storage.
                  </p>
                  <button className="mt-5 rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black">
                    Izberi GPX
                  </button>
                </div>

                <div className="rounded-[24px] border border-dashed border-white/15 bg-[#07110b] p-6 text-center">
                  <div className="text-3xl">🖼️</div>
                  <div className="mt-3 text-lg font-black text-white">Dodaj slike</div>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    Hero slika in galerija ture.
                  </p>
                  <button className="mt-5 rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black">
                    Izberi slike
                  </button>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-4">
                {["Asfalt", "Makadam", "Gozdna cesta", "Trail"].map((surface) => (
                  <label key={surface} className="space-y-2 text-sm font-bold text-zinc-200">
                    {surface}
                    <input
                      className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                      placeholder="%"
                    />
                  </label>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-6">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Povezane vsebine
              </div>

              <div className="space-y-5">
                <div className="rounded-[24px] border border-white/10 bg-[#07110b] p-5">
                  <div className="mb-3 text-lg font-black text-white">Ponudniki ob trasi</div>
                  <select className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none">
                    <option>Izberi ponudnika iz regije</option>
                    {providers.map((provider) => (
                      <option key={provider}>{provider}</option>
                    ))}
                  </select>
                  <button className="mt-3 w-full rounded-full border border-white/10 px-4 py-3 text-sm font-bold text-zinc-300">
                    + Dodaj novega ponudnika
                  </button>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-[#07110b] p-5">
                  <div className="mb-3 text-lg font-black text-white">Znamenitosti</div>
                  <select className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none">
                    <option>Izberi znamenitost iz regije</option>
                    {points.map((point) => (
                      <option key={point}>{point}</option>
                    ))}
                  </select>
                  <button className="mt-3 w-full rounded-full border border-white/10 px-4 py-3 text-sm font-bold text-zinc-300">
                    + Dodaj novo znamenitost
                  </button>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-[#07110b] p-5">
                  <div className="mb-3 text-lg font-black text-white">Doživetje dneva</div>
                  <select className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none">
                    <option>Izberi obstoječe doživetje</option>
                    {experiences.map((experience) => (
                      <option key={experience}>{experience}</option>
                    ))}
                  </select>
                  <button className="mt-3 w-full rounded-full border border-white/10 px-4 py-3 text-sm font-bold text-zinc-300">
                    + Predlagaj novo doživetje
                  </button>
                </div>
              </div>
            </section>

            <section className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-6">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Uredniški tok
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl border border-[#c58b46]/20 bg-[#c58b46]/10 p-4">
                  <div className="font-black text-white">Osnutek</div>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">
                    Ambasador lahko dokument dopolnjuje, preden ga odda.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="font-black text-white">Oddano v pregled</div>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">
                    Po oddaji pride celoten paket v modul V pregled.
                  </p>
                </div>

                <button className="mt-3 w-full rounded-full bg-[#c58b46] px-6 py-4 text-sm font-black text-black">
                  Oddaj v pregled
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
