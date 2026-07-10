import { RESUME, SITE, TECH_RADAR, UI, SECTIONS } from "./constants";

export function generateResumeText(): string {
  const lines = [
    SITE.nameFa.toUpperCase(),
    SITE.title,
    SITE.location,
    SITE.email,
    SITE.github,
    "",
    UI.summary.toUpperCase(),
    "─".repeat(40),
    RESUME.summary,
    "",
    UI.competencies.toUpperCase(),
    "─".repeat(40),
    ...RESUME.highlights.map((h) => `• ${h}`),
    "",
    `${SECTIONS.tech.title} ${SECTIONS.tech.highlight}`.toUpperCase(),
    "─".repeat(40),
    ...Object.entries(TECH_RADAR).map(
      ([, { label, items }]) => `${label}: ${items.join(", ")}`
    ),
    "",
    UI.education.toUpperCase(),
    "─".repeat(40),
    RESUME.education,
    "",
    "─".repeat(40),
    SITE.tagline.replace("\n", " — "),
  ];

  return lines.join("\n");
}

export function downloadResume(): void {
  const text = generateResumeText();
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Mohammad_Sina_Movaseghi_Nezhad_Resume.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
