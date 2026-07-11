"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SITE, UI, HERO_TAGS } from "@/lib/constants";
import { cinematicEase } from "@/lib/motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import HeroBinaryStream from "@/components/hero/HeroBinaryStream";

export default function CyberHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mobile = useIsMobile();
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    if (reduced) return;
    const el = sectionRef.current;
    if (!el) return;
    el.classList.add("cyber-hero--ready");
    return () => el.classList.remove("cyber-hero--ready");
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="cyber-hero section"
      aria-label="معرفی"
    >
      <div className="cyber-hero__grid" aria-hidden />
      <div className="cyber-hero__scan" aria-hidden />
      {!mobile && (
        <>
          <HeroBinaryStream side="left" />
          <HeroBinaryStream side="right" />
        </>
      )}

      <motion.div
        className="cyber-hero__wrap"
        style={{ opacity: reduced ? 1 : opacity }}
      >
        <div className="section-inner cyber-hero__inner">
          <div className="cyber-hero__terminal ltr-block" aria-hidden>
            <span className="cyber-hero__prompt">sina@node:~$</span>
            <span className="cyber-hero__cmd">whoami</span>
            <span className="cyber-hero__out">→ {SITE.shortName} {"//"} {SITE.titleEn}</span>
          </div>

          <p className="cyber-hero__signal ltr-block">
            <span className="cyber-hero__live" aria-hidden>●</span>
            {SITE.heroSignal}
            <span className="cyber-hero__sep">{"//"}</span>
            {SITE.heroTag}
          </p>

          <h1 className="cyber-hero__headline fa-text">
            <span className="cyber-hero__line">{SITE.heroHeadline1}</span>
            <span className="cyber-hero__line cyber-hero__line--accent">
              {SITE.heroHeadline2}
            </span>
          </h1>

          <p className="cyber-hero__motto fa-text">{SITE.heroMotto}</p>
          <p className="cyber-hero__hook fa-text">{SITE.heroHook}</p>

          <div className="cyber-hero__tags ltr-block">
            {HERO_TAGS.map((tag) => (
              <span key={tag} className="cyber-hero__tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="cyber-hero__actions">
            <motion.a
              href="#skills"
              className="cyber-hero__btn cyber-hero__btn--primary fa-text"
              data-cursor-hover
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {UI.explore}
            </motion.a>
            <motion.a
              href="#contact"
              className="cyber-hero__btn fa-text"
              data-cursor-hover
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {UI.heroCtaContact}
            </motion.a>
          </div>

          <motion.a
            href="#about"
            className="cyber-hero__scroll fa-text"
            data-cursor-hover
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6, ease: cinematicEase }}
          >
            {UI.scroll}
            <span className="cyber-hero__scroll-arrow" aria-hidden>↓</span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
