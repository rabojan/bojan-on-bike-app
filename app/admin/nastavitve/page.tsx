"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { supabase } from "@/lib/supabase";

type Obcutek = { id: string; naziv: string; vrstni_red: number };

export default function AdminNastavitivePage() {
  const [obcutki, setObcutki] = useState<Obcutek[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNaziv, setNewNaziv] = useState("");
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editNaziv, setEditNaziv] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadObcutki() {
    const { data } = await supabase
      .from("obcutki")
      .select("*")
      .order("vrstni_red", { ascending: true });
    setObcutki(data ?? []);
    setLoading(false);
  }

  useEffect(() => { loadObcutki(); }, []);

  async function handleAdd() {
    if (!newNaziv.trim()) return;
    setAdding(true);
    setError("");
    const maxRed = obcutki.length > 0 ? Math.max(...obcutki.map(o => o.vrstni_red)) + 1 : 0;
    const { error: err } = await supabase
      .from("obcutki")
      .insert({ naziv: newNaziv.trim(), vrstni_red: maxRed });
    if (err) { setError("Napaka pri dodajanju."); setAdding(false); return; }
    setNewNaziv("");
    setAdding(false);
    loadObcutki();
  }

  async function handleSaveEdit(id: string) {
    if (!editNaziv.trim()) return;
    setSaving(true);
    setError("");
    const { error: err } = await supabase
      .from("obcutki")
      .update({ naziv: editNaziv.trim() })
      .eq("id", id);
    if (err) { setError("Napaka pri shranjevanju."); setSaving(false); return; }
    setEditId(null);
    setSaving(false);
    loadObcutki();
  }

  async function handleDelete(id: string, naziv: string) {
    if (!confirm(`Izbriši občutek "${naziv}"?`)) return;
    setError("");
    const { error: err } = await supabase.from("obcutki").delete().eq("id", id);
    if (err) { setError("Napaka pri brisanju."); return; }
    loadObcutki();
  }

  async function handleMoveUp(index: number) {
    if (index === 0) return;
    const a = obcutki[index];
    const b = obcutki[index - 1];
    await supabase.from("obcutki").update({ vrstni_red: b.vrstni_red }).eq("id", a.id);
    await supabase.from("obcutki").update({ vrstni_red: a.vrstni_red }).eq("id", b.id);
    loadObcutki();
  }

  async function handleMoveDown(index: number) {
    if (index === obcutki.length - 1) return;
    const a = obcutki[index];
    const b = obcutki[index + 1];
    await supabase.from("obcutki").update({ vrstni_red: b.vrstni_red }).eq("id", a.id);
    await supabase.from("obcutki").update({ vrstni_red: a.vrstni_red }).eq("id", b.id);
    loadObcutki();
  }

  return (
    <AdminShell active="nastavitve">
      <div className="space-y-8">

        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">Admin / Nastavitve</div>
          <h1 className="mt-4 text-4xl font-black text-white">Nastavitve platforme</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
            Upravljaj sezname vrednosti, ki se uporabljajo v obrazcih in filtrih po celotni platformi.
          </p>
        </section>

        {/* ── OBČUTKI ── */}
        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Občutki tur</div>
          <p className="mb-6 text-sm text-zinc-500">
            Oznake, ki opisujejo vzdušje ali tip doživetja ture. Ambasadorji izbirajo med njimi pri vnosu nove ture. Prikazujejo se tudi kot filter na strani Ture.
          </p>

          {error && (
            <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">{error}</div>
          )}

          {/* Seznam */}
          <div className="mb-6 divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/10">
            {loading ? (
              <div className="p-6 text-center text-sm text-zinc-500">Nalagam...</div>
            ) : obcutki.length === 0 ? (
              <div className="p-6 text-center text-sm text-zinc-500">Ni nobenih občutkov. Dodaj prvega spodaj.</div>
            ) : obcutki.map((o, i) => (
              <div key={o.id} className="flex items-center gap-3 bg-[#07110b] px-5 py-4">

                {/* Vrstni red gumbi */}
                <div className="flex flex-col gap-0.5">
                  <button onClick={() => handleMoveUp(i)} disabled={i === 0}
                    className="rounded px-1.5 py-0.5 text-[10px] text-zinc-600 transition hover:text-zinc-300 disabled:opacity-20">▲</button>
                  <button onClick={() => handleMoveDown(i)} disabled={i === obcutki.length - 1}
                    className="rounded px-1.5 py-0.5 text-[10px] text-zinc-600 transition hover:text-zinc-300 disabled:opacity-20">▼</button>
                </div>

                {/* Urejanje ali prikaz */}
                {editId === o.id ? (
                  <input
                    autoFocus
                    value={editNaziv}
                    onChange={(e) => setEditNaziv(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveEdit(o.id);
                      if (e.key === "Escape") setEditId(null);
                    }}
                    className="flex-1 rounded-xl border border-[#c58b46]/50 bg-black/30 px-4 py-2 text-sm text-white outline-none"
                  />
                ) : (
                  <span className="flex-1 text-sm font-semibold text-white">{o.naziv}</span>
                )}

                {/* Akcijski gumbi */}
                <div className="flex shrink-0 gap-2">
                  {editId === o.id ? (
                    <>
                      <button onClick={() => handleSaveEdit(o.id)} disabled={saving}
                        className="rounded-full bg-[#c58b46] px-4 py-2 text-xs font-black text-black transition hover:opacity-90 disabled:opacity-50">
                        {saving ? "..." : "Shrani"}
                      </button>
                      <button onClick={() => setEditId(null)}
                        className="rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-zinc-400 transition hover:border-white/20">
                        Prekliči
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { setEditId(o.id); setEditNaziv(o.naziv); }}
                        className="rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-zinc-400 transition hover:border-[#c58b46]/40 hover:text-[#c58b46]">
                        Uredi
                      </button>
                      <button onClick={() => handleDelete(o.id, o.naziv)}
                        className="rounded-full border border-red-500/20 px-4 py-2 text-xs font-bold text-red-400 transition hover:border-red-500/40 hover:bg-red-500/10">
                        Briši
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Dodaj novega */}
          <div className="flex gap-3">
            <input
              value={newNaziv}
              onChange={(e) => setNewNaziv(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder="npr. Gorski izziv, Sončni zahod, Jutro v naravi..."
              className="flex-1 rounded-2xl border border-white/10 bg-[#07110b] px-5 py-3.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-[#c58b46]/50"
            />
            <button onClick={handleAdd} disabled={adding || !newNaziv.trim()}
              className="rounded-full bg-[#c58b46] px-6 py-3.5 text-sm font-black text-black transition hover:opacity-90 disabled:opacity-50">
              {adding ? "Dodajam..." : "+ Dodaj"}
            </button>
          </div>
        </section>

      </div>
    </AdminShell>
  );
}
