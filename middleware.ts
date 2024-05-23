import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';


export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const publivUrls = ['/account/reset', '/', '/login', '/auth/callback', '/login/reset'];

  if(publivUrls.includes(req.nextUrl.pathname)) {
    return res;
  }

  const supabase = createMiddlewareClient({ req, res });

  const { data: { session }} = await supabase.auth.getSession();

  if(!session) {
    return NextResponse.redirect( new URL('/login', req.url));
  }

  if (req.nextUrl.pathname === '/login' && session) {
    return NextResponse.redirect(new URL('/account', req.url));
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
