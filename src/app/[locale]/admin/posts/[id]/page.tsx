import {
  createServerSupabase,
  createServiceSupabase,
} from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Post, PostTranslation } from "@/lib/supabase/types";
import PostForm from "../post-form";
import { updatePost } from "../../actions";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin");
  return { title: `${t("post.editTitle")} — ${t("nav.space")}` };
}

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export default async function EditPostPage({ params }: Props) {
  const { id, locale } = await params;
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/admin/login`);

  const db = createServiceSupabase();

  const [{ data: postData }, { data: rawTranslations }] = await Promise.all([
    db.from("posts").select("*").eq("id", id).single(),
    db.from("post_translations").select("*").eq("post_id", id),
  ]);

  if (!postData) notFound();
  const post = postData as unknown as Post;

  // Key translations by locale
  const translations: Record<string, PostTranslation> = {};
  for (const t of (rawTranslations ?? []) as PostTranslation[]) {
    translations[t.locale] = t;
  }

  const boundUpdate = async (formData: FormData) => {
    "use server";
    await updatePost(id, formData);
  };

  const t = await getTranslations("admin.post");

  if (!post) {
    notFound();
  }

  return (
    <PostForm
      post={post}
      translations={translations}
      action={boundUpdate}
      heading={t("editTitle")}
    />
  );
}
