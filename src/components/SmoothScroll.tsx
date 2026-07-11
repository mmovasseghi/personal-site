"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const mobile = useIsMobile();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (mobile || reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.1,
    });

    document.documentElement.classList.add("lenis", "lenis-smooth");

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      window.dispatchEvent(new Event("lenis-scroll"));
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, [mobile, reduced]);

  return <>{children}</>;
}
