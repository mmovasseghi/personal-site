"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS, SITE, UI } from "@/lib/constants";
import { navHrefForSection, detectActiveSection } from "@/lib/section-spy";
import { subscribePageScroll } from "@/lib/scroll-events";
import Logo from "./Logo";
import { cinematicEase } from "@/lib/motion";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const section = detectActiveSection();
      setActive(navHrefForSection(section));
    };

    onScroll();
    return subscribePageScroll(onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.nav
        className={`fixed left-0 right-0 top-0 z-[9995] px-6 py-5 transition-all md:px-12 ${
          scrolled ? "glass border-b border-white/5 py-4" : ""
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="#hero" data-cursor-hover>
            <Logo showLabel />
          </a>

          <div className="hidden items-center gap-6 lg:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`fa-text relative font-body text-sm font-medium transition-colors ${
                  active === item.href
                    ? "text-cyan"
                    : "text-white/50 hover:text-white/80"
                }`}
                data-cursor-hover
              >
                {item.label}
                {active === item.href && (
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-cyan"
                    layoutId="nav-indicator"
                  />
                )}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="nav-menu-btn lg:hidden"
            onClick={() => setOpen(true)}
            aria-label={UI.menuToggle}
            aria-expanded={open}
          >
            <span className="nav-menu-btn__line" />
            <span className="nav-menu-btn__line" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="nav-sheet"
            role="dialog"
            aria-modal="true"
            aria-label={UI.menuLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <motion.div
              className="nav-sheet__panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: cinematicEase }}
            >
              <div className="nav-sheet__top">
                <Logo showLabel />
                <button
                  type="button"
                  className="nav-sheet__close"
                  onClick={() => setOpen(false)}
                  aria-label={UI.menuToggle}
                  data-cursor-hover
                >
                  بستن
                </button>
              </div>

              <nav className="nav-sheet__links">
                {NAV_ITEMS.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className={`nav-sheet__link fa-text${
                      active === item.href ? " nav-sheet__link--on" : ""
                    }`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.05, ease: cinematicEase }}
                    data-cursor-hover
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <p className="nav-sheet__foot ltr-block">
                {SITE.shortName} · {SITE.heroSignal}
              </p>
            </motion.div>
            <button
              type="button"
              className="nav-sheet__backdrop"
              onClick={() => setOpen(false)}
              aria-label={UI.menuToggle}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
