"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AmbassadorShell from "@/components/AmbassadorShell";
import { supabase } from "@/lib/supabase";

type Ponudnik = {
  id: string;
  ime: string;
  tip: string | null;
  regija: string | null;
  status: string;
  admin_opomba: string | null;
  created_at: string;
};

const statusLabel: Record<string, string> = {
  pending: "Čaka na objavo",
  approved: "Objavljeno",
  rejected: "Zavrnjeno",
  revision: "Potreben popravek",
};

const filters = ["Vse", "Čaka na objavo", "Objavljeno", "Potreben popravek", "Zavrnjeno"];

function StatusBadge({ status }: { status: string }) {
  const label = statusLabel[status] ?? status;
  const tone =
    status === "approved" ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
    : status === "revision" ? "border-[#c58b46]/20 bg-[#c58b46]/10 text-[#c58b46]"
    : status === "rejected" ? "border-red-400/20 bg-red-400/10 text-red-300"
    : "border-white/10 bg-white/5 text-zinc-400";
  return <span className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-bold ${tone}`}>{label}</span>;
}

export default function AmbassadorPonudnikiPage() {
  const [ponudniki, setPonudniki] = useState<Ponudnik[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Vse");

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: profil } = await supabase
        .from("ambasadorji")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

      if (!profil) return;

      const { data } = await supabase
        .from("predlogi_ponudnikov")
        .select("id, ime, tip, regija, status, admin_opomba, created_at")
        .eq("ambasador_id", profil.id)
        .order("created_at", { ascending: false });

      setPonudniki(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = ponudniki.filter((p) => {
    if (activeFilter === "Vse") return true;
    return statusLabel[p.status] === activeFilter;
  });

  const objavljenih = ponudniki.filter((p) => p.status === "approved").length;
  const cakajo = ponudniki.filter((p) => p.status === "pending").length;

  return (
    <AmbassadorShell>
      <div className="space-y-8">

        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Ambasadorski kotiček / Ponudniki</div>
              <h1 className="mt-4 font-serif text-4xl font-black italic leading-tight text-white">
                Tvoji predlagani ponudniki.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">
                Predlagaj lokalne ponudnike, ki jih priporočaš ob tvojih trasah — koče, kleti,
                bifeji, bike shopsi. Vsak potrjen ponudnik dobi svojo stran na platformi.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/ambasador/koticek"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">
                ← Kotiček
              </Link>
              <Link href="/ambasador/koticek/ponudniki/nova"
                className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black transition hover:opacity-90">
                + Predlagaj ponudnika
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {[
            { value: loading ? "—" : String(ponudniki.length), label: "vseh predlaganih" },
            { value: loading ? "—" : String(objavljenih), label: "objavljenih" },
            { value: loading ? "—" : String(cakajo), label: "čakajo na pregled" },
          ].map((s) => (
            <div key={s.label} className="flex min-h-[120px] flex-col items-center justify-center rounded-[26px] border border-white/10 bg-[#07110b] p-5 text-center">
              <div className="text-4xl font-black leading-none text-white">{s.value}</div>
              <div className="mt-3 text-sm font-bold text-zinc-500">{s.label}</div>
            </div>
          ))}
        </section>

        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-black text-white">Pregled predlaganih ponudnikov.</h2>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className={`rounded-full border px-4 py-2 text-xs font-bold transition ${activeFilter === f ? "border-[#c58b46]/30 bg-[#c58b46] text-black" : "border-white/10 text-zinc-400 hover:border-white/20"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center text-sm text-zinc-500">Nalagam...</div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center">
              <div className="text-3xl">🏪</div>
              <p className="mt-4 text-sm text-zinc-600">
                {activeFilter === "Vse" ? "Še nisi predlagal nobenega ponudnika." : "Ni predlogov s tem statusom."}
              </p>
              {activeFilter === "Vse" && (
                <Link href="/ambasador/koticek/ponudniki/nova"
                  className="mt-5 inline-flex rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black transition hover:opacity-90">
                  + Predlagaj prvega
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((p) => (
                <article key={p.id}
                  className="grid gap-4 rounded-[28px] border border-white/10 bg-black/20 p-5 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-black text-white">{p.ime}</h3>
                      <StatusBadge status={p.status} />
                    </div>
                    <div className="mt-1.5 text-sm text-zinc-500">
                      {[p.tip, p.regija].filter(Boolean).join(" · ")}
                    </div>
                    {p.admin_opomba && (
                      <p className="mt-2 text-sm leading-7 text-[#c58b46]">💬 {p.admin_opomba}</p>
                    )}
                  </div>
                  {(p.status === "pending" || p.status === "revision" || p.status === "rejected") && (
                    <Link href={`/ambasador/koticek/ponudniki/${p.id}/uredi`}
                      className="shrink-0 rounded-full border border-[#c58b46]/30 bg-[#c58b46]/10 px-5 py-2.5 text-sm font-bold text-[#c58b46] transition hover:bg-[#c58b46]/20">
                      Uredi
                    </Link>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>

      </div>
    </AmbassadorShell>
  );
}
