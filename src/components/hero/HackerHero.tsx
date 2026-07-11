"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { SITE, UI, HERO_TAGS } from "@/lib/constants";
import { cinematicEase } from "@/lib/motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import GlitchText from "@/components/hero/GlitchText";
import HeroRadar from "@/components/hero/HeroRadar";
import HeroBinaryStream from "@/components/hero/HeroBinaryStream";

type Phase = "boot" | "access" | "identity" | "ready";

export default function HackerHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mobile = useIsMobile();
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduced ? "ready" : "boot");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", mobile ? "4%" : "10%"]
  );
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (reduced) return;
    const t1 = setTimeout(() => setPhase("access"), 1100);
    const t2 = setTimeout(() => setPhase("identity"), 1900);
    const t3 = setTimeout(() => setPhase("ready"), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [reduced]);

  const showIdentity = phase === "identity" || phase === "ready";
  const showReady = phase === "ready";

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-node section"
      aria-label="معرفی"
    >
      <div className="hero-node__scan" aria-hidden />
      <div className="hero-node__grid-floor" aria-hidden />
      {!mobile && (
        <>
          <HeroBinaryStream side="left" />
          <HeroBinaryStream side="right" />
        </>
      )}

      <motion.div
        className="hero-node__wrap"
        style={{
          y: reduced ? 0 : contentY,
          opacity: reduced ? 1 : contentOpacity,
        }}
      >
        <div className="section-inner hero-node__inner">
          <HeroRadar active={phase !== "boot"} />

          <div className="hero-node__copy">
            <AnimatePresence mode="wait">
              {phase === "boot" && (
                <motion.div
                  key="boot"
                  className="hero-node__boot ltr-block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="hero-node__boot-label">
                    {SITE.heroConnecting}
                  </span>
                  <div className="hero-node__boot-bar">
                    <motion.span
                      className="hero-node__boot-fill"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1, ease: cinematicEase }}
                    />
                  </div>
                </motion.div>
              )}

              {phase === "access" && (
                <motion.p
                  key="access"
                  className="hero-node__access ltr-block"
                  initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {SITE.heroAccess}
                </motion.p>
              )}
            </AnimatePresence>

            {showIdentity && (
              <motion.div
                className="hero-node__identity"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="hero-node__signal ltr-block">
                  <span>●</span>
                  {SITE.shortName}
                  <em>{"//"}</em>
                  {SITE.heroSignal}
                </p>

                <h1 className="hero-node__name fa-text">
                  <GlitchText text={SITE.heroName} active={showIdentity} />
                </h1>

                <p className="hero-node__fullname fa-text">{SITE.heroFullName}</p>
                <p className="hero-node__role fa-text">{SITE.title}</p>

                <motion.p
                  className="hero-node__hook fa-text"
                  initial={{ opacity: 0, y: 14 }}
                  animate={showReady ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, ease: cinematicEase }}
                >
                  {SITE.heroHook}
                </motion.p>
              </motion.div>
            )}

            {showReady && (
              <motion.div
                className="hero-node__actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: cinematicEase }}
              >
                <motion.a
                  href="#skills"
                  className="hero-node__btn hero-node__btn--primary fa-text"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="ltr-block">{">"}</span>
                  {UI.explore}
                </motion.a>
                <motion.a
                  href="#contact"
                  className="hero-node__btn hero-node__btn--ghost fa-text"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {UI.heroCtaContact}
                </motion.a>
              </motion.div>
            )}
          </div>

          {showReady && (
            <motion.div
              className="hero-node__orbit ltr-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              aria-hidden
            >
              {HERO_TAGS.map((tag) => (
                <span key={tag} className="hero-node__orbit-tag">
                  {tag}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>

      {showReady && (
        <motion.div
          className="hero-node__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="ltr-block">SCROLL</span>
          <motion.span
            className="hero-node__scroll-bar"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          <span className="fa-text">{UI.scroll}</span>
        </motion.div>
      )}
    </section>
  );
}
