import Link from "next/link";
import type { ReactNode } from "react";

import AdminShell from "@/components/AdminShell";

const regions = ["Štajerska", "Koroška", "Gorenjska", "Primorska", "Notranjska", "Dolenjska", "Prekmurje"];

const trailTypes = [
  "Gravel",
  "MTB",
  "E-bike",
  "Cestna",
  "Družinska",
  "Razgledna",
  "Kulinarika",
  "Vinska",
  "Gozdna",
  "Makadamska",
  "Trail",
  "Kratka",
  "Celodnevna",
  "Za pare",
  "Za skupino",
];

const providers = ["Rudijev dom na Pohorju", "Gorska hiša Pohorje", "Vinska klet med griči"];
const points = ["Razgled nad Mariborom", "Pohorski gozdni odsek", "Stara planinska pot"];
const experiences = ["Vinski kolesarski dan", "Pohorski flow in kosilo"];

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
        {maxLength ? <span className="text-xs font-medium text-zinc-600">do {maxLength} znakov</span> : null}
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
        {maxLength ? <span className="text-xs font-medium text-zinc-600">do {maxLength} znakov</span> : null}
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
      <div className="mb-5 text-xs uppercase tracking-[0.35em] text-[#c58b46]">{eyebrow}</div>
      <h2 className="text-2xl font-black tracking-tight text-white">{title}</h2>
      {intro ? <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">{intro}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function LockedNotice({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-[#c58b46]/20 bg-[#c58b46]/10 p-4 text-sm leading-6 text-zinc-300">
      Najprej določi regijo ture. Ko bo regija izbrana, se bodo tukaj prikazali obstoječi {label} iz te regije.
    </div>
  );
}

function DuplicateWarning() {
  return (
    <div className="rounded-2xl border border-[#c58b46]/25 bg-[#c58b46]/10 p-4">
      <div className="text-xs uppercase tracking-[0.25em] text-[#c58b46]">Možen duplikat</div>
      <p className="mt-3 text-sm leading-6 text-zinc-300">
        Če ambasador vpiše na primer <strong className="text-white">Bar Miško</strong>, sistem naj preveri podobna
        imena v izbrani regiji, preden dovoli nov predlog.
      </p>
      <div className="mt-4 grid gap-2 text-sm">
        {["Bar Miško", "Bar Misko", "Bistro Miško"].map((name) => (
          <div key={name} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2">
            <span className="font-semibold text-white">{name}</span>
            <span className="text-xs text-zinc-500">uporabi obstoječega</span>
          </div>
        ))}
      </div>
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
                Admin / Ambasadorski dokument / Nova tura
              </div>

              <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
                Zgradi doživetje ture
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400">
                Najprej se določi ambasador in regija. Regija nato odklene ponudnike, znamenitosti in doživetja iz
                pravega območja. Ambasador gradi celoten predlog ture kot en dokument.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/admin/ture" className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300">
                ← Nazaj na ture
              </Link>
              <button className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-bold text-black">Shrani osnutek</button>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-6">
            <Section
              eyebrow="1 / Ambasador"
              title="Kdo oddaja predlog?"
              intro="Ambasador je prvi korak. Če ne želi oddati svojih podatkov in stati za predlogom, se postopek ustavi že tukaj."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Ime in priimek ambasadorja *" placeholder="npr. Bojan Ratej" maxLength={80} />
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
                placeholder="Zakaj predlagaš to turo? Kaj je tvoj lokalni nasvet?"
                rows={4}
                maxLength={500}
              />
            </Section>

            <Section
              eyebrow="2 / Regija"
              title="Najprej določi regijo ture"
              intro="Regija je ključ za nadaljevanje. Po izbiri regije se v nadaljevanju prikažejo ponudniki, znamenitosti in doživetja iz tega območja."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm font-bold text-zinc-200">
                  Regija ture *
                  <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none">
                    <option>Izberi regijo</option>
                    {regions.map((region) => (
                      <option key={region}>{region}</option>
                    ))}
                  </select>
                </label>
                <Field label="Ožje območje" placeholder="npr. Pohorje, Areh, Slovenske gorice" maxLength={80} />
              </div>
              <div className="mt-5 rounded-2xl border border-white/10 bg-[#07110b] p-4 text-sm leading-7 text-zinc-400">
                Če ambasador želi izbrati ponudnika, znamenitost ali doživetje brez izbrane regije, mora sistem prikazati:
                <strong className="text-white"> Najprej določi regijo ture.</strong>
              </div>
            </Section>

            <Section
              eyebrow="3 / Hero in prvi vtis"
              title="Kako se tura predstavi obiskovalcu?"
              intro="To je prvi občutek ture: ime, glavni stavek, komu je namenjena in hero slika."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Ime ture *" placeholder="npr. Pohorski veliki krog do Areha" maxLength={80} />
                <Field label="Glavni stavek ture *" placeholder="npr. Dolg pohorski krog z gozdnimi cestami in razgledi." maxLength={120} />
                <label className="block space-y-2 text-sm font-bold text-zinc-200 md:col-span-2">
                  <span className="flex items-center justify-between gap-3">
                    Komu je tura namenjena?
                    <span className="text-xs font-medium text-zinc-600">do 350 znakov</span>
                  </span>
                  <textarea
                    rows={4}
                    maxLength={350}
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none placeholder:text-zinc-600"
                    placeholder="npr. Za kolesarje, ki želijo daljši dan, mirne gozdne ceste, razgledne točke in lep zaključek po makadamu."
                  />
                </label>
              </div>

              <div className="mt-5 rounded-[24px] border border-dashed border-white/15 bg-[#07110b] p-6 text-center">
                <div className="text-xs uppercase tracking-[0.3em] text-[#c58b46]">Hero slika</div>
                <div className="mt-3 text-lg font-black text-white">Prva fotografija ture</div>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
                  Slika naj pokaže občutek: cesta, pokrajina, svetloba, kolesar ali značilen del trase.
                </p>
                <button className="mt-5 rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black">Izberi hero sliko</button>
              </div>
            </Section>

            <Section
              eyebrow="4 / Ključni podatki"
              title="Podatki, ki jih obiskovalec preveri takoj"
              intro="To so osnovni podatki ob vrhu javne strani ture."
            >
              <div className="grid gap-4 md:grid-cols-3">
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

                <Field label="Najboljša sezona" placeholder="npr. pomlad, poletje, jesen" maxLength={80} />
                <Field label="Start / cilj" placeholder="npr. Slovenska Bistrica" maxLength={100} />
              </div>

              <div className="mt-5 rounded-[24px] border border-dashed border-white/15 bg-[#07110b] p-6 text-center">
                <div className="text-xs uppercase tracking-[0.3em] text-[#c58b46]">GPX</div>
                <div className="mt-3 text-lg font-black text-white">GPX datoteka</div>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
                  GPX bo kasneje shranjen v zaščiten storage in prikazan na zemljevidu ture.
                </p>
                <button className="mt-5 rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black">Izberi GPX</button>
              </div>
            </Section>

            <Section
              eyebrow="5 / Tip ture in primernost"
              title="Za koga in za kakšen namen je tura?"
              intro="Tipi ture se izbirajo iz vnaprej določenega seznama. Na javni strani se kasneje prikažejo samo najpomembnejše oznake."
            >
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {trailTypes.map((type) => (
                  <label key={type} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#07110b] px-4 py-3 text-sm font-semibold text-zinc-300">
                    <input type="checkbox" className="h-4 w-4 accent-[#c58b46]" />
                    {type}
                  </label>
                ))}
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-[#07110b] p-5">
                  <div className="font-black text-white">E-bike friendly</div>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">Ali je tura primerna za e-bike in kakšna baterija je priporočena?</p>
                  <select className="mt-4 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none">
                    <option>Izberi</option>
                    <option>Da</option>
                    <option>Ne</option>
                    <option>Pogojno</option>
                  </select>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#07110b] p-5">
                  <div className="font-black text-white">Family friendly</div>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">Družinska tura pomeni varnost, postanke, možnost krajšanja in manj prometa.</p>
                  <select className="mt-4 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none">
                    <option>Izberi</option>
                    <option>Da</option>
                    <option>Ne</option>
                    <option>Pogojno</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <Field label="Priporočena starost otrok" placeholder="npr. 10+" maxLength={30} />
                <Field label="Promet / varnost" placeholder="npr. malo prometa, nekaj previdnosti v dolini" maxLength={120} />
              </div>
            </Section>

            <Section
              eyebrow="6 / Zgodba ture"
              title="Naj tura ne bo samo trasa"
              intro="Tukaj nastane doživljajski opis: ritem poti, občutek, razgledi, postanki in razlog, zakaj je tura posebna."
            >
              <div className="space-y-4">
                <TextArea label="Kratek opis *" placeholder="Kratek opis, ki se lahko prikaže na kartici ture ali pod naslovom." rows={4} maxLength={350} />
                <TextArea label="Daljša zgodba ture" placeholder="Opiši potek dneva, vzpone, gozdne ceste, razglede, mirne dele, zahtevnejše odseke in zaključek." rows={8} maxLength={1800} />
              </div>
            </Section>

            <Section
              eyebrow="7 / Podlaga ture"
              title="Kakšen občutek ima vožnja?"
              intro="Podlaga pove, ali je tura bolj asfaltna, makadamska, gozdna ali trail."
            >
              <div className="grid gap-4 md:grid-cols-4">
                {["Asfalt", "Makadam", "Gozdna cesta", "Trail"].map((surface) => (
                  <Field key={surface} label={surface} placeholder="%" maxLength={4} />
                ))}
              </div>

              <TextArea
                label="Opomba o podlagi"
                placeholder="npr. Večina ture poteka po dobrih gozdnih cestah, nekaj odsekov je bolj grobih po dežju."
                rows={4}
                maxLength={300}
              />
            </Section>

            <Section
              eyebrow="8 / Doživetveni plan dneva"
              title="Kako naj obiskovalec doživi turo?"
              intro="Plan dneva ni obvezen, ampak je zelo pomemben za premium občutek ture."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <TextArea label="Začetek ture" placeholder="Kje začeti, kdaj, kaj preveriti pred startom?" rows={4} maxLength={400} />
                <TextArea label="Prvi del trase" placeholder="Kako se tura odpre? Kakšen je ritem začetka?" rows={4} maxLength={400} />
                <TextArea label="Glavni postanek" placeholder="Kje se ustaviti in zakaj?" rows={4} maxLength={400} />
                <TextArea label="Zaključek dneva" placeholder="Kako se tura zaključi in kaj priporočiti po vožnji?" rows={4} maxLength={400} />
              </div>
            </Section>
          </div>

          <div className="space-y-6">
            <Section
              eyebrow="9 / Ponudniki"
              title="Postanki, ki naredijo kolesarski dan"
              intro="Ponudnik ni obvezen. Če ga ambasador ne doda, lahko admin kasneje dopolni turo."
            >
              <LockedNotice label="ponudniki" />
              <div className="mt-4 space-y-4">
                <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none">
                  <option>Izberi ponudnika iz izbrane regije</option>
                  {providers.map((provider) => (
                    <option key={provider}>{provider}</option>
                  ))}
                </select>

                <div className="rounded-[24px] border border-white/10 bg-[#07110b] p-5">
                  <div className="font-black text-white">Predlagaj novega ponudnika</div>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">Pred dodajanjem sistem preveri podobna imena v izbrani regiji.</p>
                  <div className="mt-4 space-y-4">
                    <Field label="Ime ponudnika" placeholder="npr. Bar Miško" maxLength={100} />
                    <TextArea label="Zakaj se ustaviti tukaj?" placeholder="npr. dobra terasa, voda, kava, kosilo, polnjenje baterije..." rows={4} maxLength={600} />
                    <DuplicateWarning />
                  </div>
                </div>
              </div>
            </Section>

            <Section
              eyebrow="10 / Znamenitosti"
              title="Točke, ki dajo turi značaj"
              intro="Znamenitost ni obvezna. Lahko jo izbere ambasador ali jo kasneje doda admin."
            >
              <LockedNotice label="znamenitosti" />
              <div className="mt-4 space-y-4">
                <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none">
                  <option>Izberi znamenitost iz izbrane regije</option>
                  {points.map((point) => (
                    <option key={point}>{point}</option>
                  ))}
                </select>
                <button className="w-full rounded-full border border-white/10 px-4 py-3 text-sm font-bold text-zinc-300">+ Predlagaj novo znamenitost</button>
                <TextArea label="Zakaj je pomembna za to turo?" placeholder="Kratek lokalni razlog, zakaj se splača ustaviti." rows={4} maxLength={600} />
              </div>
            </Section>

            <Section
              eyebrow="11 / Doživetja"
              title="Ali iz ture nastane doživetje dneva?"
              intro="Doživetje ni obvezno. Če obstaja, lahko poveže turo, ponudnike in znamenitosti v idejo za dan."
            >
              <LockedNotice label="doživetja" />
              <div className="mt-4 space-y-4">
                <select className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none">
                  <option>Izberi obstoječe doživetje</option>
                  {experiences.map((experience) => (
                    <option key={experience}>{experience}</option>
                  ))}
                </select>
                <button className="w-full rounded-full border border-white/10 px-4 py-3 text-sm font-bold text-zinc-300">+ Predlagaj novo doživetje</button>
              </div>
            </Section>

            <Section
              eyebrow="12 / Predlogi ob trasi"
              title="Sistem lahko kasneje pomaga"
              intro="Ko bo GPX povezan s koordinatami ponudnikov in znamenitosti, lahko sistem predlaga vsebine v bližini trase."
            >
              <div className="space-y-3">
                {[
                  "Rudijev dom na Pohorju — 0,8 km od trase",
                  "Razgled nad Mariborom — 1,2 km od trase",
                  "Vinska klet med griči — 2,7 km od trase",
                ].map((item) => (
                  <div key={item} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#07110b] p-4">
                    <span className="text-sm font-semibold text-white">{item}</span>
                    <button className="rounded-full border border-white/10 px-3 py-2 text-xs font-bold text-zinc-300">Dodaj</button>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-7 text-zinc-500">
                Sistem naj vsebine samo predlaga. Končno povezavo potrdi ambasador ali admin.
              </p>
            </Section>

            <Section
              eyebrow="13 / Vreme"
              title="Vreme na turi"
              intro="Kasneje se bo vreme vezalo na lokacijo ture, ambasador pa lahko doda praktično opombo."
            >
              <Field label="Lokacija za vreme" placeholder="npr. Areh, Mariborsko Pohorje" maxLength={100} />
              <TextArea label="Opomba glede vremena" placeholder="npr. Po dežju so gozdne ceste mehkejše; poleti je dobro začeti zgodaj." rows={4} maxLength={350} />
            </Section>

            <Section
              eyebrow="14 / eBike"
              title="Bosch Performance Line CX izračun"
              intro="Priporočilo za e-bike uporabnike: baterija, način vožnje in zahtevnost ture."
            >
              <div className="grid gap-4">
                <Field label="Priporočena baterija" placeholder="npr. 625 Wh ali 750 Wh" maxLength={40} />
                <Field label="Način vožnje" placeholder="npr. Eco / Tour / eMTB" maxLength={60} />
              </div>
              <TextArea label="Opomba za e-bike" placeholder="npr. Pri 500 Wh bateriji priporočamo varčen tempo in polnjenje na postanku." rows={4} maxLength={500} />
            </Section>

            <Section
              eyebrow="15 / Galerija"
              title="Utrinki s poti"
              intro="Fotografije naj pokažejo ritem ture: cesta, razgled, postanek, ljudje, pokrajina."
            >
              <div className="rounded-[24px] border border-dashed border-white/15 bg-[#07110b] p-6 text-center">
                <div className="text-xs uppercase tracking-[0.3em] text-[#c58b46]">Galerija</div>
                <div className="mt-3 text-lg font-black text-white">Dodaj slike</div>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
                  Kasneje se slike shranijo v medijsko knjižnico oziroma Supabase Storage.
                </p>
                <button className="mt-5 rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black">Izberi slike</button>
              </div>
            </Section>

            <section className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-6 md:p-7">
              <div className="mb-5 text-xs uppercase tracking-[0.35em] text-[#c58b46]">16 / Predogled in oddaja</div>
              <h2 className="text-2xl font-black tracking-tight text-white">Celoten paket gre v pregled</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Ambasador dokument najprej shrani kot osnutek. Ko je pripravljen, ga odda v uredniški pregled.
                Ponudniki, znamenitosti in doživetja niso obvezni in jih lahko kasneje dopolni admin.
              </p>
              <div className="mt-6 grid gap-3">
                <button className="rounded-full border border-white/10 px-6 py-4 text-sm font-black text-zinc-300">Predogled javne strani</button>
                <button className="rounded-full bg-[#c58b46] px-6 py-4 text-sm font-black text-black">Oddaj v pregled</button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
