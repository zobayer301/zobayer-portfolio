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
          className="hover-bob font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          SKILLS
        </motion.h2>

        <div className="flex flex-col">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.category}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: viewportMargin }}
              transition={{
                duration: 0.7,
                delay: catIdx * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="group"
            >
              <div className={cn(
                'flex items-start gap-6 lg:gap-10 py-8 lg:py-12',
                catIdx < skillCategories.length - 1 && 'border-b border-foreground/10'
              )}>
                <div className="shrink-0 relative">
                  <span className="font-display text-[80px] lg:text-[120px] leading-none text-foreground/[0.06] select-none">
                    {String(catIdx + 1).padStart(2, '0')}
                  </span>
                  <span className="absolute bottom-2 lg:bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium tracking-widest text-foreground/40">
                    {String(catIdx + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="flex-1 pt-2 lg:pt-4">
                  <h3 className="text-lg lg:text-xl font-medium tracking-wide text-foreground/80 mb-5 lg:mb-7">
                    {cat.category}
                  </h3>

                  <div className="flex flex-wrap gap-2.5 lg:gap-3">
                    {cat.skills.map((skill, skillIdx) => (
                      <motion.div
                        key={skill}
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: viewportMargin }}
                        transition={{
                          duration: 0.4,
                          delay: isMobile ? 0 : skillIdx * 0.03,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        whileHover={
                          prefersReducedMotion
                            ? {}
                            : { scale: 1.05, y: -2, transition: { duration: 0.15 } }
                        }
                        whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                        className="cursor-default"
                      >
                        <div className={cn(
                          'flex items-center h-12 px-5 rounded-2xl border transition-all duration-300',
                          'border-foreground/15 bg-background/70',
                          'hover:bg-black/5 hover:border-foreground/30 hover:shadow-lg',
                          'dark:hover:bg-white/5 dark:hover:border-foreground/30',
                        )}>
                          <span className="text-sm font-light tracking-wide whitespace-nowrap text-gray-900 dark:text-white">
                            {skill}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
