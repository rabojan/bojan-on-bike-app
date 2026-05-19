import Link from "next/link";

import AdminShell from "@/components/AdminShell";

const providers = [
  {
    name: "Rudijev dom na Pohorju",
    slug: "rudijev-dom-na-pohorju",
    status: "Objavljeno",
    type: "Kulinarika / Prenočišče",
    region: "Štajerska",
    location: "Pohorje",
    phone: "+386 40 123 456",
    website: "rudijev-dom.si",
    partner: true,
    charging: true,
    trails: ["Gozdni flow nad Mariborom", "Pohorski razgledi"],
    updated: "Danes",
  },
  {
    name: "Gorska hiša Pohorje",
    slug: "gorska-hisa-pohorje",
    status: "Objavljeno",
    type: "Prenočišče / Kulinarika",
    region: "Štajerska",
    location: "Pohorje",
    phone: "+386 41 222 333",
    website: "gorska-hisa.si",
    partner: false,
    charging: true,
    trails: ["Gozdni flow nad Mariborom"],
    updated: "Včeraj",
  },
  {
    name: "Vinska klet med griči",
    slug: "vinska-klet-med-grici",
    status: "Čaka na objavo",
    type: "Vino / Kulinarika",
    region: "Štajerska",
    location: "Slovenske gorice",
    phone: "+386 31 444 555",
    website: "vinskaklet.si",
    partner: false,
    charging: false,
    trails: ["Med vinogradi in griči"],
    updated: "Čaka na objavo",
  },
];

export default function AdminProvidersPage() {
  return (
    <AdminShell active="ponudniki">
      <div className="space-y-8">
        <section className="flex flex-col gap-5 rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Admin / Ponudniki
            </div>

            <h1 className="mt-4 text-4xl font-black">Upravljanje ponudnikov</h1>

            <p className="mt-5 max-w-3xl leading-8 text-zinc-400">
              Tukaj boš urejal lokalne ponudnike, kontakte, lokacijo,
              e-bike polnilnico, povezane ture in status partnerstva.
            </p>
          </div>

          <Link
            href="/admin/ponudniki/nov"
            className="rounded-full bg-[#c58b46] px-6 py-4 text-sm font-bold text-black"
          >
            + Dodaj ponudnika
          </Link>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-4xl font-black">3</div>
            <div className="mt-2 text-sm text-zinc-400">vsi ponudniki</div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-4xl font-black">2</div>
            <div className="mt-2 text-sm text-zinc-400">objavljena</div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-4xl font-black">1</div>
            <div className="mt-2 text-sm text-zinc-400">čaka na objavo</div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-4xl font-black">2</div>
            <div className="mt-2 text-sm text-zinc-400">e-bike polnilnici</div>
          </div>
        </section>

        <section className="grid gap-5">
          {providers.map((provider) => (
            <article
              key={provider.slug}
              className="rounded-[32px] border border-white/10 bg-black/20 p-6"
            >
              <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-4 py-2 text-xs font-bold ${
                        provider.status === "Objavljeno"
                          ? "bg-emerald-500/10 text-emerald-300"
                          : "bg-yellow-500/10 text-yellow-300"
                      }`}
                    >
                      {provider.status}
                    </span>

                    <span className="rounded-full border border-white/10 bg-[#07110b] px-4 py-2 text-xs text-zinc-300">
                      {provider.type}
                    </span>

                    <span className="rounded-full border border-white/10 bg-[#07110b] px-4 py-2 text-xs text-zinc-300">
                      {provider.region}
                    </span>

                    {provider.partner && (
                      <span className="rounded-full border border-[#c58b46]/40 bg-[#c58b46]/10 px-4 py-2 text-xs font-bold text-[#f4d7ad]">
                        Partner
                      </span>
                    )}

                    {provider.charging && (
                      <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-300">
                        e-bike polnilnica
                      </span>
                    )}
                  </div>

                  <h2 className="text-3xl font-black">{provider.name}</h2>

                  <div className="mt-5 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-[#07110b] p-4">
                      <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                        Lokacija
                      </div>
                      <div className="mt-2 font-bold">{provider.location}</div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#07110b] p-4">
                      <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                        Telefon
                      </div>
                      <div className="mt-2 font-bold">{provider.phone}</div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#07110b] p-4">
                      <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                        Spletna stran
                      </div>
                      <div className="mt-2 font-bold">{provider.website}</div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#07110b] p-4">
                      <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                        Zadnja sprememba
                      </div>
                      <div className="mt-2 font-bold">{provider.updated}</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-[#07110b] p-5">
                  <div className="mb-4 text-xs uppercase tracking-[0.25em] text-[#c58b46]">
                    Povezane ture
                  </div>

                  <div className="space-y-3">
                    {provider.trails.map((trail) => (
                      <div
                        key={trail}
                        className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-bold"
                      >
                        {trail}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={`/admin/ponudniki/${provider.slug}`}
                      className="rounded-full bg-[#c58b46] px-5 py-3 text-sm font-bold text-black"
                    >
                      Uredi
                    </Link>

                    <Link
                      href="/ponudniki"
                      className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300"
                    >
                      Predogled
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </AdminShell>
  );
}
