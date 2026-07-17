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
      { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-[8000] flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 26, delay: 0.5 }}
        aria-label="Navigation"
        className="pointer-events-auto w-fit max-w-[95vw]"
      >
        <div
          ref={containerRef}
          className="relative flex items-center bg-black border border-black rounded-full px-1.5 py-2 shadow-2xl dark:bg-neutral-900 dark:border-gray-800 max-w-[95vw] h-[52px] min-w-0 sm:min-w-[320px]"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            type="button"
            className="relative shrink-0 flex items-center justify-center rounded-full border border-white/40 bg-black p-0.5 ml-1 mr-1 h-10 w-10 sm:h-11 sm:w-11 hover:border-white transition-colors duration-200 focus:outline-none focus-visible:ring-0"
          >
            <img
              src="/logo.svg"
              alt="Md. Zobayer Chowdhury"
              className="h-full w-full object-contain rounded-full"
            />
          </button>

          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeIndex === index;
            return (
              <button
                key={item.id}
                ref={(el) => (btnRefs.current[index] = el)}
                onClick={() => scrollToSection(item.id)}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                type="button"
                className={cn(
                  "relative flex items-center justify-center gap-2 px-2.5 py-2 rounded-full transition-colors duration-200 h-10 min-w-[40px] min-h-[40px] max-h-[44px] flex-1",
                  isActive
                    ? "bg-white/10 text-white"
                    : "bg-transparent text-gray-500 hover:text-gray-300 dark:text-gray-400 dark:hover:text-gray-200",
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
            className="absolute top-1 bottom-1 rounded-full bg-white/10 pointer-events-none"
          />
        </div>
      </motion.nav>
    </div>
  );
}

export default Navigation;
