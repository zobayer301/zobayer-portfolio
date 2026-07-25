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
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
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
      setAtHero(y < window.innerHeight * 0.5)

      if (y < 10) {
        setHidden(false)
      } else if (y > lastY + 4) {
        setHidden(true)
      } else if (y < lastY - 4) {
        setHidden(false)
      }
      lastY = y
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (e.clientY <= 80) setHidden(false)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  const iconColor = atHero ? "text-white/80 hover:text-white" : "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"

  return (
    <div
      className="fixed left-4 top-1/2 -translate-y-1/2 z-[9500] transition-all duration-300"
      style={{
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      <div className="flex flex-col items-center gap-5 py-4">
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
        <div className="mt-2">
          <ThemeToggle inline />
        </div>
      </div>
    </div>
  )
}

export default Navigation
