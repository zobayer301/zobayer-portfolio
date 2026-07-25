"use client"

import React, { useState, useEffect } from "react"
import { User, Code, Briefcase, GraduationCap, Mail, HelpCircle, Menu, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { MenuContainer, MenuItem } from "@/components/NavigationMenu"
import { useIsMobile } from "@/hooks/use-mobile"

const navItems = [
  { id: "about", label: "About", icon: <User size={18} /> },
  { id: "education", label: "Education", icon: <GraduationCap size={18} /> },
  { id: "skills", label: "Skills", icon: <Code size={18} /> },
  { id: "work", label: "Projects", icon: <Briefcase size={18} /> },
  { id: "faq", label: "FAQ", icon: <HelpCircle size={18} /> },
  { id: "contact", label: "Contact", icon: <Mail size={18} /> },
]

export function Navigation() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (isMobile && theme === "dark") {
      setTheme("light")
    }
  }, [isMobile])

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

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    if (document.startViewTransition) {
      document.startViewTransition(() => setTheme(newTheme))
    } else {
      setTheme(newTheme)
    }
  }

  return (
    <div className="fixed right-4 sm:left-4 top-4 z-[9500]">
      <MenuContainer>
        <MenuItem icon={<Menu size={20} />} />
        {navItems.map((item) => (
          <MenuItem
            key={item.id}
            icon={item.icon}
            onClick={() => scrollToSection(item.id)}
          />
        ))}
        <MenuItem
          icon={
            mounted && theme === "dark"
              ? <Moon size={18} />
              : <Sun size={18} />
          }
          onClick={toggleTheme}
        />
      </MenuContainer>
    </div>
  )
}

export default Navigation
