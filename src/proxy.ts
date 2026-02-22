import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { updateSession } from "@/lib/supabase/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);
const locales = new Set(routing.locales);

function getLocaleFromRequest(request: NextRequest) {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (
    cookieLocale &&
    locales.has(cookieLocale as (typeof routing.locales)[number])
  ) {
    return cookieLocale;
  }

  const acceptLanguage =
    request.headers.get("accept-language")?.toLowerCase() ?? "";
  for (const locale of routing.locales) {
    if (acceptLanguage.includes(locale)) return locale;
  }

  return routing.defaultLocale;
}

function isLocalizedAdminPath(pathname: string) {
  return /^\/(fr|en|de)\/admin(?:\/|$)/.test(pathname);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const locale = getLocaleFromRequest(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/api/") || isLocalizedAdminPath(pathname)) {
    return updateSession(request);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images/).*)",
  ],
};
