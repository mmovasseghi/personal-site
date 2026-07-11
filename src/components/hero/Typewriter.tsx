"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TypewriterProps {
  text: string;
  start?: boolean;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
}

export default function Typewriter({
  text,
  start = true,
  speed = 38,
  delay = 0,
  className = "",
  cursor = true,
}: TypewriterProps) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced ? text : "");
  const [done, setDone] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    if (!start) {
      setShown("");
      setDone(false);
      return;
    }

    let index = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        index++;
        setShown(text.slice(0, index));
        if (index >= text.length) {
          setDone(true);
          if (interval) clearInterval(interval);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, start, speed, delay, reduced]);

  return (
    <span className={className}>
      {shown}
      {cursor && !done && <span className="typewriter-cursor">_</span>}
    </span>
  );
}
