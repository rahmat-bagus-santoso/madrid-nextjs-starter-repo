'use server';

import { login as authLogin, logout as authLogout } from '@/lib/auth';
import { UserRole } from '@/lib/auth-types';
import { redirect } from 'next/navigation';

export async function exerciseLoginAction(role: UserRole, callbackUrl: string) {
  await authLogin(role);
  redirect(callbackUrl);
}

export async function exerciseLogoutAction() {
  await authLogout();
  redirect('/exercise-dashboard/login');
}
