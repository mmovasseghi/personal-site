"use client";

import { motion } from "framer-motion";
import { RESUME, SITE, UI } from "@/lib/constants";
import { downloadResume } from "@/lib/resume";
import SectionHeader from "./SectionHeader";

export default function Resume() {
  return (
    <section id="resume" className="section relative">
      <div className="section-inner">
        <SectionHeader id="resume" />

        <motion.div
          className="glass-edge glass mt-12 p-5 sm:p-8 md:p-12 backlight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="border-b border-white/5 pb-8">
            <h3 className="font-display text-2xl font-bold">{SITE.nameFa}</h3>
            <p className="mt-1 font-mono text-sm text-cyan/70">{SITE.title}</p>
            <p className="mt-1 font-mono text-xs text-white/30">
              {SITE.location}
            </p>
          </div>

          <div className="mt-8">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/30">
              {UI.summary}
            </h4>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {RESUME.summary}
            </p>
          </div>

          <div className="mt-8">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/30">
              {UI.competencies}
            </h4>
            <ul className="mt-4 space-y-3">
              {RESUME.highlights.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex gap-3 text-sm text-white/50"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="font-mono text-cyan/50">▸</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="mt-8 border-t border-white/5 pt-8">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/30">
              {UI.education}
            </h4>
            <p className="mt-4 text-sm text-white/50">{RESUME.education}</p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <motion.button
              type="button"
              onClick={downloadResume}
              className="glass-edge glass rounded-lg px-6 py-2.5 text-center font-mono text-xs uppercase tracking-widest text-cyan"
              data-cursor-hover
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {UI.downloadCv}
            </motion.button>
            <motion.a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-edge glass rounded-lg px-6 py-2.5 text-center font-mono text-xs uppercase tracking-widest text-white/60 hover:text-cyan"
              data-cursor-hover
              whileHover={{ scale: 1.03 }}
            >
              {UI.github} ←
            </motion.a>
            <motion.a
              href={`mailto:${SITE.email}`}
              className="rounded-lg px-6 py-2.5 text-center font-mono text-xs uppercase tracking-widest text-white/40 hover:text-cyan"
              data-cursor-hover
            >
              {UI.email} ←
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
