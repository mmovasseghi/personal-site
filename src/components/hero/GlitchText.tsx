"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const GLITCH_CHARS = "█▓░<>{}[]/\\|0x@#";

interface GlitchTextProps {
  text: string;
  className?: string;
  active?: boolean;
}

export default function GlitchText({
  text,
  className = "",
  active = true,
}: GlitchTextProps) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? text : "");

  useEffect(() => {
    if (reduced || !active) {
      setDisplay(text);
      return;
    }

    let frame = 0;
    const total = 18;
    const id = setInterval(() => {
      frame++;
      if (frame >= total) {
        setDisplay(text);
        clearInterval(id);
        return;
      }
      const progress = frame / total;
      setDisplay(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i / text.length < progress) return ch;
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join("")
      );
    }, 45);

    return () => clearInterval(id);
  }, [text, active, reduced]);

  return (
    <span
      className={`glitch-text ${className}`}
      data-text={text}
      aria-label={text}
    >
      {display}
    </span>
  );
}
