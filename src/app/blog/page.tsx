import Footer from "@/components/footer";
import Header from "@/components/header";
import Newsletter from "@/components/newsletter";
import Reveal from "@/components/motion/reveal";
import Stagger from "@/components/motion/stagger";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    title: "Santé maternelle : nos actions sur le terrain",
    excerpt:
      "Un aperçu de nos cliniques mobiles et des consultations prénatales dans les zones isolées.",
    category: "Terrain",
    date: "20 janv. 2026",
    readTime: "4 min",
    href: "https://example.com/articles/sante-maternelle",
  },
  {
    title: "Urgences humanitaires : comment nous intervenons",
    excerpt:
      "Notre protocole d&apos;intervention rapide pour protéger les communautés vulnérables.",
    category: "Urgence",
    date: "12 janv. 2026",
    readTime: "5 min",
    href: "https://example.com/articles/urgences-humanitaires",
  },
  {
    title: "Transparence & impact : rapport 2025",
    excerpt:
      "Les résultats clés, l&apos;utilisation des fonds et les indicateurs d&apos;impact.",
    category: "Rapport",
    date: "05 janv. 2026",
    readTime: "6 min",
    href: "https://example.com/articles/rapport-2025",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      <Header />

      <section className="bg-base-200/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <Reveal from="left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Actualités & histoires
            </p>
          </Reveal>
          <Reveal from="left" delay={0.05}>
            <h1 className="mt-3 text-4xl font-semibold">
              Le journal de la fondation
            </h1>
          </Reveal>
          <Reveal from="right" delay={0.1}>
            <p className="mt-4 max-w-3xl text-base text-base-content/70">
              Suivez nos missions, nos résultats et les témoignages des équipes
              sur le terrain. Chaque article met en lumière l&apos;impact de vos
              dons.
            </p>
          </Reveal>
          <Reveal from="right" delay={0.15}>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="btn btn-primary btn-sm">Tous</button>
              <button className="btn btn-outline btn-primary btn-sm">
                Terrain
              </button>
              <button className="btn btn-outline btn-primary btn-sm">
                Urgence
              </button>
              <button className="btn btn-outline btn-primary btn-sm">
                Rapport
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-base-100">
        <Stagger
          from="down"
          className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-16 md:grid-cols-3 md:py-20"
        >
          {posts.map((post) => (
            <article key={post.title} className="card bg-base-200 shadow">
              <div className="card-body">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary">
                  <span>{post.category}</span>
                  <span className="text-base-content/40">•</span>
                  <span className="normal-case text-base-content/60">
                    {post.date} · {post.readTime}
                  </span>
                </div>
                <h2 className="card-title mt-3 text-xl">{post.title}</h2>
                <p className="text-sm text-base-content/70">{post.excerpt}</p>
                <div className="card-actions mt-4">
                  <Link
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-primary btn-sm"
                  >
                    Lire l&apos;article{" "}
                    <ExternalLinkIcon className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </Stagger>
      </section>

      <Newsletter
        variant="card"
        title="Recevez nos nouvelles directement par email"
        description="Un résumé mensuel avec nos avancées, nos besoins et nos actions de terrain."
        buttonText="S'abonner"
        note="En vous inscrivant, vous acceptez notre politique de confidentialité."
      />

      <Footer />
    </main>
  );
}
