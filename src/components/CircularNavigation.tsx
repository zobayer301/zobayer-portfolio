import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Code, Briefcase, GraduationCap, Github, Mail, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'About', icon: User, id: 'about', color: 'text-cyan-400' },
  { name: 'Skills', icon: Code, id: 'skills', color: 'text-blue-400' },
  { name: 'Projects', icon: Briefcase, id: 'work', color: 'text-indigo-400' },
  { name: 'Education', icon: GraduationCap, id: 'education', color: 'text-violet-400' },
  { name: 'GitHub', icon: Github, id: 'github', color: 'text-sky-400' },
  { name: 'Contact', icon: Mail, id: 'contact', color: 'text-teal-400' },
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
        className="fixed top-6 right-6 z-[9000] w-12 h-12 rounded-full bg-cyan-500/10 backdrop-blur-md border border-cyan-500/20 flex items-center justify-center text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400/40 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all duration-300 min-h-[44px] min-w-[44px]"
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
              className="relative w-[340px] h-[340px] max-w-[85vw] max-h-[85vw] rounded-full flex items-center justify-center border border-cyan-500/10"
              style={{
                background: 'radial-gradient(circle, rgba(34,211,238,0.04) 0%, rgba(96,165,250,0.02) 50%, transparent 70%)',
                boxShadow: 'inset 2px 2px 4px rgba(34,211,238,0.06), inset -1px -1px 2px rgba(96,165,250,0.03)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={toggleMenu}
                className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-black flex items-center justify-center z-10 min-h-[44px] min-w-[44px] shadow-[0_0_20px_rgba(34,211,238,0.3)]"
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
                          ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                          : 'border border-transparent'
                      )}
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => scrollToSection(item.id)}
                    >
                      <Icon className={cn('w-5 h-5 mb-0.5', hoveredItem === item.name ? item.color : 'text-gray-400')} />
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