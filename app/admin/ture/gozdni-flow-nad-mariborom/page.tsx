"use client";

import Link from "next/link";
import { useState } from "react";

import AdminShell from "@/components/AdminShell";

const providers = [
  {
    name: "Rudijev dom na Pohorju",
    role: "Kosilo / postanek",
    distance: "ob trasi",
    selected: true,
  },
  {
    name: "Gorska hiša Pohorje",
    role: "Prenočišče / e-bike polnilnica",
    distance: "500 m od trase",
    selected: true,
  },
  {
    name: "Vinska klet med griči",
    role: "Vino / kulinarika",
    distance: "ni na tej turi",
    selected: false,
  },
];

const pois = [
  {
    name: "Razgled nad Mariborom",
    type: "Razgled",
    distance: "200 m od trase",
    wikipedia: "",
    selected: true,
  },
  {
    name: "Pohorski gozdni odsek",
    type: "Narava",
    distance: "na trasi",
    wikipedia: "",
    selected: false,
  },
  {
    name: "Stara planinska pot",
    type: "Zgodovina",
    distance: "700 m od trase",
    wikipedia: "https://sl.wikipedia.org/",
    selected: false,
  },
];

const moments = [
  {
    title: "Vstop v pohorski gozd",
    location: "4 km",
    type: "Začetek doživetja",
    description:
      "Ko mesto ostane za teboj in se začne tišina pohorskega gozda.",
    image:
      "https://images.unsplash.com/photo-1669372701525-06dde0779ba6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Razgled nad Mariborom",
    location: "13 km",
    type: "Razgled",
    description:
      "Kratek postanek z odprtim pogledom proti mestu in Dravski dolini.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Flow spust skozi gozd",
    location: "24 km",
    type: "Spust",
    description:
      "Najbolj igriv del ture, kjer pot steče skozi gozdne ovinke.",
    image:
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=1200&auto=format&fit=crop",
  },
];

const galleryImages = [
  {
    title: "Hero slika ture",
    url: "https://images.unsplash.com/photo-1669372701525-06dde0779ba6?q=80&w=1800&auto=format&fit=crop",
  },
  {
    title: "Razgled / trenutek",
    url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Gozdni flow",
    url: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=1200&auto=format&fit=crop",
  },
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

        <section className="grid gap-6 xl:grid-cols-2">
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


<div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Slike in galerija
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

              <div className="mt-6 space-y-4">
                {galleryImages.map((image, index) => (
                  <div
                    key={image.title}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-bold">{image.title}</div>
                        <div className="mt-1 text-xs text-zinc-500">
                          Slika {index + 1}
                        </div>
                      </div>

                      <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400">
                        vrstni red
                      </div>
                    </div>

                    <input
                      defaultValue={image.url}
                      className="w-full rounded-xl border border-white/10 bg-[#07110b] px-4 py-3 text-xs outline-none focus:border-[#c58b46]/60"
                    />
                  </div>
                ))}
              </div>

              <button className="mt-5 w-full rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300">
                + Dodaj sliko
              </button>

              <div className="mt-5 rounded-2xl border border-dashed border-white/20 bg-black/20 p-5 text-sm leading-7 text-zinc-400">
                Za zdaj vnašamo URL slike. Kasneje bo tukaj pravi upload v
                Supabase Storage, urejanje vrstnega reda in brisanje slik.
              </div>
            </div>

<div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Ponudniki ob trasi
              </div>

              <div className="space-y-4">
                {providers.map((provider) => (
                  <div
                    key={provider.name}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked={provider.selected} />
                      <span className="font-bold">{provider.name}</span>
                    </label>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <label className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                          Vloga na turi
                        </span>
                        <input
                          defaultValue={provider.role}
                          className="w-full rounded-xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none focus:border-[#c58b46]/60"
                        />
                      </label>

                      <label className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                          Oddaljenost
                        </span>
                        <input
                          defaultValue={provider.distance}
                          className="w-full rounded-xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none focus:border-[#c58b46]/60"
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-5 w-full rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300">
                + Poveži ponudnika
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Doživetveni trenutki ture
              </div>

              <div className="space-y-5">
                {moments.map((moment, index) => (
                  <div
                    key={moment.title}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="font-bold">Trenutek {index + 1}</div>
                      <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400">
                        {moment.location}
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <input
                        defaultValue={moment.title}
                        className="w-full rounded-xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none focus:border-[#c58b46]/60"
                      />

                      <div className="grid gap-3 sm:grid-cols-2">
                        <input
                          defaultValue={moment.location}
                          placeholder="km / lokacija"
                          className="w-full rounded-xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none focus:border-[#c58b46]/60"
                        />

                        <input
                          defaultValue={moment.type}
                          placeholder="tip trenutka"
                          className="w-full rounded-xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none focus:border-[#c58b46]/60"
                        />
                      </div>

                      <textarea
                        defaultValue={moment.description}
                        rows={3}
                        className="w-full rounded-xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm leading-7 outline-none focus:border-[#c58b46]/60"
                      />

                      <input
                        defaultValue={moment.image}
                        placeholder="URL slike"
                        className="w-full rounded-xl border border-white/10 bg-[#07110b] px-4 py-3 text-xs outline-none focus:border-[#c58b46]/60"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-5 w-full rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300">
                + Dodaj trenutek
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
                Znamenitosti ob trasi
              </div>

              <div className="space-y-4">
                {pois.map((poi) => (
                  <div
                    key={poi.name}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked={poi.selected} />
                      <span className="font-bold">{poi.name}</span>
                    </label>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <label className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                          Tip
                        </span>
                        <input
                          defaultValue={poi.type}
                          className="w-full rounded-xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none focus:border-[#c58b46]/60"
                        />
                      </label>

                      <label className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                          Oddaljenost
                        </span>
                        <input
                          defaultValue={poi.distance}
                          className="w-full rounded-xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none focus:border-[#c58b46]/60"
                        />
                      </label>

                      <label className="space-y-2 sm:col-span-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                          Wikipedia povezava
                        </span>
                        <input
                          defaultValue={poi.wikipedia}
                          placeholder="https://sl.wikipedia.org/..."
                          className="w-full rounded-xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none focus:border-[#c58b46]/60"
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-5 w-full rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300">
                + Poveži znamenitost
              </button>
            </div>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
