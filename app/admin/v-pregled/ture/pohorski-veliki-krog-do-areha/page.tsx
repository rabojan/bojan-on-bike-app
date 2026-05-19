"use client";

import Link from "next/link";
import { useState } from "react";

import AdminShell from "@/components/AdminShell";

const highlights = [
  {
    title: "Gozdni vzpon proti Arehu",
    text: "Miren vzpon po gozdnih cestah, kjer se tura odmakne od mestnega ritma.",
  },
  {
    title: "Razgled nad Mariborom",
    text: "Točka, kjer se odpre pogled proti mestu in dolini.",
  },
  {
    title: "Makadamski zaključek",
    text: "Sproščen povratek po mirnejših odsekih, primeren za lep zaključek dneva.",
  },
];

const providers = [
  "Rudijev dom na Pohorju — 0,8 km od trase",
  "Gorska hiša Pohorje — 1,6 km od trase",
];

const points = [
  "Razgled nad Mariborom — 0,5 km od trase",
  "Pohorski gozdni odsek — ob trasi",
];

const returnReasons = [
  "manjka bolj jasen opis ture",
  "GPX potrebuje preverjanje",
  "manjkajo utrinki s poti",
  "ponudniki niso dovolj jasno povezani s turo",
  "treba je dopolniti lokalni pogled",
];

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-black/20 p-5">
      <div className="text-xs uppercase tracking-[0.25em] text-[#c58b46]">
        {label}
      </div>
      <div className="mt-3 text-xl font-black text-white">{value}</div>
    </div>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-[#07110b] p-6">
      <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
        {eyebrow}
      </div>
      <h2 className="mt-4 text-2xl font-black tracking-tight text-white">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function ReviewTrailDetailPage() {
  const [returnOpen, setReturnOpen] = useState(false);

  return (
    <AdminShell active="v-pregled">
      <div className="space-y-8">
        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Uredniški pregled / Predlog ture
              </div>

              <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
                Pohorski veliki krog do Areha
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400">
                Predlog je poslal Bojan Ratej. Tura čaka na objavo in potrebuje
                uredniški pregled podatkov, GPX trase, povezanih vsebin in
                končne predstavitve.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <span className="rounded-full border border-blue-300/20 bg-blue-300/10 px-4 py-2 text-xs font-bold text-blue-200">
                  Čaka na objavo
                </span>
                <span className="rounded-full border border-[#c58b46]/20 bg-[#c58b46]/10 px-4 py-2 text-xs font-bold text-[#c58b46]">
                  Štajerska
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-zinc-300">
                  Bojan Ratej
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/v-pregled"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300"
              >
                ← Nazaj v pregled
              </Link>

              <button className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black">
                Objavi
              </button>

              <button
                onClick={() => setReturnOpen(true)}
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300"
              >
                Vrni v dopolnitev
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <InfoCard label="Dolžina" value="92 km" />
          <InfoCard label="Višinski metri" value="1450 vm" />
          <InfoCard label="Težavnost" value="Zahtevna" />
          <InfoCard label="Tip ture" value="Gravel" />
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <Section eyebrow="1 / GPX" title="Trasa in osnovni podatki">
              <div className="rounded-[26px] border border-dashed border-white/15 bg-black/20 p-6 text-center">
                <div className="text-xs uppercase tracking-[0.3em] text-[#c58b46]">
                  GPX datoteka
                </div>
                <div className="mt-3 text-2xl font-black text-white">
                  pohorski-veliki-krog-do-areha.gpx
                </div>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-zinc-500">
                  GPX je naložen. Pred objavo preveri, ali se trasa ujema z
                  opisom, regijo in predlaganimi postanki.
                </p>
                <button className="mt-5 rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300">
                  Odpri GPX / zemljevid
                </button>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <InfoCard label="Cesta" value="35%" />
                <InfoCard label="Makadam" value="45%" />
                <InfoCard label="Gozdna pot" value="20%" />
              </div>
            </Section>

            <Section eyebrow="2 / Lokalni pogled" title="Kaj pravi ambasador?">
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <p className="text-base leading-8 text-zinc-300">
                  Tura je vredna zaradi dolgega pohorskega občutka, mirnih
                  gozdnih cest in razgleda nad Mariborom. Priporočil bi jo
                  kolesarjem, ki imajo radi daljši dan zunaj, dober vzpon in
                  sproščen makadamski zaključek.
                </p>
              </div>
            </Section>

            <Section eyebrow="3 / Poudarki" title="Trije poudarki poti">
              <div className="grid gap-4">
                {highlights.map((item, index) => (
                  <div
                    key={item.title}
                    className="grid gap-4 rounded-[24px] border border-white/10 bg-black/20 p-5 md:grid-cols-[auto_1fr]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c58b46] text-sm font-black text-black">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-zinc-500">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section eyebrow="4 / Utrinki" title="Fotografije s poti">
              <div className="grid gap-4 md:grid-cols-3">
                {["Gozdni vzpon", "Razgled", "Makadam"].map((title, index) => (
                  <div
                    key={title}
                    className="rounded-[24px] border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex aspect-[4/3] items-center justify-center rounded-[20px] border border-dashed border-white/15 bg-[#07110b] text-sm font-bold text-zinc-500">
                      Slika {index + 1}
                    </div>
                    <div className="mt-4 text-sm font-black text-white">
                      {title}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          <div className="space-y-6">
            <Section eyebrow="Ambasador" title="Kdo je poslal predlog?">
              <div className="flex items-center gap-4 rounded-[24px] border border-white/10 bg-black/20 p-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#0b1a10] text-3xl">
                  🚴
                </div>
                <div>
                  <div className="text-xl font-black text-white">
                    Bojan Ratej
                  </div>
                  <div className="mt-1 text-sm font-semibold text-zinc-400">
                    Ambasador Štajerske
                  </div>
                </div>
              </div>
            </Section>

            <Section eyebrow="Ponudniki" title="Predlagani postanki">
              <div className="space-y-3">
                {providers.map((provider) => (
                  <div
                    key={provider}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-semibold text-zinc-300"
                  >
                    {provider}
                  </div>
                ))}
              </div>
            </Section>

            <Section eyebrow="Znamenitosti" title="Točke ob trasi">
              <div className="space-y-3">
                {points.map((point) => (
                  <div
                    key={point}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-semibold text-zinc-300"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </Section>

            <section className="rounded-[32px] border border-[#c58b46]/20 bg-[#c58b46]/10 p-6">
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Uredniška odločitev
              </div>

              <h2 className="mt-4 text-2xl font-black text-white">
                Je predlog pripravljen?
              </h2>

              <p className="mt-3 text-sm leading-7 text-zinc-300">
                Če ima tura delujoč GPX, jasne podatke in dovolj dobro
                predstavitev, jo lahko objaviš. Če kaj manjka, jo vrni v
                dopolnitev z jasnim sporočilom.
              </p>

              <div className="mt-6 grid gap-3">
                <button className="rounded-full bg-[#c58b46] px-6 py-4 text-sm font-black text-black">
                  Objavi turo
                </button>

                <button
                  onClick={() => setReturnOpen(true)}
                  className="rounded-full border border-white/10 px-6 py-4 text-sm font-bold text-zinc-300"
                >
                  Vrni v dopolnitev
                </button>

                <button className="rounded-full border border-white/10 px-6 py-4 text-sm font-bold text-zinc-500">
                  Arhiviraj
                </button>
              </div>
            </section>
          </div>
        </div>

        {returnOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">
            <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-[#07110b] p-6 shadow-2xl md:p-8">
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Vrni v dopolnitev
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-white">
                Kaj naj Bojan dopolni?
              </h2>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Predlog ne bo zavrnjen. Ambasador dobi tvoje sporočilo in ga
                lahko dopolni v svojem kotičku.
              </p>

              <div className="mt-6 rounded-[24px] border border-white/10 bg-black/20 p-5">
                <div className="text-sm font-black text-white">
                  Hitri razlogi
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {returnReasons.map((reason) => (
                    <label
                      key={reason}
                      className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-[#07110b] p-4 text-sm leading-6 text-zinc-300"
                    >
                      <input type="checkbox" className="mt-1 accent-[#c58b46]" />
                      <span>{reason}</span>
                    </label>
                  ))}
                </div>
              </div>

              <label className="mt-5 block text-sm font-bold text-zinc-200">
                Sporočilo ambasadorju

                <textarea
                  rows={6}
                  placeholder="Npr. Prosim dodaj še bolj jasen opis zadnjega dela trase in preveri GPX, ker se zaključek poti ne ujema z opisom."
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#041008] px-4 py-4 text-white outline-none placeholder:text-zinc-600"
                />
              </label>

              <div className="mt-6 flex flex-wrap justify-end gap-3">
                <button
                  onClick={() => setReturnOpen(false)}
                  className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300"
                >
                  Prekliči
                </button>

                <button
                  onClick={() => setReturnOpen(false)}
                  className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black"
                >
                  Pošlji ambasadorju
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
