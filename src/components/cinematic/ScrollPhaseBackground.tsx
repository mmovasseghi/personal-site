"use client";

import { useScrollState } from "@/components/cinematic/ScrollProvider";

import type { ScrollPhase } from "@/components/cinematic/ScrollProvider";

const PHASES: Record<ScrollPhase, { a: string; b: string; c: string }> = {
  hero: {
    a: "rgba(37, 99, 235, 0.35)",
    b: "rgba(56, 189, 248, 0.2)",
    c: "rgba(6, 11, 20, 0.92)",
  },
  about: {
    a: "rgba(79, 70, 229, 0.28)",
    b: "rgba(59, 130, 246, 0.22)",
    c: "rgba(8, 12, 24, 0.9)",
  },
  skills: {
    a: "rgba(14, 165, 233, 0.3)",
    b: "rgba(37, 99, 235, 0.25)",
    c: "rgba(6, 14, 28, 0.88)",
  },
  work: {
    a: "rgba(99, 102, 241, 0.28)",
    b: "rgba(56, 189, 248, 0.18)",
    c: "rgba(10, 10, 22, 0.9)",
  },
  tech: {
    a: "rgba(14, 165, 233, 0.32)",
    b: "rgba(37, 99, 235, 0.22)",
    c: "rgba(6, 14, 28, 0.88)",
  },
  experience: {
    a: "rgba(99, 102, 241, 0.26)",
    b: "rgba(56, 189, 248, 0.2)",
    c: "rgba(8, 12, 24, 0.9)",
  },
  resume: {
    a: "rgba(67, 56, 255, 0.24)",
    b: "rgba(56, 189, 248, 0.16)",
    c: "rgba(6, 11, 22, 0.92)",
  },
  contact: {
    a: "rgba(59, 130, 246, 0.22)",
    b: "rgba(30, 64, 175, 0.3)",
    c: "rgba(4, 8, 18, 0.94)",
  },
};

export default function ScrollPhaseBackground() {
  const { phase } = useScrollState();
  const colors = PHASES[phase];

  return (
    <div className="scroll-phase-bg" aria-hidden data-phase={phase}>
      <div
        className="scroll-phase-bg__blob scroll-phase-bg__blob--a"
        style={{ background: `radial-gradient(circle, ${colors.a}, transparent 70%)` }}
      />
      <div
        className="scroll-phase-bg__blob scroll-phase-bg__blob--b"
        style={{ background: `radial-gradient(circle, ${colors.b}, transparent 68%)` }}
      />
      <div
        className="scroll-phase-bg__wash"
        style={{ background: colors.c }}
      />
    </div>
  );
}
