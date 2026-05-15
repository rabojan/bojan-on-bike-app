import AdminShell from "@/components/AdminShell";

export default function AdminPlaceholderPage() {
  return (
    <AdminShell active="znamenitosti">
      <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-8">
        <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
          Admin / Znamenitosti
        </div>

        <h1 className="mt-4 text-4xl font-black">Znamenitosti</h1>

        <p className="mt-6 max-w-3xl leading-8 text-zinc-400">
          Tukaj boš dodajal razglede, naravne točke, zgodovinske lokacije, kulturo in Wikipedia povezave.
        </p>

        <div className="mt-8 rounded-[28px] border border-white/10 bg-black/20 p-6">
          <div className="text-2xl font-black">Naslednji korak</div>
          <p className="mt-4 leading-8 text-zinc-400">
            Ta modul je pripravljen kot del admin arhitekture. Ko pride na vrsto,
            dodava seznam obstoječih vsebin, gumbe za urejanje in obrazec za
            dodajanje nove vsebine.
          </p>
        </div>
      </section>
    </AdminShell>
  );
}
