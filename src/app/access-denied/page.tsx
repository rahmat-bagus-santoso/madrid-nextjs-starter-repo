import Link from 'next/link';

export default function AccessDeniedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4 text-white">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-zinc-900 p-8 text-center shadow-xl ring-1 ring-white/10">
        <h1 className="text-3xl font-bold tracking-tight text-red-500">Access Denied</h1>
        <p className="text-zinc-400">
          You do not have permission to view this page.
        </p>
        <div className="pt-4">
          <Link
            href="/dashboard"
            className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-zinc-200 transition-colors"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
