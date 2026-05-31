import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import LightboxGallery from "@/components/LightboxGallery";
import MiniMapWrapper from "@/components/MiniMapWrapper";
import { createServiceClient } from "@/lib/supabase";
import ZnamenitostNearbyTure from "./ZnamenitostNearbyTure";

export const dynamic = "force-dynamic";

export default async function ZnamenitostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from("predlogi_znamenitosti")
    .select("*, ambasadorji(ime, regija, foto_url)")
    .eq("id", id)
    .eq("status", "approved")
    .single();

  if (error || !data) notFound();

  const z = data;
  const amb = z.ambasadorji as { ime: string; regija: string; foto_url: string | null } | null;

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/znamenitosti" active="znamenitosti" />

      {/* ── HERO ── */}
      <section className="relative min-h-[680px] overflow-hidden border-b border-white/10">
        {z.hero_image ? (
          <img src={z.hero_image} alt={z.ime}
            className="absolute inset-0 h-full w-full object-cover opacity-70" />
        ) : (
          <div className="absolute inset-0 bg-[#0b1a10]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07110b] via-[#07110b]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07110b] via-transparent to-black/40" />

        <div className="relative z-10 mx-auto flex min-h-[680px] max-w-7xl flex-col justify-end px-6 pb-20 pt-28">
          <div className="max-w-4xl">
            <div className="text-[10px] font-black uppercase tracking-[0.38em] text-[#c58b46]">
              {z.regija}{z.lokacija ? ` · ${z.lokacija}` : ""}
            </div>

            <h1 className="mt-6 max-w-4xl font-serif text-6xl font-black italic leading-[0.92] tracking-[-0.045em] text-white md:text-8xl">
              {z.ime}
            </h1>

            {z.kratek_opis && (
              <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-200 md:text-xl md:leading-9">
                {z.kratek_opis}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {z.tip && (
                <span className="rounded-full border border-[#c58b46]/35 bg-black/25 px-5 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#f4d7ad]">
                  {z.tip}
                </span>
              )}
              {z.razdalja_od_trase && (
                <span className="rounded-full border border-white/20 bg-black/25 px-5 py-2 text-xs font-black uppercase tracking-[0.16em] text-zinc-300">
                  {z.razdalja_od_trase}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── VSEBINA ── */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_360px]">
        <div className="space-y-16">

          {/* Opis */}
          {z.opis && (
            <section className="grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-start">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
                  O tej znamenitosti
                </div>
                <h2 className="mt-4 font-serif text-4xl font-black italic leading-tight md:text-5xl">
                  Točka, ki te ustavi.
                </h2>
                <p className="mt-7 text-lg leading-9 text-zinc-400">{z.opis}</p>
              </div>

              {z.zakaj && (
                <div className="rounded-[28px] border border-[#c58b46]/20 bg-[#0b1a10] p-7">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c58b46]">
                    Zakaj se ustaviti
                  </div>
                  <p className="mt-5 font-serif text-2xl font-black italic leading-tight text-[#f4d7ad]">
                    &ldquo;{z.zakaj}&rdquo;
                  </p>
                  {amb && (
                    <div className="mt-5 text-sm font-semibold text-zinc-400">
                      🚴 {amb.ime} · Ambasador {amb.regija}
                    </div>
                  )}
                </div>
              )}
            </section>
          )}

          {/* Samo zakaj — brez opisa */}
          {!z.opis && z.zakaj && (
            <section className="rounded-[28px] border border-[#c58b46]/20 bg-[#c58b46]/5 p-8">
              <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Zakaj se ustaviti</div>
              <p className="mt-5 font-serif text-2xl font-black italic leading-tight text-[#f4d7ad]">
                &ldquo;{z.zakaj}&rdquo;
              </p>
              {amb && (
                <div className="mt-4 text-sm font-bold text-zinc-500">
                  🚴 {amb.ime} · Ambasador {amb.regija}
                </div>
              )}
            </section>
          )}

          {/* Namig za obisk */}
          {z.namig_za_obisk && (
            <section>
              <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Namig za obisk</div>
              <h2 className="mt-4 font-serif text-4xl font-black italic leading-tight md:text-5xl">
                Ko prideš tja.
              </h2>
              <p className="mt-7 text-lg leading-9 text-zinc-400">{z.namig_za_obisk}</p>
            </section>
          )}

          {/* Ture ob znamenitosti */}
          {z.lat && z.lng && (
            <ZnamenitostNearbyTure lat={Number(z.lat)} lng={Number(z.lng)} />
          )}

          {/* Foto */}
          {z.foto_url && (
            <section>
              <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Fotografija</div>
              <LightboxGallery images={[z.foto_url]} altPrefix={z.ime} />
            </section>
          )}

        </div>

        {/* ── SIDEBAR ── */}
        <aside className="lg:sticky lg:top-24 lg:self-start space-y-5">

          {/* Info kartica */}
          <div className="rounded-[28px] border border-[#c58b46]/25 bg-[#0b1a10] p-7">
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
              Informacije
            </div>

            <div className="mt-6 space-y-0 text-sm">
              {(
                [
                  z.tip ? ["Tip", z.tip] : null,
                  ["Regija", z.regija],
                  z.lokacija ? ["Lokacija", z.lokacija] : null,
                  z.razdalja_od_trase ? ["Od trase", z.razdalja_od_trase] : null,
                ].filter((x): x is [string, string] => x !== null)
              ).map(([label, value]) => (
                <div key={label}
                  className="flex justify-between gap-5 border-b border-white/10 py-4">
                  <span className="text-zinc-500">{label}</span>
                  <span className="text-right font-semibold text-[#f4d7ad]">{value}</span>
                </div>
              ))}

              {z.lat && z.lng && (
                <div className="flex justify-between gap-5 border-b border-white/10 py-4">
                  <span className="text-zinc-500">GPS</span>
                  <span className="font-mono text-xs text-zinc-400">{Number(z.lat).toFixed(5)}, {Number(z.lng).toFixed(5)}</span>
                </div>
              )}
            </div>

            <div className="mt-7 flex flex-col gap-3">
              {z.google_maps_url && (
                <a href={z.google_maps_url} target="_blank" rel="noopener noreferrer"
                  className="rounded-full bg-[#c58b46] px-6 py-4 text-center text-sm font-black text-black transition hover:bg-[#f4d7ad]">
                  Odpri v Google Maps
                </a>
              )}
              {z.wikipedia_url && (
                <a href={z.wikipedia_url} target="_blank" rel="noreferrer"
                  className="rounded-full border border-[#c58b46]/35 px-6 py-4 text-center text-sm font-bold text-[#f4d7ad] transition hover:border-[#c58b46]">
                  Spletna stran
                </a>
              )}
              <Link href="/znamenitosti"
                className="rounded-full border border-white/10 px-6 py-4 text-center text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">
                ← Vse znamenitosti
              </Link>
            </div>
          </div>

          {/* Mini mapa */}
          {z.lat && z.lng && (
            <div className="rounded-[28px] overflow-hidden border border-white/10" style={{ height: 220 }}>
              <MiniMapWrapper lat={Number(z.lat)} lng={Number(z.lng)} label={z.ime} />
            </div>
          )}

          {/* Ambassador kartica */}
          {amb && (
            <div className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
                Predlagal ambasador
              </div>
              <div className="flex items-center gap-3">
                {amb.foto_url ? (
                  <img src={amb.foto_url} alt={amb.ime}
                    className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c58b46]/20 text-xs font-black text-[#c58b46]">
                    {amb.ime.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-bold text-white">{amb.ime}</div>
                  <div className="text-xs text-zinc-500">Ambasador {amb.regija}</div>
                </div>
              </div>
            </div>
          )}

        </aside>
      </section>
    </main>
  );
}
