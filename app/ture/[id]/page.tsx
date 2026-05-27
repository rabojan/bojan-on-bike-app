"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import { supabase } from "@/lib/supabase";

function casDisplay(casUr: number | null): string {
  if (!casUr) return "—";
  if (casUr <= 2) return "1–2 uri";
  if (casUr <= 3) return "2–3 ure";
  if (casUr <= 5) return "3–5 ur";
  if (casUr <= 7) return "5–7 ur";
  if (casUr <= 9) return "Cel dan";
  return "Več dni";
}

type RitemKorak = { time: string; title: string; text: string };
type Poudarek = { badge: string; title: string; text: string };

type Tura = {
  id: string;
  ime: string;
  regija: string;
  obmocje: string | null;
  opis: string | null;
  zakaj: string | null;
  km: number | null;
  visinska_razlika: number | null;
  cas_ur: number | null;
  tipi: string[] | null;
  tezavnost: string | null;
  podlaga_asfalt: number;
  podlaga_makadam: number;
  podlaga_gozd: number;
  gpx_url: string | null;
  hero_image: string | null;
  ritem_dneva: RitemKorak[] | null;
  poudarki: Poudarek[] | null;
  galerija: string[] | null;
  ambasador: { ime: string; regija: string } | null;
};

function SurfaceBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm font-bold text-zinc-300">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-[#c58b46]" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function TuraDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [tura, setTura] = useState<Tura | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("predlogi_tur")
        .select("*, ambasadorji(ime, regija)")
        .eq("id", id)
        .eq("status", "approved")
        .single();

      if (error || !data) { setNotFound(true); setLoading(false); return; }

      const raw = data as Record<string, unknown>;
      const amb = raw.ambasadorji as { ime: string; regija: string } | null;
      setTura({ ...data, ambasador: amb });
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#07110b] text-white">
        <SiteHeader backHref="/ture" active="ture" />
        <div className="flex min-h-screen items-center justify-center text-zinc-500">Nalagam...</div>
      </main>
    );
  }

  if (notFound || !tura) {
    return (
      <main className="min-h-screen bg-[#07110b] text-white">
        <SiteHeader backHref="/ture" active="ture" />
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center">
          <div className="text-6xl">🚵</div>
          <h1 className="font-serif text-3xl font-black italic">Tura ni najdena.</h1>
          <p className="text-zinc-500">Ta tura morda še ni bila odobrena ali ne obstaja.</p>
          <Link href="/ture" className="rounded-full bg-[#c58b46] px-8 py-4 text-sm font-black text-black">← Vse ture</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/ture" active="ture" />

      {/* ── HERO ── */}
      <section className="relative min-h-[560px] overflow-hidden border-b border-white/10 md:min-h-[640px]">
        {tura.hero_image ? (
          <img src={tura.hero_image} alt={tura.ime}
            className="absolute inset-0 h-full w-full object-cover opacity-75" />
        ) : (
          <div className="absolute inset-0 bg-[#0b1a10]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#07110b]/30 to-[#07110b]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07110b]/60 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-6xl flex-col justify-end px-6 pb-16 pt-32 md:min-h-[640px] md:pb-20">
          <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
            {tura.regija}{tura.obmocje ? ` · ${tura.obmocje}` : ""}
          </div>
          <h1 className="mt-4 font-serif text-5xl font-black italic leading-tight md:text-7xl">{tura.ime}</h1>
          {tura.tipi && (
            <div className="mt-5 flex flex-wrap gap-2">
              {tura.tipi.map((t) => (
                <span key={t} className="rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-zinc-200 backdrop-blur">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-b border-white/10 bg-[#0b1a10]">
        <div className="mx-auto flex max-w-6xl flex-wrap divide-x divide-white/10">
          {tura.km != null && (
            <div className="px-6 py-5 md:px-8">
              <div className="text-2xl font-black text-[#f4d7ad]">{tura.km} <span className="text-sm font-normal text-zinc-400">km</span></div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">Dolžina</div>
            </div>
          )}
          {tura.visinska_razlika != null && (
            <div className="px-6 py-5 md:px-8">
              <div className="text-2xl font-black text-[#f4d7ad]">{tura.visinska_razlika} <span className="text-sm font-normal text-zinc-400">vm</span></div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">Vzpon</div>
            </div>
          )}
          {tura.tezavnost && (
            <div className="px-6 py-5 md:px-8">
              <div className="text-2xl font-black text-[#f4d7ad]">{tura.tezavnost}</div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">Zahtevnost</div>
            </div>
          )}
          {tura.cas_ur != null && (
            <div className="px-6 py-5 md:px-8">
              <div className="text-2xl font-black text-[#f4d7ad]">{casDisplay(tura.cas_ur)}</div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">Čas</div>
            </div>
          )}
          {tura.gpx_url && (
            <div className="ml-auto flex items-center px-6 py-5 md:px-8">
              <a href={tura.gpx_url} download
                className="rounded-full border border-[#c58b46]/40 px-5 py-2 text-sm font-bold text-[#f4d7ad] transition hover:bg-[#c58b46]/10">
                ↓ GPX
              </a>
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-16 lg:grid-cols-[1fr_360px]">
          <div className="space-y-16">

            {/* ── OPIS ── */}
            {tura.opis && (
              <section>
                <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Zgodba ture</div>
                <p className="text-lg leading-9 text-zinc-300">{tura.opis}</p>
              </section>
            )}

            {/* ── POUDARKI ── */}
            {tura.poudarki && tura.poudarki.length > 0 && (
              <section>
                <div className="mb-6 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Poudarki na progi</div>
                <div className="grid gap-6 md:grid-cols-3">
                  {tura.poudarki.map((p, i) => (
                    <article key={i} className="overflow-hidden rounded-[26px] border border-white/10 bg-[#0b1a10] p-6">
                      {p.badge && (
                        <span className="mb-4 inline-block rounded-full border border-[#c58b46]/35 bg-black/25 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#f4d7ad]">
                          {p.badge}
                        </span>
                      )}
                      <h3 className="font-serif text-xl font-black italic leading-tight text-white">{p.title}</h3>
                      {p.text && <p className="mt-3 text-sm leading-7 text-zinc-400">{p.text}</p>}
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* ── RITEM DNEVA ── */}
            {tura.ritem_dneva && tura.ritem_dneva.length > 0 && (
              <section>
                <div className="mb-6 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Ritem dneva</div>
                <div className="space-y-0">
                  {tura.ritem_dneva.map((korak, i) => (
                    <div key={i} className="relative flex gap-6 pb-8 last:pb-0">
                      <div className="flex flex-col items-center">
                        <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c58b46]/40 bg-[#0b1a10] text-sm font-black text-[#c58b46]">
                          {i + 1}
                        </div>
                        {i < (tura.ritem_dneva?.length ?? 0) - 1 && (
                          <div className="mt-1 w-px flex-1 bg-white/10" />
                        )}
                      </div>
                      <div className="pb-2 pt-1.5">
                        {korak.time && (
                          <div className="mb-1 text-xs font-black text-[#c58b46]">{korak.time}</div>
                        )}
                        <h4 className="font-bold text-white">{korak.title}</h4>
                        {korak.text && <p className="mt-1 text-sm leading-7 text-zinc-400">{korak.text}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── GALERIJA ── */}
            {tura.galerija && tura.galerija.length > 0 && (
              <section>
                <div className="mb-6 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Galerija</div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {tura.galerija.map((url, i) => (
                    <img key={i} src={url} alt={`${tura.ime} — ${i + 1}`}
                      className="aspect-square w-full rounded-2xl object-cover" />
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* ── SIDEBAR ── */}
          <aside className="space-y-6">

            {/* Podlaga */}
            {(tura.podlaga_asfalt > 0 || tura.podlaga_makadam > 0 || tura.podlaga_gozd > 0) && (
              <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
                <div className="mb-5 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Podlaga trase</div>
                <div className="space-y-4">
                  {tura.podlaga_asfalt > 0 && <SurfaceBar label="Asfalt" value={tura.podlaga_asfalt} />}
                  {tura.podlaga_makadam > 0 && <SurfaceBar label="Makadam" value={tura.podlaga_makadam} />}
                  {tura.podlaga_gozd > 0 && <SurfaceBar label="Gozdna pot" value={tura.podlaga_gozd} />}
                </div>
              </div>
            )}

            {/* Ambassador */}
            {(tura.ambasador || tura.zakaj) && (
              <div className="rounded-[28px] border border-[#c58b46]/20 bg-[#c58b46]/5 p-6">
                <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Ambasadorjev namig</div>
                {tura.zakaj && (
                  <p className="text-sm leading-7 text-zinc-300 before:content-['“'] after:content-['”']">{tura.zakaj}</p>
                )}
                {tura.ambasador && (
                  <div className="mt-4 border-t border-white/10 pt-4 text-sm font-bold text-zinc-400">
                    🚴 {tura.ambasador.ime} · {tura.ambasador.regija}
                  </div>
                )}
              </div>
            )}

            {/* GPX download */}
            {tura.gpx_url && (
              <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
                <div className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">GPX datoteka</div>
                <p className="mb-4 text-sm text-zinc-500">Prenesi turo v svojo napravo ali GPS.</p>
                <a href={tura.gpx_url} download
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#c58b46]/40 px-5 py-3 text-sm font-bold text-[#f4d7ad] transition hover:bg-[#c58b46]/10">
                  ↓ Prenesi GPX
                </a>
              </div>
            )}

            <Link href="/ture"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-400 transition hover:border-white/20">
              ← Vse ture
            </Link>

          </aside>
        </div>
      </div>
    </main>
  );
}
