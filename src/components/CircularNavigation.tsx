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
      <button
        onClick={toggleMenu}
        className="fixed top-6 right-6 z-[9000] w-12 h-12 rounded-full bg-black text-white border border-black flex items-center justify-center hover:bg-neutral-800 hover:border-neutral-800 transition-all duration-300 min-h-[44px] min-w-[44px] dark:bg-foreground/10 dark:text-foreground/80 dark:border-foreground/20 dark:hover:bg-foreground/20 dark:hover:border-foreground/40 dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

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
              className="relative w-[340px] h-[340px] max-w-[85vw] max-h-[85vw] rounded-full flex items-center justify-center border border-foreground/10"
              style={{
                background: 'radial-gradient(circle, rgba(120,120,120,0.06) 0%, rgba(120,120,120,0.03) 50%, transparent 70%)',
                boxShadow: 'inset 2px 2px 4px rgba(120,120,120,0.08), inset -1px -1px 2px rgba(120,120,120,0.04)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={toggleMenu}
                className="absolute w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center z-10 min-h-[44px] min-w-[44px] shadow-[0_0_20px_rgba(0,0,0,0.3)]"
              >
                <X className="w-5 h-5" />
              </button>

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
                        'flex flex-col items-center justify-center w-16 h-16 rounded-full transition-all duration-200 min-h-[44px] min-w-[44px]',
                        hoveredItem === item.name
                          ? 'bg-foreground/10 border border-foreground/30 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                          : 'border border-transparent'
                      )}
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => scrollToSection(item.id)}
                    >
                      <Icon className={cn('w-5 h-5 mb-0.5', hoveredItem === item.name ? 'text-foreground' : 'text-gray-400')} />
                      <span className={cn('text-[10px] font-medium transition-colors duration-200', hoveredItem === item.name ? 'text-white' : 'text-gray-500')}>{item.name}</span>
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