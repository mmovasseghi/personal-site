"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";

const MAX = 14;

interface Dot {
  x: number;
  y: number;
  life: number;
}

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dots = useRef<Dot[]>([]);
  const mobile = useIsMobile();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (mobile || reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      if (dots.current.length >= MAX) dots.current.shift();
      dots.current.push({ x: e.clientX, y: e.clientY, life: 1 });
    };

    let id = 0;
    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      dots.current = dots.current.filter((d) => {
        d.life -= 0.06;
        if (d.life <= 0) return false;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.5 * d.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129, 140, 248, ${d.life * 0.35})`;
        ctx.fill();
        return true;
      });
      id = requestAnimationFrame(draw);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    draw();

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [mobile, reduced]);

  if (mobile || reduced) return null;

  return <canvas ref={canvasRef} className="mouse-trail" aria-hidden />;
}
