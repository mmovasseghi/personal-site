"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { ALL_SKILLS, SKILL_CATEGORIES } from "@/lib/constants";
import SectionHeader from "./SectionHeader";

const LANES = SKILL_CATEGORIES.map((cat) => ({
  ...cat,
  hex: cat.id === "microsoft" ? "0x4F00" : cat.id === "web" ? "0x7A10" : cat.id === "data" ? "0x3B91" : "0x2A44",
}));

function chunkSkills(items: string[], cols: number) {
  const rows: string[][] = [];
  for (let i = 0; i < items.length; i += cols) {
    rows.push(items.slice(i, i + cols));
  }
  return rows;
}

export default function TechRadar() {
  const registryRows = chunkSkills(ALL_SKILLS, 4);

  return (
    <section id="tech" className="section tech-stack">
      <div className="section-inner">
        <SectionHeader id="tech" />

        <motion.div
          className="tech-stack__panel"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="tech-stack__scan" aria-hidden />
          <div className="tech-stack__chrome ltr-block">
            <div className="tech-stack__dots" aria-hidden>
              <span />
              <span />
              <span />
            </div>
            <p className="tech-stack__title">STACK_MANIFEST {"//"} modules.loaded</p>
            <span className="tech-stack__badge">{ALL_SKILLS.length} MOD</span>
          </div>

          <div className="tech-stack__body">
            <p className="tech-stack__prompt ltr-block">
              <span>{">"}</span> cat stack_manifest.dat
            </p>

            <div className="tech-stack__lanes">
              {LANES.map((lane, i) => (
                <motion.article
                  key={lane.id}
                  className="tech-stack__lane"
                  style={{ "--lane-color": lane.color } as CSSProperties}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.45 }}
                >
                  <div className="tech-stack__lane-head ltr-block">
                    <span className="tech-stack__lane-hex">{lane.hex}</span>
                    <h3 className="tech-stack__lane-title">{lane.title}</h3>
                  </div>
                  <p className="tech-stack__lane-items ltr-block">
                    {lane.items.join("  |  ")}
                  </p>
                </motion.article>
              ))}
            </div>

            <div className="tech-stack__registry">
              <div className="tech-stack__registry-head ltr-block">
                <span>FULL_REGISTRY</span>
                <span>Programming Languages &amp; Technologies</span>
              </div>
              <div className="tech-stack__matrix ltr-block" role="list">
                {registryRows.map((row, ri) => (
                  <div key={ri} className="tech-stack__matrix-row">
                    {row.map((skill) => (
                      <span key={skill} className="tech-stack__cell" role="listitem">
                        {skill}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <p className="tech-stack__foot ltr-block">
              <span className="tech-stack__foot-ok">[OK]</span>
              stack integrity verified — end-to-end builder
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
