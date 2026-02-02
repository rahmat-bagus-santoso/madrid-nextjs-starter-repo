'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold">Something went wrong!</h2>
            <p className="mb-4 text-zinc-400">{error.message || 'Unknown error'}</p>
            <button
              onClick={() => reset()}
              className="rounded bg-white px-4 py-2 text-black hover:bg-zinc-200"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
