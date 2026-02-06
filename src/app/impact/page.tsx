import Footer from "@/components/footer";
import Header from "@/components/header";
import Newsletter from "@/components/newsletter";
import Reveal from "@/components/motion/reveal";
import Stagger from "@/components/motion/stagger";
import Link from "next/link";

const kpis = [
  { label: "Patients accompagnés", value: "132 480" },
  { label: "Consultations 2025", value: "49 200" },
  { label: "Cliniques mobiles actives", value: "52" },
  { label: "Professionnels formés", value: "1 260" },
];

const impactByCountry = [
  {
    country: "Burkina Faso",
    patients: "32 400",
    clinics: "14",
    professionals: "280",
  },
  {
    country: "Côte d'Ivoire",
    patients: "28 700",
    clinics: "12",
    professionals: "240",
  },
  {
    country: "Cameroun",
    patients: "35 900",
    clinics: "16",
    professionals: "310",
  },
  {
    country: "RDC",
    patients: "35 480",
    clinics: "10",
    professionals: "230",
  },
];

const impactByProgram = [
  {
    program: "Santé maternelle",
    focus: "9 600 consultations prénatales",
    teams: "18 équipes mobiles",
  },
  {
    program: "Urgences humanitaires",
    focus: "4 200 interventions d'urgence",
    teams: "12 cellules de réponse rapide",
  },
  {
    program: "Nutrition & prévention",
    focus: "18 500 dépistages",
    teams: "22 campagnes communautaires",
  },
];

export default function ImpactPage() {
  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      <Header />

      <section className="bg-base-200/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <Reveal from="left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Impact
            </p>
          </Reveal>
          <Reveal from="left" delay={0.05}>
            <h1 className="mt-3 text-4xl font-semibold">
              Des résultats mesurables et transparents
            </h1>
          </Reveal>
          <Reveal from="right" delay={0.1}>
            <p className="mt-4 max-w-3xl text-base text-base-content/70">
              Nos indicateurs sont suivis chaque trimestre et partagés dans nos
              rapports pour garantir une totale transparence.
            </p>
          </Reveal>
          <div className="mt-6 text-sm text-base-content/60">
            Dernière mise à jour : février 2026
          </div>
          <Stagger
            from="down"
            className="mt-8 grid gap-6 md:grid-cols-4"
          >
            {kpis.map((item) => (
              <div key={item.label} className="card bg-base-100 shadow">
                <div className="card-body">
                  <p className="text-xs uppercase tracking-[0.3em] text-primary">
                    {item.label}
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold">{item.value}</h2>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <Reveal from="left">
            <h2 className="text-3xl font-semibold">Impact par pays</h2>
          </Reveal>
          <Reveal from="right" delay={0.05}>
            <p className="mt-3 max-w-3xl text-base text-base-content/70">
              Les chiffres ci-dessous reflètent nos activités 2025 par zone
              d&apos;intervention principale.
            </p>
          </Reveal>
          <Stagger
            from="left"
            alternate
            className="mt-8 grid gap-6 md:grid-cols-2"
          >
            {impactByCountry.map((item) => (
              <div key={item.country} className="card bg-base-200 shadow">
                <div className="card-body">
                  <h3 className="card-title">{item.country}</h3>
                  <div className="mt-4 grid gap-3 text-sm text-base-content/70">
                    <div className="rounded-xl border border-base-200 bg-base-100 p-4">
                      {item.patients} patients accompagnés
                    </div>
                    <div className="rounded-xl border border-base-200 bg-base-100 p-4">
                      {item.clinics} cliniques mobiles actives
                    </div>
                    <div className="rounded-xl border border-base-200 bg-base-100 p-4">
                      {item.professionals} professionnels formés
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-base-200/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <Reveal from="left">
            <h2 className="text-3xl font-semibold">Impact par programme</h2>
          </Reveal>
          <Reveal from="right" delay={0.05}>
            <p className="mt-3 max-w-3xl text-base text-base-content/70">
              Nos équipes suivent des indicateurs spécifiques par domaine
              d&apos;action pour mesurer l&apos;efficacité des interventions.
            </p>
          </Reveal>
          <Stagger
            from="down"
            className="mt-8 grid gap-6 md:grid-cols-3"
          >
            {impactByProgram.map((item) => (
              <div key={item.program} className="card bg-base-100 shadow">
                <div className="card-body">
                  <h3 className="card-title">{item.program}</h3>
                  <p className="text-sm text-base-content/70">{item.focus}</p>
                  <p className="mt-3 text-sm text-base-content/70">
                    {item.teams}
                  </p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr]">
            <Reveal from="left">
              <div>
                <h2 className="text-3xl font-semibold">
                  Rapports d&apos;impact
                </h2>
                <p className="mt-4 text-base text-base-content/70">
                  Téléchargez nos rapports annuels et nos bilans financiers pour
                  comprendre l&apos;utilisation des fonds.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    className="btn btn-outline btn-primary"
                    href="/reports/rapport-2025.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Rapport 2025 (PDF)
                  </a>
                  <a
                    className="btn btn-outline btn-primary"
                    href="/reports/rapport-2024.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Rapport 2024 (PDF)
                  </a>
                  <a
                    className="btn btn-outline btn-primary"
                    href="/reports/bilan-financier-2025.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Bilan financier 2025
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal from="right">
              <div className="card bg-base-200 shadow">
                <div className="card-body">
                  <h3 className="card-title">Méthodologie</h3>
                  <ul className="mt-4 space-y-3 text-sm text-base-content/70">
                    <li>• Collecte de données terrain mensuelle.</li>
                    <li>• Vérifications croisées par audits externes.</li>
                    <li>• Publication annuelle et synthèses trimestrielles.</li>
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a className="btn btn-primary btn-sm" href="/dons">
                      Soutenir nos actions
                    </a>
                    <a
                      className="btn btn-outline btn-primary btn-sm"
                      href="/s-impliquer"
                    >
                      Devenir partenaire
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-base-200/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <Reveal from="left">
            <h2 className="text-3xl font-semibold">Histoires d&apos;impact</h2>
          </Reveal>
          <Stagger from="down" className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              "Santé maternelle en zone rurale",
              "Prévention des épidémies",
              "Réponse rapide aux urgences",
            ].map((title) => (
              <div key={title} className="card bg-base-100 shadow">
                <div className="card-body">
                  <h3 className="card-title">{title}</h3>
                  <p className="text-sm text-base-content/70">
                    Un aperçu des résultats obtenus grâce à vos soutiens.
                  </p>
                  <button className="btn btn-outline btn-primary btn-sm">
                    Lire l&apos;histoire
                  </button>
                </div>
              </div>
            ))}
          </Stagger>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/blog">
              Lire nos actualités
            </Link>
            <Link className="btn btn-outline btn-primary" href="/dons">
              Faire un don
            </Link>
          </div>
        </div>
      </section>

      <Newsletter
        variant="card"
        eyebrow="Newsletter"
        title="Suivez nos indicateurs d'impact"
        description="Des chiffres clairs et des résultats concrets, chaque mois."
        note="En vous inscrivant, vous acceptez notre politique de confidentialité."
      />

      <Footer />
    </main>
  );
}
