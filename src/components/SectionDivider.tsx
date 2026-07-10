"use client";

import { motion } from "framer-motion";
import { cinematicLine, cinematicEase } from "@/lib/motion";

export default function SectionDivider() {
  return (
    <div className="relative flex items-center justify-center py-12">
      <motion.div
        className="h-px w-full max-w-md origin-center"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(67,56,255,0.5), rgba(0,245,255,0.6), rgba(124,77,255,0.5), transparent)",
        }}
        variants={cinematicLine}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      <motion.span
        className="absolute font-mono text-lg text-cyan/50"
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: cinematicEase, delay: 0.4 }}
        animate={{
          textShadow: [
            "0 0 10px rgba(0,245,255,0.3)",
            "0 0 25px rgba(0,245,255,0.6)",
            "0 0 10px rgba(0,245,255,0.3)",
          ],
        }}
      >
        ◈
      </motion.span>
    </div>
  );
}
