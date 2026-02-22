import type { MetadataRoute } from "next";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://nurseinternationale.com";

  const supabase = await createServerSupabase();

  const [{ data: posts }, { data: projects }] = await Promise.all([
    supabase.from("posts").select("slug, updated_at").eq("published", true),
    supabase.from("projects").select("slug, updated_at").eq("published", true),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/mission",
    "/impact",
    "/projects",
    "/blog",
    "/s-impliquer",
    "/dons",
    "/legal",
    "/search",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const postRoutes: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
  }));

  const projectRoutes: MetadataRoute.Sitemap = (projects ?? []).map(
    (project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: project.updated_at
        ? new Date(project.updated_at)
        : new Date(),
    }),
  );

  return [...staticRoutes, ...postRoutes, ...projectRoutes];
}
