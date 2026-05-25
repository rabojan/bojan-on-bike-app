import Link from "next/link";

import AdminShell from "@/components/AdminShell";

const ambassadors = [
  {
    name: "Bojan Ratej",
    slug: "bojan-ratej",
    status: "Aktiven",
    role: "Ambasador regije",
    regions: ["Štajerska"],
    place: "Maribor",
    email: "bojan@bojanonbike.si",
    phone: "+386 40 123 456",
    website: "https://bojanonbike.si",
    bio: "Lokalni poznavalec Pohorja, Štajerske, gozdnih poti, razgledov in doživetij ob trasi.",
    story:
      "Bojan pozna gozdne poti, razglede, lokalne ponudnike in izlete, ki imajo pravi občutek regije.",
    publicFeatured: true,
  },
  {
    name: "Maja Kovač",
    slug: "maja-kovac",
    status: "Čaka na objavo",
    role: "Ambasador regije",
    regions: ["Koroška"],
    place: "Slovenj Gradec",
    email: "maja.kovac@bojanonbike.si",
    phone: "+386 41 222 118",
    website: "",
    bio: "Poznavalka mirnih koroških dolin, gozdnih cest, lokalnih postankov in razglednih poti.",
    story:
      "Maja bo pomagala zbirati ture, ponudnike in znamenitosti za Koroško.",
    publicFeatured: false,
  },
  {
    name: "Tomaž Zupan",
    slug: "tomaz-zupan",
    status: "Aktiven",
    role: "TOP ambasador regije",
    regions: ["Gorenjska"],
    place: "Bled",
    email: "tomaz.zupan@bojanonbike.si",
    phone: "+386 31 445 220",
    website: "",
    bio: "Ambasador za alpske razglede, jezera, družinske e-bike izlete in poti ob vodi.",
    story:
      "Tomaž pokriva gorenjske ture ob vodi, razglede in družinske kolesarske dneve.",
    publicFeatured: true,
  },
  {
    name: "Nina Furlan",
    slug: "nina-furlan",
    status: "Čaka na objavo",
    role: "Ambasador regije",
    regions: ["Primorska"],
    place: "Vipava",
    email: "nina.furlan@bojanonbike.si",
    phone: "+386 51 730 884",
    website: "",
    bio: "Lokalna poznavalka Krasa, Vipavske doline, sončnih gravel poti in kulinaričnih postankov.",
    story:
      "Nina bo pokrivala primorske razglede, kulinariko in sončne gravel poti.",
    publicFeatured: false,
  },
  {
    name: "Rok Mlakar",
    slug: "rok-mlakar",
    status: "Čaka na objavo",
    role: "Ambasador regije",
    regions: ["Notranjska"],
    place: "Cerknica",
    email: "rok.mlakar@bojanonbike.si",
    phone: "+386 40 661 905",
    website: "",
    bio: "Ambasador za jezera, kraške posebnosti, gozdne poti in mirnejše raziskovalne ture.",
    story:
      "Rok bo urejal vsebine za Notranjsko, kraške posebnosti in mirne ture.",
    publicFeatured: false,
  },
  {
    name: "Petra Novak",
    slug: "petra-novak",
    status: "Čaka na objavo",
    role: "Ambasador regije",
    regions: ["Dolenjska"],
    place: "Novo mesto",
    email: "petra.novak@bojanonbike.si",
    phone: "+386 41 908 337",
    website: "",
    bio: "Poznavalka dolenjskih gričev, rečnih poti, zidanic, kulinarike in lahkotnih kolesarskih dni.",
    story:
      "Petra bo skrbela za dolenjske vinske poti, družinske ture in lokalne postanke.",
    publicFeatured: false,
  },
  {
    name: "Matej Horvat",
    slug: "matej-horvat",
    status: "Čaka na objavo",
    role: "Ambasador regije",
    regions: ["Prekmurje"],
    place: "Murska Sobota",
    email: "matej.horvat@bojanonbike.si",
    phone: "+386 30 714 552",
    website: "",
    bio: "Ambasador za odprte horizonte, Muro, Goričko, ravninske poti in družinska e-bike doživetja.",
    story:
      "Matej bo pokrival Prekmurje, lahkotne ture, termalne kraje in družinska doživetja.",
    publicFeatured: false,
  },
];

const regions = [
  "Štajerska",
  "Koroška",
  "Gorenjska",
  "Primorska",
  "Notranjska",
  "Dolenjska",
  "Prekmurje",
];

export function generateStaticParams() {
  return ambassadors.map((ambassador) => ({ slug: ambassador.slug }));
}

export default async function EditAmbassadorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ambassador =
    ambassadors.find((item) => item.slug === slug) ?? ambassadors[0];

  return (
    <AdminShell active="ambasadorji">
      <div className="space-y-8">
        <section className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-8 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Admin / Ambasadorji / Uredi ambasadorja
            </p>
            <h1 className="text-4xl font-black tracking-tight text-white">
              Uredi ambasadorja: {ambassador.name}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400">
              Tukaj lahko spremeniš profil ambasadorja, njegove regije,
              kontaktne podatke, vlogo in javno izpostavitev.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
            <Link
              href="/admin/ambasadorji"
              className="rounded-full border border-white/10 px-6 py-4 text-sm font-bold text-zinc-200"
            >
              ← Nazaj na ambasadorje
            </Link>

            <button className="rounded-full bg-[#c58b46] px-6 py-4 text-sm font-bold text-black">
              Shrani spremembe
            </button>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <div className="space-y-6">
            <section className="rounded-[28px] border border-white/10 bg-black/20 p-6">
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Osnovni podatki
              </p>

              <div className="grid gap-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-zinc-300">
                    Ime in priimek *
                  </span>
                  <input
                    defaultValue={ambassador.name}
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                  />
                </label>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-zinc-300">
                      Kraj *
                    </span>
                    <input
                      defaultValue={ambassador.place}
                      className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-zinc-300">
                      Status *
                    </span>
                    <select
                      defaultValue={ambassador.status}
                      className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                    >
                      <option>Čaka na objavo</option>
                      <option>Aktiven</option>
                      <option>Začasno neaktiven</option>
                      <option>Arhiviran</option>
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-zinc-300">
                    Kratek opis ambasadorja *
                  </span>
                  <textarea
                    defaultValue={ambassador.bio}
                    className="min-h-36 w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-zinc-300">
                    Daljši opis / zgodba ambasadorja
                  </span>
                  <textarea
                    defaultValue={ambassador.story}
                    className="min-h-48 w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-black/20 p-6">
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Kontakt
              </p>

              <div className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-zinc-300">
                      Email *
                    </span>
                    <input
                      type="email"
                      defaultValue={ambassador.email}
                      className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-zinc-300">
                      Telefon
                    </span>
                    <input
                      defaultValue={ambassador.phone}
                      className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-zinc-300">
                    Spletna stran / profil
                  </span>
                  <input
                    defaultValue={ambassador.website}
                    className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-black/20 p-6">
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Fotografija ambasadorja
              </p>

              <div className="rounded-[24px] border border-dashed border-white/15 bg-[#07110b] p-8 text-center">
                <div className="text-5xl">👤</div>
                <h2 className="mt-4 text-2xl font-black text-white">
                  Zamenjaj portret ambasadorja
                </h2>

                <label className="mt-6 inline-flex cursor-pointer rounded-full bg-[#c58b46] px-8 py-4 text-sm font-bold text-black transition hover:bg-[#d9a35d]">
                  Izberi sliko
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                  />
                </label>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Regije delovanja
              </p>

              <div className="grid gap-3">
                {regions.map((region) => {
                  const checked = ambassador.regions.includes(region);

                  return (
                    <label
                      key={region}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#07110b] p-4 text-sm font-bold text-zinc-300"
                    >
                      <input type="checkbox" defaultChecked={checked} />
                      {region}
                    </label>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl border border-[#c58b46]/20 bg-[#c58b46]/10 p-4 text-sm leading-7 text-zinc-300">
                Ambasador lahko pokriva eno ali več regij. Kasneje bo dostop
                omejen samo na izbrane regije.
              </div>
            </section>

            <section className="rounded-[28px] border border-[#c58b46]/25 bg-[#0b1a10] p-6">
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                TOP ambasador
              </p>

              {/* Stats summary */}
              <div className="mb-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {[
                  { value: ambassador.role === "TOP ambasador regije" ? 31 : 7, label: "ture" },
                  { value: 3, label: "ponudniki" },
                  { value: 2, label: "doživetja" },
                  { value: 3, label: "znamenitosti" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-white/10 bg-[#07110b] p-3 text-center">
                    <div className="text-2xl font-black">{s.value}</div>
                    <div className="mt-0.5 text-xs text-zinc-500">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div className="mb-5">
                <div className="mb-1.5 flex justify-between text-xs text-zinc-500">
                  <span>Napredek do TOP ({30} tur)</span>
                  <span className="font-bold">
                    {ambassador.role === "TOP ambasador regije" ? 31 : 7} / 30
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-black/40">
                  <div
                    className="h-full rounded-full bg-[#c58b46]"
                    style={{ width: ambassador.role === "TOP ambasador regije" ? "100%" : "23%" }}
                  />
                </div>
              </div>

              <div className="grid gap-3">
                <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#07110b] p-4 text-sm font-bold text-zinc-300 transition hover:border-white/20">
                  <input
                    type="radio"
                    name="ambassadorRole"
                    defaultChecked={ambassador.role === "Ambasador regije"}
                    className="mt-1"
                  />
                  <span>
                    Ambasador regije
                    <span className="mt-1 block text-xs font-normal leading-5 text-zinc-500">
                      Osnovna vloga — brez posebne oznake.
                    </span>
                  </span>
                </label>

                <label className={`flex items-start gap-3 rounded-2xl border p-4 text-sm font-bold transition ${ambassador.role === "TOP ambasador regije" ? "border-[#c58b46]/50 bg-[#c58b46]/10 text-[#f4d7ad]" : "border-white/10 bg-[#07110b] text-zinc-300 hover:border-[#c58b46]/30"}`}>
                  <input
                    type="radio"
                    name="ambassadorRole"
                    defaultChecked={ambassador.role === "TOP ambasador regije"}
                    className="mt-1"
                  />
                  <span>
                    ★ TOP ambasador regije
                    <span className="mt-1 block text-xs font-normal leading-5 text-zinc-500">
                      Posebna oznaka — vklopi ročno ko ambasador doseže 30 objavljenih tur.
                    </span>
                  </span>
                </label>
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Javna izpostavitev
              </p>

              <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#07110b] p-4 text-sm font-bold text-zinc-300">
                <input
                  type="checkbox"
                  defaultChecked={ambassador.publicFeatured}
                  className="mt-1"
                />
                <span>
                  Prikaži ambasadorja javno pri izbranih regijah
                  <span className="mt-1 block text-xs font-normal leading-5 text-zinc-500">
                    Če je označeno, se lahko ambasador prikaže na javni strani
                    regije ali pri izbranih turah.
                  </span>
                </span>
              </label>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-[#0b1a10] p-6">
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Uporabniški dostop
              </p>

              <div className="grid gap-5">
                <input
                  type="email"
                  defaultValue={ambassador.email}
                  className="w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none"
                />

                <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#07110b] p-4 text-sm font-bold text-zinc-300">
                  <input type="checkbox" className="mt-1" />
                  Uredi uporabniški dostop kasneje prek Supabase Auth
                </label>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-zinc-500">
                  Pravi login, pravice in omejitev na regije bomo povezali
                  kasneje, ko bomo uredili Supabase Auth in Row Level Security.
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
