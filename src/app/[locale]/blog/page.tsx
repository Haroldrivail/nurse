import Newsletter from "@/components/newsletter";
import Reveal from "@/components/motion/reveal";
import Stagger from "@/components/motion/stagger";
import Image from "next/image";
import Link from "next/link";
import { FloatingParticles } from "@/components/three";
import { getPublishedPosts } from "@/lib/content";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  return {
    title: `Journal — ${t("title")}`,
    description: t("description"),
  };
}

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(
    locale === "de" ? "de-DE" : locale === "en" ? "en-GB" : "fr-FR",
    { day: "numeric", month: "short", year: "numeric" },
  );
}

export default async function BlogPage() {
  const locale = await getLocale();
  const allPosts = await getPublishedPosts(locale);
  const t = await getTranslations("blog");
  const tn = await getTranslations("newsletter");

  const newsletterMessages = {
    defaultButton: tn("defaultButton"),
    loading: tn("loading"),
    emailError: tn("emailError"),
    successMessage: tn("successMessage"),
    errorMessage: tn("errorMessage"),
  };

  return (
    <>
      {/* --- HERO : Focus Éditorial --- */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden bg-base-300">
        <Image
          src="https://images.unsplash.com/photo-1504711434969-e33886168d9c?w=1600&q=80"
          alt=""
          fill
          className="object-cover opacity-30 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/40 to-transparent" />
        <FloatingParticles className="z-0 opacity-40" count={80} />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-20">
          <Reveal from="left">
            <span className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-4 block">
              {t("hero.eyebrow")}
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-base-content/70 max-w-2xl leading-relaxed italic">
              {t("hero.description")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* --- GRID : Articles Style Magazine --- */}
      <section className="bg-base-100 pb-24">
        <div className="mx-auto max-w-6xl px-4">
          <Stagger
            from="up"
            className="grid gap-12 md:grid-cols-2 lg:grid-cols-3"
          >
            {allPosts.map((post) => (
              <article key={post.slug} className="group flex flex-col">
                {/* Image avec effet de zoom au survol */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative h-72 w-full overflow-hidden rounded-[2rem] shadow-lg mb-6 block"
                >
                  <Image
                    src={
                      post.image ??
                      "https://images.unsplash.com/photo-1504711434969-e33886168d9c?w=600&q=80"
                    }
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </Link>

                <div className="flex flex-col flex-1 px-2">
                  {/* Meta : Catégorie & Date */}
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary mb-4">
                    <span className="bg-primary/10 px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="opacity-30">/</span>
                    <span className="text-base-content/50">
                      {post.published_at
                        ? formatDate(post.published_at, locale)
                        : ""}
                    </span>
                  </div>

                  {/* Titre & Excerpt */}
                  <h2 className="text-2xl font-bold leading-tight mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-base-content/60 text-sm leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>

                  {/* Footer de carte */}
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-base-200">
                    <span className="text-[10px] font-bold opacity-40 uppercase tracking-tighter">
                      Temps de lecture : {post.read_time}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-black uppercase tracking-widest text-primary hover:gap-3 flex items-center gap-2 transition-all"
                    >
                      {t("cards.read")} <span>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      <Newsletter
        variant="card"
        title={t("newsletter.title")}
        description={t("newsletter.description")}
        buttonText={t("newsletter.button")}
        note={t("newsletter.note")}
        messages={newsletterMessages}
      />
    </>
  );
}
