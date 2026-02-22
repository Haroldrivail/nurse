import type { Metadata } from "next";
import Reveal from "@/components/motion/reveal";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug } from "@/lib/content";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const post = await getPostBySlug(slug, locale);
  const t = await getTranslations("blogPost");

  if (!post) return { title: t("notFound") };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [{ url: post.image }] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const post = await getPostBySlug(slug, locale);
  const t = await getTranslations("blogPost");

  if (!post) notFound();

  const dateLocale =
    locale === "de" ? "de-DE" : locale === "en" ? "en-GB" : "fr-FR";
  const publishedAt = post.published_at
    ? new Date(post.published_at).toLocaleDateString(dateLocale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <>
      {/* ── HERO : Focus Titre & Image Immersive ──────────────── */}
      <section className="relative min-h-[70vh] flex flex-col justify-end bg-neutral overflow-hidden">
        {post.image && (
          <>
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/20 to-transparent" />
          </>
        )}

        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-16">
          <Reveal from="down">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-primary mb-8 group"
            >
              <span className="group-hover:-translate-x-2 transition-transform">
                ←
              </span>{" "}
              {t("backToBlog")}
            </Link>

            <div className="flex flex-wrap items-center gap-4 text-[10px] font-black uppercase tracking-widest text-primary-content/60 mb-6">
              <span className="bg-primary text-primary-content px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="w-1 h-1 rounded-full bg-current opacity-30" />
              <span>{publishedAt}</span>
              <span className="w-1 h-1 rounded-full bg-current opacity-30" />
              <span>{post.read_time}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tighter text-base-content italic">
              &ldquo;{post.title}&rdquo;
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ── ARTICLE : Expérience de lecture épurée ──────────────── */}
      <section className="bg-base-100 relative">
        <div className="mx-auto w-full max-w-7xl px-4 grid lg:grid-cols-[1fr_300px] gap-16 py-16 md:py-24">
          <main>
            <Reveal from="down" delay={0.2}>
              {/* Introduction stylisée */}
              <p className="text-xl md:text-2xl font-medium text-base-content/70 leading-relaxed mb-12 border-l-4 border-primary pl-8 italic">
                {post.excerpt}
              </p>

              {/* Corps du texte avec Tailwind Typography amélioré */}
              <article
                className="prose prose-lg md:prose-xl prose-neutral max-w-none 
                prose-headings:font-black prose-headings:tracking-tighter 
                prose-p:leading-relaxed prose-p:text-base-content/80
                prose-img:rounded-[2rem] prose-img:shadow-2xl
                prose-blockquote:border-primary prose-blockquote:bg-base-200 prose-blockquote:p-8 prose-blockquote:rounded-2xl prose-blockquote:not-italic"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </Reveal>
          </main>

          {/* Sidebar de support (Don) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              <div className="card bg-primary text-primary-content shadow-2xl rounded-[2rem]">
                <div className="card-body p-8 text-center">
                  <h3 className="text-xl font-black mb-4">{t("cta.title")}</h3>
                  <p className="text-sm opacity-90 mb-6">
                    {t("cta.description")}
                  </p>
                  <Link
                    href="/dons"
                    className="btn btn-neutral btn-block rounded-full font-black uppercase"
                  >
                    {t("cta.primary")}
                  </Link>
                </div>
              </div>

              <div className="p-8 border-2 border-base-200 rounded-[2rem]">
                <h4 className="font-black uppercase text-xs tracking-widest mb-4">
                  Partager
                </h4>
                <div className="flex gap-4">
                  <button className="btn btn-ghost btn-circle btn-sm">𝕏</button>
                  <button className="btn btn-ghost btn-circle btn-sm">f</button>
                  <button className="btn btn-ghost btn-circle btn-sm">
                    in
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── FOOTER : Navigation entre articles ──────────────────── */}
      <section className="bg-base-200 border-t border-base-300 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h3 className="text-sm font-black uppercase tracking-[0.4em] text-primary mb-8">
            Poursuivre la lecture
          </h3>
          <Link
            href="/blog"
            className="btn btn-outline rounded-full px-12 group"
          >
            {t("cta.secondary")}{" "}
            <span className="group-hover:translate-x-2 transition-transform">
              →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
