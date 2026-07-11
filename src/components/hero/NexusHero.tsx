"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { SITE, UI, HERO_TAGS } from "@/lib/constants";
import { cinematicEase } from "@/lib/motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import HeroBinaryStream from "@/components/hero/HeroBinaryStream";
import HeroStarfield from "@/components/hero/HeroStarfield";
import HeroNexusPortal from "@/components/hero/HeroNexusPortal";
import HeroHudFrame from "@/components/hero/HeroHudFrame";

function HeroHeadline({ active }: { active: boolean }) {
  return (
    <h1 className="hero-nexus__headline fa-text">
      <motion.span
        className="hero-nexus__headline-1"
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={active ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.7, ease: cinematicEase }}
      >
        {SITE.heroHeadline1}
      </motion.span>
      <motion.span
        className="hero-nexus__headline-2"
        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
        animate={active ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.85, delay: 0.18, ease: cinematicEase }}
      >
        {SITE.heroHeadline2}
      </motion.span>
      <motion.span
        className="hero-nexus__headline-accent ltr-block"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={active ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.45, ease: cinematicEase }}
      >
        IMAGINE → BUILD
      </motion.span>
    </h1>
  );
}

type Phase = "void" | "charge" | "breach" | "live";

export default function NexusHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mobile = useIsMobile();
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduced ? "live" : "void");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", mobile ? "5%" : "12%"]
  );
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const portalScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);

  useEffect(() => {
    if (reduced) return;
    const t1 = setTimeout(() => setPhase("charge"), 600);
    const t2 = setTimeout(() => setPhase("breach"), 2000);
    const t3 = setTimeout(() => setPhase("live"), 2700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [reduced]);

  const portalActive = phase !== "void";
  const portalCharged = phase === "breach" || phase === "live";
  const showIdentity = phase === "breach" || phase === "live";
  const showLive = phase === "live";

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-nexus section"
      aria-label="معرفی"
    >
      <HeroStarfield density={mobile ? 120 : 240} />

      <div className="hero-nexus__nebula" aria-hidden>
        <motion.div
          className="hero-nexus__nebula-blob hero-nexus__nebula-blob--a"
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="hero-nexus__nebula-blob hero-nexus__nebula-blob--b"
          animate={{ x: [0, -25, 0], y: [0, 15, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="hero-nexus__nebula-blob hero-nexus__nebula-blob--c"
          animate={{ opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="hero-nexus__scan" aria-hidden />
      <div className="hero-nexus__grid-floor" aria-hidden />

      {!mobile && (
        <>
          <HeroBinaryStream side="left" />
          <HeroBinaryStream side="right" />
        </>
      )}

      <HeroHudFrame visible={portalCharged} />

      <motion.div
        className="hero-nexus__stage"
        style={{
          y: reduced ? 0 : contentY,
          opacity: reduced ? 1 : contentOpacity,
        }}
      >
        <motion.div
          className="hero-nexus__portal-wrap"
          style={{ scale: reduced ? 1 : portalScale }}
        >
          <HeroNexusPortal active={portalActive} charged={portalCharged} />
        </motion.div>

        <div className="section-inner hero-nexus__content">
          <AnimatePresence mode="wait">
            {phase === "void" && (
              <motion.p
                key="void"
                className="hero-nexus__phase ltr-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
              >
                {SITE.heroConnecting}
                <span className="hero-nexus__phase-dots">
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>.</motion.span>
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}>.</motion.span>
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}>.</motion.span>
                </span>
              </motion.p>
            )}

            {phase === "charge" && (
              <motion.div
                key="charge"
                className="hero-nexus__charge"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
              >
                <p className="hero-nexus__phase ltr-block">NEXUS CHARGING</p>
                <div className="hero-nexus__charge-bar">
                  <motion.span
                    className="hero-nexus__charge-fill"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.3, ease: cinematicEase }}
                  />
                </div>
              </motion.div>
            )}

            {phase === "breach" && !showLive && (
              <motion.p
                key="breach"
                className="hero-nexus__access ltr-block"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                {SITE.heroAccess}
              </motion.p>
            )}
          </AnimatePresence>

          {showIdentity && (
            <motion.div
              className="hero-nexus__identity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="hero-nexus__signal ltr-block">
                <span className="hero-nexus__signal-dot" />
                {SITE.shortName}
                <em>{" // "}</em>
                {SITE.heroTag}
              </p>

              <HeroHeadline active={showIdentity} />

              <motion.p
                className="hero-nexus__motto fa-text"
                initial={{ opacity: 0, y: 14 }}
                animate={showLive ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: cinematicEase }}
              >
                {SITE.heroMotto}
              </motion.p>

              <motion.p
                className="hero-nexus__identity-line fa-text"
                initial={{ opacity: 0 }}
                animate={showLive ? { opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {SITE.heroFullName}
                <span className="hero-nexus__identity-sep"> · </span>
                {SITE.title}
              </motion.p>

              <motion.p
                className="hero-nexus__hook fa-text"
                initial={{ opacity: 0, y: 12 }}
                animate={showLive ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.6, ease: cinematicEase }}
              >
                {SITE.heroHook}
              </motion.p>
            </motion.div>
          )}

          {showLive && (
            <motion.div
              className="hero-nexus__actions"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: cinematicEase }}
            >
              <motion.a
                href="#skills"
                className="hero-nexus__btn hero-nexus__btn--primary fa-text"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="ltr-block">{">"}</span>
                {UI.explore}
              </motion.a>
              <motion.a
                href="#contact"
                className="hero-nexus__btn hero-nexus__btn--ghost fa-text"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                {UI.heroCtaContact}
              </motion.a>
            </motion.div>
          )}

          {showLive && (
            <motion.div
              className="hero-nexus__orbit ltr-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.9 }}
              aria-hidden
            >
              {HERO_TAGS.map((tag, i) => (
                <motion.span
                  key={tag}
                  className="hero-nexus__orbit-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {phase === "breach" && (
          <motion.div
            className="hero-nexus__flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.35, 0] }}
            transition={{ duration: 0.45 }}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {showLive && (
        <motion.div
          className="hero-nexus__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="ltr-block">SCROLL</span>
          <motion.span
            className="hero-nexus__scroll-bar"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          <span className="fa-text">{UI.scroll}</span>
        </motion.div>
      )}
    </section>
  );
}
