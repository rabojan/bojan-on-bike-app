"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { supabase } from "@/lib/supabase";

type Ambasador = {
  id: string;
  ime: string;
  regija: string | null;
  email: string | null;
  foto_url: string | null;
  kratek_opis: string | null;
  created_at: string;
};

export default function AdminAmbassadorsPage() {
  const [ambasadorji, setAmbasadorji] = useState<Ambasador[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("ambasadorji")
      .select("id, ime, regija, email, foto_url, kratek_opis, created_at")
      .order("created_at", { ascending: false });
    setAmbasadorji(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    setDeleteError(null);
    const { error } = await supabase
      .from("ambasadorji")
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

  return (
    <AdminShell active="ambasadorji">
      <div className="space-y-8">

        <section className="flex flex-col gap-5 rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Admin / Ambasadorji</div>
            <h1 className="mt-4 text-4xl font-black">Upravljanje ambasadorjev</h1>
            <p className="mt-5 max-w-3xl leading-8 text-zinc-400">
              Vsi ambasadorji iz baze — registrirani uporabniki ki dodajajo vsebino.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {[
            { value: loading ? "—" : ambasadorji.length, label: "skupaj ambasadorjev" },
            { value: loading ? "—" : ambasadorji.filter(a => a.foto_url).length, label: "s profilno sliko" },
          ].map((s) => (
            <div key={s.label} className="rounded-[28px] border border-white/10 bg-black/20 p-6">
              <div className="text-4xl font-black">{s.value}</div>
              <div className="mt-2 text-sm text-zinc-400">{s.label}</div>
            </div>
          ))}
        </section>

        {loading ? (
          <div className="py-16 text-center text-zinc-500">Nalagam ambasadorje...</div>
        ) : ambasadorji.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-white/10 py-16 text-center text-zinc-500">
            Ni ambasadorjev v bazi.
          </div>
        ) : (
          <section className="grid gap-5">
            {ambasadorji.map((a) => (
              <article key={a.id} className="rounded-[32px] border border-white/10 bg-black/20 p-6">
                <div className="flex items-start gap-5">
                  {a.foto_url ? (
                    <img src={a.foto_url} alt={a.ime}
                      className="h-16 w-16 shrink-0 rounded-full object-cover border border-white/10" />
                  ) : (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#c58b46]/20 text-xl font-black text-[#c58b46]">
                      {a.ime.charAt(0)}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      {a.regija && (
                        <span className="rounded-full border border-white/10 bg-[#07110b] px-4 py-1.5 text-xs text-zinc-300">
                          {a.regija}
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-black">{a.ime}</h2>
                    {a.email && <div className="mt-1 text-sm text-zinc-500">{a.email}</div>}
                    {a.kratek_opis && (
                      <p className="mt-3 text-sm leading-7 text-zinc-400 line-clamp-2">{a.kratek_opis}</p>
                    )}
                    <div className="mt-1 text-xs text-zinc-600">
                      Dodan: {new Date(a.created_at).toLocaleDateString("sl-SI")}
                    </div>
                  </div>

                  <button onClick={() => setDeleteId(a.id)}
                    className="shrink-0 rounded-full border border-red-900/30 px-5 py-2.5 text-sm font-semibold text-red-500/70 hover:border-red-500/40 hover:text-red-400 transition">
                    Izbriši
                  </button>
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
            <h2 className="mt-4 text-2xl font-black text-white">Res izbrisati ambasadorja?</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              <span className="font-bold text-white">{ambasadorji.find(a => a.id === deleteId)?.ime}</span> bo trajno izbrisan iz baze.
            </p>
            {deleteError && (
              <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{deleteError}</div>
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
