"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { supabase } from "@/lib/supabase";

type Ponudnik = {
  id: string;
  ime: string;
  tip: string | null;
  regija: string;
  lokacija: string | null;
  telefon: string | null;
  spletna_stran: string | null;
  status: string;
  created_at: string;
  ambasadorji: { ime: string } | null;
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

export default function AdminProvidersPage() {
  const [ponudniki, setPonudniki] = useState<Ponudnik[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("predlogi_ponudnikov")
      .select("id, ime, tip, regija, lokacija, telefon, spletna_stran, status, created_at, ambasadorji(ime)")
      .order("created_at", { ascending: false });
    setPonudniki((data ?? []).map((row) => {
      const r = row as Record<string, unknown>;
      const amb = r.ambasadorji;
      return {
        ...r,
        ambasadorji: Array.isArray(amb) ? (amb[0] ?? null) : (amb ?? null),
      } as Ponudnik;
    }));
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    setDeleteError(null);
    const { error } = await supabase
      .from("predlogi_ponudnikov")
      .delete()
      .eq("id", deleteId);
    if (error) {
      setDeleteError(error.message);
      setDeleting(false);
      return;
    }
    setDeleteId(null);
    setDeleting(false);
    await load();
  }

  const total = ponudniki.length;
  const approved = ponudniki.filter(p => p.status === "approved").length;
  const pending = ponudniki.filter(p => p.status === "pending").length;

  return (
    <AdminShell active="ponudniki">
      <div className="space-y-8">

        <section className="flex flex-col gap-5 rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Admin / Ponudniki</div>
            <h1 className="mt-4 text-4xl font-black">Upravljanje ponudnikov</h1>
            <p className="mt-5 max-w-3xl leading-8 text-zinc-400">
              Vsi ponudniki iz baze — objavljeni, v pregledu in v dopolnitvi.
            </p>
          </div>
          <Link href="/admin/ponudniki/nov"
            className="rounded-full bg-[#c58b46] px-6 py-4 text-sm font-bold text-black">
            + Dodaj ponudnika
          </Link>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            { value: loading ? "—" : total, label: "vsi ponudniki" },
            { value: loading ? "—" : approved, label: "objavljeni" },
            { value: loading ? "—" : pending, label: "čakajo na objavo" },
          ].map((s) => (
            <div key={s.label} className="rounded-[28px] border border-white/10 bg-black/20 p-6">
              <div className="text-4xl font-black">{s.value}</div>
              <div className="mt-2 text-sm text-zinc-400">{s.label}</div>
            </div>
          ))}
        </section>

        {loading ? (
          <div className="py-16 text-center text-zinc-500">Nalagam ponudnike...</div>
        ) : ponudniki.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-white/10 py-16 text-center text-zinc-500">
            Ni ponudnikov v bazi.
          </div>
        ) : (
          <section className="grid gap-5">
            {ponudniki.map((p) => (
              <article key={p.id} className="rounded-[32px] border border-white/10 bg-black/20 p-6">
                <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                  <div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      <span className={`rounded-full px-4 py-2 text-xs font-bold ${statusStyle[p.status] ?? "bg-zinc-500/10 text-zinc-300"}`}>
                        {statusLabel[p.status] ?? p.status}
                      </span>
                      {p.tip && <span className="rounded-full border border-white/10 bg-[#07110b] px-4 py-2 text-xs text-zinc-300">{p.tip}</span>}
                      <span className="rounded-full border border-white/10 bg-[#07110b] px-4 py-2 text-xs text-zinc-300">{p.regija}</span>
                    </div>

                    <h2 className="text-3xl font-black">{p.ime}</h2>
                    {p.ambasadorji && (
                      <div className="mt-1 text-sm text-zinc-500">Predlagal: {p.ambasadorji.ime}</div>
                    )}

                    <div className="mt-5 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
                      {p.lokacija && (
                        <div className="rounded-2xl border border-white/10 bg-[#07110b] p-4">
                          <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">Lokacija</div>
                          <div className="mt-2 font-bold">{p.lokacija}</div>
                        </div>
                      )}
                      {p.telefon && (
                        <div className="rounded-2xl border border-white/10 bg-[#07110b] p-4">
                          <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">Telefon</div>
                          <div className="mt-2 font-bold">{p.telefon}</div>
                        </div>
                      )}
                      {p.spletna_stran && (
                        <div className="rounded-2xl border border-white/10 bg-[#07110b] p-4">
                          <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">Spletna stran</div>
                          <div className="mt-2 font-bold">{p.spletna_stran}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-[#07110b] p-5 flex flex-col justify-between">
                    <div className="text-xs uppercase tracking-[0.25em] text-[#c58b46] mb-4">Akcije</div>
                    <div className="flex flex-wrap items-center gap-3 mt-auto">
                      {p.status === "approved" && (
                        <Link href={`/ponudniki/${p.id}`} target="_blank"
                          className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:border-[#c58b46]/40">
                          Predogled
                        </Link>
                      )}
                      <button onClick={() => setDeleteId(p.id)}
                        className="rounded-full border border-red-900/30 px-5 py-3 text-sm font-semibold text-red-500/70 hover:border-red-500/40 hover:text-red-400 transition">
                        Izbriši
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[32px] border border-red-500/20 bg-[#07110b] p-6 shadow-2xl">
            <div className="text-xs uppercase tracking-[0.35em] text-red-400">Brisanje</div>
            <h2 className="mt-4 text-2xl font-black text-white">Res izbrisati ponudnika?</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              <span className="font-bold text-white">{ponudniki.find(p => p.id === deleteId)?.ime}</span> bo trajno izbrisan iz baze.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              {deleteError && (
            <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{deleteError}</div>
          )}
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
