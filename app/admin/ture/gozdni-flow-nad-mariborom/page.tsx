"use client";

import Link from "next/link";
import { useState } from "react";

import AdminShell from "@/components/AdminShell";

const providers = [
  "Rudijev dom na Pohorju",
  "Gorska hiša Pohorje",
  "Vinska klet med griči",
];

const pois = [
  "Razgled nad Mariborom",
  "Pohorski gozdni odsek",
  "Stara planinska pot",
];

export default function EditTrailPage() {
  const [status, setStatus] = useState("Objavljeno");

  return (
    <AdminShell active="ture">
      <div className="space-y-8">
        <section className="flex flex-col gap-5 rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Admin / Ture / Uredi
            </div>

            <h1 className="mt-4 text-4xl font-black">
              Gozdni flow nad Mariborom
            </h1>

            <p className="mt-5 max-w-3xl leading-8 text-zinc-400">
              Tukaj boš urejal vse, kar se prikaže na javni strani ture:
              osnovne podatke, zgodbo, GPX, podlago, slike, ponudnike in
              znamenitosti ob trasi.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/ture"
              className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-zinc-300"
            >
              ← Nazaj na ture
            </Link>

            <Link
              href="/ture/gozdni-flow-nad-mariborom"
              className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-zinc-300"
            >
              Predogled
            </Link>

            <button className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black">
              Shrani spremembe
            </button>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-black/20 p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Osnovni podatki
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Naslov ture
                  </span>
                  <input
                    defaultValue="Gozdni flow nad Mariborom"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Regija
                  </span>
                  <input
                    defaultValue="Štajerska"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Območje
                  </span>
                  <input
                    defaultValue="Pohorje"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Tip ture
                  </span>
                  <select
                    defaultValue="MTB"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  >
                    <option>MTB</option>
                    <option>Gravel</option>
                    <option>eBike</option>
                    <option>Bikepacking</option>
                    <option>Družinska</option>
                    <option>Cestna</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Težavnost
                  </span>
                  <select
                    defaultValue="Srednja"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  >
                    <option>Lahka</option>
                    <option>Srednja</option>
                    <option>Zahtevna</option>
                    <option>Ekspert</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Sezona
                  </span>
                  <input
                    defaultValue="April - November"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-black/20 p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Razdalja, višina in podlaga
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Dolžina v km
                  </span>
                  <input
                    type="number"
                    defaultValue="32"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Višinski metri
                  </span>
                  <input
                    type="number"
                    defaultValue="890"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Asfalt %
                  </span>
                  <input
                    type="number"
                    defaultValue="10"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Makadam %
                  </span>
                  <input
                    type="number"
                    defaultValue="25"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2 md:col-span-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Gozdna pot %
                  </span>
                  <input
                    type="number"
                    defaultValue="65"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-[#07110b] p-4 text-sm text-zinc-400">
                Opomba: skupni odstotek podlage naj bo 100 %. Kasneje lahko to
                preverimo avtomatsko.
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-black/20 p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Zgodba ture
              </div>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-zinc-300">
                  Kratek opis
                </span>
                <textarea
                  defaultValue="Tura ni samo številka na zemljevidu. Je pobeg nad mesto, vonj pohorskega gozda, postanek ob poti in občutek, da si dan preživel točno tako, kot ga mora kolesar."
                  rows={5}
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-8 outline-none focus:border-[#c58b46]/60"
                />
              </label>

              <label className="mt-5 block space-y-2">
                <span className="text-sm font-semibold text-zinc-300">
                  Daljša zgodba / editorial opis
                </span>
                <textarea
                  placeholder="Tukaj boš kasneje napisal bolj doživljajsko zgodbo ture..."
                  rows={7}
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-8 outline-none focus:border-[#c58b46]/60"
                />
              </label>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Status objave
              </div>

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
              >
                <option>Osnutek</option>
                <option>Oddano v pregled</option>
                <option>Potrebni popravki</option>
                <option>Objavljeno</option>
                <option>Arhivirano</option>
              </select>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-zinc-400">
                Trenutni status:{" "}
                <span className="font-bold text-[#f4d7ad]">{status}</span>.
                Kasneje bo samo glavni admin lahko objavil vsebino.
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                GPX in zemljevid
              </div>

              <div className="rounded-2xl border border-dashed border-white/20 bg-black/20 p-6 text-center">
                <div className="text-3xl">🗺️</div>
                <div className="mt-3 font-bold">GPX še ni naložen</div>
                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Kasneje boš tukaj naložil GPX datoteko. Iz nje se izriše
                  trasa, vreme pa se izračuna glede na lokacijo ture.
                </p>
                <button className="mt-5 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300">
                  Naloži GPX
                </button>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Slike
              </div>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-zinc-300">
                  Hero slika URL
                </span>
                <input
                  defaultValue="https://images.unsplash.com/photo-1669372701525-06dde0779ba6?q=80&w=1800&auto=format&fit=crop"
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 text-sm outline-none focus:border-[#c58b46]/60"
                />
              </label>

              <div className="mt-5 rounded-2xl border border-dashed border-white/20 bg-black/20 p-5 text-sm text-zinc-400">
                Galerija bo kasneje omogočala več slik, vrstni red in brisanje.
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Ponudniki ob trasi
              </div>

              <div className="space-y-3">
                {providers.map((provider, index) => (
                  <label
                    key={provider}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <input type="checkbox" defaultChecked={index < 2} />
                    <span>{provider}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Znamenitosti ob trasi
              </div>

              <div className="space-y-3">
                {pois.map((poi, index) => (
                  <label
                    key={poi}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <input type="checkbox" defaultChecked={index < 1} />
                    <span>{poi}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
