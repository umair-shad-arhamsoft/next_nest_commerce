import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

// Add protected routes here
const protectedRoutes = ['/dashboard', '/profile', '/orders', '/settings'];
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Check if the user is trying to access a protected route without a token
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Check if the user is logged in and trying to access login/register pages
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
