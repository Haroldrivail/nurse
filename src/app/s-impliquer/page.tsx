import Footer from "@/components/footer";
import Header from "@/components/header";
import Newsletter from "@/components/newsletter";
import Reveal from "@/components/motion/reveal";
import Stagger from "@/components/motion/stagger";

export default function SimpliquerPage() {
  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      <Header />

      <section className="bg-base-200/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <Reveal from="left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              S&apos;impliquer
            </p>
          </Reveal>
          <Reveal from="left" delay={0.05}>
            <h1 className="mt-3 text-4xl font-semibold">
              Agissez avec nous sur le terrain
            </h1>
          </Reveal>
          <Reveal from="right" delay={0.1}>
            <p className="mt-4 max-w-3xl text-base text-base-content/70">
              Bénévolat, partenariats et collectes solidaires : choisissez la
              forme d&apos;engagement qui vous ressemble.
            </p>
          </Reveal>
          <Stagger
            from="left"
            alternate
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <p className="text-xs uppercase tracking-[0.3em] text-primary">
                  120+
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  bénévoles actifs
                </h2>
                <p className="text-sm text-base-content/70">
                  En missions locales et terrain.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <p className="text-xs uppercase tracking-[0.3em] text-primary">
                  38
                </p>
                <h2 className="mt-2 text-2xl font-semibold">partenaires</h2>
                <p className="text-sm text-base-content/70">
                  Institutions & entreprises engagées.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <p className="text-xs uppercase tracking-[0.3em] text-primary">
                  26
                </p>
                <h2 className="mt-2 text-2xl font-semibold">collectes</h2>
                <p className="text-sm text-base-content/70">Lancées en 2025.</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <p className="text-xs uppercase tracking-[0.3em] text-primary">
                  72h
                </p>
                <h2 className="mt-2 text-2xl font-semibold">délai moyen</h2>
                <p className="text-sm text-base-content/70">
                  Pour confirmer une candidature.
                </p>
              </div>
            </div>
          </Stagger>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <Stagger from="down" className="grid gap-6 md:grid-cols-3">
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <h2 className="card-title">Bénévolat</h2>
                <p className="text-sm text-base-content/70">
                  Missions ponctuelles, santé communautaire, logistique et
                  support administratif.
                </p>
                <a
                  className="btn btn-outline btn-primary btn-sm"
                  href="#contact"
                >
                  Découvrir les rôles
                </a>
              </div>
            </div>
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <h2 className="card-title">Partenariats</h2>
                <p className="text-sm text-base-content/70">
                  Entreprises, institutions, fondations locales et médias.
                </p>
                <a
                  className="btn btn-outline btn-primary btn-sm"
                  href="#contact"
                >
                  Devenir partenaire
                </a>
              </div>
            </div>
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <h2 className="card-title">Collectes solidaires</h2>
                <p className="text-sm text-base-content/70">
                  Créez une campagne, fixez un objectif et mobilisez votre
                  réseau.
                </p>
                <a
                  className="btn btn-outline btn-primary btn-sm"
                  href="#contact"
                >
                  Lancer une collecte
                </a>
              </div>
            </div>
          </Stagger>
        </div>
      </section>

      <section className="bg-base-200/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <Reveal from="left">
              <div>
                <h2 className="text-3xl font-semibold">Soutenir durablement</h2>
                <p className="mt-4 text-base text-base-content/70">
                  Les dons récurrents permettent d&apos;assurer la continuité
                  des soins et la planification sur le long terme.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a className="btn btn-primary" href="/dons">
                    Faire un don
                  </a>
                  <a
                    className="btn btn-outline btn-primary"
                    href="/dons#niveaux"
                  >
                    Voir les niveaux d&apos;impact
                  </a>
                </div>
                <div className="mt-4 text-sm text-base-content/60">
                  Besoin d&apos;un échange direct ? Utilisez le formulaire
                  ci-dessous ou écrivez-nous à info@nurseinternationale.com.
                </div>
              </div>
            </Reveal>
            <Reveal from="right">
              <div className="card bg-base-100 shadow">
                <div className="card-body">
                  <h3 className="card-title">Ce que vous activez</h3>
                  <ul className="mt-4 space-y-3 text-sm text-base-content/70">
                    <li>• Approvisionnement en kits médicaux.</li>
                    <li>• Formation d&apos;agents de santé locaux.</li>
                    <li>• Réponse rapide en cas d&apos;urgence.</li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-base-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <Reveal from="left">
              <div>
                <h2 className="text-3xl font-semibold">
                  Échangeons sur votre engagement
                </h2>
                <p className="mt-4 text-base text-base-content/70">
                  Indiquez votre profil et vos disponibilités. Notre équipe vous
                  recontacte sous 72h ouvrées.
                </p>
                <div className="mt-6 space-y-3 text-sm text-base-content/70">
                  <p>• Bénévolat terrain ou support à distance.</p>
                  <p>• Partenariats & mécénat d&apos;entreprise.</p>
                  <p>• Campagnes solidaires et évènements.</p>
                </div>
              </div>
            </Reveal>
            <Reveal from="right">
              <div className="card bg-base-200 shadow">
                <div className="card-body">
                  <form
                    action="mailto:info@nurseinternationale.com"
                    method="post"
                    encType="text/plain"
                    className="grid gap-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-2 w-full">
                      <input
                        name="prenom"
                        className="input input-bordered"
                        placeholder="Prénom"
                        required
                      />
                      <input
                        name="nom"
                        className="input input-bordered"
                        placeholder="Nom"
                        required
                      />
                    </div>
                    <input
                      name="email"
                      type="email"
                      className="input input-bordered w-full"
                      placeholder="Email"
                      required
                    />
                    <select
                      name="profil"
                      className="select select-bordered w-full"
                      required
                    >
                      <option value="">Type d&apos;engagement</option>
                      <option value="benevolat">Bénévolat</option>
                      <option value="partenariat">Partenariat</option>
                      <option value="collecte">Collecte solidaire</option>
                    </select>
                    <textarea
                      name="message"
                      className="textarea textarea-bordered w-full"
                      rows={4}
                      placeholder="Décrivez votre projet ou vos disponibilités"
                      required
                    />
                    <button type="submit" className="btn btn-primary">
                      Envoyer la demande
                    </button>
                    <p className="text-xs text-base-content/60">
                      En envoyant ce formulaire, vous acceptez d&apos;être
                      recontacté par notre équipe.
                    </p>
                  </form>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Newsletter
        variant="card"
        eyebrow="Rester informé"
        title="Recevez nos opportunités d'engagement"
        description="Appels à bénévoles, partenariats et actions de terrain."
        note="En vous inscrivant, vous acceptez notre politique de confidentialité."
      />

      <Footer />
    </main>
  );
}
