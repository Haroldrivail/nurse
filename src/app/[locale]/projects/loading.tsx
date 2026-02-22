export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* --- HERO SKELETON : Reflet du style Cinématique --- */}
      <section className="relative min-h-[50vh] flex items-center bg-base-300/50">
        <div className="mx-auto w-full max-w-6xl px-4 py-24">
          <div className="max-w-2xl space-y-6">
            {/* Badge eyebrow */}
            <div className="skeleton h-6 w-32 rounded-full opacity-50" />
            {/* Title */}
            <div className="space-y-3">
              <div className="skeleton h-12 w-full rounded-xl" />
              <div className="skeleton h-12 w-3/4 rounded-xl" />
            </div>
            {/* Description */}
            <div className="space-y-2">
              <div className="skeleton h-4 w-full opacity-60" />
              <div className="skeleton h-4 w-5/6 opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* --- PROJECTS GRID SKELETON : Avec l'effet d'Overlap --- */}
      <section className="bg-base-100 pb-24 -mt-10">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="card bg-base-100 border border-base-200 shadow-sm overflow-hidden"
              >
                {/* Image area */}
                <div className="skeleton h-56 w-full rounded-none" />

                <div className="card-body p-8 space-y-4">
                  {/* Title line-clamp-2 */}
                  <div className="space-y-2">
                    <div className="skeleton h-7 w-full" />
                    <div className="skeleton h-7 w-2/3" />
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-col gap-3 pt-2">
                    <div className="skeleton h-4 w-24 rounded" />
                    <div className="skeleton h-4 w-full opacity-50" />
                  </div>

                  {/* Action buttons (Split design) */}
                  <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-base-200">
                    <div className="skeleton h-9 w-full rounded-lg" />
                    <div className="skeleton h-9 w-full rounded-lg opacity-80" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SKELETON : Forme arrondie (Boxed Impact) --- */}
      <section className="bg-base-100 pb-20">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="skeleton h-64 w-full rounded-[2.5rem] opacity-40" />
        </div>
      </section>
    </div>
  );
}
