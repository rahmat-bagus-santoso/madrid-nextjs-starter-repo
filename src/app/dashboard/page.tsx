import LogoutButton from '@/components/LogoutButton';
import { getSession } from '@/lib/auth';

// TODO 5: Protected Page Example
// This page is protected by the proxy. If a user is not logged in, they are redirected.
// We can also access the user session here to display their name.

export default async function DashboardPage() {
  const session = await getSession();

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-950 p-8 text-white">
      <div className="w-full max-w-4xl space-y-8">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium text-zinc-200">{session?.name}</p>
              <p className="text-xs text-zinc-500 uppercase tracking-wider">{session?.role}</p>
            </div>
            <LogoutButton />
          </div>
        </div>

        <div className="rounded-xl bg-zinc-900 p-6 ring-1 ring-white/10">
          <h2 className="mb-4 text-xl font-semibold text-zinc-200">Protected Content</h2>
          <p className="text-zinc-400">
            This page is protected by Middleware (Proxy). Only authenticated users can see this.
          </p>
        </div>
      </div>
    </div>
  );
}
