/**
 * Double-submit cookie CSRF protection.
 *
 * Flow:
 * 1. Client calls GET /api/csrf → receives a token + Set-Cookie.
 * 2. Client sends POST with header `x-csrf-token: <token>`.
 * 3. Server validates header value === cookie value.
 */

import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

const COOKIE_NAME = "__csrf";

export async function generateCsrfToken(): Promise<string> {
  const token = uuidv4();
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });
  return token;
}

export async function validateCsrfToken(request: Request): Promise<boolean> {
  const headerToken = request.headers.get("x-csrf-token");
  if (!headerToken) return false;

  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(COOKIE_NAME)?.value;
  if (!cookieToken) return false;

  return headerToken === cookieToken;
}
