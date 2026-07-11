"use client";

import { useEffect } from "react";
import { sitePath } from "@/lib/site-path";

export default function ResumeRedirect() {
  useEffect(() => {
    window.location.replace(`${sitePath("/")}#resume`);
  }, []);

  return (
    <main
      id="main"
      className="flex min-h-screen items-center justify-center bg-[var(--void)] text-white/50"
    >
      <p className="fa-text text-sm">در حال انتقال به بخش رزومه…</p>
    </main>
  );
}
