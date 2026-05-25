"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

type AmbassadorShellProps = {
  children: ReactNode;
};

const navItems = [
  { label: "Kotiček", href: "/ambasador/koticek", key: "koticek" },
  { label: "Ture", href: "/ambasador/koticek/ture", key: "ture" },
  { label: "Ponudniki", href: "/ambasador/koticek/ponudniki", key: "ponudniki" },
  { label: "Znamenitosti", href: "/ambasador/koticek/znamenitosti", key: "znamenitosti" },
  { label: "Profil", href: "/ambasador/koticek/profil", key: "profil" },
];

export default function AmbassadorShell({ children }: AmbassadorShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("bojan_ambassador_logged_in");
    if (isLoggedIn !== "true") {
      router.push("/ambasador/prijava");
      return;
    }
    setIsReady(true);
  }, [router]);

  function logout() {
    localStorage.removeItem("bojan_ambassador_logged_in");
    router.push("/ambasador/prijava");
  }

  // Match active nav item — exact for koticek root, startsWith for sub-pages
  const activeKey =
    navItems.find((item) =>
      item.key === "koticek"
        ? pathname === item.href
        : pathname.startsWith(item.href)
    )?.key ?? "koticek";

  if (!isReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07110b] text-white">
        <div className="text-zinc-400">Preverjam dostop...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07110b]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between px-5 py-4">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Bojan on Bike
            </div>
            <div className="mt-1 text-xl font-black">Ambasadorski kotiček</div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:border-white/20 md:inline-flex"
            >
              Odpri stran
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-zinc-300 lg:hidden"
            >
              Meni
            </button>
            <button
              onClick={logout}
              className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black transition hover:opacity-90"
            >
              Odjava
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-white/10 px-5 py-4 lg:hidden">
            <div className="mx-auto grid max-w-xl grid-cols-2 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    activeKey === item.key
                      ? "bg-[#c58b46] text-black"
                      : "border border-white/10 bg-black/20 text-zinc-300"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ── Layout ── */}
      <div className="mx-auto grid max-w-[1480px] gap-7 px-5 py-7 lg:grid-cols-[280px_1fr]">

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-[34px] border border-white/10 bg-[#0b1a10] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
            <div className="mb-4 px-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
              Moj kotiček
            </div>

            <nav className="space-y-1.5">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`block rounded-2xl px-4 py-3.5 text-sm font-bold transition ${
                    activeKey === item.key
                      ? "bg-[#c58b46] text-black shadow-[0_12px_30px_rgba(197,139,70,0.18)]"
                      : "text-zinc-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Ambassador identity card */}
            <div className="mt-6 border-t border-white/10 pt-5">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0b1a10] text-xl">
                  🚴
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-black text-white">Bojan Ratej</div>
                  <div className="text-[11px] text-zinc-500">Ambasador · Štajerska</div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <section className="min-w-0">{children}</section>
      </div>
    </main>
  );
}
