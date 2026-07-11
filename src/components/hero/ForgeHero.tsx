"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { SITE, UI, HERO_TAGS } from "@/lib/constants";
import { cinematicEase } from "@/lib/motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import HeroAvatar from "@/components/hero/HeroAvatar";
import HeroBinaryStream from "@/components/hero/HeroBinaryStream";

type Phase = "boot" | "access" | "live";

export default function ForgeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mobile = useIsMobile();
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduced ? "live" : "boot");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (reduced) return;
    const t1 = setTimeout(() => setPhase("access"), 1000);
    const t2 = setTimeout(() => setPhase("live"), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduced]);

  const live = phase === "live";
  const avatarActive = phase !== "boot";

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="forge-hero section"
      aria-label="معرفی"
    >
      <div className="forge-hero__mesh" aria-hidden />
      <div className="forge-hero__scan" aria-hidden />
      <div className="forge-hero__floor" aria-hidden />
      <div className="forge-hero__sweep" aria-hidden />
      {!mobile && (
        <>
          <HeroBinaryStream side="left" />
          <HeroBinaryStream side="right" />
        </>
      )}

      <motion.div
        className="forge-hero__wrap"
        style={{ opacity: reduced ? 1 : opacity }}
      >
        <div className="section-inner forge-hero__grid">
          <div className="forge-hero__visual">
            <HeroAvatar active={avatarActive} />
            {live && (
              <motion.div
                className="forge-hero__tags ltr-block"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.55 }}
              >
                {HERO_TAGS.map((tag) => (
                  <span key={tag} className="forge-hero__tag">
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}
          </div>

          <div className="forge-hero__copy">
            <div className="forge-hero__terminal-chrome ltr-block" aria-hidden>
              <span className="forge-hero__dot forge-hero__dot--a" />
              <span className="forge-hero__dot forge-hero__dot--b" />
              <span className="forge-hero__dot forge-hero__dot--c" />
              <span className="forge-hero__terminal-title">
                INIT://{SITE.shortName}.node
              </span>
            </div>

            <AnimatePresence mode="wait">
              {phase === "boot" && (
                <motion.p
                  key="boot"
                  className="forge-hero__status ltr-block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  {SITE.heroConnecting}
                  <span className="forge-hero__status-bar">
                    <motion.span
                      className="forge-hero__status-fill"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1, ease: cinematicEase }}
                    />
                  </span>
                </motion.p>
              )}
              {phase === "access" && (
                <motion.p
                  key="access"
                  className="forge-hero__access ltr-block"
                  initial={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0 }}
                >
                  {SITE.heroAccess}
                </motion.p>
              )}
            </AnimatePresence>

            {(phase === "access" || live) && (
              <motion.div
                className="forge-hero__body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="forge-hero__meta ltr-block">
                  <span className="forge-hero__live">●</span>
                  {SITE.heroSignal}
                  <em>{"//"}</em>
                  {SITE.titleEn}
                </p>

                <h1 className="forge-hero__name fa-text">{SITE.nameFa}</h1>

                <p className="forge-hero__role fa-text">{SITE.title}</p>

                {live && (
                  <>
                    <motion.p
                      className="forge-hero__slogan fa-text"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08, duration: 0.55 }}
                    >
                      {SITE.heroHeadline1}{" "}
                      <span className="forge-hero__slogan-accent">
                        {SITE.heroHeadline2}
                      </span>
                    </motion.p>
                    <motion.p
                      className="forge-hero__motto fa-text"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.14, duration: 0.55 }}
                    >
                      {SITE.heroMotto}
                    </motion.p>
                    <motion.p
                      className="forge-hero__hook fa-text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {SITE.heroHook}
                    </motion.p>

                    <motion.div
                      className="forge-hero__actions"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <a
                        href="#skills"
                        className="forge-hero__btn forge-hero__btn--primary fa-text"
                        data-cursor-hover
                      >
                        <span className="ltr-block">{">"}</span>
                        {UI.explore}
                      </a>
                      <a
                        href="#contact"
                        className="forge-hero__btn fa-text"
                        data-cursor-hover
                      >
                        {UI.heroCtaContact}
                      </a>
                    </motion.div>
                  </>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {live && (
          <motion.a
            href="#about"
            className="forge-hero__scroll fa-text"
            data-cursor-hover
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            <span className="ltr-block">SCROLL</span>
            <span className="forge-hero__scroll-line" aria-hidden />
            {UI.scroll}
          </motion.a>
        )}
      </motion.div>
    </section>
  );
}
