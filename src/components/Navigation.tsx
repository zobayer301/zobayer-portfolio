"use client"

import React, { useState, useEffect } from "react"
import { User, Code, Briefcase, GraduationCap, Mail, HelpCircle, Menu as MenuIcon } from "lucide-react"
import { MenuContainer, MenuItem } from "@/components/NavigationMenu"
import { ThemeToggle } from "@/components/ThemeToggle"

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

  return (
    <>
      <div className="fixed top-3 left-3 z-[9500]">
        <MenuContainer>
          <MenuItem icon={<MenuIcon size={18} />} />
          {navItems.map((item) => (
            <MenuItem
              key={item.id}
              icon={item.icon}
              onClick={() => scrollToSection(item.id)}
            />
          ))}
        </MenuContainer>
      </div>

      <div className="fixed top-3 right-3 z-[9500]">
        <ThemeToggle inline />
      </div>
    </>
  )
}

export default Navigation
