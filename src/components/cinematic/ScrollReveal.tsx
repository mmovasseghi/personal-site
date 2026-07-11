"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cinematicEase } from "@/lib/motion";
import { useIsMobile } from "@/hooks/useIsMobile";

type RevealVariant = "up" | "fade" | "scale" | "slide";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
}

function buildVariants(mobile: boolean, delay: number): Record<RevealVariant, Variants> {
  return {
    up: {
      hidden: {
        opacity: 0,
        y: mobile ? 32 : 56,
        filter: "blur(10px)",
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.85, delay, ease: cinematicEase },
      },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.75, delay, ease: cinematicEase },
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.94, filter: "blur(6px)" },
      visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.8, delay, ease: cinematicEase },
      },
    },
    slide: {
      hidden: { opacity: 0, x: mobile ? -24 : -40 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.85, delay, ease: cinematicEase },
      },
    },
  };
}

export default function ScrollReveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  as = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mobile = useIsMobile();
  const inView = useInView(ref, {
    once: true,
    margin: mobile ? "-6% 0px -6% 0px" : "-10% 0px -8% 0px",
    amount: mobile ? 0.25 : 0.18,
  });

  const variants = buildVariants(mobile, delay)[variant];
  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </Component>
  );
}
