import { NextResponse } from "next/server";
import { createServiceSupabase } from "@/lib/supabase/server";
import { rateLimit, rateLimitKey } from "@/lib/rate-limit";
import { validateCsrfToken } from "@/lib/csrf";

export async function POST(request: Request) {
  /* ── Rate limit ────────────────────────────────────── */
  const key = rateLimitKey(request, "contact");
  const rl = rateLimit(key, { limit: 5, windowSeconds: 300 });
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
    firstName: string;
    lastName: string;
    email: string;
    profile: string;
    message: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de requête invalide." },
      { status: 400 },
    );
  }

  const { firstName, lastName, email, profile, message } = body;

  if (!firstName || !lastName || !email || !profile || !message) {
    return NextResponse.json(
      { error: "Tous les champs sont requis." },
      { status: 400 },
    );
  }

  if (!email.includes("@") || email.length < 5) {
    return NextResponse.json(
      { error: "Adresse e-mail invalide." },
      { status: 400 },
    );
  }

  /* ── Save to Supabase ──────────────────────────────── */
  const supabase = createServiceSupabase();

  const { error } = await supabase.from("contacts").insert({
    first_name: firstName.trim(),
    last_name: lastName.trim(),
    email: email.trim().toLowerCase(),
    profile,
    message: message.trim(),
  });

  if (error) {
    console.error("Contact insert error:", error);
    return NextResponse.json(
      { error: "Erreur serveur. Veuillez réessayer." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      message:
        "Votre demande a bien été envoyée. Nous vous recontacterons sous 72h.",
    },
    { status: 201 },
  );
}
