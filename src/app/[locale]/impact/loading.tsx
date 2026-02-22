export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* --- HERO SKELETON : Globe & Titres --- */}
      <section className="relative min-h-[60vh] flex items-center bg-base-300/50 overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              {/* Badge Eyebrow */}
              <div className="skeleton h-8 w-40 rounded-full opacity-50" />
              {/* Title */}
              <div className="space-y-3">
                <div className="skeleton h-14 w-full rounded-2xl" />
                <div className="skeleton h-14 w-3/4 rounded-2xl" />
              </div>
              {/* Description */}
              <div className="skeleton h-24 w-full rounded-2xl opacity-60" />
              {/* Last Updated */}
              <div className="skeleton h-4 w-48 opacity-30" />
            </div>

            {/* Simulation de la scène Three.js (Globe) */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="skeleton w-[450px] h-[450px] rounded-full opacity-10 border-4 border-base-content/5" />
            </div>
          </div>

          {/* KPI Dashboard Skeleton */}
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="card bg-base-100/50 border border-base-200"
              >
                <div className="card-body p-8 space-y-4">
                  <div className="skeleton h-10 w-10 rounded-lg opacity-40" />
                  <div className="skeleton h-10 w-3/4 rounded-lg" />
                  <div className="skeleton h-4 w-1/2 rounded-md opacity-50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION PAYS SKELETON --- */}
      <section className="bg-base-100 py-24">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex flex-col items-center mb-16 space-y-4">
            <div className="skeleton h-10 w-64 rounded-xl" />
            <div className="skeleton h-4 w-96 rounded-md opacity-60" />
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-6">
                <div className="skeleton h-64 w-full rounded-[2rem]" />
                <div className="space-y-4 px-2">
                  <div className="skeleton h-12 w-full rounded-xl opacity-40" />
                  <div className="skeleton h-12 w-full rounded-xl opacity-40" />
                  <div className="skeleton h-12 w-full rounded-xl opacity-40" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION RÉCITS SKELETON --- */}
      <section className="bg-base-200 py-24">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex justify-between items-end mb-16">
            <div className="skeleton h-10 w-72 rounded-xl" />
            <div className="flex gap-4">
              <div className="skeleton h-12 w-32 rounded-full" />
              <div className="skeleton h-12 w-32 rounded-full opacity-50" />
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="card bg-base-100 rounded-[2.5rem] overflow-hidden shadow-sm"
              >
                <div className="skeleton h-64 w-full rounded-none" />
                <div className="card-body p-8 space-y-4">
                  <div className="skeleton h-8 w-full rounded-lg" />
                  <div className="skeleton h-4 w-full rounded-md opacity-60" />
                  <div className="skeleton h-4 w-2/3 rounded-md opacity-60" />
                  <div className="skeleton h-4 w-24 rounded-md mt-4 opacity-40" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
