export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      
      <section className="flex flex-col items-center justify-center text-center px-6 py-40">
        <h1 className="text-6xl font-bold mb-6">
          Bojan on Bike
        </h1>

        <p className="text-xl text-zinc-400 max-w-2xl mb-10">
          Premium MTB platforma za Slovenijo.
          Trail vodiči, GPX ture, bikepacking,
          community in najboljši MTB kotički.
        </p>

        <button className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-zinc-200 transition">
          Explore Trails
        </button>
      </section>

      <section className="border-t border-zinc-800 py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          
          <div className="bg-zinc-900 p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-4">
              MTB Trails
            </h3>

            <p className="text-zinc-400">
              Discover hidden Slovenian MTB routes and epic descents.
            </p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-4">
              Bikepacking
            </h3>

            <p className="text-zinc-400">
              Multi-day adventures with GPX navigation and gear tips.
            </p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-4">
              Community
            </h3>

            <p className="text-zinc-400">
              Connect with riders, guides and local MTB events.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}