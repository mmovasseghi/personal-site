"use client";

import { motion } from "framer-motion";
import { ABOUT_INTRO, ABOUT_POINTS } from "@/lib/constants";
import { cinematicCard, cardHover } from "@/lib/motion";
import ScrollReveal from "@/components/cinematic/ScrollReveal";
import SectionHeader from "./SectionHeader";

export default function About() {
  return (
    <section id="about" className="section relative">
      <div className="section-inner">
        <SectionHeader id="about" />

        <ScrollReveal>
          <div className="glass-edge glass site-panel mx-auto mt-12 max-w-2xl p-8 backlight">
            <div className="fa-text space-y-4 text-base leading-8 text-white/75">
              {ABOUT_INTRO.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {ABOUT_POINTS.map((p, i) => (
            <motion.div
              key={p.id}
              className="glass-edge glass site-panel p-6 backlight"
              custom={i}
              variants={cinematicCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-8% 0px" }}
              whileHover={cardHover}
              data-cursor-hover
            >
              <h3 className="fa-text font-display text-lg font-semibold">
                {p.title}
              </h3>
              <p className="fa-text mt-2 text-sm leading-8 text-white/55">
                {p.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
