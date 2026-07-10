"use client";

import { useEffect, useState, useLayoutEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function useIsTouchDevice() {
  const [touch, setTouch] = useState(true);

  useLayoutEffect(() => {
    setTouch(
      window.matchMedia("(max-width: 768px)").matches ||
        window.matchMedia("(pointer: coarse)").matches
    );
  }, []);

  return touch;
}

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const x = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth / 2 : 0
  );
  const y = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight / 2 : 0
  );
  const ringX = useSpring(x, { stiffness: 120, damping: 18, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 120, damping: 18, mass: 0.5 });
  const dotX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.12 });
  const dotY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.12 });

  useEffect(() => {
    if (reducedMotion || isTouch) return;

    document.body.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest("a, button, [data-cursor-hover], input, textarea, select")
      );
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [reducedMotion, isTouch, x, y]);

  if (reducedMotion || isTouch) return null;

  const ringSize = hovering ? 56 : 40;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10050]"
        style={{ x: ringX, y: ringY }}
        aria-hidden
      >
        <motion.div
          className="rounded-full border-2 border-cyan"
          animate={{
            width: ringSize,
            height: ringSize,
            x: -ringSize / 2,
            y: -ringSize / 2,
            opacity: hovering ? 1 : 0.9,
            borderColor: hovering
              ? "rgba(0,245,255,1)"
              : "rgba(0,245,255,0.75)",
            boxShadow: hovering
              ? "0 0 40px rgba(0,245,255,0.7), 0 0 80px rgba(67,56,255,0.35), inset 0 0 20px rgba(0,245,255,0.15)"
              : "0 0 25px rgba(0,245,255,0.5), 0 0 50px rgba(67,56,255,0.25)",
          }}
          transition={{ type: "spring", stiffness: 280, damping: 20 }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10051]"
        style={{ x: dotX, y: dotY }}
        aria-hidden
      >
        <motion.div
          className="rounded-full bg-cyan"
          animate={{
            width: hovering ? 10 : 6,
            height: hovering ? 10 : 6,
            x: hovering ? -5 : -3,
            y: hovering ? -5 : -3,
            boxShadow:
              "0 0 16px rgba(0,245,255,1), 0 0 32px rgba(0,245,255,0.5)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        />
      </motion.div>
    </>
  );
}
