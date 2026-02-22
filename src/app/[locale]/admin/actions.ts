"use server";

import {
  createServerSupabase,
  createServiceSupabase,
} from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const LOCALES = ["fr", "en", "de"] as const;

function isValidLocale(value: string): value is (typeof LOCALES)[number] {
  return LOCALES.includes(value as (typeof LOCALES)[number]);
}

function localeFromFormData(formData: FormData) {
  const value = String(formData.get("locale") || "fr");
  return isValidLocale(value) ? value : "fr";
}

function localizedPath(locale: string, path: string) {
  return locale === "fr" ? path : `/${locale}${path}`;
}

function localizedAdminPath(locale: string, path: string) {
  return localizedPath(locale, `/admin${path}`);
}

function revalidateAdminPath(path: string) {
  for (const locale of LOCALES) {
    revalidatePath(localizedAdminPath(locale, path));
  }
}

function revalidatePublicPath(path: string) {
  for (const locale of LOCALES) {
    revalidatePath(localizedPath(locale, path));
  }
}

// ─── Auth guard ──────────────────────────────────────────
async function requireAdmin(locale = "fr") {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(localizedAdminPath(locale, "/login"));
  return user;
}

// ─── Posts ───────────────────────────────────────────────
export async function createPost(formData: FormData) {
  const locale = localeFromFormData(formData);
  await requireAdmin(locale);
  const db = createServiceSupabase();

  const published = formData.get("published") === "on";

  // Insert parent row (uses French fields as defaults)
  const { data: post, error } = await db
    .from("posts")
    .insert({
      slug: formData.get("slug") as string,
      title: (formData.get("fr_title") as string) || "",
      excerpt: (formData.get("fr_excerpt") as string) || "",
      content: (formData.get("fr_content") as string) || "",
      category: formData.get("category") as string,
      image: (formData.get("image") as string) || null,
      read_time: (formData.get("read_time") as string) || "4 min",
      published,
      published_at: published ? new Date().toISOString() : null,
    })
    .select("id")
    .single();

  if (error || !post) throw new Error(error?.message ?? "Insert failed");

  // Upsert translations for each locale
  const translations = LOCALES.map((locale) => ({
    post_id: post.id,
    locale,
    title: (formData.get(`${locale}_title`) as string) || "",
    excerpt: (formData.get(`${locale}_excerpt`) as string) || "",
    content: (formData.get(`${locale}_content`) as string) || "",
  })).filter((t) => t.title);

  if (translations.length > 0) {
    const { error: tErr } = await db
      .from("post_translations")
      .upsert(translations, { onConflict: "post_id,locale" });
    if (tErr) throw new Error(tErr.message);
  }

  revalidateAdminPath("/posts");
  revalidatePublicPath("/blog");
  redirect(localizedAdminPath(locale, "/posts"));
}

export async function updatePost(id: string, formData: FormData) {
  const locale = localeFromFormData(formData);
  await requireAdmin(locale);
  const db = createServiceSupabase();

  const published = formData.get("published") === "on";

  const { error } = await db
    .from("posts")
    .update({
      slug: formData.get("slug") as string,
      title: (formData.get("fr_title") as string) || "",
      excerpt: (formData.get("fr_excerpt") as string) || "",
      content: (formData.get("fr_content") as string) || "",
      category: formData.get("category") as string,
      image: (formData.get("image") as string) || null,
      read_time: (formData.get("read_time") as string) || "4 min",
      published,
      published_at: published ? new Date().toISOString() : null,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  // Upsert translations
  const translations = LOCALES.map((locale) => ({
    post_id: id,
    locale,
    title: (formData.get(`${locale}_title`) as string) || "",
    excerpt: (formData.get(`${locale}_excerpt`) as string) || "",
    content: (formData.get(`${locale}_content`) as string) || "",
  })).filter((t) => t.title);

  if (translations.length > 0) {
    const { error: tErr } = await db
      .from("post_translations")
      .upsert(translations, { onConflict: "post_id,locale" });
    if (tErr) throw new Error(tErr.message);
  }

  revalidateAdminPath("/posts");
  revalidatePublicPath("/blog");
  redirect(localizedAdminPath(locale, "/posts"));
}

export async function deletePost(id: string, locale = "fr") {
  await requireAdmin(locale);
  const db = createServiceSupabase();
  // Translations cascade-deleted via FK
  const { error } = await db.from("posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAdminPath("/posts");
  revalidatePublicPath("/blog");
}

// ─── Projects ───────────────────────────────────────────
export async function createProject(formData: FormData) {
  const locale = localeFromFormData(formData);
  await requireAdmin(locale);
  const db = createServiceSupabase();

  const { data: project, error } = await db
    .from("projects")
    .insert({
      slug: formData.get("slug") as string,
      title: (formData.get("fr_title") as string) || "",
      theme: formData.get("theme") as string,
      region: formData.get("region") as string,
      impact: (formData.get("fr_impact") as string) || "",
      description: (formData.get("fr_description") as string) || "",
      objectives: (formData.get("fr_objectives") as string) || "",
      activities: (formData.get("fr_activities") as string) || "",
      budget: (formData.get("budget") as string) || null,
      image: (formData.get("image") as string) || null,
      published: formData.get("published") === "on",
    })
    .select("id")
    .single();

  if (error || !project) throw new Error(error?.message ?? "Insert failed");

  const translations = LOCALES.map((locale) => ({
    project_id: project.id,
    locale,
    title: (formData.get(`${locale}_title`) as string) || "",
    description: (formData.get(`${locale}_description`) as string) || "",
    objectives: (formData.get(`${locale}_objectives`) as string) || "",
    activities: (formData.get(`${locale}_activities`) as string) || "",
    impact: (formData.get(`${locale}_impact`) as string) || "",
  })).filter((t) => t.title);

  if (translations.length > 0) {
    const { error: tErr } = await db
      .from("project_translations")
      .upsert(translations, { onConflict: "project_id,locale" });
    if (tErr) throw new Error(tErr.message);
  }

  revalidateAdminPath("/projects");
  revalidatePublicPath("/projects");
  redirect(localizedAdminPath(locale, "/projects"));
}

export async function updateProject(id: string, formData: FormData) {
  const locale = localeFromFormData(formData);
  await requireAdmin(locale);
  const db = createServiceSupabase();

  const { error } = await db
    .from("projects")
    .update({
      slug: formData.get("slug") as string,
      title: (formData.get("fr_title") as string) || "",
      theme: formData.get("theme") as string,
      region: formData.get("region") as string,
      impact: (formData.get("fr_impact") as string) || "",
      description: (formData.get("fr_description") as string) || "",
      objectives: (formData.get("fr_objectives") as string) || "",
      activities: (formData.get("fr_activities") as string) || "",
      budget: (formData.get("budget") as string) || null,
      image: (formData.get("image") as string) || null,
      published: formData.get("published") === "on",
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  const translations = LOCALES.map((locale) => ({
    project_id: id,
    locale,
    title: (formData.get(`${locale}_title`) as string) || "",
    description: (formData.get(`${locale}_description`) as string) || "",
    objectives: (formData.get(`${locale}_objectives`) as string) || "",
    activities: (formData.get(`${locale}_activities`) as string) || "",
    impact: (formData.get(`${locale}_impact`) as string) || "",
  })).filter((t) => t.title);

  if (translations.length > 0) {
    const { error: tErr } = await db
      .from("project_translations")
      .upsert(translations, { onConflict: "project_id,locale" });
    if (tErr) throw new Error(tErr.message);
  }

  revalidateAdminPath("/projects");
  revalidatePublicPath("/projects");
  redirect(localizedAdminPath(locale, "/projects"));
}

export async function deleteProject(id: string, locale = "fr") {
  await requireAdmin(locale);
  const db = createServiceSupabase();
  const { error } = await db.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAdminPath("/projects");
  revalidatePublicPath("/projects");
}

// ─── Contacts ───────────────────────────────────────────
export async function markContactRead(id: string, locale = "fr") {
  await requireAdmin(locale);
  const db = createServiceSupabase();
  const { error } = await db
    .from("contacts")
    .update({ read: true })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAdminPath("/contacts");
}

export async function deleteContact(id: string, locale = "fr") {
  await requireAdmin(locale);
  const db = createServiceSupabase();
  const { error } = await db.from("contacts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAdminPath("/contacts");
}
