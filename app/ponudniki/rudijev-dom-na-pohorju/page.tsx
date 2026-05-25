import SiteHeader from "@/components/SiteHeader";
import LightboxGallery from "@/components/LightboxGallery";
import { getProviderBySlug, hasProviderWebsite } from "@/lib/provider-data";
import { notFound } from "next/navigation";

const provider = getProviderBySlug("rudijev-dom-na-pohorju");

export default function ProviderDetailPage() {
  if (!provider) notFound();

  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <SiteHeader backHref="/ponudniki" active="ponudniki" />

      <section className="relative min-h-[720px] overflow-hidden border-b border-white/10">
        <img
          src={provider.heroImage}
          alt={provider.name}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07110b] via-[#07110b]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07110b] via-transparent to-black/40" />

        <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl flex-col justify-end px-6 pb-20 pt-28">
          <div className="max-w-4xl">
            <div className="text-[10px] font-black uppercase tracking-[0.38em] text-[#c58b46]">
              Bojan on Bike · ponudniki
            </div>

            <h1 className="mt-6 max-w-4xl font-serif text-6xl font-black italic leading-[0.92] tracking-[-0.045em] text-white md:text-8xl">
              {provider.name}
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-200 md:text-xl md:leading-9">
              {provider.story}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {provider.types.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#c58b46]/35 bg-black/25 px-5 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#f4d7ad]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_360px]">
        <div className="space-y-16">
          <section className="grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-start">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
                Kjer se kolesarski dan ustavi
              </div>
              <h2 className="mt-4 font-serif text-4xl font-black italic leading-tight md:text-5xl">
                Postanek, ki ima svoj ritem.
              </h2>
              <p className="mt-7 text-lg leading-9 text-zinc-400">{provider.story}</p>
              <p className="mt-6 text-lg leading-9 text-zinc-400">
                {provider.bikeFriendlyDescription}
              </p>
            </div>

            {provider.quote && (
              <div className="rounded-[28px] border border-[#c58b46]/20 bg-[#0b1a10] p-7">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c58b46]">
                  Zakaj se ustaviti
                </div>
                <p className="mt-5 font-serif text-2xl font-black italic leading-tight text-[#f4d7ad]">
                  "{provider.quote}"
                </p>
                <div className="mt-5 text-sm font-semibold text-zinc-400">
                  Bojan on Bike izbor
                </div>
              </div>
            )}
          </section>

          {provider.features.length > 0 && (
            <section>
              <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
                Kaj te čaka tukaj
              </div>
              <h2 className="mt-4 font-serif text-4xl font-black italic leading-tight md:text-5xl">
                Dober postanek ni naključje.
              </h2>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {provider.features.map((feature) => (
                  <div
                    key={feature.title}
                    className="rounded-[22px] border border-white/10 bg-[#0b1a10] p-5"
                  >
                    <h3 className="font-bold text-[#f4d7ad]">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-zinc-400">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {provider.trails.length > 0 && (
            <section>
              <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
                Ture ob ponudniku
              </div>
              <h2 className="mt-4 font-serif text-4xl font-black italic leading-tight md:text-5xl">
                Katerim turam je ob poti.
              </h2>

              <div className="mt-8 space-y-4">
                {provider.trails.map((trail) => (
                  <a
                    key={trail.name}
                    href={trail.href}
                    className="group flex items-center justify-between gap-5 rounded-[22px] border border-white/10 bg-[#0b1a10] p-5 transition hover:border-[#c58b46]/45"
                  >
                    <div>
                      <div className="font-serif text-2xl font-black italic text-white group-hover:text-[#f4d7ad]">
                        {trail.name}
                      </div>
                      {trail.tone && (
                        <div className="mt-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#c58b46]">
                          {trail.tone}
                        </div>
                      )}
                    </div>
                    <div className="shrink-0 text-right text-sm text-zinc-500">
                      {trail.distance}
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {provider.gallery.length > 0 && (
            <section>
              <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
                Galerija
              </div>
              <h2 className="mt-4 font-serif text-4xl font-black italic leading-tight md:text-5xl">
                {provider.name} v slikah.
              </h2>
              <LightboxGallery images={provider.gallery} altPrefix={provider.name} />
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[28px] border border-[#c58b46]/25 bg-[#0b1a10] p-7">
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
              Kontakt
            </div>

            <div className="mt-6 space-y-4 text-sm">
              {[
                ["Tip", provider.types.join(" · ")],
                ["Regija", provider.region],
                ["Lokacija", provider.address || provider.location],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-5 border-b border-white/10 pb-4">
                  <span className="text-zinc-500">{label}</span>
                  <span className="text-right font-semibold text-[#f4d7ad]">{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3">
              {provider.phone && (
                <a
                  href={`tel:${provider.phone.replace(/\s/g, "")}`}
                  className="rounded-full bg-[#c58b46] px-6 py-4 text-center text-sm font-black text-black transition hover:bg-[#f4d7ad]"
                >
                  Pokliči: {provider.phone}
                </a>
              )}

              {hasProviderWebsite(provider.website) && (
                <a
                  href={provider.website}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[#c58b46]/35 px-6 py-4 text-center text-sm font-bold text-[#f4d7ad] transition hover:border-[#c58b46]"
                >
                  WWW
                </a>
              )}

              <a
                href="/ponudniki"
                className="rounded-full border border-white/10 px-6 py-4 text-center text-sm font-bold text-zinc-300 transition hover:border-[#c58b46]/40"
              >
                Vsi ponudniki
              </a>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
