"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  EXPERIENCE,
  RESUME,
  SITE,
  SKILL_CATEGORIES,
  UI,
} from "@/lib/constants";
import { cinematicCard, staggerContainer, staggerFast } from "@/lib/motion";
import { printResume } from "@/lib/resume";
import SectionHeader from "./SectionHeader";

const HIGHLIGHT_ICONS = ["◈", "⬡", "□", "◎", "△", "◇"];

export default function Resume() {
  return (
    <section id="resume" className="section relative">
      <div className="section-inner">
        <SectionHeader id="resume" />

        <motion.div
          id="resume-dossier-export"
          className="resume-dossier"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="resume-dossier__scan" aria-hidden />
          <div className="resume-dossier__glow" aria-hidden />

          <header className="resume-dossier__strip">
            <motion.div
              className="resume-dossier__identity"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <div className="resume-dossier__avatar">
                <span className="resume-dossier__avatar-ring" aria-hidden />
                <span className="resume-dossier__avatar-frame">
                  <span className="resume-dossier__avatar-img-wrap">
                    <Image
                      src="/images/mohammad-sina-movaseghi-nezhad.png"
                      alt={`عکس ${SITE.nameFa} — ${SITE.title}`}
                      width={96}
                      height={96}
                      className="resume-dossier__avatar-img"
                    />
                    <span className="resume-dossier__avatar-tint" aria-hidden />
                    <span className="resume-dossier__avatar-scan" aria-hidden />
                  </span>
                </span>
              </div>
              <div>
                <h3 className="resume-dossier__name fa-text">{SITE.nameFa}</h3>
                <p className="resume-dossier__role ltr-block">
                  {SITE.titleEn} · {SITE.location}
                </p>
              </div>
            </motion.div>

            <motion.div
              className="resume-dossier__meta ltr-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
            >
              <span className="resume-dossier__status">
                <span className="resume-dossier__pulse" aria-hidden />
                ACTIVE
              </span>
              <span className="resume-dossier__file">DOSSIER_0x7F2A</span>
            </motion.div>

            <div className="resume-dossier__actions" data-resume-export-hide>
              <motion.button
                type="button"
                onClick={() => printResume()}
                className="resume-dossier__btn"
                data-cursor-hover
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                {UI.printCv}
              </motion.button>
            </div>
          </header>

          <motion.blockquote
            className="resume-dossier__summary fa-text"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="resume-dossier__summary-mark" aria-hidden>
              &ldquo;
            </span>
            {RESUME.summary}
          </motion.blockquote>

          <motion.div
            className="resume-dossier__clusters"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
          >
            {SKILL_CATEGORIES.map((cat, i) => (
              <motion.article
                key={cat.id}
                className="resume-dossier__cluster"
                style={{ "--cluster-color": cat.color } as CSSProperties}
                variants={cinematicCard}
                custom={i}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="resume-dossier__cluster-head ltr-block">
                  <span className="resume-dossier__cluster-index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="resume-dossier__cluster-title">{cat.title}</h4>
                  <motion.span
                    className="resume-dossier__cluster-bar"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.08 }}
                  />
                </div>
                <motion.ul
                  className="resume-dossier__tags"
                  variants={staggerFast}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {cat.items.map((skill) => (
                    <motion.li
                      key={skill}
                      className="resume-dossier__tag ltr-block"
                      variants={cinematicCard}
                    >
                      {skill}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.article>
            ))}
          </motion.div>

          <div className="resume-dossier__grid">
            <motion.div
              className="resume-dossier__panel"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <h4 className="resume-dossier__panel-title fa-text">
                <span className="resume-dossier__panel-glyph" aria-hidden>
                  ║
                </span>
                تجربه
              </h4>
              <ol className="resume-dossier__timeline">
                {EXPERIENCE.slice(0, 4).map((item, i) => (
                  <motion.li
                    key={item}
                    className="resume-dossier__timeline-item"
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.45 }}
                  >
                    <span className="resume-dossier__timeline-node ltr-block">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="resume-dossier__timeline-text fa-text">{item}</p>
                  </motion.li>
                ))}
              </ol>
            </motion.div>

            <motion.div
              className="resume-dossier__panel"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              <h4 className="resume-dossier__panel-title fa-text">
                <span className="resume-dossier__panel-glyph" aria-hidden>
                  ║
                </span>
                نکات کلیدی
              </h4>
              <ul className="resume-dossier__highlights">
                {RESUME.highlights.slice(0, 4).map((item, i) => (
                  <motion.li
                    key={item}
                    className="resume-dossier__highlight"
                    initial={{ opacity: 0, scale: 0.92, y: 12 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.09, duration: 0.4 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 24px rgba(0, 245, 255, 0.12)",
                    }}
                  >
                    <span className="resume-dossier__highlight-icon ltr-block">
                      {HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length]}
                    </span>
                    <span className="resume-dossier__highlight-text ltr-block">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.footer
            className="resume-dossier__foot ltr-block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={`tel:${SITE.phoneIntl}`}>{SITE.phone}</a>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer">
              github.com/mmovasseghi
            </a>
            <a href="#tech" className="resume-dossier__foot-cta fa-text">
              مشاهده همه مهارت‌ها →
            </a>
          </motion.footer>
        </motion.div>
      </div>
    </section>
  );
}
