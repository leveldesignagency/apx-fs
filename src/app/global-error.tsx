"use client"

/**
 * Root error UI for the App Router. Must be a Client Component and include
 * html/body so the shell still renders if the root layout throws.
 * Having an explicit file avoids RSC client-manifest issues with the built-in stub.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en-GB">
      <body className="min-h-dvh bg-black p-6 font-sans text-white antialiased">
        <h1 className="text-lg font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-white/80">{error.message}</p>
        <button
          type="button"
          className="mt-4 rounded border border-white bg-black px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
          onClick={() => reset()}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
