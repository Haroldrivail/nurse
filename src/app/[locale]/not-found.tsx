import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="bg-base-100">
      <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          404
        </p>
        <h1 className="mt-3 text-3xl font-semibold">
          Cette page n&apos;existe pas
        </h1>
        <p className="mt-4 text-base text-base-content/70">
          La page que vous recherchez a peut-être été déplacée ou supprimée.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/" className="btn btn-primary">
            Retour à l&apos;accueil
          </Link>
          <Link href="/search" className="btn btn-outline btn-primary">
            Rechercher
          </Link>
        </div>
      </div>
    </section>
  );
}
