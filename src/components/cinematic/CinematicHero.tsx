"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SITE, UI, HERO_TAGS } from "@/lib/constants";
import { cinematicEase } from "@/lib/motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function HeroAvatar({ compact = false }: { compact?: boolean }) {
  const size = compact ? 52 : 68;
  const c = 2 * Math.PI * size;

  return (
    <div className={`hero-avatar${compact ? " hero-avatar--compact" : ""}`}>
      <motion.svg
        className="hero-avatar-ring"
        width={size * 2 + 20}
        height={size * 2 + 20}
        viewBox={`0 0 ${size * 2 + 20} ${size * 2 + 20}`}
        aria-hidden
      >
        <motion.circle
          cx={size + 10}
          cy={size + 10}
          r={size}
          fill="none"
          stroke="rgba(96,165,250,0.4)"
          strokeWidth="1.5"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c, opacity: 0 }}
          animate={{ strokeDashoffset: 0, opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.4, ease: cinematicEase }}
        />
      </motion.svg>
      <motion.div
        className="hero-avatar-core"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.25, ease: cinematicEase }}
      >
        <span className="fa-text">س</span>
      </motion.div>
    </div>
  );
}

function Letterbox() {
  return (
    <>
      <motion.div
        className="hero-letterbox hero-letterbox--top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1, delay: 0.05, ease: cinematicEase }}
      />
      <motion.div
        className="hero-letterbox hero-letterbox--bottom"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1, delay: 0.05, ease: cinematicEase }}
      />
      <motion.div
        className="hero-flash"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        aria-hidden
      />
    </>
  );
}

function TechTicker() {
  const items = [...HERO_TAGS, ...HERO_TAGS];
  return (
    <div className="hero-ticker" aria-hidden>
      <motion.div
        className="hero-ticker-track"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {items.map((tag, i) => (
          <span key={`${tag}-${i}`} className="ltr-block">
            {tag}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mobile = useIsMobile();
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", mobile ? "6%" : "14%"]
  );
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-cinematic section"
      aria-label="معرفی"
    >
      {!reduced && <Letterbox />}
      <div className="hero-backdrop" aria-hidden />

      <motion.div
        className="hero-content-wrap"
        style={{
          y: reduced ? 0 : contentY,
          opacity: reduced ? 1 : contentOpacity,
        }}
      >
        <div className="section-inner hero-layout">
          <div className="hero-deco" aria-hidden>
            {!mobile && <HeroAvatar />}
          </div>

          <div className="hero-stage site-panel">
            <motion.p
              className="hero-eyebrow ltr-block"
              initial={{ opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35, ease: cinematicEase }}
            >
              {SITE.shortName} · {SITE.location}
            </motion.p>

            {mobile && <HeroAvatar compact />}

            <h1 className="hero-headline fa-text">
              <motion.span
                className="hero-name"
                initial={{ opacity: 0, y: 56, filter: "blur(16px)" }}
                animate={
                  ready
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : {}
                }
                transition={{ duration: 1.1, delay: 0.5, ease: cinematicEase }}
              >
                {SITE.heroName}
              </motion.span>
              <motion.span
                className="hero-fullname"
                initial={{ opacity: 0 }}
                animate={ready ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.95, ease: cinematicEase }}
              >
                {SITE.heroFullName}
              </motion.span>
            </h1>

            <motion.p
              className="hero-role fa-text"
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 1.1, ease: cinematicEase }}
            >
              {SITE.title}
            </motion.p>

            <motion.p
              className="hero-stacks ltr-block"
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 1.25 }}
            >
              {SITE.heroStacks}
            </motion.p>

            <motion.p
              className="hero-hook fa-text"
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 1.4, ease: cinematicEase }}
            >
              {SITE.heroHook}
            </motion.p>

            <motion.div
              className="hero-cta"
              initial={{ opacity: 0, y: 22 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 1.6, ease: cinematicEase }}
            >
              <motion.a
                href="#skills"
                className="hero-btn hero-btn--primary fa-text"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {UI.explore}
              </motion.a>
              <motion.a
                href="#contact"
                className="hero-btn hero-btn--ghost fa-text"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                {UI.heroCtaContact}
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <TechTicker />

      <motion.div
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 2.2, duration: 0.9 }}
      >
        <motion.span
          className="fa-text"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {UI.scroll}
        </motion.span>
        <motion.div
          className="hero-scroll-line"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
