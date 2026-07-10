"use client";

import { SITE, NAV_ITEMS, UI } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-deep/50 px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:justify-between">
        <div>
          <p className="font-display text-lg font-bold">
            <span className="rgb-text">{SITE.shortName}</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-white/30">
            {SITE.mission}
          </p>
          <p className="mt-4 font-mono text-[10px] text-white/20">
            {SITE.brandFa}
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-xs uppercase tracking-wider text-white/30 transition-colors hover:text-cyan"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="font-mono text-xs text-white/30">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-colors hover:text-cyan"
          >
            {UI.github}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-2 block transition-colors hover:text-cyan"
          >
            {UI.email}
          </a>
          <p className="mt-4 text-[10px] text-white/15">{SITE.location}</p>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/5 pt-6 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/15">
          © {new Date().getFullYear()} {SITE.nameFa}
        </p>
      </div>
    </footer>
  );
}
