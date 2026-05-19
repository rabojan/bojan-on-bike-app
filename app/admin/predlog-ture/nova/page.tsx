import Link from "next/link";
import type { ReactNode } from "react";

import AdminShell from "@/components/AdminShell";

const regions = [
  "Štajerska",
  "Koroška",
  "Gorenjska",
  "Primorska",
  "Notranjska",
  "Dolenjska",
  "Prekmurje",
];

const trailTypes = [
  "Gravel",
  "Cestna",
  "Gozdna",
];

const providersNearTrail = [
  {
    name: "Rudijev dom na Pohorju",
    distance: "0,8 km od trase",
    tags: "kulinarika · postanek · voda",
  },
  {
    name: "Gorska hiša Pohorje",
    distance: "1,6 km od trase",
    tags: "kulinarika · prenočitev",
  },
  {
    name: "Vinska klet med griči",
    distance: "2,7 km od trase",
    tags: "vino · lokalna zgodba",
  },
];

const pointsNearTrail = [
  {
    name: "Razgled nad Mariborom",
    distance: "0,5 km od trase",
    tags: "razgled · fotografija",
  },
  {
    name: "Pohorski gozdni odsek",
    distance: "ob trasi",
    tags: "narava · gozdna cesta",
  },
  {
    name: "Stara planinska pot",
    distance: "1,9 km od trase",
    tags: "zgodba · lokalna posebnost",
  },
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
        <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">
          {intro}
        </p>
      ) : null}

      <div className="mt-6">{children}</div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  counter,
  type = "text",
}: {
  label: string;
  placeholder: string;
  counter?: string;
  type?: string;
}) {
  return (
    <label className="block text-sm font-bold text-zinc-200">
      <span>{label}</span>

      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 h-[56px] w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 text-white outline-none placeholder:text-zinc-600"
      />

      {counter ? (
        <div className="mt-2 text-right text-xs font-medium text-zinc-600">
          0 / {counter}
        </div>
      ) : null}
    </label>
  );
}

function TextArea({
  label,
  placeholder,
  counter,
  rows = 4,
}: {
  label: string;
  placeholder: string;
  counter?: string;
  rows?: number;
}) {
  return (
    <label className="block text-sm font-bold text-zinc-200">
      <span>{label}</span>

      <textarea
        rows={rows}
        placeholder={placeholder}
        className="mt-2 h-[56px] w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 text-white outline-none placeholder:text-zinc-600"
      />

      {counter ? (
        <div className="mt-2 text-right text-xs font-medium text-zinc-600">
          0 / {counter}
        </div>
      ) : null}
    </label>
  );
}

function UploadBox({
  label,
  title,
  description,
  button,
  required = false,
}: {
  label: string;
  title: string;
  description: string;
  button: string;
  required?: boolean;
}) {
  return (
    <div className="rounded-[24px] border border-dashed border-white/15 bg-[#07110b] p-5 text-center">
      <div className="text-xs uppercase tracking-[0.3em] text-[#c58b46]">
        {label}
      </div>

      <div className="mt-3 text-xl font-black text-white">{title}</div>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
        {description}
      </p>

      {required ? (
        <div className="mx-auto mt-4 inline-flex rounded-full border border-[#c58b46]/25 bg-[#c58b46]/10 px-4 py-2 text-xs font-bold text-[#c58b46]">
          Obvezno za oddajo predloga
        </div>
      ) : null}

      <label className="mt-5 inline-flex cursor-pointer rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#d9a35d]">
        {button}
        <input type="file" className="hidden" />
      </label>
    </div>
  );
}

function RouteSuggestionCard({
  name,
  distance,
  tags,
}: {
  name: string;
  distance: string;
  tags: string;
}) {
  return (
    <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#07110b] p-4">
      <input type="checkbox" className="mt-1 h-4 w-4 accent-[#c58b46]" />

      <span className="min-w-0">
        <span className="block font-black text-white">{name}</span>
        <span className="mt-1 block text-sm text-[#c58b46]">{distance}</span>
        <span className="mt-1 block text-sm leading-6 text-zinc-500">
          {tags}
        </span>
      </span>
    </label>
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
          eyebrow="1 / Moj ambasadorski kotiček"
          title="Dobrodošel nazaj, Bojan"
          intro="Tukaj vidiš svoj ambasadorski profil, svoje predloge in napredek do TOP ambasadorja regije."
        >
          <div className="grid gap-5 xl:grid-cols-[1fr_1.2fr_0.9fr]">
            <div className="rounded-[26px] border border-white/10 bg-[#07110b] p-5">
              <div className="text-xs uppercase tracking-[0.28em] text-[#c58b46]">
                Tvoj profil
              </div>

              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-3xl">
                  🚴
                </div>

                <div>
                  <div className="text-2xl font-black text-white">
                    Bojan Ratej
                  </div>
                  <div className="mt-1 text-sm font-semibold text-zinc-400">
                    Ambasador Štajerske
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-[#c58b46]/20 bg-[#c58b46]/10 p-4 text-sm leading-6 text-zinc-300">
                Vsaka potrjena tura šteje k tvojemu ambasadorskemu profilu.
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-black text-black">
                  + Predlagaj novo turo
                </button>

                <button className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300">
                  Uredi profil
                </button>
              </div>
            </div>

            <div className="rounded-[26px] border border-white/10 bg-[#07110b] p-5">
              <div className="text-xs uppercase tracking-[0.28em] text-[#c58b46]">
                Moje ture
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-3xl font-black text-white">7</div>
                  <div className="mt-2 text-xs font-semibold text-zinc-500">
                    oddanih
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-3xl font-black text-white">4</div>
                  <div className="mt-2 text-xs font-semibold text-zinc-500">
                    objavljene
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-3xl font-black text-white">2</div>
                  <div className="mt-2 text-xs font-semibold text-zinc-500">
                    v pregledu
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-3xl font-black text-white">1</div>
                  <div className="mt-2 text-xs font-semibold text-zinc-500">
                    osnutek
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-black text-white">Zadnji predlog</div>
                    <div className="mt-1 text-sm text-zinc-500">
                      Pohorski veliki krog do Areha
                    </div>
                  </div>

                  <div className="rounded-full border border-[#c58b46]/20 bg-[#c58b46]/10 px-3 py-2 text-xs font-bold text-[#c58b46]">
                    v pregledu
                  </div>
                </div>
              </div>

              <button className="mt-5 w-full rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300">
                Moji predlogi
              </button>
            </div>

            <div className="rounded-[26px] border border-[#c58b46]/20 bg-[#c58b46]/10 p-5">
              <div className="text-xs uppercase tracking-[0.28em] text-[#c58b46]">
                TOP ambasador
              </div>

              <h3 className="mt-4 text-xl font-black text-white">
                Še 16 objavljenih tur
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-300">
                TOP oznaka se odklene pri 20 objavljenih oziroma potrjenih turah.
              </p>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs font-bold text-zinc-400">
                  <span>4 / 20</span>
                  <span>20%</span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-black/30">
                  <div className="h-full w-[20%] rounded-full bg-[#c58b46]" />
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-zinc-300">
                Tvoje objavljene ture pomagajo graditi izbrane kolesarske zgodbe
                po Sloveniji.
              </div>
            </div>
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
                <Field
                  label="Ime ture *"
                  placeholder="npr. Pohorski veliki krog do Areha"
                  counter="80"
                />

                <label className="block text-sm font-bold text-zinc-200">
                  <span>Regija ture *</span>

                  <select className="mt-2 h-[56px] w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 text-white outline-none">
                    <option>Izberi regijo, kjer poteka tura</option>
                    {regions.map((region) => (
                      <option key={region}>{region}</option>
                    ))}
                  </select>
                </label>

                <div className="md:col-span-2">
                  <TextArea
                    label="Kratek stavek ob turi *"
                    placeholder="npr. Dolg pohorski krog z gozdnimi cestami, razgledi in mirnim makadamskim zaključkom."
                    counter="120"
                    rows={3}
                  />
                </div>

                <Field label="Dolžina" placeholder="npr. 92 km" counter="10" />
                <Field
                  label="Višinski metri"
                  placeholder="npr. 1450 m"
                  counter="10"
                />

                <label className="block text-sm font-bold text-zinc-200">
                  <span>Težavnost</span>

                  <select className="mt-2 h-[56px] w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 text-white outline-none">
                    <option>Izberi težavnost</option>
                    <option>Lahka</option>
                    <option>Srednja</option>
                    <option>Zahtevna</option>
                    <option>Zelo zahtevna</option>
                  </select>
                </label>

                <Field
                  label="Ožje območje"
                  placeholder="npr. Areh / Pohorje"
                  counter="20"
                />
              </div>

              <div className="mt-5">
                <TextArea
                  label="Tvoj lokalni pogled"
                  placeholder="Zakaj je ta tura vredna? Komu bi jo priporočil? Na kaj naj bo kolesar pozoren?"
                  rows={6}
                  counter="700"
                />
              </div>
            </Section>

            <Section
              eyebrow="3 / Tip ture in primernost"
              title="Kakšna tura je to?"
              intro="Izberi osnovni tip ture. E-bike in družinska primernost sta določena posebej."
            >
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {trailTypes.map((type) => (
                  <label
                    key={type}
                    className="flex min-h-12 items-center gap-3 rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm font-semibold text-zinc-300"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-[#c58b46]"
                    />
                    {type}
                  </label>
                ))}
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <label className="block text-sm font-bold text-zinc-200">
                  <span>E-bike friendly</span>

                  <select className="mt-2 h-[56px] w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 text-white outline-none">
                    <option>Izberi</option>
                    <option>Da</option>
                    <option>Ne</option>
                    <option>Pogojno</option>
                  </select>
                </label>

                <label className="block text-sm font-bold text-zinc-200">
                  <span>Family friendly</span>

                  <select className="mt-2 h-[56px] w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 text-white outline-none">
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
              title="Trasa je osnova predloga"
              intro="GPX je obvezen. Brez GPX datoteke predloga ture ni mogoče poslati, ker iz nje določimo potek, regijo, bližnje postanke in kasnejši zemljevid."
            >
              <UploadBox
                label="GPX"
                title="Naloži GPX trase"
                description="To je obvezen del predloga. GPX omogoča zemljevid, preverjanje trase in predloge ponudnikov ter znamenitosti ob poti."
                button="Izberi GPX"
                required
              />

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <Field label="Cesta" placeholder="%" counter="4" />
                <Field label="Makadam" placeholder="%" counter="4" />
                <Field label="Gozdna pot" placeholder="%" counter="4" />
              </div>

              <div className="mt-5">
                <TextArea
                  label="Opomba o podlagi"
                  placeholder="npr. Gozdne ceste so večinoma dobre, po dežju je nekaj mehkejših odsekov."
                  rows={4}
                  counter="350"
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

                    <div className="grid items-start gap-4 md:grid-cols-[0.85fr_1.15fr]">
                      <UploadBox
                        label="Slika"
                        title="Dodaj sliko"
                        description="Slika naj pokaže občutek tega dela poti."
                        button="Izberi sliko"
                      />

                      <div className="space-y-4">
                        <Field
                          label="Naslov poudarka"
                          placeholder="npr. Gozdni vzpon"
                          counter="25"
                        />

                        <TextArea
                          label="Kratek opis"
                          placeholder="Zakaj je ta del poti poseben?"
                          rows={5}
                          counter="200"
                        />
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
              title="Postanki ob tvoji trasi"
              intro="Po naloženem GPX lahko sistem predlaga ponudnike v bližini trase. Izberi tiste, ki jih poznaš ali jih priporočaš."
            >
              <div className="rounded-2xl border border-[#c58b46]/20 bg-[#c58b46]/10 p-4 text-sm leading-6 text-zinc-300">
                Razdalje so prikazane glede na GPX traso. Tako ambasador lažje
                vidi, kateri ponudniki so res blizu poti.
              </div>

              <div className="mt-4 grid gap-3">
                {providersNearTrail.map((provider) => (
                  <RouteSuggestionCard
                    key={provider.name}
                    name={provider.name}
                    distance={provider.distance}
                    tags={provider.tags}
                  />
                ))}
              </div>

              <div className="mt-5 rounded-[24px] border border-white/10 bg-[#07110b] p-5">
                <div className="font-black text-white">Ne najdeš ponudnika?</div>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Ponudnika ne vnašamo tukaj na kratko, ampak prek uradnega
                  obrazca, da imajo vsi ponudniki enake podatke, opis, kontakt,
                  tip in sliko.
                </p>

                <Link
                  href="/admin/ponudniki/nov"
                  className="mt-5 inline-flex rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300"
                >
                  + Dodaj novega ponudnika
                </Link>
              </div>
            </Section>

            <Section
              eyebrow="7 / Znamenitosti"
              title="Kaj je vredno videti?"
              intro="Po naloženem GPX lahko sistem predlaga znamenitosti v bližini trase. Izberi samo tiste, ki res pomagajo turi dobiti značaj."
            >
              <div className="rounded-2xl border border-[#c58b46]/20 bg-[#c58b46]/10 p-4 text-sm leading-6 text-zinc-300">
                Znamenitosti se kasneje predlagajo glede na oddaljenost od GPX
                trase in izbrano regijo ture.
              </div>

              <div className="mt-4 grid gap-3">
                {pointsNearTrail.map((point) => (
                  <RouteSuggestionCard
                    key={point.name}
                    name={point.name}
                    distance={point.distance}
                    tags={point.tags}
                  />
                ))}
              </div>

              <div className="mt-5 rounded-[24px] border border-white/10 bg-[#07110b] p-5">
                <div className="font-black text-white">
                  Ne najdeš znamenitosti?
                </div>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Znamenitost dodamo prek uradnega obrazca, da ima enako
                  strukturo kot vse ostale znamenitosti: opis, lokacijo, sliko
                  in povezavo z regijo.
                </p>

                <Link
                  href="/admin/znamenitosti/nova"
                  className="mt-5 inline-flex rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300"
                >
                  + Dodaj novo znamenitost
                </Link>
              </div>
            </Section>

            <Section
              eyebrow="8 / Utrinki in doživetje poti"
              title="Dodaj občutek poti"
              intro="Dodaj do 8 utrinkov. Iz teh slik in kratkih naslovov lahko kasneje nastane galerija, doživetveni opis ali social objava."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 8 }, (_, index) => (
                  <div
                    key={index}
                    className="rounded-[22px] border border-white/10 bg-[#07110b] p-4"
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="text-xs uppercase tracking-[0.22em] text-[#c58b46]">
                        Utrinek {index + 1}
                      </div>
                      <div className="text-xs text-zinc-600">slika + naslov</div>
                    </div>

                    <div className="rounded-[20px] border border-dashed border-white/15 bg-black/20 p-5 text-center">
                      <div className="text-xs uppercase tracking-[0.25em] text-[#c58b46]">
                        Slika
                      </div>
                      <div className="mt-2 text-sm font-black text-white">
                        Dodaj fotografijo
                      </div>
                      <label className="mt-4 inline-flex cursor-pointer rounded-full bg-[#c58b46] px-4 py-2 text-xs font-bold text-black transition hover:bg-[#d9a35d]">
                        Izberi
                        <input type="file" className="hidden" />
                      </label>
                    </div>

                    <div className="mt-4">
                      <Field
                        label="Naslov slike"
                        placeholder="npr. Miren makadam"
                        counter="25"
                      />
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
                Ko pošlješ predlog, tura ostane povezana s teboj. Skupaj jo pripravimo
                tako, da bo jasno predstavljena, uporabna za druge kolesarje
                in objavljena s tvojim podpisom.
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
