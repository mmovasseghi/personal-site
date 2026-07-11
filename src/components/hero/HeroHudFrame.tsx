"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";

const CORNERS = [
  { pos: "tl", label: "NEXUS GATE", sub: "SECTOR 07" },
  { pos: "tr", label: "SIGNAL", sub: SITE.heroSignal },
  { pos: "bl", label: "NODE", sub: SITE.shortName },
  { pos: "br", label: "STATUS", sub: "ONLINE" },
] as const;

export default function HeroHudFrame({ visible }: { visible: boolean }) {
  return (
    <div className="hero-nexus__hud" aria-hidden>
      {CORNERS.map((c) => (
        <motion.div
          key={c.pos}
          className={`hero-nexus__hud-corner hero-nexus__hud-corner--${c.pos}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0.25 }}
          transition={{ duration: 0.8, delay: c.pos === "tl" ? 0 : 0.15 }}
        >
          <span className="hero-nexus__hud-bracket" />
          <span className="hero-nexus__hud-label ltr-block">{c.label}</span>
          <span className="hero-nexus__hud-sub ltr-block">{c.sub}</span>
        </motion.div>
      ))}

      <motion.div
        className="hero-nexus__hud-crosshair"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: visible ? 0.35 : 0, scale: 1 }}
        transition={{ duration: 1 }}
      />
    </div>
  );
}
