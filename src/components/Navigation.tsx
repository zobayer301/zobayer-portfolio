import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollVisibility } from '@/hooks/useScrollVisibility'
import { cn } from '@/lib/utils'
import { CircularNavigation } from '@/components/CircularNavigation'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
]

export function Navigation() {
  const activeSection = useActiveSection()
  const isVisible = useScrollVisibility()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Mobile Circular Navigation */}
      <CircularNavigation />

      {/* Desktop Navigation Items - Fixed Bottom Right (hidden on mobile) */}
      <nav
        className={cn(
          'hidden fixed bottom-0 right-0 z-50 p-6 md:p-10 transition-all duration-500',
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
        )}
      >
        <div className="flex flex-col items-end gap-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                'text-sm text-white mix-blend-difference transition-all duration-300 relative py-1 min-h-[44px] flex items-center',
                'hover:opacity-60',
                activeSection === item.id && 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-white'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}