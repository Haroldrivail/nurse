"use client";

import { useMemo } from "react";

type CurrencyConfig = {
  currency: string;
  amounts: number[];
};

// Regroupement par devise pour plus de clarté
const CONFIGS: Record<string, CurrencyConfig> = {
  EUR: { currency: "EUR", amounts: [20, 30, 50, 100] },
  USD: { currency: "USD", amounts: [20, 35, 60, 120] },
  GBP: { currency: "GBP", amounts: [15, 25, 50, 100] },
  CHF: { currency: "CHF", amounts: [20, 40, 80, 150] },
  XAF: { currency: "XAF", amounts: [5000, 10000, 15000, 30000] },
  // ... ajoute les autres ici
};

// Mapping Pays -> Devise
const COUNTRY_TO_CURRENCY: Record<string, string> = {
  FR: "EUR",
  DE: "EUR",
  BE: "EUR",
  IT: "EUR",
  ES: "EUR",
  US: "USD",
  CA: "USD",
  GB: "GBP",
  CH: "CHF",
  CM: "XAF",
  GA: "XAF",
  TD: "XAF", // Afrique Centrale
  SN: "XOF",
  CI: "XOF", // Afrique de l'Ouest
};

// Mapping Timezone -> Code Pays (ISO 3166-1 alpha-2)
const TZ_TO_COUNTRY: Record<string, string> = {
  "Europe/Paris": "FR",
  "Europe/Brussels": "BE",
  "Europe/Zurich": "CH",
  "America/New_York": "US",
  "Africa/Douala": "CM",
  "Africa/Dakar": "SN",
  // Cette liste peut être étendue selon tes besoins
};

const DEFAULT_CURRENCY = "EUR";

export default function DonationAmounts() {
  const { amounts, formatter } = useMemo(() => {
    // 1. Récupérer les infos du navigateur
    const locale =
      typeof navigator !== "undefined"
        ? navigator.languages?.[0] || navigator.language
        : "fr-FR";
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // 2. Déterminer le pays (Priorité Timezone, puis Locale)
    const countryFromTZ = TZ_TO_COUNTRY[timezone];
    const countryFromLocale = locale.includes("-")
      ? locale.split("-")[1].toUpperCase()
      : undefined;

    const finalCountry = countryFromTZ || countryFromLocale || "FR";

    // 3. Déterminer la devise
    const currencyCode = COUNTRY_TO_CURRENCY[finalCountry] || DEFAULT_CURRENCY;
    const config = CONFIGS[currencyCode] || CONFIGS[DEFAULT_CURRENCY];

    // 4. Formateur intelligent
    const formatterInstance = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: config.currency,
      maximumFractionDigits: 0,
    });

    return { amounts: config.amounts, formatter: formatterInstance };
  }, []);

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {amounts.map((amount) => (
        <span
          key={amount}
          className="badge badge-lg badge-primary p-4 cursor-pointer hover:scale-105 transition-transform"
        >
          {amount} {formatter.formatToParts(amount).find(p => p.type === 'currency')?.value}
        </span>
      ))}
    </div>
  )
}
