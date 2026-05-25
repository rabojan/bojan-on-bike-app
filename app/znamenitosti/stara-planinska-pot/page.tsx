import Link from "next/link";

import SiteHeader from "@/components/SiteHeader";

const attraction = {
  name: "Stara planinska pot",
  region: "Štajerska",
  area: "Pohorje",
  type: ["Zgodovina", "Kultura"],
  image: "/hero-stara-planinska-pot.png",
  shortDescription:
    "Stara pot z lokalno zgodbo, ki turi doda občutek prostora, časa in povezave z ljudmi, ki so te kraje uporabljali pred nami.",
  story:
    "Preden so bila kolesa, so bili hodniki. In preden so bili hodniki, so bile poti — takšne kot ta. Stara planinska pot na Pohorju ni le kolesarska trasa, ampak spomin na čas, ko so te gozdove prehodili pastirji, oglarji in romarji. Ko pelješ po njej, občutiš drugačno težo prostora. Ni samo trail — je kos živega arhiva. Vsak zavoj ima svojo zgodbo, vsak kamen je morda ležal tu že sto let. Za tiste, ki iščejo več kot le gibanje, je ta pot eden od redkih krajev, kjer kolesarjenje postane tudi razmišljanje.",
  locationDescription:
    "Pot poteka po vzhodnem delu Pohorja, med gozdovi nad Mariborom. Dostopna je z odcepa od glavne trase — kratek odklon, ki prinese popolnoma drugačno vzdušje od sodobnih poti.",
  latitude: "46.5118",
  longitude: "15.6012",
  distanceFromRoute: "700 m od trase",
  visitNote:
    "Priporoča se obisk v mirnejšem letnem času — spomladi ali jeseni, ko je na poti malo kolesarjev. Pot ni zahtevna, a zahteva pozornost: podlaga je starejša in manj utrjena kot sodobne gozdne poti.",
  wikipediaUrl: "https://sl.wikipedia.org/wiki/Pohorje",
  googleMapsUrl: "https://maps.google.com/?q=46.5118,15.6012",
  trails: [
    {
      title: "Gozdni flow nad Mariborom",
      href: "/ture/gozdni-flow-nad-mariborom",
      distance: "700 m od trase",
      role: "Kulturni / zgodovinski odmik",
      description:
        "Kratek odmik od glavne trase, ki turi doda zgodbo kraja in občutek poti, ki ni nastala včeraj. Za tiste, ki iščejo več od samih kilometrov.",
    },
  ],
};

export default function AttractionDetailPage() {
  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/znamenitosti" active="znamenitosti" />

      <section className="relative flex min-h-[720px] items-end overflow-hidden pt-24">
        <img
          src={attraction.image}
          alt={attraction.name}
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#07110b]/50 to-[#07110b]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 md:px-6 md:pb-24">
          <div className="max-w-4xl">
            <div className="mb-5 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              {attraction.region} · {attraction.area}
            </div>

            <h1 className="font-serif text-5xl font-black italic leading-[0.92] tracking-[-0.045em] md:text-7xl">
              {attraction.name}
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-200 md:text-xl">
              {attraction.shortDescription}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {attraction.type.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#c58b46]/35 bg-black/25 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#f4d7ad]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-[1fr_0.75fr] md:px-6">
        <div className="space-y-8">
          <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:p-10">
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Zakaj se ustaviti
            </div>

            <h2 className="mt-5 font-serif text-4xl font-black italic leading-tight">
              Pot, ki ima spomin.
            </h2>

            <p className="mt-6 text-lg leading-9 text-zinc-300">
              {attraction.story}
            </p>
          </section>

          <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:p-10">
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Lokacija
            </div>

            <h2 className="mt-5 font-serif text-4xl font-black italic">Kje je ta točka?</h2>

            <p className="mt-6 text-lg leading-9 text-zinc-300">
              {attraction.locationDescription}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Latitude
                </div>
                <div className="mt-2 text-xl font-black">
                  {attraction.latitude}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Longitude
                </div>
                <div className="mt-2 text-xl font-black">
                  {attraction.longitude}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Od trase
                </div>
                <div className="mt-2 text-xl font-black">
                  {attraction.distanceFromRoute}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={attraction.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#c58b46] px-6 py-4 text-sm font-black text-black"
              >
                Odpri v Google Maps
              </a>

              <a
                href={attraction.wikipediaUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm font-black text-white"
              >
                Preberi več na Wikipediji
              </a>
            </div>
          </section>

          <section className="rounded-[36px] border border-white/10 bg-[#0b1a10] p-8 md:p-10">
            <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
              Namig za obisk
            </div>

            <p className="mt-5 text-lg leading-9 text-zinc-300">
              {attraction.visitNote}
            </p>
          </section>
        </div>

        <aside className="space-y-5">
          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Regija
            </div>
            <div className="mt-2 text-2xl font-black">{attraction.region}</div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Območje
            </div>
            <div className="mt-2 text-2xl font-black">{attraction.area}</div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Tip
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {attraction.type.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-[#07110b] px-3 py-1.5 text-sm text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Oddaljenost od trase
            </div>
            <div className="mt-2 text-2xl font-black">
              {attraction.distanceFromRoute}
            </div>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-6 md:pb-28">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.35em] text-[#c58b46]">
            Ture ob tej znamenitosti
          </div>

          <h2 className="mt-4 font-serif text-4xl font-black italic">
            Poti, ki peljejo mimo.
          </h2>
        </div>

        <div className="space-y-5">
          {attraction.trails.map((trail) => (
            <article
              key={trail.title}
              className="rounded-[32px] border border-white/10 bg-[#0b1a10] p-6 md:p-8"
            >
              <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <div className="text-sm text-zinc-500">
                    {trail.distance} · {trail.role}
                  </div>

                  <h3 className="mt-2 font-serif text-3xl font-black italic">{trail.title}</h3>

                  <p className="mt-4 max-w-2xl leading-8 text-zinc-300">
                    {trail.description}
                  </p>
                </div>

                <Link
                  href={trail.href}
                  className="inline-flex justify-center rounded-full bg-[#c58b46] px-6 py-4 text-sm font-black text-black"
                >
                  Oglej si turo
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
