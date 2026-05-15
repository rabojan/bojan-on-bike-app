"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminEntry() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <Link
      href="/admin-login"
      className="fixed bottom-4 right-4 z-40 rounded-full border border-white/10 bg-[#07110b]/80 px-4 py-2 text-xs font-semibold text-zinc-400 shadow-xl backdrop-blur transition hover:border-[#c58b46]/40 hover:text-[#c58b46]"
    >
      ⚙ Admin
    </Link>
  );
}
