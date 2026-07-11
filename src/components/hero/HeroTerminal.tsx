"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HERO_BOOT_LINES } from "@/lib/constants";
import { cinematicEase } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function HeroTerminal({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  const [lines, setLines] = useState<number>(reduced ? HERO_BOOT_LINES.length : 0);

  useEffect(() => {
    if (!active || reduced) {
      setLines(HERO_BOOT_LINES.length);
      return;
    }

    setLines(0);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setLines(i);
      if (i >= HERO_BOOT_LINES.length) clearInterval(id);
    }, 280);

    return () => clearInterval(id);
  }, [active, reduced]);

  return (
    <motion.div
      className="hero-terminal"
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: cinematicEase }}
    >
      <div className="hero-terminal__chrome ltr-block">
        <span className="hero-terminal__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="hero-terminal__title">sina@mmovasseghi — bash</span>
        <span className="hero-terminal__status">● LIVE</span>
      </div>
      <div className="hero-terminal__body ltr-block">
        {HERO_BOOT_LINES.slice(0, lines).map((line, i) => (
          <div
            key={`${line.text}-${i}`}
            className={`hero-terminal__line hero-terminal__line--${line.type}`}
          >
            {line.type === "cmd" ? (
              <>
                <span className="hero-terminal__prompt">{"~$"}</span>
                {line.text}
              </>
            ) : (
              line.text
            )}
          </div>
        ))}
        {lines < HERO_BOOT_LINES.length && (
          <span className="hero-terminal__caret">_</span>
        )}
      </div>
    </motion.div>
  );
}
