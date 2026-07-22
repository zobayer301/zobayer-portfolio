import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

const skillCategories = [
  {
    category: 'Programming Languages',
    skills: ['Python', 'HTML & CSS'],
  },
  {
    category: 'Data Science & Analytics',
    skills: [
      'Pandas',
      'NumPy',
      'Data Cleaning',
      'Exploratory Data Analysis',
      'Feature Engineering',
      'Matplotlib',
      'Seaborn',
      'Machine Learning',
      'Scikit-learn',
      'Deep Learning',
      'TensorFlow',
      'NLP',
      'Generative AI',
      'LLMs',
    ],
  },
  {
    category: 'Development & Deployment',
    skills: ['Flask', 'Streamlit', 'Docker', 'Git', 'GitHub', 'Jupyter Notebook'],
  },
  {
    category: 'Database',
    skills: ['MySQL'],
  },
]

export function Skills() {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const viewportMargin = isMobile ? '-20px' : '-100px'

  let globalIndex = 0

  return (
    <section id="skills" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: viewportMargin }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="group mb-16"
        >
          <span className="hover-bob text-sm text-foreground/80 tracking-widest uppercase">Expertise</span>
          <div className="w-6 h-px bg-foreground/40 mt-2" />
        </motion.div>

        <motion.h2
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: viewportMargin }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="hover-bob font-display text-[10vw] lg:text-section leading-none tracking-tight mb-12 lg:mb-20"
        >
          SKILLS
        </motion.h2>

        <div className={cn(
          'grid gap-4 lg:gap-5',
          isMobile ? 'grid-cols-1' : 'grid-cols-12'
        )}>
          {skillCategories.map((cat, catIdx) => {
            const colSpans = [5, 8, 7, 4]
            const span = colSpans[catIdx]
            const isLarge = catIdx === 1

            return (
              <motion.div
                key={cat.category}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: viewportMargin }}
                transition={{
                  duration: 0.7,
                  delay: isMobile ? catIdx * 0.1 : catIdx * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={cn(
                  'group relative rounded-3xl overflow-hidden transition-all duration-500',
                  'border border-foreground/10',
                  'bg-gradient-to-br from-foreground/[0.04] to-foreground/[0.01]',
                  'backdrop-blur-md shadow-2xl',
                  'hover:bg-black/5 hover:shadow-[0_0_40px_-5px_rgba(0,0,0,0.25)] hover:border-foreground/30 hover:scale-[1.01]',
                  'dark:hover:bg-white/5 dark:hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.25)]',
                  isMobile ? '' : ''
                )}
                style={!isMobile ? { gridColumn: `span ${span}` } : undefined}
              >
                <div className={cn(
                  'relative p-7 sm:p-10',
                  isLarge ? 'lg:p-10' : ''
                )}>
                  <div className="flex items-baseline gap-3 mb-5 lg:mb-7">
                    <span className="text-xs font-medium tracking-widest uppercase text-foreground/50">
                      {String(catIdx + 1).padStart(2, '0')}
                    </span>
                    <h3 className={cn(
                      'font-medium tracking-wide uppercase text-foreground/80',
                      isLarge ? 'text-base lg:text-lg' : 'text-sm lg:text-base'
                    )}>
                      {cat.category}
                    </h3>
                    <div className="flex-1 h-px bg-foreground/10 ml-2" />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {cat.skills.map((skill) => {
                      const idx = globalIndex++
                      return (
                        <motion.div
                          key={skill}
                          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, margin: viewportMargin }}
                          transition={{
                            duration: 0.4,
                            delay: isMobile ? 0 : idx * 0.03,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                          whileHover={
                            prefersReducedMotion
                              ? {}
                              : {
                                  scale: 1.05,
                                  y: -2,
                                  transition: { duration: 0.15 },
                                }
                          }
                          whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                          className="cursor-default"
                        >
                          <div className={cn(
                            'flex items-center h-14 px-6 rounded-2xl border transition-all duration-300',
                            'border-foreground/15 bg-background/70',
                            'hover:bg-black/5 hover:border-foreground/30 hover:shadow-lg',
                            'dark:hover:bg-white/5 dark:hover:border-foreground/30',
                          )}>
                            <span className="text-sm lg:text-base font-light tracking-wide whitespace-nowrap text-gray-900 dark:text-white">
                              {skill}
                            </span>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>

                  {isLarge && (
                    <div className="mt-6 pt-5 border-t border-foreground/10">
                      <p className="text-xs text-foreground/30 tracking-wider uppercase">
                        {cat.skills.length} skills
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
