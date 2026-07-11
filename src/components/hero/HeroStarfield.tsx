"use client";

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Star {
  x: number;
  y: number;
  z: number;
  r: number;
  twinkle: number;
}

export default function HeroStarfield({ density = 220 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const frameRef = useRef(0);
  const reduced = useReducedMotion();

  const initStars = useCallback(
    (w: number, h: number) => {
      starsRef.current = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 1.5 + 0.2,
        r: Math.random() * 1.4 + 0.3,
        twinkle: Math.random() * Math.PI * 2,
      }));
    },
    [density]
  );

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (starsRef.current.length === 0) initStars(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", onMove);

    let id = 0;
    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const mx = (mouseRef.current.x - 0.5) * 24;
      const my = (mouseRef.current.y - 0.5) * 16;
      const t = frameRef.current * 0.008;

      for (const star of starsRef.current) {
        const parallax = 1 / star.z;
        const sx = star.x + mx * parallax;
        const sy = star.y + my * parallax;
        const tw = 0.45 + Math.sin(t * star.z + star.twinkle) * 0.35;
        const alpha = tw * (0.25 + star.z * 0.35);

        ctx.beginPath();
        ctx.arc(sx, sy, star.r * star.z, 0, Math.PI * 2);
        ctx.fillStyle =
          star.z > 1.2
            ? `rgba(191, 219, 254, ${alpha})`
            : `rgba(96, 165, 250, ${alpha * 0.7})`;
        ctx.fill();

        if (star.z > 1.3 && tw > 0.7) {
          ctx.beginPath();
          ctx.arc(sx, sy, star.r * star.z * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(147, 197, 253, ${alpha * 0.15})`;
          ctx.fill();
        }
      }

      frameRef.current++;
      id = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [initStars, reduced]);

  if (reduced) return null;

  return <canvas ref={canvasRef} className="hero-nexus__stars" aria-hidden />;
}
