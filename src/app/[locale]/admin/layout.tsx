import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import {
  LayoutGrid,
  FileText,
  FolderKanban,
  Mail,
  HandHeart,
  PanelLeftOpen,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getTranslations("admin");
  const navItems = [
    { label: t("nav.dashboard"), href: "/admin", icon: LayoutGrid },
    { label: t("nav.posts"), href: "/admin/posts", icon: FileText },
    { label: t("nav.projects"), href: "/admin/projects", icon: FolderKanban },
    { label: t("nav.contacts"), href: "/admin/contacts", icon: Mail },
    { label: t("nav.donations"), href: "/admin/donations", icon: HandHeart },
  ];

  return (
    <div className="drawer lg:drawer-open">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex min-h-screen flex-col bg-base-100">
        <nav className="navbar w-full border-b border-base-300 bg-base-200/70 backdrop-blur">
          <div className="flex-none">
            <label
              htmlFor="admin-drawer"
              aria-label={t("nav.openSidebar")}
              className="btn btn-square btn-ghost"
            >
              <PanelLeftOpen className="size-5" />
            </label>
          </div>
          <div className="flex-1 px-2 text-sm font-semibold text-base-content">
            {t("nav.space")}
          </div>
        </nav>

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="admin-drawer"
          aria-label={t("nav.closeSidebar")}
          className="drawer-overlay"
        />
        <aside className="flex min-h-full flex-col items-start border-r border-base-300 bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          <div className="px-4 py-5">
            <p className="text-xs text-base-content/50 is-drawer-close:hidden">
              {t("nav.space")}
            </p>
          </div>

          <ul className="menu w-full grow gap-0.5 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip={item.label}
                  >
                    <Icon className="size-4" />
                    <span className="is-drawer-close:hidden">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto border-t border-base-300 p-4"></div>
        </aside>
      </div>
    </div>
  );
}
