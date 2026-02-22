"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Globe } from "lucide-react";
import { useTransition } from "react";

const LOCALE_LABELS: Record<string, string> = {
  fr: "FR",
  en: "EN",
  de: "DE",
};

const LOCALE_FLAGS: Record<string, string> = {
  fr: "🇫🇷",
  en: "🇬🇧",
  de: "🇩🇪",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleChange(nextLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className={`btn btn-ghost btn-sm gap-1 ${isPending ? "opacity-50" : ""}`}
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span className="text-xs font-semibold">{LOCALE_LABELS[locale]}</span>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box z-50 w-36 bg-base-100 p-2 shadow-lg"
      >
        {routing.locales.map((loc) => (
          <li key={loc}>
            <button
              onClick={() => handleChange(loc)}
              className={loc === locale ? "active font-semibold" : ""}
              disabled={isPending}
            >
              <span>{LOCALE_FLAGS[loc]}</span>
              <span>{LOCALE_LABELS[loc]}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
