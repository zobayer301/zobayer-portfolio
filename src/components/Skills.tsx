import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

const skills = [
  { name: 'Python, OOPs' },
  { name: 'Pandas, NumPy, Matplotlib & Seaborn' },
  { name: 'Scikit-learn' },
  { name: 'Deep Learning' },
  { name: 'NLP, GenAI' },
  { name: 'LLMs' },
  { name: 'Data Cleaning & EDA' },
  { name: 'Feature Engineering' },
  { name: 'TensorFlow' },
  { name: 'Flask & Streamlit' },
  { name: 'MySQL' },
  { name: 'HTML & CSS' },
  { name: 'Git & GitHub' },
  { name: 'Docker & Jupyter' },
]

export function Skills() {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const viewportMargin = isMobile ? '-20px' : '-100px'

  return (
    <section id="skills" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: viewportMargin }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-16"
        >
          <span className="text-sm text-foreground/60 tracking-widest uppercase">Expertise</span>
          <div className="w-6 h-px bg-foreground/40 mt-2" />
        </motion.div>

        <motion.h2
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: viewportMargin }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-12 lg:mb-20"
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
                'relative px-5 py-2.5 lg:px-6 lg:py-3 rounded-full border border-foreground/15 backdrop-blur-sm transition-all duration-300 min-h-[44px] flex items-center',
                'bg-black text-white border-black hover:bg-neutral-800 hover:border-neutral-800',
                'dark:bg-transparent dark:text-foreground/80 dark:border-foreground/15 dark:hover:border-foreground/40 dark:hover:bg-transparent dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.08)]'
              )}>
                <span className="text-sm lg:text-base font-light tracking-wide transition-colors duration-300 whitespace-nowrap">
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