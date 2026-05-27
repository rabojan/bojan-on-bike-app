"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AmbassadorShell from "@/components/AmbassadorShell";
import { supabase } from "@/lib/supabase";

type Tura = {
  id: string;
  ime: string;
  regija: string | null;
  km: number | null;
  visinska_razlika: number | null;
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

export default function AmbassadorTurePage() {
  const [ture, setTure] = useState<Tura[]>([]);
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
        .from("predlogi_tur")
        .select("id, ime, regija, km, visinska_razlika, status, admin_opomba, created_at")
        .eq("ambasador_id", profil.id)
        .order("created_at", { ascending: false });

      setTure(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = ture.filter((t) => {
    if (activeFilter === "Vse") return true;
    return statusLabel[t.status] === activeFilter;
  });

  const objavljenih = ture.filter((t) => t.status === "approved").length;
  const cakajo = ture.filter((t) => t.status === "pending").length;
  const doTop = Math.max(0, 30 - objavljenih);

  return (
    <AmbassadorShell>
      <div className="space-y-8">

        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Ambasadorski kotiček / Ture</div>
              <h1 className="mt-4 font-serif text-4xl font-black italic leading-tight text-white">
                Tvoje ture in predlogi.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">
                Tukaj vidiš vse predloge — od osnutkov do objavljenih tur. Vsaka objavljena tura je
                vezana na tvoj ambasadorski profil.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/ambasador/koticek"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">
                ← Kotiček
              </Link>
              <Link href="/ambasador/koticek/ture/nova"
                className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black transition hover:opacity-90">
                + Predlagaj turo
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-4">
          {[
            { value: loading ? "—" : String(ture.length), label: "vseh predlogov" },
            { value: loading ? "—" : String(objavljenih), label: "objavljenih" },
            { value: loading ? "—" : String(cakajo), label: "čakajo" },
            { value: loading ? "—" : String(doTop), label: "do TOP oznake", highlight: true },
          ].map((s) => (
            <div key={s.label} className={`flex min-h-[130px] flex-col items-center justify-center rounded-[26px] border p-5 text-center ${s.highlight ? "border-[#c58b46]/20 bg-[#c58b46]/10" : "border-white/10 bg-[#07110b]"}`}>
              <div className="text-4xl font-black leading-none text-white">{s.value}</div>
              <div className="mt-3 text-sm font-bold text-zinc-500">{s.label}</div>
            </div>
          ))}
        </section>

        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-black text-white">Status vsake tvoje ture.</h2>
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
              <div className="text-3xl">🚵</div>
              <p className="mt-4 text-sm text-zinc-600">
                {activeFilter === "Vse" ? "Še nisi predlagal nobene ture." : "Ni predlogov s tem statusom."}
              </p>
              {activeFilter === "Vse" && (
                <Link href="/ambasador/koticek/ture/nova"
                  className="mt-5 inline-flex rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black transition hover:opacity-90">
                  + Predlagaj prvo turo
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((tura) => (
                <article key={tura.id}
                  className="grid gap-4 rounded-[28px] border border-white/10 bg-black/20 p-5 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-black text-white">{tura.ime}</h3>
                      <StatusBadge status={tura.status} />
                    </div>
                    <div className="mt-1.5 text-sm text-zinc-500">
                      {tura.regija}
                      {tura.km ? ` · ${tura.km} km` : ""}
                      {tura.visinska_razlika ? ` · ${tura.visinska_razlika} vm` : ""}
                    </div>
                    {tura.admin_opomba && (
                      <p className="mt-2 text-sm leading-7 text-[#c58b46]">💬 {tura.admin_opomba}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

      </div>
    </AmbassadorShell>
  );
}
