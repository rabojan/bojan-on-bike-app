"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { supabase } from "@/lib/supabase";

type Doziveto = {
  id: string;
  ime: string;
  regija: string | null;
  doziveto_naslov: string | null;
  doziveto_ciljna_skupina: string[] | null;
  doziveto_uvod: string | null;
  status: string;
  created_at: string;
};

export default function AdminDozivetjaPage() {
  const [dozivetja, setDozivetja] = useState<Doziveto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("predlogi_tur")
      .select("id, ime, regija, doziveto_naslov, doziveto_ciljna_skupina, doziveto_uvod, status, created_at")
      .eq("je_doziveto", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setDozivetja(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <AdminShell active="dozivetja">
      <div className="space-y-8">

        <section className="flex flex-col gap-5 rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Admin / Doživetja</div>
            <h1 className="mt-4 text-4xl font-black">Doživetja</h1>
            <p className="mt-5 max-w-3xl leading-8 text-zinc-400">
              Tukaj so vse ture ki si jih označil kot doživetje. Vsako urejаš znotraj ture — razdelek Doživetje je na dnu strani za urejanje.
            </p>
          </div>
          <Link href="/admin/ture"
            className="rounded-full border border-white/10 px-6 py-4 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">
            → Pojdi na ture
          </Link>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-4xl font-black">{loading ? "—" : String(dozivetja.length)}</div>
            <div className="mt-2 text-sm text-zinc-400">označenih kot doživetje</div>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-4xl font-black">{loading ? "—" : String(dozivetja.filter(d => d.doziveto_naslov).length)}</div>
            <div className="mt-2 text-sm text-zinc-400">ima naslov doživetja</div>
          </div>
        </section>

        <section className="grid gap-5">
          {loading ? (
            <div className="py-12 text-center text-sm text-zinc-500">Nalagam...</div>
          ) : dozivetja.length === 0 ? (
            <div className="rounded-[32px] border border-white/10 bg-black/20 p-12 text-center">
              <div className="text-3xl">✨</div>
              <p className="mt-4 text-sm text-zinc-500">
                Še nobena tura ni označena kot doživetje.
              </p>
              <p className="mt-2 text-xs text-zinc-600">
                Pojdi na uro → Uredi → razdelek Doživetje na dnu.
              </p>
              <Link href="/admin/ture"
                className="mt-5 inline-flex rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black">
                → Pojdi na ture
              </Link>
            </div>
          ) : (
            dozivetja.map((d) => (
              <article key={d.id} className="rounded-[32px] border border-white/10 bg-black/20 p-6">
                <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-[#c58b46]/30 bg-[#c58b46]/10 px-4 py-2 text-xs font-bold text-[#c58b46]">
                        🏆 Doživetje
                      </span>
                      {d.regija && (
                        <span className="rounded-full border border-white/10 bg-[#07110b] px-4 py-2 text-xs text-zinc-300">
                          {d.regija}
                        </span>
                      )}
                      {d.doziveto_ciljna_skupina?.map((s) => (
                        <span key={s} className="rounded-full border border-white/10 bg-[#07110b] px-4 py-2 text-xs text-zinc-300">
                          {s}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-3xl font-black">
                      {d.doziveto_naslov || <span className="text-zinc-500 italic">Brez naslova doživetja</span>}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500">Tura: {d.ime}</p>

                    {d.doziveto_uvod && (
                      <p className="mt-4 text-sm leading-7 text-zinc-400 line-clamp-2">{d.doziveto_uvod}</p>
                    )}

                    {!d.doziveto_naslov && (
                      <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-300">
                        ⚠️ Manjka naslov doživetja — dodaj ga v urejanju ture.
                      </div>
                    )}
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-[#07110b] p-5">
                    <div className="mb-4 text-xs uppercase tracking-[0.25em] text-[#c58b46]">Dejanja</div>
                    <div className="flex flex-wrap gap-3">
                      <Link href={`/admin/ture/${d.id}`}
                        className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black">
                        Uredi
                      </Link>
                      <Link href={`/dozivetja/${d.id}`} target="_blank"
                        className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300">
                        Predogled
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>

      </div>
    </AdminShell>
  );
}
