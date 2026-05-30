"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import PageHero from "@/components/PageHero";
import KontaktModal from "@/components/KontaktModal";
import { supabase } from "@/lib/supabase";

type TuraCard = {
  id: string;
  ime: string;
  regija: string;
  obmocje: string | null;
  km: number | null;
  visinska_razlika: number | null;
  tezavnost: string | null;
  tipi: string[] | null;
  hero_image: string | null;
  opis: string | null;
};

type DozivetjeCard = {
  id: string;
  title: string;
  regija: string;
  obmocje: string | null;
  tip: string[] | null;
  hero_image: string | null;
  tagline: string | null;
};

const regions = [
  "Štajerska",
  "Koroška",
  "Gorenjska",
  "Primorska",
  "Notranjska",
  "Dolenjska",
  "Prekmurje",
];

const howItWorks = [
  {
    step: "01",
    title: "Izberi pokrajino",
    text: "Začni pri širšem prostoru: Štajerska, Primorska, Koroška, Gorenjska ali druga slovenska pokrajina.",
  },
  {
    step: "02",
    title: "Odkrij turo",
    text: "Poglej občutek ture, dolžino, višince, podlago, vreme in e-bike doseg.",
  },
  {
    step: "03",
    title: "Sestavi doživetje",
    text: "Turi dodaš postanke, razglede, kulinariko, nastanitve in lokalne ponudnike ob poti.",
  },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace("š", "s")
    .replace("č", "c")
    .replace("ž", "z")
    .replace("ć", "c")
    .replace("đ", "d")
    .replace(/\s+/g, "-");
}

export default function Home() {
  const [ture, setTure] = useState<TuraCard[]>([]);
  const [dozivetja, setDozivetja] = useState<DozivetjeCard[]>([]);
  const [tureCount, setTureCount] = useState<number | null>(null);
  const [ponudnikiCount, setPonudnikiCount] = useState<number | null>(null);
  const [znamenitostiCount, setZnamenitostiCount] = useState<number | null>(null);
  const [kontaktOpen, setKontaktOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const [tureRes, ponudnikiRes, znamenitostiRes, dozivetjaRes] = await Promise.all([
        supabase
          .from("predlogi_tur")
          .select("id, ime, regija, obmocje, km, visinska_razlika, tezavnost, tipi, hero_image, opis")
          .eq("status", "approved")
          .order("created_at", { ascending: false })
          .limit(3),
        supabase
          .from("predlogi_ponudnikov")
          .select("id", { count: "exact", head: true })
          .eq("status", "approved"),
        supabase
          .from("predlogi_znamenitosti")
          .select("id", { count: "exact", head: true })
          .eq("status", "approved"),
        supabase
          .from("dozivetja")
          .select("id, title, regija, obmocje, tip, hero_image, tagline")
          .eq("status", "published")
          .order("created_at", { ascending: false })
          .limit(3),
      ]);

      const tureData = tureRes.data ?? [];
      setTure(tureData);
      setTureCount(tureData.length > 0 ? (tureRes.count ?? tureData.length) : 0);
      setPonudnikiCount(ponudnikiRes.count ?? 0);
      setZnamenitostiCount(znamenitostiRes.count ?? 0);
      setDozivetja(dozivetjaRes.data ?? []);
    }
    load();
  }, []);

  const zadnjaTura = ture[0] ?? null;
  const top3 = ture.slice(0, 3);

  const stats = [
    {
      value: tureCount !== null ? `${tureCount}` : "—",
      line1: "kolesarskih",
      line2: "tur",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 sm:h-7 sm:w-7">
          <circle cx="5.5" cy="17.5" r="3.5"/>
          <circle cx="18.5" cy="17.5" r="3.5"/>
          <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5L8.5 9H5"/>
          <path d="M15 6l2 5.5H9l2.5-3.5"/>
          <path d="M18.5 17.5L15 6"/>
        </svg>
      ),
    },
    {
      value: "7",
      line1: "slovenskih",
      line2: "pokrajin",
      icon: (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/si-icon.svg" alt="" aria-hidden="true" className="h-6 w-auto sm:h-7 opacity-40" />
      ),
    },
    {
      value: ponudnikiCount !== null && znamenitostiCount !== null
        ? `${ponudnikiCount + znamenitostiCount}`
        : "—",
      line1: "postankov",
      line2: "in točk",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 sm:h-7 sm:w-7">
          <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z"/>
          <path d="M9 21V12h6v9"/>
        </svg>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader />

      <PageHero
        eyebrow="Slovenija · kolesarski dnevi · narava · lokalni postanki"
        title={
          <>
            Doživi Slovenijo
            <br className="hidden md:block" />
            <span className="md:hidden"> </span>
            skozi kolo.
          </>
        }
        description="Kolesarske ture, razgledi, postanki in ideje za pare, družine, e-kolesarje in vse, ki radi odkrivajo kraje na dveh kolesih."
        image="/home-hero-desktop.png"
        mobileImage="/home-hero-mobile.png"
        imageAlt="Kolesarsko doživetje v naravi"
        ctaHref="/ture"
        ctaLabel="Poišči svojo turo"
        imagePosition="center 12%"
      />

      {/* ── STATS ── */}
      <section className="border-y border-white/10 bg-[#0b1a10] px-5 py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-2 sm:gap-4">
          {stats.map((stat) => (
            <div key={stat.line1} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#07110b] px-3 py-4 sm:gap-4 sm:px-6 sm:py-5">
              <div className="hidden shrink-0 text-[#c58b46]/40 sm:block">
                {stat.icon}
              </div>
              <div className="text-3xl font-black leading-none text-[#f4d7ad] sm:text-4xl">
                {stat.value}
              </div>
              <div className="flex flex-col text-[10px] leading-tight text-zinc-500 sm:text-xs">
                <span>{stat.line1}</span>
                <span>{stat.line2}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DOŽIVETJA — CTA ── */}
      <section id="dozivetja" className="px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
                Doživetja ob poti
              </p>
              <h2 className="max-w-3xl font-serif text-4xl font-black italic tracking-tight md:text-5xl">
                Cel kolesarski dan, ne samo tura.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">
                Tura je začetek. Doživetje je vse skupaj: pot, razgled, postanek in občutek pokrajine.
              </p>
            </div>
            <Link
              href="/dozivetja"
              className="w-fit shrink-0 rounded-full border border-white/15 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
            >
              Vsa doživetja
            </Link>
          </div>

          {dozivetja.length > 0 ? (
            <div className="grid items-stretch gap-6 md:grid-cols-3">
              {dozivetja.map((d) => (
                <article
                  key={d.id}
                  className="group flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1a10] transition hover:-translate-y-1 hover:border-[#c58b46]/40"
                >
                  <div className="relative h-52 overflow-hidden">
                    {d.hero_image ? (
                      <img
                        src={d.hero_image}
                        alt={d.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[#0b1a10]">
                        <span className="text-5xl opacity-10">✨</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a10]/90 to-transparent" />
                    {d.tip && d.tip.length > 0 && (
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full border border-[#c58b46]/40 bg-black/50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-[#f4d7ad] backdrop-blur">
                          {d.tip[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2 text-xs text-zinc-500">
                      {d.regija}{d.obmocje ? ` · ${d.obmocje}` : ""}
                    </div>
                    <h3 className="mb-3 font-serif text-2xl font-black italic leading-tight">
                      {d.title}
                    </h3>
                    {d.tagline && (
                      <p className="flex-1 text-sm leading-7 text-zinc-400 line-clamp-2">
                        {d.tagline}
                      </p>
                    )}
                    <Link
                      href={`/dozivetja/${d.id}`}
                      className="mt-5 block rounded-full border border-[#c58b46]/40 px-5 py-3 text-center text-sm font-black text-[#f4d7ad] transition hover:bg-[#c58b46] hover:text-black"
                    >
                      Oglej si dan
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="overflow-hidden rounded-[2rem] border border-[#c58b46]/20 bg-[#c58b46]/5 p-10 md:p-14">
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Prihaja kmalu</p>
              <h3 className="mb-5 font-serif text-3xl font-black italic leading-tight md:text-4xl">
                Kurirana kolesarska doživetja.
              </h3>
              <p className="mb-8 max-w-2xl text-base leading-8 text-zinc-400">
                Vsako doživetje bo vključevalo turo, postanke pri lokalnih ponudnikih in znamenitosti ob poti, vse v enem.
              </p>
              <Link
                href="/ture"
                className="inline-flex rounded-full bg-[#c58b46] px-8 py-4 text-sm font-black text-black transition hover:bg-[#d9a35d]"
              >
                Medtem si oglej ture →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── ZADNJA DODANA TURA ── */}
      {zadnjaTura && (
        <section className="border-t border-white/10 px-5 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
                Zadnja dodana tura
              </p>
              <h2 className="max-w-3xl font-serif text-4xl font-black italic tracking-tight md:text-5xl">
                Sveža ideja za naslednji kolesarski dan.
              </h2>
            </div>

            <article className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1a10] md:grid-cols-[1.15fr_0.85fr]">
              <div className="relative h-72 overflow-hidden md:min-h-[360px] md:h-auto">
                {zadnjaTura.hero_image ? (
                  <img
                    src={zadnjaTura.hero_image}
                    alt={zadnjaTura.ime}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[#0b1a10]">
                    <span className="text-7xl opacity-10">🚵</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07110b]/80 via-transparent to-transparent" />
              </div>

              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="mb-6 flex flex-wrap gap-3 text-sm">
                  <span className="rounded-full border border-white/10 px-4 py-2 text-zinc-300">
                    {zadnjaTura.regija}
                  </span>
                  {zadnjaTura.obmocje && (
                    <span className="rounded-full border border-white/10 px-4 py-2 text-zinc-300">
                      {zadnjaTura.obmocje}
                    </span>
                  )}
                  {zadnjaTura.tipi?.map((t) => (
                    <span key={t} className="rounded-full border border-[#c58b46]/30 bg-[#c58b46]/10 px-4 py-2 text-[#f4d7ad]">
                      {t}
                    </span>
                  ))}
                </div>

                <h3 className="mb-5 font-serif text-3xl font-black italic leading-tight sm:text-4xl">
                  {zadnjaTura.ime}
                </h3>

                {zadnjaTura.opis && (
                  <p className="mb-7 text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8 line-clamp-3">
                    {zadnjaTura.opis}
                  </p>
                )}

                <div className="mb-8 grid grid-cols-3 gap-2 sm:gap-3">
                  {zadnjaTura.km != null && (
                    <div className="rounded-2xl border border-white/10 bg-[#07110b] p-3 sm:p-4">
                      <div className="font-bold">{zadnjaTura.km} km</div>
                      <div className="text-xs text-zinc-500">dolžina</div>
                    </div>
                  )}
                  {zadnjaTura.visinska_razlika != null && (
                    <div className="rounded-2xl border border-white/10 bg-[#07110b] p-3 sm:p-4">
                      <div className="font-bold">{zadnjaTura.visinska_razlika} vm</div>
                      <div className="text-xs text-zinc-500">višinci</div>
                    </div>
                  )}
                  {zadnjaTura.tezavnost && (
                    <div className="rounded-2xl border border-white/10 bg-[#07110b] p-3 sm:p-4">
                      <div className="font-bold">{zadnjaTura.tezavnost}</div>
                      <div className="text-xs text-zinc-500">težavnost</div>
                    </div>
                  )}
                </div>

                <Link
                  href={`/ture/${zadnjaTura.id}`}
                  className="rounded-full bg-[#c58b46] px-8 py-4 text-center text-sm font-black text-black transition hover:bg-[#d9a35d]"
                >
                  Oglej si turo
                </Link>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* ── TOP 3 TURE ── */}
      {top3.length > 0 && (
        <section className="border-y border-white/10 bg-[#0b1a10] px-5 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
                  Sveže dodane ture
                </p>
                <h2 className="max-w-3xl font-serif text-4xl font-black italic tracking-tight md:text-5xl">
                  Najnovejše ture na platformi.
                </h2>
              </div>
              <Link
                href="/ture"
                className="w-fit rounded-full border border-white/15 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
              >
                Vse ture
              </Link>
            </div>

            <div className="grid items-stretch gap-6 md:grid-cols-3">
              {top3.map((tura, i) => (
                <article
                  key={tura.id}
                  className="group flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#07110b] transition hover:-translate-y-1 hover:border-[#c58b46]/40"
                >
                  <div className="relative h-48 overflow-hidden sm:h-56">
                    {tura.hero_image ? (
                      <img
                        src={tura.hero_image}
                        alt={tura.ime}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[#0b1a10]">
                        <span className="text-5xl opacity-10">🚵</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07110b]/90 to-transparent" />
                    <div className="absolute left-5 top-5 rounded-full bg-[#c58b46] px-4 py-2 text-sm font-black text-black">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 text-sm text-zinc-500">
                      {tura.regija}{tura.obmocje ? ` • ${tura.obmocje}` : ""}
                    </div>
                    <h3 className="mb-5 font-serif text-2xl font-black italic leading-tight">
                      {tura.ime}
                    </h3>
                    {tura.tipi && tura.tipi.length > 0 && (
                      <div className="mb-5 flex flex-wrap gap-2 text-xs">
                        {tura.tipi.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-[#c58b46]/35 bg-black/25 px-3 py-1.5 font-black uppercase tracking-[0.16em] text-[#f4d7ad]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mb-6 flex flex-wrap gap-3 text-sm">
                      {tura.km != null && (
                        <span className="rounded-full border border-white/10 px-3 py-2">{tura.km} km</span>
                      )}
                      {tura.visinska_razlika != null && (
                        <span className="rounded-full border border-white/10 px-3 py-2">{tura.visinska_razlika} vm</span>
                      )}
                      {tura.tezavnost && (
                        <span className="rounded-full border border-white/10 px-3 py-2">{tura.tezavnost}</span>
                      )}
                    </div>
                    <Link
                      href={`/ture/${tura.id}`}
                      className="mt-auto block w-full rounded-full border border-[#c58b46]/40 px-5 py-3 text-center text-sm font-black transition hover:bg-[#c58b46] hover:text-black"
                    >
                      Oglej si turo
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ODKRIJ POT NA SVOJ NAČIN ── */}
      <section className="border-y border-white/10 bg-[#07110b] px-5 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-5 md:grid-cols-[1fr_0.8fr] md:items-end">
            <div>
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
                Odkrij pot na svoj način
              </p>
              <h2 className="max-w-3xl font-serif text-4xl font-black italic tracking-tight md:text-5xl">
                Ne začne vsak z isto idejo.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-zinc-400">
              Nekdo najprej išče lepo turo. Drugi dobro kosilo. Tretji razgled,
              miren gozd ali idejo za družinski dan. Bojan on Bike poveže vse v
              en kolesarski dan.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Link
              href="/ture"
              className="group flex h-full min-h-[360px] flex-col rounded-[2rem] border border-white/10 bg-[#0b1a10] p-8 transition hover:-translate-y-1 hover:border-[#c58b46]/50"
            >
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c58b46] text-black">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="6" cy="17" r="3" />
                  <circle cx="18" cy="17" r="3" />
                  <path d="M8.5 17h4l2-6h-4l-2 6Z" />
                  <path d="M10.5 11 9 8h3" />
                  <path d="M14.5 11 17 17" />
                </svg>
              </div>
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Ture</p>
              <h3 className="font-serif text-3xl font-black italic leading-tight">Začni s turo.</h3>
              <p className="mt-5 leading-8 text-zinc-400">Poišči turo po pokrajini, zahtevnosti in občutku, ki ga želiš doživeti na kolesu.</p>
              <div className="mt-auto pt-8 text-sm font-bold text-white">Razišči ture →</div>
            </Link>

            <Link
              href="/ponudniki"
              className="group flex h-full min-h-[360px] flex-col rounded-[2rem] border border-white/10 bg-[#0b1a10] p-8 transition hover:-translate-y-1 hover:border-[#c58b46]/50"
            >
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c58b46] text-black">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 2v9" />
                  <path d="M4 2v5c0 2 1.5 4 3 4s3-2 3-4V2" />
                  <path d="M7 11v11" />
                  <path d="M17 2v20" />
                  <path d="M17 2c2 2 3 4.5 3 8h-3" />
                </svg>
              </div>
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Ponudniki</p>
              <h3 className="font-serif text-3xl font-black italic leading-tight">Najdi postanek.</h3>
              <p className="mt-5 leading-8 text-zinc-400">Kulinarika, vino, prenočišča, lokalni produkti in bike-friendly točke, ki turi dodajo pravi zaključek.</p>
              <div className="mt-auto pt-8 text-sm font-bold text-white">Odkrij ponudnike →</div>
            </Link>

            <Link
              href="/znamenitosti"
              className="group flex h-full min-h-[360px] flex-col rounded-[2rem] border border-white/10 bg-[#0b1a10] p-8 transition hover:-translate-y-1 hover:border-[#c58b46]/50"
            >
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c58b46] text-black">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 21s7-5.2 7-12a7 7 0 0 0-14 0c0 6.8 7 12 7 12Z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">Znamenitosti</p>
              <h3 className="font-serif text-3xl font-black italic leading-tight">Začni z razlogom.</h3>
              <p className="mt-5 leading-8 text-zinc-400">Razgledi, slapovi, naravne posebnosti, zgodovinske točke in lokalne zgodbe, zaradi katerih izbereš pot.</p>
              <div className="mt-auto pt-8 text-sm font-bold text-white">Odkrij znamenitosti →</div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── KAKO DELUJE ── */}
      <section className="border-b border-white/10 bg-[#07110b] px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
              Kako deluje
            </p>
            <h2 className="font-serif text-4xl font-black italic md:text-5xl">
              Od ideje do popolnega kolesarskega dne.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {howItWorks.map((item) => (
              <div key={item.step} className="rounded-[2rem] border border-white/10 bg-[#0b1a10] p-8">
                <div className="mb-8 text-sm font-semibold text-[#c58b46]">{item.step}</div>
                <h3 className="mb-4 font-serif text-2xl font-black italic">{item.title}</h3>
                <p className="leading-7 text-zinc-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POKRAJINE ── */}
      <section id="pokrajine" className="border-b border-white/10 bg-[#0b1a10] px-5 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
              Pokrajine
            </p>
            <h2 className="mb-6 font-serif text-4xl font-black italic md:text-5xl">
              Vsaka pokrajina ima svoj ritem.
            </h2>
            <p className="text-lg leading-8 text-zinc-400">
              Klik na pokrajino te odpelje do tur iz tega dela Slovenije, kjer
              lahko hitro najdeš idejo za svoj naslednji kolesarski dan.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {regions.map((region) => (
              <Link
                key={region}
                href={`/ture?pokrajina=${slugify(region)}`}
                className="rounded-2xl border border-white/10 bg-[#07110b] p-5 text-lg font-semibold transition hover:-translate-y-1 hover:border-[#c58b46]/40 hover:bg-[#102417]"
              >
                {region}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── AMBASADOR CTA ── */}
      <section className="border-b border-white/10 bg-[#07110b] px-6 py-16">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-[#c58b46]/20 bg-[#c58b46]/10">
          <div className="grid md:grid-cols-[1fr_auto] md:items-center">
            <div className="p-8 md:p-10">
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Kolesarski ambasadorji
              </div>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl font-black italic leading-tight tracking-tight text-white md:text-5xl">
                Postani kolesarski ambasador svoje regije.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400">
                Poznaš lokalno pot, ki si zasluži več pozornosti? Pridruži se
                mreži ambasadorjev: predlagaj ture, poveži ponudnike in
                znamenitosti. Vsaka objava nosi tvoj podpis.
              </p>
            </div>
            <div className="flex flex-col gap-3 border-t border-white/10 p-8 md:border-l md:border-t-0 md:p-10">
              <Link
                href="/ambasador/registracija"
                className="rounded-full bg-[#c58b46] px-7 py-4 text-center text-sm font-black text-black"
              >
                Postani ambasador
              </Link>
              <Link
                href="/ambasador/prijava"
                className="rounded-full border border-white/10 px-7 py-4 text-center text-sm font-bold text-zinc-300"
              >
                Prijava
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 px-5 py-10 text-sm text-zinc-500">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-500">
              Vsaka dobra tura se začne s pogovorom.{" "}
              <span className="text-zinc-600">Vprašanje, ideja ali predlog? Napiši.</span>
            </p>
            <button
              onClick={() => setKontaktOpen(true)}
              className="shrink-0 rounded-full border border-[#c58b46]/40 px-6 py-3 text-sm font-bold text-[#f4d7ad] transition hover:bg-[#c58b46]/10"
            >
              Javi se
            </button>
          </div>
          <div className="flex flex-col gap-2 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Bojan on Bike</p>
            <p>Mobile-first kolesarska platforma za Slovenijo.</p>
          </div>
        </div>
      </footer>

      <KontaktModal open={kontaktOpen} onClose={() => setKontaktOpen(false)} />
    </main>
  );
}
