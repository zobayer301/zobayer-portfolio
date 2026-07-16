import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Code, Briefcase, GraduationCap, Github, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'About', icon: User, id: 'about' },
  { label: 'Skills', icon: Code, id: 'skills' },
  { label: 'Projects', icon: Briefcase, id: 'work' },
  { label: 'Education', icon: GraduationCap, id: 'education' },
  { label: 'GitHub', icon: Github, id: 'github' },
  { label: 'Contact', icon: Mail, id: 'contact' },
]

const MOBILE_LABEL_WIDTH = 72

export function BottomNavBar() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = navItems.findIndex((item) => item.id === entry.target.id)
            if (idx !== -1) setActiveIndex(idx)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    )
    sections.forEach((section) => { if (section) observer.observe(section) })
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26, delay: 0.5 }}
      role="navigation"
      aria-label="Bottom Navigation"
      className="fixed inset-x-0 bottom-4 mx-auto z-50 w-fit md:hidden"
    >
      <div className="bg-black/80 backdrop-blur-xl border border-gray-700/50 rounded-full flex items-center p-1.5 shadow-2xl min-w-[320px] max-w-[95vw] h-[52px]">
        {navItems.map((item, idx) => {
          const Icon = item.icon
          const isActive = activeIndex === idx

          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.92 }}
              className={cn(
                'flex items-center gap-0 px-2.5 py-2 rounded-full transition-colors duration-200 relative h-10 min-w-[40px] min-h-[40px] max-h-[44px]',
                isActive
                  ? 'bg-white/10 text-white gap-2'
                  : 'bg-transparent text-gray-500 hover:text-gray-300',
                'focus:outline-none focus-visible:ring-0'
              )}
              onClick={() => scrollToSection(item.id)}
              aria-label={item.label}
              type="button"
            >
              <Icon size={20} strokeWidth={2} aria-hidden className="transition-colors duration-200 shrink-0" />

              <motion.div
                initial={false}
                animate={{
                  width: isActive ? `${MOBILE_LABEL_WIDTH}px` : '0px',
                  opacity: isActive ? 1 : 0,
                  marginLeft: isActive ? '6px' : '0px',
                }}
                transition={{
                  width: { type: 'spring', stiffness: 350, damping: 32 },
                  opacity: { duration: 0.19 },
                  marginLeft: { duration: 0.19 },
                }}
                className="overflow-hidden flex items-center max-w-[72px]"
              >
                <span
                  className={cn(
                    'font-medium text-xs whitespace-nowrap select-none leading-[1.9]',
                    isActive ? 'text-white' : 'opacity-0'
                  )}
                  title={item.label}
                >
                  {item.label}
                </span>
              </motion.div>
            </motion.button>
          )
        })}
      </div>
    </motion.nav>
  )
}

export default BottomNavBar