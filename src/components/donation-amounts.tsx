"use client";

import { useMemo } from "react";

type CurrencyConfig = {
  currency: string;
  amounts: number[];
};

const REGION_CONFIG: Record<string, CurrencyConfig> = {
  EU: { currency: "EUR", amounts: [20, 30, 50, 100] },
  FR: { currency: "EUR", amounts: [20, 30, 50, 100] },
  BE: { currency: "EUR", amounts: [20, 30, 50, 100] },
  DE: { currency: "EUR", amounts: [20, 30, 50, 100] },
  ES: { currency: "EUR", amounts: [20, 30, 50, 100] },
  IT: { currency: "EUR", amounts: [20, 30, 50, 100] },
  PT: { currency: "EUR", amounts: [20, 30, 50, 100] },
  NL: { currency: "EUR", amounts: [20, 30, 50, 100] },
  AT: { currency: "EUR", amounts: [20, 30, 50, 100] },
  IE: { currency: "EUR", amounts: [20, 30, 50, 100] },
  LU: { currency: "EUR", amounts: [20, 30, 50, 100] },
  CH: { currency: "CHF", amounts: [20, 40, 80, 150] },
  GB: { currency: "GBP", amounts: [15, 25, 50, 100] },
  US: { currency: "USD", amounts: [20, 35, 60, 120] },
  CA: { currency: "CAD", amounts: [20, 35, 60, 120] },
  AU: { currency: "AUD", amounts: [20, 35, 60, 120] },
  NZ: { currency: "NZD", amounts: [20, 35, 60, 120] },
  JP: { currency: "JPY", amounts: [2000, 3000, 5000, 10000] },
  KR: { currency: "KRW", amounts: [20000, 30000, 50000, 100000] },
  IN: { currency: "INR", amounts: [500, 1000, 1500, 3000] },
  MA: { currency: "MAD", amounts: [100, 200, 300, 600] },
  DZ: { currency: "DZD", amounts: [1500, 3000, 5000, 10000] },
  TN: { currency: "TND", amounts: [15, 25, 40, 80] },
  SN: { currency: "XOF", amounts: [5000, 10000, 15000, 30000] },
  CI: { currency: "XOF", amounts: [5000, 10000, 15000, 30000] },
  CM: { currency: "XAF", amounts: [5000, 10000, 15000, 30000] },
  CD: { currency: "CDF", amounts: [20000, 40000, 70000, 140000] },
  ZA: { currency: "ZAR", amounts: [150, 250, 500, 1000] },
  NG: { currency: "NGN", amounts: [10000, 20000, 30000, 60000] },
  KE: { currency: "KES", amounts: [1500, 2500, 5000, 10000] },
  GH: { currency: "GHS", amounts: [100, 150, 250, 500] },
};

const DEFAULT_CONFIG: CurrencyConfig = {
  currency: "EUR",
  amounts: [20, 30, 50, 100],
};

const TIMEZONE_REGION: Record<string, string> = {
  "Africa/Douala": "CM",
};

function getBrowserLocale() {
  if (typeof navigator === "undefined") return "fr-FR";
  return (
    navigator.languages?.[0] ||
    navigator.language ||
    Intl.DateTimeFormat().resolvedOptions().locale ||
    "fr-FR"
  );
}

function getRegionFromLocale(locale: string) {
  try {
    return new Intl.Locale(locale).region ?? undefined;
  } catch {
    return undefined;
  }
}

function getRegionFromTimezone() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return (tz && TIMEZONE_REGION[tz]) || undefined;
  } catch {
    return undefined;
  }
}

export default function DonationAmounts() {
  const { amounts, formatter } = useMemo(() => {
    const locale = getBrowserLocale();
    const localeRegion = getRegionFromLocale(locale);
    const region =
      (localeRegion && REGION_CONFIG[localeRegion] && localeRegion) ||
      getRegionFromTimezone();
    const config = (region && REGION_CONFIG[region]) || DEFAULT_CONFIG;
    const formatterInstance = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: config.currency,
      maximumFractionDigits: 0,
    });
    return { ...config, formatter: formatterInstance };
  }, []);

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {amounts.map((amount) => (
        <span key={amount} className="badge badge-lg badge-primary">
          {formatter.format(amount)}
        </span>
      ))}
    </div>
  );
}
