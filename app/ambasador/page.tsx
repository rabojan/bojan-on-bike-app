"use client";

import Link from "next/link";
import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";

// Primer podatkov — kasneje bo iz Supabase
const ambassador = {
  ime: "Bojan",
  priimek: "Ratej",
  kraj: "Maribor",
  regija: "Štajerska",
  bio: "",
  profileImage: null as string | null,
  joinedDate: "maj 2025",
};

const myTrails = [
  { title: "Gozdni flow nad Mariborom", status: "Objavljeno", date: "12. 4. 2025" },
  { title: "Pohorska panorama", status: "V pregledu", date: "3. 5. 2025" },
  { title: "Vinska pot nad Mariborom", status: "Dopolni", date: "18. 5. 2025" },
];

const myProviders = [
  { title: "Rudijev dom na Pohorju", status: "Objavljeno", date: "12. 4. 2025" },
];

const myAttractions = [
  { title: "Razgled nad Mariborom", status: "Objavljeno", date: "12. 4. 2025" },
  { title: "Pohorski gozdni odsek", status: "V pregledu", date: "20. 5. 2025" },
];

const statusStyle: Record<string, string> = {
  Objavljeno: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  "V pregledu": "border-[#c58b46]/30 bg-[#c58b46]/10 text-[#f4d7ad]",
  Dopolni: "border-red-500/25 bg-red-500/10 text-red-300",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${statusStyle[status] ?? "border-white/10 text-zinc-400"}`}>
      {status}
    </span>
  );
}

function countByStatus(list: { status: string }[], s: string) {
  return list.filter((i) => i.status === s).length;
}

// Ravni ambasadorstva
const levels = [
  {
    slug: "ambasador",
    label: "Ambasador",
    icon: "🏅",
    req: "Registriran profil",
    done: true,
  },
  {
    slug: "aktiven",
    label: "Aktivni ambasador",
    icon: "🚵",
    req: "1+ objavljena tura",
    done: countByStatus(myTrails, "Objavljeno") >= 1,
  },
  {
    slug: "top",
    label: "TOP ambasador regije",
    icon: "🏆",
    req: "5+ tur · 2+ ponudnikov · 1+ znamenitost",
    done:
      countByStatus(myTrails, "Objavljeno") >= 5 &&
      countByStatus(myProviders, "Objavljeno") >= 2 &&
      countByStatus(myAttractions, "Objavljeno") >= 1,
  },
];

export default function AmbassadorDashboardPage() {
  const [bio, setBio] = useState(ambassador.bio);
  const [editingBio, setEditingBio] = useState(false);

  const publishedTrails = countByStatus(myTrails, "Objavljeno");
  const publishedProviders = countByStatus(myProviders, "Objavljeno");
  const publishedAttractions = countByStatus(myAttractions, "Objavljeno");

  const currentLevel = levels.filter((l) => l.done).at(-1)!;

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/" active="ambasador" />

      {/* ── PROFIL HERO ── */}
      <section className="border-b border-white/10 bg-[#0b1a10] px-5 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">

            {/* Avatar */}
            <div className="shrink-0">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-[#c58b46]/40 bg-black/30 text-4xl">
                  {ambassador.profileImage ? (
                    <img src={ambassador.profileImage} alt="Profil" className="h-full w-full object-cover" />
                  ) : (
                    "🚵"
                  )}
                </div>
                <label className="absolute bottom-0 right-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#c58b46] text-sm text-black transition hover:bg-[#f4d7ad]">
                  +
                  {/* Supabase Storage: upload profile image */}
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>
            </div>

            {/* Podatki */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-serif text-3xl font-black italic md:text-4xl">
                  {ambassador.ime} {ambassador.priimek}
                </h1>
                <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.16em] ${statusStyle["Objavljeno"]}`}>
                  {currentLevel.icon} {currentLevel.label}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap gap-4 text-sm text-zinc-500">
                <span>{ambassador.kraj}</span>
                <span>·</span>
                <span className="font-semibold text-[#f4d7ad]">Ambasador regije {ambassador.regija}</span>
                <span>·</span>
                <span>Registriran {ambassador.joinedDate}</span>
              </div>

              {/* Bio */}
              <div className="mt-5">
                {editingBio ? (
                  <div className="space-y-3">
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Kratek opis — kdo si, kako kolesariš, kaj te navdušuje na poteh..."
                      rows={3}
                      className="w-full rounded-2xl border border-[#c58b46]/30 bg-black/30 px-4 py-3 text-sm leading-7 outline-none focus:border-[#c58b46]/60"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={() => setEditingBio(false)}
                        className="rounded-full bg-[#c58b46] px-5 py-2 text-xs font-black text-black"
                      >
                        Shrani
                      </button>
                      <button
                        onClick={() => setEditingBio(false)}
                        className="rounded-full border border-white/10 px-5 py-2 text-xs font-semibold text-zinc-400"
                      >
                        Prekliči
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <p className="max-w-2xl text-sm leading-7 text-zinc-400">
                      {bio || "Dodaj kratek opis — kdo si, kako kolesariš, kaj te navdušuje na poteh."}
                    </p>
                    <button
                      onClick={() => setEditingBio(true)}
                      className="shrink-0 rounded-full border border-white/10 px-4 py-1.5 text-xs font-semibold text-zinc-500 hover:border-[#c58b46]/40 hover:text-zinc-300"
                    >
                      Uredi
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-10 md:px-6">

        {/* ── STATISTIKA ── */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {[
            {
              label: "Ture",
              total: myTrails.length,
              published: publishedTrails,
              review: countByStatus(myTrails, "V pregledu"),
              fix: countByStatus(myTrails, "Dopolni"),
            },
            {
              label: "Ponudniki",
              total: myProviders.length,
              published: publishedProviders,
              review: countByStatus(myProviders, "V pregledu"),
              fix: countByStatus(myProviders, "Dopolni"),
            },
            {
              label: "Znamenitosti",
              total: myAttractions.length,
              published: publishedAttractions,
              review: countByStatus(myAttractions, "V pregledu"),
              fix: countByStatus(myAttractions, "Dopolni"),
            },
          ].map((stat) => (
            <div key={stat.label} className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-zinc-500">{stat.label}</div>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-4xl font-black text-[#f4d7ad]">{stat.total}</span>
                <span className="mb-1 text-sm text-zinc-500">oddano</span>
              </div>
              <div className="mt-3 space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-zinc-400">{stat.published} objavljeno</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c58b46]" />
                  <span className="text-zinc-400">{stat.review} v pregledu</span>
                </div>
                {stat.fix > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                    <span className="text-zinc-400">{stat.fix} za dopolnitev</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── MOJE TURE ── */}
        <ContentSection
          title="Moje ture"
          items={myTrails}
          addLabel="Predlagaj novo turo"
          addHref="/admin/ture/nova"
        />

        {/* ── MOJI PONUDNIKI ── */}
        <ContentSection
          title="Moji ponudniki"
          items={myProviders}
          addLabel="Dodaj ponudnika"
          addHref="/admin/ponudniki/nov"
        />

        {/* ── MOJE ZNAMENITOSTI ── */}
        <ContentSection
          title="Moje znamenitosti"
          items={myAttractions}
          addLabel="Dodaj znamenitost"
          addHref="/admin/znamenitosti/nova"
        />

        {/* ── RAVNI AMBASADORSTVA ── */}
        <section className="mt-10">
          <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
            Tvoj ambasadorski status
          </div>
          <h2 className="mt-3 font-serif text-3xl font-black italic">
            Pot do TOP ambasadorja.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-500">
            Vsaka objavljena vsebina gradi tvoj profil. TOP ambasador regije je
            kolesar z največ objavljenimi turami, ponudniki in znamenitostmi v
            svoji regiji.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {levels.map((level) => (
              <div
                key={level.slug}
                className={`rounded-[28px] border p-6 transition ${
                  level.done
                    ? "border-[#c58b46]/35 bg-[#c58b46]/8"
                    : "border-white/10 bg-[#0b1a10] opacity-60"
                }`}
              >
                <div className="text-3xl">{level.icon}</div>
                <h3 className="mt-3 font-serif text-xl font-black italic">
                  {level.label}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">{level.req}</p>
                {level.done ? (
                  <div className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-emerald-400">
                    ✓ Doseženo
                  </div>
                ) : (
                  <div className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-zinc-600">
                    — Še ni doseženo
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

function ContentSection({
  title,
  items,
  addLabel,
  addHref,
}: {
  title: string;
  items: { title: string; status: string; date: string }[];
  addLabel: string;
  addHref: string;
}) {
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="font-serif text-2xl font-black italic">{title}</h2>
        <Link
          href={addHref}
          className="rounded-full bg-[#c58b46] px-5 py-2.5 text-xs font-black text-black transition hover:opacity-90"
        >
          + {addLabel}
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded-[24px] border border-dashed border-white/10 bg-[#0b1a10] p-8 text-center text-sm text-zinc-600">
          Še nisi oddal nobene vsebine v tej kategoriji.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between gap-4 rounded-[22px] border border-white/10 bg-[#0b1a10] px-5 py-4"
            >
              <div>
                <div className="font-serif text-lg font-black italic">
                  {item.title}
                </div>
                <div className="mt-0.5 text-xs text-zinc-600">{item.date}</div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <StatusBadge status={item.status} />
                {item.status === "Dopolni" && (
                  <button className="text-xs font-semibold text-[#c58b46] hover:underline">
                    Dopolni
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
