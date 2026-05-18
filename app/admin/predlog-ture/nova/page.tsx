import Link from "next/link";
import type { ReactNode } from "react";

import AdminShell from "@/components/AdminShell";

const ambassadorRegions = [
  "Štajerska",
  "Koroška",
  "Gorenjska",
  "Primorska",
  "Notranjska",
  "Dolenjska",
  "Prekmurje",
];

const trailRegions = ambassadorRegions;

const trailTypes = [
  "Gravel",
  "MTB",
  "Cestna",
  "E-bike",
  "Družinska",
  "Gozdna",
  "Makadamska",
];

const providers = [
  "Rudijev dom na Pohorju",
  "Gorska hiša Pohorje",
  "Vinska klet med griči",
];

const points = [
  "Razgled nad Mariborom",
  "Pohorski gozdni odsek",
  "Stara planinska pot",
];

function Section({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-black/20 p-6 md:p-7">
      <div className="mb-5 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
        {eyebrow}
      </div>

      <h2 className="text-2xl font-black tracking-tight text-white">{title}</h2>

      {intro ? (
        <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">{intro}</p>
      ) : null}

      <div className="mt-6">{children}</div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  maxLength,
  type = "text",
}: {
  label: string;
  placeholder: string;
  maxLength?: number;
  type?: string;
}) {
  return (
    <label className="space-y-2 text-sm font-bold text-zinc-200">
      <span className="flex items-center justify-between gap-3">
        {label}
        {maxLength ? (
          <span className="text-xs font-medium text-zinc-600">
            do {maxLength} znakov
          </span>
        ) : null}
      </span>

      <input
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none placeholder:text-zinc-600"
      />
    </label>
  );
}

function TextArea({
  label,
  placeholder,
  rows = 4,
  maxLength,
}: {
  label: string;
  placeholder: string;
  rows?: number;
  maxLength?: number;
}) {
  return (
    <label className="block space-y-2 text-sm font-bold text-zinc-200">
      <span className="flex items-center justify-between gap-3">
        {label}
        {maxLength ? (
          <span className="text-xs font-medium text-zinc-600">
            do {maxLength} znakov
          </span>
        ) : null}
      </span>

      <textarea
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none placeholder:text-zinc-600"
      />
    </label>
  );
}

function UploadBox({
  label,
  title,
  description,
  button,
}: {
  label: string;
  title: string;
  description: string;
  button: string;
}) {
  return (
    <div className="rounded-[24px] border border-dashed border-white/15 bg-[#07110b] p-6 text-center">
      <div className="text-xs uppercase tracking-[0.3em] text-[#c58b46]">
        {label}
      </div>
      <div className="mt-3 text-lg font-black text-white">{title}</div>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
        {description}
      </p>

      <label className="mt-5 inline-flex cursor-pointer rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#d9a35d]">
        {button}
        <input type="file" className="hidden" />
      </label>
    </div>
  );
}

function LockedByRegion({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-[#c58b46]/20 bg-[#c58b46]/10 p-4 text-sm leading-6 text-zinc-300">
      Najprej določi regijo ture. Nato se bodo tukaj prikazali obstoječi{" "}
      {label} iz izbrane regije.
    </div>
  );
}

function DuplicateHint() {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-xs uppercase tracking-[0.25em] text-[#c58b46]">
        Varovalka proti podvajanju
      </div>
      <p className="mt-3 text-sm leading-6 text-zinc-400">
        Če vpišeš novega ponudnika ali znamenitost, sistem kasneje preveri
        podobna imena v izbrani regiji. Tako se izognemo podvajanju, na primer
        “Bar Miško” in “Bar Misko”.
      </p>
    </div>
  );
}

export default function NewTrailProposalPage() {
  return (
    <AdminShell active="ture">
      <div className="space-y-8">
        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Admin / Predlog ture
              </div>

              <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
                Predlagaj svojo turo
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400">
                Ni treba, da je predlog popoln. Pomembno je, da pokažeš dobro
                traso, svoj pogled in utrinke s poti. Iz tega lahko skupaj
                ustvarimo kolesarsko doživetje, ki bo nosilo tudi tvoj podpis.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/ture"
                className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300"
              >
                ← Nazaj na ture
              </Link>

              <button className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-bold text-black">
                Shrani osnutek
              </button>
            </div>
          </div>
        </section>

        <Section
          eyebrow="1 / Ambasador"
          title="Kdo predlaga turo?"
          intro="Za prvi predlog potrebujemo samo osnovne podatke. Ko boš naslednjič prišel nazaj, se bo tukaj prikazal tvoj ambasadorski profil z oddanimi in objavljenimi turami."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Ime in priimek *" placeholder="npr. Bojan Ratej" maxLength={80} />
            <Field label="Email *" placeholder="npr. ime@email.si" type="email" maxLength={120} />

            <label className="space-y-2 text-sm font-bold text-zinc-200">
              Regija ambasadorja *
              <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none">
                <option>Izberi svojo regijo</option>
                {ambassadorRegions.map((region) => (
                  <option key={region}>{region}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 rounded-2xl border border-[#c58b46]/20 bg-[#c58b46]/10 p-4 text-sm leading-7 text-zinc-300">
            TOP ambasador regije se ne izbere ročno. Oznako dobi ambasador, ki
            s potrjenimi turami in kakovostnimi predlogi izstopa v svoji regiji.
          </div>
        </Section>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <Section
              eyebrow="2 / Podatki o turi"
              title="Osnovna slika ture"
              intro="Tukaj vpišeš tisto, kar mora nekdo vedeti, preden se odloči za vožnjo."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Ime ture *" placeholder="npr. Pohorski veliki krog do Areha" maxLength={80} />
                <Field label="Kratek stavek ob turi *" placeholder="npr. Dolg pohorski krog z gozdnimi cestami in razgledi." maxLength={120} />
                <Field label="Dolžina" placeholder="npr. 92 km" maxLength={20} />
                <Field label="Višinski metri" placeholder="npr. 1450 m" maxLength={20} />
                <Field label="Čas vožnje" placeholder="npr. 5–6 h" maxLength={20} />

                <label className="space-y-2 text-sm font-bold text-zinc-200">
                  Težavnost
                  <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none">
                    <option>Izberi težavnost</option>
                    <option>Lahka</option>
                    <option>Srednja</option>
                    <option>Zahtevna</option>
                    <option>Zelo zahtevna</option>
                  </select>
                </label>

                <label className="space-y-2 text-sm font-bold text-zinc-200">
                  Regija ture *
                  <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none">
                    <option>Izberi regijo, kjer poteka tura</option>
                    {trailRegions.map((region) => (
                      <option key={region}>{region}</option>
                    ))}
                  </select>
                </label>

                <Field label="Ožje območje" placeholder="npr. Areh, Pohorje, Slovenske gorice" maxLength={80} />
              </div>

              <div className="mt-5">
                <TextArea
                  label="Tvoj lokalni pogled"
                  placeholder="Zakaj je ta tura vredna? Komu bi jo priporočil? Na kaj naj bo kolesar pozoren?"
                  rows={5}
                  maxLength={700}
                />
              </div>
            </Section>

            <Section
              eyebrow="3 / Tip ture in primernost"
              title="Kakšna tura je to?"
              intro="Izberi samo tiste oznake, ki res pomagajo razumeti turo. Doživetja, kulinariko in podobno bomo povezovali posebej."
            >
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {trailTypes.map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm font-semibold text-zinc-300"
                  >
                    <input type="checkbox" className="h-4 w-4 accent-[#c58b46]" />
                    {type}
                  </label>
                ))}
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm font-bold text-zinc-200">
                  E-bike friendly
                  <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none">
                    <option>Izberi</option>
                    <option>Da</option>
                    <option>Ne</option>
                    <option>Pogojno</option>
                  </select>
                </label>

                <label className="space-y-2 text-sm font-bold text-zinc-200">
                  Family friendly
                  <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none">
                    <option>Izberi</option>
                    <option>Da</option>
                    <option>Ne</option>
                    <option>Pogojno</option>
                  </select>
                </label>
              </div>
            </Section>

            <Section
              eyebrow="4 / GPX in podlaga"
              title="Trasa in občutek vožnje"
              intro="GPX je najpomembnejši del predloga, ker iz njega kasneje lahko razberemo potek, regijo, bližnje postanke in zahtevnost."
            >
              <UploadBox
                label="GPX"
                title="Naloži traso"
                description="Najbolje je, da naložiš GPX iz naprave, Strave, Komoota ali druge aplikacije."
                button="Izberi GPX"
              />

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <Field label="Cesta" placeholder="%" maxLength={4} />
                <Field label="Makadam" placeholder="%" maxLength={4} />
                <Field label="Gozdna pot" placeholder="%" maxLength={4} />
              </div>

              <div className="mt-5">
                <TextArea
                  label="Opomba o podlagi"
                  placeholder="npr. Gozdne ceste so večinoma dobre, po dežju je nekaj mehkejših odsekov."
                  rows={4}
                  maxLength={350}
                />
              </div>
            </Section>

            <Section
              eyebrow="5 / Trije poudarki poti"
              title="Kaj si bo kolesar zapomnil?"
              intro="Dodaj tri poudarke poti. To so lahko razgled, vzpon, gozdni odsek, miren makadam, poseben postanek ali občutek ture."
            >
              <div className="grid gap-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="rounded-[24px] border border-white/10 bg-[#07110b] p-5"
                  >
                    <div className="mb-4 text-xs uppercase tracking-[0.25em] text-[#c58b46]">
                      Poudarek {item}
                    </div>

                    <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
                      <UploadBox
                        label="Slika"
                        title="Dodaj sliko"
                        description="Slika naj pokaže občutek tega dela poti."
                        button="Izberi sliko"
                      />

                      <div className="space-y-4">
                        <Field label="Naslov poudarka" placeholder="npr. Gozdni vzpon proti Arehu" maxLength={80} />
                        <TextArea label="Kratek opis" placeholder="Zakaj je ta del poti poseben?" rows={4} maxLength={300} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          <div className="space-y-6">
            <Section
              eyebrow="6 / Ponudniki"
              title="Postanki ob turi"
              intro="Ponudniki niso obvezni. Če jih poznaš, jih dodaj. Če jih ne, jih lahko kasneje dopolnimo."
            >
              <LockedByRegion label="ponudniki" />

              <div className="mt-4 space-y-4">
                <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none">
                  <option>Izberi ponudnika iz regije</option>
                  {providers.map((provider) => (
                    <option key={provider}>{provider}</option>
                  ))}
                </select>

                <div className="rounded-[24px] border border-white/10 bg-[#07110b] p-5">
                  <div className="font-black text-white">Ne najdeš ponudnika?</div>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    Predlagaj novega. Kasneje preverimo, ali že obstaja pod podobnim imenom.
                  </p>

                  <div className="mt-4 space-y-4">
                    <Field label="Ime ponudnika" placeholder="npr. Bar Miško" maxLength={100} />
                    <TextArea label="Zakaj se ustaviti tukaj?" placeholder="npr. dobra kava, terasa, voda, kosilo, polnjenje baterije..." rows={4} maxLength={500} />
                    <DuplicateHint />
                  </div>
                </div>
              </div>
            </Section>

            <Section
              eyebrow="7 / Znamenitosti"
              title="Kaj je vredno videti?"
              intro="Znamenitosti niso obvezne. Dodaj jih, če res pomagajo razumeti značaj ture."
            >
              <LockedByRegion label="znamenitosti" />

              <div className="mt-4 space-y-4">
                <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none">
                  <option>Izberi znamenitost iz regije</option>
                  {points.map((point) => (
                    <option key={point}>{point}</option>
                  ))}
                </select>

                <div className="rounded-[24px] border border-white/10 bg-[#07110b] p-5">
                  <div className="font-black text-white">Ne najdeš znamenitosti?</div>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    Predlagaj novo točko, če res pomaga turi dobiti zgodbo.
                  </p>

                  <div className="mt-4 space-y-4">
                    <Field label="Ime znamenitosti" placeholder="npr. Razgled nad dolino" maxLength={100} />
                    <TextArea label="Zakaj je pomembna za to turo?" placeholder="Kratek lokalni razlog, zakaj se splača ustaviti." rows={4} maxLength={500} />
                    <DuplicateHint />
                  </div>
                </div>
              </div>
            </Section>

            <Section
              eyebrow="8 / Utrinki in doživetje poti"
              title="Dodaj občutek poti"
              intro="Dodaj do 8 utrinkov. Iz teh slik in kratkih naslovov lahko kasneje nastane galerija, doživetveni opis ali social objava."
            >
              <div className="grid gap-4">
                {Array.from({ length: 8 }, (_, index) => (
                  <div
                    key={index}
                    className="rounded-[22px] border border-white/10 bg-[#07110b] p-4"
                  >
                    <div className="mb-4 text-xs uppercase tracking-[0.22em] text-[#c58b46]">
                      Utrinek {index + 1}
                    </div>

                    <div className="grid gap-4 md:grid-cols-[0.7fr_1.3fr]">
                      <UploadBox
                        label="Slika"
                        title="Dodaj"
                        description="Fotografija s poti."
                        button="Izberi"
                      />

                      <div className="space-y-4">
                        <Field label="Naslov slike" placeholder="npr. Miren makadam ob železnici" maxLength={80} />
                        <TextArea label="Kratek opis" placeholder="Kaj prikazuje ta utrinek?" rows={3} maxLength={220} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <section className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-6 md:p-7">
              <div className="mb-5 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                9 / Pošlji predlog
              </div>

              <h2 className="text-2xl font-black tracking-tight text-white">
                Tvoja tura ostane tvoja.
              </h2>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Ko pošlješ predlog, ga skupaj pripravimo za objavo: preverimo
                podatke, po potrebi dodamo postanke in znamenitosti ter ga
                oblikujemo v doživetje, ki bo nosilo tudi tvoj podpis.
              </p>

              <p className="mt-4 text-sm leading-7 text-zinc-500">
                Predlog ne rabi biti popoln. Najpomembnejše je, da nam pokažeš
                dobro traso, svoj pogled in utrinke s poti.
              </p>

              <div className="mt-6 grid gap-3">
                <button className="rounded-full border border-white/10 px-6 py-4 text-sm font-black text-zinc-300">
                  Predogled predloga
                </button>

                <button className="rounded-full bg-[#c58b46] px-6 py-4 text-sm font-black text-black">
                  Pošlji predlog ture
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
