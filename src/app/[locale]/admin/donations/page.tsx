import {
  createServerSupabase,
  createServiceSupabase,
} from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import type { Donation } from "@/lib/supabase/types";
import { getTranslations } from "next-intl/server";
import { Coins } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin");
  return { title: `${t("nav.donations")} — ${t("nav.space")}` };
}

const statusBadge: Record<string, string> = {
  successful: "badge-success",
  pending: "badge-warning",
  failed: "badge-error",
  cancelled: "badge-ghost",
};

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function AdminDonationsPage({ params }: Props) {
  const { locale } = await params;
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/admin/login`);

  const db = createServiceSupabase();
  const { data } = await db
    .from("donations")
    .select("*")
    .order("created_at", { ascending: false });

  const donations = (data ?? []) as Donation[];

  const totalSuccessful = donations
    .filter((d) => d.status === "successful")
    .reduce((sum, d) => sum + d.amount, 0);

  const t = await getTranslations("admin");

  const statusLabels: Record<string, string> = {
    successful: t("donations.statuses.successful"),
    pending: t("donations.statuses.pending"),
    failed: t("donations.statuses.failed"),
    cancelled: t("donations.statuses.cancelled"),
  };

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-semibold">
          <Coins className="size-5 text-primary" />
          {t("nav.donations")}
        </h1>
        <p className="mt-1 text-sm text-base-content/60">
          {t("donations.total")} :{" "}
          <span className="font-bold text-success">
            {totalSuccessful.toLocaleString("fr-FR", {
              style: "currency",
              currency: "EUR",
            })}
          </span>
        </p>
      </div>

      {!donations.length ? (
        <p className="mt-10 text-center text-base-content/50">
          {t("common.noEntries")}
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="table table-zebra table-sm w-full">
            <thead>
              <tr>
                <th>{t("fields.donor")}</th>
                <th>{t("fields.amount")}</th>
                <th>{t("fields.status")}</th>
                <th>{t("fields.method")}</th>
                <th>{t("fields.project")}</th>
                <th>{t("fields.recurring")}</th>
                <th>{t("fields.date")}</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d) => (
                <tr key={d.id} className="hover">
                  <td>
                    <div>
                      <p className="font-medium">{d.donor_name}</p>
                      <p className="text-xs text-base-content/50">
                        {d.donor_email}
                      </p>
                    </div>
                  </td>
                  <td className="font-mono">
                    {d.amount.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: d.currency,
                    })}
                  </td>
                  <td>
                    <span
                      className={`badge badge-sm ${
                        statusBadge[d.status] ?? "badge-ghost"
                      }`}
                    >
                      {statusLabels[d.status] ?? d.status}
                    </span>
                  </td>
                  <td className="text-sm">{d.payment_method}</td>
                  <td className="text-sm">{d.project || "—"}</td>
                  <td>
                    {d.recurring ? (
                      <span className="badge badge-info badge-sm">
                        {t("fields.yes")}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="text-xs text-base-content/60">
                    {new Date(d.created_at).toLocaleDateString("fr-FR")}
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
