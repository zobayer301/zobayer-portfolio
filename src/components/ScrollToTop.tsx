"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          type="button"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className="hoverable fixed bottom-6 right-4 sm:right-6 z-[8500] w-12 h-12 rounded-full bg-black text-white border border-black flex items-center justify-center hover:bg-neutral-800 hover:border-neutral-800 transition-all duration-300 min-h-[44px] min-w-[44px] dark:bg-foreground/10 dark:text-foreground/80 dark:border-foreground/20 dark:hover:bg-foreground/20 dark:hover:border-foreground/40 dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTop;
