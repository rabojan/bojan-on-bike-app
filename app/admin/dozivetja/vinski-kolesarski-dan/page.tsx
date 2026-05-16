"use client";

import Link from "next/link";
import { useState } from "react";

import AdminShell from "@/components/AdminShell";

const experienceTypes = [
  "Vinsko doživetje",
  "Družinski izlet",
  "Kulinarična tura",
  "Razgledna pot",
  "Vikend pobeg",
  "Zgodbe krajev",
  "e-bike dan",
  "MTB flow",
];

const trails = [
  "Gozdni flow nad Mariborom",
  "Med vinogradi in griči",
  "Alpski pobeg ob vodi",
];

const providers = [
  "Rudijev dom na Pohorju",
  "Gorska hiša Pohorje",
  "Vinska klet med griči",
];

const attractions = [
  "Razgled nad Mariborom",
  "Pohorski gozdni odsek",
  "Stara planinska pot",
];

export default function NewExperiencePage() {
  const [status, setStatus] = useState("Objavljeno");

  return (
    <AdminShell active="dozivetja">
      <div className="space-y-8">
        <section className="flex flex-col gap-5 rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Admin / Doživetja / Uredi
            </div>

            <h1 className="mt-4 text-4xl font-black">Vinski kolesarski dan</h1>

            <p className="mt-5 max-w-3xl leading-8 text-zinc-400">
              Doživetje poveže turo, ponudnike, znamenitosti in občutek dneva v
              eno jasno idejo za uporabnika.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/dozivetja"
              className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-zinc-300"
            >
              ← Nazaj na doživetja
            </Link>

            <button className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black">
              Shrani spremembe
            </button>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-black/20 p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Osnovni podatki
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2 md:col-span-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Naslov doživetja *
                  </span>
                  <input
                    defaultValue="Vinski kolesarski dan"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Regija *
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
                    defaultValue="Slovenske gorice"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <div className="space-y-3 md:col-span-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Tip doživetja *
                  </span>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {experienceTypes.map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#07110b] p-4"
                      >
                        <input type="checkbox" defaultChecked />
                        <span className="font-bold">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-black/20 p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Zgodba doživetja
              </div>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-zinc-300">
                  Kratek opis *
                </span>
                <textarea
                  defaultValue="Lahkotna vožnja med griči, postanek pri vinski kleti in občutek dneva, ki se konča za mizo."
                  rows={5}
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-8 outline-none focus:border-[#c58b46]/60"
                />
              </label>

              <label className="mt-5 block space-y-2">
                <span className="text-sm font-semibold text-zinc-300">
                  Daljša zgodba
                </span>
                <textarea
                  defaultValue="To doživetje je namenjeno tistim, ki ne iščejo samo kilometrov, ampak cel dan: počasnejši ritem, razgledi med griči, lokalna zgodba in postanek pri ponudniku, kjer se tura spremeni v druženje."
                  rows={7}
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-8 outline-none focus:border-[#c58b46]/60"
                />
              </label>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-black/20 p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Hero slika *
              </div>

              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#07110b]">
                <div className="flex min-h-[240px] items-center justify-center bg-black/20 p-8 text-center">
                  <div>
                    <div className="text-5xl">✨</div>
                    <div className="mt-4 text-xl font-black">
                      Naloži sliko doživetja
                    </div>
                    <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-400">
                      Slika naj pokaže občutek dneva: ljudi, kolesarjenje,
                      razgled, mizo, vino, druženje ali naravo.
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/10 p-5">
                  <label className="flex cursor-pointer items-center justify-center rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black transition hover:opacity-90">
                    Izberi sliko
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Status objave *
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
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Povezane ture *
              </div>

              <div className="space-y-4">
                {trails.map((trail) => (
                  <label
                    key={trail}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <input type="checkbox" defaultChecked />
                    <span className="font-bold">{trail}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Povezani ponudniki
              </div>

              <div className="space-y-4">
                {providers.map((provider) => (
                  <label
                    key={provider}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <input type="checkbox" defaultChecked />
                    <span className="font-bold">{provider}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Povezane znamenitosti
              </div>

              <div className="space-y-4">
                {attractions.map((attraction) => (
                  <label
                    key={attraction}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <input type="checkbox" />
                    <span className="font-bold">{attraction}</span>
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
