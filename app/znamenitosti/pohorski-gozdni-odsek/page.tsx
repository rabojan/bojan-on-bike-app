import Link from "next/link";

import SiteHeader from "@/components/SiteHeader";

export default function AttractionDetailPage() {
  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/znamenitosti" active="znamenitosti" />

      <section className="relative flex min-h-[680px] items-end overflow-hidden pt-24">
        <img
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1800&auto=format&fit=crop"
          alt="Pohorski gozdni odsek"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#07110b]/50 to-[#07110b]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 md:px-6 md:pb-24">
          <div className="max-w-4xl">
            <div className="mb-5 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Štajerska · Pohorje
            </div>

            <h1 className="text-5xl font-black leading-none md:text-7xl">
              Pohorski gozdni odsek
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-200 md:text-xl">
              Mirnejši del poti med visokimi drevesi, kjer tura dobi pravi
              gozdni ritem in občutek pobega iz mesta.
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
              <div className="text-sm text-zinc-500">na trasi</div>
              <h2 className="mt-2 text-3xl font-black">
                Gozdni flow nad Mariborom
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-zinc-300">
                Ta gozdni odsek je eden od razlogov, da tura deluje kot pravi
                pobeg v naravo nad mestom.
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
