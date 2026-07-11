"use client";

import { useMemo } from "react";

function makeColumn(seed: number, len = 28) {
  const chars: string[] = [];
  for (let i = 0; i < len; i++) {
    const roll = (seed * 17 + i * 31) % 10;
    chars.push(roll > 4 ? "1" : "0");
    if (roll === 3) chars.push(roll > 5 ? "{" : "}");
  }
  return chars.join("\n");
}

export default function HeroBinaryStream({ side }: { side: "left" | "right" }) {
  const columns = useMemo(
    () =>
      Array.from({ length: side === "left" ? 6 : 6 }, (_, i) => ({
        id: i,
        text: makeColumn(i + (side === "left" ? 0 : 9)),
        delay: i * 0.35,
        duration: 5 + (i % 4),
      })),
    [side]
  );

  return (
    <div className={`hero-binary hero-binary--${side}`} aria-hidden>
      {columns.map((col) => (
        <span
          key={col.id}
          className="hero-binary__col ltr-block"
          style={{
            animationDuration: `${col.duration}s`,
            animationDelay: `${col.delay}s`,
          }}
        >
          {col.text}
        </span>
      ))}
    </div>
  );
}
