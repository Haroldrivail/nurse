import type { Metadata } from "next";
import Reveal from "@/components/motion/reveal";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug } from "@/lib/content";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const project = await getProjectBySlug(slug, locale);
  const t = await getTranslations("projectDetail");

  if (!project) return { title: t("notFound") };

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.image ? [{ url: project.image }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const project = await getProjectBySlug(slug, locale);
  const t = await getTranslations("projectDetail");

  if (!project) notFound();

  return (
    <>
      {/* ── HERO : Immersion et Contexte ──────────────── */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden bg-neutral text-neutral-content">
        {project.image && (
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            {/* Gradient sombre pour faire ressortir le texte blanc sur l'image */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral via-neutral/60 to-transparent" />
          </>
        )}

        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-16 md:py-24">
          <Reveal from="left">
            <Link
              href="/projects"
              className="group mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary-content/80 hover:text-primary-content transition-colors"
            >
              <span className="group-hover:-translate-x-1 transition-transform">
                ←
              </span>
              {t("backToProjects")}
            </Link>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <Reveal from="left" delay={0.1}>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="badge badge-primary font-bold px-4 py-3">
                    {project.theme}
                  </div>
                  <span className="text-sm font-medium tracking-wide opacity-80 uppercase">
                    {project.region}
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black leading-tight">
                  {project.title}
                </h1>
              </Reveal>
            </div>

            <Reveal from="right" delay={0.2} className="flex items-end">
              <div className="flex flex-wrap gap-4">
                <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">
                    {t("labels.impact")}
                  </p>
                  <p className="text-2xl font-bold">{project.impact}</p>
                </div>
                {project.budget && (
                  <div className="rounded-2xl bg-primary/20 backdrop-blur-md border border-primary/30 p-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">
                      {t("labels.budget")}
                    </p>
                    <p className="text-2xl font-bold">{project.budget}</p>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CONTENU : Lecture Aérée ───────────────────── */}
      <section className="bg-base-100 py-20">
        <div className="mx-auto max-w-5xl px-4">
          <Reveal from="up">
            <div className="mb-16 max-w-3xl">
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-base-content/80">
                {project.description}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-16 md:grid-cols-2 items-start">
            <Reveal from="left">
              <div className="bg-base-200/50 rounded-[2rem] p-8 md:p-12 border border-base-200">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-primary rounded-full" />
                  {t("sections.objectives")}
                </h2>
                <div
                  className="prose prose-primary max-w-none text-base-content/70 prose-li:marker:text-primary"
                  dangerouslySetInnerHTML={{ __html: project.objectives }}
                />
              </div>
            </Reveal>

            <Reveal from="right">
              <div className="p-4 md:p-8">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-secondary rounded-full" />
                  {t("sections.activities")}
                </h2>
                <div
                  className="prose prose-neutral max-w-none text-base-content/70"
                  dangerouslySetInnerHTML={{ __html: project.activities }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA : Engagement ─────────────────────────── */}
      <section className="bg-base-100 pb-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="relative overflow-hidden rounded-[3rem] bg-primary p-10 md:p-16 text-primary-content text-center shadow-2xl">
            {/* Effet décoratif subtil */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <svg width="100%" height="100%">
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <Reveal from="up">
              <h3 className="text-3xl md:text-5xl font-black mb-6">
                {t("cta.title")}
              </h3>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-10 font-medium">
                {t("cta.description")}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/dons"
                  className="btn btn-neutral btn-lg px-12 rounded-full hover:scale-105 transition-transform shadow-xl"
                >
                  {t("cta.primary")}
                </Link>
                <Link
                  href="/projects"
                  className="btn btn-ghost btn-lg px-8 hover:bg-white/10 transition-colors"
                >
                  {t("cta.secondary")}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
