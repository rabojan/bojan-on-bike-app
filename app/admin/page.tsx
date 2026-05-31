"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { supabase } from "@/lib/supabase";

type RecentItem = {
  ime: string;
  tip: "tura" | "ponudnik" | "znamenitost";
  ambasador: string;
  created_at: string;
};

type Stats = {
  vPregledu: number;
  pendingTure: number;
  pendingPonudniki: number;
  pendingZnamenitosti: number;
  revizije: number;
  tureTotal: number;
  tureApproved: number;
  ponudnikiTotal: number;
  ponudnikiApproved: number;
  znamenitostiTotal: number;
  znamenitostiApproved: number;
  ambasadorji: number;
  recentItems: RecentItem[];
};

const tipLabel: Record<string, string> = {
  tura: "predlog ture",
  ponudnik: "nov ponudnik",
  znamenitost: "nova znamenitost",
};

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function load() {
      const [
        { data: ture },
        { data: ponudniki },
        { data: znamenitosti },
        { data: ambasadorji },
      ] = await Promise.all([
        supabase.from("predlogi_tur").select("id, ime, status, created_at, ambasadorji(ime)"),
        supabase.from("predlogi_ponudnikov").select("id, ime, status, created_at, ambasadorji(ime)"),
        supabase.from("predlogi_znamenitosti").select("id, ime, status, created_at, ambasadorji(ime)"),
        supabase.from("ambasadorji").select("id"),
      ]);

      const getAmb = (row: Record<string, unknown>) => {
        const a = row.ambasadorji;
        if (Array.isArray(a)) return (a[0] as { ime: string })?.ime ?? "—";
        return (a as { ime: string } | null)?.ime ?? "—";
      };

      const pendingTure = (ture ?? []).filter(t => t.status === "pending").length;
      const pendingPonudniki = (ponudniki ?? []).filter(p => p.status === "pending").length;
      const pendingZnamenitosti = (znamenitosti ?? []).filter(z => z.status === "pending").length;
      const revizije = [...(ture ?? []), ...(ponudniki ?? []), ...(znamenitosti ?? [])].filter(x => x.status === "revision").length;

      const recent: RecentItem[] = [
        ...(ture ?? []).map(t => ({ ime: t.ime, tip: "tura" as const, ambasador: getAmb(t as Record<string, unknown>), created_at: t.created_at })),
        ...(ponudniki ?? []).map(p => ({ ime: p.ime, tip: "ponudnik" as const, ambasador: getAmb(p as Record<string, unknown>), created_at: p.created_at })),
        ...(znamenitosti ?? []).map(z => ({ ime: z.ime, tip: "znamenitost" as const, ambasador: getAmb(z as Record<string, unknown>), created_at: z.created_at })),
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);

      setStats({
        vPregledu: pendingTure + pendingPonudniki + pendingZnamenitosti,
        pendingTure,
        pendingPonudniki,
        pendingZnamenitosti,
        revizije,
        tureTTotal: (ture ?? []).length,
        tureApproved: (ture ?? []).filter(t => t.status === "approved").length,
        ponudnikiTotal: (ponudniki ?? []).length,
        ponudnikiApproved: (ponudniki ?? []).filter(p => p.status === "approved").length,
        znamenitostiTotal: (znamenitosti ?? []).length,
        znamenitostiApproved: (znamenitosti ?? []).filter(z => z.status === "approved").length,
        ambasadorji: (ambasadorji ?? []).length,
        recentItems: recent,
      } as unknown as Stats);
    }
    load();
  }, []);

  const s = stats;

  return (
    <AdminShell active="pregled">
      <div className="space-y-8">

        {/* Glava */}
        <section className="rounded-[38px] border border-white/10 bg-[#0b1a10] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.18)] md:p-8">
          <div className="grid gap-6 xl:grid-cols-[1fr_auto] xl:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Bojanova pisarna</div>
              <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-white md:text-5xl">
                Centralna nadzorna plošča.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400">
                Tukaj vidiš, kaj potrebuje tvojo pozornost, in od tukaj prideš
                do vseh glavnih delov platforme.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/admin/v-pregled"
                className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black transition hover:brightness-110">
                Odpri v pregled
              </Link>
            </div>
          </div>
        </section>

        {/* Pozornost */}
        <section>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Najprej poglej</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white">Kaj potrebuje tvojo pozornost?</h2>
            </div>
            <Link href="/admin/v-pregled"
              className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">
              Vse v pregledu
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              { value: s?.vPregledu ?? "—", label: "v pregledu", text: "predlogi, ki čakajo na odločitev" },
              { value: s?.pendingTure ?? "—", label: "predlogi tur", text: "nove ture, poslane od ambasadorjev" },
              { value: s ? s.pendingPonudniki + s.pendingZnamenitosti : "—", label: "nove vsebine", text: "ponudniki ali znamenitosti za preverjanje" },
              { value: s?.revizije ?? "—", label: "v dopolnitvi", text: "predlogi vrnjeni v popravek" },
            ].map((item) => (
              <Link key={item.label} href="/admin/v-pregled"
                className="flex min-h-[160px] flex-col justify-between rounded-[28px] border border-white/10 bg-[#07110b] p-5 transition hover:-translate-y-0.5 hover:border-[#c58b46]/40">
                <div>
                  <div className="text-5xl font-black leading-none text-white">{item.value}</div>
                  <div className="mt-3 text-base font-black text-white">{item.label}</div>
                </div>
                <p className="mt-4 text-sm leading-6 text-zinc-500">{item.text}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Uredniški inbox */}
        <section className="rounded-[38px] border border-[#c58b46]/20 bg-[#c58b46]/10 p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Uredniški inbox</div>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-white">
                Predlogi, ki čakajo na tvojo odločitev.
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-300">
                Odpreš jih, preveriš in se odločiš: objavi, vrni v dopolnitev ali zbriši.
              </p>
            </div>
            <Link href="/admin/v-pregled"
              className="rounded-full bg-[#c58b46] px-7 py-4 text-sm font-black text-black transition hover:brightness-110">
              Odpri uredniški pregled
            </Link>
          </div>
        </section>

        {/* Moduli */}
        <section>
          <div className="mb-5">
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Glavni moduli</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white">Vse, kar urejaš na platformi.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Ture", href: "/admin/ture", addHref: "/admin/ture/nova", addLabel: "Dodaj turo",
                description: "Objavljene ture, čakajo na objavo, GPX, podlaga in galerija.",
                stats: s ? `${s.tureApproved} objavljenih · ${s.pendingTure} čaka` : "Nalagam...",
              },
              {
                title: "Ponudniki", href: "/admin/ponudniki", addHref: "/admin/ponudniki/nov", addLabel: "Dodaj ponudnika",
                description: "Kulinarika, vino, prenočišča, servis, polnilnice in postanki ob trasi.",
                stats: s ? `${s.ponudnikiApproved} objavljenih · ${s.pendingPonudniki} čaka` : "Nalagam...",
              },
              {
                title: "Znamenitosti", href: "/admin/znamenitosti", addHref: "/admin/znamenitosti/nova", addLabel: "Dodaj znamenitost",
                description: "Razgledi, naravne točke, kulturni kraji in posebnosti ob poti.",
                stats: s ? `${s.znamenitostiApproved} objavljenih · ${s.pendingZnamenitosti} čaka` : "Nalagam...",
              },
              {
                title: "Ambasadorji", href: "/admin/ambasadorji", addHref: "/admin/ambasadorji/nov", addLabel: "Dodaj ambasadorja",
                description: "Lokalni avtorji tur, profili, regije in statusi.",
                stats: s ? `${s.ambasadorji} ambasadorjev` : "Nalagam...",
              },
              {
                title: "Regije", href: "/admin/regije", addHref: "/admin/regije/nova", addLabel: "Dodaj regijo",
                description: "Pokrajine, lokalna območja in povezave s turami ter ambasadorji.",
                stats: "7 regij",
              },
              {
                title: "Doživetja", href: "/admin/dozivetja", addHref: "/admin/dozivetja/novo", addLabel: "Dodaj doživetje",
                description: "Doživljajski dnevi, vinske poti, družinski izleti in posebne zgodbe.",
                stats: "—",
              },
            ].map((mod) => (
              <div key={mod.title} className="flex min-h-[280px] flex-col justify-between rounded-[30px] border border-white/10 bg-[#07110b] p-6">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-[#c58b46]">Modul</div>
                  <h3 className="mt-4 text-2xl font-black text-white">{mod.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-500">{mod.description}</p>
                  <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-bold text-zinc-300">
                    {mod.stats}
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={mod.href}
                    className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">
                    Odpri modul
                  </Link>
                  <Link href={mod.addHref}
                    className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-black text-black transition hover:brightness-110">
                    {mod.addLabel}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Zadnje aktivnosti + Hitri vnosi */}
        <div className="grid gap-5 lg:grid-cols-2">
          <section className="rounded-[30px] border border-white/10 bg-[#07110b] p-6">
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Zadnje aktivnosti</div>
            <h2 className="mt-3 text-2xl font-black text-white">Kaj se je nazadnje zgodilo?</h2>
            <div className="mt-5 space-y-3">
              {s?.recentItems.length === 0 && (
                <div className="text-sm text-zinc-500">Ni aktivnosti.</div>
              )}
              {s?.recentItems.map((item, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-300">
                  <span className="font-bold text-white">{item.ambasador}</span> je dodal {tipLabel[item.tip]}:{" "}
                  <span className="text-[#c58b46]">{item.ime}</span>
                </div>
              ))}
              {!s && <div className="text-sm text-zinc-500">Nalagam...</div>}
            </div>
          </section>

          <section className="rounded-[30px] border border-white/10 bg-[#07110b] p-6">
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Hitri vnosi</div>
            <h2 className="mt-3 text-2xl font-black text-white">Dodaj novo.</h2>
            <div className="mt-5 space-y-3">
              {[
                { label: "+ Nova tura", href: "/admin/ture/nova" },
                { label: "+ Nov ponudnik", href: "/admin/ponudniki/nov" },
                { label: "+ Nova znamenitost", href: "/admin/znamenitosti/nova" },
                { label: "+ Novo doživetje", href: "/admin/dozivetja/novo" },
                { label: "+ Nova regija", href: "/admin/regije/nova" },
              ].map((link) => (
                <Link key={link.href} href={link.href}
                  className="block rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40 hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        </div>

      </div>
    </AdminShell>
  );
}
