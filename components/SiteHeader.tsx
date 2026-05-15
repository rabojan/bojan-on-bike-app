"use client";

import Link from "next/link";
import { useState } from "react";

type SiteHeaderProps = {
  backHref?: string;
  active?: "ture" | "ponudniki" | "dozivetja";
};

export default function SiteHeader({ backHref, active }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navClass = (item: string) =>
    active === item ? "text-[#c58b46]" : "text-zinc-300 hover:text-white";

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#07110b]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Link href="/" className="text-lg font-bold tracking-wide text-white">
            Bojan on Bike
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
            {backHref && (
              <Link
                href={backHref}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-zinc-300 hover:text-white"
              >
                ← Nazaj
              </Link>
            )}

            <Link href="/ture" className={navClass("ture")}>
              Ture
            </Link>
            <Link href="/dozivetja" className={navClass("dozivetja")}>
              Doživetja
            </Link>
            <Link href="/ponudniki" className={navClass("ponudniki")}>
              Ponudniki
            </Link>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            {backHref && (
              <Link
                href={backHref}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-300"
              >
                ← Nazaj
              </Link>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5"
              aria-label="Odpri meni"
            >
              <span
                className={`absolute h-[2px] w-5 bg-white transition ${
                  menuOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-[2px] w-5 bg-white transition ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-[2px] w-5 bg-white transition ${
                  menuOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#07110b]/95 px-5 pt-24 backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col">
            <Link
              href="/ture"
              onClick={() => setMenuOpen(false)}
              className="border-b border-white/10 py-7 text-4xl font-black text-white"
            >
              Ture
            </Link>

            <Link
              href="/dozivetja"
              onClick={() => setMenuOpen(false)}
              className="border-b border-white/10 py-7 text-4xl font-black text-white"
            >
              Doživetja
            </Link>

            <Link
              href="/ponudniki"
              onClick={() => setMenuOpen(false)}
              className="border-b border-white/10 py-7 text-4xl font-black text-white"
            >
              Ponudniki
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
