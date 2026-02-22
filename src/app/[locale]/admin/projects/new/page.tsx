import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import ProjectForm from "../project-form";
import { createProject } from "../../actions";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin");
  return {
    title: `${t("actions.add")} ${t("fields.project")} — ${t("nav.space")}`,
  };
}

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function NewProjectPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("admin");
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/admin/login`);

  return (
    <ProjectForm
      action={createProject}
      heading={`${t("actions.add")} ${t("fields.project")}`}
    />
  );
}
