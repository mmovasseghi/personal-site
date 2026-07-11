"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CASE_STUDIES, UI } from "@/lib/constants";
import SectionHeader from "./SectionHeader";

export default function CaseStudies() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="work" className="section relative">
      <div className="section-inner">
        <SectionHeader id="work" />

        <div className="mt-16 space-y-4">
          {CASE_STUDIES.map((study, i) => (
            <motion.div
              key={study.id}
              className="glass-edge glass overflow-hidden backlight"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ delay: i * 0.08 }}
            >
              <button
                type="button"
                className="flex w-full items-center gap-5 p-6 text-right"
                onClick={() =>
                  setExpanded(expanded === study.id ? null : study.id)
                }
                aria-expanded={expanded === study.id}
                aria-controls={`case-study-${study.id}`}
                data-cursor-hover
              >
                <span className="shrink-0 font-mono text-3xl text-cyan/70">
                  {study.symbol}
                </span>
                <div className="min-w-0 flex-1 text-right">
                  <h3 className="fa-text font-display text-lg font-semibold">
                    {study.title}
                  </h3>
                  <p className="fa-text mt-1 text-xs leading-relaxed text-white/40">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-indigo/50">
                      {UI.challenge}
                    </span>
                    {" — "}
                    {study.challenge}
                  </p>
                </div>
                <motion.span
                  className="shrink-0 font-mono text-xl text-cyan/40"
                  animate={{ rotate: expanded === study.id ? 45 : 0 }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence>
                {expanded === study.id && (
                  <motion.div
                    id={`case-study-${study.id}`}
                    role="region"
                    aria-label={`${study.title} details`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-white/5"
                  >
                    <div className="space-y-4 p-6 pt-4 text-right">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-indigo/50">
                          {UI.approach}
                        </span>
                        <p className="fa-text mt-2 text-sm leading-relaxed text-white/50">
                          {study.approach}
                        </p>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-mint/50">
                          {UI.outcome}
                        </span>
                        <p className="fa-text mt-2 text-sm leading-relaxed text-white/50">
                          {study.outcome}
                        </p>
                      </div>
                      <div className="flex flex-wrap justify-end gap-2">
                        {study.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-white/5 px-3 py-1 font-mono text-[10px] text-cyan/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
