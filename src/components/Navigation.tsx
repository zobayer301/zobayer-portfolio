"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Code, Briefcase, GraduationCap, Mail, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { id: "about", label: "About", icon: User },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Code },
  { id: "work", label: "Projects", icon: Briefcase },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "contact", label: "Contact", icon: Mail },
];

const sections = navItems.map((item) => item.id);

export function Navigation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const [hidden, setHidden] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const referenceLine = window.innerHeight * 0.35;
      let current = 0;
      let maxVisible = -1;
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i]);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, window.innerHeight);
        const visible = visibleBottom - visibleTop;
        if (rect.top <= referenceLine && visible > maxVisible) {
          maxVisible = visible;
          current = i;
        }
      }
      setActiveIndex((prev) => (prev === current ? prev : current));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      const btn = btnRefs.current[activeIndex];
      const container = containerRef.current;
      if (!btn || !container) return;
      const btnRect = btn.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setIndicatorStyle({
        width: btnRect.width,
        left: btnRect.left - containerRect.left,
      });
    };
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeIndex]);

  const scrollToSection = (sectionId: string, index: number) => {
    setActiveIndex(index);
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 10) {
        setHidden(false);
      } else if (y > lastY + 4) {
        setHidden(true);
      } else if (y < lastY - 4) {
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (e.clientY <= 80) setHidden(false);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const handleNavEnter = () => setHidden(false);
  const handleNavLeave = () => {
    if (window.scrollY > 10) setHidden(true);
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-[9500] flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 26, delay: 0.5 }}
        onMouseEnter={handleNavEnter}
        onMouseLeave={handleNavLeave}
        aria-label="Navigation"
        className="pointer-events-auto w-fit max-w-[95vw]"
      >
        <div
          ref={containerRef}
          className="relative flex items-center backdrop-blur-md bg-white/80 border border-black/5 rounded-full px-1.5 py-2 shadow-md dark:bg-black/40 dark:border-white/10 max-w-[95vw] h-[52px] min-w-0 sm:min-w-[320px]"
        >
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeIndex === index;
            return (
              <button
                key={item.id}
                ref={(el) => (btnRefs.current[index] = el)}
                onClick={() => scrollToSection(item.id, index)}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                type="button"
                className={cn(
                  "hoverable relative flex items-center justify-center gap-2 px-2.5 py-2 rounded-full transition-colors duration-200 h-10 min-w-[40px] min-h-[40px] max-h-[44px] flex-1",
                  isActive ? "bg-black/10 text-black dark:bg-white/15 dark:text-white" : "bg-transparent text-gray-800 hover:text-black dark:text-gray-300 dark:hover:text-gray-200",
                  "focus:outline-none focus-visible:ring-0"
                )}
              >
                <Icon size={20} strokeWidth={2} aria-hidden className="transition-colors duration-200 shrink-0" />
                <span className="hidden sm:flex items-center whitespace-nowrap text-xs font-medium select-none">
                  {item.label}
                </span>
              </button>
            );
          })}

          <div className="mx-1 h-7 w-px bg-black/20 dark:bg-white/20" aria-hidden />

          <div className="flex items-center justify-center h-10 min-w-[40px] min-h-[40px] px-1">
            <ThemeToggle inline />
          </div>

          <motion.div
            animate={indicatorStyle}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute top-1 bottom-1 rounded-full bg-black/10 dark:bg-white/15 pointer-events-none"
          />
        </div>
      </motion.nav>
    </div>
  );
}

export default Navigation;
