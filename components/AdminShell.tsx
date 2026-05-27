"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type AdminShellProps = {
  children: ReactNode;
  active:
    | "pregled"
    | "v-pregled"
    | "ture"
    | "ambasadorji"
    | "ponudniki"
    | "znamenitosti"
    | "dozivetja"
    | "regije"
    | "mediji"
    | "nastavitve";
};

const navItems = [
  { label: "Pregled", href: "/admin", key: "pregled" },
  { label: "V pregled", href: "/admin/v-pregled", key: "v-pregled" },
  { label: "Ture", href: "/admin/ture", key: "ture" },
  { label: "Ambasadorji", href: "/admin/ambasadorji", key: "ambasadorji" },
  { label: "Ponudniki", href: "/admin/ponudniki", key: "ponudniki" },
  { label: "Znamenitosti", href: "/admin/znamenitosti", key: "znamenitosti" },
  { label: "Doživetja", href: "/admin/dozivetja", key: "dozivetja" },
  { label: "Regije", href: "/admin/regije", key: "regije" },
  { label: "Mediji", href: "/admin/mediji", key: "mediji" },
  { label: "Nastavitve", href: "/admin/nastavitve", key: "nastavitve" },
];

export default function AdminShell({ children, active }: AdminShellProps) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/admin-login");
        return;
      }

      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      if (session.user.email !== adminEmail) {
        supabase.auth.signOut();
        router.push("/admin-login");
        return;
      }

      setIsReady(true);
    });
  }, [router]);

  async function logout() {
    await supabase.auth.signOut();
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
        <div className="mx-auto flex max-w-[1480px] items-center justify-between px-5 py-4">
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
                      ? "bg-[#c58b46] text-black shadow-[0_12px_30px_rgba(197,139,70,0.18)]"
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

      <div className="mx-auto grid max-w-[1480px] gap-7 px-5 py-7 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-[34px] border border-white/10 bg-[#0b1a10] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
            <div className="mb-4 px-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
              Glavna navigacija
            </div>

            <nav className="space-y-2.5">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`block rounded-2xl px-4 py-3.5 text-sm font-bold transition ${
                    active === item.key
                      ? "bg-[#c58b46] text-black shadow-[0_12px_30px_rgba(197,139,70,0.18)]"
                      : "text-zinc-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <section className="min-w-0">{children}</section>
      </div>
    </main>
  );
}
