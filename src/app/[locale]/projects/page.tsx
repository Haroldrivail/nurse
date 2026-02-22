import Reveal from "@/components/motion/reveal";
import Stagger from "@/components/motion/stagger";
import Image from "next/image";
import { NetworkGraph } from "@/components/three";
import Link from "next/link";
import { getPublishedProjects } from "@/lib/content";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  return {
    title: `Projets — ${t("title")}`,
    description: t("description"),
  };
}

export default async function ProjectsPage() {
  const locale = await getLocale();
  const allProjects = await getPublishedProjects(locale);
  const t = await getTranslations("projects");

  return (
    <>
      {/* --- HERO : Réseaux & Impact --- */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-base-300">
        <Image
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80"
          alt=""
          fill
          className="object-cover opacity-40"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-base-100" />
        <NetworkGraph
          className="absolute inset-0 z-0 opacity-40"
          nodeCount={30}
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24">
          <Reveal from="left">
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-xs">
              {t("hero.eyebrow")}
            </span>
            <h1 className="mt-4 text-5xl md:text-7xl font-black tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg md:text-xl text-base-content/80 leading-relaxed">
              {t("hero.description")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* --- FILTRES & GRILLE (Simulée) --- */}
      <section className="bg-base-100 pb-24 -mt-10">
        <div className="mx-auto w-full max-w-6xl px-4">
          <Stagger
            from="up"
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {allProjects.map((project) => (
              <article
                key={project.slug}
                className="group card bg-base-100 border border-base-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Image avec Overlay au Hover */}
                <figure className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={
                      project.image ??
                      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80"
                    }
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="badge badge-primary font-bold shadow-lg py-3 px-4 uppercase text-[10px] tracking-widest">
                      {project.theme}
                    </div>
                  </div>
                </figure>

                <div className="card-body p-8 flex flex-col flex-grow">
                  <h2 className="card-title text-2xl font-bold group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {project.title}
                  </h2>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm opacity-70">
                      <span className="font-bold text-primary tracking-tighter uppercase text-[10px] bg-primary/10 px-2 rounded">
                        Region
                      </span>
                      {project.region}
                    </div>
                    <div className="flex items-start gap-2 text-sm opacity-70 italic">
                      {project.impact}
                    </div>
                  </div>

                  {/* Actions avec design "Split" */}
                  <div className="grid grid-cols-2 gap-3 mt-8 pt-6 border-t border-base-200">
                    <Link
                      className="btn btn-ghost btn-sm font-bold border-base-300 hover:bg-base-200"
                      href={`/projects/${project.slug}`}
                    >
                      {t("cards.viewProject")}
                    </Link>
                    <Link
                      className="btn btn-primary btn-sm shadow-md"
                      href="/dons"
                    >
                      {t("cards.support")}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      {/* --- CTA FINAL : Design "Boxed Impact" --- */}
      <section className="bg-base-100 pb-20">
        <div className="mx-auto w-full max-w-6xl px-4">
          <Reveal from="down">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-neutral text-neutral-content p-10 md:p-16">
              {/* Cercles décoratifs en arrière-plan */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="max-w-xl text-center md:text-left">
                  <span className="text-primary font-bold uppercase tracking-widest text-xs">
                    {t("cta.eyebrow")}
                  </span>
                  <h3 className="mt-4 text-3xl md:text-5xl font-black">
                    {t("cta.title")}
                  </h3>
                  <p className="mt-4 opacity-70 text-lg leading-relaxed">
                    {t("cta.description")}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Link
                    className="btn btn-primary btn-lg px-12 rounded-full hover:scale-105 transition-transform"
                    href="/dons"
                  >
                    {t("cta.primary")}
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
