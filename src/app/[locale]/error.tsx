"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-base-100">
      <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          500
        </p>
        <h1 className="mt-3 text-3xl font-semibold">Une erreur est survenue</h1>
        <p className="mt-4 text-base text-base-content/70">
          Nos équipes ont été notifiées. Veuillez réessayer ou revenir plus
          tard.
        </p>
        <div className="mt-6 flex gap-3">
          <button className="btn btn-primary" onClick={() => reset()}>
            Réessayer
          </button>
          <Link href="/" className="btn btn-outline btn-primary">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
