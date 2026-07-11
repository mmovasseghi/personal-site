"use client";

import type { ReactNode } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import { ScrollProvider } from "@/components/cinematic/ScrollProvider";
import TechTunnelOverlay from "@/components/tunnel/TechTunnelOverlay";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import SafeTunnelCanvas from "@/components/tunnel/SafeTunnelCanvas";

export default function SiteExperience({
  children,
}: {
  children: ReactNode;
}) {
  const reduced = useReducedMotion();

  return (
    <ScrollProvider>
      <SmoothScroll>
        <TechTunnelOverlay />
        <div className="site-vignette" aria-hidden />
        <div className="site-scrim" aria-hidden />
        {!reduced && <SafeTunnelCanvas />}
        {children}
      </SmoothScroll>
    </ScrollProvider>
  );
}
