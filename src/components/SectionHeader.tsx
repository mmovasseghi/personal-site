"use client";

import { motion } from "framer-motion";
import { SECTIONS, ACCENT_CLASS, type SectionId } from "@/lib/constants";
import { cinematicReveal } from "@/lib/motion";

interface SectionHeaderProps {
  id: SectionId;
  className?: string;
  size?: "md" | "lg";
}

export default function SectionHeader({
  id,
  className = "",
  size = "lg",
}: SectionHeaderProps) {
  const section = SECTIONS[id];

  return (
    <motion.header
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={cinematicReveal}
    >
      <motion.span
        className={`fa-text inline-block font-body text-xs font-medium ${ACCENT_CLASS[section.accent]}`}
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        {section.eyebrow}
      </motion.span>
      <h2
        className={`fa-text mt-4 font-display font-semibold ${
          size === "lg" ? "text-3xl md:text-[2.75rem]" : "text-2xl md:text-4xl"
        }`}
      >
        {section.title}{" "}
        {section.highlight && (
          <span className="rgb-text">{section.highlight}</span>
        )}
      </h2>
      {section.subtitle && (
        <p className="fa-text mt-4 max-w-lg text-sm leading-8 text-white/45">
          {section.subtitle}
        </p>
      )}
    </motion.header>
  );
}
