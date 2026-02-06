import Footer from "@/components/footer";
import Header from "@/components/header";
import Newsletter from "@/components/newsletter";
import Reveal from "@/components/motion/reveal";
import Stagger from "@/components/motion/stagger";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      <Header />

      <section className="relative overflow-hidden bg-base-200/60">
        <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-base-200" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28">
          <div>
            <Reveal from="left">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Ensemble pour des soins accessibles
              </p>
            </Reveal>
            <Reveal from="left" delay={0.05}>
              <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
                Soigner, protéger et redonner espoir aux communautés
                vulnérables.
              </h1>
            </Reveal>

            <Reveal from="left" delay={0.15}>
              <p className="mt-4 text-lg font-medium">
                <span>
                  Nous agissons pour {""}
                  <span className="text-rotate">
                    <span>
                      <span className="bg-accent text-accent-content px-1">
                        les communautés
                      </span>
                      <span className="bg-secondary-content text-secondary px-1">
                        les soignants
                      </span>
                      <span className="bg-primary-content text-primary px-1">
                        les bénévoles
                      </span>
                    </span>
                  </span>
                </span>
              </p>
            </Reveal>

            <Reveal from="left" delay={0.15}>
              <p className="mt-5 text-lg text-base-content/70">
                Nous finançons des programmes de santé, de prévention et de
                résilience locale avec un suivi d&apos;impact transparent.
              </p>
            </Reveal>
            <Reveal from="left" delay={0.2}>
              <div className="mt-6 flex flex-wrap gap-4">
                <a className="btn btn-primary " href="/dons">
                  Faire un don
                </a>
                <a className="btn btn-outline btn-primary" href="#impliquer">
                  Devenir bénévole
                </a>
              </div>
            </Reveal>
            <Stagger
              from="left"
              className="stats stats-vertical mt-10 w-full bg-base-100 shadow sm:stats-horizontal"
            >
              <div className="stat">
                <div className="stat-title">Personnes accompagnées</div>
                <div className="stat-value text-primary">12K+</div>
              </div>
              <div className="stat">
                <div className="stat-title">Programmes actifs</div>
                <div className="stat-value text-primary">48</div>
              </div>
              <div className="stat">
                <div className="stat-title">Fonds mobilisés</div>
                <div className="stat-value text-primary">€1,2M</div>
              </div>
            </Stagger>
          </div>
          <div className="flex h-full flex-col justify-between gap-6">
            <Reveal from="right">
              <div className="card bg-primary text-primary-content shadow-xl">
                <div className="card-body">
                  <h3 className="card-title">Appel à l&apos;action</h3>
                  <p>
                    Chaque contribution finance des soins essentiels, des kits
                    d&apos;hygiène et la formation d&apos;équipes locales.
                  </p>
                  <div className="card-actions">
                    <a
                      className="btn btn-primary text-shadow-primary-content btn-soft"
                      href="/dons"
                    >
                      Soutenir une cause
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal from="right" delay={0.05}>
              <div className="card bg-base-100 shadow">
                <div className="card-body">
                  <h3 className="card-title">Don rapide</h3>
                  <p className="text-sm text-base-content/70">
                    30€ financent une visite médicale mobile. 100€ soutiennent
                    la formation d&apos;un soignant local.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="badge badge-primary">20€</span>
                    <span className="badge badge-primary">30€</span>
                    <span className="badge badge-primary">50€</span>
                    <span className="badge badge-primary">100€</span>
                  </div>
                  <div className="card-actions mt-4">
                    <a className="btn btn-outline btn-primary" href="/dons">
                      Choisir un montant
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="mission" className="bg-base-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Reveal from="left">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  Vision • Mission • Valeurs
                </p>
              </Reveal>
              <Reveal from="left" delay={0.05}>
                <h2 className="mt-3 text-3xl font-semibold">
                  Des soins dignes, une action locale durable.
                </h2>
              </Reveal>
              <Reveal from="left" delay={0.1}>
                <p className="mt-4 text-base text-base-content/70">
                  Nous travaillons avec les communautés pour renforcer les
                  capacités locales, améliorer l&apos;accès aux soins et
                  répondre aux urgences avec efficacité.
                </p>
              </Reveal>
              <Stagger
                from="left"
                alternate
                className="mt-6 grid gap-4 sm:grid-cols-2"
              >
                <div className="card bg-base-200 shadow">
                  <div className="card-body">
                    <h4 className="card-title">Notre approche</h4>
                    <p className="text-sm text-base-content/70">
                      Santé communautaire, prévention et actions ciblées selon
                      les besoins locaux.
                    </p>
                  </div>
                </div>
                <div className="card bg-base-200 shadow">
                  <div className="card-body">
                    <h4 className="card-title">Valeurs</h4>
                    <p className="text-sm text-base-content/70">
                      Compassion, inclusion, intégrité et impact mesurable.
                    </p>
                  </div>
                </div>
              </Stagger>
            </div>
            <Reveal from="right">
              <div className="card bg-base-100 shadow">
                <div className="card-body">
                  <h4 className="card-title">Priorités 2026</h4>
                  <ul className="mt-2 space-y-3 text-sm text-base-content/70">
                    <li>• Renforcer 12 cliniques mobiles en zones rurales.</li>
                    <li>• Déployer 4 hubs de santé maternelle.</li>
                    <li>• Former 300 agents de santé communautaires.</li>
                  </ul>
                  <div className="alert alert-info mt-4 text-xs">
                    Nos feuilles de route et indicateurs sont publiés dans nos
                    rapports annuels.
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="projets" className="bg-base-200/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal from="left">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  Causes / Projets
                </p>
              </Reveal>
              <Reveal from="left" delay={0.05}>
                <h3 className="mt-3 text-3xl font-semibold">
                  Programmes en cours
                </h3>
              </Reveal>
            </div>
            <Reveal from="right" delay={0.1}>
              <Link className="btn btn-outline btn-primary" href="/projects">
                Explorer tous les projets
              </Link>
            </Reveal>
          </div>
          <Stagger from="down" className="mt-10 grid gap-6 md:grid-cols-3">
            <article className="card bg-base-100 shadow">
              <div className="card-body">
                <div className="badge badge-primary">Santé rurale</div>
                <h4 className="card-title mt-2">Cliniques mobiles</h4>
                <p className="text-sm text-base-content/70">
                  Des unités itinérantes pour les zones isolées avec suivi
                  numérique des patients.
                </p>
                <div className="card-actions">
                  <Link className="link link-primary" href="/projects">
                    Voir le programme →
                  </Link>
                </div>
              </div>
            </article>
            <article className="card bg-base-100 shadow">
              <div className="card-body">
                <div className="badge badge-primary">Maternité</div>
                <h4 className="card-title mt-2">Santé maternelle</h4>
                <p className="text-sm text-base-content/70">
                  Accompagnement des futures mères, nutrition et prévention des
                  risques.
                </p>
                <div className="card-actions">
                  <Link className="link link-primary" href="/projects">
                    Voir le programme →
                  </Link>
                </div>
              </div>
            </article>
            <article className="card bg-base-100 shadow">
              <div className="card-body">
                <div className="badge badge-primary">Urgence</div>
                <h4 className="card-title mt-2">Premiers secours</h4>
                <p className="text-sm text-base-content/70">
                  Formations et kits d&apos;urgence pour bénévoles locaux et
                  partenaires.
                </p>
                <div className="card-actions">
                  <Link className="link link-primary" href="/projects">
                    Voir le programme →
                  </Link>
                </div>
              </div>
            </article>
          </Stagger>
          <Reveal from="right">
            <div className="alert alert-success mt-8">
              <span>
                92% des bénéficiaires déclarent un meilleur accès aux soins, et
                75% des communautés partenaires ont mis en place des comités de
                santé locaux.
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="impact" className="bg-base-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal from="left">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  Impact & transparence
                </p>
              </Reveal>
              <Reveal from="left" delay={0.05}>
                <h3 className="mt-3 text-3xl font-semibold">
                  Des résultats mesurables
                </h3>
              </Reveal>
            </div>
            <Reveal from="right" delay={0.1}>
              <a className="btn btn-outline btn-primary" href="/about">
                Voir nos rapports
              </a>
            </Reveal>
          </div>
          <Stagger from="down" className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <p className="text-sm text-base-content/70">
                  Taux d&apos;accès aux soins
                </p>
                <p className="text-3xl font-semibold text-primary">+34%</p>
                <p className="text-sm text-base-content/70">
                  Amélioration moyenne observée dans nos zones
                  d&apos;intervention.
                </p>
              </div>
            </div>
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <p className="text-sm text-base-content/70">
                  Urgences prises en charge
                </p>
                <p className="text-3xl font-semibold text-primary">1 240</p>
                <p className="text-sm text-base-content/70">
                  Cas traités grâce aux cliniques mobiles et aux postes avancés.
                </p>
              </div>
            </div>
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <p className="text-sm text-base-content/70">
                  Partenaires locaux
                </p>
                <p className="text-3xl font-semibold text-primary">78</p>
                <p className="text-sm text-base-content/70">
                  ONG, centres de santé et collectivités accompagnés.
                </p>
              </div>
            </div>
          </Stagger>
          <div className="mt-8 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
            <Reveal from="left">
              <div className="card bg-base-200 shadow">
                <div className="card-body">
                  <h4 className="card-title">Carte d&apos;impact</h4>
                  <p className="text-sm text-base-content/70">
                    Visualisez nos interventions par pays et par thématique.
                  </p>
                  <div className="mt-4 h-56 w-full rounded-xl bg-base-100/80" />
                </div>
              </div>
            </Reveal>
            <Reveal from="right">
              <div className="card bg-base-100 shadow">
                <div className="card-body">
                  <h4 className="card-title">Rapport 2025</h4>
                  <p className="text-sm text-base-content/70">
                    Synthèse financière, indicateurs et études de cas.
                  </p>
                  <div className="card-actions mt-4">
                    <a
                      className="btn btn-primary text-shadow-primary-content"
                      href="/about"
                    >
                      Télécharger le rapport
                    </a>
                    <a className="btn btn-outline btn-primary" href="/about">
                      Gouvernance
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="impliquer" className="bg-base-200/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <Reveal from="left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Impliquez-vous
            </p>
          </Reveal>
          <Reveal from="left" delay={0.05}>
            <h3 className="mt-3 text-3xl font-semibold">
              Rejoignez notre mouvement
            </h3>
          </Reveal>
          <Stagger from="down" className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h4 className="card-title">Bénévolat</h4>
                <p className="text-sm text-base-content/70">
                  Offrez votre temps sur le terrain, à distance ou pour des
                  missions ponctuelles.
                </p>
                <div className="card-actions">
                  <a className="link link-primary" href="/about">
                    Voir les opportunités →
                  </a>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h4 className="card-title">Emploi & formation</h4>
                <p className="text-sm text-base-content/70">
                  Accédez à nos offres, stages et modules de formation
                  certifiants.
                </p>
                <div className="card-actions">
                  <a className="link link-primary" href="/about">
                    Découvrir les postes →
                  </a>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h4 className="card-title">Adhésion</h4>
                <p className="text-sm text-base-content/70">
                  Devenez membre et participez aux décisions de la fondation.
                </p>
                <div className="card-actions">
                  <a className="link link-primary" href="/about">
                    Devenir membre →
                  </a>
                </div>
              </div>
            </div>
          </Stagger>
          <Reveal from="right">
            <div className="card mt-6 bg-base-100 shadow">
              <div className="card-body">
                <h4 className="card-title">Partenariats & parrainages</h4>
                <p className="text-sm text-base-content/70">
                  Entreprises, institutions et organisations peuvent
                  co-construire des programmes d&apos;impact, sponsoriser des
                  campagnes ou offrir du mécénat de compétences.
                </p>
                <div className="card-actions">
                  <a className="btn btn-outline btn-primary" href="/about">
                    Proposer un partenariat
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="partenaires" className="bg-base-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <Reveal from="left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Partenaires
            </p>
          </Reveal>
          <Reveal from="left" delay={0.05}>
            <h3 className="mt-3 text-3xl font-semibold">
              Des alliances qui renforcent l&apos;impact
            </h3>
          </Reveal>
          <Stagger
            from="down"
            className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4"
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="flex h-20 items-center justify-center rounded-xl border border-base-200 bg-base-200/60 text-sm text-base-content/60"
              >
                Partenaire {index + 1}
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="evenements" className="bg-base-200/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal from="left">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  Événements
                </p>
              </Reveal>
              <Reveal from="left" delay={0.05}>
                <h3 className="mt-3 text-3xl font-semibold">
                  Mobiliser les communautés
                </h3>
              </Reveal>
            </div>
            <Reveal from="right" delay={0.1}>
              <a className="btn btn-outline btn-primary" href="#newsletter">
                S&apos;inscrire
              </a>
            </Reveal>
          </div>
          <Stagger from="down" className="mt-8 grid gap-6 md:grid-cols-3">
            <article className="card bg-base-100 shadow">
              <div className="card-body">
                <div className="badge badge-outline badge-primary">
                  Mars 2026
                </div>
                <h4 className="card-title mt-2">Forum partenaires</h4>
                <p className="text-sm text-base-content/70">
                  Co-construction des projets 2026 avec les acteurs locaux.
                </p>
                <div className="card-actions">
                  <a className="link link-primary" href="#newsletter">
                    Recevoir l&apos;invitation →
                  </a>
                </div>
              </div>
            </article>
            <article className="card bg-base-100 shadow">
              <div className="card-body">
                <div className="badge badge-outline badge-primary">
                  Avril 2026
                </div>
                <h4 className="card-title mt-2">Semaine santé rurale</h4>
                <p className="text-sm text-base-content/70">
                  Campagnes de dépistage et sensibilisation communautaire.
                </p>
                <div className="card-actions">
                  <a className="link link-primary" href="#newsletter">
                    Participer →
                  </a>
                </div>
              </div>
            </article>
            <article className="card bg-base-100 shadow">
              <div className="card-body">
                <div className="badge badge-outline badge-primary">
                  Juin 2026
                </div>
                <h4 className="card-title mt-2">Gala solidarité</h4>
                <p className="text-sm text-base-content/70">
                  Levée de fonds pour la santé maternelle et infantile.
                </p>
                <div className="card-actions">
                  <a className="link link-primary" href="#newsletter">
                    Réserver →
                  </a>
                </div>
              </div>
            </article>
          </Stagger>
        </div>
      </section>

      <section id="blog" className="bg-base-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <Reveal from="left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Blog / Actualités
            </p>
          </Reveal>
          <Reveal from="left" delay={0.05}>
            <h3 className="mt-3 text-3xl font-semibold">
              Nos dernières nouvelles
            </h3>
          </Reveal>
          <Stagger from="down" className="mt-8 grid gap-6 md:grid-cols-3">
            <article className="card bg-base-100 shadow">
              <div className="card-body">
                <div className="badge badge-outline badge-primary badge-soft">
                  Mises à jour
                </div>
                <h4 className="card-title mt-2">
                  Lancement d&apos;une campagne de prévention en zones rurales
                </h4>
                <p className="text-sm text-base-content/70">
                  Des sessions d&apos;information sur la santé communautaire
                  dans 8 villages.
                </p>
              </div>
            </article>
            <article className="card bg-base-100 shadow">
              <div className="card-body">
                <div className="badge badge-outline badge-primary badge-soft">
                  Réussites
                </div>
                <h4 className="card-title mt-2">
                  Témoignage : Mariam retrouve l&apos;accès aux soins
                </h4>
                <p className="text-sm text-base-content/70">
                  Un récit inspirant sur l&apos;impact des cliniques mobiles.
                </p>
              </div>
            </article>
            <article className="card bg-base-100 shadow">
              <div className="card-body">
                <div className="badge badge-outline badge-primary badge-soft">
                  Événements
                </div>
                <h4 className="card-title mt-2">Forum partenaires 2026</h4>
                <p className="text-sm text-base-content/70">
                  Retour sur notre dernière rencontre avec les acteurs locaux.
                </p>
              </div>
            </article>
          </Stagger>
        </div>
      </section>

      <Reveal from="down">
        <Newsletter
          variant="card"
          title="Recevez nos rapports et appels à l'action"
          description="Un email par mois avec nos chiffres clés, histoires et opportunités d'engagement."
          buttonText="S'abonner"
        />
      </Reveal>

      <Footer />
    </main>
  );
}
