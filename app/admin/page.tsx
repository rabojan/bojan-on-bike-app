import Link from "next/link";

import AdminShell from "@/components/AdminShell";

const stats = [
  { label: "Objavljene ture", value: "3", note: "katalog tur" },
  { label: "Doživetja", value: "3", note: "v pripravi" },
  { label: "Ponudniki", value: "3", note: "lokalni ekosistem" },
  { label: "V pregled", value: "0", note: "ambasadorji kasneje" },
];

const quickActions = [
  {
    title: "Dodaj novo turo",
    text: "Naslov, GPX, slike, podlaga, zgodba, ponudniki in znamenitosti.",
    tag: "Ture",
    href: "/admin/ture",
  },
  {
    title: "Dodaj doživetje",
    text: "Vinska pot, družinski dan, kulinarični vikend ali večdnevna avantura.",
    tag: "Doživetja",
    href: "/admin/dozivetja",
  },
  {
    title: "Dodaj ponudnika",
    text: "Kulinarika, vino, prenočišče, kontakt, lokacija in e-bike polnilnica.",
    tag: "Ponudniki",
    href: "/admin/ponudniki",
  },
  {
    title: "Dodaj znamenitost",
    text: "Razgled, narava, zgodovina, kultura, Wikipedia povezava in lokacija.",
    tag: "POI",
    href: "/admin/znamenitosti",
  },
];

const reviewFlow = [
  "Osnutek",
  "Oddano v pregled",
  "Potrebni popravki",
  "Objavljeno",
  "Arhivirano",
];

export default function AdminPage() {
  return (
    <AdminShell active="pregled">
      <div className="space-y-8">
        <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-8">
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Pregled platforme
            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight">
              Tukaj nastaja Bojan on Bike.
            </h1>

            <p className="mt-6 leading-8 text-zinc-400">
              To je tvoj uredniški center za ture, doživetja, ponudnike,
              znamenitosti, regije in kasneje ambasadorje. Admin je zastavljen
              kot sistem za premium vsebine, ne kot navadna baza vnosov.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[28px] border border-white/10 bg-black/20 p-6"
              >
                <div className="text-4xl font-black">{stat.value}</div>
                <div className="mt-3 font-bold">{stat.label}</div>
                <div className="mt-2 text-sm text-zinc-500">{stat.note}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6">
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Hitri vnos
            </div>
            <h2 className="mt-3 text-3xl font-black">Kaj želiš dodati?</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-[28px] border border-white/10 bg-[#0b1a10] p-6 transition hover:border-[#c58b46]/40"
              >
                <div className="mb-5 inline-flex rounded-full border border-[#c58b46]/30 bg-[#c58b46]/10 px-3 py-1.5 text-xs font-semibold text-[#f4d7ad]">
                  {action.tag}
                </div>

                <h3 className="text-2xl font-black">{action.title}</h3>

                <p className="mt-4 leading-7 text-zinc-400">{action.text}</p>

                <div className="mt-6 text-sm font-bold text-[#c58b46]">
                  Odpri modul →
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-black/20 p-7">
          <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
            Uredniški tok
          </div>

          <h2 className="mt-4 text-3xl font-black">
            Pripravljeno za ambasadorje regij.
          </h2>

          <p className="mt-5 max-w-4xl leading-8 text-zinc-400">
            Ko bodo kasneje vsebine dodajali ambasadorji, ne bodo šle takoj na
            javno stran. Najprej bodo šle v pregled, ti pa boš odločil, ali se
            objavijo, vrnejo v popravke ali arhivirajo.
          </p>

          <div className="mt-7 grid gap-3 md:grid-cols-5">
            {reviewFlow.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-[#07110b] p-4 text-sm font-semibold text-zinc-300"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
