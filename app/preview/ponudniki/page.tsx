import Link from "next/link";

export default function PreviewPlaceholderPage() {
  return (
    <main className="min-h-screen bg-[#080f0b] text-white">
      <section className="mx-auto flex min-h-screen max-w-[980px] flex-col justify-center px-6 py-20">
        <div className="text-xs font-black uppercase tracking-[0.34em] text-[#c8924a]">
          Preview
        </div>

        <h1 className="mt-5 font-serif text-6xl font-black italic leading-[0.9] md:text-8xl">
          ponudniki
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
          Ta javni modul je pripravljen za novo premium verzijo. Za zdaj služi
          kot varna povezava znotraj preview sveta.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/preview"
            className="rounded-full border border-[#c8924a]/40 px-7 py-3 text-sm font-black text-[#c8924a]"
          >
            Nazaj na preview
          </Link>

          <Link
            href="/preview/ture/gozdni-flow-nad-mariborom"
            className="rounded-full bg-[#c8924a] px-7 py-3 text-sm font-black text-black"
          >
            Primer ture
          </Link>
        </div>
      </section>
    </main>
  );
}
