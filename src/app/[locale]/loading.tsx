export default function Loading() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden bg-base-200/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-20">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <div className="skeleton h-3 w-40" />
              <div className="skeleton h-10 w-full" />
              <div className="skeleton h-10 w-5/6" />
              <div className="skeleton h-4 w-4/5" />
              <div className="flex flex-wrap gap-3">
                <div className="skeleton h-10 w-32" />
                <div className="skeleton h-10 w-32" />
              </div>
              <div className="skeleton h-24 w-full" />
            </div>
            <div className="space-y-4">
              <div className="skeleton h-40 w-full" />
              <div className="skeleton h-40 w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="card bg-base-100 shadow-sm">
                <div className="skeleton h-40 w-full" />
                <div className="card-body space-y-3">
                  <div className="skeleton h-4 w-20" />
                  <div className="skeleton h-6 w-4/5" />
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-4 w-5/6" />
                  <div className="flex gap-3">
                    <div className="skeleton h-9 w-28" />
                    <div className="skeleton h-9 w-28" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-base-200/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="card bg-base-100 shadow-sm">
                <div className="card-body space-y-3">
                  <div className="skeleton h-4 w-24" />
                  <div className="skeleton h-7 w-1/2" />
                  <div className="skeleton h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
