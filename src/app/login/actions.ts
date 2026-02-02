'use server';

import { login as authLogin, UserRole } from '@/lib/auth';
import { redirect } from 'next/navigation';

// TODO 3: Server Actions for Login/Logout
// Server actions allow us to run code on the server directly from the UI.
// Here we set the cookie and redirect the user.

export async function loginAction(role: UserRole, callbackUrl: string = '/dashboard') {
  await authLogin(role);
  redirect(callbackUrl);
}

export async function logoutAction() {
  await import('@/lib/auth').then(m => m.logout());
  redirect('/login');
}
