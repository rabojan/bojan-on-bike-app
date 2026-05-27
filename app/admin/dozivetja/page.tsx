"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { supabase } from "@/lib/supabase";

type Dozivete = {
  id: string;
  title: string;
  regija: string;
  obmocje: string | null;
  tip: string[] | null;
  status: string;
  ritem_dneva: unknown[];
  created_at: string;
};

const statusLabel: Record<string, string> = {
  draft: "Osnutek",
  published: "Objavljeno",
};

function StatusBadge({ status }: { status: string }) {
  const label = statusLabel[status] ?? status;
  const tone =
    status === "published"
      ? "bg-emerald-500/10 text-emerald-300"
      : "bg-yellow-500/10 text-yellow-300";
  return (
    <span className={`rounded-full px-4 py-2 text-xs font-bold ${tone}`}>
      {label}
    </span>
  );
}

export default function AdminDozivetjaPage() {
  const [dozivetja, setDozivetja] = useState<Dozivete[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("dozivetja")
        .select("id, title, regija, obmocje, tip, status, ritem_dneva, created_at")
        .order("created_at", { ascending: false });
      setDozivetja(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const published = dozivetja.filter((d) => d.status === "published").length;
  const drafts = dozivetja.filter((d) => d.status === "draft").length;

  return (
    <AdminShell active="dozivetja">
      <div className="space-y-8">

        <section className="flex flex-col gap-5 rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Admin / Doživetja
            </div>
            <h1 className="mt-4 text-4xl font-black">Doživetja</h1>
            <p className="mt-5 max-w-3xl leading-8 text-zinc-400">
              Tukaj urejaš ideje za kolesarski dan: vinska doživetja, družinske
              izlete, kulinarične ture, razgledne poti, vikend pobege in zgodbe
              krajev.
            </p>
          </div>
          <Link
            href="/admin/dozivetja/novo"
            className="rounded-full bg-[#c58b46] px-6 py-4 text-sm font-bold text-black"
          >
            + Dodaj doživetje
          </Link>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            { value: loading ? "—" : String(dozivetja.length), label: "vsa doživetja" },
            { value: loading ? "—" : String(published), label: "objavljeno" },
            { value: loading ? "—" : String(drafts), label: "osnutki" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-[28px] border border-white/10 bg-black/20 p-6"
            >
              <div className="text-4xl font-black">{s.value}</div>
              <div className="mt-2 text-sm text-zinc-400">{s.label}</div>
            </div>
          ))}
        </section>

        <section className="grid gap-5">
          {loading ? (
            <div className="py-12 text-center text-sm text-zinc-500">
              Nalagam...
            </div>
          ) : dozivetja.length === 0 ? (
            <div className="rounded-[32px] border border-white/10 bg-black/20 p-12 text-center">
              <div className="text-3xl">✨</div>
              <p className="mt-4 text-sm text-zinc-500">
                Še ni doživetij. Dodaj prvo.
              </p>
              <Link
                href="/admin/dozivetja/novo"
                className="mt-5 inline-flex rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black"
              >
                + Dodaj doživetje
              </Link>
            </div>
          ) : (
            dozivetja.map((d) => (
              <article
                key={d.id}
                className="rounded-[32px] border border-white/10 bg-black/20 p-6"
              >
                <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      <StatusBadge status={d.status} />
                      <span className="rounded-full border border-white/10 bg-[#07110b] px-4 py-2 text-xs text-zinc-300">
                        {d.regija}
                        {d.obmocje ? ` · ${d.obmocje}` : ""}
                      </span>
                      {d.tip?.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-[#07110b] px-4 py-2 text-xs text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-3xl font-black">{d.title}</h2>
                    <div className="mt-4 text-sm text-zinc-500">
                      {Array.isArray(d.ritem_dneva) ? d.ritem_dneva.length : 0}{" "}
                      {Array.isArray(d.ritem_dneva) && d.ritem_dneva.length === 1
                        ? "sklop"
                        : "sklopov"}{" "}
                      · Dodano:{" "}
                      {new Date(d.created_at).toLocaleDateString("sl-SI")}
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-[#07110b] p-5">
                    <div className="mb-4 text-xs uppercase tracking-[0.25em] text-[#c58b46]">
                      Dejanja
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/admin/dozivetja/${d.id}`}
                        className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black"
                      >
                        Uredi
                      </Link>
                      <Link
                        href={`/dozivetja/${d.id}`}
                        target="_blank"
                        className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300"
                      >
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
