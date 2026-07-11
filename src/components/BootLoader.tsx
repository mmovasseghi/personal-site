"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useTransform,
} from "framer-motion";
import { BOOT_STAGES, BOOT_LOGS, SITE, UI } from "@/lib/constants";
import { markBooted } from "@/lib/storage";
import { cinematicEase } from "@/lib/motion";

interface BootLoaderProps {
  onComplete: () => void;
}

const STAGE_MS = 650;
const INITIAL_DELAY = 400;
const ORBIT_COUNT = 12;
const LOG_SLOTS = 3;

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: ((i * 37) % 100) - 10,
  y: ((i * 53) % 100) - 5,
  size: 2 + (i % 3),
  delay: (i % 8) * 0.3,
  duration: 3 + (i % 5),
}));

function BootParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-cyan"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.7, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function OrbitalRings({ progress }: { progress: number }) {
  const r = 88;
  const c = 2 * Math.PI * r;
  const offset = c - (progress / 100) * c;

  return (
    <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2">
      <motion.div
        className="absolute inset-0 rounded-full border border-dashed border-cyan/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-3 rounded-full border border-indigo/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-6 rounded-full border border-cyan/20"
        animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      <svg className="absolute inset-0" width={200} height={200} viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="3"
        />
        <motion.circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="url(#bootGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          animate={{ strokeDashoffset: offset }}
          transition={{ type: "spring", stiffness: 60, damping: 18 }}
          style={{ transformOrigin: "center", rotate: -90 }}
        />
        <defs>
          <linearGradient id="bootGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4338FF" />
            <stop offset="50%" stopColor="#00F5FF" />
            <stop offset="100%" stopColor="#45FFB2" />
          </linearGradient>
        </defs>
      </svg>
      {Array.from({ length: ORBIT_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 h-full w-full"
          style={{ transformOrigin: "center" }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 8 + (i % 4) * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.15,
          }}
        >
          <motion.span
            className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan"
            animate={{
              opacity: i / ORBIT_COUNT <= progress / 100 ? [0.4, 1, 0.4] : 0.15,
              scale: i / ORBIT_COUNT <= progress / 100 ? [1, 1.4, 1] : 0.8,
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          />
        </motion.div>
      ))}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[55%] w-[2px] -translate-x-1/2 origin-bottom bg-gradient-to-t from-cyan/60 to-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50% 100%" }}
      />
    </div>
  );
}

function BootLogo() {
  return (
    <motion.div
      className="relative z-10"
      animate={{
        scale: [1, 1.05, 1],
        filter: [
          "drop-shadow(0 0 12px rgba(0,245,255,0.4))",
          "drop-shadow(0 0 28px rgba(67,56,255,0.6))",
          "drop-shadow(0 0 12px rgba(0,245,255,0.4))",
        ],
      }}
      transition={{ duration: 2.5, repeat: Infinity }}
    >
      <svg width={56} height={56} viewBox="0 0 64 64" fill="none">
        <defs>
          <linearGradient id="bootLogo" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4338FF" />
            <stop offset="50%" stopColor="#00F5FF" />
            <stop offset="100%" stopColor="#45FFB2" />
          </linearGradient>
        </defs>
        <motion.polygon
          points="32,8 54,20 54,44 32,56 10,44 10,20"
          stroke="url(#bootLogo)"
          strokeWidth="1.5"
          fill="rgba(67,56,255,0.15)"
          animate={{ rotate: [0, 3, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ transformOrigin: "32px 32px" }}
        />
        <path
          d="M32 20 L42 38 L22 38 Z"
          stroke="#00F5FF"
          strokeWidth="1.5"
          fill="rgba(0,245,255,0.2)"
        />
        <motion.circle
          cx="32"
          cy="32"
          r="3"
          fill="#45FFB2"
          animate={{ r: [3, 4, 3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </svg>
    </motion.div>
  );
}

export default function BootLoader({ onComplete }: BootLoaderProps) {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [phase, setPhase] = useState<"boot" | "reveal" | "flash" | "exit">("boot");
  const completed = useRef(false);

  const springProgress = useSpring(0, { stiffness: 50, damping: 20 });
  const displayProgress = useTransform(springProgress, (v) => Math.round(v));
  const [progressText, setProgressText] = useState("000");

  useEffect(() => {
    return displayProgress.on("change", (v) => {
      setProgressText(String(v).padStart(3, "0"));
    });
  }, [displayProgress]);

  useEffect(() => {
    springProgress.set(progress);
  }, [progress, springProgress]);

  const finish = useCallback(() => {
    if (completed.current) return;
    completed.current = true;
    markBooted();
    setPhase("reveal");
    setTimeout(() => setPhase("flash"), 1200);
    setTimeout(() => setPhase("exit"), 1400);
    setTimeout(onComplete, 2000);
  }, [onComplete]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_STAGES.forEach((s, i) => {
      timers.push(
        setTimeout(() => {
          if (completed.current) return;
          setStage(i);
          setProgress(s.progress);
          if (i === BOOT_STAGES.length - 1) {
            timers.push(setTimeout(finish, 1000));
          }
        }, i * STAGE_MS + INITIAL_DELAY)
      );
    });

    return () => timers.forEach(clearTimeout);
  }, [finish]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((i) => (i + 1) % BOOT_LOGS.length);
    }, 420);
    return () => clearInterval(interval);
  }, []);

  const visibleLogs = useMemo(
    () =>
      Array.from({ length: LOG_SLOTS }, (_, slot) => {
        const idx = (logIndex + slot) % BOOT_LOGS.length;
        return { slot, text: BOOT_LOGS[idx], key: `${slot}-${idx}` };
      }),
    [logIndex]
  );

  const showBootUi = phase === "boot";

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          className="fixed inset-0 z-[10000] overflow-hidden bg-void"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: "blur(30px) brightness(2)",
            transition: { duration: 0.9, ease: cinematicEase },
          }}
          role="dialog"
          aria-label="Loading"
          aria-busy={progress < 100}
        >
          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={{
              background: [
                "radial-gradient(ellipse at 20% 30%, rgba(67,56,255,0.18) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(0,245,255,0.1) 0%, transparent 50%)",
                "radial-gradient(ellipse at 80% 20%, rgba(124,77,255,0.15) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(0,245,255,0.12) 0%, transparent 50%)",
                "radial-gradient(ellipse at 20% 30%, rgba(67,56,255,0.18) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(0,245,255,0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <BootParticles />

          <motion.div
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "linear-gradient(rgba(67,56,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(67,56,255,0.12) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
            animate={{ backgroundPosition: ["0px 0px", "0px 40px"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={{ opacity: [0.03, 0.09, 0.03] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.04) 2px, rgba(0,245,255,0.04) 4px)",
            }}
          />

          <motion.div
            className="pointer-events-none absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan/50 to-transparent shadow-[0_0_20px_rgba(0,245,255,0.5)]"
            animate={{ top: ["-5%", "105%"] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
          />

          <AnimatePresence>
            {phase === "flash" && (
              <motion.div
                className="pointer-events-none absolute inset-0 z-40 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.85, 0] }}
                transition={{ duration: 0.35 }}
              />
            )}
          </AnimatePresence>

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
            <motion.div
              className="mb-8 text-center"
              initial={{ opacity: 0, y: -30, filter: "blur(8px)" }}
              animate={{ opacity: showBootUi ? 1 : 0, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: cinematicEase }}
            >
              <motion.p
                className="font-mono text-xs tracking-[0.4em] text-cyan"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {UI.bootTitle}
              </motion.p>
              <p className="fa-text mt-2 font-body text-sm text-white/45">
                {UI.bootSubtitle}
              </p>
            </motion.div>

            <motion.div
              className="relative mb-8 flex h-[200px] w-[200px] items-center justify-center"
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              animate={{
                opacity: phase === "reveal" || phase === "flash" ? 0 : 1,
                scale: phase === "reveal" ? 1.4 : 1,
                rotate: 0,
                filter:
                  phase === "reveal"
                    ? "blur(24px) brightness(1.5)"
                    : "blur(0px)",
              }}
              transition={{ duration: 0.9, ease: cinematicEase }}
            >
              <OrbitalRings progress={progress} />
              <BootLogo />
              <motion.div className="absolute -bottom-2 left-1/2 -translate-x-1/2 font-mono text-3xl font-bold tabular-nums">
                <span className="text-cyan text-glow">{progressText}</span>
                <span className="text-sm text-white/25">%</span>
              </motion.div>
            </motion.div>

            <div className="mb-6 flex h-6 items-center justify-center">
              <AnimatePresence mode="wait">
                {showBootUi && (
                  <motion.p
                    key={stage}
                    className="fa-text font-body text-sm text-white/55"
                    initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                    transition={{ duration: 0.4, ease: cinematicEase }}
                  >
                    {BOOT_STAGES[stage]?.label ?? UI.bootLoading}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {(phase === "reveal" || phase === "flash") && (
                <motion.div
                  className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.p
                    className="font-mono text-xs tracking-[0.3em] text-emerald-400/80"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {SITE.heroAccess}
                  </motion.p>
                  <motion.h2
                    className="fa-text text-center font-display text-2xl font-semibold leading-relaxed md:text-4xl lg:text-5xl"
                    initial={{ opacity: 0, y: 36, filter: "blur(16px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, ease: cinematicEase }}
                  >
                    {SITE.nameFa}
                  </motion.h2>
                  <motion.p
                    className="fa-text mt-4 font-body text-base text-cyan/80 md:text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.7, ease: cinematicEase }}
                  >
                    {SITE.title}
                  </motion.p>
                  <motion.p
                    className="fa-text mt-6 font-body text-sm text-white/35"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    {UI.bootReady} ✦
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="glass-edge glass relative w-full max-w-md overflow-hidden p-4 text-[11px] leading-6"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{
                opacity: phase === "reveal" || phase === "flash" ? 0 : 1,
                y: phase === "reveal" ? 30 : 0,
                scale: 1,
              }}
              transition={{ duration: 0.7, ease: cinematicEase, delay: 0.2 }}
            >
              <div className="absolute inset-0 overflow-hidden opacity-30">
                <div
                  className="h-full w-1/2 bg-gradient-to-r from-transparent via-cyan/20 to-transparent"
                  style={{ animation: "boot-shimmer 2.5s infinite" }}
                />
              </div>
              <div className="relative mb-2 flex gap-2 border-b border-white/5 pb-2">
                <motion.span
                  className="h-2 w-2 rounded-full bg-indigo/70"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.span
                  className="h-2 w-2 rounded-full bg-cyan/60"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                />
                <motion.span
                  className="h-2 w-2 rounded-full bg-mint/50"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                />
              </div>
              <div className="relative h-[4.5rem] overflow-hidden">
                {visibleLogs.map(({ slot, text, key }) => {
                  const isLatin = /^> [a-zA-Z0-9._\-]/.test(text);
                  return (
                    <div
                      key={slot}
                      className={`h-6 overflow-hidden truncate leading-6 ${
                        slot === 0 ? "text-cyan/75" : "text-white/22"
                      } ${
                        isLatin
                          ? "ltr-block font-mono text-left"
                          : "fa-text text-right"
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={key}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.25 }}
                          className="inline-block max-w-full truncate"
                        >
                          {text}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
              <motion.span
                className="inline-block h-3.5 w-2 bg-cyan"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.7, repeat: Infinity }}
              />
            </motion.div>

            <div
              className="mt-5 flex w-full max-w-md gap-2"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {BOOT_STAGES.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]"
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{
                      width: i <= stage ? "100%" : "0%",
                      background:
                        i <= stage
                          ? "linear-gradient(90deg, #4338FF, #00F5FF, #45FFB2)"
                          : "transparent",
                      boxShadow:
                        i === stage
                          ? "0 0 14px rgba(0,245,255,0.7)"
                          : "none",
                    }}
                    transition={{ duration: 0.55, ease: cinematicEase }}
                  />
                </motion.div>
              ))}
            </div>

            <motion.button
              type="button"
              className="fa-text mt-7 font-body text-xs text-white/20 transition-colors hover:text-cyan"
              onClick={finish}
              initial={{ opacity: 0 }}
              animate={{ opacity: showBootUi ? 1 : 0 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {UI.skipBoot}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
