import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import PostForm from "../post-form";
import { createPost } from "../../actions";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin");
  return { title: `${t("post.addTitle")} — ${t("nav.space")}` };
}

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function NewPostPage({ params }: Props) {
  const { locale } = await params;
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/admin/login`);

  const t = await getTranslations("admin.post");

  return <PostForm action={createPost} heading={t("addTitle")} />;
}
