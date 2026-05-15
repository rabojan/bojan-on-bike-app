"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

type AdminShellProps = {
  children: ReactNode;
  active:
    | "pregled"
    | "ture"
    | "dozivetja"
    | "ponudniki"
    | "znamenitosti"
    | "regije"
    | "v-pregled"
    | "ambasadorji"
    | "mediji"
    | "nastavitve";
};

const navItems = [
  { label: "Pregled", href: "/admin", key: "pregled" },
  { label: "Ture", href: "/admin/ture", key: "ture" },
  { label: "Doživetja", href: "/admin/dozivetja", key: "dozivetja" },
  { label: "Ponudniki", href: "/admin/ponudniki", key: "ponudniki" },
  { label: "Znamenitosti", href: "/admin/znamenitosti", key: "znamenitosti" },
  { label: "Regije", href: "/admin/regije", key: "regije" },
  { label: "V pregled", href: "/admin/v-pregled", key: "v-pregled" },
  { label: "Ambasadorji", href: "/admin/ambasadorji", key: "ambasadorji" },
  { label: "Mediji", href: "/admin/mediji", key: "mediji" },
  { label: "Nastavitve", href: "/admin/nastavitve", key: "nastavitve" },
];

export default function AdminShell({ children, active }: AdminShellProps) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("bojan_admin_logged_in");

    if (isLoggedIn !== "true") {
      router.push("/admin-login");
      return;
    }

    setIsReady(true);
  }, [router]);

  function logout() {
    localStorage.removeItem("bojan_admin_logged_in");
    router.push("/");
  }

  if (!isReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07110b] text-white">
        <div className="text-zinc-400">Preverjam dostop...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07110b]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Bojanova pisarna
            </div>
            <div className="mt-1 text-xl font-black">Admin center</div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-zinc-300 md:inline-flex"
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
              className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black"
            >
              Odjava
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 px-5 py-4 lg:hidden">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
                    active === item.key
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

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-[32px] border border-white/10 bg-[#0b1a10] p-4">
            <div className="mb-4 px-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
              Uredniški meni
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    active === item.key
                      ? "bg-[#c58b46] text-black"
                      : "text-zinc-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <section>{children}</section>
      </div>
    </main>
  );
}
