import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  let data;

  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user?.id) {
    const { data: userData, error: userError } = await supabase.from("users_info").select("name").eq("id", session?.user?.id).single();
    data = userData;
  }
  let publivUrls = ["/", "/auth/callback"];

  console.log(data);
  if (session?.user?.id) {
    if (!data) {
      publivUrls.push("/registerForm");
    } else {
      publivUrls = publivUrls.concat([
        "/account",
        "/account/reset",
        "/yourLove",
        "/events",
      ]);
    }
    publivUrls = publivUrls.filter((url) => url !== "/login");
    publivUrls = publivUrls.filter((url) => url !== "/login/reset");
  } else {
    publivUrls.push("/login");
    publivUrls.push("/login/reset");
  }

  if (
    publivUrls.includes(req.nextUrl.pathname) ||
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

  if (session?.user?.id ) {
    return NextResponse.redirect(new URL("/account", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
