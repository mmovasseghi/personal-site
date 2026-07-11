import { detectActiveSection } from "@/lib/section-spy";

export type ScrollPhase =
  | "hero"
  | "about"
  | "skills"
  | "tech"
  | "work"
  | "experience"
  | "resume"
  | "contact";

let lastProgress = 0;
let lastTime = 0;

export const scrollStore = {
  progress: 0,
  phase: "hero" as ScrollPhase,
  velocity: 0,
};

export function detectScrollPhase(): ScrollPhase {
  return detectActiveSection(140);
}

export function applyScrollProgress(progress: number) {
  const now = performance.now();
  if (lastTime > 0) {
    const dt = (now - lastTime) / 1000;
    if (dt > 0 && dt < 0.35) {
      scrollStore.velocity = (progress - lastProgress) / dt;
    } else {
      scrollStore.velocity = 0;
    }
  }
  lastProgress = progress;
  lastTime = now;

  const phase = detectScrollPhase();
  scrollStore.progress = progress;
  scrollStore.phase = phase;

  const el = document.documentElement;
  el.style.setProperty("--scroll-p", String(progress));
  el.style.setProperty("--scroll-phase", phase);
  el.style.setProperty("--scroll-vel", String(Math.min(3, Math.abs(scrollStore.velocity))));
  el.dataset.scrollPhase = phase;

  return { progress, phase };
}

export function readScrollProgress() {
  const el = document.documentElement;
  const limit = el.scrollHeight - el.clientHeight;
  return limit > 0 ? el.scrollTop / limit : 0;
}
