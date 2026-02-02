export default function Home() {
  return (
    <main className="page">
      <section className="hero">
        <p className="badge">Fondation solidaire</p>
        <h1>
          Nurse Hilfe Menschen Internationale : soigner, protéger et redonner
          espoir.
        </h1>
        <p className="lede">
          Nous agissons aux côtés des communautés vulnérables pour apporter des
          soins, un soutien psychologique et des programmes de prévention
          partout où les besoins sont urgents.
        </p>
        <div className="actions">
          <a className="cta" href="#don">
            Faire un don
          </a>
          <a className="ghost" href="#projets">
            Découvrir nos actions
          </a>
        </div>
        <div className="impact">
          <div>
            <span className="stat">18</span>
            <span className="label">projets actifs</span>
          </div>
          <div>
            <span className="stat">12K+</span>
            <span className="label">bénéficiaires accompagnés</span>
          </div>
          <div>
            <span className="stat">24</span>
            <span className="label">équipes locales</span>
          </div>
        </div>
      </section>

      <section id="projets" className="section">
        <header className="section__header">
          <p className="section__eyebrow">Causes mises en avant</p>
          <h2>Des actions concrètes sur le terrain</h2>
          <p className="section__desc">
            Nous concentrons nos efforts sur l&apos;accès aux soins, la
            protection des personnes vulnérables et la formation des équipes
            locales pour un impact durable.
          </p>
        </header>
        <div className="cards">
          <article className="card">
            <h3>Cliniques mobiles</h3>
            <p>
              Des unités médicales itinérantes pour apporter des soins d&apos;urgence,
              des vaccinations et des consultations dans les zones isolées.
            </p>
            <a href="#don" className="link">
              Soutenir cette initiative
            </a>
          </article>
          <article className="card">
            <h3>Programme mère-enfant</h3>
            <p>
              Suivi prénatal, accompagnement nutritionnel et ateliers de
              sensibilisation pour réduire la mortalité infantile.
            </p>
            <a href="#don" className="link">
              Agir pour les familles
            </a>
          </article>
          <article className="card">
            <h3>Formation des soignants</h3>
            <p>
              Sessions de formation et de supervision pour renforcer les
              compétences des infirmier·ères et bénévoles locaux.
            </p>
            <a href="#don" className="link">
              Former une équipe locale
            </a>
          </article>
        </div>
      </section>

      <section id="don" className="section highlight">
        <div className="section__header">
          <p className="section__eyebrow">Appel à l&apos;action</p>
          <h2>Votre don se transforme en soins immédiats</h2>
          <p className="section__desc">
            Chaque contribution finance des médicaments, du matériel médical,
            des kits d&apos;hygiène et des formations. Ensemble, nous pouvons
            déployer des équipes là où elles sont le plus nécessaires.
          </p>
        </div>
        <div className="actions">
          <a className="cta" href="mailto:contact@nurse-hilfe.org">
            Je fais un don maintenant
          </a>
          <a className="ghost" href="#projets">
            Voir nos projets
          </a>
        </div>
      </section>
    </main>
  );
}
