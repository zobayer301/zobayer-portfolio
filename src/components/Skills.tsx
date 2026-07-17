import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

const skills = [
  { name: 'Python, OOPs', color: 'from-cyan-500/10 to-blue-500/10', border: 'border-cyan-500/20', hoverBorder: 'hover:border-cyan-400/40', hoverShadow: 'hover:shadow-[0_0_15px_rgba(34,211,238,0.12)]', text: 'text-cyan-300' },
  { name: 'Pandas, NumPy, Matplotlib & Seaborn', color: 'from-blue-500/10 to-indigo-500/10', border: 'border-blue-500/20', hoverBorder: 'hover:border-blue-400/40', hoverShadow: 'hover:shadow-[0_0_15px_rgba(96,165,250,0.12)]', text: 'text-blue-300' },
  { name: 'Scikit-learn', color: 'from-indigo-500/10 to-violet-500/10', border: 'border-indigo-500/20', hoverBorder: 'hover:border-indigo-400/40', hoverShadow: 'hover:shadow-[0_0_15px_rgba(129,140,248,0.12)]', text: 'text-indigo-300' },
  { name: 'Deep Learning', color: 'from-violet-500/10 to-purple-500/10', border: 'border-violet-500/20', hoverBorder: 'hover:border-violet-400/40', hoverShadow: 'hover:shadow-[0_0_15px_rgba(139,92,246,0.12)]', text: 'text-violet-300' },
  { name: 'NLP, GenAI', color: 'from-purple-500/10 to-fuchsia-500/10', border: 'border-purple-500/20', hoverBorder: 'hover:border-purple-400/40', hoverShadow: 'hover:shadow-[0_0_15px_rgba(168,85,247,0.12)]', text: 'text-purple-300' },
  { name: 'LLMs', color: 'from-sky-500/10 to-cyan-500/10', border: 'border-sky-500/20', hoverBorder: 'hover:border-sky-400/40', hoverShadow: 'hover:shadow-[0_0_15px_rgba(56,189,248,0.12)]', text: 'text-sky-300' },
  { name: 'Data Cleaning & EDA', color: 'from-teal-500/10 to-cyan-500/10', border: 'border-teal-500/20', hoverBorder: 'hover:border-teal-400/40', hoverShadow: 'hover:shadow-[0_0_15px_rgba(20,184,166,0.12)]', text: 'text-teal-300' },
  { name: 'Feature Engineering', color: 'from-cyan-500/10 to-sky-500/10', border: 'border-cyan-500/20', hoverBorder: 'hover:border-cyan-400/40', hoverShadow: 'hover:shadow-[0_0_15px_rgba(34,211,238,0.12)]', text: 'text-cyan-300' },
  { name: 'TensorFlow', color: 'from-blue-600/10 to-indigo-500/10', border: 'border-blue-600/20', hoverBorder: 'hover:border-blue-500/40', hoverShadow: 'hover:shadow-[0_0_15px_rgba(59,130,246,0.12)]', text: 'text-blue-300' },
  { name: 'Flask & Streamlit', color: 'from-indigo-500/10 to-blue-500/10', border: 'border-indigo-500/20', hoverBorder: 'hover:border-indigo-400/40', hoverShadow: 'hover:shadow-[0_0_15px_rgba(129,140,248,0.12)]', text: 'text-indigo-300' },
  { name: 'MySQL', color: 'from-sky-500/10 to-blue-500/10', border: 'border-sky-500/20', hoverBorder: 'hover:border-sky-400/40', hoverShadow: 'hover:shadow-[0_0_15px_rgba(56,189,248,0.12)]', text: 'text-sky-300' },
  { name: 'HTML & CSS', color: 'from-violet-500/10 to-blue-500/10', border: 'border-violet-500/20', hoverBorder: 'hover:border-violet-400/40', hoverShadow: 'hover:shadow-[0_0_15px_rgba(139,92,246,0.12)]', text: 'text-violet-300' },
  { name: 'Git & GitHub', color: 'from-cyan-500/10 to-teal-500/10', border: 'border-cyan-500/20', hoverBorder: 'hover:border-cyan-400/40', hoverShadow: 'hover:shadow-[0_0_15px_rgba(34,211,238,0.12)]', text: 'text-cyan-300' },
  { name: 'Docker & Jupyter', color: 'from-blue-500/10 to-cyan-500/10', border: 'border-blue-500/20', hoverBorder: 'hover:border-blue-400/40', hoverShadow: 'hover:shadow-[0_0_15px_rgba(96,165,250,0.12)]', text: 'text-blue-300' },
]

export function Skills() {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const viewportMargin = isMobile ? '-20px' : '-100px'

  return (
    <section id="skills" className="section-padding bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: viewportMargin }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-16"
        >
          <span className="text-sm text-cyan-400 tracking-widest uppercase">Expertise</span>
          <div className="w-6 h-px bg-gradient-to-r from-cyan-500 to-blue-500 mt-2" />
        </motion.div>

        <motion.h2
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: viewportMargin }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-12 lg:mb-20 text-gradient-cool"
        >
          SKILLS
        </motion.h2>

        <div className="flex flex-wrap gap-3 lg:gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: viewportMargin }}
              transition={{
                duration: 0.5,
                delay: isMobile ? 0 : index * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: 1.05,
                      y: -2,
                      transition: { duration: 0.2 },
                    }
              }
              whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
              className="group relative cursor-default"
            >
              <div className={cn(
                'relative px-5 py-2.5 lg:px-6 lg:py-3 rounded-full border backdrop-blur-sm transition-all duration-300 min-h-[44px] flex items-center',
                'bg-gradient-to-br', skill.color, skill.border, skill.hoverBorder, skill.hoverShadow
              )}>
                <span className={cn('text-sm lg:text-base font-light tracking-wide transition-colors duration-300 whitespace-nowrap', skill.text)}>
                  {skill.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}