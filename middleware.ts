import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = ['/dashboard'];

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ['/sign-in', '/sign-up'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('session')?.value;

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // TEMPORARILY DISABLED FOR FRONTEND DEVELOPMENT
  // Redirect to sign-in if accessing protected route without session
  // if (isProtectedRoute && !sessionToken) {
  //   const signInUrl = new URL('/sign-in', request.url);
  //   signInUrl.searchParams.set('redirect', pathname);
  //   return NextResponse.redirect(signInUrl);
  // }

  // Redirect to dashboard if accessing auth routes with active session
  // if (isAuthRoute && sessionToken) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
};