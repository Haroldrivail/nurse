import {
  createServerSupabase,
  createServiceSupabase,
} from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { DeletePostButton } from "./delete-button";
import { getTranslations } from "next-intl/server";
import { Plus, Pencil } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin");
  return { title: `${t("nav.posts")} — ${t("nav.space")}` };
}

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function AdminPostsPage({ params }: Props) {
  const { locale } = await params;
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/admin/login`);

  const db = createServiceSupabase();
  const { data } = await db
    .from("posts")
    .select("id, slug, title, category, published, published_at, updated_at")
    .order("created_at", { ascending: false });

  const posts = (data ?? []) as Array<{
    id: string;
    slug: string;
    title: string;
    category: string;
    published: boolean;
    published_at: string | null;
    updated_at: string;
  }>;

  const t = await getTranslations("admin");

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">{t("nav.posts")}</h1>
        <Link href="/admin/posts/new" className="btn btn-primary btn-sm gap-2">
          <Plus className="size-4" />
          {t("post.addTitle")}
        </Link>
      </div>

      {!posts.length ? (
        <p className="mt-10 text-center text-base-content/50">
          {t("common.noEntries")}
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="table table-zebra table-sm w-full">
            <thead>
              <tr>
                <th>{t("fields.title")}</th>
                <th>{t("fields.category")}</th>
                <th>{t("status.published")}</th>
                <th>{t("status.updatedAt")}</th>
                <th className="text-right">{t("common.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="hover">
                  <td className="max-w-50 truncate font-medium">
                    {post.title}
                  </td>
                  <td>
                    <span className="badge badge-outline badge-sm">
                      {post.category}
                    </span>
                  </td>
                  <td>
                    {post.published ? (
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
                    {post.updated_at
                      ? new Date(post.updated_at).toLocaleDateString("fr-FR")
                      : "—"}
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="btn btn-soft btn-circle btn-sm btn-info"
                      >
                        <Pencil className="size-3" />
                      </Link>
                      <DeletePostButton id={post.id} />
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
