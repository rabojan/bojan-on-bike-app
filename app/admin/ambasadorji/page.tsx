"use client";

import Link from "next/link";
import { useState } from "react";
import AdminShell from "@/components/AdminShell";

const TOP_THRESHOLD = 30;

const initialAmbassadors = [
  {
    name: "Bojan Ratej",
    slug: "bojan-ratej",
    status: "Aktiven",
    isTop: false,
    region: "Štajerska",
    place: "Maribor",
    email: "bojan@bojanonbike.si",
    phone: "+386 40 123 456",
    bio: "Lokalni poznavalec Pohorja, Štajerske, gozdnih poti, razgledov in doživetij ob trasi.",
    content: { trails: 7, providers: 3, dozivetja: 2, znamenitosti: 3 },
  },
  {
    name: "Maja Kovač",
    slug: "maja-kovac",
    status: "Čaka na objavo",
    isTop: false,
    region: "Koroška",
    place: "Slovenj Gradec",
    email: "maja.kovac@bojanonbike.si",
    phone: "+386 41 222 118",
    bio: "Poznavalka mirnih koroških dolin, gozdnih cest, lokalnih postankov in razglednih poti.",
    content: { trails: 0, providers: 0, dozivetja: 0, znamenitosti: 0 },
  },
  {
    name: "Tomaž Zupan",
    slug: "tomaz-zupan",
    status: "Aktiven",
    isTop: true,
    region: "Gorenjska",
    place: "Bled",
    email: "tomaz.zupan@bojanonbike.si",
    phone: "+386 31 445 220",
    bio: "Ambasador za alpske razglede, jezera, družinske e-bike izlete in poti ob vodi.",
    content: { trails: 31, providers: 8, dozivetja: 4, znamenitosti: 9 },
  },
  {
    name: "Nina Furlan",
    slug: "nina-furlan",
    status: "Čaka na objavo",
    isTop: false,
    region: "Primorska",
    place: "Vipava",
    email: "nina.furlan@bojanonbike.si",
    phone: "+386 51 730 884",
    bio: "Lokalna poznavalka Krasa, Vipavske doline, sončnih gravel poti in kulinaričnih postankov.",
    content: { trails: 0, providers: 0, dozivetja: 0, znamenitosti: 0 },
  },
  {
    name: "Rok Mlakar",
    slug: "rok-mlakar",
    status: "Čaka na objavo",
    isTop: false,
    region: "Notranjska",
    place: "Cerknica",
    email: "rok.mlakar@bojanonbike.si",
    phone: "+386 40 661 905",
    bio: "Ambasador za jezera, kraške posebnosti, gozdne poti in mirnejše raziskovalne ture.",
    content: { trails: 0, providers: 0, dozivetja: 0, znamenitosti: 0 },
  },
  {
    name: "Petra Novak",
    slug: "petra-novak",
    status: "Čaka na objavo",
    isTop: false,
    region: "Dolenjska",
    place: "Novo mesto",
    email: "petra.novak@bojanonbike.si",
    phone: "+386 41 908 337",
    bio: "Poznavalka dolenjskih gričev, rečnih poti, zidanic, kulinarike in lahkotnih kolesarskih dni.",
    content: { trails: 0, providers: 0, dozivetja: 0, znamenitosti: 0 },
  },
  {
    name: "Matej Horvat",
    slug: "matej-horvat",
    status: "Čaka na objavo",
    isTop: false,
    region: "Prekmurje",
    place: "Murska Sobota",
    email: "matej.horvat@bojanonbike.si",
    phone: "+386 30 714 552",
    bio: "Ambasador za odprte horizonte, Muro, Goričko, ravninske poti in družinska e-bike doživetja.",
    content: { trails: 0, providers: 0, dozivetja: 0, znamenitosti: 0 },
  },
];

export default function AdminAmbassadorsPage() {
  const [ambassadors, setAmbassadors] = useState(initialAmbassadors);
  const [warnedSlugs, setWarnedSlugs] = useState<Set<string>>(new Set());
  const [confirmDeleteSlug, setConfirmDeleteSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  async function sendWarning(slug: string, name: string, email: string) {
    setLoading(slug);
    try {
      await fetch("/api/admin/ambasador/opozorilo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      setWarnedSlugs((prev) => new Set([...prev, slug]));
    } finally {
      setLoading(null);
    }
  }

  async function deleteAmbassador(slug: string, name: string, email: string) {
    setLoading(slug);
    try {
      await fetch("/api/admin/ambasador/izbrisi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      setAmbassadors((prev) => prev.filter((a) => a.slug !== slug));
      setConfirmDeleteSlug(null);
    } finally {
      setLoading(null);
    }
  }

  const toggleTop = (slug: string) => {
    setAmbassadors((prev) =>
      prev.map((a) => a.slug === slug ? { ...a, isTop: !a.isTop } : a)
    );
  };

  const totalTrails = ambassadors.reduce((s, a) => s + a.content.trails, 0);
  const totalProviders = ambassadors.reduce((s, a) => s + a.content.providers, 0);
  const totalDozivetja = ambassadors.reduce((s, a) => s + a.content.dozivetja, 0);
  const totalZnamenitosti = ambassadors.reduce((s, a) => s + a.content.znamenitosti, 0);

  return (
    <AdminShell active="ambasadorji">
      <div className="space-y-8">

        {/* ── Glava ── */}
        <section className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-8 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#c58b46]">Admin / Ambasadorji</p>
            <h1 className="text-4xl font-black tracking-tight text-white">Upravljanje ambasadorjev</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400">
              Pregled vseh ambasadorjev, njihove vsebine in aktivnosti. TOP status se vklopi ročno, ko ambasador doseže {TOP_THRESHOLD} objavljenih tur.
            </p>
          </div>
          <Link href="/admin/ambasadorji/nov"
            className="mt-6 inline-flex rounded-full bg-[#c58b46] px-6 py-4 text-sm font-bold text-black transition hover:opacity-90 md:mt-0">
            + Dodaj ambasadorja
          </Link>
        </section>

        {/* ── Skupne statistike ── */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {[
            { value: ambassadors.length, label: "ambasadorji" },
            { value: totalTrails, label: "ture" },
            { value: totalProviders, label: "ponudniki" },
            { value: totalDozivetja, label: "doživetja" },
            { value: totalZnamenitosti, label: "znamenitosti" },
          ].map((s) => (
            <div key={s.label} className="rounded-[20px] border border-white/10 bg-black/20 p-4 sm:p-6">
              <div className="text-3xl font-black sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs leading-tight text-zinc-400 sm:text-sm">{s.label}</div>
            </div>
          ))}
        </section>

        {/* ── Kartice ambasadorjev ── */}
        <section className="space-y-5">
          {ambassadors.map((a) => {
            const trailProgress = Math.min((a.content.trails / TOP_THRESHOLD) * 100, 100);
            const reachedThreshold = a.content.trails >= TOP_THRESHOLD;

            return (
              <article key={a.slug} className={`rounded-[32px] border bg-black/20 p-6 ${a.isTop ? "border-[#c58b46]/40" : "border-white/10"}`}>
                <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">

                  {/* Levo — profil */}
                  <div className="flex flex-col gap-5 sm:flex-row">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[24px] border border-white/10 bg-[#07110b] text-4xl">
                      👤
                    </div>
                    <div className="min-w-0">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${a.status === "Aktiven" ? "bg-emerald-500/10 text-emerald-300" : "bg-yellow-500/10 text-yellow-300"}`}>
                          {a.status}
                        </span>
                        <span className="rounded-full border border-white/10 bg-[#07110b] px-3 py-1.5 text-xs text-zinc-300">{a.region}</span>
                        <span className="rounded-full border border-white/10 bg-[#07110b] px-3 py-1.5 text-xs text-zinc-300">{a.place}</span>
                        {a.isTop && (
                          <span className="rounded-full border border-[#c58b46]/50 bg-[#c58b46]/15 px-3 py-1.5 text-xs font-black text-[#f4d7ad]">
                            ★ TOP ambasador
                          </span>
                        )}
                      </div>
                      <h2 className="text-2xl font-black text-white">{a.name}</h2>
                      <p className="mt-2 max-w-xl text-sm leading-7 text-zinc-400">{a.bio}</p>
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        <div className="rounded-xl border border-white/10 bg-[#07110b] px-4 py-2.5">
                          <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Email</div>
                          <div className="mt-1 text-sm font-bold">{a.email}</div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#07110b] px-4 py-2.5">
                          <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Telefon</div>
                          <div className="mt-1 text-sm font-bold">{a.phone}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desno — vsebina + TOP */}
                  <div className="rounded-[24px] border border-white/10 bg-[#07110b] p-5">
                    <div className="mb-4 text-xs uppercase tracking-[0.25em] text-[#c58b46]">Vsebina ambasadorja</div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { value: a.content.trails, label: "ture" },
                        { value: a.content.providers, label: "ponudniki" },
                        { value: a.content.dozivetja, label: "doživetja" },
                        { value: a.content.znamenitosti, label: "znamenitosti" },
                      ].map((s) => (
                        <div key={s.label} className="rounded-xl border border-white/10 bg-black/20 p-3 text-center">
                          <div className="text-2xl font-black">{s.value}</div>
                          <div className="mt-0.5 text-xs text-zinc-500">{s.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* TOP progress */}
                    <div className="mt-5">
                      <div className="mb-1.5 flex items-center justify-between text-xs text-zinc-500">
                        <span>Napredek do TOP</span>
                        <span className="font-bold">{a.content.trails} / {TOP_THRESHOLD} tur</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-black/40">
                        <div
                          className={`h-full rounded-full transition-all ${reachedThreshold ? "bg-[#c58b46]" : "bg-zinc-600"}`}
                          style={{ width: `${trailProgress}%` }}
                        />
                      </div>
                      {reachedThreshold && !a.isTop && (
                        <p className="mt-2 text-xs font-bold text-[#c58b46]">
                          ✓ Dosežen prag — TOP status je na voljo
                        </p>
                      )}
                    </div>

                    {/* Gumbi */}
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      <Link href={`/admin/ambasadorji/${a.slug}`}
                        className="rounded-full border border-white/10 px-4 py-2.5 text-xs font-bold text-zinc-300 transition hover:border-[#c58b46]/40">
                        Uredi profil
                      </Link>
                      <button
                        onClick={() => toggleTop(a.slug)}
                        className={`rounded-full px-4 py-2.5 text-xs font-black transition ${
                          a.isTop
                            ? "border border-[#c58b46]/40 bg-[#c58b46]/10 text-[#f4d7ad] hover:bg-[#c58b46]/20"
                            : reachedThreshold
                              ? "bg-[#c58b46] text-black hover:opacity-90"
                              : "border border-white/10 bg-black/20 text-zinc-500 hover:border-white/20"
                        }`}
                      >
                        {a.isTop ? "★ Izklopi TOP" : "Vklopi TOP ★"}
                      </button>

                      {/* Opozorilo */}
                      {warnedSlugs.has(a.slug) ? (
                        <span className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs font-bold text-amber-400">
                          ⚠ Opozorilo poslano
                        </span>
                      ) : (
                        <button
                          onClick={() => sendWarning(a.slug, a.name, a.email)}
                          disabled={loading === a.slug}
                          className="rounded-full border border-amber-800/40 px-4 py-2.5 text-xs font-semibold text-amber-600/80 transition hover:border-amber-500/50 hover:text-amber-400 disabled:opacity-40"
                        >
                          {loading === a.slug ? "Pošiljam..." : "Pošlji opozorilo"}
                        </button>
                      )}

                      {/* Brisanje */}
                      {confirmDeleteSlug === a.slug ? (
                        <div className="flex w-full flex-col gap-2 rounded-2xl border border-red-500/30 bg-red-500/5 p-3 mt-1">
                          <div className="text-xs font-semibold text-red-400">
                            Izbrisano bo: {a.content.trails} tur, {a.content.providers} ponudnikov,{" "}
                            {a.content.znamenitosti} znamenitosti, {a.content.dozivetja} doživetij.
                            Ambasador prejme e-mail o odstranitvi.
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => deleteAmbassador(a.slug, a.name, a.email)}
                              disabled={loading === a.slug}
                              className="rounded-full bg-red-500/20 px-4 py-2 text-xs font-black text-red-300 hover:bg-red-500/30 disabled:opacity-40"
                            >
                              {loading === a.slug ? "Brišem..." : "Da, izbriši"}
                            </button>
                            <button
                              onClick={() => setConfirmDeleteSlug(null)}
                              className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-zinc-500 hover:text-zinc-300"
                            >
                              Prekliči
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteSlug(a.slug)}
                          className="rounded-full border border-red-900/30 px-4 py-2.5 text-xs font-semibold text-red-500/60 transition hover:border-red-500/40 hover:text-red-400"
                        >
                          Izbriši ambasadorja
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </article>
            );
          })}
        </section>

      </div>
    </AdminShell>
  );
}
