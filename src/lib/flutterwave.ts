/**
 * Flutterwave payment helper.
 *
 * Supports:
 * - Cards (Visa, Mastercard, etc.)
 * - Orange Money
 * - MTN Mobile Money
 * - Other mobile money providers
 *
 * We use the Standard Payment flow:
 * 1. POST /api/donate → creates a Flutterwave payment link
 * 2. User is redirected to Flutterwave hosted page
 * 3. Flutterwave redirects back to our callback URL
 * 4. Webhook confirms the payment server-side
 */

import { getTranslations } from "next-intl/server";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Flutterwave = require("flutterwave-node-v3");

let _flw: ReturnType<typeof createFlutterwaveClient> | null = null;

function createFlutterwaveClient() {
  return new Flutterwave(
    process.env.FLW_PUBLIC_KEY!,
    process.env.FLW_SECRET_KEY!,
  );
}

export function getFlutterwave() {
  if (!_flw) _flw = createFlutterwaveClient();
  return _flw;
}

export type PaymentMethod =
  | "card"
  | "mobilemoneyfranco"
  | "ussd"
  | "banktransfer";

/**
 * Maps user-friendly names to Flutterwave payment_options values.
 * "mobilemoneyfranco" covers Orange Money & MTN in francophone Africa.
 */
export const PAYMENT_OPTIONS: Record<string, string> = {
  card: "card",
  orange_money: "mobilemoneyfranco",
  mtn_mobile_money: "mobilemoneyfranco",
  bank_transfer: "banktransfer",
  ussd: "ussd",
};

export interface CreatePaymentParams {
  amount: number;
  currency: string;
  email: string;
  name: string;
  phone?: string;
  paymentMethod: string;
  project?: string;
  recurring?: boolean;
  txRef: string;
  redirectUrl: string;
}

/**
 * Generate a standard Flutterwave payment link.
 * The user is redirected to complete payment on Flutterwave's hosted page.
 */
export async function createPaymentLink(params: CreatePaymentParams) {
  const flwPaymentOption = PAYMENT_OPTIONS[params.paymentMethod] || "card";

  const t = await getTranslations("flutterwave.don");

  const payload = {
    tx_ref: params.txRef,
    amount: params.amount,
    currency: params.currency,
    redirect_url: params.redirectUrl,
    payment_options: flwPaymentOption,
    customer: {
      email: params.email,
      name: params.name,
      phonenumber: params.phone || "",
    },
    customizations: {
      title: "Nurse Hilfe Menschen Internationale",
      description: params.project
        ? `${t('project')}: ${params.project}`
        : t('fondation'),
      logo: "https://nurseinternationale.com/images/logo-simple.png",
    },
    meta: {
      project: params.project || "general",
      recurring: params.recurring ? "true" : "false",
    },
  };

  const response = await getFlutterwave().Charge.card(payload);
  return response;
}

/** Verify a Flutterwave transaction by its ID. */
export async function verifyTransaction(transactionId: string) {
  const flw = getFlutterwave();
  const response = await flw.Transaction.verify({ id: transactionId });
  return response;
}
