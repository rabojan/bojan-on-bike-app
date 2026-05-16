"use client";

import Link from "next/link";
import { useState } from "react";

import AdminShell from "@/components/AdminShell";

const connectedTrails = [
  {
    name: "Gozdni flow nad Mariborom",
    distance: "ob trasi",
    role: "Kosilo / postanek",
    selected: true,
  },
  {
    name: "Pohorski razgledi",
    distance: "700 m od trase",
    role: "Postanek / razgled",
    selected: true,
  },
  {
    name: "Med vinogradi in griči",
    distance: "ni na tej turi",
    role: "",
    selected: false,
  },
];

export default function EditProviderPage() {
  const [status, setStatus] = useState("Objavljeno");
  const [hasCharging, setHasCharging] = useState(true);
  const [isPartner, setIsPartner] = useState(true);

  return (
    <AdminShell active="ponudniki">
      <div className="space-y-8">
        <section className="flex flex-col gap-5 rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Admin / Ponudniki / Uredi
            </div>

            <h1 className="mt-4 text-4xl font-black">
              Rudijev dom na Pohorju
            </h1>

            <p className="mt-5 max-w-3xl leading-8 text-zinc-400">
              Tukaj boš urejal profil ponudnika: opis, kontakt, lokacijo,
              povezane ture, oddaljenost od trase in bike friendly informacije.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/ponudniki"
              className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-zinc-300"
            >
              ← Nazaj na ponudnike
            </Link>

            <Link
              href="/ponudniki"
              className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-zinc-300"
            >
              Predogled
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
                    Ime ponudnika
                  </span>
                  <input
                    defaultValue="Rudijev dom na Pohorju"
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

                <label className="space-y-2 md:col-span-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Tip ponudnika
                  </span>
                  <select
                    defaultValue="Kulinarika / Prenočišče"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  >
                    <option>Kulinarika</option>
                    <option>Vino</option>
                    <option>Prenočišče</option>
                    <option>Kulinarika / Prenočišče</option>
                    <option>Vino / Kulinarika</option>
                    <option>Polnilnica</option>
                  </select>
                </label>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#07110b] p-4">
                  <input
                    type="checkbox"
                    checked={isPartner}
                    onChange={(event) => setIsPartner(event.target.checked)}
                  />
                  <span className="font-bold">Partner platforme</span>
                </label>

                <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#07110b] p-4">
                  <input
                    type="checkbox"
                    checked={hasCharging}
                    onChange={(event) => setHasCharging(event.target.checked)}
                  />
                  <span className="font-bold">e-bike polnilnica</span>
                </label>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-black/20 p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Kontakt
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Telefon
                  </span>
                  <input
                    defaultValue="+386 40 123 456"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Email
                  </span>
                  <input
                    defaultValue="info@rudijevdom.si"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2 md:col-span-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Spletna stran
                  </span>
                  <input
                    defaultValue="https://rudijev-dom.si"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2 md:col-span-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Booking / rezervacijska povezava
                  </span>
                  <input
                    placeholder="https://..."
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-black/20 p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Opis ponudnika
              </div>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-zinc-300">
                  Kratek opis
                </span>
                <textarea
                  defaultValue="Topel domač obrok, terasa med gozdovi in dobra izhodiščna točka za kolesarski dan na Pohorju."
                  rows={5}
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-8 outline-none focus:border-[#c58b46]/60"
                />
              </label>

              <label className="mt-5 block space-y-2">
                <span className="text-sm font-semibold text-zinc-300">
                  Bike friendly opis
                </span>
                <textarea
                  defaultValue="Primeren postanek za kolesarje, možnost polnjenja e-bike baterije in prostor za krajši počitek po turi."
                  rows={5}
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-8 outline-none focus:border-[#c58b46]/60"
                />
              </label>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-black/20 p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Slika ponudnika
              </div>

              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#07110b]">
                <div className="flex min-h-[240px] items-center justify-center bg-black/20 p-8 text-center">
                  <div>
                    <div className="text-5xl">📷</div>
                    <div className="mt-4 text-xl font-black">
                      Naloži sliko ponudnika
                    </div>
                    <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-400">
                      Izberi fotografijo iz računalnika. Najbolje delujejo
                      horizontalne slike ponudnika, ambienta, hrane ali lokacije.
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

                  <div className="mt-4 text-center text-xs leading-6 text-zinc-500">
                    Podprto: JPG, PNG, WEBP. Kasneje bo slika shranjena v
                    Supabase Storage.
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-dashed border-white/20 bg-black/20 p-5 text-sm leading-7 text-zinc-400">
                To je trenutno upload UI prototip. Po povezavi s Supabase bo
                sistem dejansko naložil sliko, ustvaril URL in ga shranil pri
                ponudniku.
              </div>
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
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Lokacija ponudnika
              </div>

              <div className="grid gap-5">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Naslov
                  </span>
                  <input
                    defaultValue="Hočko Pohorje, Slovenija"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-zinc-300">
                      Latitude
                    </span>
                    <input
                      defaultValue="46.5352"
                      className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-zinc-300">
                      Longitude
                    </span>
                    <input
                      defaultValue="15.6021"
                      className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                    />
                  </label>
                </div>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Google Maps povezava
                  </span>
                  <input
                    defaultValue="https://maps.google.com/?q=46.5352,15.6021"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 text-sm outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Opomba lokacije
                  </span>
                  <textarea
                    defaultValue="Vhod z glavne ceste, polnilnica ob parkirišču."
                    rows={4}
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-8 outline-none focus:border-[#c58b46]/60"
                  />
                </label>
              </div>

              <div className="mt-5 rounded-2xl border border-dashed border-white/20 bg-black/20 p-5 text-sm leading-7 text-zinc-400">
                To je faza 1 lokacije: ročni vnos koordinat in povezave.
                Po Supabase povezavi dodamo zemljevid, marker in iskanje iz
                naslova.
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Povezane ture
              </div>

              <div className="space-y-4">
                {connectedTrails.map((trail) => (
                  <div
                    key={trail.name}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked={trail.selected} />
                      <span className="font-bold">{trail.name}</span>
                    </label>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <label className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                          Vloga na turi
                        </span>
                        <input
                          defaultValue={trail.role}
                          placeholder="npr. kosilo, vino, prenočišče"
                          className="w-full rounded-xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none focus:border-[#c58b46]/60"
                        />
                      </label>

                      <label className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                          Oddaljenost
                        </span>
                        <input
                          defaultValue={trail.distance}
                          placeholder="npr. 300 m od trase"
                          className="w-full rounded-xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none focus:border-[#c58b46]/60"
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-5 w-full rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300">
                + Poveži turo
              </button>
            </div>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
