import { NextResponse } from "next/server";
import { createServiceSupabase } from "@/lib/supabase/server";
import { PAYMENT_OPTIONS } from "@/lib/flutterwave";
import { rateLimit, rateLimitKey } from "@/lib/rate-limit";
import { validateCsrfToken } from "@/lib/csrf";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  /* ── Rate limit ────────────────────────────────────── */
  const key = rateLimitKey(request, "donate");
  const rl = rateLimit(key, { limit: 10, windowSeconds: 300 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Trop de requêtes. Réessayez dans quelques minutes." },
      { status: 429 },
    );
  }

  /* ── CSRF ──────────────────────────────────────────── */
  const csrfValid = await validateCsrfToken(request);
  if (!csrfValid) {
    return NextResponse.json(
      { error: "Token CSRF invalide. Rechargez la page et réessayez." },
      { status: 403 },
    );
  }

  /* ── Parse body ────────────────────────────────────── */
  let body: {
    amount: number;
    currency: string;
    email: string;
    name: string;
    phone?: string;
    paymentMethod: string;
    project?: string;
    recurring?: boolean;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de requête invalide." },
      { status: 400 },
    );
  }

  const {
    amount,
    currency,
    email,
    name,
    paymentMethod,
    project,
    recurring,
    phone,
  } = body;

  /* ── Validation ────────────────────────────────────── */
  if (!amount || amount < 1) {
    return NextResponse.json({ error: "Montant invalide." }, { status: 400 });
  }
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "E-mail invalide." }, { status: 400 });
  }
  if (!name || name.trim().length < 2) {
    return NextResponse.json({ error: "Nom requis." }, { status: 400 });
  }
  if (!paymentMethod || !PAYMENT_OPTIONS[paymentMethod]) {
    return NextResponse.json(
      { error: "Méthode de paiement non reconnue." },
      { status: 400 },
    );
  }

  /* ── Phone required for mobile money ───────────────── */
  const isMobileMoney = [
    "orange_money",
    "mtn_mobile_money",
    "mobile_money_ghana",
    "mobile_money_uganda",
    "mobile_money_rwanda",
    "mobile_money_zambia",
    "mobile_money_tanzania",
  ].includes(paymentMethod);

  if (isMobileMoney && (!phone || phone.length < 8)) {
    return NextResponse.json(
      { error: "Numéro de téléphone requis pour le paiement mobile." },
      { status: 400 },
    );
  }

  /* ── Create transaction reference ──────────────────── */
  const txRef = `nhmi-${uuidv4()}`;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const redirectUrl = `${appUrl}/dons/confirmation?tx_ref=${txRef}`;
  const flwPaymentOption = PAYMENT_OPTIONS[paymentMethod];

  /* ── Save pending donation in DB ───────────────────── */
  const supabase = createServiceSupabase();
  const { error: dbError } = await supabase.from("donations").insert({
    tx_ref: txRef,
    amount,
    currency: currency || "EUR",
    payment_method: paymentMethod,
    status: "pending",
    donor_email: email.trim().toLowerCase(),
    donor_name: name.trim(),
    project: project || null,
    recurring: recurring || false,
    metadata: { phone: phone || null },
  });

  if (dbError) {
    console.error("Donation insert error:", dbError);
    return NextResponse.json(
      { error: "Erreur serveur. Veuillez réessayer." },
      { status: 500 },
    );
  }

  /* ── Build Flutterwave Standard payment link ───────── */
  const flwPayload = {
    tx_ref: txRef,
    amount,
    currency: currency || "EUR",
    redirect_url: redirectUrl,
    payment_options: flwPaymentOption,
    customer: {
      email: email.trim().toLowerCase(),
      name: name.trim(),
      phonenumber: phone || "",
    },
    customizations: {
      title: "Nurse Hilfe Menschen Internationale",
      description: project
        ? `Don pour : ${project}`
        : "Don à la fondation NHMI",
      logo: `${appUrl}/images/logo-simple.png`,
    },
    meta: {
      project: project || "general",
      recurring: recurring ? "true" : "false",
    },
  };

  /* Flutterwave Standard: generate hosted link via API */
  try {
    const flwResponse = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flwPayload),
    });

    const flwData = await flwResponse.json();

    if (flwData.status !== "success") {
      console.error("Flutterwave error:", flwData);
      return NextResponse.json(
        { error: "Impossible d'initialiser le paiement. Réessayez." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      message: "Paiement initialisé",
      paymentLink: flwData.data.link,
      txRef,
    });
  } catch (err) {
    console.error("Flutterwave fetch error:", err);
    return NextResponse.json(
      { error: "Erreur de connexion au service de paiement." },
      { status: 502 },
    );
  }
}
