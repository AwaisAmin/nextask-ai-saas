"use client";

import { useEffect } from "react";

export default function GlobalRootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // use sentry for logging in production
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[#0a0a0a] text-white font-sans">
        <div className="text-[80px] font-bold leading-none mb-2 text-[#444]">
          500
        </div>
        <h1 className="text-2xl font-semibold mb-3">Critical error</h1>
        <p className="mb-8 max-w-sm text-[#888]">
          The application failed to load. Please refresh the page.
        </p>
        <button
          onClick={reset}
          className="bg-[#6366f1] text-white rounded-[10px] py-3 px-6 cursor-pointer text-[15px] font-semibold hover:brightness-110 transition-[filter] duration-150"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
