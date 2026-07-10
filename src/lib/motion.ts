import type { Variants, Transition } from "framer-motion";

export const cinematicEase = [0.16, 1, 0.3, 1] as const;

export const cinematicSpring: Transition = {
  type: "spring",
  stiffness: 80,
  damping: 20,
  mass: 1.2,
};

export const spring: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 0.8,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 22,
};

export const cinematicReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.92,
    filter: "blur(16px)",
    rotateX: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    rotateX: 0,
    transition: {
      duration: 1.1,
      ease: cinematicEase,
    },
  },
};

export const cinematicFade: Variants = {
  hidden: { opacity: 0, scale: 1.04, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: cinematicEase },
  },
};

export const cinematicCard: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.94,
    filter: "blur(10px)",
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: cinematicEase,
      delay: i * 0.1,
    },
  }),
};

export const cinematicLine: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.4, ease: cinematicEase },
  },
};

export const filmExit = {
  opacity: 0,
  scale: 1.08,
  filter: "blur(20px) brightness(2)",
  transition: { duration: 1, ease: cinematicEase },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: cinematicEase },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: cinematicEase } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: springSnappy,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const cardHover = {
  y: -8,
  scale: 1.03,
  boxShadow: "0 0 50px rgba(0,245,255,0.2), 0 0 100px rgba(67,56,255,0.12)",
};

export const glowPulse = {
  boxShadow: [
    "0 0 20px rgba(67,56,255,0.2)",
    "0 0 60px rgba(0,245,255,0.45)",
    "0 0 30px rgba(69,255,178,0.25)",
    "0 0 20px rgba(67,56,255,0.2)",
  ],
};
