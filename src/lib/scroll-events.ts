export function subscribePageScroll(handler: () => void): () => void {
  window.addEventListener("scroll", handler, { passive: true });
  window.addEventListener("lenis-scroll", handler, { passive: true });
  return () => {
    window.removeEventListener("scroll", handler);
    window.removeEventListener("lenis-scroll", handler);
  };
}

export function scrollToTop(): void {
  const hero = document.getElementById("hero");
  if (hero) {
    hero.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}
