export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full border-b border-zinc-800 bg-black/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          <div className="font-bold text-xl tracking-wide">
            Bojan on Bike
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#" className="hover:text-white transition">
              Trails
            </a>

            <a href="#" className="hover:text-white transition">
              Regions
            </a>

            <a href="#" className="hover:text-white transition">
              Experiences
            </a>

            <a href="#" className="hover:text-white transition">
              Community
            </a>
          </nav>

        </div>
      </header>

      {/* HERO */}
      <section className="relative flex items-center justify-center min-h-screen overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black z-10" />

        <img
          src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop"
          alt="MTB"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-20 text-center px-6 max-w-4xl">

          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700 bg-zinc-900/70 text-sm text-zinc-300">
            Slovenia • MTB • Gravel • Bikepacking
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">
            Discover Slovenia
            <br />
            by Bike
          </h1>

          <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Premium platforma za odkrivanje najboljših MTB,
            gravel in bikepacking tur po Sloveniji.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <button className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-zinc-200 transition">
              Explore Trails
            </button>

            <button className="border border-zinc-600 px-8 py-4 rounded-full font-semibold hover:bg-zinc-900 transition">
              Explore Regions
            </button>

          </div>

        </div>

      </section>

      {/* FEATURED */}
      <section className="py-24 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="mb-16">
            <p className="text-zinc-500 uppercase tracking-[0.2em] text-sm mb-4">
              Featured
            </p>

            <h2 className="text-4xl md:text-5xl font-bold">
              Ride unforgettable Slovenian trails
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800">

              <img
                src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=1974&auto=format&fit=crop"
                alt="Trail"
                className="h-72 w-full object-cover"
              />

              <div className="p-8">

                <div className="text-sm text-zinc-500 mb-3">
                  Pohorje • MTB
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  Pohorje Flow Trails
                </h3>

                <p className="text-zinc-400 leading-relaxed">
                  Epic forest descents, flow sections and hidden singletracks above Maribor.
                </p>

              </div>

            </div>

            <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800">

              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1974&auto=format&fit=crop"
                alt="Trail"
                className="h-72 w-full object-cover"
              />

              <div className="p-8">

                <div className="text-sm text-zinc-500 mb-3">
                  Slovenske Gorice • Gravel
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  Wine Roads Adventure
                </h3>

                <p className="text-zinc-400 leading-relaxed">
                  Endless rolling hills, wine cellars and premium gravel riding experiences.
                </p>

              </div>

            </div>

            <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800">

              <img
                src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop"
                alt="Trail"
                className="h-72 w-full object-cover"
              />

              <div className="p-8">

                <div className="text-sm text-zinc-500 mb-3">
                  Soča Valley • Bikepacking
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  Alpine Escape
                </h3>

                <p className="text-zinc-400 leading-relaxed">
                  Multi-day alpine adventure through rivers, mountains and hidden villages.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}