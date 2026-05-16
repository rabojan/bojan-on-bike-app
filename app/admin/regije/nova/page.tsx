import Link from "next/link";

import AdminShell from "@/components/AdminShell";


export default function NewRegionPage() {
  return (
    <AdminShell active="regije">
      <div className="space-y-8">
        <section className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-8 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Admin / Regije / Nova regija
            </p>
            <h1 className="text-4xl font-black tracking-tight text-white">
              Dodaj regijo
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400">
              Tukaj pripraviš regijo kot uredniško celoto: opis, območja,
              povezane vsebine, hero sliko in ambasadorja regije.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
            <Link
              href="/admin/regije"
              className="rounded-full border border-white/10 px-6 py-4 text-sm font-bold text-zinc-200"
            >
              ← Nazaj na regije
            </Link>

            <button className="rounded-full bg-[#c58b46] px-6 py-4 text-sm font-bold text-black">
              Shrani kot osnutek
            </button>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <div className="space-y-6">
            <section className="rounded-[28px] border border-white/10 bg-black/20 p-6">
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Osnovni podatki
              </p>

              <div className="grid gap-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-zinc-300">
                    Ime regije *
                  </span>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                    placeholder="npr. Štajerska"
                  />
                </label>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-zinc-300">
                      URL slug *
                    </span>
                    <input
                      className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                      placeholder="npr. stajerska"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-zinc-300">
                      Status regije *
                    </span>
                    <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none">
                      <option>V pripravi</option>
                      <option>Aktivna</option>
                      <option>Arhivirana</option>
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-zinc-300">
                    Glavni stavek / pozicioniranje *
                  </span>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                    placeholder="npr. Gozdovi, vinogradi in razgledi nad mesti."
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-zinc-300">
                    Kratek opis regije *
                  </span>
                  <textarea
                    className="min-h-32 w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                    placeholder="Kratek opis, ki pove, zakaj je regija zanimiva za kolesarje..."
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-zinc-300">
                    Daljša zgodba regije
                  </span>
                  <textarea
                    className="min-h-48 w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                    placeholder="Vzdušje regije, značaj pokrajine, tipične poti, lokalna kulinarika, razgledi, družinske možnosti..."
                  />
                </label>
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-black/20 p-6">
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Območja v regiji
              </p>

              <div className="grid gap-4 md:grid-cols-3">
                <input
                  className="rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                  placeholder="npr. Pohorje"
                />
                <input
                  className="rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                  placeholder="npr. Slovenske gorice"
                />
                <input
                  className="rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                  placeholder="npr. Dravsko polje"
                />
              </div>

              <button className="mt-4 w-full rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300">
                + Dodaj območje
              </button>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-black/20 p-6">
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Hero slika regije
              </p>

              <div className="rounded-[24px] border border-dashed border-white/15 bg-[#07110b] p-8 text-center">
                <div className="text-4xl">🖼️</div>
                <h2 className="mt-4 text-2xl font-black text-white">
                  Naloži hero sliko regije
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500">
                  Najbolje delujejo široke krajinske fotografije: razgled,
                  gozdna cesta, reka, vinogradi, gore ali značilen del regije.
                </p>

                <button className="mt-6 rounded-full bg-[#c58b46] px-8 py-4 text-sm font-bold text-black">
                  Izberi sliko
                </button>

                <p className="mt-4 text-xs text-zinc-600">
                  Podprto: JPG, PNG, WEBP. Kasneje se slika shrani v Supabase Storage.
                </p>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Ambasador regije
              </p>

              <div className="grid gap-5">
                <div className="rounded-[24px] border border-dashed border-white/15 bg-[#07110b] p-6 text-center">
                  <div className="text-4xl">👤</div>
                  <h2 className="mt-4 text-xl font-black text-white">
                    Fotografija ambasadorja
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-500">
                    Portret lokalnega ambasadorja regije.
                  </p>

                  <button className="mt-5 rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300">
                    Izberi sliko
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-zinc-300">
                      Ime in priimek
                    </span>
                    <input
                      className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                      placeholder="npr. Bojan Ratej"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-zinc-300">
                      Kraj
                    </span>
                    <input
                      className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                      placeholder="npr. Maribor"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-zinc-300">
                    Email
                  </span>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                    placeholder="ime@bojanonbike.si"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-zinc-300">
                    Telefon
                  </span>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                    placeholder="+386 ..."
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-zinc-300">
                    Kratek opis ambasadorja
                  </span>
                  <textarea
                    className="min-h-32 w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                    placeholder="Lokalni poznavalec regije, najljubše poti, zakaj priporoča to pokrajino..."
                  />
                </label>
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Samodejno povezane vsebine
              </p>

              <div className="rounded-[24px] border border-white/10 bg-[#07110b] p-6">
                <h2 className="text-2xl font-black text-white">
                  Vsebine se dodajo samodejno
                </h2>

                <p className="mt-4 text-sm leading-7 text-zinc-400">
                  Ture, ponudniki, doživetja in znamenitosti se pri regiji ne
                  izbirajo ročno. Ko bo pri posamezni turi, ponudniku,
                  doživetju ali znamenitosti izbrana ta regija, se bo vsebina
                  samodejno prikazala v kartici regije.
                </p>

                <div className="mt-6 grid gap-3">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-sm font-bold text-white">Ture</div>
                    <div className="mt-1 text-sm text-zinc-500">
                      Prikažejo se, ko ima tura izbrano to regijo.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-sm font-bold text-white">Ponudniki</div>
                    <div className="mt-1 text-sm text-zinc-500">
                      Prikažejo se, ko ima ponudnik izbrano to regijo.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-sm font-bold text-white">Doživetja</div>
                    <div className="mt-1 text-sm text-zinc-500">
                      Prikažejo se, ko ima doživetje izbrano to regijo.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-sm font-bold text-white">Znamenitosti</div>
                    <div className="mt-1 text-sm text-zinc-500">
                      Prikažejo se, ko ima znamenitost izbrano to regijo.
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-[#c58b46]/20 bg-[#c58b46]/10 p-4 text-sm leading-7 text-zinc-300">
                  Ambasador regije bo kasneje videl in urejal samo vsebine,
                  ki pripadajo njegovi regiji.
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
