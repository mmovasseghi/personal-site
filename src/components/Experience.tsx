"use client";

import { motion } from "framer-motion";
import { EXPERIENCE } from "@/lib/constants";
import SectionHeader from "./SectionHeader";

export default function Experience() {
  return (
    <section id="experience" className="section relative">
      <div className="section-inner">
        <SectionHeader id="experience" />

        <div className="mt-16 space-y-3">
          {EXPERIENCE.map((item, i) => (
            <motion.div
              key={i}
              className="glass flex items-center gap-3 px-4 py-4 sm:gap-4 sm:px-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.08 }}
            >
              <span className="shrink-0 font-mono text-xs text-indigo/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="shrink-0 font-mono text-cyan/40">──</span>
              <span className="fa-text min-w-0 flex-1 text-sm leading-7 text-white/60">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
