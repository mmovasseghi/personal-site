"use client";

import { useState, useCallback } from "react";
import { motion, MotionConfig } from "framer-motion";
import BootLoader from "@/components/BootLoader";
import ParticleCanvas from "@/components/ParticleCanvas";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import AmbientGlow from "@/components/AmbientGlow";
import FloatingOrbs from "@/components/FloatingOrbs";
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

  return (
    <MotionConfig reducedMotion="user">
      <SkipLink />
      {!booted && <BootLoader onComplete={onBootComplete} />}

      {booted && (
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <AmbientGlow />
          <FloatingOrbs />
          <ParticleCanvas />
          <CustomCursor />
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
      )}
    </MotionConfig>
  );
}
