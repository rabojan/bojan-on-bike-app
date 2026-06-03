"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import PageHero from "@/components/PageHero";
import { supabase } from "@/lib/supabase";

type Doziveto = {
  id: string;
  ime: string;
  regija: string | null;
  hero_image: string | null;
  doziveto_naslov: string | null;
  doziveto_ciljna_skupina: string[] | null;
  zakaj: string | null;
  ambasadorji: { ime: string; foto_url: string | null } | null;
};

const vsiFilters = [
  "Vsi",
  "Za družine",
  "Za pare",
  "Za pustolovce",
  "E-bike friendly",
  "Vinska pot",
  "Gorski pobeg",
  "Vikend pobeg",
];

export default function DozivetjaPage() {
  const [dozivetja, setDozivetja] = useState<Doziveto[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Vsi");

  useEffect(() => {
    supabase
      .from("predlogi_tur")
      .select("id, ime, regija, hero_image, doziveto_naslov, doziveto_ciljna_skupina, zakaj, ambasadorji(ime, foto_url)")
      .eq("je_doziveto", true)
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setDozivetja(data ?? []);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === "Vsi") return dozivetja;
    return dozivetja.filter((d) => d.doziveto_ciljna_skupina?.includes(activeFilter));
  }, [dozivetja, activeFilter]);

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/" active="dozivetja" />

      <PageHero
        eyebrow="Doživetja ob poti"
        title="Tura je šele začetek lepega dne."
        description="Skrbno izbrane kombinacije ture, postanka in doživetja. Ne samo kilometri — cel dan, ki si ga zapomniš."
        image="/hero-dozivetja.png"
        imageAlt="Kolesarsko doživetje v naravi"
        imagePosition="center"
        mobileImagePosition="75% 55%"
      />

      {/* ── FILTRI ── */}
      <section className="border-y border-white/10 bg-[#0b1a10] px-5 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-3">
            {vsiFilters.map((filter) => (
              <button key={filter} onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  activeFilter === filter
                    ? "bg-[#c58b46] text-black"
                    : "border border-white/10 bg-black/20 text-zinc-300 hover:border-[#c58b46]/40"
                }`}>
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── KARTICE ── */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Izbrana doživetja</div>
            <h2 className="mt-3 font-serif text-4xl font-black italic md:text-5xl">
              Ideje za dan, ki si ga zapomniš.
            </h2>
          </div>
          {!loading && (
            <div className="text-sm text-zinc-500">
              {filtered.length} {filtered.length === 1 ? "doživetje" : "doživetja"}
            </div>
          )}
        </div>

        {loading ? (
          <div className="py-16 text-center text-sm text-zinc-500">Nalagam...</div>
        ) : filtered.length === 0 ? (
          <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] px-8 py-16 text-center text-zinc-500">
            {activeFilter === "Vsi"
              ? "Doživetja prihajajo kmalu."
              : "Za izbrani filter trenutno ni doživetij."}
          </div>
        ) : (
          <div className="grid items-stretch gap-8 md:grid-cols-3">
            {filtered.map((d) => (
              <article key={d.id}
                className="group flex h-full flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1a10] transition hover:-translate-y-1 hover:border-[#c58b46]/40">
                <div className="relative h-64 overflow-hidden">
                  {d.hero_image ? (
                    <img src={d.hero_image} alt={d.doziveto_naslov ?? d.ime}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[#0b1a10]">
                      <span className="text-7xl opacity-10">✨</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a10] via-transparent to-transparent" />
                  {d.doziveto_ciljna_skupina && d.doziveto_ciljna_skupina.length > 0 && (
                    <div className="absolute left-4 top-4">
                      <span className="rounded-full border border-[#c58b46]/40 bg-black/50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#f4d7ad] backdrop-blur">
                        {d.doziveto_ciljna_skupina[0]}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <div className="mb-2 text-xs text-zinc-500">{d.regija}</div>

                  <h3 className="font-serif text-2xl font-black italic leading-tight">
                    {d.doziveto_naslov || d.ime}
                  </h3>

                  {d.zakaj && (
                    <div className="mt-5 flex flex-1 items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                      {d.ambasadorji?.foto_url ? (
                        <img src={d.ambasadorji.foto_url} alt={d.ambasadorji.ime}
                          className="h-9 w-9 shrink-0 rounded-full border border-[#c58b46]/30 object-cover" />
                      ) : (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#c58b46]/30 bg-[#c58b46]/10 text-sm">🚴</div>
                      )}
                      <p className="text-sm leading-6 text-zinc-300 line-clamp-3">
                        &ldquo;{d.zakaj}&rdquo;
                      </p>
                    </div>
                  )}

                  <Link href={`/dozivetja/${d.id}`}
                    className="mt-6 inline-flex justify-center rounded-full bg-[#c58b46] px-5 py-3 text-sm font-black text-black transition hover:opacity-90">
                    Oglej si dan
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ── ZAKAJ DOŽIVETJA ── */}
      <section className="border-y border-white/10 bg-[#0b1a10] px-5 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-white/10">
          <div className="grid md:grid-cols-2">
            <div className="min-h-[380px]">
              <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1600&auto=format&fit=crop"
                alt="Druženje po turi" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-14">
              <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Zakaj doživetja</div>
              <h2 className="mt-5 font-serif text-4xl font-black italic leading-tight md:text-5xl">
                Ker se najboljše ture končajo z zgodbo.
              </h2>
              <p className="mt-6 text-base leading-9 text-zinc-400">
                Dobra kolesarska ideja ni samo črta na zemljevidu. Je trenutek, ko se ustaviš na razgledu, spiješ kavo v majhnem kraju, odkriješ lokalno zgodbo ali se po turi usedeš za mizo z ljudmi, s katerimi si delil dan.
              </p>
              <Link href="/ponudniki"
                className="mt-8 inline-flex w-fit rounded-full bg-[#c58b46] px-6 py-4 text-sm font-black text-black">
                Odkrij ponudnike
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
