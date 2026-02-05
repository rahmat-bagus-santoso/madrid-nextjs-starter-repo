export const AUTH_COOKIE = 'auth_token';

export type UserRole = 'admin' | 'user' | 'guest';

// Simple mock user interface
export interface User {
  id: string;
  name: string;
  role: UserRole;
}
