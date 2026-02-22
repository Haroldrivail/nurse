"use client";

import { ThemeContext } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { useContext } from "react";
import { useTranslations } from "next-intl";

export default function AdminThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const t = useTranslations("admin");

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="btn btn-ghost btn-sm"
      onClick={() => toggleTheme(nextTheme)}
      aria-label={t("nav.theme")}
      title={t("nav.theme")}
    >
      {theme === "dark" ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
      <span className="hidden sm:inline">{t("nav.theme")}</span>
    </button>
  );
}
