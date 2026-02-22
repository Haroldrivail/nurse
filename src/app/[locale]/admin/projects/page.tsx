import {
  createServerSupabase,
  createServiceSupabase,
} from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { DeleteProjectButton } from "../posts/delete-button";
import { Plus, Pencil } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin");
  return { title: `${t("nav.projects")} — ${t("nav.space")}` };
}

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function AdminProjectsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("admin");
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/admin/login`);

  const db = createServiceSupabase();
  const { data } = await db
    .from("projects")
    .select("id, slug, title, theme, region, published, updated_at")
    .order("created_at", { ascending: false });

  const projects = (data ?? []) as Array<{
    id: string;
    slug: string;
    title: string;
    theme: string;
    region: string;
    published: boolean;
    updated_at: string;
  }>;

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">{t("nav.projects")}</h1>
        <Link
          href="/admin/projects/new"
          className="btn btn-primary btn-sm gap-2"
        >
          <Plus className="size-4" />
          {t("actions.add")}
        </Link>
      </div>

      {!projects.length ? (
        <p className="mt-10 text-center text-base-content/50">
          {t("common.noEntries")}
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="table table-zebra table-sm w-full">
            <thead>
              <tr>
                <th>{t("fields.title")}</th>
                <th>{t("fields.theme")}</th>
                <th>{t("fields.region")}</th>
                <th>{t("status.published")}</th>
                <th>{t("status.updatedAt")}</th>
                <th className="text-right">{t("common.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="hover">
                  <td className="max-w-45 truncate font-medium">
                    {project.title}
                  </td>
                  <td>
                    <span className="badge badge-outline badge-sm">
                      {project.theme}
                    </span>
                  </td>
                  <td className="text-sm">{project.region}</td>
                  <td>
                    {project.published ? (
                      <span className="badge badge-success badge-sm">
                        {t("fields.yes")}
                      </span>
                    ) : (
                      <span className="badge badge-ghost badge-sm">
                        {t("fields.no")}
                      </span>
                    )}
                  </td>
                  <td className="text-xs text-base-content/60">
                    {project.updated_at
                      ? new Date(project.updated_at).toLocaleDateString("fr-FR")
                      : "—"}
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="btn btn-soft btn-circle btn-sm btn-info"
                      >
                        <Pencil className="size-3" />
                      </Link>
                      <DeleteProjectButton id={project.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
