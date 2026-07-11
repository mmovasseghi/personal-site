"use client";

import { motion } from "framer-motion";
import { TUNNEL_RING_CHARS } from "@/lib/hacker-glyphs";

const PORTAL_SYMBOLS = [
  ...TUNNEL_RING_CHARS.slice(0, 24),
  "0", "1", "{", "}", "<", ">",
];

function ringGlyphs(count: number, radius: number, seed: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    const char = PORTAL_SYMBOLS[(i + seed) % PORTAL_SYMBOLS.length];
    return {
      char,
      x: 200 + Math.cos(angle) * radius,
      y: 200 + Math.sin(angle) * radius * 0.82,
      angle,
    };
  });
}

interface HeroNexusPortalProps {
  active: boolean;
  charged: boolean;
}

export default function HeroNexusPortal({ active, charged }: HeroNexusPortalProps) {
  const outerGlyphs = ringGlyphs(28, 168, 0);
  const midGlyphs = ringGlyphs(20, 128, 7);
  const innerGlyphs = ringGlyphs(14, 88, 13);

  return (
    <div className="hero-nexus__portal" aria-hidden>
      <motion.div
        className="hero-nexus__portal-glow"
        animate={
          charged
            ? { opacity: [0.5, 0.85, 0.5], scale: [1, 1.04, 1] }
            : { opacity: 0.25, scale: 0.92 }
        }
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.svg
        className="hero-nexus__portal-svg"
        viewBox="0 0 400 400"
        animate={{ rotate: active ? 360 : 0 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <radialGradient id="nexusVoid" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(15,23,42,0)" />
            <stop offset="45%" stopColor="rgba(30,58,138,0.15)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0.08)" />
          </radialGradient>
          <linearGradient id="nexusEdge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>

        <polygon
          points="200,28 340,110 340,290 200,372 60,290 60,110"
          fill="url(#nexusVoid)"
          stroke="url(#nexusEdge)"
          strokeWidth="1.2"
          strokeDasharray="12 8"
          opacity={charged ? 0.75 : 0.35}
        />

        {[155, 118, 82].map((r, i) => (
          <ellipse
            key={r}
            cx="200"
            cy="200"
            rx={r}
            ry={r * 0.78}
            fill="none"
            stroke="rgba(96,165,250,0.12)"
            strokeWidth="0.8"
            strokeDasharray={i === 0 ? "4 10" : "2 14"}
            opacity={charged ? 0.6 : 0.2}
          />
        ))}
      </motion.svg>

      <motion.svg
        className="hero-nexus__portal-svg hero-nexus__portal-svg--reverse"
        viewBox="0 0 400 400"
        animate={{ rotate: active ? -360 : 0 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        {outerGlyphs.map((g, i) => (
          <text
            key={`o-${i}`}
            x={g.x}
            y={g.y}
            className="hero-nexus__glyph hero-nexus__glyph--outer"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {g.char}
          </text>
        ))}
      </motion.svg>

      <motion.svg
        className="hero-nexus__portal-svg hero-nexus__portal-svg--mid"
        viewBox="0 0 400 400"
        animate={{ rotate: active ? 360 : 0 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      >
        {midGlyphs.map((g, i) => (
          <text
            key={`m-${i}`}
            x={g.x}
            y={g.y}
            className="hero-nexus__glyph hero-nexus__glyph--mid"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {g.char}
          </text>
        ))}
      </motion.svg>

      <motion.svg
        className="hero-nexus__portal-svg hero-nexus__portal-svg--inner"
        viewBox="0 0 400 400"
        animate={{ rotate: active ? -360 : 0 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        {innerGlyphs.map((g, i) => (
          <text
            key={`i-${i}`}
            x={g.x}
            y={g.y}
            className="hero-nexus__glyph hero-nexus__glyph--inner"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {g.char}
          </text>
        ))}
      </motion.svg>

      <motion.div
        className="hero-nexus__portal-sweep"
        animate={active ? { rotate: 360 } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="hero-nexus__portal-core"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={
          charged
            ? { scale: [1, 1.06, 1], opacity: 1 }
            : { scale: 0.85, opacity: active ? 0.6 : 0.2 }
        }
        transition={{ duration: 2.5, repeat: charged ? Infinity : 0 }}
      >
        <span className="fa-text">س</span>
      </motion.div>
    </div>
  );
}
