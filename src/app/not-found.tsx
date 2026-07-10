import Link from "next/link";
import { UI } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-void px-6 text-center">
      <span className="font-mono text-6xl text-cyan/30">404</span>
      <h1 className="mt-6 font-display text-2xl font-bold">
        {UI.notFoundTitle}{" "}
        <span className="rgb-text">{UI.notFoundHighlight}</span>
      </h1>
      <p className="mt-4 max-w-md text-sm text-white/40">
        {UI.notFoundDesc}
      </p>
      <Link
        href="/"
        className="glass-edge glass mt-8 px-8 py-3 font-mono text-xs uppercase tracking-widest text-cyan"
      >
        {UI.returnHome}
      </Link>
    </div>
  );
}
