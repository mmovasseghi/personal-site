"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CAPABILITIES } from "@/lib/constants";
import { cinematicCard, cardHover } from "@/lib/motion";
import SectionHeader from "./SectionHeader";

export default function Capabilities() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="skills" className="section grid-bg">
      <div className="section-inner">
        <SectionHeader id="skills" />

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap, i) => {
            const isOpen = active === i;
            const panelId = `capability-panel-${i}`;

            return (
              <motion.div
                key={cap.title}
                className="glass-edge glass backlight"
                custom={i}
                variants={cinematicCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={cardHover}
              >
                <button
                  type="button"
                  className="w-full p-6 text-center"
                  onClick={() => setActive(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  data-cursor-hover
                >
                  <div className="flex flex-col items-center gap-3">
                    <motion.span
                      className="font-mono text-3xl text-cyan"
                      animate={{
                        textShadow: isOpen
                          ? "0 0 20px rgba(0,245,255,0.6)"
                          : "0 0 0px transparent",
                      }}
                    >
                      {cap.symbol}
                    </motion.span>
                    <div>
                      <h3 className="fa-text text-center font-display text-base font-semibold">
                        {cap.title}
                      </h3>
                      <p className="fa-text mt-1 text-center text-xs text-white/40">
                        {cap.desc}
                      </p>
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-label={`${cap.title} technologies`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-wrap justify-center gap-2 border-t border-white/5 px-6 pb-6 pt-4">
                        {cap.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-white/5 px-3 py-1 font-mono text-[10px] text-cyan/70"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
