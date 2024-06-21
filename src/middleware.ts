import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "ua"],

  defaultLocale: "en",
});

let publicUrls = ["/","/auth/callback", "/ua/auth/callback", "/en/auth/callback", '/en', '/ua'];

export async function middleware(req: NextRequest) {
  let res = NextResponse.next();
  let data;
  let intlResponse = intlMiddleware(req);
  if (intlResponse) {
    res.headers.forEach((value, key) => intlResponse.headers.set(key, value));
    res = intlResponse;
  }

  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user?.id) {
    const { data: userData, error: userError } = await supabase
      .from("users_info")
      .select("name")
      .eq("id", session?.user?.id)
      .single();
    data = userData;
  }

  if (session?.user?.id) {
    if (!data) {
      publicUrls.push("/registerForm");
      publicUrls.push("/en/registerForm");
      publicUrls.push("/ua/registerForm");
    } else {
      publicUrls = publicUrls.concat([
        "/account",
        "/account/reset",
        "/yourLove",
        "/events",
        "/en/account",
        "/en/account/reset",
        "/en/yourLove",
        "/en/events",
        "/ua/account",
        "/ua/account/reset",
        "/ua/yourLove",
        "/ua/events",
      ]);
    }
    publicUrls = publicUrls.filter((url) => url !== "/login");
    publicUrls = publicUrls.filter((url) => url !== "/ua/login");
    publicUrls = publicUrls.filter((url) => url !== "/en/login");
    publicUrls = publicUrls.filter((url) => url !== "/login/reset");
    publicUrls = publicUrls.filter((url) => url !== "/ua/login/reset");
    publicUrls = publicUrls.filter((url) => url !== "/en/login/reset");
  } else {
    publicUrls.push("/login");
    publicUrls.push("/en/login");
    publicUrls.push("/ua/login");
    publicUrls.push("/login/reset");
    publicUrls.push("en/login/reset");
    publicUrls.push("ua/login/reset");
  }

  if (
    publicUrls.includes(req.nextUrl.pathname) ||
    (session?.user?.id && req.nextUrl.pathname === "/")
  ) {
    return res;
  }

  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (!data) {
    return NextResponse.redirect(new URL("/registerForm", req.url));
  }

  if (session?.user?.id) {
    return NextResponse.redirect(new URL("/account", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/",
    "/(ua|en)/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};


