import Footer from "@/components/footer";
import Header from "@/components/header";
import Reveal from "@/components/motion/reveal";
import Stagger from "@/components/motion/stagger";

const PROJECTS = [
  {
    title: "Cliniques mobiles",
    theme: "Santé rurale",
    region: "Afrique de l'Ouest",
    impact: "5 000 consultations",
  },
  {
    title: "Santé maternelle",
    theme: "Maternité",
    region: "Afrique centrale",
    impact: "2 000 familles suivies",
  },
  {
    title: "Premiers secours communautaires",
    theme: "Urgence",
    region: "Europe & Afrique",
    impact: "300 agents formés",
  },
  {
    title: "Nutrition & prévention",
    theme: "Nutrition",
    region: "Afrique de l'Est",
    impact: "1 200 enfants suivis",
  },
  {
    title: "Centres de santé partenaires",
    theme: "Infrastructure",
    region: "Sahel",
    impact: "18 centres appuyés",
  },
  {
    title: "Santé mentale & soutien psychosocial",
    theme: "Protection",
    region: "Zones urbaines",
    impact: "900 consultations",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      <Header />

      <section className="bg-base-200/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <Reveal from="left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Projets & causes
            </p>
          </Reveal>
          <Reveal from="left" delay={0.05}>
            <h1 className="mt-3 text-4xl font-semibold">
              Des programmes ancrés dans les besoins locaux
            </h1>
          </Reveal>
          <Reveal from="left" delay={0.1}>
            <p className="mt-4 max-w-3xl text-base text-base-content/70">
              Explorez nos interventions par thématique et par région. Chaque
              projet est accompagné d&apos;indicateurs d&apos;impact et
              d&apos;objectifs clairs.
            </p>
          </Reveal>
          <Reveal from="right" delay={0.15}>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="btn btn-primary">Tous</button>
              <button className="btn btn-outline btn-primary">Urgence</button>
              <button className="btn btn-outline btn-primary">Maternité</button>
              <button className="btn btn-outline btn-primary">Nutrition</button>
              <button className="btn btn-outline btn-primary">
                Santé rurale
              </button>
              <button className="btn btn-outline btn-primary">
                Protection
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <Stagger from="down" className="grid gap-6 md:grid-cols-3">
            {PROJECTS.map((project) => (
              <article key={project.title} className="card bg-base-200 shadow">
                <div className="card-body">
                  <div className="badge badge-primary">{project.theme}</div>
                  <h2 className="card-title mt-2">{project.title}</h2>
                  <p className="text-sm text-base-content/70">
                    Région: {project.region}
                  </p>
                  <p className="text-sm text-base-content/70">
                    Objectif: {project.impact}
                  </p>
                  <div className="card-actions">
                    <a className="btn btn-outline btn-primary" href="/dons">
                      Soutenir ce projet
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-base-200/60">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-16 md:grid-cols-[1.2fr_0.8fr] md:py-20">
          <Reveal from="left">
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h3 className="card-title">Carte des interventions</h3>
                <p className="text-sm text-base-content/70">
                  Visualisez les projets par pays, thématique et niveau
                  d&apos;urgence.
                </p>
                <div className="mt-4 h-60 w-full rounded-xl bg-base-200" />
              </div>
            </div>
          </Reveal>
          <Reveal from="right">
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h3 className="card-title">Suivi d&apos;impact</h3>
                <p className="text-sm text-base-content/70">
                  Tableaux de bord, indicateurs et rapports par projet.
                </p>
                <ul className="mt-4 space-y-3 text-sm text-base-content/70">
                  <li>• Taux de couverture des soins</li>
                  <li>• Amélioration des indicateurs maternels</li>
                  <li>• Résilience communautaire</li>
                </ul>
                <div className="card-actions mt-6">
                  <a className="btn btn-primary" href="/about">
                    Voir les rapports
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <div className="card bg-base-200 shadow">
            <div className="card-body md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  Agir maintenant
                </p>
                <h3 className="mt-2 text-3xl font-semibold">
                  Soutenez un projet à fort impact
                </h3>
                <p className="mt-2 text-sm text-base-content/70">
                  Chaque don est affecté à un programme et suivi par des
                  indicateurs transparents.
                </p>
              </div>
              <div className="mt-4 flex gap-2 md:mt-0">
                <a className="btn btn-primary" href="/dons">
                  Faire un don
                </a>
                <a className="btn btn-outline btn-primary" href="/dons">
                  Don mensuel
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
