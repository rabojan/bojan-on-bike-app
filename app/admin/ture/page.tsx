"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { supabase } from "@/lib/supabase";

type Tura = {
  id: string;
  ime: string;
  regija: string | null;
  obmocje: string | null;
  tipi: string[] | null;
  tezavnost: string | null;
  km: number | null;
  visinska_razlika: number | null;
  podlaga_asfalt: number;
  podlaga_makadam: number;
  podlaga_gozd: number;
  gpx_url: string | null;
  galerija: string[] | null;
  status: string;
  created_at: string;
};

const statusLabel: Record<string, string> = {
  approved: "Objavljeno",
  pending: "Čaka na objavo",
  revision: "V dopolnitvi",
  rejected: "Zavrnjeno",
};

const statusStyle: Record<string, string> = {
  approved: "bg-emerald-500/10 text-emerald-300",
  pending: "bg-yellow-500/10 text-yellow-300",
  revision: "bg-[#c58b46]/10 text-[#c58b46]",
  rejected: "bg-red-500/10 text-red-300",
};

export default function AdminTrailsPage() {
  const [ture, setTure] = useState<Tura[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("predlogi_tur")
      .select("id, ime, regija, obmocje, tipi, tezavnost, km, visinska_razlika, podlaga_asfalt, podlaga_makadam, podlaga_gozd, gpx_url, galerija, status, created_at")
      .order("created_at", { ascending: false });
    setTure(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      const res = await fetch("/api/admin/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table: "predlogi_tur", id: deleteId }),
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        setDeleteError(json.error ?? "Napaka pri brisanju.");
        setDeleting(false);
        return;
      }
      setDeleteId(null);
      setDeleting(false);
      await load();
    } catch {
      setDeleteError("Napaka pri povezavi s strežnikom.");
      setDeleting(false);
    }
  }

  const total = ture.length;
  const approved = ture.filter(t => t.status === "approved").length;
  const pending = ture.filter(t => t.status === "pending").length;
  const withGpx = ture.filter(t => t.gpx_url).length;

  return (
    <AdminShell active="ture">
      <div className="space-y-8">

        <section className="flex flex-col gap-5 rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Admin / Ture</div>
            <h1 className="mt-4 text-4xl font-black">Upravljanje tur</h1>
            <p className="mt-5 max-w-3xl leading-8 text-zinc-400">
              Vse ture iz baze — objavljene, v pregledu in v dopolnitvi.
            </p>
          </div>
          <Link href="/admin/ture/nova"
            className="rounded-full bg-[#c58b46] px-6 py-4 text-sm font-bold text-black">
            + Dodaj novo turo
          </Link>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          {[
            { value: loading ? "—" : total, label: "vse ture" },
            { value: loading ? "—" : approved, label: "objavljene" },
            { value: loading ? "—" : pending, label: "čakajo na objavo" },
            { value: loading ? "—" : withGpx, label: "GPX naloženih" },
          ].map((s) => (
            <div key={s.label} className="rounded-[28px] border border-white/10 bg-black/20 p-6">
              <div className="text-4xl font-black">{s.value}</div>
              <div className="mt-2 text-sm text-zinc-400">{s.label}</div>
            </div>
          ))}
        </section>

        {loading ? (
          <div className="py-16 text-center text-zinc-500">Nalagam ture...</div>
        ) : ture.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-white/10 py-16 text-center text-zinc-500">
            Ni tur v bazi.
          </div>
        ) : (
          <section className="grid gap-5">
            {ture.map((t) => {
              const hasSurface = t.podlaga_asfalt > 0 || t.podlaga_makadam > 0 || t.podlaga_gozd > 0;
              return (
                <article key={t.id} className="rounded-[32px] border border-white/10 bg-black/20 p-6">
                  <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                    <div>
                      <div className="mb-4 flex flex-wrap gap-2">
                        <span className={`rounded-full px-4 py-2 text-xs font-bold ${statusStyle[t.status] ?? "bg-zinc-500/10 text-zinc-300"}`}>
                          {statusLabel[t.status] ?? t.status}
                        </span>
                        {t.regija && <span className="rounded-full border border-white/10 bg-[#07110b] px-4 py-2 text-xs text-zinc-300">{t.regija}</span>}
                        {(t.tipi ?? []).map(tip => (
                          <span key={tip} className="rounded-full border border-white/10 bg-[#07110b] px-4 py-2 text-xs text-zinc-300">{tip}</span>
                        ))}
                      </div>

                      <h2 className="text-3xl font-black">{t.ime}</h2>
                      {t.obmocje && <div className="mt-1 text-sm text-zinc-500">{t.obmocje}</div>}

                      <div className="mt-5 flex flex-wrap gap-3 text-sm text-zinc-300">
                        {t.km != null && <span className="rounded-full border border-white/10 px-4 py-2">{t.km} km</span>}
                        {t.visinska_razlika != null && <span className="rounded-full border border-white/10 px-4 py-2">{t.visinska_razlika} vm</span>}
                        {t.tezavnost && <span className="rounded-full border border-white/10 px-4 py-2">{t.tezavnost}</span>}
                      </div>

                      {hasSurface && (
                        <div className="mt-4 rounded-2xl border border-white/10 bg-[#07110b] p-4 text-sm text-zinc-300">
                          {[
                            t.podlaga_asfalt > 0 ? `Asfalt ${t.podlaga_asfalt}%` : null,
                            t.podlaga_makadam > 0 ? `Makadam ${t.podlaga_makadam}%` : null,
                            t.podlaga_gozd > 0 ? `Gozdna pot ${t.podlaga_gozd}%` : null,
                          ].filter(Boolean).join(" • ")}
                        </div>
                      )}
                    </div>

                    <div className="rounded-[24px] border border-white/10 bg-[#07110b] p-5">
                      <div className="mb-4 text-xs uppercase tracking-[0.25em] text-[#c58b46]">Stanje vsebine</div>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between gap-4">
                          <span className="text-zinc-400">GPX</span>
                          <span className={t.gpx_url ? "text-emerald-400" : "text-red-400"}>
                            {t.gpx_url ? "✓ naložen" : "✗ manjka"}
                          </span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-zinc-400">Galerija</span>
                          <span className={(t.galerija ?? []).length > 0 ? "text-emerald-400" : "text-zinc-500"}>
                            {(t.galerija ?? []).length > 0 ? `✓ ${t.galerija!.length} slik` : "— manjka"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        {t.status === "approved" && (
                          <Link href={`/ture/${t.id}`} target="_blank"
                            className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:border-[#c58b46]/40">
                            Predogled
                          </Link>
                        )}
                        <button onClick={() => setDeleteId(t.id)}
                          className="rounded-full border border-red-900/30 px-5 py-3 text-sm font-semibold text-red-500/70 hover:border-red-500/40 hover:text-red-400 transition">
                          Izbriši
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[32px] border border-red-500/20 bg-[#07110b] p-6 shadow-2xl">
            <div className="text-xs uppercase tracking-[0.35em] text-red-400">Brisanje</div>
            <h2 className="mt-4 text-2xl font-black text-white">Res izbrisati turo?</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              <span className="font-bold text-white">{ture.find(t => t.id === deleteId)?.ime}</span> bo trajno izbrisana iz baze.
            </p>
            {deleteError && (
              <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{deleteError}</div>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => { setDeleteId(null); setDeleteError(null); }}
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 transition hover:border-white/20">
                Prekliči
              </button>
              <button onClick={handleDelete} disabled={deleting}
                className="rounded-full bg-red-500 px-6 py-3 text-sm font-black text-white transition hover:bg-red-400 disabled:opacity-50">
                {deleting ? "Brišem..." : "Da, izbriši"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
