"use client"

import React, { useState, useEffect } from "react"
import { User, Code, Briefcase, GraduationCap, Mail, HelpCircle } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "about", label: "About", icon: User },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Code },
  { id: "work", label: "Projects", icon: Briefcase },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "contact", label: "Contact", icon: Mail },
]

export function Navigation() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [atHero, setAtHero] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      const referenceLine = window.innerHeight * 0.35
      let current = 0
      let maxVisible = -1
      for (let i = 0; i < navItems.length; i++) {
        const el = document.getElementById(navItems[i].id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const visibleTop = Math.max(rect.top, 0)
        const visibleBottom = Math.min(rect.bottom, window.innerHeight)
        const visible = visibleBottom - visibleTop
        if (rect.top <= referenceLine && visible > maxVisible) {
          maxVisible = visible
          current = i
        }
      }
      setActiveIndex((prev) => (prev === current ? prev : current))
      setAtHero(window.scrollY < window.innerHeight * 0.5)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  const iconColor = atHero ? "text-white/80 hover:text-white" : "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"

  return (
    <>
      <div className="fixed left-4 top-4 z-[9500]">
        <div className="flex flex-col items-center gap-5">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = activeIndex === index
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                aria-label={item.label}
                type="button"
                className={cn(
                  "flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl transition-all duration-200",
                  iconColor,
                  isActive && "bg-white/15 dark:bg-white/10"
                )}
              >
                <Icon size={18} />
              </button>
            )
          })}
        </div>
      </div>
      <div className="fixed top-3 right-3 z-[9500]">
        <ThemeToggle />
      </div>
    </>
  )
}

export default Navigation
