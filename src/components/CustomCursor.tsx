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
  const [clicking, setClicking] = useState(false);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const x = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const y = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  const ringX = useSpring(x, { stiffness: 180, damping: 22 });
  const ringY = useSpring(y, { stiffness: 180, damping: 22 });
  const dotX = useSpring(x, { stiffness: 400, damping: 28 });
  const dotY = useSpring(y, { stiffness: 400, damping: 28 });

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

    const down = () => setClicking(true);
    const up = () => setClicking(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [reducedMotion, isTouch, x, y]);

  if (reducedMotion || isTouch) return null;

  const ringSize = hovering ? 36 : 28;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10050]"
        style={{ x: ringX, y: ringY }}
        aria-hidden
      >
        <motion.div
          className={`site-cursor__ring${hovering ? " site-cursor__ring--hover" : ""}`}
          animate={{
            width: ringSize,
            height: ringSize,
            x: -ringSize / 2,
            y: -ringSize / 2,
            scale: clicking ? 0.9 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10051]"
        style={{ x: dotX, y: dotY }}
        aria-hidden
      >
        <motion.div
          className="site-cursor__dot"
          animate={{
            width: hovering ? 6 : 4,
            height: hovering ? 6 : 4,
            x: hovering ? -3 : -2,
            y: hovering ? -3 : -2,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        />
      </motion.div>
    </>
  );
}
