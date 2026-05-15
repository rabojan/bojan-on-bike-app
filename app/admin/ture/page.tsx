"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const trails = [
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
    status: "Osnutek",
    region: "Štajerska",
    type: "Gravel",
    difficulty: "Lahka",
    distance: "48 km",
    elevation: "620 vm",
    surface: "Asfalt 45% • Makadam 40% • Gozdna pot 15%",
    hasGpx: false,
    hasProviders: true,
    hasGallery: true,
    updated: "V pripravi",
  },
  {
    title: "Alpski pobeg ob vodi",
    slug: "alpski-pobeg-ob-vodi",
    status: "Osnutek",
    region: "Gorenjska",
    type: "Bikepacking",
    difficulty: "Zahtevna",
    distance: "86 km",
    elevation: "1450 vm",
    surface: "Asfalt 30% • Makadam 50% • Gozdna pot 20%",
    hasGpx: false,
    hasProviders: false,
    hasGallery: true,
    updated: "V pripravi",
  },
];

export default function AdminTrailsPage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("bojan_admin_logged_in");

    if (isLoggedIn !== "true") {
      router.push("/admin-login");
      return;
    }

    setIsReady(true);
  }, [router]);

  if (!isReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07110b] text-white">
        <div className="text-zinc-400">Preverjam dostop...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <header className="border-b border-white/10 bg-[#07110b]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Admin / Ture
            </div>
            <h1 className="mt-2 text-2xl font-black">Upravljanje tur</h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-zinc-300"
            >
              ← Pisarna
            </Link>

            <button className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black">
              + Dodaj novo turo
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
            <div className="text-4xl font-black">3</div>
            <div className="mt-2 text-sm text-zinc-400">vse ture</div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
            <div className="text-4xl font-black">1</div>
            <div className="mt-2 text-sm text-zinc-400">objavljena</div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
            <div className="text-4xl font-black">2</div>
            <div className="mt-2 text-sm text-zinc-400">osnutka</div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
            <div className="text-4xl font-black">0</div>
            <div className="mt-2 text-sm text-zinc-400">GPX naloženih</div>
          </div>
        </div>

        <div className="mb-8 rounded-[32px] border border-[#c58b46]/20 bg-[#0b1a10] p-7">
          <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
            Kako bo delovalo
          </div>

          <h2 className="mt-4 text-3xl font-black">
            Tura bo imela vse, kar potrebuje javna stran.
          </h2>

          <p className="mt-5 max-w-4xl leading-8 text-zinc-400">
            Tukaj boš urejal naslov, regijo, težavnost, kilometre, višince,
            podlago v odstotkih, zgodbo, GPX, slike, ponudnike ob trasi,
            znamenitosti in status objave. Vreme se kasneje ne bo vnašalo ročno,
            ampak se bo izračunalo glede na lokacijo trase iz GPX oziroma
            koordinat začetka ture.
          </p>
        </div>

        <div className="grid gap-5">
          {trails.map((trail) => (
            <article
              key={trail.slug}
              className="rounded-[32px] border border-white/10 bg-black/20 p-6"
            >
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
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
                      <span>{trail.hasGpx ? "naložen" : "manjka"}</span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-zinc-400">Ponudniki</span>
                      <span>{trail.hasProviders ? "dodani" : "manjkajo"}</span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-zinc-400">Galerija</span>
                      <span>{trail.hasGallery ? "dodana" : "manjka"}</span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-zinc-400">Zadnja sprememba</span>
                      <span>{trail.updated}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black">
                      Uredi
                    </button>

                    <Link
                      href={`/ture/${trail.slug}`}
                      className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300"
                    >
                      Predogled
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
