"use client";

import { useState, type FormEvent } from "react";
import { Link } from "@/i18n/navigation";
import type { Post, PostTranslation } from "@/lib/supabase/types";
import { useLocale, useTranslations } from "next-intl";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

const LOCALES = ["fr", "en", "de"] as const;

interface PostFormProps {
  post?: Post;
  translations?: Record<string, PostTranslation>;
  action: (formData: FormData) => Promise<void>;
  heading: string;
}

export default function PostForm({
  post,
  translations = {},
  action,
  heading,
}: PostFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeLocale, setActiveLocale] = useState<string>("fr");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const formData = new FormData(e.currentTarget);
      await action(formData);
      setSuccess(t("feedback.success.saved"));
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("feedback.error.save"));
      setLoading(false);
    }
  }

  const t = useTranslations("admin");
  const locale = useLocale();

  const localeLabels: Record<string, string> = {
    fr: t("locales.fr"),
    en: t("locales.en"),
    de: t("locales.de"),
  };

  const categories = [
    t("post.categories.ground"),
    t("post.categories.emergency"),
    t("post.categories.report"),
    t("post.categories.partnership"),
    t("post.categories.training"),
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <Link
        href="/admin/posts"
        className="text-sm text-base-content/50 hover:text-primary"
      >
        ← {t("nav.posts")}
      </Link>
      <h1 className="mt-2 text-2xl font-semibold">{heading}</h1>

      {success && (
        <div className="alert alert-success mt-4 text-sm">
          <CheckCircle2 className="size-4" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="alert alert-error mt-4 text-sm">
          <AlertTriangle className="size-4" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input type="hidden" name="locale" value={locale} />
        {/* ─── Common fields (locale-independent) ─── */}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">{t("fields.slug")} *</span>
            </div>
            <input
              name="slug"
              type="text"
              className="input input-bordered w-full"
              defaultValue={post?.slug ?? ""}
              required
              pattern="[a-z0-9\-]+"
              title={t("common.slugHint")}
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">{t("fields.category")}</span>
            </div>
            <select
              name="category"
              className="select select-bordered w-full"
              defaultValue={post?.category ?? t("post.categories.ground")}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">{t("fields.ttr")}</span>
            </div>
            <input
              name="read_time"
              type="text"
              className="input input-bordered w-full"
              defaultValue={post?.read_time ?? "4 min"}
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">{t("fields.image")}</span>
            </div>
            <input
              name="image"
              type="url"
              className="input input-bordered w-full"
              defaultValue={post?.image ?? ""}
            />
          </label>
        </div>

        {/* ─── Locale tabs ─── */}
        <div className="divider text-xs uppercase tracking-wider text-base-content/40">
          {t("common.multilingual")}
        </div>

        <div role="tablist" className="tabs tabs-bordered">
          {LOCALES.map((locale) => (
            <button
              key={locale}
              type="button"
              role="tab"
              className={`tab ${
                activeLocale === locale ? "tab-active font-semibold" : ""
              }`}
              onClick={() => setActiveLocale(locale)}
            >
              {localeLabels[locale]}
            </button>
          ))}
        </div>

        {LOCALES.map((locale) => {
          const translation = translations[locale];
          const fallbackTitle = locale === "fr" ? (post?.title ?? "") : "";
          const fallbackExcerpt = locale === "fr" ? (post?.excerpt ?? "") : "";
          const fallbackContent = locale === "fr" ? (post?.content ?? "") : "";

          return (
            <div
              key={locale}
              className={activeLocale === locale ? "space-y-4" : "hidden"}
            >
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    {t("fields.title")} ({locale.toUpperCase()}) *
                  </span>
                </div>
                <input
                  name={`${locale}_title`}
                  type="text"
                  className="input input-bordered w-full"
                  defaultValue={translation?.title ?? fallbackTitle}
                  required={locale === "fr"}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    {t("fields.excerpt")} ({locale.toUpperCase()})
                  </span>
                </div>
                <textarea
                  name={`${locale}_excerpt`}
                  className="textarea textarea-bordered w-full"
                  rows={2}
                  defaultValue={translation?.excerpt ?? fallbackExcerpt}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    {t("fields.content")} ({locale.toUpperCase()})
                  </span>
                </div>
                <textarea
                  name={`${locale}_content`}
                  className="textarea textarea-bordered w-full font-mono text-sm"
                  rows={14}
                  defaultValue={translation?.content ?? fallbackContent}
                />
              </label>
            </div>
          );
        })}

        {/* ─── Publish & submit ─── */}
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            name="published"
            className="checkbox checkbox-primary"
            defaultChecked={post?.published ?? false}
          />
          <span className="label-text">{t("status.published")}</span>
        </label>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              t("actions.save")
            )}
          </button>
          <Link href="/admin/posts" className="btn btn-ghost">
            {t("actions.cancel")}
          </Link>
        </div>
      </form>
    </div>
  );
}
