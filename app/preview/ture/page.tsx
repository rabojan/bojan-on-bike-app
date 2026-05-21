import Link from "next/link";

export default function PreviewTurePage() {
  return (
    <main className="min-h-screen bg-[#080f0b] text-white">
      <header className="border-b border-white/10 bg-[#080f0b]/90 px-6 py-5 backdrop-blur">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between">
          <Link href="/preview" className="font-serif text-lg font-black">
            Bojan <span className="font-normal italic text-[#edd098]">on Bike</span>
          </Link>

          <Link
            href="/preview/ture/gozdni-flow-nad-mariborom"
            className="rounded-full border border-[#c8924a]/40 px-5 py-2 text-xs font-black text-[#c8924a]"
          >
            Primer ture
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="text-xs font-black uppercase tracking-[0.34em] text-[#c8924a]">
          Ture
        </div>

        <h1 className="mt-5 max-w-3xl font-serif text-6xl font-black italic leading-[0.9] md:text-8xl">
          Poišči turo za tvoj dan.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
          Naslednji korak bo nova premium predstavitev seznama tur: kartice z
          mini višinskim profilom, podlago, občutkom dneva, ambasadorjem in
          jasnim CTA.
        </p>

        <div className="mt-10">
          <Link
            href="/preview/ture/gozdni-flow-nad-mariborom"
            className="inline-flex rounded-full bg-[#c8924a] px-7 py-3 text-sm font-black text-black"
          >
            Odpri Gozdni flow nad Mariborom
          </Link>
        </div>
      </section>
    </main>
  );
}
