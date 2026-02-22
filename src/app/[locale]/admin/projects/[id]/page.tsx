import {
  createServerSupabase,
  createServiceSupabase,
} from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Project, ProjectTranslation } from "@/lib/supabase/types";
import ProjectForm from "../project-form";
import { updateProject } from "../../actions";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin");
  return {
    title: `${t("actions.edit")} ${t("fields.project")} — ${t("nav.space")}`,
  };
}

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export default async function EditProjectPage({ params }: Props) {
  const { id, locale } = await params;
  const t = await getTranslations("admin");
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/admin/login`);

  const db = createServiceSupabase();

  const [{ data: projectData }, { data: rawTranslations }] = await Promise.all([
    db.from("projects").select("*").eq("id", id).single(),
    db.from("project_translations").select("*").eq("project_id", id),
  ]);

  if (!projectData) notFound();
  const project = projectData as unknown as Project;

  const translations: Record<string, ProjectTranslation> = {};
  for (const t of (rawTranslations ?? []) as ProjectTranslation[]) {
    translations[t.locale] = t;
  }

  const boundUpdate = async (formData: FormData) => {
    "use server";
    await updateProject(id, formData);
  };

  return (
    <ProjectForm
      project={project}
      translations={translations}
      action={boundUpdate}
      heading={`${t("actions.edit")} ${t("fields.project")}`}
    />
  );
}
