"use client";

import { motion } from "framer-motion";
import { ABOUT_INTRO, ABOUT_POINTS } from "@/lib/constants";
import { cinematicCard, cardHover, cinematicReveal } from "@/lib/motion";
import SectionHeader from "./SectionHeader";

export default function About() {
  return (
    <section id="about" className="section relative">
      <div className="section-inner">
        <SectionHeader id="about" />

        <motion.div
          className="glass-edge glass mx-auto mt-12 max-w-2xl p-8 backlight"
          variants={cinematicReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="fa-text space-y-4 text-base leading-8 text-white/70">
            {ABOUT_INTRO.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </motion.div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {ABOUT_POINTS.map((p, i) => (
            <motion.div
              key={p.id}
              className="glass-edge glass p-6 backlight"
              custom={i}
              variants={cinematicCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={cardHover}
              data-cursor-hover
            >
              <h3 className="fa-text font-display text-lg font-semibold">
                {p.title}
              </h3>
              <p className="fa-text mt-2 text-sm leading-8 text-white/50">
                {p.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
