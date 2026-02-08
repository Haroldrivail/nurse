import type { Metadata } from "next";
import Reveal from "@/components/motion/reveal";

type BlogDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const title = decodeURIComponent(slug).replace(/-/g, " ");
  return {
    title: `${title} — Blog | Nurse Hilfe Menschen Internationale`,
    description: `Article : ${title}. Actualités et témoignages du terrain.`,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const title = decodeURIComponent(slug).replace(/-/g, " ");

  return (
    <>
      <section className="bg-base-200/60">
        <div className="mx-auto w-full max-w-4xl px-4 py-16 md:py-20">
          <Reveal from="left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Article
            </p>
          </Reveal>
          <Reveal from="left" delay={0.05}>
            <h1 className="mt-3 text-4xl font-semibold">{title}</h1>
          </Reveal>
          <Reveal from="right" delay={0.1}>
            <p className="mt-4 text-base text-base-content/70">
              Retrouvez ici l&apos;article complet, les images et les ressources
              associées.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto w-full max-w-4xl px-4 py-16 md:py-20 space-y-6">
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <h2 className="card-title">Contexte</h2>
              <p className="text-sm text-base-content/70">
                Présentation de la mission, des défis et des actions menées.
              </p>
            </div>
          </div>
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <h2 className="card-title">Résultats</h2>
              <p className="text-sm text-base-content/70">
                Données clés, témoignages et prochaines étapes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
