import { createServerSupabase } from "@/lib/supabase/server";
import type { Post, Project } from "@/lib/supabase/types";

type PostTranslationRow = {
  locale: string;
  title: string;
  excerpt: string;
  content: string;
};

type ProjectTranslationRow = {
  locale: string;
  title: string;
  description: string;
  objectives: string;
  activities: string;
  impact: string;
};

/**
 * Fetch a single post with locale-specific content.
 * Falls back to the parent row's French content if no translation exists.
 */
export async function getPostBySlug(slug: string, locale: string) {
  const supabase = await createServerSupabase();

  const { data: post } = await supabase
    .from("posts")
    .select("*, post_translations(*)")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) return null;

  const p = post as unknown as Post & {
    post_translations: PostTranslationRow[];
  };

  const translations = p.post_translations ?? [];
  const t =
    translations.find((t) => t.locale === locale) ??
    translations.find((t) => t.locale === "fr");

  return {
    ...p,
    title: t?.title || p.title,
    excerpt: t?.excerpt || p.excerpt,
    content: t?.content || p.content,
    post_translations: undefined,
  };
}

/**
 * Fetch all published posts with locale-specific titles/excerpts.
 */
export async function getPublishedPosts(locale: string) {
  const supabase = await createServerSupabase();

  const { data: posts } = await supabase
    .from("posts")
    .select(
      "slug, title, excerpt, category, image, read_time, published_at, post_translations(locale, title, excerpt)"
    )
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (!posts) return [];

  return (
    posts as unknown as Array<{
      slug: string;
      title: string;
      excerpt: string;
      category: string;
      image: string | null;
      read_time: string;
      published_at: string | null;
      post_translations: Array<{
        locale: string;
        title: string;
        excerpt: string;
      }>;
    }>
  ).map((post) => {
    const translations = post.post_translations ?? [];
    const t =
      translations.find((t) => t.locale === locale) ??
      translations.find((t) => t.locale === "fr");

    return {
      slug: post.slug,
      title: t?.title || post.title,
      excerpt: t?.excerpt || post.excerpt,
      category: post.category,
      image: post.image,
      read_time: post.read_time,
      published_at: post.published_at,
    };
  });
}

/**
 * Fetch a single project with locale-specific content.
 */
export async function getProjectBySlug(slug: string, locale: string) {
  const supabase = await createServerSupabase();

  const { data: project } = await supabase
    .from("projects")
    .select("*, project_translations(*)")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!project) return null;

  const p = project as unknown as Project & {
    project_translations: ProjectTranslationRow[];
  };

  const translations = p.project_translations ?? [];
  const t =
    translations.find((t) => t.locale === locale) ??
    translations.find((t) => t.locale === "fr");

  return {
    ...p,
    title: t?.title || p.title,
    description: t?.description || p.description,
    objectives: t?.objectives || p.objectives,
    activities: t?.activities || p.activities,
    impact: t?.impact || p.impact,
    project_translations: undefined,
  };
}


export async function getPublishedProjects(locale: string) {
  const supabase = await createServerSupabase();

  const { data: projects } = await supabase
    .from("projects")
    .select(
      "slug, title, theme, region, impact, image, project_translations(locale, title, impact)"
    )
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (!projects) return [];

  return (
    projects as unknown as Array<{
      slug: string;
      title: string;
      theme: string;
      region: string;
      impact: string;
      image: string | null;
      project_translations: Array<{
        locale: string;
        title: string;
        impact: string;
      }>;
    }>
  ).map((project) => {
    const translations = project.project_translations ?? [];
    const t =
      translations.find((t) => t.locale === locale) ??
      translations.find((t) => t.locale === "fr");

    return {
      slug: project.slug,
      title: t?.title || project.title,
      theme: project.theme,
      region: project.region,
      impact: t?.impact || project.impact,
      image: project.image,
    };
  });
}
