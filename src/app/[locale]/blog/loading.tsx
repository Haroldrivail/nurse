export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* --- HERO SKELETON : Style Éditorial --- */}
      <section className="bg-base-300/50 py-20 min-h-[40vh] flex items-center">
        <div className="mx-auto w-full max-w-6xl px-4 space-y-6">
          {/* Eyebrow */}
          <div className="skeleton h-4 w-32 rounded opacity-50" />
          {/* Title (2 lignes) */}
          <div className="space-y-3">
            <div className="skeleton h-14 w-2/3 rounded-2xl" />
          </div>
          {/* Description (Italique) */}
          <div className="skeleton h-6 w-1/2 rounded-lg opacity-40" />
        </div>
      </section>

      {/* --- GRID SKELETON : Style Magazine --- */}
      <section className="py-20 bg-base-100">
        <div className="mx-auto max-w-6xl px-4 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-6">
              {/* Image Arrondie (rounded-[2rem]) */}
              <div className="skeleton h-72 w-full rounded-[2rem]" />

              <div className="space-y-4 px-2">
                {/* Meta: Category / Date */}
                <div className="flex gap-3 items-center">
                  <div className="skeleton h-4 w-16 rounded opacity-40" />
                  <div className="skeleton h-4 w-2 rounded opacity-20" />
                  <div className="skeleton h-4 w-24 rounded opacity-40" />
                </div>

                {/* Titre de l'article */}
                <div className="space-y-2">
                  <div className="skeleton h-7 w-full rounded-lg" />
                  <div className="skeleton h-7 w-4/5 rounded-lg" />
                </div>

                {/* Excerpt */}
                <div className="space-y-2 opacity-60">
                  <div className="skeleton h-4 w-full rounded" />
                  <div className="skeleton h-4 w-full rounded" />
                  <div className="skeleton h-4 w-2/3 rounded" />
                </div>

                {/* Footer : Temps de lecture & Lien */}
                <div className="pt-6 border-t border-base-200 flex justify-between items-center">
                  <div className="skeleton h-3 w-20 rounded opacity-30" />
                  <div className="skeleton h-4 w-24 rounded opacity-50" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
