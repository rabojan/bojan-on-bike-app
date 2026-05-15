"use client";

import Link from "next/link";
import { useState } from "react";

type SiteHeaderProps = {
  backHref?: string;
  active?: "ture" | "ponudniki" | "dozivetja";
};

export default function SiteHeader({ backHref, active }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navClass = (item: string) =>
    active === item ? "text-[#c58b46]" : "text-white hover:text-[#c58b46]";

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#07110b]/95 backdrop-blur">
        <div className="mx-auto flex h-24 max-w-6xl items-center justify-between px-5 md:px-6">
          <Link href="/" className="text-xl font-black tracking-tight text-white">
            Bojan on Bike
          </Link>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-black/20 text-4xl leading-none text-white md:hidden"
            aria-label="Odpri meni"
          >
            ≡
          </button>

          <nav className="hidden items-center gap-7 text-sm md:flex">
            {backHref && (
              <Link
                href={backHref}
                className="rounded-full border border-white/10 bg-black/20 px-5 py-3 font-semibold text-zinc-300"
              >
                ← Nazaj
              </Link>
            )}

            <Link href="/ture" className={navClass("ture")}>
              Ture
            </Link>
            <Link href="/#dozivetja" className={navClass("dozivetja")}>
              Doživetja
            </Link>
            <Link href="/ponudniki" className={navClass("ponudniki")}>
              Ponudniki
            </Link>
          </nav>
        </div>
      </header>

      {backHref && (
        <Link
          href={backHref}
          className="fixed left-5 top-28 z-40 rounded-full border border-white/10 bg-black/35 px-5 py-3 text-sm font-semibold text-zinc-200 backdrop-blur md:hidden"
        >
          ← Nazaj
        </Link>
      )}

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] bg-[#07110b] text-white md:hidden">
          <div className="flex h-24 items-center justify-between border-b border-white/10 px-5">
            <Link
              href="/"
              className="text-xl font-black tracking-tight text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Bojan on Bike
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-5xl font-light leading-none text-white"
              aria-label="Zapri meni"
            >
              ×
            </button>
          </div>

          <nav className="px-5 pt-16">
            <Link
              href="/ture"
              className="block border-b border-white/10 py-7 text-5xl font-black"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ture
            </Link>

            <Link
              href="/#dozivetja"
              className="block border-b border-white/10 py-7 text-5xl font-black"
              onClick={() => setMobileMenuOpen(false)}
            >
              Doživetja
            </Link>

            <Link
              href="/ponudniki"
              className="block border-b border-white/10 py-7 text-5xl font-black"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ponudniki
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
