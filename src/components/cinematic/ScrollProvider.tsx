"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import {
  applyScrollProgress,
  readScrollProgress,
  type ScrollPhase,
} from "@/lib/scroll-store";

export type { ScrollPhase };

interface ScrollState {
  progress: number;
  phase: ScrollPhase;
}

const ScrollContext = createContext<ScrollState>({
  progress: 0,
  phase: "hero",
});

export function useScrollState() {
  return useContext(ScrollContext);
}

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ScrollState>({ progress: 0, phase: "hero" });
  const lastUi = useRef({ progress: -1, phase: "hero" as ScrollPhase });

  useEffect(() => {
    let frame = 0;

    const tick = () => {
      const next = applyScrollProgress(readScrollProgress());

      if (
        Math.abs(next.progress - lastUi.current.progress) > 0.0008 ||
        next.phase !== lastUi.current.phase
      ) {
        lastUi.current = next;
        setState(next);
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    const onResize = () => applyScrollProgress(readScrollProgress());
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <ScrollContext.Provider value={state}>{children}</ScrollContext.Provider>
  );
}
