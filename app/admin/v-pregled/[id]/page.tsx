"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import AdminShell from "@/components/AdminShell";
import ElevationChart from "@/components/ElevationChart";
import { supabase } from "@/lib/supabase";
import { parseGpx, type ParsedGpx } from "@/lib/parseGpx";

const GpxMap = dynamic(() => import("@/components/GpxMap"), { ssr: false });

const returnReasons = [
  "manjka bolj jasen opis",
  "GPX ni ustrezen ali potrebuje preverjanje",
  "manjkajo utrinki s poti",
  "ponudniki niso dovolj jasno povezani",
  "potrebno je dopolniti lokalni pogled",
  "manjka fotografija ali je neustrezna",
];

type PredlogAny = {
  id: string;
  ime: string;
  tip?: string | null;
  regija?: string | null;
  obmocje?: string | null;
  status: string;
  admin_opomba?: string | null;
  created_at?: string;
  ambasadorji?: { ime: string; email: string; foto_url: string | null; regija: string | null } | null;

  // Skupna polja
  opis?: string | null;
  zakaj?: string | null;
  hero_image?: string | null;
  galerija?: string[] | null;

  // Tura
  km?: number | null;
  visinska_razlika?: number | null;
  cas_ur?: number | null;
  tipi?: string[];
  tezavnost?: string | null;
  podlaga_asfalt?: number;
  podlaga_makadam?: number;
  podlaga_gozd?: number;
  gpx_url?: string | null;
  ritem_dneva?: { time: string; title: string; text: string }[] | null;
  poudarki?: { badge: string; title: string; text: string; image?: string }[] | null;

  // Ponudnik
  lokacija?: string | null;
  telefon?: string | null;
  spletna_stran?: string | null;
  lat?: number | null;
  lng?: number | null;
  bike_friendly_opis?: string | null;
  citat?: string | null;
  features?: { title: string; description: string }[] | null;

  // Znamenitost
  kratek_opis?: string | null;
  namig_za_obisk?: string | null;
  wikipedia_url?: string | null;
  google_maps_url?: string | null;
};

export default function PredlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const tip = searchParams.get("tip") ?? "tura";

  const [data, setData] = useState<PredlogAny | null>(null);
  const [loading, setLoading] = useState(true);
  const [gpxParsed, setGpxParsed] = useState<ParsedGpx | null>(null);
  const [gpxUrl, setGpxUrl] = useState<string | null>(null);
  const [gpxRetrying, setGpxRetrying] = useState(false);
  const [gpxFetchError, setGpxFetchError] = useState<string | null>(null);

  const [processing, setProcessing] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [returnMessage, setReturnMessage] = useState("");

  useEffect(() => {
    async function load() {
      const table = tip === "tura" ? "predlogi_tur"
        : tip === "ponudnik" ? "predlogi_ponudnikov"
        : "predlogi_znamenitosti";

      const { data: row } = await supabase
        .from(table)
        .select("*, ambasadorji(ime, email, foto_url, regija)")
        .eq("id", id)
        .single();

      if (!row) { setLoading(false); return; }
      setData(row as PredlogAny);

      if (row.gpx_url) {
        setGpxUrl(row.gpx_url);
        try {
          const res = await fetch(row.gpx_url);
          if (res.ok) {
            const text = await res.text();
            const parsed = parseGpx(text);
            if (parsed.km > 0) setGpxParsed(parsed);
            else setGpxFetchError("GPX datoteka ne vsebuje slednih točk (km=0).");
          } else {
            setGpxFetchError(`HTTP ${res.status} — datoteka ni dostopna.`);
          }
        } catch (e) {
          setGpxFetchError(`Napaka pri nalaganju: ${e instanceof Error ? e.message : "neznana napaka"}`);
        }
      }

      setLoading(false);
    }
    load();
  }, [id, tip]);

  async function retryGpx() {
    if (!gpxUrl) return;
    setGpxRetrying(true);
    setGpxFetchError(null);
    try {
      const res = await fetch(gpxUrl);
      if (res.ok) {
        const text = await res.text();
        const parsed = parseGpx(text);
        if (parsed.km > 0) setGpxParsed(parsed);
        else setGpxFetchError("GPX datoteka ne vsebuje slednih točk (km=0).");
      } else {
        setGpxFetchError(`HTTP ${res.status} — datoteka ni dostopna.`);
      }
    } catch (e) {
      setGpxFetchError(`Napaka: ${e instanceof Error ? e.message : "neznana napaka"}`);
    } finally {
      setGpxRetrying(false);
    }
  }

  async function sendEmail(type: "approved" | "revision", opomba?: string) {
    if (!data?.ambasadorji?.email) return;
    try {
      await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: data.ambasadorji.email,
          type,
          predlogIme: data.ime,
          predlogTip: tip,
          predlogId: id,
          opomba,
        }),
      });
    } catch { /* email ni kritičen */ }
  }

  async function handleApprove() {
    if (!data) return;
    setProcessing(true);
    const table = tip === "tura" ? "predlogi_tur" : tip === "ponudnik" ? "predlogi_ponudnikov" : "predlogi_znamenitosti";
    await supabase.from(table).update({ status: "approved" }).eq("id", id);
    await sendEmail("approved");
    router.push("/admin/v-pregled");
  }

  async function handleReturn() {
    if (!data) return;
    setProcessing(true);
    const table = tip === "tura" ? "predlogi_tur" : tip === "ponudnik" ? "predlogi_ponudnikov" : "predlogi_znamenitosti";
    await supabase.from(table).update({ status: "revision", admin_opomba: returnMessage }).eq("id", id);
    await sendEmail("revision", returnMessage);
    router.push("/admin/v-pregled");
  }

  if (loading) {
    return (
      <AdminShell active="v-pregled">
        <div className="flex min-h-[400px] items-center justify-center text-zinc-500">Nalagam predlog...</div>
      </AdminShell>
    );
  }

  if (!data) {
    return (
      <AdminShell active="v-pregled">
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 text-center">
          <div className="text-5xl">🚵</div>
          <h1 className="text-3xl font-black">Predlog ni najden.</h1>
          <Link href="/admin/v-pregled" className="rounded-full bg-[#c58b46] px-8 py-4 text-sm font-black text-black">← Nazaj</Link>
        </div>
      </AdminShell>
    );
  }

  const tipLabel = tip === "tura" ? "Predlog ture" : tip === "ponudnik" ? "Predlog ponudnika" : "Predlog znamenitosti";
  const surfaceTotal = (data.podlaga_asfalt ?? 0) + (data.podlaga_makadam ?? 0) + (data.podlaga_gozd ?? 0);
  const googleMapsLink = data.lat && data.lng
    ? `https://maps.google.com/?q=${data.lat},${data.lng}`
    : null;

  return (
    <AdminShell active="v-pregled">
      <div className="space-y-8">

        {/* ── Glava z akcijami ── */}
        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Admin / V pregled / {tipLabel}
              </div>
              <h1 className="mt-4 text-4xl font-black text-white">{data.ime}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                {data.ambasadorji && (
                  <span className="font-semibold text-zinc-300">{data.ambasadorji.ime}</span>
                )}
                {data.regija && <><span>·</span><span>{data.regija}</span></>}
                {data.obmocje && <><span>·</span><span>{data.obmocje}</span></>}
                {data.tip && <><span>·</span><span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs">{data.tip}</span></>}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/admin/v-pregled"
                className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300 hover:border-white/20">
                ← Nazaj
              </Link>
              <button onClick={() => setShowReturn(true)} disabled={processing}
                className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300 hover:border-[#c58b46]/40 disabled:opacity-40">
                Vrni v dopolnitev
              </button>
              <button onClick={handleApprove} disabled={processing}
                className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black hover:opacity-90 disabled:opacity-40">
                {processing ? "Objavljam..." : "✓ Objavi"}
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            TURA — specifična polja
        ══════════════════════════════════════ */}
        {tip === "tura" && (
          <>
            {/* GPX mapa + profil */}
            {(gpxParsed || gpxUrl) && (
              <section className="space-y-4">
                {gpxParsed ? (
                  <>
                    <div className="rounded-[32px] border border-white/10 bg-black/20 px-6 pt-6">
                      <div className="mb-4 text-xs uppercase tracking-[0.35em] text-[#c58b46]">Trasa iz GPX</div>
                      <div className="grid grid-cols-5 gap-3 pb-6">
                        {[
                          { label: "Dolžina", value: gpxParsed.km, unit: "km" },
                          { label: "Vzpon", value: gpxParsed.vm, unit: "vm" },
                          { label: "Višina max", value: gpxParsed.maxEle, unit: "m" },
                          { label: "Višina min", value: gpxParsed.minEle, unit: "m" },
                        ].map((s) => (
                          <div key={s.label} className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                            <div className="text-xs text-emerald-400">iz GPX</div>
                            <div className="mt-1 text-xl font-black text-[#f4d7ad]">{s.value} <span className="text-sm font-normal text-zinc-400">{s.unit}</span></div>
                            <div className="text-xs text-zinc-500">{s.label}</div>
                          </div>
                        ))}
                        {data.tezavnost && (
                          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                            <div className="text-xs text-zinc-500">Težavnost</div>
                            <div className="mt-1 text-xl font-black text-white">{data.tezavnost}</div>
                          </div>
                        )}
                      </div>
                    </div>
                    {gpxParsed.points.length > 0 && (
                      <div className="overflow-hidden rounded-[28px] border border-white/10" style={{ height: 360 }}>
                        <GpxMap points={gpxParsed.points} height={360} />
                      </div>
                    )}
                    {gpxParsed.profile.length > 1 && (
                      <ElevationChart
                        profile={gpxParsed.profile}
                        km={gpxParsed.km}
                        vm={gpxParsed.vm}
                        minEle={gpxParsed.minEle}
                        maxEle={gpxParsed.maxEle}
                      />
                    )}
                  </>
                ) : (
                  <div className="rounded-[28px] border border-amber-500/20 bg-amber-500/5 p-6">
                    <div className="flex flex-wrap items-start gap-4">
                      <span className="text-2xl">{gpxRetrying ? "⏳" : "⚠️"}</span>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-amber-300">GPX datoteka je v bazi — karta se ni naložila</div>
                        <div className="mt-1 text-sm text-zinc-500">
                          {data.km && `${data.km} km`}{data.visinska_razlika ? ` · ${data.visinska_razlika} vm` : ""}
                        </div>
                        {gpxFetchError && <div className="mt-2 break-all font-mono text-xs text-red-400">Napaka: {gpxFetchError}</div>}
                        {gpxUrl && (
                          <a href={gpxUrl} target="_blank" rel="noopener noreferrer"
                            className="mt-2 inline-block break-all text-xs text-zinc-500 underline hover:text-zinc-300">
                            Odpri GPX datoteko ↗
                          </a>
                        )}
                      </div>
                      <button type="button" onClick={retryGpx} disabled={gpxRetrying}
                        className="shrink-0 rounded-full border border-white/10 px-5 py-2.5 text-xs font-bold text-zinc-400 transition hover:border-[#c58b46]/40 hover:text-[#c58b46] disabled:opacity-50">
                        {gpxRetrying ? "Nalagam..." : "Ponastavi predogled"}
                      </button>
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Tehnični podatki ture */}
            <section className="rounded-[28px] border border-white/10 bg-black/20 p-6">
              <div className="mb-4 text-xs uppercase tracking-[0.35em] text-[#c58b46]">Tehnični podatki</div>
              <div className="space-y-3 text-sm">
                {data.tipi && data.tipi.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {data.tipi.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-bold text-zinc-300">{t}</span>
                    ))}
                  </div>
                )}
                {data.km && <div className="flex justify-between border-b border-white/5 py-2"><span className="text-zinc-500">Razdalja</span><span className="font-bold text-white">{data.km} km</span></div>}
                {data.visinska_razlika && <div className="flex justify-between border-b border-white/5 py-2"><span className="text-zinc-500">Vzpon</span><span className="font-bold text-white">{data.visinska_razlika} vm</span></div>}
                {data.tezavnost && <div className="flex justify-between border-b border-white/5 py-2"><span className="text-zinc-500">Težavnost</span><span className="font-bold text-white">{data.tezavnost}</span></div>}
                {data.cas_ur && <div className="flex justify-between border-b border-white/5 py-2"><span className="text-zinc-500">Čas</span><span className="font-bold text-white">{data.cas_ur} ur</span></div>}
                {surfaceTotal > 0 && (
                  <div className="pt-2">
                    <div className="mb-2 text-xs text-zinc-500">Podlaga</div>
                    <div className="flex gap-2 text-xs">
                      {(data.podlaga_asfalt ?? 0) > 0 && <span className="rounded-full bg-zinc-700 px-2 py-1">Asfalt {data.podlaga_asfalt}%</span>}
                      {(data.podlaga_makadam ?? 0) > 0 && <span className="rounded-full bg-zinc-700 px-2 py-1">Makadam {data.podlaga_makadam}%</span>}
                      {(data.podlaga_gozd ?? 0) > 0 && <span className="rounded-full bg-zinc-700 px-2 py-1">Gozd {data.podlaga_gozd}%</span>}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Ritem dneva */}
            {data.ritem_dneva && data.ritem_dneva.length > 0 && (
              <section className="rounded-[28px] border border-white/10 bg-black/20 p-6">
                <div className="mb-4 text-xs uppercase tracking-[0.35em] text-[#c58b46]">Ritem dneva</div>
                <div className="grid gap-4 md:grid-cols-5">
                  {data.ritem_dneva.map((k, i) => (
                    <div key={i} className="rounded-[20px] border border-white/10 bg-[#07110b] p-4">
                      {k.time && <div className="mb-3 text-center text-sm font-black text-[#c58b46]">{k.time}</div>}
                      {k.title && <div className="text-sm font-bold text-white">{k.title}</div>}
                      {k.text && <p className="mt-2 text-xs leading-6 text-zinc-400">{k.text}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Poudarki ture */}
            {data.poudarki && data.poudarki.length > 0 && (
              <section className="rounded-[28px] border border-white/10 bg-black/20 p-6">
                <div className="mb-4 text-xs uppercase tracking-[0.35em] text-[#c58b46]">Poudarki na progi</div>
                <div className="grid gap-4 md:grid-cols-3">
                  {data.poudarki.map((p, i) => (
                    <div key={i} className="overflow-hidden rounded-[20px] border border-white/10 bg-[#07110b]">
                      {p.image ? (
                        <img src={p.image} alt={p.title} className="h-[160px] w-full object-cover" />
                      ) : (
                        <div className="flex h-[80px] items-center justify-center bg-black/20 text-sm text-zinc-700">Brez slike</div>
                      )}
                      <div className="p-4">
                        {p.badge && <div className="mb-2 inline-block rounded-full border border-[#c58b46]/30 px-3 py-1 text-xs font-bold text-[#f4d7ad]">{p.badge}</div>}
                        {p.title && <div className="font-bold text-white">{p.title}</div>}
                        {p.text && <p className="mt-2 text-sm leading-6 text-zinc-400">{p.text}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* ══════════════════════════════════════
            PONUDNIK — specifična polja
        ══════════════════════════════════════ */}
        {tip === "ponudnik" && (
          <>
            {/* Kontaktni & osnovni podatki */}
            <section className="rounded-[28px] border border-white/10 bg-black/20 p-6">
              <div className="mb-4 text-xs uppercase tracking-[0.35em] text-[#c58b46]">Osnovni podatki</div>
              <div className="grid gap-3 text-sm md:grid-cols-2">
                {data.lokacija && (
                  <div className="flex justify-between border-b border-white/5 py-2 md:col-span-2">
                    <span className="text-zinc-500">Kraj / lokacija</span>
                    <span className="font-bold text-white">{data.lokacija}</span>
                  </div>
                )}
                {data.telefon && (
                  <div className="flex justify-between border-b border-white/5 py-2">
                    <span className="text-zinc-500">Telefon</span>
                    <a href={`tel:${data.telefon}`} className="font-bold text-[#c58b46] hover:underline">{data.telefon}</a>
                  </div>
                )}
                {data.spletna_stran && (
                  <div className="flex justify-between border-b border-white/5 py-2">
                    <span className="text-zinc-500">Spletna stran</span>
                    <a href={data.spletna_stran} target="_blank" rel="noopener noreferrer"
                      className="max-w-[220px] truncate font-bold text-[#c58b46] hover:underline">{data.spletna_stran}</a>
                  </div>
                )}
                {data.lat && data.lng && (
                  <div className="flex justify-between border-b border-white/5 py-2 md:col-span-2">
                    <span className="text-zinc-500">GPS lokacija</span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-zinc-300">{data.lat.toFixed(5)}, {data.lng.toFixed(5)}</span>
                      {googleMapsLink && (
                        <a href={googleMapsLink} target="_blank" rel="noopener noreferrer"
                          className="rounded-full border border-[#c58b46]/30 px-3 py-1 text-xs font-bold text-[#c58b46] hover:bg-[#c58b46]/10">
                          Odpri v Maps ↗
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Zakaj priporoča + Opis */}
            <div className="grid gap-6 lg:grid-cols-2">
              {data.zakaj && (
                <div className="rounded-[28px] border border-[#c58b46]/20 bg-[#c58b46]/5 p-6">
                  <div className="mb-3 text-xs uppercase tracking-[0.35em] text-[#c58b46]">Zakaj ga priporoča</div>
                  <p className="text-sm leading-8 text-zinc-300 italic">&ldquo;{data.zakaj}&rdquo;</p>
                  {data.ambasadorji && (
                    <div className="mt-4 flex items-center gap-3">
                      {data.ambasadorji.foto_url && (
                        <img src={data.ambasadorji.foto_url} alt="" className="h-8 w-8 rounded-full object-cover" />
                      )}
                      <span className="text-sm font-bold text-zinc-400">{data.ambasadorji.ime}</span>
                    </div>
                  )}
                </div>
              )}
              {data.opis && (
                <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
                  <div className="mb-3 text-xs uppercase tracking-[0.35em] text-[#c58b46]">Opis ponudnika</div>
                  <p className="text-sm leading-8 text-zinc-300">{data.opis}</p>
                </div>
              )}
            </div>

            {/* Bike-friendly + Citat */}
            {(data.bike_friendly_opis || data.citat) && (
              <div className="grid gap-6 lg:grid-cols-2">
                {data.bike_friendly_opis && (
                  <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
                    <div className="mb-3 text-xs uppercase tracking-[0.35em] text-[#c58b46]">Zakaj je bike-friendly?</div>
                    <p className="text-sm leading-8 text-zinc-300">{data.bike_friendly_opis}</p>
                  </div>
                )}
                {data.citat && (
                  <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
                    <div className="mb-3 text-xs uppercase tracking-[0.35em] text-[#c58b46]">Citat</div>
                    <p className="text-sm leading-8 text-zinc-300 italic">&ldquo;{data.citat}&rdquo;</p>
                  </div>
                )}
              </div>
            )}

            {/* Poudarki ponudnika */}
            {data.features && data.features.filter(f => f.title).length > 0 && (
              <section className="rounded-[28px] border border-white/10 bg-black/20 p-6">
                <div className="mb-4 text-xs uppercase tracking-[0.35em] text-[#c58b46]">Poudarki ponudnika</div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {data.features.filter(f => f.title).map((f, i) => (
                    <div key={i} className="rounded-[20px] border border-white/10 bg-[#07110b] p-4">
                      <div className="font-bold text-white">{f.title}</div>
                      {f.description && <p className="mt-2 text-sm leading-6 text-zinc-400">{f.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* ══════════════════════════════════════
            ZNAMENITOST — specifična polja
        ══════════════════════════════════════ */}
        {tip === "znamenitost" && (
          <>
            {/* Kratek opis + opis */}
            <div className="grid gap-6 lg:grid-cols-2">
              {data.kratek_opis && (
                <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
                  <div className="mb-3 text-xs uppercase tracking-[0.35em] text-[#c58b46]">Kratek opis</div>
                  <p className="text-sm leading-8 text-zinc-300">{data.kratek_opis}</p>
                </div>
              )}
              {data.opis && (
                <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
                  <div className="mb-3 text-xs uppercase tracking-[0.35em] text-[#c58b46]">Zgodba / opis</div>
                  <p className="text-sm leading-8 text-zinc-300">{data.opis}</p>
                </div>
              )}
            </div>

            {/* Ambasadorjev namig za znamenitost */}
            {data.zakaj && (
              <div className="rounded-[28px] border border-[#c58b46]/20 bg-[#c58b46]/5 p-6">
                <div className="mb-3 text-xs uppercase tracking-[0.35em] text-[#c58b46]">Ambasadorjev namig</div>
                <p className="text-sm leading-8 text-zinc-300 italic">&ldquo;{data.zakaj}&rdquo;</p>
                {data.ambasadorji && (
                  <div className="mt-4 flex items-center gap-3">
                    {data.ambasadorji.foto_url && (
                      <img src={data.ambasadorji.foto_url} alt="" className="h-8 w-8 rounded-full object-cover" />
                    )}
                    <span className="text-sm font-bold text-zinc-400">{data.ambasadorji.ime}</span>
                  </div>
                )}
              </div>
            )}

            {/* Lokacija + namig za obisk + povezave */}
            <section className="rounded-[28px] border border-white/10 bg-black/20 p-6">
              <div className="mb-4 text-xs uppercase tracking-[0.35em] text-[#c58b46]">Lokacija in podatki</div>
              <div className="space-y-3 text-sm">
                {data.lokacija && (
                  <div className="flex justify-between border-b border-white/5 py-2">
                    <span className="text-zinc-500">Opis lokacije</span>
                    <span className="max-w-[60%] text-right font-bold text-white">{data.lokacija}</span>
                  </div>
                )}
                {data.lat && data.lng && (
                  <div className="flex items-center justify-between border-b border-white/5 py-2">
                    <span className="text-zinc-500">GPS koordinate</span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-zinc-300">{data.lat.toFixed(5)}, {data.lng.toFixed(5)}</span>
                      {googleMapsLink && (
                        <a href={googleMapsLink} target="_blank" rel="noopener noreferrer"
                          className="rounded-full border border-[#c58b46]/30 px-3 py-1 text-xs font-bold text-[#c58b46] hover:bg-[#c58b46]/10">
                          Odpri v Maps ↗
                        </a>
                      )}
                    </div>
                  </div>
                )}
                {data.namig_za_obisk && (
                  <div className="border-b border-white/5 py-2">
                    <div className="mb-1 text-zinc-500">Namig za obisk</div>
                    <p className="leading-7 text-zinc-300">{data.namig_za_obisk}</p>
                  </div>
                )}
                {data.wikipedia_url && (
                  <div className="flex justify-between border-b border-white/5 py-2">
                    <span className="text-zinc-500">Wikipedia</span>
                    <a href={data.wikipedia_url} target="_blank" rel="noopener noreferrer"
                      className="font-bold text-[#c58b46] hover:underline">Odpri ↗</a>
                  </div>
                )}
                {data.google_maps_url && (
                  <div className="flex justify-between py-2">
                    <span className="text-zinc-500">Google Maps</span>
                    <a href={data.google_maps_url} target="_blank" rel="noopener noreferrer"
                      className="font-bold text-[#c58b46] hover:underline">Odpri ↗</a>
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {/* ══════════════════════════════════════
            SKUPNA POLJA — tura ima zakaj že zgoraj
        ══════════════════════════════════════ */}

        {/* Opis + ambasadorjev namig (samo za ture) */}
        {tip === "tura" && (data.opis || data.zakaj) && (
          <div className="grid gap-6 lg:grid-cols-2">
            {data.opis && (
              <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
                <div className="mb-3 text-xs uppercase tracking-[0.35em] text-[#c58b46]">Opis ture</div>
                <p className="text-sm leading-8 text-zinc-300">{data.opis}</p>
              </div>
            )}
            {data.zakaj && (
              <div className="rounded-[28px] border border-[#c58b46]/20 bg-[#c58b46]/5 p-6">
                <div className="mb-3 text-xs uppercase tracking-[0.35em] text-[#c58b46]">Ambasadorjev namig</div>
                <p className="text-sm leading-8 text-zinc-300 italic">&ldquo;{data.zakaj}&rdquo;</p>
                {data.ambasadorji && (
                  <div className="mt-4 flex items-center gap-3">
                    {data.ambasadorji.foto_url && (
                      <img src={data.ambasadorji.foto_url} alt="" className="h-8 w-8 rounded-full object-cover" />
                    )}
                    <span className="text-sm font-bold text-zinc-400">{data.ambasadorji.ime}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Hero slika */}
        {data.hero_image && (
          <section className="overflow-hidden rounded-[28px] border border-white/10">
            <img src={data.hero_image} alt={data.ime} className="h-[340px] w-full object-cover" />
          </section>
        )}

        {/* Galerija */}
        {data.galerija && data.galerija.length > 0 && (
          <section className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="mb-4 text-xs uppercase tracking-[0.35em] text-[#c58b46]">Galerija</div>
            <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-6">
              {data.galerija.map((url, i) => (
                <img key={i} src={url} alt={`Galerija ${i + 1}`} className="aspect-square w-full rounded-2xl object-cover" />
              ))}
            </div>
          </section>
        )}

        {/* Spodnji gumbi */}
        <div className="flex flex-wrap justify-end gap-3 pb-4">
          <Link href="/admin/v-pregled"
            className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 hover:border-white/20">
            ← Nazaj na seznam
          </Link>
          <button onClick={() => setShowReturn(true)} disabled={processing}
            className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 hover:border-[#c58b46]/40 disabled:opacity-40">
            Vrni v dopolnitev
          </button>
          <button onClick={handleApprove} disabled={processing}
            className="rounded-full bg-[#c58b46] px-8 py-3 text-sm font-black text-black hover:opacity-90 disabled:opacity-40">
            {processing ? "Objavljam..." : "✓ Objavi predlog"}
          </button>
        </div>
      </div>

      {/* ── Modal: vrni v dopolnitev ── */}
      {showReturn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-[#07110b] p-6 shadow-2xl md:p-8">
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Vrni v dopolnitev</div>
            <h2 className="mt-4 text-3xl font-black text-white">Kaj naj ambasador dopolni?</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Predlog <span className="font-bold text-white">{data.ime}</span> bo poslan nazaj ambasadorju.
            </p>

            <div className="mt-6 rounded-[24px] border border-white/10 bg-black/20 p-5">
              <div className="text-sm font-black text-white">Hitri razlogi</div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {returnReasons.map((reason) => (
                  <label key={reason}
                    className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-[#07110b] p-4 text-sm leading-6 text-zinc-300">
                    <input type="checkbox" className="mt-1 accent-[#c58b46]"
                      onChange={(e) => {
                        if (e.target.checked) setReturnMessage((m) => m ? `${m}\n- ${reason}` : `- ${reason}`);
                      }} />
                    <span>{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            <label className="mt-5 block text-sm font-bold text-zinc-200">
              Sporočilo ambasadorju
              <textarea rows={4} value={returnMessage} onChange={(e) => setReturnMessage(e.target.value)}
                placeholder="Npr. Prosim dodaj bolj jasen opis in preveri podatke."
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#041008] px-4 py-4 text-white outline-none placeholder:text-zinc-600" />
            </label>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button onClick={() => setShowReturn(false)}
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 hover:border-[#c58b46]/40">
                Prekliči
              </button>
              <button onClick={handleReturn} disabled={processing}
                className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black hover:brightness-110 disabled:opacity-50">
                Pošlji ambasadorju
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
