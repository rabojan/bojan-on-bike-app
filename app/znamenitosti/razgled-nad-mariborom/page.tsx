import Link from "next/link";

import SiteHeader from "@/components/SiteHeader";

export default function AttractionDetailPage() {
  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/znamenitosti" active="znamenitosti" />

      <section className="relative flex min-h-[680px] items-end overflow-hidden pt-24">
        <img
          src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1800&auto=format&fit=crop"
          alt="Razgled nad Mariborom"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#07110b]/50 to-[#07110b]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 md:px-6 md:pb-24">
          <div className="max-w-4xl">
            <div className="mb-5 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Štajerska · Pohorje
            </div>

            <h1 className="text-5xl font-black leading-none md:text-7xl">
              Razgled nad Mariborom
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-200 md:text-xl">
              Kratek postanek nad mestom, kjer se odpre pogled proti Mariboru,
              Dravski dolini in pohorskim gozdovom.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {["Razgled", "Foto točka", "Narava"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-zinc-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-[1fr_0.75fr] md:px-6">
        <div className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:p-10">
          <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
            Zakaj se ustaviti
          </div>

          <h2 className="mt-5 text-4xl font-black">
            Pogled, ki turi doda občutek prostora.
          </h2>

          <p className="mt-6 text-lg leading-9 text-zinc-300">
            Ta točka ni samo postanek za fotografijo. Je trenutek, ko se tura
            odpre: mesto ostane spodaj, gozd za tabo dobi globino, pot naprej pa
            postane del večje zgodbe. Takšne točke so razlog, da tura ni samo
            številka na zemljevidu.
          </p>
        </div>

        <aside className="space-y-5">
          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Regija
            </div>
            <div className="mt-2 text-2xl font-black">Štajerska</div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Območje
            </div>
            <div className="mt-2 text-2xl font-black">Pohorje</div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Oddaljenost od trase
            </div>
            <div className="mt-2 text-2xl font-black">200 m</div>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-6 md:pb-28">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
            Ture ob tej znamenitosti
          </div>
          <h2 className="mt-4 text-4xl font-black">
            Poti, ki peljejo mimo.
          </h2>
        </div>

        <article className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="text-sm text-zinc-500">200 m od trase</div>
              <h3 className="mt-2 text-3xl font-black">
                Gozdni flow nad Mariborom
              </h3>
              <p className="mt-4 max-w-2xl leading-8 text-zinc-300">
                Tura skozi pohorske gozdove, razglede in spuste, kjer je razgled
                nad Mariborom eden od ključnih poudarkov poti.
              </p>
            </div>

            <Link
              href="/ture/gozdni-flow-nad-mariborom"
              className="inline-flex justify-center rounded-full bg-[#c58b46] px-6 py-4 text-sm font-bold text-black"
            >
              Oglej si turo
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
