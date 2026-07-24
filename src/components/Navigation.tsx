"use client"

import React, { useState, useEffect } from "react"
import { User, Code, Briefcase, GraduationCap, Mail, HelpCircle, Menu as MenuIcon, X } from "lucide-react"
import { MenuContainer, MenuItem } from "@/components/NavigationMenu"
import { ThemeToggle } from "@/components/ThemeToggle"

const navItems = [
  { id: "about", label: "About", icon: <User size={20} /> },
  { id: "education", label: "Education", icon: <GraduationCap size={20} /> },
  { id: "skills", label: "Skills", icon: <Code size={20} /> },
  { id: "work", label: "Projects", icon: <Briefcase size={20} /> },
  { id: "faq", label: "FAQ", icon: <HelpCircle size={20} /> },
  { id: "contact", label: "Contact", icon: <Mail size={20} /> },
]

export function Navigation() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hidden, setHidden] = useState(false)

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

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (y < 10) {
        setHidden(false)
      } else if (y > lastY + 4) {
        setHidden(true)
      } else if (y < lastY - 4) {
        setHidden(false)
      }
      lastY = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
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

  return (
    <>
      {/* Left side: Navigation Menu */}
      <div 
        className="fixed top-4 left-4 z-[9500] transition-all duration-300"
        style={{ 
          transform: hidden ? 'translateY(-100px)' : 'translateY(0)',
          opacity: hidden ? 0 : 1
        }}
      >
        <MenuContainer>
          <MenuItem
            icon={<MenuIcon size={20} />}
          />
          {navItems.map((item) => (
            <MenuItem
              key={item.id}
              icon={item.icon}
              onClick={() => scrollToSection(item.id)}
            />
          ))}
        </MenuContainer>
      </div>

      {/* Right side: Theme Toggle */}
      <div 
        className="fixed top-4 right-4 z-[9500] transition-all duration-300"
        style={{ 
          transform: hidden ? 'translateY(-100px)' : 'translateY(0)',
          opacity: hidden ? 0 : 1
        }}
      >
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <ThemeToggle inline />
        </div>
      </div>
    </>
  )
}

export default Navigation
