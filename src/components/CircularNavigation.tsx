import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Code, Briefcase, GraduationCap, Github, Mail, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'About', icon: User, id: 'about' },
  { name: 'Skills', icon: Code, id: 'skills' },
  { name: 'Projects', icon: Briefcase, id: 'work' },
  { name: 'Education', icon: GraduationCap, id: 'education' },
  { name: 'GitHub', icon: Github, id: 'github' },
  { name: 'Contact', icon: Mail, id: 'contact' },
]

export function CircularNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const toggleMenu = () => setIsOpen((prev) => !prev)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-6 right-6 z-[9000] w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white min-h-[44px] min-w-[44px]"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9000] flex items-center justify-center"
            onClick={toggleMenu}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="relative w-[340px] h-[340px] max-w-[85vw] max-h-[85vw] rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.06), inset -1px -1px 2px rgba(255,255,255,0.03)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Center close button */}
              <button
                onClick={toggleMenu}
                className="absolute w-12 h-12 rounded-full bg-white text-black flex items-center justify-center z-10 min-h-[44px] min-w-[44px]"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Circular nav items */}
              {navItems.map((item, index) => {
                const Icon = item.icon
                const angle = (360 / navItems.length) * index - 90
                const radius = 130

                return (
                  <div
                    key={item.name}
                    className="absolute"
                    style={{
                      transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
                    }}
                  >
                    <button
                      className={cn(
                        'flex flex-col items-center justify-center w-16 h-16 rounded-full transition-colors duration-200 min-h-[44px] min-w-[44px]',
                        hoveredItem === item.name
                          ? 'bg-white text-black'
                          : 'text-white'
                      )}
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => scrollToSection(item.id)}
                    >
                      <Icon className="w-5 h-5 mb-0.5" />
                      <span className="text-[10px] font-medium">{item.name}</span>
                    </button>
                  </div>
                )
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default CircularNavigation