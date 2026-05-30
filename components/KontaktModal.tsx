"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function KontaktModal({ open, onClose }: Props) {
  const [ime, setIme] = useState("");
  const [email, setEmail] = useState("");
  const [sporocilo, setSporocilo] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Zapri z Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Focus na prvi input ob odprtju
  useEffect(() => {
    if (open) {
      setTimeout(() => firstInputRef.current?.focus(), 80);
    }
  }, [open]);

  // Prepreči scroll ozadja
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ime.trim() || !email.trim() || !sporocilo.trim()) {
      setError("Prosim izpolni vsa polja.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "kontakt", ime, email, sporocilo }),
      });
      if (!res.ok) throw new Error("Napaka");
      setSent(true);
    } catch {
      setError("Napaka pri pošiljanju. Poskusi znova.");
    }
    setSending(false);
  }

  function handleReset() {
    setIme(""); setEmail(""); setSporocilo("");
    setSent(false); setError("");
    onClose();
  }

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Ozadje */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-[32px] border border-white/10 bg-[#07110b] p-8 shadow-2xl">

        {/* Zapri */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-zinc-500 transition hover:border-white/20 hover:text-white"
        >
          ×
        </button>

        {sent ? (
          /* ── Uspeh ── */
          <div className="py-6 text-center">
            <div className="mb-5 text-5xl">🚵</div>
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Sporočilo oddano</div>
            <h2 className="mt-4 font-serif text-3xl font-black italic leading-tight text-white">
              Na poti je. Kmalu se oglasim.
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Hvala za sporočilo, {ime.split(" ")[0]}. Odgovorim čim prej.
            </p>
            <button
              onClick={handleReset}
              className="mt-8 rounded-full bg-[#c58b46] px-8 py-3.5 text-sm font-black text-black transition hover:opacity-90"
            >
              Zapri
            </button>
          </div>
        ) : (
          /* ── Obrazec ── */
          <form onSubmit={handleSubmit} noValidate>
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
              Bojan on Bike
            </div>
            <h2 className="mt-4 font-serif text-3xl font-black italic leading-tight text-white">
              Vsaka dobra tura se začne s pogovorom.
            </h2>

            <div className="mt-8 space-y-5">
              <label className="block space-y-2">
                <span className="text-[11px] font-black uppercase tracking-[0.22em] text-zinc-500">
                  Ojla, kdo si?
                </span>
                <input
                  ref={firstInputRef}
                  type="text"
                  value={ime}
                  onChange={(e) => setIme(e.target.value)}
                  placeholder="Tvoje ime"
                  className="w-full rounded-2xl border border-white/10 bg-[#0b1a10] px-5 py-3.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-[#c58b46]/60"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-[11px] font-black uppercase tracking-[0.22em] text-zinc-500">
                  Na kateri mail ti lahko odpišem?
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tvoj@email.si"
                  className="w-full rounded-2xl border border-white/10 bg-[#0b1a10] px-5 py-3.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-[#c58b46]/60"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-[11px] font-black uppercase tracking-[0.22em] text-zinc-500">
                  Kaj bo dobrega?
                </span>
                <textarea
                  rows={4}
                  value={sporocilo}
                  onChange={(e) => setSporocilo(e.target.value)}
                  placeholder="Napiši kar imaš na srcu..."
                  className="w-full rounded-2xl border border-white/10 bg-[#0b1a10] px-5 py-3.5 text-sm leading-7 text-white outline-none placeholder:text-zinc-600 focus:border-[#c58b46]/60"
                />
              </label>
            </div>

            {error && (
              <p className="mt-4 text-sm text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="mt-6 w-full rounded-full bg-[#c58b46] py-4 text-sm font-black text-black transition hover:opacity-90 disabled:opacity-50"
            >
              {sending ? "Pošiljam..." : "Poženi →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
