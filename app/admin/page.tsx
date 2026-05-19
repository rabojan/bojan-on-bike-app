import Link from "next/link";

import AdminShell from "@/components/AdminShell";

const attentionItems = [
  {
    value: "6",
    label: "v pregledu",
    text: "predlogi, ki čakajo na tvojo odločitev",
    href: "/admin/v-pregled",
  },
  {
    value: "3",
    label: "predlogi tur",
    text: "nove ture, poslane od ambasadorjev",
    href: "/admin/v-pregled",
  },
  {
    value: "2",
    label: "nove vsebine",
    text: "ponudniki ali znamenitosti za preverjanje",
    href: "/admin/v-pregled",
  },
  {
    value: "1",
    label: "popravek",
    text: "predlagana sprememba objavljene ture",
    href: "/admin/v-pregled",
  },
];

const modules = [
  {
    title: "Ture",
    description: "Objavljene ture, osnutki, GPX, podlaga, galerija in javni prikaz.",
    stats: "3 objavljene · 2 osnutka · 3 čakajo",
    href: "/admin/ture",
    addHref: "/admin/ture/nova",
    addLabel: "Dodaj turo",
  },
  {
    title: "Ponudniki",
    description: "Kulinarika, vino, prenočišča, servis, polnilnice in postanki ob trasi.",
    stats: "3 ponudniki · 2 predloga",
    href: "/admin/ponudniki",
    addHref: "/admin/ponudniki/nov",
    addLabel: "Dodaj ponudnika",
  },
  {
    title: "Znamenitosti",
    description: "Razgledi, naravne točke, kulturni kraji in posebnosti ob poti.",
    stats: "3 znamenitosti · 1 nova",
    href: "/admin/znamenitosti",
    addHref: "/admin/znamenitosti/nova",
    addLabel: "Dodaj znamenitost",
  },
  {
    title: "Doživetja",
    description: "Doživljajski dnevi, vinske poti, družinski izleti in posebne zgodbe.",
    stats: "3 doživetja · 1 v pripravi",
    href: "/admin/dozivetja",
    addHref: "/admin/dozivetja/novo",
    addLabel: "Dodaj doživetje",
  },
  {
    title: "Regije",
    description: "Pokrajine, lokalna območja in povezave s turami ter ambasadorji.",
    stats: "7 regij",
    href: "/admin/regije",
    addHref: "/admin/regije/nova",
    addLabel: "Dodaj regijo",
  },
  {
    title: "Ambasadorji",
    description: "Lokalni avtorji tur, profili, regije, statusi in napredek do TOP oznake.",
    stats: "7 ambasadorjev · 3 aktivni predlogi",
    href: "/admin/ambasadorji",
    addHref: "/admin/ambasadorji/nov",
    addLabel: "Dodaj ambasadorja",
  },
];

const ambassadorLinks = [
  {
    title: "Ambasadorski kotiček",
    text: "Pogled, ki ga vidi prijavljeni ambasador.",
    href: "/admin/ambasador/koticek",
  },
  {
    title: "Moje ture",
    text: "Pregled ambasadorjevih predlogov in statusov.",
    href: "/admin/ambasador/ture",
  },
  {
    title: "Uredi profil",
    text: "Podatki, regija, opis in javna podoba ambasadorja.",
    href: "/admin/ambasador/profil",
  },
  {
    title: "Nov predlog ture",
    text: "Obrazec za prijavljenega ambasadorja.",
    href: "/admin/predlog-ture/nova",
  },
];

const activities = [
  "Bojan Ratej je poslal predlog ture Pohorski veliki krog do Areha.",
  "Bar Miško je bil predlagan kot nov ponudnik ob trasi.",
  "Maja Kovač je dodala novo razgledno točko na Gorenjskem.",
  "Pri turi Gozdni flow nad Mariborom je predlagan manjši popravek opisa.",
];

function AttentionCard({
  value,
  label,
  text,
  href,
}: {
  value: string;
  label: string;
  text: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex min-h-[160px] flex-col justify-between rounded-[28px] border border-white/10 bg-[#07110b] p-5 transition hover:border-[#c58b46]/40"
    >
      <div>
        <div className="text-5xl font-black leading-none text-white">{value}</div>
        <div className="mt-3 text-base font-black text-white">{label}</div>
      </div>

      <p className="mt-4 text-sm leading-6 text-zinc-500">{text}</p>
    </Link>
  );
}

function ModuleCard({
  title,
  description,
  stats,
  href,
  addHref,
  addLabel,
}: {
  title: string;
  description: string;
  stats: string;
  href: string;
  addHref: string;
  addLabel: string;
}) {
  return (
    <div className="flex min-h-[280px] flex-col justify-between rounded-[30px] border border-white/10 bg-[#07110b] p-6">
      <div>
        <div className="text-xs uppercase tracking-[0.3em] text-[#c58b46]">
          Modul
        </div>

        <h3 className="mt-4 text-2xl font-black text-white">{title}</h3>

        <p className="mt-3 text-sm leading-7 text-zinc-500">{description}</p>

        <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-bold text-zinc-300">
          {stats}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={href}
          className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300"
        >
          Odpri modul
        </Link>

        <Link
          href={addHref}
          className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-black text-black"
        >
          {addLabel}
        </Link>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminShell active="pregled">
      <div className="space-y-8">
        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 xl:grid-cols-[1fr_auto] xl:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Bojanova pisarna
              </div>

              <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-white md:text-5xl">
                Centralna nadzorna plošča.
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400">
                Tukaj vidiš, kaj potrebuje tvojo pozornost, in od tukaj prideš
                do vseh glavnih delov platforme: tur, ponudnikov, znamenitosti,
                doživetij, regij, ambasadorjev in uredniškega pregleda.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/v-pregled"
                className="rounded-full bg-[#c58b46] px-6 py-3 text-sm font-black text-black"
              >
                Odpri v pregled
              </Link>

              <Link
                href="/predlagaj-turo"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300"
              >
                Javna stran predloga
              </Link>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Najprej poglej
              </div>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-white">
                Kaj potrebuje tvojo pozornost?
              </h2>
            </div>

            <Link
              href="/admin/v-pregled"
              className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300"
            >
              Vse v pregledu
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {attentionItems.map((item) => (
              <AttentionCard key={item.label} {...item} />
            ))}
          </div>
        </section>

        <section className="rounded-[36px] border border-[#c58b46]/20 bg-[#c58b46]/10 p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Uredniški inbox
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-white">
                Predlogi, ki čakajo na tvojo odločitev.
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-300">
                Tukaj pridejo predlogi tur, novi ponudniki, znamenitosti in
                popravki. Odpreš jih, preveriš in se odločiš: objavi, vrni v
                dopolnitev ali arhiviraj.
              </p>
            </div>

            <Link
              href="/admin/v-pregled"
              className="rounded-full bg-[#c58b46] px-7 py-4 text-sm font-black text-black"
            >
              Odpri uredniški pregled
            </Link>
          </div>
        </section>

        <section>
          <div className="mb-5">
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Glavni moduli
            </div>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-white">
              Vse, kar urejaš na platformi.
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">
              Vsak modul ima svoj pregled in svoj vnos. Admin stran je samo
              tvoja delovna miza, iz katere hitro prideš do pravega dela.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {modules.map((module) => (
              <ModuleCard key={module.title} {...module} />
            ))}
          </div>
        </section>

        <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
                Ambasadorski sistem
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-white">
                Pogled za ljudi, ki predlagajo ture.
              </h2>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Tukaj hitro odpreš prototipne strani, ki jih uporabljajo
                ambasadorji: njihov kotiček, profil, pregled tur in obrazec za
                novo turo.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {ambassadorLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="rounded-[24px] border border-white/10 bg-black/20 p-5 transition hover:border-[#c58b46]/40"
                >
                  <div className="text-lg font-black text-white">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    {item.text}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Zadnje aktivnosti
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-white">
              Kaj se je nazadnje zgodilo?
            </h2>

            <div className="mt-6 grid gap-3">
              {activities.map((activity) => (
                <div
                  key={activity}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-zinc-300"
                >
                  {activity}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-6 md:p-8">
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Hitri vnosi
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-white">
              Dodaj novo.
            </h2>

            <div className="mt-6 grid gap-3">
              {[
                ["Nova tura", "/admin/ture/nova"],
                ["Nov ponudnik", "/admin/ponudniki/nov"],
                ["Nova znamenitost", "/admin/znamenitosti/nova"],
                ["Novo doživetje", "/admin/dozivetja/novo"],
                ["Nova regija", "/admin/regije/nova"],
                ["Nov ambasador", "/admin/ambasadorji/nov"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40"
                >
                  + {label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
