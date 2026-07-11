"use client";

import { useMemo } from "react";
import { useScrollState } from "@/components/cinematic/ScrollProvider";
import {
  TECH_TUNNEL_NODES,
  getTunnelState,
  cameraZFromProgress,
  TUNNEL_START_Z,
  TUNNEL_END_Z,
} from "@/lib/tech-tunnel";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import HackerMatrixRain from "@/components/tunnel/HackerMatrixRain";
import { TERMINAL_PROMPTS, randomSymbol, TUNNEL_RING_CHARS } from "@/lib/hacker-glyphs";

const LAYER_COLORS: Record<string, string> = {
  core: "#3b82f6",
  backend: "#06b6d4",
  frontend: "#60a5fa",
  infra: "#818cf8",
  product: "#34d399",
  credits: "#60a5fa",
};

export default function TechTunnelOverlay() {
  const { progress } = useScrollState();
  const mobile = useIsMobile();
  const reduced = useReducedMotion();
  const state = useMemo(() => getTunnelState(progress), [progress]);
  const cameraZ = cameraZFromProgress(progress);
  const prompt = TERMINAL_PROMPTS[Math.floor(progress * TERMINAL_PROMPTS.length)] ?? TERMINAL_PROMPTS[0];

  const floatSymbols = useMemo(
    () =>
      Array.from({ length: mobile ? 10 : 18 }, (_, i) => ({
        id: i,
        symbol:
          i % 3 === 0
            ? TUNNEL_RING_CHARS[i % TUNNEL_RING_CHARS.length]
            : randomSymbol(i * 17 + Math.floor(progress * 100)),
        left: `${8 + ((i * 37) % 84)}%`,
        delay: i * 0.35,
      })),
    [mobile, progress]
  );

  return (
    <div className="tunnel-overlay tunnel-overlay--hacker" aria-hidden data-layer={state.layer}>
      <HackerMatrixRain />
      <div className="tunnel-scanlines" />

      {!reduced && (
        <div className="tunnel-glyphs">
          {floatSymbols.map((s) => (
            <span
              key={s.id}
              className="tunnel-glyphs__item ltr-block"
              style={{
                left: s.left,
                animationDelay: `${s.delay}s`,
                opacity: 0.08 + progress * 0.15,
              }}
            >
              {s.symbol}
            </span>
          ))}
        </div>
      )}

      {!reduced && (
        <div
          className="tunnel-speed-lines"
          style={{ ["--tunnel-speed" as string]: `${0.4 + progress * 1.2}s` }}
        >
          {Array.from({ length: mobile ? 8 : 16 }).map((_, i) => (
            <span
              key={i}
              className="tunnel-speed-lines__line"
              style={{
                left: `${(i / (mobile ? 8 : 16)) * 100}%`,
                animationDuration: `var(--tunnel-speed, 0.8s)`,
                animationDelay: `${i * 0.08}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="tunnel-terminal ltr-block">
        <span className="tunnel-terminal__prompt">{">"}{prompt}</span>
        <span className="tunnel-terminal__cursor">_</span>
      </div>

      <div className="tunnel-roadmap">
        <div className="tunnel-roadmap__header ltr-block">
          <span>{"// PIPELINE"}</span>
          <strong>{state.progressPct}%</strong>
        </div>
        <div className="tunnel-roadmap__track">
          <div className="tunnel-roadmap__fill" style={{ height: `${progress * 100}%` }} />
          {TECH_TUNNEL_NODES.map((node) => {
            const passed = state.passed.some((p) => p.id === node.id);
            const active = state.current?.id === node.id;
            const top = ((TUNNEL_START_Z - node.z) / (TUNNEL_START_Z - TUNNEL_END_Z)) * 100;
            return (
              <div
                key={node.id}
                className={`tunnel-roadmap__node${passed ? " is-passed" : ""}${active ? " is-active" : ""}`}
                style={{ top: `${top}%`, ["--node-color" as string]: node.color }}
                title={node.name}
              >
                <span className="tunnel-roadmap__dot" />
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="tunnel-zone tunnel-zone--glyph"
        style={{ ["--zone-color" as string]: LAYER_COLORS[state.layer] ?? "#3b82f6" }}
      >
        <span className="tunnel-zone__glyph ltr-block">
          {TUNNEL_RING_CHARS[Math.floor(progress * TUNNEL_RING_CHARS.length) % TUNNEL_RING_CHARS.length]}
        </span>
      </div>

      <div className="tunnel-depth ltr-block">
        <span>ADDR</span>
        <strong>{`0x${Math.abs(Math.round(cameraZ)).toString(16).toUpperCase()}`}</strong>
      </div>
    </div>
  );
}
