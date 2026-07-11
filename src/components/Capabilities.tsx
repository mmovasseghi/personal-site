"use client";

import { motion } from "framer-motion";
import { CAPABILITIES, DELIVERABLES, SKILL_CATEGORIES } from "@/lib/constants";
import { cinematicCard, cardHover } from "@/lib/motion";
import SectionHeader from "./SectionHeader";

export default function Capabilities() {
  return (
    <section id="skills" className="section grid-bg">
      <div className="section-inner">
        <SectionHeader id="skills" />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.title}
              className="glass-edge glass backlight site-panel p-6 text-center"
              custom={i}
              variants={cinematicCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-8% 0px" }}
              whileHover={cardHover}
            >
              <span className="font-mono text-2xl text-cyan/70">{cap.symbol}</span>
              <h3 className="fa-text mt-4 font-display text-base font-semibold text-white/90">
                {cap.title}
              </h3>
              <p className="fa-text mt-2 text-xs leading-6 text-white/45">
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              className="glass-edge glass backlight site-panel overflow-hidden"
              custom={i}
              variants={cinematicCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-8% 0px" }}
              whileHover={cardHover}
            >
              <div
                className="h-1 w-full"
                style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }}
              />
              <div className="p-5 text-center">
                <h3 className="font-display text-sm font-semibold text-white/90">
                  {cat.title}
                </h3>
                <p className="mt-3 font-mono text-[10px] leading-6 text-white/50 ltr-block">
                  {cat.items.join(" | ")}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-14 glass-edge glass p-8 backlight"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-center font-display text-lg font-semibold text-white/90">
            {DELIVERABLES.title}
          </h3>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <ul className="space-y-3">
              {DELIVERABLES.left.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-7 text-white/60 ltr-block"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                  {item}
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {DELIVERABLES.right.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-7 text-white/60 ltr-block"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-8 text-center font-mono text-xs text-white/35 ltr-block">
            {DELIVERABLES.tagline}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
