import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

function getAdminLocale(pathname: string) {
  const match = pathname.match(/^\/(fr|en|de)\/admin(?:\/|$)/);
  return match?.[1] ?? null;
}

function isAdminPath(pathname: string) {
  return (
    pathname.startsWith("/admin") ||
    /^\/(fr|en|de)\/admin(?:\/|$)/.test(pathname)
  );
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isAdminPath(request.nextUrl.pathname)) {
    const locale = getAdminLocale(request.nextUrl.pathname);
    const loginPath = locale ? `/${locale}/admin/login` : "/admin/login";

    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = loginPath;
      if (request.nextUrl.pathname !== loginPath) {
        return NextResponse.redirect(url);
      }
    }
  }

  return supabaseResponse;
}
