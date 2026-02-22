"use client";

import { useRouter } from "@/i18n/navigation";
import { deletePost } from "../actions";
import { useLocale, useTranslations } from "next-intl";
import { Trash2, CheckCircle2 } from "lucide-react";

export function DeletePostButton({ id }: { id: string }) {
  const router = useRouter();
  const locale = useLocale();

  const t = useTranslations("admin");

  return (
    <button
      className="btn btn-soft btn-circle btn-error btn-sm"
      onClick={async () => {
        if (!confirm(t("actions.confirmDelete"))) return;
        await deletePost(id, locale);
        router.refresh();
      }}
    >
      <Trash2 className="size-3" />
    </button>
  );
}

export function DeleteProjectButton({ id }: { id: string }) {
  const router = useRouter();
  const locale = useLocale();

  const t = useTranslations("admin");

  return (
    <button
      className="btn btn-soft btn-circle btn-error btn-sm"
      onClick={async () => {
        if (!confirm(t("actions.confirmDelete"))) return;
        const { deleteProject } = await import("../actions");
        await deleteProject(id, locale);
        router.refresh();
      }}
    >
      <Trash2 className="size-3" />
    </button>
  );
}

export function DeleteContactButton({ id }: { id: string }) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("admin");

  return (
    <button
      className="btn btn-soft btn-circle btn-error btn-sm"
      onClick={async () => {
        if (!confirm(t("actions.confirmDelete"))) return;
        const { deleteContact } = await import("../actions");
        await deleteContact(id, locale);
        router.refresh();
      }}
    >
      <Trash2 className="size-3" />
    </button>
  );
}

export function MarkReadButton({ id }: { id: string }) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("admin");

  return (
    <button
      className="btn btn-soft btn-circle gap-1 btn-xs"
      onClick={async () => {
        const { markContactRead } = await import("../actions");
        await markContactRead(id, locale);
        router.refresh();
      }}
    >
      <CheckCircle2 className="size-3" />
      {t("actions.markRead")}
    </button>
  );
}
