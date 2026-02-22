"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { useTranslations } from "next-intl";
import { AlertTriangle, LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError(t("auth.error"));
    } finally {
      setLoading(false);
    }
  }

  const t = useTranslations("admin");

  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-base-100 px-4">
      <div className="card w-full max-w-sm border border-base-300 bg-base-200 shadow-xl">
        <div className="card-body">
          <h1 className="card-title justify-center text-2xl">
            {t("auth.title")}
          </h1>
          <p className="text-center text-sm text-base-content/60">
            {t("auth.description")}
          </p>

          {error && (
            <div className="alert alert-error mt-4 text-sm">
              <AlertTriangle className="size-4" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder={t("fields.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder={t("auth.password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <LogIn className="size-4" />
                  {t("auth.signIn")}
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
