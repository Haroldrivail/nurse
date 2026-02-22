import {
  createServerSupabase,
  createServiceSupabase,
} from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { FileText, FolderKanban, Mail, HandHeart, LogOut } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin");
  return {
    title: `${t("nav.dashboard")} — ${t("nav.space")}`,
  };
}

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function AdminDashboard({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("admin");
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/${locale}/admin/login`);

  // Use service role to bypass RLS and get accurate counts
  const db = createServiceSupabase();

  const [
    { count: postsCount },
    { count: projectsCount },
    { count: contactsCount },
    { count: donationsCount },
    { count: unreadContacts },
  ] = await Promise.all([
    db.from("posts").select("*", { count: "exact", head: true }),
    db.from("projects").select("*", { count: "exact", head: true }),
    db.from("contacts").select("*", { count: "exact", head: true }),
    db.from("donations").select("*", { count: "exact", head: true }),
    db
      .from("contacts")
      .select("*", { count: "exact", head: true })
      .eq("read", false),
  ]);

  const stats = [
    {
      label: t("nav.posts"),
      icon: FileText,
      count: postsCount ?? 0,
      href: "/admin/posts",
    },
    {
      label: t("nav.projects"),
      icon: FolderKanban,
      count: projectsCount ?? 0,
      href: "/admin/projects",
    },
    {
      label: t("nav.contacts"),
      icon: Mail,
      count: contactsCount ?? 0,
      href: "/admin/contacts",
      badge: unreadContacts ?? 0,
    },
    {
      label: t("nav.donations"),
      icon: HandHeart,
      count: donationsCount ?? 0,
      href: "/admin/donations",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{t("nav.dashboard")}</h1>
          <p className="mt-1 text-sm text-base-content/60">
            {t("auth.connectedAs", { email: user.email ?? "" })}
          </p>
        </div>
        <form action="/api/auth/signout" method="POST">
          <button className="btn btn-outline btn-sm gap-2">
            <LogOut className="size-4" />
            {t("auth.logout")}
          </button>
        </form>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="card border border-base-300 bg-base-200 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div className="rounded-full bg-base-100 p-2 shadow-sm">
                    <Icon className="size-5 text-primary" />
                  </div>
                  {"badge" in s && s.badge ? (
                    <span className="badge badge-warning badge-sm">
                      {s.badge} {t("status.unread")}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-3xl font-bold text-base-content">
                  {s.count}
                </p>
                <p className="text-sm text-base-content/70">{s.label}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
