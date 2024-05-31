import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error: userError } = await supabase
    .from("users_info")
    .select("name")
    .eq("id", session?.user?.id)
    .single();

  let publivUrls = ["/", "/auth/callback"];

  if (session?.user?.id) {
    console.log("Inside first if");

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
  console.log('1')
  console.log(publivUrls)

  if (
    publivUrls.includes(req.nextUrl.pathname) ||
    (session?.user?.id && req.nextUrl.pathname === "/")
  ) {
    return res;
  }
  console.log('2')
  console.log(publivUrls)

  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  console.log('3')
  console.log(publivUrls)
  if (!data) {
    return NextResponse.redirect(new URL("/registerForm", req.url));
  } 

  if (session?.user?.id ) {
    return NextResponse.redirect(new URL("/account", req.url));
  }
  console.log('4')
  console.log(publivUrls)
  

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
