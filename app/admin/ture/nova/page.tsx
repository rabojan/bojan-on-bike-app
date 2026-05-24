"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

import AdminShell from "@/components/AdminShell";

const regions = [
  "Štajerska",
  "Koroška",
  "Gorenjska",
  "Primorska",
  "Notranjska",
  "Dolenjska",
  "Prekmurje",
  "Osrednja Slovenija",
];

const trailTypes = ["MTB", "Gravel", "Cesta", "Bikepacking", "Mešana", "Kolesarska steza"];

const difficulties = ["Lahka", "Srednja", "Zahtevna", "Ekspert"];

const highlightSlots = [
  {
    label: "Poudarek 1",
    titlePlaceholder: "npr. Vstop v gozd",
    descPlaceholder: "Kratek stavek, ki pove zakaj je ta del poti poseben.",
  },
  {
    label: "Poudarek 2",
    titlePlaceholder: "npr. Razgled nad dolino",
    descPlaceholder: "Kratek opis razgleda, postanka, občutka ali posebnosti.",
  },
  {
    label: "Poudarek 3",
    titlePlaceholder: "npr. Flow spust",
    descPlaceholder: "Kratek opis zaključnega poudarka, spusta ali zgodbe ob poti.",
  },
];

function LockedSection() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-zinc-500">
      <span>🔒</span>
      <span>Najprej naloži GPX datoteko, da odkleneš to polje.</span>
    </div>
  );
}

export default function NewTrailPage() {
  const [status, setStatus] = useState("Čaka na objavo");
  const [title, setTitle] = useState("");
  const [druzinskaFriendly, setDruzinskaFriendly] = useState(false);
  const [gpxUploaded, setGpxUploaded] = useState(false);
  const [gpxFileName, setGpxFileName] = useState("");
  const [gpxKm, setGpxKm] = useState("");
  const [gpxVzpon, setGpxVzpon] = useState("");
  const [gpxVisina, setGpxVisina] = useState("");
  const [asfalt, setAsfalt] = useState("");
  const [makadam, setMakadam] = useState("");
  const [gozdna, setGozdna] = useState("");

  const surfaceSum = useMemo(
    () => (Number(asfalt) || 0) + (Number(makadam) || 0) + (Number(gozdna) || 0),
    [asfalt, makadam, gozdna],
  );

  function haversineM(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371000;
    const toRad = (d: number) => (d * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function parseGpx(text: string) {
    const doc = new DOMParser().parseFromString(text, "application/xml");
    const pts = Array.from(doc.querySelectorAll("trkpt"));
    if (pts.length === 0) return null;

    const elevations = pts.map((p) => parseFloat(p.querySelector("ele")?.textContent ?? "NaN"));
    const validEle = elevations.filter((e) => !isNaN(e));

    const maxEle = validEle.length ? Math.max(...validEle) : 0;

    let totalAscent = 0;
    for (let i = 1; i < elevations.length; i++) {
      if (!isNaN(elevations[i]) && !isNaN(elevations[i - 1])) {
        const diff = elevations[i] - elevations[i - 1];
        if (diff > 0) totalAscent += diff;
      }
    }

    let totalDistM = 0;
    for (let i = 1; i < pts.length; i++) {
      const lat1 = parseFloat(pts[i - 1].getAttribute("lat") ?? "0");
      const lon1 = parseFloat(pts[i - 1].getAttribute("lon") ?? "0");
      const lat2 = parseFloat(pts[i].getAttribute("lat") ?? "0");
      const lon2 = parseFloat(pts[i].getAttribute("lon") ?? "0");
      totalDistM += haversineM(lat1, lon1, lat2, lon2);
    }

    return {
      km: (totalDistM / 1000).toFixed(1),
      vzpon: Math.round(totalAscent).toString(),
      visina: Math.round(maxEle).toString(),
    };
  }

  function handleGpxUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setGpxFileName(file.name);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const result = parseGpx(text);
      if (result) {
        setGpxKm(result.km);
        setGpxVzpon(result.vzpon);
        setGpxVisina(result.visina);
      } else {
        setGpxKm("–");
        setGpxVzpon("–");
        setGpxVisina("–");
      }
      setGpxUploaded(true);
    };
    reader.readAsText(file);
  }

  const locked = !gpxUploaded;

  return (
    <AdminShell active="ture">
      <div className="space-y-8">

        {/* Glava */}
        <section className="flex flex-col gap-5 rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Admin / Ture / Nova tura
            </div>
            <h1 className="mt-4 text-4xl font-black">Dodaj novo turo</h1>
            <p className="mt-5 max-w-3xl leading-8 text-zinc-400">
              Najprej vnesi osnovne podatke in naloži GPX. Iz njega se avtomatsko
              izračunajo dolžina, vzpon in najvišja točka. Šele nato izpolniš preostala polja.
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

          {/* LEVA KOLONA */}
          <div className="space-y-6">

            {/* 1. OSNOVNI PODATKI */}
            <div className="rounded-[32px] border border-white/10 bg-black/20 p-7">
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Osnovni podatki
              </div>

              <div className="grid gap-5 md:grid-cols-2">

                {/* Naslov z števcem znakov */}
                <label className="space-y-2 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-zinc-300">Naslov ture *</span>
                    <span className={`text-xs font-bold ${title.length > 22 ? "text-red-400" : "text-zinc-500"}`}>
                      {title.length}/25
                    </span>
                  </div>
                  <input
                    maxLength={25}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="npr. Vinska gravel pot med griči"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                {/* Regija — dropdown */}
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">Regija *</span>
                  <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60">
                    <option value="">— izberi regijo —</option>
                    {regions.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </label>

                {/* Območje s hint placeholderjem */}
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">Območje</span>
                  <input
                    placeholder="npr. Pohorje"
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                  />
                </label>

                {/* Tip ture */}
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">Tip ture *</span>
                  <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60">
                    <option value="">— izberi tip —</option>
                    {trailTypes.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </label>

                {/* Težavnost */}
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">Težavnost *</span>
                  <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60">
                    <option value="">— izberi —</option>
                    {difficulties.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </label>

                {/* Ocenjeni čas — za vse ture */}
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-zinc-300">Ocenjeni čas *</span>
                  <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60">
                    <option value="">— izberi —</option>
                    <option>1–2 uri</option>
                    <option>2–3 ure</option>
                    <option>3–5 ur</option>
                    <option>5–7 ur</option>
                    <option>Cel dan</option>
                    <option>Več dni</option>
                  </select>
                </label>

                {/* E-bike checkbox */}
                <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-white/10 bg-[#07110b] p-4">
                  <input type="checkbox" className="h-5 w-5 accent-[#c58b46]" />
                  <div>
                    <div className="font-bold">E-bike prijazen</div>
                    <div className="text-xs text-zinc-500">Primerno za električna kolesa</div>
                  </div>
                </label>

                {/* Družinam prijazen checkbox */}
                <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-white/10 bg-[#07110b] p-4">
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-[#c58b46]"
                    checked={druzinskaFriendly}
                    onChange={(e) => setDruzinskaFriendly(e.target.checked)}
                  />
                  <div>
                    <div className="font-bold">Družinam prijazen</div>
                    <div className="text-xs text-zinc-500">Primerno za otroke in družine</div>
                  </div>
                </label>

              </div>

              {/* Pogojni blok — pokaže se samo ko je Družinam prijazen odkljukano */}
              {druzinskaFriendly && (
                <div className="mt-5 rounded-2xl border border-[#c58b46]/25 bg-[#c58b46]/5 p-5">
                  <div className="mb-4 text-xs uppercase tracking-[0.3em] text-[#c58b46]">
                    Podrobnosti za družine
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm font-semibold text-zinc-300">Primerno od starosti</span>
                      <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none focus:border-[#c58b46]/60">
                        <option value="">— izberi —</option>
                        <option>Od 4 let (s sedežem)</option>
                        <option>Od 6 let (otroško kolo)</option>
                        <option>Od 8 let</option>
                        <option>Od 10 let</option>
                        <option>Od 12 let</option>
                      </select>
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm font-semibold text-zinc-300">Zahtevnost za otroke</span>
                      <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none focus:border-[#c58b46]/60">
                        <option value="">— izberi —</option>
                        <option>Zelo lahka</option>
                        <option>Lahka</option>
                        <option>Zmerna</option>
                      </select>
                    </label>
                    <label className="space-y-2 md:col-span-2">
                      <span className="text-sm font-semibold text-zinc-300">Postanki in posebnosti ob poti</span>
                      <textarea
                        placeholder="npr. Sladoledarna v Framju, igrišče pri Rudijevem domu, kmetija z živalmi pri km 8..."
                        rows={3}
                        className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm leading-7 outline-none focus:border-[#c58b46]/60"
                      />
                      <p className="text-xs text-zinc-600">
                        Te informacije se prikažejo v sekciji "Postanki ob poti" — nevtralno, koristno za vse.
                      </p>
                    </label>
                  </div>
                </div>
              )}

            </div>

            {/* 2. GPX — OBVEZNO, ODKLENE VSE OSTALO */}
            <div className={`rounded-[32px] border p-7 transition ${gpxUploaded ? "border-emerald-500/30 bg-emerald-500/5" : "border-[#c58b46]/40 bg-[#c58b46]/5"}`}>
              <div className="mb-1 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                GPX datoteka *
              </div>
              <p className="mb-5 text-sm leading-7 text-zinc-400">
                GPX je obvezen korak. Iz njega se avtomatsko izračunajo dolžina,
                skupni vzpon in najvišja točka. Brez naložene datoteke ostalih
                polj ni mogoče izpolniti.
              </p>

              {gpxUploaded ? (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="font-black text-emerald-400">✓</span>
                      <span className="font-bold text-emerald-300">{gpxFileName}</span>
                    </div>
                    <label className="cursor-pointer rounded-full border border-white/10 px-4 py-1.5 text-xs font-semibold text-zinc-400 hover:text-white">
                      Zamenjaj
                      <input type="file" accept=".gpx" className="hidden" onChange={handleGpxUpload} />
                    </label>
                  </div>
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#c58b46]/40 bg-black/20 p-8 text-center transition hover:border-[#c58b46]/70">
                  <div className="text-4xl">🗺️</div>
                  <div className="mt-3 font-bold">Izberi GPX datoteko</div>
                  <div className="mt-1 text-sm text-zinc-500">.gpx format</div>
                  <input type="file" accept=".gpx" className="hidden" onChange={handleGpxUpload} />
                </label>
              )}
            </div>

            {/* 3. PODATKI IZ GPX — samo prikaz */}
            <div className={`rounded-[32px] border border-white/10 bg-black/20 p-7 transition ${locked ? "opacity-40 pointer-events-none select-none" : ""}`}>
              <div className="mb-1 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Podatki iz GPX
              </div>
              <p className="mb-5 text-sm text-zinc-500">
                Samodejno izračunano iz naložene datoteke.
              </p>

              {locked ? (
                <LockedSection />
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Dolžina", value: gpxKm, unit: "km" },
                    { label: "Skupni vzpon", value: gpxVzpon, unit: "vm" },
                    { label: "Najvišja točka", value: gpxVisina, unit: "m" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4"
                    >
                      <div className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400">
                        iz GPX
                      </div>
                      <div className="mt-2 text-xl font-black text-[#f4d7ad]">
                        {item.value}{" "}
                        <span className="text-sm font-normal text-zinc-400">{item.unit}</span>
                      </div>
                      <div className="mt-1 text-xs text-zinc-500">{item.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 4. PODLAGA TRASE */}
            <div className={`rounded-[32px] border border-white/10 bg-black/20 p-7 transition ${locked ? "opacity-40 pointer-events-none select-none" : ""}`}>
              <div className="mb-1 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Podlaga trase *
              </div>
              <p className="mb-5 text-sm text-zinc-500">
                Vnesi deleže posameznih podlag. Skupna vsota mora biti točno 100 %.
              </p>

              {locked ? (
                <LockedSection />
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-4">
                    <label className="space-y-2">
                      <span className="text-sm font-semibold text-zinc-300">Asfalt %</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={asfalt}
                        onChange={(e) => setAsfalt(e.target.value)}
                        placeholder="0"
                        className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm font-semibold text-zinc-300">Makadam %</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={makadam}
                        onChange={(e) => setMakadam(e.target.value)}
                        placeholder="0"
                        className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm font-semibold text-zinc-300">Gozdna pot %</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={gozdna}
                        onChange={(e) => setGozdna(e.target.value)}
                        placeholder="0"
                        className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
                      />
                    </label>
                  </div>

                  <div
                    className={`mt-5 rounded-2xl border p-4 text-sm font-bold transition ${
                      surfaceSum === 100
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                        : surfaceSum === 0
                          ? "border-white/10 bg-black/20 text-zinc-500"
                          : "border-red-500/30 bg-red-500/10 text-red-400"
                    }`}
                  >
                    {surfaceSum === 100
                      ? "✓ Skupaj 100 % — podlaga je pravilno vnesena."
                      : surfaceSum === 0
                        ? "Vnesi deleže podlag (skupaj mora biti 100 %)."
                        : `Skupaj: ${surfaceSum} % — vsota mora biti točno 100 %.`}
                  </div>
                </>
              )}
            </div>

            {/* 5. ZGODBA TURE */}
            <div className={`rounded-[32px] border border-white/10 bg-black/20 p-7 transition ${locked ? "opacity-40 pointer-events-none select-none" : ""}`}>
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Zgodba ture
              </div>

              {locked ? (
                <LockedSection />
              ) : (
                <>
                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-zinc-300">Kratek opis *</span>
                    <textarea
                      placeholder="Kratek opis ture, ki uporabniku pove, zakaj naj jo izbere..."
                      rows={5}
                      className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-8 outline-none focus:border-[#c58b46]/60"
                    />
                  </label>
                  <label className="mt-5 block space-y-2">
                    <span className="text-sm font-semibold text-zinc-300">Daljša zgodba</span>
                    <textarea
                      placeholder="Vzdušje, občutek poti, posebnosti, lokalni namig..."
                      rows={7}
                      className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 leading-8 outline-none focus:border-[#c58b46]/60"
                    />
                  </label>
                </>
              )}
            </div>

          </div>

          {/* DESNA KOLONA */}
          <div className="space-y-6">

            {/* POUDARKI POTI */}
            <div className={`rounded-[32px] border border-white/10 bg-[#0b1a10] p-7 transition ${locked ? "opacity-40 pointer-events-none select-none" : ""}`}>
              <div className="mb-1 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Poudarki poti
              </div>
              <p className="mb-5 text-sm text-zinc-500">
                Trije ključni trenutki ture — naslov, opis in slika.
              </p>

              {locked ? (
                <LockedSection />
              ) : (
                <div className="space-y-5">
                  {highlightSlots.map((h, i) => (
                    <div
                      key={h.label}
                      className="rounded-2xl border border-white/10 bg-black/20 p-4"
                    >
                      <div className="mb-4 font-bold">{h.label}</div>
                      <div className="grid gap-3">
                        <input
                          placeholder={h.titlePlaceholder}
                          className="w-full rounded-xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm outline-none focus:border-[#c58b46]/60"
                        />
                        <textarea
                          placeholder={h.descPlaceholder}
                          rows={3}
                          className="w-full rounded-xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm leading-7 outline-none focus:border-[#c58b46]/60"
                        />
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#07110b]">
                          <div className="flex min-h-[140px] items-center justify-center bg-black/20 p-5 text-center">
                            <div>
                              <div className="text-3xl">📷</div>
                              <div className="mt-2 text-sm font-bold">Slika poudarka {i + 1}</div>
                            </div>
                          </div>
                          <div className="flex gap-3 border-t border-white/10 p-3">
                            <label className="flex-1 cursor-pointer rounded-full border border-white/10 px-3 py-2 text-center text-sm font-semibold text-zinc-300 hover:border-[#c58b46]/40">
                              Naloži
                              <input type="file" accept="image/*" className="hidden" />
                            </label>
                            <button className="rounded-full border border-white/10 px-3 py-2 text-sm text-zinc-500 hover:text-zinc-300">
                              Zamenjaj
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SLIKE IN GALERIJA */}
            <div className={`rounded-[32px] border border-white/10 bg-[#0b1a10] p-7 transition ${locked ? "opacity-40 pointer-events-none select-none" : ""}`}>
              <div className="mb-1 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Slike in galerija
              </div>
              <p className="mb-5 text-sm text-zinc-500">
                Hero slika + do 8 slik v galeriji. Vsako sliko lahko zamenjate.
              </p>

              {locked ? (
                <LockedSection />
              ) : (
                <>
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#07110b]">
                    <div className="flex min-h-[180px] items-center justify-center bg-black/20 p-6 text-center">
                      <div>
                        <div className="text-4xl">🖼️</div>
                        <div className="mt-3 font-bold">Hero slika ture</div>
                        <p className="mt-1 text-sm text-zinc-500">
                          Glavna slika za katalog in vrh strani.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 border-t border-white/10 p-4">
                      <label className="flex-1 cursor-pointer rounded-full bg-[#c58b46] px-4 py-2 text-center text-sm font-bold text-black transition hover:opacity-90">
                        Naloži
                        <input type="file" accept="image/*" className="hidden" />
                      </label>
                      <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200">
                        Zamenjaj
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-4 gap-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <label key={i} className="group cursor-pointer">
                        <div className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-white/20 bg-black/20 transition group-hover:border-[#c58b46]/40">
                          <span className="text-xl text-zinc-600 group-hover:text-zinc-400">+</span>
                        </div>
                        <input type="file" accept="image/*" className="hidden" />
                      </label>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-zinc-600">
                    Klik na polje naloži sliko. Na naloženi sliki klikni za zamenjavo.
                  </p>
                </>
              )}
            </div>

          </div>
        </section>

        {/* RITEM DNEVA — čez celo širino */}
        <section className={`rounded-[32px] border border-white/10 bg-black/20 p-7 transition ${locked ? "opacity-40 pointer-events-none select-none" : ""}`}>
          <div className="mb-1 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
            Ritem dneva
          </div>
          <p className="mb-7 text-sm text-zinc-500">
            Pet postaj skozi dan — ura, naslov in kratki opis. Pomaga kolesarju razumeti kako bo dan potekal, ne samo koliko kilometrov.
          </p>

          {locked ? (
            <LockedSection />
          ) : (
            <div className="grid gap-4 md:grid-cols-5">
              {[
                { titlePlaceholder: "npr. Zgodnji štart",      descPlaceholder: "npr. Zjutraj so poti mirne in gozd še tih." },
                { titlePlaceholder: "npr. Gozdni ritem",       descPlaceholder: "npr. Prvi vzpon prinese pravi občutek dneva." },
                { titlePlaceholder: "npr. Razgled in pavza",   descPlaceholder: "npr. Na višjem delu si vzamemo čas za pogled." },
                { titlePlaceholder: "npr. Postanek ob poti",   descPlaceholder: "npr. Naravna točka za kosilo ali kavo." },
                { titlePlaceholder: "npr. Sproščen zaključek", descPlaceholder: "npr. Ne hiti — flow se začuti, ko pustiš kolesu dihati." },
              ].map((slot, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-[#07110b] p-4">
                  <label className="mb-1 block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                    Ura
                  </label>
                  <input
                    type="time"
                    className="mb-4 w-full rounded-xl border border-[#c58b46]/30 bg-black/30 px-3 py-2 text-center text-sm font-black text-[#c58b46] outline-none focus:border-[#c58b46]/60"
                  />
                  <label className="mb-1 block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                    Naslov
                  </label>
                  <input
                    placeholder={slot.titlePlaceholder}
                    className="mb-4 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm font-bold outline-none focus:border-[#c58b46]/60"
                  />
                  <label className="mb-1 block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                    Opis
                  </label>
                  <textarea
                    placeholder={slot.descPlaceholder}
                    rows={3}
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs leading-6 text-zinc-400 outline-none focus:border-[#c58b46]/60"
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SPODNJA VRSTICA — čez celo širino */}
        <section className="grid gap-6 lg:grid-cols-[1fr_1fr_320px]">

          {/* PONUDNIKI OB TRASI */}
          <div className={`rounded-[32px] border border-white/10 bg-[#0b1a10] p-7 transition ${locked ? "opacity-40 pointer-events-none select-none" : ""}`}>
            <div className="mb-1 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Ponudniki ob trasi
            </div>
            <p className="mb-5 text-sm text-zinc-500">
              Na osnovi GPX se iz baze prikažejo vsi ponudniki v 1 km od trase.
            </p>

            {locked ? (
              <LockedSection />
            ) : (
              <div className="rounded-2xl border border-[#c58b46]/20 bg-[#c58b46]/5 p-5">
                <div className="text-sm font-bold text-[#f4d7ad]">Predlog na osnovi GPX</div>
                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Ko shraniš turo, sistem avtomatsko predlaga ponudnike iz baze,
                  ki so ob trasi ali do 1 km od nje. Označi tiste, ki jih želiš
                  prikazati, ali dodaj svojega.
                </p>
                <button className="mt-4 rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-zinc-300 hover:border-[#c58b46]/40">
                  + Dodaj ponudnika ročno
                </button>
              </div>
            )}
          </div>

          {/* ZNAMENITOSTI OB TRASI */}
          <div className={`rounded-[32px] border border-white/10 bg-[#0b1a10] p-7 transition ${locked ? "opacity-40 pointer-events-none select-none" : ""}`}>
            <div className="mb-1 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Znamenitosti ob trasi
            </div>
            <p className="mb-5 text-sm text-zinc-500">
              Na osnovi GPX se iz baze prikažejo vse znamenitosti v 1 km od trase.
            </p>

            {locked ? (
              <LockedSection />
            ) : (
              <div className="rounded-2xl border border-[#c58b46]/20 bg-[#c58b46]/5 p-5">
                <div className="text-sm font-bold text-[#f4d7ad]">Predlog na osnovi GPX</div>
                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Ko shraniš turo, sistem avtomatsko predlaga znamenitosti iz baze,
                  ki so v 1 km od trase. Označi tiste, ki jih želiš prikazati,
                  ali dodaj svojo.
                </p>
                <button className="mt-4 rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-zinc-300 hover:border-[#c58b46]/40">
                  + Dodaj znamenitost ročno
                </button>
              </div>
            )}
          </div>

          {/* STATUS OBJAVE */}
          <div className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-7">
            <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Status objave
            </div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-5 py-4 outline-none focus:border-[#c58b46]/60"
            >
              <option>Čaka na objavo</option>
              <option>Oddano v pregled</option>
              <option>Potrebni popravki</option>
              <option>Objavljeno</option>
              <option>Arhivirano</option>
            </select>
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-zinc-400">
              Nova tura gre po oddaji v pregled pred objavo. Objavo potrdi glavni admin.
            </div>
          </div>

        </section>
      </div>
    </AdminShell>
  );
}
