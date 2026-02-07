import Footer from "@/components/footer";
import Header from "@/components/header";
import Newsletter from "@/components/newsletter";
import Reveal from "@/components/motion/reveal";
import Stagger from "@/components/motion/stagger";
import Image from "next/image";
import { FloatingCross } from "@/components/three";

export default function MissionPage() {
  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      <Header />

      <section className="relative overflow-hidden bg-base-200/60">
        <Image
          src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1600&q=80"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-base-200/80 backdrop-blur-[2px]" />
        <FloatingCross className="absolute right-0 top-0 z-0 h-full w-2/5 opacity-80" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <Reveal from="left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Mission
            </p>
          </Reveal>
          <Reveal from="left" delay={0.05}>
            <h1 className="mt-3 text-4xl font-semibold">
              Des soins accessibles, humains et durables
            </h1>
          </Reveal>
          <Reveal from="right" delay={0.1}>
            <p className="mt-4 max-w-3xl text-base text-base-content/70">
              Nous renforçons les systèmes de santé locaux grâce à des cliniques
              mobiles, la formation des équipes et la prévention. Notre approche
              est fondée sur la proximité, l&apos;éthique et l&apos;impact
              mesurable.
            </p>
          </Reveal>
          <Stagger
            from="down"
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <p className="text-xs uppercase tracking-[0.3em] text-primary">
                  2025
                </p>
                <h2 className="mt-2 text-2xl font-semibold">52 cliniques</h2>
                <p className="text-sm text-base-content/70">
                  Missions mobiles actives.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <p className="text-xs uppercase tracking-[0.3em] text-primary">
                  4 pays
                </p>
                <h2 className="mt-2 text-2xl font-semibold">310 communautés</h2>
                <p className="text-sm text-base-content/70">
                  Couvertes par nos équipes.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <p className="text-xs uppercase tracking-[0.3em] text-primary">
                  12 400
                </p>
                <h2 className="mt-2 text-2xl font-semibold">consultations</h2>
                <p className="text-sm text-base-content/70">
                  Par trimestre en moyenne.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <p className="text-xs uppercase tracking-[0.3em] text-primary">
                  1 200
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  soignants formés
                </h2>
                <p className="text-sm text-base-content/70">
                  Mise à niveau continue.
                </p>
              </div>
            </div>
          </Stagger>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr]">
            <Reveal from="left">
              <div>
                <h2 className="text-3xl font-semibold">Notre approche</h2>
                <p className="mt-4 text-base text-base-content/70">
                  Chaque mission est conçue avec les communautés locales pour
                  assurer une continuité des soins et des résultats durables.
                </p>
                <Stagger from="left" alternate className="mt-6 space-y-3">
                  <div className="card bg-base-200 shadow">
                    <div className="card-body">
                      <h3 className="card-title">Soins mobiles</h3>
                      <p className="text-sm text-base-content/70">
                        30 à 45 jours de missions par trimestre pour atteindre
                        les zones isolées.
                      </p>
                    </div>
                  </div>
                  <div className="card bg-base-200 shadow">
                    <div className="card-body">
                      <h3 className="card-title">Formation locale</h3>
                      <p className="text-sm text-base-content/70">
                        Sessions certifiantes et mentorat sur 6 mois.
                      </p>
                    </div>
                  </div>
                  <div className="card bg-base-200 shadow">
                    <div className="card-body">
                      <h3 className="card-title">Prévention</h3>
                      <p className="text-sm text-base-content/70">
                        Campagnes trimestrielles de dépistage et suivi familial.
                      </p>
                    </div>
                  </div>
                </Stagger>
              </div>
            </Reveal>
            <Reveal from="right">
              <div className="card bg-base-100 shadow">
                <figure className="relative h-48 w-full overflow-hidden rounded-t-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&q=80"
                    alt="Carte des zones d'intervention en Afrique"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">Zones d&apos;intervention</h3>
                  <p className="text-sm text-base-content/70">
                    Afrique de l&apos;Ouest et centrale : focus sur les zones
                    rurales, périurbaines et post-crise.
                  </p>
                  <div className="mt-4 grid gap-3 text-sm text-base-content/70">
                    <div className="rounded-xl border border-base-200 p-4">
                      Burkina Faso, Côte d&apos;Ivoire, Cameroun, RDC.
                    </div>
                    <div className="rounded-xl border border-base-200 p-4">
                      Santé maternelle & néonatale.
                    </div>
                    <div className="rounded-xl border border-base-200 p-4">
                      Urgences humanitaires & nutrition.
                    </div>
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
            <h2 className="text-3xl font-semibold">
              Valeurs & engagements éthiques
            </h2>
          </Reveal>
          <Stagger from="down" className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="card bg-base-100 shadow">
              <figure className="relative h-40 w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80"
                  alt="Transparence et rapports"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">Transparence</h3>
                <p className="text-sm text-base-content/70">
                  Rapports trimestriels et audit annuel disponibles.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow">
              <figure className="relative h-40 w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&q=80"
                  alt="Dignité et soins centrés sur le patient"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">Dignité</h3>
                <p className="text-sm text-base-content/70">
                  Protocoles de consentement et approche centrée patient.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow">
              <figure className="relative h-40 w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80"
                  alt="Efficacité dans l'utilisation des fonds"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">Efficacité</h3>
                <p className="text-sm text-base-content/70">
                  90% des fonds dédiés directement aux programmes terrain.
                </p>
              </div>
            </div>
          </Stagger>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn btn-primary" href="/impact">
              Voir notre impact
            </a>
            <a className="btn btn-outline btn-primary" href="/s-impliquer">
              S&apos;impliquer
            </a>
          </div>
        </div>
      </section>

      <Newsletter
        variant="card"
        eyebrow="Newsletter"
        title="Recevez nos avancées sur le terrain"
        description="Rapports, missions et témoignages dans votre boîte mail."
        note="En vous inscrivant, vous acceptez notre politique de confidentialité."
      />

      <Footer />
    </main>
  );
}
