export const BOOT_KEY = "msm-lab-booted";

export function isBooted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(BOOT_KEY) === "1";
  } catch {
    return false;
  }
}

export function markBooted(): void {
  try {
    sessionStorage.setItem(BOOT_KEY, "1");
  } catch {
    /* ignore */
  }
}
