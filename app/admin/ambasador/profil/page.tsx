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

function Field({
  label,
  placeholder,
  value,
}: {
  label: string;
  placeholder: string;
  value?: string;
}) {
  return (
    <label className="block text-sm font-bold text-zinc-200">
      <span>{label}</span>

      <input
        defaultValue={value}
        placeholder={placeholder}
        className="mt-2 h-[56px] w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 text-white outline-none placeholder:text-zinc-600"
      />
    </label>
  );
}

function TextArea({
  label,
  placeholder,
  value,
}: {
  label: string;
  placeholder: string;
  value?: string;
}) {
  return (
    <label className="block text-sm font-bold text-zinc-200">
      <span>{label}</span>

      <textarea
        rows={6}
        defaultValue={value}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 py-4 text-white outline-none placeholder:text-zinc-600"
      />

      <div className="mt-2 text-right text-xs font-medium text-zinc-600">
        0 / 300
      </div>
    </label>
  );
}

export default function AmbassadorProfilePage() {
  return (
    <AdminShell active="ambasadorji">
      <div className="space-y-8">
        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Ambasadorski profil
              </div>

              <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
                Uredi svoj profil
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400">
                Tukaj urediš podatke, ki se uporabljajo pri tvojih predlogih in
                objavljenih turah. Profil naj ostane preprost, jasen in povezan
                s tvojo lokalno kolesarsko zgodbo.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/ambasador/koticek"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300"
              >
                ← Nazaj v kotiček
              </Link>

              <button className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black">
                Shrani profil
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[32px] border border-white/10 bg-[#07110b] p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-[#c58b46]">
              Javna podoba
            </div>

            <div className="mt-6 flex flex-col items-center rounded-[28px] border border-white/10 bg-black/20 p-6 text-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-[32px] border border-white/10 bg-[#0b1a10] text-5xl">
                🚴
              </div>

              <h2 className="mt-5 text-2xl font-black text-white">
                Bojan Ratej
              </h2>

              <p className="mt-2 text-sm font-semibold text-zinc-400">
                Ambasador Štajerske
              </p>

              <p className="mt-5 max-w-sm text-sm leading-7 text-zinc-500">
                Lokalni kolesar, ki rad poveže dobro traso, lep razgled in
                postanek, ki naredi dan boljši.
              </p>

              <label className="mt-6 inline-flex cursor-pointer rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300">
                Zamenjaj sliko
                <input type="file" className="hidden" />
              </label>
            </div>

            <div className="mt-5 rounded-2xl border border-[#c58b46]/20 bg-[#c58b46]/10 p-4 text-sm leading-7 text-zinc-300">
              Ta profil se prikaže ob tvojih objavljenih turah in pomaga
              obiskovalcem razumeti, kdo stoji za predlogom.
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-[#07110b] p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-[#c58b46]">
              Podatki profila
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field
                label="Ime in priimek"
                placeholder="npr. Bojan Ratej"
                value="Bojan Ratej"
              />

              <Field
                label="Email"
                placeholder="npr. ime@email.si"
                value="bojan@email.si"
              />

              <label className="block text-sm font-bold text-zinc-200">
                <span>Regija ambasadorja</span>

                <select
                  defaultValue="Štajerska"
                  className="mt-2 h-[56px] w-full rounded-2xl border border-white/10 bg-[#07110b] px-4 text-white outline-none"
                >
                  {regions.map((region) => (
                    <option key={region}>{region}</option>
                  ))}
                </select>
              </label>

              <Field
                label="Kraj / območje"
                placeholder="npr. Maribor, Pohorje"
                value="Maribor, Pohorje"
              />

              <div className="md:col-span-2">
                <TextArea
                  label="Kratek opis"
                  placeholder="Na kratko povej, kakšne ture najraje predlagaš in zakaj."
                  value="Lokalni kolesar, ki rad poveže dobro traso, lep razgled in postanek, ki naredi dan boljši."
                />
              </div>
            </div>

            <div className="mt-7 grid gap-4 rounded-[28px] border border-white/10 bg-black/20 p-5 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h3 className="text-xl font-black text-white">
                  Tvoje ture ostanejo povezane s teboj.
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-500">
                  Sprememba profila ne spremeni vsebine že objavljenih tur, ampak
                  posodobi tvoj prikaz kot ambasadorja.
                </p>
              </div>

              <button className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black">
                Shrani profil
              </button>
            </div>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
