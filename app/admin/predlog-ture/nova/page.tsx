import Link from "next/link";

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

const experiences = [
  "Vinski kolesarski dan",
  "Pohorski flow in kosilo",
];

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="space-y-2 text-sm font-bold text-zinc-200">
      {label}
      <input
        type={type}
        className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none placeholder:text-zinc-600"
        placeholder={placeholder}
      />
    </label>
  );
}

function TextArea({
  label,
  placeholder,
  rows = 5,
}: {
  label: string;
  placeholder: string;
  rows?: number;
}) {
  return (
    <label className="block space-y-2 text-sm font-bold text-zinc-200">
      {label}
      <textarea
        rows={rows}
        className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none placeholder:text-zinc-600"
        placeholder={placeholder}
      />
    </label>
  );
}

function Section({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
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

export default function NewTrailProposalPage() {
  return (
    <AdminShell active="ture">
      <div className="space-y-8">
        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Admin / Ambasadorski dokument / Nova tura
              </div>

              <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
                Zgradi doživetje ture
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400">
                Enoten dokument za ambasadorja. Polja sledijo vrstnemu redu javne
                strani ture: od prvega vtisa, podatkov in ambasadorja do zgodbe,
                podlage, ponudnikov, znamenitosti, vremena, eBike izračuna in galerije.
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

        <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
          <div className="space-y-6">
            <Section
              eyebrow="1 / Hero in prvi vtis"
              title="Kako se tura predstavi obiskovalcu?"
              intro="To je prvi občutek ture: ime, regija, glavni stavek, komu je namenjena in hero slika."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Ime ture *" placeholder="npr. Pohorski veliki krog do Areha" />

                <label className="space-y-2 text-sm font-bold text-zinc-200">
                  Regija *
                  <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none">
                    <option>Izberi regijo</option>
                    {regions.map((region) => (
                      <option key={region}>{region}</option>
                    ))}
                  </select>
                </label>

                <Field label="Glavni stavek ture *" placeholder="npr. Dolg pohorski krog z gozdnimi cestami in razgledi." />

                <Field label="Tip ture / oznake" placeholder="npr. gravel, e-bike, razgledna, družinska" />

                <label className="block space-y-2 text-sm font-bold text-zinc-200 md:col-span-2">
                  Komu je tura namenjena?
                  <textarea
                    rows={4}
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none placeholder:text-zinc-600"
                    placeholder="npr. Za kolesarje, ki želijo daljši dan, mirne gozdne ceste in lep zaključek po makadamu."
                  />
                </label>
              </div>

              <div className="mt-5 rounded-[24px] border border-dashed border-white/15 bg-[#07110b] p-6 text-center">
                <div className="text-3xl">🖼️</div>
                <div className="mt-3 text-lg font-black text-white">Hero slika ture</div>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Prva fotografija mora prodati občutek ture: pokrajina, cesta, svetloba ali kolesar v prostoru.
                </p>
                <button className="mt-5 rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black">
                  Izberi hero sliko
                </button>
              </div>
            </Section>

            <Section
              eyebrow="2 / Ključni podatki"
              title="Podatki, ki jih obiskovalec preveri takoj"
              intro="To so osnovni podatki, ki se prikažejo ob vrhu strani ture."
            >
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Dolžina" placeholder="npr. 92 km" />
                <Field label="Višinski metri" placeholder="npr. 1450 m" />
                <Field label="Čas vožnje" placeholder="npr. 5–6 h" />

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

                <Field label="Najboljša sezona" placeholder="npr. pomlad, poletje, jesen" />
                <Field label="Start / cilj" placeholder="npr. Slovenska Bistrica" />
              </div>

              <div className="mt-5 rounded-[24px] border border-dashed border-white/15 bg-[#07110b] p-6 text-center">
                <div className="text-3xl">🗺️</div>
                <div className="mt-3 text-lg font-black text-white">GPX datoteka</div>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  GPX bo kasneje shranjen v zaščiten storage in prikazan na zemljevidu ture.
                </p>
                <button className="mt-5 rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black">
                  Izberi GPX
                </button>
              </div>
            </Section>

            <Section
              eyebrow="3 / Ambasador ture"
              title="Kdo stoji za predlogom?"
              intro="Ta blok se kasneje prikaže na javni strani ture kot priznanje lokalnemu ambasadorju."
            >
              <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
                <Field label="Ime in priimek ambasadorja" placeholder="npr. Bojan Ratej" />

                <label className="space-y-2 text-sm font-bold text-zinc-200">
                  Oznaka ambasadorja
                  <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none">
                    <option>Ambasador Štajerske</option>
                    <option>⭐ TOP ambasador Štajerske</option>
                  </select>
                </label>
              </div>

              <TextArea
                label="Ambasadorjeva opomba"
                placeholder="Zakaj si izbral to turo? Kaj je tvoj lokalni nasvet?"
                rows={4}
              />
            </Section>

            <Section
              eyebrow="4 / Zgodba ture"
              title="Naj tura ne bo samo trasa"
              intro="Tukaj nastane doživljajski opis: ritem poti, občutek, razgledi, postanki in razlog, zakaj je tura posebna."
            >
              <div className="space-y-4">
                <TextArea
                  label="Kratek opis *"
                  placeholder="Kratek opis, ki se lahko prikaže na kartici ture ali pod naslovom."
                  rows={4}
                />

                <TextArea
                  label="Daljša zgodba ture"
                  placeholder="Opiši potek dneva, vzpone, gozdne ceste, razglede, mirne dele, zahtevnejše odseke in zaključek."
                  rows={8}
                />
              </div>
            </Section>

            <Section
              eyebrow="5 / Podlaga ture"
              title="Kakšen občutek ima vožnja?"
              intro="Podlaga pove, ali je tura bolj asfaltna, makadamska, gozdna ali trail. To je pomembno za pričakovanja obiskovalca."
            >
              <div className="grid gap-4 md:grid-cols-4">
                {["Asfalt", "Makadam", "Gozdna cesta", "Trail"].map((surface) => (
                  <Field key={surface} label={surface} placeholder="%" />
                ))}
              </div>

              <TextArea
                label="Opomba o podlagi"
                placeholder="npr. Večina ture poteka po dobrih gozdnih cestah, nekaj odsekov je bolj grobih po dežju."
                rows={4}
              />
            </Section>

            <Section
              eyebrow="6 / Doživetveni plan dneva"
              title="Kako naj obiskovalec doživi turo?"
              intro="To je editorial del: predlog ritma dneva, postankov, razgledov, hrane in zaključka."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <TextArea label="Začetek ture" placeholder="Kje začeti, kdaj, kaj preveriti pred startom?" rows={4} />
                <TextArea label="Prvi del trase" placeholder="Kako se tura odpre? Kakšen je ritem začetka?" rows={4} />
                <TextArea label="Glavni postanek" placeholder="Kje se ustaviti in zakaj?" rows={4} />
                <TextArea label="Zaključek dneva" placeholder="Kako se tura zaključi in kaj priporočiti po vožnji?" rows={4} />
              </div>
            </Section>
          </div>

          <div className="space-y-6">
            <Section
              eyebrow="7 / Znamenitosti"
              title="Točke, ki dajo turi značaj"
              intro="Znamenitosti so razgledi, naravne točke, kulturni kraji ali posebnosti ob poti."
            >
              <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none">
                <option>Izberi znamenitost iz izbrane regije</option>
                {points.map((point) => (
                  <option key={point}>{point}</option>
                ))}
              </select>

              <button className="mt-3 w-full rounded-full border border-white/10 px-4 py-3 text-sm font-bold text-zinc-300">
                + Dodaj novo znamenitost
              </button>

              <TextArea
                label="Zakaj je pomembna za to turo?"
                placeholder="Kratek lokalni razlog, zakaj se splača ustaviti."
                rows={4}
              />
            </Section>

            <Section
              eyebrow="8 / Ponudniki"
              title="Postanki, ki naredijo kolesarski dan"
              intro="Ponudniki so kulinarika, vino, prenočišče, polnilnica, servis ali druga koristna točka."
            >
              <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none">
                <option>Izberi ponudnika iz izbrane regije</option>
                {providers.map((provider) => (
                  <option key={provider}>{provider}</option>
                ))}
              </select>

              <button className="mt-3 w-full rounded-full border border-white/10 px-4 py-3 text-sm font-bold text-zinc-300">
                + Dodaj novega ponudnika
              </button>

              <TextArea
                label="Zakaj se ustaviti tukaj?"
                placeholder="npr. dobra hrana, terasa, razgled, možnost polnjenja, lokalna zgodba..."
                rows={4}
              />
            </Section>

            <Section
              eyebrow="9 / Vreme"
              title="Vreme na turi"
              intro="Kasneje se bo vreme lahko vezalo na lokacijo ture. Ambasador pa lahko doda praktično opombo."
            >
              <Field label="Lokacija za vreme" placeholder="npr. Areh, Mariborsko Pohorje" />
              <TextArea
                label="Opomba glede vremena"
                placeholder="npr. Po dežju so gozdne ceste mehkejše; poleti je dobro začeti zgodaj."
                rows={4}
              />
            </Section>

            <Section
              eyebrow="10 / eBike"
              title="Bosch Performance Line CX izračun"
              intro="Priporočilo za e-bike uporabnike: baterija, način vožnje in zahtevnost ture."
            >
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
                <Field label="Priporočena baterija" placeholder="npr. 625 Wh ali 750 Wh" />
                <Field label="Način vožnje" placeholder="npr. Eco / Tour / eMTB" />
              </div>

              <TextArea
                label="Opomba za e-bike"
                placeholder="npr. Pri 500 Wh bateriji priporočamo varčen tempo in polnjenje na postanku."
                rows={4}
              />
            </Section>

            <Section
              eyebrow="11 / Galerija"
              title="Utrinki s poti"
              intro="Fotografije naj pokažejo ritem ture: cesta, razgled, postanek, detajl, ljudje, pokrajina."
            >
              <div className="rounded-[24px] border border-dashed border-white/15 bg-[#07110b] p-6 text-center">
                <div className="text-3xl">📷</div>
                <div className="mt-3 text-lg font-black text-white">Dodaj galerijo</div>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Kasneje se slike shranijo v medijsko knjižnico oziroma Supabase Storage.
                </p>
                <button className="mt-5 rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black">
                  Izberi slike
                </button>
              </div>
            </Section>

            <section className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-6 md:p-7">
              <div className="mb-5 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                12 / Predogled in oddaja
              </div>

              <h2 className="text-2xl font-black tracking-tight text-white">
                Celoten paket gre v pregled
              </h2>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Ambasador dokument najprej shrani kot osnutek. Ko je pripravljen,
                ga odda v uredniški pregled. Glavni admin nato potrdi turo,
                nove ponudnike, znamenitosti in doživetje.
              </p>

              <div className="mt-6 grid gap-3">
                <button className="rounded-full border border-white/10 px-6 py-4 text-sm font-black text-zinc-300">
                  Predogled javne strani
                </button>

                <button className="rounded-full bg-[#c58b46] px-6 py-4 text-sm font-black text-black">
                  Oddaj v pregled
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
