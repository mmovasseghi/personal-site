"use client";

import { motion } from "framer-motion";
import { TECH_RADAR } from "@/lib/constants";
import SectionHeader from "./SectionHeader";

const LEVEL_COLORS: Record<string, string> = {
  core: "#00F5FF",
  advanced: "#4338FF",
  working: "#45FFB2",
  exploring: "#7C4DFF",
};

export default function TechRadar() {
  const levels = Object.entries(TECH_RADAR);

  return (
    <section id="tech" className="section relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(67,56,255,0.15), transparent 60%)",
        }}
      />

      <div className="section-inner relative">
        <SectionHeader id="tech" />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {levels.map(([key, { label, items }], i) => (
            <motion.div
              key={key}
              className="glass-edge glass p-6 backlight"
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: LEVEL_COLORS[key] }}
                />
                <h3 className="font-mono text-xs uppercase tracking-widest text-white/50">
                  {label}
                </h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {items.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/5 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
