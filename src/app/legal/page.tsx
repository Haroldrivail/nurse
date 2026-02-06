import Footer from "@/components/footer";
import Header from "@/components/header";
import Reveal from "@/components/motion/reveal";

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      <Header />

      <section className="bg-base-200/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <Reveal from="left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Informations légales
            </p>
          </Reveal>
          <Reveal from="left" delay={0.05}>
            <h1 className="mt-3 text-4xl font-semibold">
              Mentions légales & confidentialité
            </h1>
          </Reveal>
          <Reveal from="right" delay={0.1}>
            <p className="mt-4 max-w-3xl text-base text-base-content/70">
              Retrouvez ici les éléments réglementaires concernant
              l&apos;association, la protection des données et les conditions
              d&apos;utilisation.
            </p>
          </Reveal>
          <div className="mt-6 text-sm text-base-content/60">
            Dernière mise à jour : février 2026
          </div>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20 space-y-10">
          <div>
            <h2 className="text-2xl font-semibold">Mentions légales</h2>
            <p className="mt-3 text-sm text-base-content/70">
              Raison sociale, adresse, responsables de publication, numéros
              d&apos;enregistrement et contacts officiels.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-base-content/70">
              <li>• Organisation : Nurse Hilfe Menschen Internationale.</li>
              <li>• Contact officiel : info@nurseinternationale.com</li>
              <li>• Hébergeur : à compléter.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">
              Politique de confidentialité
            </h2>
            <p className="mt-3 text-sm text-base-content/70">
              Collecte, usage, stockage et droits des utilisateurs concernant
              leurs données personnelles.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-base-content/70">
              <li>• Finalité : gestion des dons et communications.</li>
              <li>• Durée : conservation limitée au strict nécessaire.</li>
              <li>• Droits : accès, rectification, suppression.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">
              Conditions d&apos;utilisation
            </h2>
            <p className="mt-3 text-sm text-base-content/70">
              Règles d&apos;usage du site, limitations de responsabilité et
              propriété intellectuelle.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-base-content/70">
              <li>• Usage personnel et non commercial du contenu.</li>
              <li>• Interdiction de reproduction sans autorisation.</li>
              <li>• Responsabilité limitée aux informations publiées.</li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              className="btn btn-primary"
              href="mailto:info@nurseinternationale.com"
            >
              Contacter le responsable
            </a>
            <a className="btn btn-outline btn-primary" href="/about">
              Gouvernance & transparence
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
