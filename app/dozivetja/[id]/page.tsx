"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import { supabase } from "@/lib/supabase";

type RitemStep = {
  time: string;
  icon: string;
  title: string;
  description: string;
  provider_name: string | null;
  provider_link: string | null;
  attraction_name: string | null;
  attraction_link: string | null;
  posebnosti: string[];
};

type Dozivete = {
  id: string;
  title: string;
  tagline: string | null;
  regija: string;
  obmocje: string | null;
  zakaj: string | null;
  tip: string[] | null;
  hero_image: string | null;
  status: string;
  ritem_dneva: RitemStep[];
  trasa_naslov: string | null;
  trasa_km: string | null;
  trasa_vm: string | null;
  trasa_cas: string | null;
  trasa_tip: string | null;
  trasa_tezavnost: string | null;
  trasa_asfalt: number;
  trasa_makadam: number;
  trasa_gozd: number;
  gpx_url: string | null;
};

export default function DoziveteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [d, setD] = useState<Dozivete | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("dozivetja")
        .select("*")
        .eq("id", id)
        .single();
      if (!data) {
        setNotFound(true);
      } else {
        setD(data as Dozivete);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#07110b] text-white">
        <SiteHeader backHref="/dozivetja" active="dozivetja" />
        <div className="flex min-h-[60vh] items-center justify-center text-sm text-zinc-500">
          Nalagam...
        </div>
      </main>
    );
  }

  if (notFound || !d) {
    return (
      <main className="min-h-screen bg-[#07110b] text-white">
        <SiteHeader backHref="/dozivetja" active="dozivetja" />
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5">
          <div className="text-5xl">🗺️</div>
          <p className="text-zinc-500">Tega doživetja ni mogoče najti.</p>
          <Link href="/dozivetja" className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black">
            ← Vsa doživetja
          </Link>
        </div>
      </main>
    );
  }

  const eyebrow = [
    d.tip?.[0],
    d.regija,
    d.obmocje,
  ].filter(Boolean).join(" · ");

  const steps = Array.isArray(d.ritem_dneva) ? d.ritem_dneva as RitemStep[] : [];

  const trailStats = [
    d.trasa_km ? `${d.trasa_km} km` : null,
    d.trasa_vm ? `${d.trasa_vm} vm` : null,
    d.trasa_cas,
    d.trasa_tip,
    d.trasa_tezavnost,
  ].filter(Boolean) as string[];

  const hasSurface = d.trasa_asfalt > 0 || d.trasa_makadam > 0 || d.trasa_gozd > 0;

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/dozivetja" active="dozivetja" />

      {/* ── HERO ── */}
      <section className="relative flex min-h-screen items-end overflow-hidden">
        {d.hero_image ? (
          <img
            src={d.hero_image}
            alt={d.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[#0b1a10]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-[#07110b]/30 to-[#07110b]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07110b]/80 via-[#07110b]/30 to-transparent" />

        <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 md:px-6 md:pb-28">
          <div className="max-w-2xl">
            {eyebrow && (
              <div className="mb-5 text-[10px] font-black uppercase tracking-[0.38em] text-[#c58b46]">
                Doživetje · {eyebrow}
              </div>
            )}
            <h1 className="font-serif text-6xl font-black italic leading-[0.9] tracking-[-0.045em] text-white md:text-8xl">
              {d.title}
            </h1>
            {d.tagline && (
              <p className="mt-8 max-w-lg text-xl leading-9 text-zinc-200 md:text-2xl md:leading-10">
                {d.tagline}
              </p>
            )}
          </div>
          <div className="mt-14 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
            ↓ Razišči dan
          </div>
        </div>
      </section>

      {/* ── ZAKAJ TA DAN ── */}
      {d.zakaj && (
        <section className="border-y border-[#c58b46]/15 bg-[#0b1a10] px-5 py-16 md:px-6 md:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-5 text-[10px] font-black uppercase tracking-[0.38em] text-[#c58b46]">
              Zakaj ta dan?
            </div>
            <p className="max-w-2xl text-base leading-8 text-zinc-400">
              {d.zakaj}
            </p>
          </div>
        </section>
      )}

      {/* ── RITEM DNEVA ── */}
      {steps.length > 0 && (
        <section className="px-5 py-20 md:px-6 md:py-28">
          <div className="mx-auto max-w-4xl">
            <div className="text-[10px] font-black uppercase tracking-[0.38em] text-[#c58b46]">
              Ritem dneva
            </div>
            <h2 className="mt-4 font-serif text-4xl font-black italic leading-tight md:text-5xl">
              Kako izgleda cel dan.
            </h2>

            <div className="relative mt-16">
              <div className="absolute left-[1.35rem] top-0 h-full w-px bg-gradient-to-b from-[#c58b46]/50 via-[#c58b46]/20 to-transparent md:left-[1.6rem]" />

              <div className="space-y-0">
                {steps.map((step, i) => (
                  <div key={i} className="relative flex gap-6 pb-12 md:gap-10">
                    <div className="relative shrink-0">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c58b46]/40 bg-[#0b1a10] text-lg md:h-12 md:w-12">
                        {step.icon || "📍"}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5">
                      <div className="text-[10px] font-black uppercase tracking-[0.28em] text-[#c58b46]">
                        {step.time}
                      </div>
                      <h3 className="mt-2 font-serif text-2xl font-black italic">
                        {step.title}
                      </h3>
                      {step.description && (
                        <p className="mt-2 max-w-xl text-base leading-7 text-zinc-400">
                          {step.description}
                        </p>
                      )}

                      {/* Kartice za ponudnika in/ali znamenitost */}
                      {(step.provider_name || step.attraction_name) && (
                        <div className="mt-5 flex flex-wrap gap-4">
                          {step.provider_name && (
                            <div className="w-48 shrink-0 md:w-56">
                              <div className="mb-2 text-[9px] font-black uppercase tracking-[0.28em] text-[#c58b46]">
                                Ponudnik
                              </div>
                              {step.provider_link ? (
                                <Link
                                  href={step.provider_link}
                                  className="block overflow-hidden rounded-[16px] border border-[#c58b46]/25 bg-[#0b1a10] px-4 py-3 transition hover:border-[#c58b46]/55"
                                >
                                  <div className="font-serif text-sm font-black italic leading-snug">
                                    {step.provider_name}
                                  </div>
                                </Link>
                              ) : (
                                <div className="overflow-hidden rounded-[16px] border border-[#c58b46]/25 bg-[#0b1a10] px-4 py-3">
                                  <div className="font-serif text-sm font-black italic leading-snug">
                                    {step.provider_name}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                          {step.attraction_name && (
                            <div className="w-48 shrink-0 md:w-56">
                              <div className="mb-2 text-[9px] font-black uppercase tracking-[0.28em] text-zinc-500">
                                Znamenitost
                              </div>
                              {step.attraction_link ? (
                                <Link
                                  href={step.attraction_link}
                                  className="block overflow-hidden rounded-[16px] border border-white/10 bg-[#0b1a10] px-4 py-3 transition hover:border-[#c58b46]/35"
                                >
                                  <div className="font-serif text-sm font-black italic leading-snug">
                                    {step.attraction_name}
                                  </div>
                                </Link>
                              ) : (
                                <div className="overflow-hidden rounded-[16px] border border-white/10 bg-[#0b1a10] px-4 py-3">
                                  <div className="font-serif text-sm font-black italic leading-snug">
                                    {step.attraction_name}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Posebnosti */}
                      {step.posebnosti && step.posebnosti.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {step.posebnosti.map((p, j) => (
                            <span
                              key={j}
                              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-zinc-500"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── TRASA V PODATKIH ── */}
      {(trailStats.length > 0 || d.trasa_naslov) && (
        <section className="border-t border-white/10 bg-[#0b1a10] px-5 py-16 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="text-[10px] font-black uppercase tracking-[0.38em] text-zinc-500">
              Trasa v podatkih
            </div>
            {d.trasa_naslov && (
              <h3 className="mt-3 font-serif text-2xl font-black italic text-zinc-300">
                {d.trasa_naslov}
              </h3>
            )}

            {trailStats.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {trailStats.map((v) => (
                  <span
                    key={v}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-400"
                  >
                    {v}
                  </span>
                ))}
              </div>
            )}

            {hasSurface && (
              <p className="mt-5 text-sm text-zinc-600">
                Podlaga:{" "}
                {d.trasa_asfalt > 0 ? `Asfalt ${d.trasa_asfalt}%` : ""}
                {d.trasa_asfalt > 0 && d.trasa_makadam > 0 ? " · " : ""}
                {d.trasa_makadam > 0 ? `Makadam ${d.trasa_makadam}%` : ""}
                {(d.trasa_asfalt > 0 || d.trasa_makadam > 0) && d.trasa_gozd > 0 ? " · " : ""}
                {d.trasa_gozd > 0 ? `Gozdna pot ${d.trasa_gozd}%` : ""}
              </p>
            )}

            <div className="mt-7 flex h-44 items-center justify-center overflow-hidden rounded-[20px] border border-white/10 bg-black/30 md:h-56">
              <div className="text-center">
                <div className="text-2xl">🗺️</div>
                <p className="mt-2 text-sm text-zinc-600">
                  Interaktivni zemljevid bo na voljo kmalu
                </p>
              </div>
            </div>

            {d.gpx_url && (
              <div className="mt-6">
                <a
                  href={d.gpx_url}
                  download
                  className="inline-flex rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black transition hover:opacity-90"
                >
                  ↓ Prenesi GPX
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── NAZaj ── */}
      <section className="border-t border-white/10 px-5 py-12">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/dozivetja"
            className="inline-flex rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40"
          >
            ← Vsa doživetja
          </Link>
        </div>
      </section>
    </main>
  );
}
