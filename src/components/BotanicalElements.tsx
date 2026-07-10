"use client";

import { motion } from "framer-motion";

function MonsteraSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 280"
      className={`wireframe-glow ${className ?? ""}`}
      aria-hidden="true"
    >
      <path
        className="wireframe-stroke"
        d="M100 270 L100 120"
      />
      <path
        className="wireframe-stroke"
        d="M100 120 C60 100, 20 80, 30 50 C40 30, 70 40, 100 80"
      />
      <path
        className="wireframe-stroke"
        d="M100 120 C140 100, 180 80, 170 50 C160 30, 130 40, 100 80"
      />
      <path
        className="wireframe-stroke"
        d="M100 140 C50 130, 10 110, 20 70 C30 50, 60 60, 100 100"
      />
      <path
        className="wireframe-stroke"
        d="M100 140 C150 130, 190 110, 180 70 C170 50, 140 60, 100 100"
      />
      <path
        className="wireframe-stroke"
        d="M100 160 C70 155, 40 140, 50 100 C55 85, 75 90, 100 120"
      />
      <path
        className="wireframe-stroke"
        d="M100 160 C130 155, 160 140, 150 100 C145 85, 125 90, 100 120"
      />
      <line className="wireframe-stroke" x1="65" y1="55" x2="75" y2="65" />
      <line className="wireframe-stroke" x1="125" y1="55" x2="135" y2="65" />
      <line className="wireframe-stroke" x1="55" y1="85" x2="65" y2="95" />
      <line className="wireframe-stroke" x1="145" y1="85" x2="135" y2="95" />
    </svg>
  );
}

function CactusSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 200"
      className={`wireframe-glow ${className ?? ""}`}
      aria-hidden="true"
    >
      <path
        className="wireframe-stroke"
        d="M55 190 L55 60"
        strokeWidth="2"
      />
      <path
        className="wireframe-stroke"
        d="M55 100 L30 100 L30 70 L55 70"
      />
      <path
        className="wireframe-stroke"
        d="M65 120 L90 120 L90 90 L65 90"
      />
      <ellipse
        className="wireframe-stroke"
        cx="55"
        cy="50"
        rx="20"
        ry="25"
      />
      <line className="wireframe-stroke" x1="45" y1="40" x2="48" y2="50" />
      <line className="wireframe-stroke" x1="55" y1="35" x2="55" y2="48" />
      <line className="wireframe-stroke" x1="65" y1="40" x2="62" y2="50" />
      <line className="wireframe-stroke" x1="40" y1="55" x2="50" y2="55" />
      <line className="wireframe-stroke" x1="60" y1="55" x2="70" y2="55" />
      <rect
        className="wireframe-stroke"
        x="35"
        y="185"
        width="50"
        height="10"
        rx="2"
        opacity="0.3"
      />
    </svg>
  );
}

export default function BotanicalElements() {
  return (
    <>
      <motion.div
        className="pointer-events-none fixed bottom-0 left-0 z-[1] w-32 md:w-48"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 0.65, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <MonsteraSVG className="h-auto w-full" />
        </motion.div>
      </motion.div>

      <motion.div
        className="pointer-events-none fixed bottom-8 right-8 z-[1] w-20 md:w-28"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.7, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <CactusSVG className="h-auto w-full" />
        </motion.div>
      </motion.div>
    </>
  );
}

export { MonsteraSVG, CactusSVG };
