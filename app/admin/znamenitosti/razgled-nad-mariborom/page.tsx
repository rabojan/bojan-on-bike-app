"use client";

import Link from "next/link";
import { useState } from "react";

import AdminShell from "@/components/AdminShell";

const poiTypes = [
  "Narava",
  "Razgled",
  "Voda / slap / jezero",
  "Zgodovina",
  "Kultura",
  "Arhitektura",
  "Foto točka",
  "Družinska zanimivost",
  "Wikipedia točka",
];

const connectedTrails = [
  {
    name: "Gozdni flow nad Mariborom",
    distance: "200 m od trase",
    role: "Razgled / foto postanek",
    selected: true,
  },
  {
    name: "Med vinogradi in griči",
    distance: "ni na tej turi",
    role: "",
    selected: false,
  },
  {
    name: "Alpski pobeg ob vodi",
    distance: "ni na tej turi",
    role: "",
    selected: false,
  },
];

export default function EditPoiPage() {
  const [status, setStatus] = useState("Objavljeno");

  return (
    <AdminShell active="znamenitosti">
      <div className="space-y-8">
        <section className="flex flex-col gap-5 rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Admin / Znamenitosti / Uredi
            </div>

            <h1 className="mt-4 text-4xl font-black">
              Razgled nad Mariborom
            </h1>

            <p className="mt-5 max-w-3xl leading-8 text-zinc-400">
              Tukaj urejaš znamenitost oziroma POI točko: opis, lokacijo,
              sliko, Wikipedia povezavo in povezane ture.
            </p>

            <div className="mt-5 rounded-2xl border border-[#c58b46]/30 bg-[#c58b46]/10 p-4 text-sm leading-7 text-[#f4d7ad]">
              Obvezna polja za objavo: ime, regija, tip, kratek opis, slika,
              lokacija in status. Brez teh podatkov vsebina kasneje ne bo mogla
              biti objavljena.
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/znamenitosti"
              className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-zinc-300"
            >
              ← Nazaj na znamenitosti
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

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-black/20 p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Osnovni podatki
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2 md:col-span-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Ime znamenitosti *
                  </span>
                  <input
                    defaultValue="Razgled nad Mariborom"
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
                    defaultValue="Pohorje"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <div className="space-y-3 md:col-span-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Tip znamenitosti *
                  </span>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {poiTypes.map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#07110b] p-4"
                      >
                        <input
                          type="checkbox"
                          defaultChecked={["Razgled", "Foto točka"].includes(
                            type
                          )}
                        />
                        <span className="font-bold">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-black/20 p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Opis znamenitosti
              </div>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-zinc-300">
                  Kratek opis *
                </span>
                <textarea
                  defaultValue="Kratek postanek z odprtim pogledom proti mestu in Dravski dolini."
                  rows={5}
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-8 outline-none focus:border-[#c58b46]/60"
                />
              </label>

              <label className="mt-5 block space-y-2">
                <span className="text-sm font-semibold text-zinc-300">
                  Daljša zgodba / kontekst
                </span>
                <textarea
                  placeholder="Dodaj širši kontekst, zgodbo lokacije ali občutek postanka..."
                  rows={6}
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-8 outline-none focus:border-[#c58b46]/60"
                />
              </label>

              <label className="mt-5 block space-y-2">
                <span className="text-sm font-semibold text-zinc-300">
                  Wikipedia povezava
                </span>
                <input
                  placeholder="https://sl.wikipedia.org/..."
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                />
              </label>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-black/20 p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Slika znamenitosti *
              </div>

              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#07110b]">
                <div className="flex min-h-[240px] items-center justify-center bg-black/20 p-8 text-center">
                  <div>
                    <div className="text-5xl">📍</div>
                    <div className="mt-4 text-xl font-black">
                      Naloži sliko znamenitosti
                    </div>
                    <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-400">
                      Slika razgleda, naravne točke ali detajla ob poti.
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

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-zinc-400">
                Trenutni status:{" "}
                <span className="font-bold text-[#f4d7ad]">{status}</span>.
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Lokacija znamenitosti
              </div>

              <div className="grid gap-5">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Naslov ali opis lokacije *
                  </span>
                  <input
                    defaultValue="Razgledna točka nad Mariborom"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-zinc-300">
                      Latitude
                    </span>
                    <input
                      defaultValue="46.5547"
                      className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-zinc-300">
                      Longitude
                    </span>
                    <input
                      defaultValue="15.6459"
                      className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                    />
                  </label>
                </div>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Google Maps povezava
                  </span>
                  <input
                    defaultValue="https://maps.google.com/?q=46.5547,15.6459"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 text-sm outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Opomba lokacije
                  </span>
                  <textarea
                    defaultValue="Kratek odcep od trase, primeren za foto postanek."
                    rows={4}
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-8 outline-none focus:border-[#c58b46]/60"
                  />
                </label>
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
                          placeholder="npr. foto postanek"
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
