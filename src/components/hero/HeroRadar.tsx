"use client";

import { motion } from "framer-motion";
import { cinematicEase } from "@/lib/motion";

export default function HeroRadar({ active }: { active: boolean }) {
  const r = 110;

  return (
    <div className="hero-radar" aria-hidden>
      <motion.svg
        className="hero-radar__svg"
        viewBox={`0 0 ${r * 2 + 40} ${r * 2 + 40}`}
        width={r * 2 + 40}
        height={r * 2 + 40}
      >
        {[1, 0.78, 0.56].map((scale, i) => (
          <motion.circle
            key={i}
            cx={r + 20}
            cy={r + 20}
            r={r * scale}
            fill="none"
            stroke="rgba(59,130,246,0.2)"
            strokeWidth="1"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={
              active
                ? { scale: 1, opacity: [0.15, 0.35, 0.15] }
                : { scale: 0.6, opacity: 0 }
            }
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: `${r + 20}px ${r + 20}px` }}
          />
        ))}
        <motion.line
          x1={r + 20}
          y1={r + 20}
          x2={r + 20}
          y2={20}
          stroke="rgba(96,165,250,0.5)"
          strokeWidth="1"
          animate={active ? { rotate: 360 } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: `${r + 20}px ${r + 20}px` }}
        />
      </motion.svg>

      <motion.div
        className="hero-radar__core"
        initial={{ scale: 0, opacity: 0 }}
        animate={active ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: cinematicEase }}
      >
        <span className="fa-text">س</span>
      </motion.div>
    </div>
  );
}
