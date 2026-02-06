import DonationAmounts from "@/components/donation-amounts";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Reveal from "@/components/motion/reveal";
import Stagger from "@/components/motion/stagger";

export default function DonsPage() {
  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      <Header />

      <section className="bg-base-200/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Reveal from="left">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  Faire un don
                </p>
              </Reveal>
              <Reveal from="left" delay={0.05}>
                <h1 className="mt-3 text-4xl font-semibold">
                  Un impact durable, ponctuel ou mensuel
                </h1>
              </Reveal>
              <Reveal from="left" delay={0.1}>
                <p className="mt-4 max-w-3xl text-base text-base-content/70">
                  Choisissez un montant, soutenez un projet précis et recevez un
                  reçu fiscal selon la législation applicable. Le don régulier
                  assure la continuité des soins, la formation des équipes
                  locales et la réponse rapide aux urgences.
                </p>
              </Reveal>
              <Reveal from="left" delay={0.15}>
                <DonationAmounts />
              </Reveal>
              <Reveal from="left" delay={0.2}>
                <p className="mt-4 text-sm text-base-content/60">
                  Paiements acceptés : carte bancaire, PayPal, virement
                  bancaire, mobile money.
                </p>
              </Reveal>
              <Reveal from="left" delay={0.25}>
                <div className="mt-6 flex flex-wrap gap-4">
                  <a className="btn btn-primary" href="#formulaire">
                    Accéder au formulaire de don
                  </a>
                  <a className="btn btn-outline btn-primary" href="#niveaux">
                    Voir les niveaux d&apos;impact
                  </a>
                </div>
              </Reveal>
            </div>
            <Reveal from="right">
              <div className="card bg-base-100 shadow">
                <div className="card-body">
                  <h2 className="card-title">Pourquoi donner ?</h2>
                  <Stagger
                    from="left"
                    alternate
                    className="mt-2 space-y-2 text-sm text-base-content/70"
                    stagger={0.06}
                  >
                    <div>• 20€ financent un kit d&apos;hygiène familiale.</div>
                    <div>• 50€ soutiennent une consultation prénatale.</div>
                    <div>• 100€ contribuent à former un bénévole.</div>
                  </Stagger>
                  <div className="alert alert-info mt-4 text-xs">
                    Les reçus fiscaux sont délivrés automatiquement selon les
                    réglementations locales.
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="formulaire" className="bg-base-100">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-20">
          <Reveal from="left" className="card bg-base-200 shadow">
            <div className="card-body">
              <h3 className="card-title">Vos informations</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 w-full">
                <input
                  className="input input-bordered w-full"
                  placeholder="Prénom"
                />
                <input
                  className="input input-bordered w-full"
                  placeholder="Nom"
                />
                <input
                  className="input input-bordered sm:col-span-2 w-full"
                  placeholder="Email"
                  type="email"
                />
                <input
                  className="input input-bordered sm:col-span-2 w-full"
                  placeholder="Pays"
                />
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-semibold">Type de don</h4>
                <div className="mt-3 flex flex-wrap gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="don-ponctuel"
                      className="checkbox checkbox-primary"
                    />
                    <span className="text-sm">Ponctuel</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="don-mensuel"
                      className="checkbox checkbox-primary"
                    />
                    <span className="text-sm">Mensuel</span>
                  </label>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-semibold">Projet soutenu</h4>
                <select className="select select-bordered mt-3 w-full">
                  <option>Urgence & premiers secours</option>
                  <option>Santé maternelle</option>
                  <option>Cliniques mobiles</option>
                  <option>Nutrition & prévention</option>
                </select>
              </div>
              <div className="mt-6">
                <button className="btn btn-primary w-full">
                  Continuer vers le paiement
                </button>
              </div>
            </div>
          </Reveal>
          <Reveal from="right" className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="card-title">Votre impact</h3>
              <p className="text-sm text-base-content/70">
                Les dons réguliers stabilisent nos programmes et renforcent les
                équipes sur le terrain.
              </p>
              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-base-200 p-4">
                  <p className="text-sm font-semibold">20€</p>
                  <p className="text-sm text-base-content/70">
                    1 kit d&apos;hygiène et un suivi familial.
                  </p>
                </div>
                <div className="rounded-xl border border-base-200 p-4">
                  <p className="text-sm font-semibold">50€</p>
                  <p className="text-sm text-base-content/70">
                    Consultation prénatale + dépistage.
                  </p>
                </div>
                <div className="rounded-xl border border-base-200 p-4">
                  <p className="text-sm font-semibold">100€</p>
                  <p className="text-sm text-base-content/70">
                    Formation d&apos;un agent de santé local.
                  </p>
                </div>
              </div>
              <div className="alert alert-success mt-6 text-sm">
                90% des dons financent directement les programmes terrain.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="niveaux" className="bg-base-200/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <Reveal from="left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Don récurrent
            </p>
          </Reveal>
          <Reveal from="left" delay={0.05}>
            <h2 className="mt-3 text-3xl font-semibold">
              Un impact durable chaque mois
            </h2>
          </Reveal>
          <Reveal from="right" delay={0.1}>
            <p className="mt-4 max-w-3xl text-base text-base-content/70">
              Le don régulier assure la continuité des soins, la formation des
              équipes locales et la réponse rapide aux urgences.
            </p>
          </Reveal>
          <Stagger from="down" className="grid gap-6 md:grid-cols-3">
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <div className="badge badge-primary">Essentiel</div>
                <h2 className="card-title mt-2">25€/mois</h2>
                <p className="text-sm text-base-content/70">
                  Financement de kits d&apos;hygiène et de consultations de
                  base.
                </p>
                <div className="card-actions">
                  <a className="btn btn-outline btn-primary" href="/dons">
                    Choisir ce niveau
                  </a>
                </div>
              </div>
            </div>
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <div className="badge badge-primary">Impact</div>
                <h2 className="card-title mt-2">50€/mois</h2>
                <p className="text-sm text-base-content/70">
                  Soutien continu aux équipes mobiles et suivi des patients.
                </p>
                <div className="card-actions">
                  <a className="btn btn-outline btn-primary" href="/dons">
                    Choisir ce niveau
                  </a>
                </div>
              </div>
            </div>
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <div className="badge badge-primary">Ambassadeur</div>
                <h2 className="card-title mt-2">100€/mois</h2>
                <p className="text-sm text-base-content/70">
                  Formation des soignants locaux et investissements durables.
                </p>
                <div className="card-actions">
                  <a className="btn btn-outline btn-primary" href="/dons">
                    Choisir ce niveau
                  </a>
                </div>
              </div>
            </div>
          </Stagger>
          <Reveal from="left" delay={0.05}>
            <div className="mt-8">
              <p className="text-sm text-base-content/70">
                Besoin d&apos;un montant personnalisé ? Choisissez un niveau
                libre.
              </p>
              <DonationAmounts />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-20">
          <Reveal from="left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Suivi & transparence
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                Vous recevez des nouvelles concrètes
              </h2>
              <p className="mt-4 text-base text-base-content/70">
                Chaque trimestre, un rapport simplifié sur l&apos;utilisation
                des fonds et les résultats atteints.
              </p>
            </div>
          </Reveal>
          <Reveal from="right">
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <ul className="space-y-3 text-sm text-base-content/70">
                  <li>• Updates mensuels sur les projets soutenus.</li>
                  <li>• Accès prioritaire à nos événements.</li>
                  <li>• Témoignages et histoires de terrain.</li>
                </ul>
                <div className="card-actions mt-4">
                  <a className="btn btn-primary" href="/dons">
                    Mettre en place mon don
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-base-200/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <Reveal from="left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Questions fréquentes
            </p>
          </Reveal>
          <Reveal from="left" delay={0.05}>
            <h2 className="mt-3 text-3xl font-semibold">
              Tout savoir sur le don régulier
            </h2>
          </Reveal>
          <Stagger
            from="left"
            alternate
            className="mt-8 grid gap-6 md:grid-cols-2"
          >
            {[
              {
                q: "Puis-je arrêter mon don quand je veux ?",
                a: "Oui, votre contribution est sans engagement et modifiable à tout moment.",
              },
              {
                q: "Les reçus fiscaux sont-ils disponibles ?",
                a: "Nous envoyons automatiquement les reçus selon la réglementation locale.",
              },
              {
                q: "Comment sont utilisés les fonds ?",
                a: "Les dons sont affectés aux programmes prioritaires avec traçabilité.",
              },
              {
                q: "Puis-je choisir un projet spécifique ?",
                a: "Oui, vous pouvez flécher votre don vers un programme précis.",
              },
            ].map((item) => (
              <div key={item.q} className="card bg-base-200 shadow">
                <div className="card-body">
                  <h3 className="card-title">{item.q}</h3>
                  <p className="text-sm text-base-content/70">{item.a}</p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <Footer />
    </main>
  );
}
