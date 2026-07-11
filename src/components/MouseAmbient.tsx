"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function MouseAmbient() {
  const mobile = useIsMobile();
  const reduced = useReducedMotion();
  const rafRef = useRef(0);
  const target = useRef({ x: 0.5, y: 0.5 });
  const current = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (mobile || reduced) return;

    const onMove = (e: MouseEvent) => {
      target.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    const tick = () => {
      const lerp = 0.12;
      current.current.x += (target.current.x - current.current.x) * lerp;
      current.current.y += (target.current.y - current.current.y) * lerp;

      const root = document.documentElement;
      root.style.setProperty("--mx", String(current.current.x));
      root.style.setProperty("--my", String(current.current.y));
      root.style.setProperty("--mx-px", `${current.current.x * 100}%`);
      root.style.setProperty("--my-px", `${current.current.y * 100}%`);

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mobile, reduced]);

  if (mobile || reduced) return null;

  return (
    <div className="mouse-ambient" aria-hidden>
      <div className="mouse-ambient__glow" />
    </div>
  );
}
