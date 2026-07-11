"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, MotionConfig } from "framer-motion";
import BootLoader from "@/components/BootLoader";
import SiteExperience from "@/components/SiteExperience";
import CustomCursor from "@/components/CustomCursor";
import MouseAmbient from "@/components/MouseAmbient";
import MouseTrail from "@/components/MouseTrail";
import ScrollProgress from "@/components/ScrollProgress";
import AmbientGlow from "@/components/AmbientGlow";
import SkipLink from "@/components/SkipLink";
import Navigation from "@/components/Navigation";
import BackToTop from "@/components/BackToTop";
import Hero from "@/components/Hero";
import PersianHeritage from "@/components/PersianHeritage";
import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import TechRadar from "@/components/TechRadar";
import CaseStudies from "@/components/CaseStudies";
import Experience from "@/components/Experience";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";

export default function App() {
  const [booted, setBooted] = useState(false);
  const onBootComplete = useCallback(() => setBooted(true), []);

  // اسکرول به هش (#resume و غیره) بعد از اتمام بوت — قبل از بوت DOM وجود ندارد
  useEffect(() => {
    if (!booted) return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    const t = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    }, 350);
    return () => clearTimeout(t);
  }, [booted]);

  return (
    <MotionConfig reducedMotion="user">
      {!booted && <BootLoader onComplete={onBootComplete} />}

      {booted && (
        <>
          <SkipLink />
          <MouseAmbient />
          <MouseTrail />
          <CustomCursor />
          <SiteExperience>
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <AmbientGlow />
              <ScrollProgress />
              <Navigation />
              <BackToTop />

              <div className="relative">
                <PersianHeritage />

                <main id="main" className="relative z-10 w-full overflow-x-hidden">
                  <Hero />
                  <SectionDivider />
                  <About />
                  <Capabilities />
                  <TechRadar />
                  <SectionDivider />
                  <CaseStudies />
                  <Experience />
                  <Resume />
                  <Contact />
                </main>
                <Footer />
              </div>
            </motion.div>
          </SiteExperience>
        </>
      )}
    </MotionConfig>
  );
}
