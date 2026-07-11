"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UI } from "@/lib/constants";
import { subscribePageScroll, scrollToTop } from "@/lib/scroll-events";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    return subscribePageScroll(onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className="fixed bottom-8 right-8 z-[9994] glass-edge glass flex h-12 w-12 items-center justify-center font-mono text-cyan neon-border"
          onClick={() => scrollToTop()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(0,245,255,0.3)" }}
          aria-label={UI.backToTop}
          data-cursor-hover
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}
