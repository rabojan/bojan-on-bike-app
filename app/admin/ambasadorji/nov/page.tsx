"use client";

import Link from "next/link";
import { useState } from "react";

import AdminShell from "@/components/AdminShell";

const regions = [
  "Štajerska",
  "Koroška",
  "Gorenjska",
  "Primorska",
  "Notranjska",
  "Dolenjska",
  "Prekmurje",
];

export default function NewAmbassadorPage() {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const toggleRegion = (region: string) => {
    setSelectedRegions((currentRegions) =>
      currentRegions.includes(region)
        ? currentRegions.filter((item) => item !== region)
        : [...currentRegions, region]
    );
  };

  return (
    <AdminShell active="ambasadorji">
      <div className="space-y-8">
        <section className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-8 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Admin / Ambasadorji / Nov ambasador
            </p>
            <h1 className="text-4xl font-black tracking-tight text-white">
              Dodaj ambasadorja
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400">
              Tukaj vneseš celoten profil ambasadorja: osebne podatke, kontakt,
              fotografijo, regijo, opis in kasnejše uredniške pravice.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
            <Link
              href="/admin/ambasadorji"
              className="rounded-full border border-white/10 px-6 py-4 text-sm font-bold text-zinc-200"
            >
              ← Nazaj na ambasadorje
            </Link>

            <button className="rounded-full bg-[#c58b46] px-6 py-4 text-sm font-bold text-black">
              Shrani predlog
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
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-zinc-300">
                      Ime *
                    </span>
                    <input
                      className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                      placeholder="npr. Bojan"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-zinc-300">
                      Priimek *
                    </span>
                    <input
                      className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                      placeholder="npr. Ratej"
                    />
                  </label>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-zinc-300">
                      Kraj *
                    </span>
                    <input
                      className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                      placeholder="npr. Maribor"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-zinc-300">
                      Status *
                    </span>
                    <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none">
                      <option>Čaka na objavo</option>
                      <option>Aktiven</option>
                      <option>Začasno neaktiven</option>
                      <option>Arhiviran</option>
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-zinc-300">
                    Kratek opis ambasadorja *
                  </span>
                  <textarea
                    className="min-h-36 w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                    placeholder="Kdo je ambasador, katero regijo pozna, kakšne ture priporoča, zakaj je primeren za Bojan on Bike..."
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-zinc-300">
                    Daljši opis / zgodba ambasadorja
                  </span>
                  <textarea
                    className="min-h-48 w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                    placeholder="Njegova kolesarska zgodba, izkušnje, najljubši kraji, slog vožnje, lokalne posebnosti..."
                  />
                </label>
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-black/20 p-6">
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Kontakt
              </p>

              <div className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-zinc-300">
                      Email *
                    </span>
                    <input
                      type="email"
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
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-zinc-300">
                    Spletna stran / profil
                  </span>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                    placeholder="https://..."
                  />
                </label>
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-black/20 p-6">
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Fotografija ambasadorja
              </p>

              <div className="rounded-[24px] border border-dashed border-white/15 bg-[#07110b] p-8 text-center">
                <div className="text-5xl">👤</div>
                <h2 className="mt-4 text-2xl font-black text-white">
                  Naloži portret ambasadorja
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500">
                  Najbolje deluje jasna portretna fotografija. Kasneje se bo
                  shranila v Supabase Storage.
                </p>

                <label className="mt-6 inline-flex cursor-pointer rounded-full bg-[#c58b46] px-8 py-4 text-sm font-bold text-black transition hover:bg-[#d9a35d]">
                  Izberi sliko
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                  />
                </label>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Regija in pravice
              </p>

              <div className="grid gap-3">
                {regions.map((region) => {
                  const selected = selectedRegions.includes(region);

                  return (
                    <button
                      key={region}
                      type="button"
                      onClick={() => toggleRegion(region)}
                      className={`rounded-2xl border p-4 text-left text-sm font-bold transition ${
                        selected
                          ? "border-[#c58b46]/60 bg-[#c58b46]/15 text-white"
                          : "border-white/10 bg-[#07110b] text-zinc-300 hover:border-[#c58b46]/40"
                      }`}
                    >
                      <span className="mr-3">{selected ? "✓" : "□"}</span>
                      {region}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl border border-[#c58b46]/20 bg-[#c58b46]/10 p-4 text-sm leading-7 text-zinc-300">
                Ambasador bo kasneje lahko videl in urejal samo vsebine iz
                izbrane regije oziroma izbranih regij.
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Vloga ambasadorja
              </p>

              <div className="grid gap-3">
                <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#07110b] p-4 text-sm font-bold text-zinc-300">
                  <input type="radio" name="ambassadorRole" className="mt-1" defaultChecked />
                  <span>
                    Ambasador regije
                    <span className="mt-1 block text-xs font-normal leading-5 text-zinc-500">
                      Osnovna enakovredna vloga za ambasadorje izbranih regij.
                    </span>
                  </span>
                </label>

                <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#07110b] p-4 text-sm font-bold text-zinc-300">
                  <input type="radio" name="ambassadorRole" className="mt-1" />
                  <span>
                    TOP ambasador regije
                    <span className="mt-1 block text-xs font-normal leading-5 text-zinc-500">
                      Posebna izpostavljena oznaka za najbolj aktivnega ali posebej izbranega ambasadorja.
                    </span>
                  </span>
                </label>
              </div>

              <div className="mt-6 rounded-2xl border border-[#c58b46]/20 bg-[#c58b46]/10 p-4 text-sm leading-7 text-zinc-300">
                Ambasadorji so enakovredni. TOP oznaka je samo izpostavitev prispevka, ne hierarhija.
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Uporabniški dostop
              </p>

              <div className="grid gap-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-zinc-300">
                    Login email
                  </span>
                  <input
                    type="email"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                    placeholder="email za prijavo"
                  />
                </label>

                <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#07110b] p-4 text-sm font-bold text-zinc-300">
                  <input type="checkbox" className="mt-1" />
                  Ustvari uporabniški dostop kasneje prek Supabase Auth
                </label>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-zinc-500">
                  Za zdaj je to samo priprava. Pravi login, pravice in omejitev
                  na regijo bomo povezali kasneje, ko bomo uredili Supabase Auth
                  in Row Level Security.
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Uredniški tok
              </p>

              <div className="grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-[#07110b] p-4">
                  <div className="text-sm font-bold text-white">Čaka na objavo</div>
                  <div className="mt-1 text-sm leading-6 text-zinc-500">
                    Profil je pripravljen, ampak ambasador še ni aktiven.
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#07110b] p-4">
                  <div className="text-sm font-bold text-white">Aktiven</div>
                  <div className="mt-1 text-sm leading-6 text-zinc-500">
                    Ambasador se lahko prikaže pri regiji in kasneje dobi dostop.
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#07110b] p-4">
                  <div className="text-sm font-bold text-white">
                    Začasno neaktiven
                  </div>
                  <div className="mt-1 text-sm leading-6 text-zinc-500">
                    Profil ostane v sistemu, ampak se ne uporablja javno.
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
