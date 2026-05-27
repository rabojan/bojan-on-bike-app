"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AmbassadorShell from "@/components/AmbassadorShell";
import { supabase } from "@/lib/supabase";

type Predlog = {
  id: string;
  ime: string;
  regija: string | null;
  status: string;
  km: number | null;
  visinska_razlika: number | null;
};

function StatusBadge({ status }: { status: string }) {
  const labels: Record<string, string> = {
    pending: "Čaka na objavo",
    approved: "Objavljeno",
    rejected: "Zavrnjeno",
    revision: "Potreben popravek",
  };
  const tones: Record<string, string> = {
    approved: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    revision: "border-[#c58b46]/20 bg-[#c58b46]/10 text-[#c58b46]",
    rejected: "border-red-400/20 bg-red-400/10 text-red-300",
    pending: "border-white/10 bg-white/5 text-zinc-400",
  };
  return (
    <span className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-bold ${tones[status] ?? tones.pending}`}>
      {labels[status] ?? status}
    </span>
  );
}

const TOP_THRESHOLD = 30;

export default function AmbassadorDashboardPage() {
  const [ime, setIme] = useState("Ambasador");
  const [ambasadorId, setAmbasadorId] = useState<string | null>(null);
  const [stats, setStats] = useState({ ture: 0, tureObjavljene: 0, ponudniki: 0, znamenitosti: 0 });
  const [predlogi, setPredlogi] = useState<Predlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Profil ambasadorja
      const { data: profil } = await supabase
        .from("ambasadorji")
        .select("id, ime")
        .eq("user_id", session.user.id)
        .single();

      if (!profil) { setLoading(false); return; }

      setIme(profil.ime.split(" ")[0]);
      setAmbasadorId(profil.id);

      // Statistike
      const [
        { count: ture },
        { count: tureObjavljene },
        { count: ponudniki },
        { count: znamenitosti },
      ] = await Promise.all([
        supabase.from("predlogi_tur").select("*", { count: "exact", head: true }).eq("ambasador_id", profil.id),
        supabase.from("predlogi_tur").select("*", { count: "exact", head: true }).eq("ambasador_id", profil.id).eq("status", "approved"),
        supabase.from("predlogi_ponudnikov").select("*", { count: "exact", head: true }).eq("ambasador_id", profil.id),
        supabase.from("predlogi_znamenitosti").select("*", { count: "exact", head: true }).eq("ambasador_id", profil.id),
      ]);

      setStats({
        ture: ture ?? 0,
        tureObjavljene: tureObjavljene ?? 0,
        ponudniki: ponudniki ?? 0,
        znamenitosti: znamenitosti ?? 0,
      });

      // Zadnji predlogi tur
      const { data: zadnji } = await supabase
        .from("predlogi_tur")
        .select("id, ime, regija, status, km, visinska_razlika")
        .eq("ambasador_id", profil.id)
        .order("created_at", { ascending: false })
        .limit(3);

      setPredlogi(zadnji ?? []);
      setLoading(false);
    }

    load();
  }, []);

  const progress = Math.min(Math.round((stats.tureObjavljene / TOP_THRESHOLD) * 100), 100);
  const doTop = TOP_THRESHOLD - stats.tureObjavljene;

  return (
    <AmbassadorShell>
      <div className="space-y-8">

        {/* ── Pozdrav ── */}
        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Ambasadorski kotiček</div>
              <h1 className="mt-4 font-serif text-4xl font-black italic leading-tight text-white md:text-5xl">
                Dobrodošel nazaj, {ime}.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400">
                Tukaj spremljaš svoje predloge tur, ponudnikov in znamenitosti.
                Vsaka objavljena vsebina ostane povezana s tvojim profilom.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/ambasador/koticek/ture/nova"
                className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black transition hover:opacity-90">
                + Nova tura
              </Link>
              <Link href="/ambasador/koticek/profil"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">
                Uredi profil
              </Link>
            </div>
          </div>
        </section>

        {/* ── Statistike ── */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { value: stats.ture, label: "tur predlaganih" },
            { value: stats.tureObjavljene, label: "tur objavljenih" },
            { value: stats.ponudniki, label: "ponudnikov" },
            { value: stats.znamenitosti, label: "znamenitosti" },
          ].map((s) => (
            <div key={s.label} className="flex min-h-[130px] flex-col items-center justify-center rounded-[26px] border border-white/10 bg-[#07110b] p-5 text-center">
              <div className="text-5xl font-black leading-none text-white">
                {loading ? "—" : s.value}
              </div>
              <div className="mt-3 text-sm font-bold text-zinc-500">{s.label}</div>
            </div>
          ))}
        </section>

        {/* ── TOP ambasador progress ── */}
        <section className="rounded-[32px] border border-[#c58b46]/20 bg-[#c58b46]/10 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-[#c58b46]">TOP ambasador</div>
              <h2 className="mt-2 text-xl font-black text-white">
                {doTop > 0 ? `Še ${doTop} objavljenih tur do TOP oznake` : "Dosegel si TOP oznako! 🏆"}
              </h2>
              <p className="mt-1.5 text-sm text-zinc-400">Vsaka potrjena tura šteje k napredku.</p>
            </div>
            <div className="sm:w-48">
              <div className="mb-2 flex justify-between text-xs font-bold text-zinc-400">
                <span>{stats.tureObjavljene} / {TOP_THRESHOLD}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-black/30">
                <div className="h-full rounded-full bg-[#c58b46] transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Zadnji predlogi ── */}
        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Zadnji predlogi</div>
              <h2 className="mt-3 text-2xl font-black text-white">Tvoje ture in status.</h2>
            </div>
            <Link href="/ambasador/koticek/ture"
              className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">
              Vse ture →
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center text-zinc-500">Nalagam...</div>
          ) : predlogi.length === 0 ? (
            <div className="rounded-[22px] border border-dashed border-white/10 py-10 text-center">
              <p className="text-zinc-500">Še nimaš predlogov tur.</p>
              <Link href="/ambasador/koticek/ture/nova"
                className="mt-4 inline-block rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black">
                Predlagaj prvo turo
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {predlogi.map((p) => (
                <div key={p.id} className="flex flex-wrap items-center justify-between gap-4 rounded-[22px] border border-white/10 bg-black/20 p-5">
                  <div>
                    <div className="font-black text-white">{p.ime}</div>
                    <div className="mt-1 text-sm text-zinc-500">
                      {p.regija ?? "—"}{p.km ? ` · ${p.km} km` : ""}{p.visinska_razlika ? ` · ${p.visinska_razlika} vm` : ""}
                    </div>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Hitri dostop ── */}
        <section className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Ponudniki", desc: "Predlagaj lokalne ponudnike ob tvojih trasah.", href: "/ambasador/koticek/ponudniki" },
            { label: "Znamenitosti", desc: "Dodaj razglede, naravne točke in kulturo ob poti.", href: "/ambasador/koticek/znamenitosti" },
            { label: "Profil", desc: "Uredi svojo ambasadorsko vizitko in podatke.", href: "/ambasador/koticek/profil" },
          ].map((item) => (
            <Link key={item.label} href={item.href}
              className="flex flex-col justify-between rounded-[28px] border border-white/10 bg-[#07110b] p-6 transition hover:border-[#c58b46]/30">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-[#c58b46]">{item.label}</div>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{item.desc}</p>
              </div>
              <div className="mt-5 text-sm font-black text-zinc-300">Odpri →</div>
            </Link>
          ))}
        </section>

      </div>
    </AmbassadorShell>
  );
}
