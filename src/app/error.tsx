"use client";

import Link from "next/link";
import { UI } from "@/lib/constants";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-void px-6 text-center">
      <span className="font-mono text-6xl text-cyan/30">ERR</span>
      <h1 className="mt-6 font-display text-2xl font-bold">
        {UI.errorTitle}
      </h1>
      <p className="mt-4 max-w-md text-sm text-white/40">
        {UI.errorDesc}
      </p>
      <div className="mt-8 flex gap-4">
        <button
          type="button"
          onClick={reset}
          className="glass-edge glass px-8 py-3 font-mono text-xs uppercase tracking-widest text-cyan"
        >
          {UI.retry}
        </button>
        <Link
          href="/"
          className="px-8 py-3 font-mono text-xs uppercase tracking-widest text-white/40 hover:text-cyan"
        >
          {UI.returnHome}
        </Link>
      </div>
    </div>
  );
}
