"use client";

import { motion } from "framer-motion";

const ORBS = [
  { size: 320, x: "15%", y: "20%", color: "rgba(67,56,255,0.18)", dur: 14 },
  { size: 240, x: "75%", y: "30%", color: "rgba(0,245,255,0.12)", dur: 18 },
  { size: 400, x: "50%", y: "70%", color: "rgba(124,77,255,0.1)", dur: 22 },
  { size: 180, x: "85%", y: "75%", color: "rgba(69,255,178,0.08)", dur: 16 },
];

export default function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: orb.dur,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <motion.div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,245,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "80px 80px"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
