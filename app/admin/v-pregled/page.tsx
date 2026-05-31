"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { supabase } from "@/lib/supabase";

type PredlogItem = {
  id: string;
  tip: "tura" | "ponudnik" | "znamenitost";
  ime: string;
  ambasador: string;
  ambasadorEmail: string | null;
  regija: string | null;
  status: string;
  zakaj: string | null;
  created_at: string;
};

const returnReasons = [
  "manjka bolj jasen opis",
  "GPX ni ustrezen ali potrebuje preverjanje",
  "manjkajo utrinki s poti",
  "ponudniki niso dovolj jasno povezani",
  "potrebno je dopolniti lokalni pogled",
  "manjka fotografija ali je neustrezna",
];

function StatusBadge({ status }: { status: string }) {
  const labels: Record<string, string> = { pending: "Čaka", approved: "Objavljeno", rejected: "Zavrnjeno", revision: "V dopolnitvi" };
  const tones: Record<string, string> = {
    pending: "border-blue-300/20 bg-blue-300/10 text-blue-200",
    approved: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    rejected: "border-red-400/20 bg-red-400/10 text-red-300",
    revision: "border-[#c58b46]/20 bg-[#c58b46]/10 text-[#c58b46]",
  };
  return (
    <span className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs font-bold ${tones[status] ?? tones.pending}`}>
      {labels[status] ?? status}
    </span>
  );
}

const tipLabels: Record<string, string> = { tura: "Predlog ture", ponudnik: "Novi ponudnik", znamenitost: "Nova znamenitost" };

export default function AdminReviewPage() {
  const [items, setItems] = useState<PredlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Vse");
  const [returnItem, setReturnItem] = useState<PredlogItem | null>(null);
  const [returnMessage, setReturnMessage] = useState("");
  const [processing, setProcessing] = useState<string | null>(null);
  const [deleteItem, setDeleteItem] = useState<PredlogItem | null>(null);

  async function load() {
    setLoading(true);

    const [{ data: ture }, { data: ponudniki }, { data: znamenitosti }] = await Promise.all([
      supabase.from("predlogi_tur")
        .select("id, ime, regija, status, zakaj, created_at, ambasadorji(ime, email)")
        .order("created_at", { ascending: false }),
      supabase.from("predlogi_ponudnikov")
        .select("id, ime, regija, status, zakaj, created_at, ambasadorji(ime, email)")
        .order("created_at", { ascending: false }),
      supabase.from("predlogi_znamenitosti")
        .select("id, ime, regija, status, zakaj, created_at, ambasadorji(ime, email)")
        .order("created_at", { ascending: false }),
    ]);

    const mapItems = (arr: unknown[], tip: PredlogItem["tip"]): PredlogItem[] =>
      (arr ?? []).map((r: unknown) => {
        const row = r as Record<string, unknown>;
        const ambasadorji = row.ambasadorji as Record<string, string> | null;
        return {
          id: row.id as string,
          tip,
          ime: row.ime as string,
          ambasador: ambasadorji?.ime ?? "—",
          ambasadorEmail: ambasadorji?.email ?? null,
          regija: row.regija as string | null,
          status: row.status as string,
          zakaj: row.zakaj as string | null,
          created_at: row.created_at as string,
        };
      });

    const all = [
      ...mapItems(ture ?? [], "tura"),
      ...mapItems(ponudniki ?? [], "ponudnik"),
      ...mapItems(znamenitosti ?? [], "znamenitost"),
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    setItems(all);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function sendEmail(payload: {
    to: string;
    type: "approved" | "revision";
    predlogIme: string;
    predlogTip: string;
    predlogId: string;
    opomba?: string;
  }) {
    try {
      await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // Email ni kritičen — ne blokiramo procesa
    }
  }

  async function handleApprove(item: PredlogItem) {
    setProcessing(item.id);
    const table = item.tip === "tura" ? "predlogi_tur" : item.tip === "ponudnik" ? "predlogi_ponudnikov" : "predlogi_znamenitosti";
    await supabase.from(table).update({ status: "approved" }).eq("id", item.id);

    if (item.ambasadorEmail) {
      await sendEmail({
        to: item.ambasadorEmail,
        type: "approved",
        predlogIme: item.ime,
        predlogTip: item.tip,
        predlogId: item.id,
      });
    }

    await load();
    setProcessing(null);
  }

  async function handleReturn() {
    if (!returnItem) return;
    setProcessing(returnItem.id);
    const table = returnItem.tip === "tura" ? "predlogi_tur" : returnItem.tip === "ponudnik" ? "predlogi_ponudnikov" : "predlogi_znamenitosti";
    await supabase.from(table).update({ status: "revision", admin_opomba: returnMessage }).eq("id", returnItem.id);

    if (returnItem.ambasadorEmail) {
      await sendEmail({
        to: returnItem.ambasadorEmail,
        type: "revision",
        predlogIme: returnItem.ime,
        predlogTip: returnItem.tip,
        predlogId: returnItem.id,
        opomba: returnMessage,
      });
    }

    setReturnItem(null);
    setReturnMessage("");
    await load();
    setProcessing(null);
  }

  async function handleDelete() {
    if (!deleteItem) return;
    setProcessing(deleteItem.id);
    const table = deleteItem.tip === "tura" ? "predlogi_tur" : deleteItem.tip === "ponudnik" ? "predlogi_ponudnikov" : "predlogi_znamenitosti";
    await supabase.from(table).delete().eq("id", deleteItem.id);
    setDeleteItem(null);
    await load();
    setProcessing(null);
  }

  const filtered = items.filter((item) => {
    if (activeFilter === "Objavljeni") return item.status === "approved";
    if (activeFilter === "Vse") return true;
    if (activeFilter === "Ture") return item.tip === "tura" && item.status !== "approved";
    if (activeFilter === "Ponudniki") return item.tip === "ponudnik" && item.status !== "approved";
    if (activeFilter === "Znamenitosti") return item.tip === "znamenitost" && item.status !== "approved";
    return item.status !== "approved";
  });

  const counts = {
    ture: items.filter((i) => i.tip === "tura").length,
    ponudniki: items.filter((i) => i.tip === "ponudnik").length,
    znamenitosti: items.filter((i) => i.tip === "znamenitost").length,
  };

  return (
    <AdminShell active="v-pregled">
      <div className="space-y-8">

        <section className="rounded-[38px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Uredniški pregled</div>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
                Kaj čaka na tvojo odločitev?
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400">
                Tukaj se zbirajo predlogi tur, novi ponudniki in znamenitosti od ambasadorjev.
                Preveri in objavi ali vrni v dopolnitev.
              </p>
            </div>
            <Link href="/admin"
              className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">
              ← Nazaj
            </Link>
          </div>
        </section>

        {/* Statistike */}
        <section className="grid gap-4 md:grid-cols-4">
          {[
            { value: items.length, label: "skupaj v pregledu" },
            { value: counts.ture, label: "predlogi tur" },
            { value: counts.ponudniki, label: "novi ponudniki" },
            { value: counts.znamenitosti, label: "nove znamenitosti" },
          ].map((s) => (
            <div key={s.label} className="flex min-h-[140px] items-center justify-center rounded-[26px] border border-white/10 bg-[#07110b] p-5 text-center">
              <div>
                <div className="text-5xl font-black leading-none text-white">{loading ? "—" : s.value}</div>
                <div className="mt-3 text-sm font-bold text-zinc-500">{s.label}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Lista predlogov */}
        <section className="rounded-[38px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Predlogi</div>
              <h2 className="mt-3 text-3xl font-black text-white">Predlogi, ki čakajo na pregled.</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Vse", "Objavljeni", "Ture", "Ponudniki", "Znamenitosti"].map((f) => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className={`rounded-full border px-4 py-2 text-xs font-bold transition ${activeFilter === f ? "border-[#c58b46]/20 bg-[#c58b46] text-black" : "border-white/10 text-zinc-400 hover:border-white/20"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center text-zinc-500">Nalagam predloge...</div>
          ) : filtered.length === 0 ? (
            <div className="rounded-[22px] border border-dashed border-white/10 py-12 text-center text-zinc-500">
              Ni predlogov za pregled. 🎉
            </div>
          ) : (
            <div className="grid gap-4">
              {filtered.map((item) => (
                <article key={item.id}
                  className="grid gap-5 rounded-[28px] border border-white/10 bg-black/20 p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                  <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-[#c58b46]/20 bg-[#c58b46]/10 px-3 py-2 text-xs font-bold text-[#c58b46]">
                        {tipLabels[item.tip]}
                      </span>
                      <StatusBadge status={item.status} />
                    </div>
                    <h3 className="text-xl font-black text-white">{item.ime}</h3>
                    <div className="mt-2 flex flex-wrap gap-2 text-sm text-zinc-500">
                      <span>{item.ambasador}</span>
                      {item.regija && <><span>·</span><span>{item.regija}</span></>}
                    </div>
                    {item.zakaj && (
                      <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-500 line-clamp-2">{item.zakaj}</p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 md:justify-end">
                    <Link
                      href={`/admin/v-pregled/${item.id}?tip=${item.tip}`}
                      className="rounded-full border border-[#c58b46]/40 px-5 py-3 text-sm font-bold text-[#c58b46] transition hover:bg-[#c58b46]/10">
                      Preglej →
                    </Link>
                    {item.status !== "approved" && (
                      <button
                        onClick={() => handleApprove(item)}
                        disabled={processing === item.id}
                        className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-black text-black transition hover:brightness-110 disabled:opacity-50">
                        {processing === item.id ? "..." : "Objavi"}
                      </button>
                    )}
                    {item.status !== "approved" && (
                      <button
                        onClick={() => { setReturnItem(item); setReturnMessage(""); }}
                        className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-400 transition hover:border-white/20">
                        Vrni v dopolnitev
                      </button>
                    )}
                    <button
                      onClick={() => setDeleteItem(item)}
                      disabled={processing === item.id}
                      className="rounded-full border border-red-500/30 px-5 py-3 text-sm font-bold text-red-400 transition hover:bg-red-500/10 disabled:opacity-50">
                      Izbriši
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-[32px] border border-[#c58b46]/20 bg-[#c58b46]/10 p-6">
          <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Uredniško pravilo</div>
          <h2 className="mt-4 text-2xl font-black text-white">Tura ostane ambasadorjeva.</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-300">
            Pregled pomeni preverjanje kakovosti objave: osnovni podatki, jasnost opisa in vizualna predstavitev.
            Ne gre za odvzem avtorstva, ampak za zagotavljanje kakovosti za obiskovalce platforme.
          </p>
        </section>
      </div>

      {/* Modal: vrni v dopolnitev */}
      {returnItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-[#07110b] p-6 shadow-2xl md:p-8">
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Vrni v dopolnitev</div>
            <h2 className="mt-4 text-3xl font-black text-white">Kaj naj ambasador dopolni?</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Predlog <span className="font-bold text-white">{returnItem.ime}</span> bo poslan nazaj ambasadorju.
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
              <button onClick={() => setReturnItem(null)}
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40">
                Prekliči
              </button>
              <button onClick={handleReturn} disabled={!!processing}
                className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black transition hover:brightness-110 disabled:opacity-50">
                Pošlji ambasadorju
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: brisanje */}
      {deleteItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[32px] border border-red-500/20 bg-[#07110b] p-6 shadow-2xl">
            <div className="text-xs uppercase tracking-[0.35em] text-red-400">Brisanje</div>
            <h2 className="mt-4 text-2xl font-black text-white">Res izbrisati?</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              <span className="font-bold text-white">{deleteItem.ime}</span> bo trajno izbrisan iz baze. Tega ni mogoče razveljaviti.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setDeleteItem(null)}
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 transition hover:border-white/20">
                Prekliči
              </button>
              <button onClick={handleDelete} disabled={!!processing}
                className="rounded-full bg-red-500 px-6 py-3 text-sm font-black text-white transition hover:bg-red-400 disabled:opacity-50">
                {processing ? "Brišem..." : "Da, izbriši"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
