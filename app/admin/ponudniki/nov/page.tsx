"use client";

import Link from "next/link";
import { useState } from "react";

import AdminShell from "@/components/AdminShell";


const providerTypes = [
  "Kulinarika",
  "Vino",
  "Prenočišče",
  "Bike servis",
  "Lokalni produkti",
  "Vodnik / agencija",
];

const connectedTrails = [
  {
    name: "Gozdni flow nad Mariborom",
    distancePlaceholder: "npr. ob trasi",
    rolePlaceholder: "npr. kosilo / postanek",
  },
  {
    name: "Med vinogradi in griči",
    distancePlaceholder: "npr. 300 m od trase",
    rolePlaceholder: "npr. vino / kulinarika",
  },
  {
    name: "Alpski pobeg ob vodi",
    distancePlaceholder: "npr. 1,2 km od trase",
    rolePlaceholder: "npr. prenočišče",
  },
];

export default function NewProviderPage() {
  const [status, setStatus] = useState("Čaka na objavo");
  const [hasCharging, setHasCharging] = useState(false);
  const [isPartner, setIsPartner] = useState(false);
  const [zakaj, setZakaj] = useState("");
  const [quote, setQuote] = useState("");
  const [featureTitles, setFeatureTitles] = useState(["", "", "", "", "", ""]);
  const [featureDescs, setFeatureDescs] = useState(["", "", "", "", "", ""]);

  return (
    <AdminShell active="ponudniki">
      <div className="space-y-8">
        <section className="flex flex-col gap-5 rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Admin / Ponudniki / Nov ponudnik
            </div>

            <h1 className="mt-4 text-4xl font-black">Dodaj ponudnika</h1>

            <p className="mt-5 max-w-3xl leading-8 text-zinc-400">
              Tukaj dodaš lokalnega ponudnika, ki lahko postane del ture,
              doživetja ali regijskega ekosistema: kulinarika, vino, prenočišče,
              polnilnica ali druga bike-friendly točka.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/ponudniki"
              className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-zinc-300"
            >
              ← Nazaj na ponudnike
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
                    Ime ponudnika
                  </span>
                  <input
                    placeholder="npr. Gostilna pri razgledu"
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
                    placeholder="npr. Pohorje"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <div className="space-y-3 md:col-span-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Tip ponudnika
                  </span>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {providerTypes.map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#07110b] p-4"
                      >
                        <input type="checkbox" />
                        <span className="font-bold">{type}</span>
                      </label>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#07110b] p-4 text-sm leading-7 text-zinc-400">
                    Izbereš lahko več tipov. Primer: ponudnik je lahko hkrati
                    vinska klet, kulinarika, prenočišče, lokalni produkti ali bike servis.
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#07110b] p-4">
                  <input
                    type="checkbox"
                    checked={isPartner}
                    onChange={(event) => setIsPartner(event.target.checked)}
                  />
                  <span className="font-bold">Bojan on Bike partner</span>
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

              <div className="mt-5 rounded-2xl border border-white/10 bg-[#07110b] p-4 text-sm leading-7 text-zinc-400">
                <span className="font-bold text-[#f4d7ad]">
                  Bojan on Bike partner
                </span>{" "}
                pomeni preverjenega ponudnika, ki je del izbrane mreže in ga
                lahko na javni strani označimo kot priporočeno postojanko za
                kolesarje. e-bike polnilnica pa je posebna storitev, zato je
                ločena od tipa ponudnika.
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
                    placeholder="+386 ..."
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Email
                  </span>
                  <input
                    placeholder="info@ponudnik.si"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2 md:col-span-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Spletna stran
                  </span>
                  <input
                    placeholder="https://..."
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
                <span className="text-sm font-semibold text-zinc-300">Prvi vtis o ponudniku</span>
                <p className="text-xs text-zinc-600">Prikaže se kot subtitle pod naslovom na detail strani. Največ 180 znakov.</p>
                <textarea
                  maxLength={180}
                  rows={2}
                  value={zakaj}
                  onChange={(e) => setZakaj(e.target.value)}
                  placeholder="Kratek, udaren vtis — kaj kolesarj najprej začuti, ko pride sem."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-7 outline-none focus:border-[#c58b46]/60"
                />
                <div className={`text-right text-xs font-bold ${zakaj.length > 160 ? "text-amber-400" : "text-zinc-600"}`}>
                  {180 - zakaj.length} znakov preostane
                </div>
              </label>

              <label className="mt-5 block space-y-2">
                <span className="text-sm font-semibold text-zinc-300">
                  Zgodba ponudnika
                </span>
                <textarea
                  placeholder="Daljše besedilo, ki pove kdo je ponudnik, kakšen je prostor, zakaj se splača ustaviti..."
                  rows={6}
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-8 outline-none focus:border-[#c58b46]/60"
                />
                <p className="text-xs text-zinc-600">
                  Prikaže se v heroju in glavnem tekstu na detail strani ponudnika. Piši v prvem ali tretjem osebu, v duhu Bojan on Bike glasnika.
                </p>
              </label>

              <label className="mt-5 block space-y-2">
                <span className="text-sm font-semibold text-zinc-300">
                  Bike friendly opis
                </span>
                <textarea
                  placeholder="Kaj ponudnik nudi kolesarjem: varno parkiranje koles, polnilnica, terasa, voda, servisna točka..."
                  rows={5}
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-8 outline-none focus:border-[#c58b46]/60"
                />
              </label>

              <label className="mt-5 block space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-zinc-300">Zakaj se ustaviti</span>
                  <span className={`text-xs font-bold ${quote.length > 90 ? "text-amber-400" : "text-zinc-600"}`}>
                    {100 - quote.length} znakov preostane
                  </span>
                </div>
                <p className="text-xs text-zinc-500">Stavek, ki ga ambasador sporoča o ponudniku — prikaže se v zlatem boxu na strani.</p>
                <input
                  maxLength={110}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder='npr. "Najboljša goveja juha pod Bočem."'
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                />
                <div className={`text-right text-xs font-bold ${quote.length > 95 ? "text-amber-400" : "text-zinc-600"}`}>
                  {110 - quote.length} znakov preostane
                </div>
              </label>
            </div>

            {/* POUDARKI PONUDNIKA */}
            <div className="rounded-[32px] border border-white/10 bg-black/20 p-7">
              <div className="mb-2 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Poudarki ponudnika
              </div>
              <p className="mb-6 text-sm leading-7 text-zinc-500">
                Do 6 kratkih kartic, ki pokažejo kaj ponudnik nudi: domača kuhinja, e-bike polnilnica, prenočišče, kava...
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="rounded-2xl border border-white/10 bg-[#07110b] p-4">
                    <div className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
                      Poudarek {i + 1}
                    </div>

                    <div className="space-y-3">
                      <label className="block space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-zinc-400">Naslov</span>
                          <span className={`text-[10px] font-bold ${featureTitles[i].length > 25 ? "text-red-400" : "text-zinc-600"}`}>
                            {featureTitles[i].length}/30
                          </span>
                        </div>
                        <input
                          maxLength={30}
                          value={featureTitles[i]}
                          onChange={(e) => {
                            const next = [...featureTitles];
                            next[i] = e.target.value;
                            setFeatureTitles(next);
                          }}
                          placeholder="npr. Domača kuhinja"
                          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm outline-none focus:border-[#c58b46]/60"
                        />
                      </label>

                      <label className="block space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-zinc-400">Opis</span>
                          <span className={`text-[10px] font-bold ${featureDescs[i].length > 70 ? "text-red-400" : "text-zinc-600"}`}>
                            {featureDescs[i].length}/80
                          </span>
                        </div>
                        <input
                          maxLength={80}
                          value={featureDescs[i]}
                          onChange={(e) => {
                            const next = [...featureDescs];
                            next[i] = e.target.value;
                            setFeatureDescs(next);
                          }}
                          placeholder="npr. Topel obrok po turi, domači okusi."
                          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm outline-none focus:border-[#c58b46]/60"
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-black/20 p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Slike ponudnika
              </div>

              {/* Hero slika */}
              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#07110b]">
                <div className="flex min-h-[200px] items-center justify-center bg-black/20 p-8 text-center">
                  <div>
                    <div className="text-5xl">📷</div>
                    <div className="mt-4 text-xl font-black">
                      Hero slika ponudnika
                    </div>
                    <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-400">
                      Glavna slika, prikaže se v heroju in katalogu. Horizontalna,
                      ambiente, terasa ali razgled.
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

              {/* Galerija */}
              <div className="mt-6">
                <div className="mb-3 text-sm font-semibold text-zinc-300">
                  Galerija <span className="font-normal text-zinc-600">(do 6 slik)</span>
                </div>
                <p className="mb-4 text-xs leading-6 text-zinc-600">
                  Slike galerije se prikažejo na detail strani ponudnika v sekciji "v slikah". Priporoča se vsaj 4 slike: ambient, hrana, pogled, detajl.
                </p>

                <div className="grid grid-cols-3 gap-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <label key={i} className="group cursor-pointer">
                      <div className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-white/20 bg-black/20 transition group-hover:border-[#c58b46]/40">
                        <span className="text-xl text-zinc-600 group-hover:text-zinc-400">+</span>
                      </div>
                      <input type="file" accept="image/*" className="hidden" />
                    </label>
                  ))}
                </div>
                <p className="mt-3 text-xs text-zinc-600">
                  Podprto: JPG, PNG, WEBP. Slike bodo shranjene v Supabase Storage.
                </p>
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
                <option>Čaka na objavo</option>
                <option>Oddano v pregled</option>
                <option>Potrebni popravki</option>
                <option>Objavljeno</option>
                <option>Arhivirano</option>
              </select>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-zinc-400">
                Nov ponudnik gre po oddaji v pregled pred objavo. Objavo kasneje
                potrdi glavni admin.
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
                    placeholder="npr. Hočko Pohorje, Slovenija"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-zinc-300">
                      Latitude
                    </span>
                    <input
                      placeholder="46.xxxx"
                      className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-zinc-300">
                      Longitude
                    </span>
                    <input
                      placeholder="15.xxxx"
                      className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                    />
                  </label>
                </div>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Google Maps povezava
                  </span>
                  <input
                    placeholder="https://maps.google.com/..."
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 text-sm outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">
                    Opomba lokacije
                  </span>
                  <textarea
                    placeholder="npr. vhod z dvorišča, polnilnica ob parkirišču..."
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
                      <input type="checkbox" />
                      <span className="font-bold">{trail.name}</span>
                    </label>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <label className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                          Vloga na turi
                        </span>
                        <input
                          placeholder={trail.rolePlaceholder}
                          className="w-full rounded-xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none focus:border-[#c58b46]/60"
                        />
                      </label>

                      <label className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                          Oddaljenost
                        </span>
                        <input
                          placeholder={trail.distancePlaceholder}
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
