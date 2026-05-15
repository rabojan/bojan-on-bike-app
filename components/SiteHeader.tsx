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
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#07110b]/95 backdrop-blur">
      <div className="mx-auto flex h-24 max-w-6xl items-center justify-between px-5 md:px-6">
        <Link href="/" className="text-xl font-black tracking-tight text-white">
          Bojan on Bike
        </Link>

        <div className="flex items-center gap-3">
          {backHref && (
            <Link
              href={backHref}
              scroll={true}
              className="flex h-14 items-center justify-center rounded-full border border-white/10 bg-black/20 px-5 text-sm font-semibold text-zinc-300"
            >
              ← Nazaj
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/20 text-3xl leading-none text-white md:hidden"
            aria-label="Odpri meni"
          >
            ☰
          </button>

          <nav className="hidden items-center gap-7 text-sm md:flex">
            <Link href="/ture" scroll={true} className={navClass("ture")}>
              Ture
            </Link>
            <Link href="/#dozivetja" scroll={true} className={navClass("dozivetja")}>
              Doživetja
            </Link>
            <Link href="/ponudniki" scroll={true} className={navClass("ponudniki")}>
              Ponudniki
            </Link>
          </nav>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="border-t border-white/10 bg-[#07110b]/98 px-5 py-4 text-sm md:hidden">
          <div className="mx-auto flex max-w-6xl gap-6">
            <Link href="/ture" scroll={true} className={navClass("ture")}>
              Ture
            </Link>
            <Link href="/#dozivetja" scroll={true} className={navClass("dozivetja")}>
              Doživetja
            </Link>
            <Link href="/ponudniki" scroll={true} className={navClass("ponudniki")}>
              Ponudniki
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
