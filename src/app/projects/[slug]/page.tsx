import Footer from "@/components/footer";
import Header from "@/components/header";
import Reveal from "@/components/motion/reveal";

type ProjectDetailProps = {
  params: { slug: string };
};

export default function ProjectDetailPage({ params }: ProjectDetailProps) {
  const title = decodeURIComponent(params.slug).replace(/-/g, " ");

  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      <Header />

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

      <Footer />
    </main>
  );
}
