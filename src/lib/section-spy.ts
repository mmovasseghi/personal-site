import type { ScrollPhase } from "@/lib/scroll-store";

export const SECTION_ORDER: ScrollPhase[] = [
  "hero",
  "about",
  "skills",
  "tech",
  "work",
  "experience",
  "resume",
  "contact",
];

/** نگاشت بخش فعلی به آیتم منو (tech→skills، experience→work) */
export const SECTION_NAV_MAP: Record<ScrollPhase, string> = {
  hero: "#hero",
  about: "#about",
  skills: "#skills",
  tech: "#skills",
  work: "#work",
  experience: "#work",
  resume: "#resume",
  contact: "#contact",
};

export function detectActiveSection(offset = 140): ScrollPhase {
  if (typeof document === "undefined") return "hero";

  const scrollPos = document.documentElement.scrollTop + offset;
  let active: ScrollPhase = "hero";

  for (let i = SECTION_ORDER.length - 1; i >= 0; i--) {
    const id = SECTION_ORDER[i];
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollPos) {
      active = id;
      break;
    }
  }

  return active;
}

export function navHrefForSection(section: ScrollPhase): string {
  return SECTION_NAV_MAP[section];
}
