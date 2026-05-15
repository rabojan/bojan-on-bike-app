"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const stats = [
  { label: "Objavljene ture", value: "3", note: "katalog tur" },
  { label: "Doživetja", value: "3", note: "v pripravi" },
  { label: "Ponudniki", value: "3", note: "lokalni ekosistem" },
  { label: "Osnutki", value: "5", note: "za pregled" },
];

const quickActions = [
  {
    title: "Dodaj novo turo",
    text: "Naslov, GPX, slike, podlaga, zgodba, ponudniki in znamenitosti.",
    tag: "Ture",
  },
  {
    title: "Dodaj doživetje",
    text: "Vinska pot, družinski dan, kulinarični vikend ali večdnevna avantura.",
    tag: "Doživetja",
  },
  {
    title: "Dodaj ponudnika",
    text: "Kulinarika, vino, prenočišče, kontakt, lokacija in e-bike polnilnica.",
    tag: "Ponudniki",
  },
  {
    title: "Dodaj znamenitost",
    text: "Razgled, narava, zgodovina, kultura, Wikipedia povezava in lokacija.",
    tag: "POI",
  },
];

const adminSections = [
  {
    title: "Ture",
    items: [
      "GPX datoteka in trasa",
      "Asfalt / makadam / gozdna pot v %",
      "Hero slika in galerija",
      "Povezani ponudniki",
      "Povezane znamenitosti",
      "eBike podatki",
    ],
  },
  {
    title: "Doživetja",
    items: [
      "Zgodba doživetja",
      "Tema: vino, družina, kulinarika, zgodovina",
      "Povezane ture",
      "Plan dneva ali večdnevni itinerarij",
      "Priporočeni ponudniki",
      "Kasneje cena in rezervacija",
    ],
  },
  {
    title: "Ponudniki",
    items: [
      "Kulinarika / vino / prenočišče",
      "Telefon, email, spletna stran",
      "Lokacija in oddaljenost od trase",
      "e-bike polnilnica",
      "Bike friendly opis",
      "Status partnerja",
    ],
  },
  {
    title: "Znamenitosti",
    items: [
      "Narava, razgled, zgodovina, kultura",
      "Kratek opis za aplikacijo",
      "Wikipedia povezava",
      "Fotografija",
      "Koordinate",
      "Povezane ture",
    ],
  },
];

export default function AdminPage() {
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

  function logout() {
    localStorage.removeItem("bojan_admin_logged_in");
    router.push("/");
  }

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
              Admin
            </div>
            <h1 className="mt-2 text-2xl font-black">Bojanova pisarna</h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-zinc-300"
            >
              Odpri stran
            </Link>

            <button
              onClick={logout}
              className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black"
            >
              Odjava
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-stretch">
          <div className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-8">
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Pregled platforme
            </div>

            <h2 className="mt-5 text-4xl font-black leading-tight">
              Tukaj nastaja Bojan on Bike.
            </h2>

            <p className="mt-6 leading-8 text-zinc-400">
              To je tvoj uredniški center za ture, doživetja, ponudnike,
              znamenitosti, slike in zgodbe. Prva verzija je še demo, naslednji
              koraki pa jo povežejo s Supabase bazo.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[28px] border border-white/10 bg-black/20 p-6"
              >
                <div className="text-4xl font-black text-white">
                  {stat.value}
                </div>

                <div className="mt-3 font-bold">{stat.label}</div>

                <div className="mt-2 text-sm text-zinc-500">{stat.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Hitri vnos
            </div>
            <h2 className="mt-3 text-3xl font-black">Kaj želiš dodati?</h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <button
              key={action.title}
              className="group rounded-[28px] border border-white/10 bg-[#0b1a10] p-6 text-left transition hover:border-[#c58b46]/40"
            >
              <div className="mb-5 inline-flex rounded-full border border-[#c58b46]/30 bg-[#c58b46]/10 px-3 py-1.5 text-xs font-semibold text-[#f4d7ad]">
                {action.tag}
              </div>

              <h3 className="text-2xl font-black">{action.title}</h3>

              <p className="mt-4 leading-7 text-zinc-400">{action.text}</p>

              <div className="mt-6 text-sm font-bold text-[#c58b46]">
                Pripravi obrazec →
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="mb-6">
          <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
            Struktura vsebin
          </div>
          <h2 className="mt-3 text-3xl font-black">
            Kaj boš urejal v pisarni
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {adminSections.map((section) => (
            <div
              key={section.title}
              className="rounded-[32px] border border-white/10 bg-black/20 p-7"
            >
              <h3 className="text-3xl font-black">{section.title}</h3>

              <div className="mt-6 grid gap-3">
                {section.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm text-zinc-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
