export default function Loading() {
  return (
    <div className="animate-pulse space-y-0">
      {/* --- HERO SKELETON : Structure Inversée --- */}
      <section className="relative min-h-[85vh] flex items-center bg-base-300/50 overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-4 grid lg:grid-cols-2 gap-16 items-center">
          {/* Texte à gauche */}
          <div className="space-y-8">
            <div className="skeleton h-4 w-40 rounded-full opacity-60" />
            <div className="space-y-3">
              <div className="skeleton h-16 w-full rounded-2xl" />
              <div className="skeleton h-16 w-4/5 rounded-2xl" />
            </div>
            <div className="space-y-2 opacity-50">
              <div className="skeleton h-5 w-full rounded-lg" />
              <div className="skeleton h-5 w-5/6 rounded-lg" />
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="skeleton h-14 w-44 rounded-full" />
              <div className="skeleton h-14 w-44 rounded-full opacity-40" />
            </div>
          </div>
          {/* Visuel à droite (Simule le formulaire ou l'image) */}
          <div className="hidden lg:block">
            <div className="skeleton h-[500px] w-full rounded-[3rem] opacity-30" />
          </div>
        </div>
      </section>

      {/* --- STATS SKELETON : Style Glassmorphism --- */}
      <section className="py-20 bg-base-100">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center space-y-4 p-8 rounded-[2rem] bg-base-200/50"
            >
              <div className="skeleton h-10 w-20 rounded-lg" />
              <div className="skeleton h-4 w-24 rounded opacity-40" />
            </div>
          ))}
        </div>
      </section>

      {/* --- MISSIONS SKELETON : Style Magazine --- */}
      <section className="py-24 bg-base-200/40">
        <div className="mx-auto max-w-6xl px-4 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="skeleton h-10 w-2/3 mx-auto rounded-xl" />
            <div className="skeleton h-4 w-full mx-auto rounded opacity-50" />
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-6">
                <div className="skeleton h-64 w-full rounded-[2.5rem]" />
                <div className="space-y-3 px-4">
                  <div className="skeleton h-7 w-3/4 rounded-lg" />
                  <div className="skeleton h-4 w-full rounded opacity-60" />
                  <div className="skeleton h-4 w-5/6 rounded opacity-60" />
                  <div className="pt-4">
                    <div className="skeleton h-10 w-32 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
