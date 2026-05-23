import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export default function PredlagajTuroPage() {
  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader />

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
              Skupnost lokalnih kolesarjev
            </div>

            <h1 className="mt-6 max-w-4xl font-serif text-5xl font-black italic leading-[0.92] tracking-[-0.045em] text-white md:text-7xl">
              Poznaš pot, ki si zasluži mesto med izbranimi turami?
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-9 text-zinc-400">
              Predlagaj traso, ki jo poznaš, si jo prevozil ali bi jo priporočil
              drugim. Pomembni so GPX, tvoj lokalni pogled in občutek poti.
              Iz tega lahko skupaj ustvarimo kolesarsko doživetje, ki nosi tudi
              tvoj podpis.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/admin/predlog-ture/prvic"
                className="rounded-full bg-[#c58b46] px-7 py-4 text-sm font-black text-black"
              >
                Predlagaj svojo turo
              </Link>

              <Link
                href="/admin-login"
                className="rounded-full border border-white/10 px-7 py-4 text-sm font-bold text-zinc-300"
              >
                Prijava v moj kotiček
              </Link>
            </div>
          </div>

          <div className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
              Kaj potrebuješ?
            </div>

            <div className="mt-6 space-y-4">
              {[
                {
                  title: "GPX trase",
                  text: "Brez GPX datoteke predloga ture ni mogoče poslati. Trasa je osnova zemljevida, regije in predlogov ob poti.",
                },
                {
                  title: "Osnovni podatki",
                  text: "Ime ture, regija, dolžina, višinski metri, težavnost in kratek opis občutka ture.",
                },
                {
                  title: "Tvoj lokalni pogled",
                  text: "Zakaj je tura vredna? Komu jo priporočaš? Na kaj naj bo kolesar pozoren?",
                },
                {
                  title: "Utrinki s poti",
                  text: "Dodaš lahko fotografije in kratke naslove, ki pomagajo pokazati značaj ture.",
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-white/10 bg-black/20 p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c58b46] text-sm font-black text-black">
                      {index + 1}
                    </div>

                    <div>
                      <h2 className="font-serif text-lg font-black italic text-white">{item.title}</h2>
                      <p className="mt-2 text-sm leading-7 text-zinc-400">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b1a10] px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-[#c58b46]">
              01
            </div>
            <h3 className="mt-4 font-serif text-xl font-black italic text-white">
              Tura ostane povezana s teboj
            </h3>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Ob objavi je jasno, kdo je turo predlagal ali pomagal ustvariti.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-[#c58b46]">
              02
            </div>
            <h3 className="mt-4 font-serif text-xl font-black italic text-white">
              Pred objavo preverimo osnovo
            </h3>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Preverimo, da ima tura delujoč GPX, jasno predstavitev in vse
              potrebne podatke za kolesarje.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-[#c58b46]">
              03
            </div>
            <h3 className="mt-4 font-serif text-xl font-black italic text-white">
              Vsaka objavljena tura šteje
            </h3>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Objavljene ture se štejejo v tvoj ambasadorski profil in napredek
              do TOP ambasadorja regije.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-[36px] border border-[#c58b46]/20 bg-[#c58b46]/10 p-8 text-center">
          <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
            Začni
          </div>

          <h2 className="mt-4 font-serif text-3xl font-black italic tracking-tight text-white md:text-4xl">
            Imaš GPX in dobro traso?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-zinc-300">
            Ustvari ambasadorski profil ali se prijavi v svoj kotiček in pošlji
            predlog ture.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/admin/predlog-ture/prvic"
              className="rounded-full bg-[#c58b46] px-7 py-4 text-sm font-black text-black"
            >
              Začni predlog ture
            </Link>

            <Link
              href="/admin-login"
              className="rounded-full border border-white/10 px-7 py-4 text-sm font-bold text-zinc-300"
            >
              Prijava v moj kotiček
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
