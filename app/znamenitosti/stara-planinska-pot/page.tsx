import Link from "next/link";

import SiteHeader from "@/components/SiteHeader";

export default function AttractionDetailPage() {
  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/znamenitosti" active="znamenitosti" />

      <section className="relative flex min-h-[680px] items-end overflow-hidden pt-24">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1800&auto=format&fit=crop"
          alt="Stara planinska pot"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#07110b]/50 to-[#07110b]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 md:px-6 md:pb-24">
          <div className="max-w-4xl">
            <div className="mb-5 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Štajerska · Pohorje
            </div>

            <h1 className="text-5xl font-black leading-none md:text-7xl">
              Stara planinska pot
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-200 md:text-xl">
              Stara pot z lokalno zgodbo, ki turi doda občutek prostora, časa in
              povezave z ljudmi, ki so te kraje uporabljali pred nami.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-6">
        <div className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:p-10">
          <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
            Ture ob tej znamenitosti
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="text-sm text-zinc-500">700 m od trase</div>
              <h2 className="mt-2 text-3xl font-black">
                Gozdni flow nad Mariborom
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-zinc-300">
                Kratek odmik od glavne trase, ki turi doda zgodbo kraja in
                občutek poti, ki ni nastala včeraj.
              </p>
            </div>

            <Link
              href="/ture/gozdni-flow-nad-mariborom"
              className="inline-flex justify-center rounded-full bg-[#c58b46] px-6 py-4 text-sm font-bold text-black"
            >
              Oglej si turo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
