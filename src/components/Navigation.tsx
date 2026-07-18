"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Code, Briefcase, GraduationCap, Github, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Code },
  { id: "work", label: "Projects", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "github", label: "GitHub", icon: Github },
  { id: "contact", label: "Contact", icon: Mail },
];

const sections = navItems.map((item) => item.id);

export function Navigation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.findIndex((id) => id === entry.target.id);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { threshold: 0, rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
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

  return (
    <div className="fixed top-4 left-0 right-0 z-[9500] flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 26, delay: 0.5 }}
        aria-label="Navigation"
        className="pointer-events-auto w-fit max-w-[95vw]"
      >
        <div
          ref={containerRef}
          className="relative flex items-center bg-[#A9A9A9] border border-black rounded-full px-1.5 py-2 shadow-2xl dark:bg-neutral-900 dark:border-gray-800 max-w-[95vw] h-[52px] min-w-0 sm:min-w-[320px]"
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
                  "relative flex items-center justify-center gap-2 px-2.5 py-2 rounded-full transition-colors duration-200 h-10 min-w-[40px] min-h-[40px] max-h-[44px] flex-1",
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


