"use client";

import Link from "next/link";
import { useState } from "react";

import AdminShell from "@/components/AdminShell";

const initialPois = [
  {
    name: "Razgled nad Mariborom",
    slug: "razgled-nad-mariborom",
    status: "Objavljeno",
    type: "Razgled",
    region: "Štajerska",
    area: "Pohorje",
    location: "200 m od trase",
    wikipedia: "",
    trails: ["Gozdni flow nad Mariborom"],
    updated: "Danes",
  },
  {
    name: "Pohorski gozdni odsek",
    slug: "pohorski-gozdni-odsek",
    status: "Čaka na objavo",
    type: "Narava",
    region: "Štajerska",
    area: "Pohorje",
    location: "na trasi",
    wikipedia: "",
    trails: ["Gozdni flow nad Mariborom"],
    updated: "Čaka na objavo",
  },
  {
    name: "Stara planinska pot",
    slug: "stara-planinska-pot",
    status: "Čaka na objavo",
    type: "Zgodovina",
    region: "Štajerska",
    area: "Pohorje",
    location: "700 m od trase",
    wikipedia: "sl.wikipedia.org",
    trails: ["Gozdni flow nad Mariborom"],
    updated: "Čaka na objavo",
  },
];

export default function AdminPoisPage() {
  const [pois, setPois] = useState(initialPois);
  const [confirmSlug, setConfirmSlug] = useState<string | null>(null);

  function deletePoi(slug: string) {
    setPois((prev) => prev.filter((p) => p.slug !== slug));
    setConfirmSlug(null);
  }

  return (
    <AdminShell active="znamenitosti">
      <div className="space-y-8">
        <section className="flex flex-col gap-5 rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Admin / Znamenitosti
            </div>

            <h1 className="mt-4 text-4xl font-black">
              Znamenitosti ob poti
            </h1>

            <p className="mt-5 max-w-3xl leading-8 text-zinc-400">
              Tukaj urejaš točke, ki niso ponudniki, ampak naredijo turo bolj
              doživeto: razgledi, slapovi, jezera, gradovi, cerkve, zgodovina,
              naravne posebnosti in foto točke.
            </p>
          </div>

          <Link
            href="/admin/znamenitosti/nova"
            className="rounded-full bg-[#c58b46] px-6 py-4 text-sm font-bold text-black"
          >
            + Dodaj znamenitost
          </Link>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-4xl font-black">3</div>
            <div className="mt-2 text-sm text-zinc-400">vse točke</div>
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
            <div className="text-4xl font-black">1</div>
            <div className="mt-2 text-sm text-zinc-400">Wikipedia povezava</div>
          </div>
        </section>

        <section className="grid gap-5">
          {pois.map((poi) => (
            <article
              key={poi.slug}
              className="rounded-[32px] border border-white/10 bg-black/20 p-6"
            >
              <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-4 py-2 text-xs font-bold ${
                        poi.status === "Objavljeno"
                          ? "bg-emerald-500/10 text-emerald-300"
                          : "bg-yellow-500/10 text-yellow-300"
                      }`}
                    >
                      {poi.status}
                    </span>

                    <span className="rounded-full border border-white/10 bg-[#07110b] px-4 py-2 text-xs text-zinc-300">
                      {poi.type}
                    </span>

                    <span className="rounded-full border border-white/10 bg-[#07110b] px-4 py-2 text-xs text-zinc-300">
                      {poi.region}
                    </span>

                    <span className="rounded-full border border-white/10 bg-[#07110b] px-4 py-2 text-xs text-zinc-300">
                      {poi.area}
                    </span>
                  </div>

                  <h2 className="text-3xl font-black">{poi.name}</h2>

                  <div className="mt-5 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-[#07110b] p-4">
                      <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                        Lokacija na turi
                      </div>
                      <div className="mt-2 font-bold">{poi.location}</div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#07110b] p-4">
                      <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                        Wikipedia
                      </div>
                      <div className="mt-2 font-bold">
                        {poi.wikipedia || "ni dodana"}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#07110b] p-4 sm:col-span-2">
                      <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                        Zadnja sprememba
                      </div>
                      <div className="mt-2 font-bold">{poi.updated}</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-[#07110b] p-5">
                  <div className="mb-4 text-xs uppercase tracking-[0.25em] text-[#c58b46]">
                    Povezane ture
                  </div>

                  <div className="space-y-3">
                    {poi.trails.map((trail) => (
                      <div
                        key={trail}
                        className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-bold"
                      >
                        {trail}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/admin/znamenitosti/${poi.slug}`}
                      className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black"
                    >
                      Uredi
                    </Link>

                    {poi.status === "Objavljeno" && (
                      <Link
                        href={`/znamenitosti/${poi.slug}`}
                        className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300"
                      >
                        Predogled
                      </Link>
                    )}

                    {confirmSlug === poi.slug ? (
                      <div className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2">
                        <span className="text-xs font-semibold text-red-400">Res izbrisati?</span>
                        <button onClick={() => deletePoi(poi.slug)} className="text-xs font-black text-red-400 hover:text-red-300">Da</button>
                        <span className="text-zinc-600">·</span>
                        <button onClick={() => setConfirmSlug(null)} className="text-xs font-semibold text-zinc-500 hover:text-zinc-300">Ne</button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmSlug(poi.slug)}
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
