const galleryImages = [
  "https://images.unsplash.com/photo-1669372701525-06dde0779ba6?auto=format&fit=crop&q=85&w=1200",
  "https://images.unsplash.com/photo-1544191696-102dbdaeeaa5?auto=format&fit=crop&q=85&w=1200",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=85&w=1200",
  "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&q=85&w=1200",
];

function SurfaceBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-zinc-400">{label}</span>
        <span className="font-semibold">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[#c58b46]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function TrailDetailPage() {
  return (
    <main className="min-h-screen bg-[#07110b] text-white">
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#07110b]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <a href="/" className="text-lg font-bold tracking-wide">
            Bojan on Bike
          </a>

          <nav className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
            <a href="/ture" className="transition hover:text-white">
              Ture
            </a>
            <a href="/#dozivetja" className="transition hover:text-white">
              Doživetja
            </a>
            <a href="#" className="transition hover:text-white">
              Ponudniki
            </a>
          </nav>
        </div>
      </header>

      <section className="relative flex min-h-[720px] items-end overflow-hidden px-5 pb-16 pt-24">
        <img
          src="https://images.unsplash.com/photo-1669372701525-06dde0779ba6?auto=format&fit=crop&q=85&w=2600"
          alt="Gozdni flow nad Mariborom"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#07110b]/55 via-[#07110b]/45 to-[#07110b]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07110b]/90 via-[#07110b]/35 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="mb-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-[#c58b46]/30 bg-[#c58b46]/15 px-4 py-2 text-[#f4d7ad]">
              Štajerska
            </span>
            <span className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-zinc-200">
              Pohorje
            </span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-300">
              e-bike friendly
            </span>
          </div>

          <h1 className="max-w-4xl text-5xl font-black leading-tight md:text-7xl">
            Gozdni flow nad Mariborom
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-300">
            Dinamična MTB tura skozi pohorske gozdove, razglede in spuste nad
            Mariborom. Primerna za aktivne kolesarje, ki iščejo naravo, ritem
            in občutek pravega kolesarskega dne.
          </p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b1a10] px-5 py-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#07110b] p-5">
            <div className="text-2xl font-black text-[#f4d7ad]">32 km</div>
            <div className="mt-1 text-sm text-zinc-500">dolžina</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#07110b] p-5">
            <div className="text-2xl font-black text-[#f4d7ad]">890 vm</div>
            <div className="mt-1 text-sm text-zinc-500">višinci</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#07110b] p-5">
            <div className="text-2xl font-black text-[#f4d7ad]">Srednja</div>
            <div className="mt-1 text-sm text-zinc-500">težavnost</div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_0.3fr]">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#c58b46]">
              Opis ture
            </p>

            <h2 className="mb-6 text-4xl font-bold">
              Gozdna tura z razgledi in ritmom.
            </h2>

            <p className="mb-6 text-lg leading-8 text-zinc-400">
              Tura je zasnovana kot doživetje nad mestom: začetek v bližini
              Maribora, nato vzpon proti pohorskim gozdovom, razgledišča,
              tekoči makadamski odseki in gozdne poti, ki ustvarijo pravi
              občutek pobega v naravo.
            </p>

            <p className="text-lg leading-8 text-zinc-400">
              V prvi verziji bo tukaj opis, kasneje pa dodamo GPX sled,
              priporočene postanke, lokalne ponudnike, opozorila in dodatne
              nasvete za vožnjo.
            </p>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-[#0b1a10] p-6">
            <h3 className="mb-6 text-xl font-bold">Podlaga</h3>

            <div className="space-y-5">
              <SurfaceBar label="Asfalt" value={10} />
              <SurfaceBar label="Makadam" value={25} />
              <SurfaceBar label="Gozdna pot" value={65} />
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b1a10] px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#c58b46]">
              Galerija
            </p>

            <h2 className="text-4xl font-bold">Utrinki s ture.</h2>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4">
            {galleryImages.map((image) => (
              <div
                key={image}
                className="min-w-[82%] overflow-hidden rounded-[2rem] border border-white/10 sm:min-w-[48%] lg:min-w-[31%]"
              >
                <img
                  src={image}
                  alt="Utrinek s ture"
                  className="h-80 w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-[#0b1a10] p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#c58b46]">
              Zemljevid / GPX
            </p>

            <h2 className="mb-5 text-3xl font-bold">
              GPX sled pride v naslednji fazi.
            </h2>

            <p className="leading-7 text-zinc-400">
              Tukaj bo prikaz zemljevida, višinskega profila in možnost prenosa
              GPX datoteke. Ta blok je pripravljen kot prostor za naslednjo
              funkcionalnost.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#102417] to-[#07110b] p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#c58b46]">
              Doživetje
            </p>

            <h2 className="mb-5 text-3xl font-bold">
              Dodaj postanke ob poti.
            </h2>

            <p className="mb-8 leading-7 text-zinc-400">
              Kasneje bomo turi dodali priporočene lokalne ponudnike,
              razgledne točke, kulinariko in možnost sestave celotnega
              kolesarskega dne.
            </p>

            <a
              href="/ture"
              className="inline-block rounded-full bg-[#c58b46] px-8 py-4 font-semibold text-black transition hover:bg-[#d9a35d]"
            >
              Nazaj na ture
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}