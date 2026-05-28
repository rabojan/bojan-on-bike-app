"use client";

import Link from "next/link";
import { useState } from "react";

import AdminShell from "@/components/AdminShell";

const initialTrails = [
  {
    title: "Gozdni flow nad Mariborom",
    slug: "gozdni-flow-nad-mariborom",
    status: "Objavljeno",
    region: "Štajerska",
    type: "MTB",
    difficulty: "Srednja",
    distance: "32 km",
    elevation: "890 vm",
    surface: "Asfalt 10% • Makadam 25% • Gozdna pot 65%",
    hasGpx: false,
    hasProviders: true,
    hasGallery: true,
    updated: "Danes",
  },
  {
    title: "Med vinogradi in griči",
    slug: "med-vinogradi-in-grici",
    status: "Čaka na objavo",
    region: "Štajerska",
    type: "Gravel",
    difficulty: "Lahka",
    distance: "48 km",
    elevation: "620 vm",
    surface: "Asfalt 45% • Makadam 40% • Gozdna pot 15%",
    hasGpx: false,
    hasProviders: true,
    hasGallery: true,
    updated: "Čaka na objavo",
  },
  {
    title: "Alpski pobeg ob vodi",
    slug: "alpski-pobeg-ob-vodi",
    status: "Čaka na objavo",
    region: "Gorenjska",
    type: "Bikepacking",
    difficulty: "Zahtevna",
    distance: "86 km",
    elevation: "1450 vm",
    surface: "Asfalt 30% • Makadam 50% • Gozdna pot 20%",
    hasGpx: false,
    hasProviders: false,
    hasGallery: true,
    updated: "Čaka na objavo",
  },
];

export default function AdminTrailsPage() {
  const [trails, setTrails] = useState(initialTrails);
  const [confirmSlug, setConfirmSlug] = useState<string | null>(null);

  function deleteTrail(slug: string) {
    setTrails((prev) => prev.filter((t) => t.slug !== slug));
    setConfirmSlug(null);
  }

  return (
    <AdminShell active="ture">
      <div className="space-y-8">
        <section className="flex flex-col gap-5 rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Admin / Ture
            </div>
            <h1 className="mt-4 text-4xl font-black">Upravljanje tur</h1>
            <p className="mt-5 max-w-3xl leading-8 text-zinc-400">
              Tukaj boš dodajal in urejal ture, GPX, podlago, galerijo,
              povezane ponudnike in znamenitosti. Vreme se kasneje potegne
              avtomatsko glede na lokacijo trase.
            </p>
          </div>

          <Link
            href="/admin/ture/nova"
            className="rounded-full bg-[#c58b46] px-6 py-4 text-sm font-bold text-black"
          >
            + Dodaj novo turo
          </Link>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-4xl font-black">3</div>
            <div className="mt-2 text-sm text-zinc-400">vse ture</div>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-4xl font-black">1</div>
            <div className="mt-2 text-sm text-zinc-400">objavljena</div>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-4xl font-black">2</div>
            <div className="mt-2 text-sm text-zinc-400">čakata na objavo</div>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-4xl font-black">0</div>
            <div className="mt-2 text-sm text-zinc-400">GPX naloženih</div>
          </div>
        </section>

        <section className="grid gap-5">
          {trails.map((trail) => (
            <article
              key={trail.slug}
              className="rounded-[32px] border border-white/10 bg-black/20 p-6"
            >
              <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-4 py-2 text-xs font-bold ${
                        trail.status === "Objavljeno"
                          ? "bg-emerald-500/10 text-emerald-300"
                          : "bg-yellow-500/10 text-yellow-300"
                      }`}
                    >
                      {trail.status}
                    </span>

                    <span className="rounded-full border border-white/10 bg-[#07110b] px-4 py-2 text-xs text-zinc-300">
                      {trail.region}
                    </span>

                    <span className="rounded-full border border-white/10 bg-[#07110b] px-4 py-2 text-xs text-zinc-300">
                      {trail.type}
                    </span>
                  </div>

                  <h2 className="text-3xl font-black">{trail.title}</h2>

                  <div className="mt-5 flex flex-wrap gap-3 text-sm text-zinc-300">
                    <span className="rounded-full border border-white/10 px-4 py-2">
                      {trail.distance}
                    </span>
                    <span className="rounded-full border border-white/10 px-4 py-2">
                      {trail.elevation}
                    </span>
                    <span className="rounded-full border border-white/10 px-4 py-2">
                      {trail.difficulty}
                    </span>
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-[#07110b] p-4 text-sm text-zinc-300">
                    {trail.surface}
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-[#07110b] p-5">
                  <div className="mb-4 text-xs uppercase tracking-[0.25em] text-[#c58b46]">
                    Stanje vsebine
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-zinc-400">GPX</span>
                      <span className={trail.hasGpx ? "text-emerald-400" : "text-red-400"}>
                        {trail.hasGpx ? "✓ naložen" : "✗ manjka"}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-zinc-400">Ponudniki</span>
                      <span className={trail.hasProviders ? "text-emerald-400" : "text-zinc-500"}>
                        {trail.hasProviders ? "✓ dodani" : "— manjkajo"}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-zinc-400">Galerija</span>
                      <span className={trail.hasGallery ? "text-emerald-400" : "text-zinc-500"}>
                        {trail.hasGallery ? "✓ dodana" : "— manjka"}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-zinc-400">Zadnja sprememba</span>
                      <span className="text-zinc-300">{trail.updated}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/admin/ture/${trail.slug}`}
                      className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black"
                    >
                      Uredi
                    </Link>

                    {trail.status === "Objavljeno" && (
                      <Link
                        href={`/ture/${trail.slug}`}
                        className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300"
                      >
                        Predogled
                      </Link>
                    )}

                    {confirmSlug === trail.slug ? (
                      <div className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2">
                        <span className="text-xs font-semibold text-red-400">Res izbrisati?</span>
                        <button
                          onClick={() => deleteTrail(trail.slug)}
                          className="text-xs font-black text-red-400 hover:text-red-300"
                        >Da</button>
                        <span className="text-zinc-600">·</span>
                        <button
                          onClick={() => setConfirmSlug(null)}
                          className="text-xs font-semibold text-zinc-500 hover:text-zinc-300"
                        >Ne</button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmSlug(trail.slug)}
                        className="rounded-full border border-red-900/30 px-5 py-3 text-sm font-semibold text-red-500/70 hover:border-red-500/40 hover:text-red-400"
                      >
                        Izbriši
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </AdminShell>
  );
}
