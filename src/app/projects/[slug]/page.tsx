import type { Metadata } from "next";
import Reveal from "@/components/motion/reveal";

type ProjectDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProjectDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const title = decodeURIComponent(slug).replace(/-/g, " ");
  return {
    title: `${title} — Projets | Nurse Hilfe Menschen Internationale`,
    description: `Détails du projet : ${title}. Objectifs, activités et indicateurs d'impact.`,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailProps) {
  const { slug } = await params;
  const title = decodeURIComponent(slug).replace(/-/g, " ");

  return (
    <>
      <section className="bg-base-200/60">
        <div className="mx-auto w-full max-w-4xl px-4 py-16 md:py-20">
          <Reveal from="left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Projet
            </p>
          </Reveal>
          <Reveal from="left" delay={0.05}>
            <h1 className="mt-3 text-4xl font-semibold">{title}</h1>
          </Reveal>
          <Reveal from="right" delay={0.1}>
            <p className="mt-4 text-base text-base-content/70">
              Cette page détaille les objectifs, activités et indicateurs du
              projet sélectionné.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto w-full max-w-4xl px-4 py-16 md:py-20">
          <div className="space-y-6">
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <h2 className="card-title">Objectifs</h2>
                <p className="text-sm text-base-content/70">
                  Décrire les besoins locaux et les résultats attendus.
                </p>
              </div>
            </div>
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <h2 className="card-title">Activités & calendrier</h2>
                <p className="text-sm text-base-content/70">
                  Planification des actions clés et étapes de déploiement.
                </p>
              </div>
            </div>
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <h2 className="card-title">Impact & budget</h2>
                <p className="text-sm text-base-content/70">
                  Indicateurs de suivi, budget et ressources mobilisées.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
