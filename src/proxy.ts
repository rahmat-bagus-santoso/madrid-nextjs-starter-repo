import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIE, User } from './lib/auth';

// TODO 2: Configure Route Protection (Proxy)
// This file intercepts EVERY request. We can check cookies here to decide
// if a user is allowed to visit a page.

// Define which routes need what permissions
const PROTECTED_ROUTES = {
  '/dashboard': ['user', 'admin'], // Both User and Admin can see dashboard
  '/private': ['admin'],           // Only Admin can see private
} as const;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. Check if user is authenticated
  const authCookie = request.cookies.get(AUTH_COOKIE);
  let user: User | null = null;
  
  if (authCookie) {
    try {
      user = JSON.parse(authCookie.value);
    } catch {
      // Invalid cookie
    }
  }

  const isLoggedIn = !!user;

  // 2. Handle Login Page Redirection
  // If user is already logged in and tries to access login page, redirect to dashboard
  if (isLoggedIn && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 3. Check for protected routes
  const protectedRouteKey = Object.keys(PROTECTED_ROUTES).find(route => 
    pathname.startsWith(route)
  );

  if (protectedRouteKey) {
    // If not logged in, redirect to login
    if (!isLoggedIn) {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }

    // Role-based access control
    const allowedRoles = PROTECTED_ROUTES[protectedRouteKey as keyof typeof PROTECTED_ROUTES];
    if (user && !allowedRoles.includes(user.role as any)) {
      // User is logged in but doesn't have permission
      return NextResponse.redirect(new URL('/access-denied', request.url));
    }
  }

  return NextResponse.next();
}
