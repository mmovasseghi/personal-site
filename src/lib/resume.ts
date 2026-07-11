import { SKILL_CATEGORIES, UI } from "./constants";
import {
  buildPdfFromJpeg,
  captureElementAsJpeg,
  downloadBlob,
  printElement,
} from "./pdf-export";

export const RESUME_SKILLS = SKILL_CATEGORIES.flatMap((cat) =>
  cat.items.map((name) => ({
    name,
    level: 85,
    category: cat.title,
  }))
);

export const RESUME_FILENAME = "Mohammad_Sina_Movaseghi_Nezhad_Resume.pdf";

export async function downloadResumePdf(
  elementId = "resume-dossier-export"
): Promise<void> {
  const el = document.getElementById(elementId);
  if (!el) return;

  const hidden = el.querySelectorAll<HTMLElement>("[data-resume-export-hide]");
  hidden.forEach((node) => {
    node.style.display = "none";
  });

  try {
    const { data, width, height } = await captureElementAsJpeg(el, 2);
    const blob = buildPdfFromJpeg(data, width, height);
    downloadBlob(blob, RESUME_FILENAME);
  } catch {
    printElement(el);
  } finally {
    hidden.forEach((node) => {
      node.style.display = "";
    });
  }
}

export function printResume(elementId = "resume-dossier-export"): boolean {
  const el = document.getElementById(elementId);
  if (!el) return false;
  const ok = printElement(el);
  if (!ok) {
    window.alert(UI.printBlocked);
  }
  return ok;
}

/** @deprecated */
export function downloadResume(): void {
  void downloadResumePdf();
}
