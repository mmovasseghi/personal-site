"use client";

import { motion } from "framer-motion";
import { SITE, SECTIONS, UI } from "@/lib/constants";
import { cinematicReveal } from "@/lib/motion";

export default function Contact() {
  return (
    <section id="contact" className="section grid-bg">
      <div className="section-inner">
        <motion.div
          className="glass-edge glass neon-border mx-auto max-w-2xl p-6 text-center backlight sm:p-10 md:p-12"
          variants={cinematicReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <span className="fa-text font-body text-xs text-indigo/60">
            {SECTIONS.contact.eyebrow}
          </span>

          <h2 className="fa-text mt-6 font-display text-3xl font-bold md:text-4xl">
            {UI.contactTitle}
            <br />
            <span className="rgb-text">{UI.contactHighlight}</span>
          </h2>

          <p className="fa-text mx-auto mt-6 max-w-md text-sm leading-8 text-white/40">
            {UI.contactDesc}
          </p>

          <div className="mt-10 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <motion.a
              href={`mailto:${SITE.email}`}
              className="fa-text glass-edge glass w-full rounded-lg px-8 py-3 text-center font-body text-sm font-medium text-cyan sm:w-auto"
              data-cursor-hover
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.96 }}
            >
              {UI.sendEmail}
            </motion.a>

            <motion.a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="fa-text w-full px-8 py-3 text-center font-body text-sm text-white/40 transition-colors hover:text-cyan sm:w-auto"
              data-cursor-hover
              whileHover={{ scale: 1.03 }}
            >
              {UI.github} ←
            </motion.a>
          </div>

          <div className="fa-text mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-body text-xs text-white/20">
            <span>{SITE.location}</span>
            <span>•</span>
            <span>{UI.available}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
