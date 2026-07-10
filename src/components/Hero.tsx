"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { SITE, UI } from "@/lib/constants";
import { cinematicEase } from "@/lib/motion";

const TAGLINE_PARTS = SITE.tagline.split(" — ");
const SCRAMBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function LatinReveal({ text, delay = 1.4 }: { text: string; delay?: number }) {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let frame = 0;
    let interval: ReturnType<typeof setInterval> | null = null;
    const max = 18;

    const start = setTimeout(() => {
      interval = setInterval(() => {
        frame++;
        if (frame >= max) {
          setDisplay(text);
          setDone(true);
          if (interval) clearInterval(interval);
          return;
        }
        setDisplay(
          text
            .split("")
            .map((ch, i) =>
              ch === " " || ch === "."
                ? ch
                : i < (frame / max) * text.length
                  ? text[i]
                  : SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)]
            )
            .join("")
        );
      }, 45);
    }, delay * 1000);

    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, delay]);

  return (
    <motion.span
      className="font-mono text-[11px] tracking-[0.25em] text-white/30 sm:text-xs"
      animate={{ opacity: done ? 0.55 : 0.35 }}
    >
      {display || "\u00A0"}
    </motion.span>
  );
}

function GateReveal() {
  return (
    <>
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-0 z-30 w-1/2 bg-void"
        style={{
          boxShadow: "inset -2px 0 40px rgba(0,245,255,0.15)",
        }}
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 1.35, delay: 0.15, ease: cinematicEase }}
      />
      <motion.div
        className="pointer-events-none absolute inset-y-0 right-0 z-30 w-1/2 bg-void"
        style={{
          boxShadow: "inset 2px 0 40px rgba(0,245,255,0.15)",
        }}
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.35, delay: 0.15, ease: cinematicEase }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 z-30 bg-cyan/20"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
      />
    </>
  );
}

function AuroraMesh() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -left-1/4 top-1/4 h-[70vh] w-[70vh] rounded-full blur-[100px]"
        style={{ background: "rgba(67,56,255,0.35)" }}
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/4 top-1/3 h-[60vh] w-[60vh] rounded-full blur-[90px]"
        style={{ background: "rgba(0,245,255,0.22)" }}
        animate={{ x: [0, -50, 0], y: [0, 50, 0], scale: [1.1, 0.9, 1.1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[50vh] w-[50vh] rounded-full blur-[80px]"
        style={{ background: "rgba(124,77,255,0.2)" }}
        animate={{ x: [0, 40, 0], scale: [0.9, 1.15, 0.9] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function HorizonLine() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 top-1/2 z-[1] -translate-y-1/2"
      aria-hidden
    >
      <motion.div
        className="mx-auto h-px w-full max-w-4xl"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,245,255,0.5), rgba(67,56,255,0.6), rgba(0,245,255,0.5), transparent)",
          boxShadow: "0 0 40px rgba(0,245,255,0.4)",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: [0, 1, 0.5] }}
        transition={{ duration: 2, delay: 1, ease: cinematicEase }}
      />
    </motion.div>
  );
}

function DrawRing() {
  const r = 140;
  const c = 2 * Math.PI * r;
  return (
    <motion.svg
      className="pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2"
      width={r * 2 + 20}
      height={r * 2 + 20}
      viewBox={`0 0 ${r * 2 + 20} ${r * 2 + 20}`}
      aria-hidden
    >
      <motion.circle
        cx={r + 10}
        cy={r + 10}
        r={r}
        fill="none"
        stroke="rgba(0,245,255,0.25)"
        strokeWidth="1"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c, opacity: 0 }}
        animate={{ strokeDashoffset: 0, opacity: [0, 0.8, 0.4] }}
        transition={{ duration: 2.5, delay: 0.8, ease: cinematicEase }}
      />
      <motion.circle
        cx={r + 10}
        cy={r + 10}
        r={r * 0.72}
        fill="none"
        stroke="rgba(67,56,255,0.2)"
        strokeWidth="1"
        strokeDasharray={c * 0.72}
        strokeDashoffset={c * 0.72}
        animate={{ strokeDashoffset: 0, rotate: 360 }}
        transition={{
          strokeDashoffset: { duration: 3, delay: 1.2, ease: cinematicEase },
          rotate: { duration: 40, repeat: Infinity, ease: "linear" },
        }}
        style={{ transformOrigin: `${r + 10}px ${r + 10}px` }}
      />
    </motion.svg>
  );
}

const lineReveal = {
  hidden: { opacity: 0, y: 80, scale: 0.85, filter: "blur(24px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.3,
      delay: 1.1 + i * 0.22,
      ease: cinematicEase,
    },
  }),
};

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { stiffness: 35, damping: 16 });
  const sy = useSpring(mouseY, { stiffness: 35, damping: 16 });
  const rotateY = useTransform(sx, [-400, 400], [6, -6]);
  const rotateX = useTransform(sy, [-400, 400], [-4, 4]);
  const bgX = useTransform(sx, [-400, 400], [30, -30]);
  const bgY = useTransform(sy, [-400, 400], [20, -20]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="hero"
      className="section relative flex min-h-[100svh] items-center justify-center overflow-hidden"
      aria-label="معرفی"
      style={{ perspective: 1200 }}
    >
      <GateReveal />

      {/* Background */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ x: bgX, y: bgY }}
      >
        <AuroraMesh />
        <HorizonLine />
        <DrawRing />

        {/* Entry shockwave */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan/70"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: [0, 100, 140], opacity: [1, 0.35, 0] }}
          transition={{ duration: 2.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Floating particles */}
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-cyan"
            style={{
              left: `${(i * 17.3) % 100}%`,
              top: `${(i * 29.7) % 100}%`,
              width: 1 + (i % 2),
              height: 1 + (i % 2),
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.15, 0.8, 0.15],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}

        {/* Sweep */}
        <motion.div
          className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan/70 to-transparent shadow-[0_0_40px_rgba(0,245,255,0.6)]"
          animate={{ top: ["-5%", "105%"] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(6,7,11,0.7) 100%)",
          }}
        />
      </motion.div>

      {/* Side labels — cinematic */}
      <motion.span
        className="pointer-events-none absolute start-6 top-1/2 z-[5] hidden -translate-y-1/2 rotate-180 font-mono text-[10px] tracking-[0.5em] text-cyan/20 [writing-mode:vertical-rl] sm:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        TEHRAN — IRAN
      </motion.span>
      <motion.span
        className="pointer-events-none absolute end-6 top-1/2 z-[5] hidden -translate-y-1/2 font-mono text-[10px] tracking-[0.5em] text-cyan/20 [writing-mode:vertical-rl] sm:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        {SITE.titleEn.toUpperCase()}
      </motion.span>

      {/* Content — 3D tilt */}
      <motion.div
        className="section-inner relative z-10 w-full text-center"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <motion.p
          custom={0}
          variants={lineReveal}
          initial="hidden"
          animate="show"
          className="font-mono text-xs tracking-[0.4em] text-cyan/60"
        >
          {SITE.shortName}
        </motion.p>

        <motion.h1
          custom={1}
          variants={lineReveal}
          initial="hidden"
          animate="show"
          className="fa-text mt-5 px-2 font-display text-[2.5rem] font-bold leading-[1.15] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
        >
          <motion.span
            className="inline-block bg-gradient-to-b from-white via-white to-cyan/80 bg-clip-text text-transparent"
            animate={{
              textShadow: [
                "0 0 40px rgba(0,245,255,0.15)",
                "0 0 100px rgba(0,245,255,0.4), 0 0 60px rgba(67,56,255,0.3)",
                "0 0 40px rgba(0,245,255,0.15)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ WebkitBackgroundClip: "text" }}
          >
            {SITE.nameFa}
          </motion.span>
        </motion.h1>

        <motion.div
          custom={2}
          variants={lineReveal}
          initial="hidden"
          animate="show"
          className="mt-4"
        >
          <LatinReveal text={SITE.name} delay={1.6} />
        </motion.div>

        <motion.p
          custom={3}
          variants={lineReveal}
          initial="hidden"
          animate="show"
          className="fa-text mt-6 text-lg font-medium text-cyan/90 sm:text-xl"
        >
          {SITE.title}
        </motion.p>

        <motion.p
          custom={4}
          variants={lineReveal}
          initial="hidden"
          animate="show"
          className="fa-text mt-2 text-sm text-white/40"
        >
          {SITE.location}
        </motion.p>

        <motion.div
          custom={5}
          variants={lineReveal}
          initial="hidden"
          animate="show"
          className="relative mx-auto my-10 h-px w-full max-w-xs"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 2.2, ease: cinematicEase }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/50 bg-cyan/20 shadow-[0_0_20px_rgba(0,245,255,0.8)]"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </motion.div>

        <motion.p
          custom={6}
          variants={lineReveal}
          initial="hidden"
          animate="show"
          className="fa-text mx-auto max-w-xl text-xl font-medium leading-relaxed text-white/85 sm:text-2xl md:text-3xl"
        >
          {TAGLINE_PARTS[0]}
          {TAGLINE_PARTS[1] && (
            <>
              <br className="hidden sm:block" />
              <span className="rgb-text mt-2 inline-block font-semibold sm:mt-0">
                — {TAGLINE_PARTS[1]}
              </span>
            </>
          )}
        </motion.p>

        <motion.div
          custom={7}
          variants={lineReveal}
          initial="hidden"
          animate="show"
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.a
            href="#about"
            className="fa-text glass-edge glass neon-border group relative w-full overflow-hidden rounded-xl px-10 py-4 font-body text-sm font-medium text-cyan sm:w-auto"
            data-cursor-hover
            whileHover={{ scale: 1.07, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-cyan/10 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            />
            {UI.explore}
          </motion.a>
          <motion.a
            href="#contact"
            className="fa-text w-full rounded-xl border border-white/15 px-10 py-4 font-body text-sm text-white/50 backdrop-blur-sm transition-colors hover:border-cyan/40 hover:text-cyan sm:w-auto"
            data-cursor-hover
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            {UI.heroCtaContact}
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll */}
      <motion.div
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="fa-text text-[11px] text-white/30">{UI.scroll}</span>
          <motion.div className="h-12 w-px overflow-hidden bg-white/10">
            <motion.div
              className="h-1/2 w-full bg-gradient-to-b from-cyan to-transparent"
              animate={{ y: ["-100%", "250%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
