"use client";

import Link from "next/link";
import { useState } from "react";

import AdminShell from "@/components/AdminShell";

const emptyHighlights = [
  {
    label: "Poudarek 1",
    titlePlaceholder: "npr. Vstop v gozd",
    locationPlaceholder: "npr. 4 km",
    typePlaceholder: "npr. Narava",
    descriptionPlaceholder:
      "Kratek stavek, ki uporabniku hitro pove, zakaj je ta del poti poseben.",
  },
  {
    label: "Poudarek 2",
    titlePlaceholder: "npr. Razgled nad dolino",
    locationPlaceholder: "npr. 13 km",
    typePlaceholder: "npr. Razgled",
    descriptionPlaceholder:
      "Kratek opis razgleda, postanka, občutka ali posebnosti na poti.",
  },
  {
    label: "Poudarek 3",
    titlePlaceholder: "npr. Flow spust",
    locationPlaceholder: "npr. 24 km",
    typePlaceholder: "npr. Spust",
    descriptionPlaceholder:
      "Kratek opis zaključnega poudarka, spusta, ponudnika ali zgodbe ob poti.",
  },
];

export default function NewTrailPage() {
  const [status, setStatus] = useState("Čaka na objavo");

  return (
    <AdminShell active="ture">
      <div className="space-y-8">
        <section className="flex flex-col gap-5 rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Admin / Ture / Nova tura
            </div>

            <h1 className="mt-4 text-4xl font-black">Dodaj novo turo</h1>

            <p className="mt-5 max-w-3xl leading-8 text-zinc-400">
              Tukaj boš ustvaril novo kolesarsko turo: osnovne podatke, GPX,
              podlago, zgodbo, poudarke poti, slike, ponudnike in znamenitosti.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/ture"
              className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-zinc-300"
            >
              ← Nazaj na ture
            </Link>

            <button className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black">
              Shrani predlog
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
                    Naslov ture
                  </span>
                  <input
                    placeholder="npr. Vinska gravel pot med griči"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Regija
                  </span>
                  <input
                    placeholder="npr. Štajerska"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Območje
                  </span>
                  <input
                    placeholder="npr. Slovenske gorice"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Tip ture
                  </span>
                  <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60">
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
                  <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60">
                    <option>Lahka</option>
                    <option>Srednja</option>
                    <option>Zahtevna</option>
                    <option>Ekspert</option>
                  </select>
                </label>

                <label className="space-y-2 md:col-span-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Sezona
                  </span>
                  <input
                    placeholder="npr. April - November"
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
                    placeholder="0"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Višinski metri
                  </span>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Asfalt %
                  </span>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Makadam %
                  </span>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2 md:col-span-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Gozdna pot %
                  </span>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-[#07110b] p-4 text-sm leading-7 text-zinc-400">
                Skupni odstotek podlage naj bo 100 %. Kasneje bo sistem to
                preveril avtomatsko.
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
                  placeholder="Kratek opis ture, ki uporabniku pove, zakaj naj jo izbere..."
                  rows={5}
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-8 outline-none focus:border-[#c58b46]/60"
                />
              </label>

              <label className="mt-5 block space-y-2">
                <span className="text-sm font-semibold text-zinc-300">
                  Daljša zgodba / editorial opis
                </span>
                <textarea
                  placeholder="Daljša zgodba ture, vzdušje, občutek poti, posebnosti..."
                  rows={7}
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-8 outline-none focus:border-[#c58b46]/60"
                />
              </label>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Slike in galerija
              </div>

              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#07110b]">
                <div className="flex min-h-[240px] items-center justify-center bg-black/20 p-8 text-center">
                  <div>
                    <div className="text-5xl">🖼️</div>
                    <div className="mt-4 text-xl font-black">
                      Naloži hero sliko ture
                    </div>
                    <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-400">
                      Glavna slika ture za katalog in vrh strani ture.
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/10 p-5">
                  <label className="flex cursor-pointer items-center justify-center rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black transition hover:opacity-90">
                    Izberi hero sliko
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-dashed border-white/20 bg-black/20 p-5 text-sm leading-7 text-zinc-400">
                Galerija je namenjena dodatnim utrinkom s ture. Glavne 3–4
                vsebinske točke ture urejaš posebej v razdelku Poudarki poti.
              </div>

              <button className="mt-5 w-full rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300">
                + Dodaj sliko v galerijo
              </button>

              <div className="mt-5 rounded-2xl border border-dashed border-white/20 bg-black/20 p-5 text-sm leading-7 text-zinc-400">
                To je upload UI prototip. Kasneje boš tukaj slike dejansko
                naložil v Supabase Storage, urejal vrstni red in brisal slike.
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Poudarki poti
              </div>

              <div className="space-y-5">
                {emptyHighlights.map((highlight, index) => (
                  <div
                    key={highlight.label}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="font-bold">{highlight.label}</div>
                      <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400">
                        vrstni red {index + 1}
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <input
                        placeholder={highlight.titlePlaceholder}
                        className="w-full rounded-xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none focus:border-[#c58b46]/60"
                      />

                      <div className="grid gap-3 sm:grid-cols-2">
                        <input
                          placeholder={highlight.locationPlaceholder}
                          className="w-full rounded-xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none focus:border-[#c58b46]/60"
                        />

                        <input
                          placeholder={highlight.typePlaceholder}
                          className="w-full rounded-xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none focus:border-[#c58b46]/60"
                        />
                      </div>

                      <textarea
                        placeholder={highlight.descriptionPlaceholder}
                        rows={3}
                        className="w-full rounded-xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm leading-7 outline-none focus:border-[#c58b46]/60"
                      />

                      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#07110b]">
                        <div className="flex min-h-[180px] items-center justify-center bg-black/20 p-6 text-center">
                          <div>
                            <div className="text-4xl">📷</div>
                            <div className="mt-3 text-sm font-bold">
                              Naloži sliko poudarka
                            </div>
                            <p className="mt-2 text-xs leading-6 text-zinc-500">
                              Slika za ta poudarek poti.
                            </p>
                          </div>
                        </div>

                        <div className="border-t border-white/10 p-4">
                          <label className="flex cursor-pointer items-center justify-center rounded-full border border-white/10 px-4 py-3 text-sm font-semibold text-zinc-300 transition hover:border-[#c58b46]/40 hover:text-white">
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
                ))}
              </div>

              <button className="mt-5 w-full rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300">
                + Dodaj poudarek
              </button>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Status objave
              </div>

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
              >
                <option>Čaka na objavo</option>
                <option>Oddano v pregled</option>
                <option>Potrebni popravki</option>
                <option>Objavljeno</option>
                <option>Arhivirano</option>
              </select>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-zinc-400">
                Nova tura gre po oddaji v pregled pred objavo. Objavo kasneje potrdi
                glavni admin.
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                GPX in zemljevid
              </div>

              <div className="rounded-2xl border border-dashed border-white/20 bg-black/20 p-6 text-center">
                <div className="text-3xl">🗺️</div>
                <div className="mt-3 font-bold">Naloži GPX datoteko</div>
                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Iz GPX datoteke se bo kasneje izrisala trasa, vreme pa se bo
                  vezalo na lokacijo ture.
                </p>

                <label className="mt-5 inline-flex cursor-pointer rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300">
                  Izberi GPX
                  <input type="file" accept=".gpx" className="hidden" />
                </label>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Ponudniki ob trasi
              </div>

              <div className="rounded-2xl border border-dashed border-white/20 bg-black/20 p-6 text-center">
                <div className="text-3xl">🍽️</div>
                <div className="mt-3 font-bold">Poveži ponudnike</div>
                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Ko bo tura ustvarjena, ji povežeš ponudnike in določiš njihovo
                  vlogo na poti.
                </p>

                <button className="mt-5 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300">
                  + Poveži ponudnika
                </button>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Znamenitosti ob trasi
              </div>

              <div className="rounded-2xl border border-dashed border-white/20 bg-black/20 p-6 text-center">
                <div className="text-3xl">📍</div>
                <div className="mt-3 font-bold">Poveži znamenitosti</div>
                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  Razgledi, naravne točke, zgodovina, kultura in Wikipedia
                  povezave.
                </p>

                <button className="mt-5 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300">
                  + Poveži znamenitost
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
