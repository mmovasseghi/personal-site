"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [xp, setXp] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setXp(Math.round(v * 100));
    });
  }, [scrollYProgress]);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[9997] h-[2px] origin-right rtl:origin-right ltr:origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #2563eb, #3b82f6, #60a5fa, #38bdf8)",
        }}
      />

      {xp > 2 && (
        <motion.div
          className="fixed bottom-6 start-6 z-[9990] hidden md:block"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="glass glass-edge px-3 py-1.5 font-body text-[11px]">
            <span className="text-white/40">پیشرفت </span>
            <span className="font-mono font-semibold text-cyan">{xp}٪</span>
          </div>
        </motion.div>
      )}
    </>
  );
}
