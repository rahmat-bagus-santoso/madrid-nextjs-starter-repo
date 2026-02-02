import { cookies } from 'next/headers';

// TODO 1: Setup Mock Authentication
// Since we don't have a backend, we simulated it using Cookies.
// This file contains helpers to set, get, and remove the auth cookie.

export const AUTH_COOKIE = 'auth_token';

export type UserRole = 'admin' | 'user' | 'guest';

// Simple mock user interface
export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export async function login(role: UserRole) {
  // In a real app, you would validate credentials here
  const user: User = {
    id: crypto.randomUUID(),
    name: role === 'admin' ? 'Admin User' : 'Standard User',
    role,
  };

  // Create a session (mock)
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
  const cookieStore = await cookies();
  
  // Storing simple JSON in cookie for this demo
  cookieStore.set(AUTH_COOKIE, JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires,
    sameSite: 'lax',
    path: '/',
  });

  return user;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
}

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE);

  if (!token) return null;

  try {
    return JSON.parse(token.value) as User;
  } catch {
    return null;
  }
}
