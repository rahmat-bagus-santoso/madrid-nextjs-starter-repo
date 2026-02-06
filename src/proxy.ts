import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE, User } from "./lib/auth";

// TODO AUTH 2: Configure Route Protection (Proxy)
// This file intercepts EVERY request. We can check cookies here to decide
// if a user is allowed to visit a page.

// Step 1: Define which routes need what permissions
// Key: Route path (starts with)
// Value: Array of allowed roles
// Example: '/dashboard': ['user', 'admin'],
const PROTECTED_ROUTES = {
  "/dashboard": ["user", "admin"],
  "/private": ["admin"],
} as const;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // TODO AUTH: Implement Route Protection Logic

  const authCookie = request.cookies.get(AUTH_COOKIE);
  let user: User | null = null;
  if (authCookie) {
    try {
      user = JSON.parse(authCookie.value);
    } catch {
      console.log("dont have cookie");
    }
  }

  const isLoggedIn = !!user;

  if (isLoggedIn && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const protectedRouteKey = Object.keys(PROTECTED_ROUTES).find((route) => pathname.startsWith(route));

  if (protectedRouteKey) {
    if (!isLoggedIn) {
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }

    //RBAC
    const allowedRoles = PROTECTED_ROUTES[protectedRouteKey as keyof typeof PROTECTED_ROUTES];
    if (user && !allowedRoles.includes(user.role as any)) {
      return NextResponse.redirect(new URL("/access-denied", request.url));
    }
  }

  return NextResponse.next();
}
// 1. Get the auth cookie from the request
// const authCookie = ...

// 2. Parse the cookie to get the user (if it exists)
// let user ...

// 3. Check if the user is logged in (!!user)
// const isLoggedIn = ...

// 4. Handle Redirects

// A. Redirect authenticated users AWAY from the login page
// if (isLoggedIn && pathname === '/login') ...

// B. Check if the current path is a PROTECTED route
// const protectedRouteKey = ...

// C. If protected...
//    i. If not logged in -> Redirect to /login
//    ii. If logged in but WRONG role -> Redirect to /access-denied
