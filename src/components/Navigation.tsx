"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS, UI } from "@/lib/constants";
import Logo from "./Logo";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => item.href.slice(1));

    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActive(`#${sections[i]}`);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
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

  useEffect(() => {
    if (!open) return;
    const menu = document.getElementById("mobile-nav");
    const firstLink = menu?.querySelector("a") as HTMLElement | null;
    firstLink?.focus();
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
            className="glass px-3 py-2 font-mono text-xs lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={UI.menuToggle}
            aria-expanded={open}
          >
            {open ? "✕" : "≡"}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-[9994] flex flex-col items-center justify-center bg-void/95 backdrop-blur-xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={UI.menuLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className={`font-display text-2xl font-semibold ${
                    active === item.href ? "rgb-text" : "text-white/60"
                  }`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
