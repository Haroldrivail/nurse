import {
  createServerSupabase,
  createServiceSupabase,
} from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import type { Contact } from "@/lib/supabase/types";
import { DeleteContactButton, MarkReadButton } from "../posts/delete-button";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin");
  return { title: `${t("nav.contacts")} — ${t("nav.space")}` };
}

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function AdminContactsPage({ params }: Props) {
  const { locale } = await params;
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/admin/login`);

  const db = createServiceSupabase();
  const { data } = await db
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  const contacts = (data ?? []) as Contact[];
  const unreadCount = contacts.filter((c) => !c.read).length;

  const t = await getTranslations("admin");

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">
          {t("nav.contacts")}
          {unreadCount > 0 && (
            <span className="badge badge-primary badge-sm ml-2">
              {unreadCount} {t("status.unread")}
            </span>
          )}
        </h1>
      </div>

      {!contacts.length ? (
        <p className="mt-10 text-center text-base-content/50">
          {t("common.noEntries")}
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="table table-zebra table-sm w-full">
            <thead>
              <tr>
                <th>{t("fields.name")}</th>
                <th>{t("fields.email")}</th>
                <th>{t("fields.profile")}</th>
                <th>{t("fields.message")}</th>
                <th>{t("fields.date")}</th>
                <th>{t("fields.status")}</th>
                <th className="text-right">{t("common.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="hover">
                  <td className="font-medium">
                    {contact.first_name} {contact.last_name}
                  </td>
                  <td className="text-sm text-base-content/70">
                    {contact.email}
                  </td>
                  <td>
                    <span className="badge badge-outline badge-sm">
                      {contact.profile}
                    </span>
                  </td>
                  <td className="max-w-64 whitespace-pre-wrap text-sm">
                    {contact.message}
                  </td>
                  <td className="text-xs text-base-content/60">
                    {new Date(contact.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>
                    {contact.read ? (
                      <span className="badge badge-ghost badge-sm">
                        {t("status.read")}
                      </span>
                    ) : (
                      <span className="badge badge-primary badge-sm">
                        {t("status.unread")}
                      </span>
                    )}
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {!contact.read && <MarkReadButton id={contact.id} />}
                      <DeleteContactButton id={contact.id} />
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
