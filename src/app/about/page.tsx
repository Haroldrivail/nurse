import Footer from "@/components/footer";
import Header from "@/components/header";
import Reveal from "@/components/motion/reveal";
import Stagger from "@/components/motion/stagger";
import Image from "next/image";
import { FloatingParticles } from "@/components/three";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      <Header />

      <section className="relative overflow-hidden bg-base-200/60">
        <Image
          src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1600&q=80"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-base-200/80 backdrop-blur-[2px]" />
        <FloatingParticles className="z-0 opacity-60" count={100} />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <div className="grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  À propos
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-3 text-4xl font-semibold">
                  Gouvernance, transparence et engagement humain
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 max-w-3xl text-base text-base-content/70">
                  Nurse Hilfe Menschen Internationale s&apos;appuie sur une
                  gouvernance claire, des audits réguliers et un suivi
                  d&apos;impact accessible pour garantir la confiance des
                  donateurs et la pertinence des actions.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-6 flex flex-wrap gap-4">
                  <a className="btn btn-primary" href="/dons">
                    Soutenir la mission
                  </a>
                  <a className="btn btn-outline btn-primary" href="#rapports">
                    Voir les rapports
                  </a>
                </div>
              </Reveal>
            </div>
            <Reveal from="right" delay={0.1}>
              <div className="relative h-64 w-full overflow-hidden rounded-2xl shadow-lg md:h-80">
                <Image
                  src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80"
                  alt="Équipe humanitaire en réunion"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 md:grid-cols-[1.2fr_0.8fr] md:py-20">
          <div>
            <Reveal from="left">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Notre histoire
              </p>
            </Reveal>
            <Reveal from="left" delay={0.05}>
              <h2 className="mt-3 text-3xl font-semibold">
                Une fondation née de l&apos;engagement terrain
              </h2>
            </Reveal>
            <Reveal from="left" delay={0.1}>
              <p className="mt-4 text-base text-base-content/70">
                Fondée par des professionnels de santé et des acteurs
                humanitaires, notre organisation développe des réponses locales
                durables, centrées sur les besoins réels des communautés.
              </p>
            </Reveal>
            <Stagger
              from="left"
              alternate
              className="mt-6 grid gap-4 sm:grid-cols-2"
            >
              <div className="card bg-base-200 shadow">
                <div className="card-body">
                  <h3 className="card-title">Vision</h3>
                  <p className="text-sm text-base-content/70">
                    Un monde où chacun a accès à des soins sûrs et humains.
                  </p>
                </div>
              </div>
              <div className="card bg-base-200 shadow">
                <div className="card-body">
                  <h3 className="card-title">Valeurs</h3>
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
                <h3 className="card-title">Principes d&apos;action</h3>
                <ul className="mt-2 space-y-3 text-sm text-base-content/70">
                  <li>• Co-construction avec les communautés.</li>
                  <li>• Données d&apos;impact accessibles et vérifiables.</li>
                  <li>• Priorité à la santé maternelle et infantile.</li>
                  <li>• Renforcement des compétences locales.</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-base-200/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Équipe dirigeante
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                Une gouvernance responsable
              </h2>
            </div>
            <a className="btn btn-outline btn-primary" href="/dons">
              Devenir membre
            </a>
          </div>
          <Stagger from="down" className="mt-8 grid gap-6 md:grid-cols-4">
            {[
              {
                name: "Dr. Amina K.",
                img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80",
              },
              {
                name: "Jonas Müller",
                img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
              },
              {
                name: "Claire Dupont",
                img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
              },
              {
                name: "Hawa Diallo",
                img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
              },
            ].map((member, index) => (
              <div key={member.name} className="card bg-base-100 shadow">
                <div className="card-body">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <p className="mt-3 font-semibold">{member.name}</p>
                  <p className="text-sm text-base-content/70">
                    {index === 0 && "Présidente • Médecin humanitaire"}
                    {index === 1 && "Secrétaire général • Programmes"}
                    {index === 2 && "Trésorière • Partenariats & impact"}
                    {index === 3 && "Responsable terrain • Santé communautaire"}
                  </p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="rapports" className="bg-base-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Transparence
          </p>
          <h2 className="mt-3 text-3xl font-semibold">Rapports et audits</h2>
          <Stagger from="down" className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Rapport annuel 2025",
                href: "/reports/rapport-2025.pdf",
              },
              {
                title: "Rapport annuel 2024",
                href: "/reports/rapport-2024.pdf",
              },
              {
                title: "Bilan financier 2025",
                href: "/reports/bilan-financier-2025.pdf",
              },
            ].map((report) => (
              <div key={report.title} className="card bg-base-200 shadow">
                <div className="card-body">
                  <h3 className="card-title">{report.title}</h3>
                  <p className="text-sm text-base-content/70">
                    Téléchargement PDF avec indicateurs clés et budgets.
                  </p>
                  <div className="card-actions">
                    <a
                      className="btn btn-primary"
                      href={report.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Télécharger
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>
          <div className="alert alert-info mt-8 text-sm">
            Les audits indépendants et documents juridiques sont disponibles sur
            demande.
          </div>
        </div>
      </section>

      <section className="bg-base-200/60">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Éthique & conformité
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Engagements envers nos donateurs
            </h2>
            <p className="mt-4 text-base text-base-content/70">
              Nous appliquons des procédures strictes de contrôle, de protection
              des données et de redevabilité.
            </p>
          </div>
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <ul className="space-y-3 text-sm text-base-content/70">
                <li>• Charte éthique et code de conduite.</li>
                <li>• Politique de protection des données.</li>
                <li>• Traçabilité des fonds et des projets.</li>
                <li>• Mécanismes de signalement confidentiels.</li>
              </ul>
              <div className="card-actions mt-4">
                <a className="btn btn-outline btn-primary" href="/dons">
                  Consulter la charte
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
