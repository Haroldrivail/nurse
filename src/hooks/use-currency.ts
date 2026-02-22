import { useMemo } from "react";

const CONFIGS: Record<string, { currency: string; amounts: number[] }> = {
  EUR: { currency: "EUR", amounts: [20, 30, 50, 100] },
  USD: { currency: "USD", amounts: [20, 35, 60, 120] },
  XAF: { currency: "XAF", amounts: [5000, 10000, 15000, 30000] },
  // ... copies tes autres configs ici
};

const TZ_TO_CURRENCY: Record<string, string> = {
  "Africa/Douala": "XAF",
  "Europe/Paris": "EUR",
  "America/New_York": "USD",
};

export function useCurrency() {
  return useMemo(() => {
    const locale =
      typeof navigator !== "undefined"
        ? navigator.languages?.[0] || navigator.language
        : "fr-FR";
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currencyCode = TZ_TO_CURRENCY[timezone] || "EUR";
    const config = CONFIGS[currencyCode] || CONFIGS["EUR"];

    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: config.currency,
      maximumFractionDigits: 0,
    });

    return { formatter, amounts: config.amounts, currency: config.currency };
  }, []);
}
