"use client";

import { useEffect, useRef } from "react";
import { scrollStore } from "@/lib/scroll-store";
import { HACKER_GLYPHS } from "@/lib/hacker-glyphs";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CHARS = [...HACKER_GLYPHS, "0", "1", "A", "F", "X", "|", "\\", ".", ";"];

export default function HackerMatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let columns: number[] = [];
    const fontSize = 13;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w;
      canvas.height = h;
      const cols = Math.ceil(w / fontSize);
      columns = Array.from({ length: cols }, () => Math.random() * h);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.fillStyle = "rgba(2, 6, 23, 0.12)";
      ctx.fillRect(0, 0, w, h);

      const speed = 0.6 + scrollStore.velocity * 28 + scrollStore.progress * 0.4;

      ctx.font = `${fontSize}px var(--font-jetbrains), monospace`;
      for (let i = 0; i < columns.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = columns[i];

        const bright = Math.random() > 0.96;
        ctx.fillStyle = bright ? "#93c5fd" : "rgba(59, 130, 246, 0.35)";
        ctx.fillText(char, x, y);

        if (y > h + Math.random() * 8000) {
          columns[i] = Math.random() * -80;
        }
        columns[i] += speed;
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  if (reduced) return null;

  return <canvas ref={canvasRef} className="tunnel-matrix" aria-hidden />;
}
