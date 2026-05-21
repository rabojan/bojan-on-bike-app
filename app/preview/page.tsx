import Link from "next/link";

export default function PreviewHomePage() {
  return (
    <main className="min-h-screen bg-[#080f0b] text-white">
      <section className="mx-auto flex min-h-screen max-w-[1180px] flex-col justify-center px-6 py-20">
        <div className="text-xs font-black uppercase tracking-[0.34em] text-[#c8924a]">
          Bojan on Bike preview
        </div>

        <h1 className="mt-6 max-w-4xl font-serif text-6xl font-black italic leading-[0.9] tracking-tight md:text-8xl">
          Nova javna izkušnja.
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
          To je varno testno okolje za novo premium javno stran. Obstoječa stran
          ostaja nespremenjena, tukaj pa lahko povežemo naslovnico, ture,
          posamezne ture, ponudnike, znamenitosti in doživetja.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/preview/ture"
            className="rounded-full bg-[#c8924a] px-7 py-3 text-sm font-black text-black"
          >
            Poglej ture
          </Link>

          <Link
            href="/preview/ture/gozdni-flow-nad-mariborom"
            className="rounded-full border border-[#c8924a]/40 px-7 py-3 text-sm font-black text-[#c8924a]"
          >
            Primer posamezne ture
          </Link>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {[
            ["/preview/ture", "Ture"],
            ["/preview/ponudniki", "Ponudniki"],
            ["/preview/znamenitosti", "Znamenitosti"],
            ["/preview/dozivetja", "Doživetja"],
          ].map(([href, title]) => (
            <Link
              key={href}
              href={href}
              className="rounded-[24px] border border-white/10 bg-[#0e1a11] p-6 transition hover:-translate-y-1 hover:border-[#c8924a]/35"
            >
              <div className="font-serif text-2xl font-bold italic">{title}</div>
              <div className="mt-3 text-sm leading-6 text-zinc-500">
                Preview verzija javnega modula.
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
