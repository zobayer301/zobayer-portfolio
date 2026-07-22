import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

const skillCategories = [
  {
    category: 'Programming Languages',
    skills: ['Python', 'SQL', 'HTML & CSS'],
  },
  {
    category: 'Data Science & Analytics',
    skills: [
      'Pandas',
      'NumPy',
      'Data Cleaning',
      'Exploratory Data Analysis (EDA)',
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

        <div className="flex flex-col gap-10 lg:gap-14">
          {skillCategories.map((cat) => (
            <div key={cat.category}>
              <motion.h3
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: viewportMargin }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="text-sm font-medium text-foreground/60 tracking-widest uppercase mb-4"
              >
                {cat.category}
              </motion.h3>
              <div className="flex flex-wrap gap-3 lg:gap-4">
                {cat.skills.map((skill) => {
                  const idx = globalIndex++
                  return (
                    <motion.div
                      key={skill}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, margin: viewportMargin }}
                      transition={{
                        duration: 0.5,
                        delay: isMobile ? 0 : idx * 0.04,
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
                        'hoverable bg-black text-white border-black hover:bg-neutral-800 hover:border-neutral-800',
                        'dark:bg-transparent dark:text-foreground/80 dark:border-foreground/15 dark:hover:border-foreground/40 dark:hover:bg-transparent dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.08)]'
                      )}>
                        <span className="text-sm lg:text-base font-light tracking-wide transition-colors duration-300 whitespace-nowrap">
                          {skill}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
