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
          className="group mb-10 lg:mb-12"
        >
          <span className="hover-bob text-sm text-foreground/80 tracking-widest uppercase">Expertise</span>
          <div className="w-6 h-px bg-foreground/40 mt-2" />
        </motion.div>

        <motion.h2
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: viewportMargin }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="hover-bob font-display text-[10vw] lg:text-section leading-none tracking-tight mb-10 lg:mb-14"
        >
          SKILLS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
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
              whileHover={
                prefersReducedMotion
                  ? {}
                  : { y: -4, transition: { duration: 0.2 } }
              }
              className="group"
            >
              <div className={cn(
                'relative h-full p-5 lg:p-6 rounded-3xl border transition-all duration-500',
                'border-foreground/10 bg-gradient-to-br from-foreground/[0.04] to-foreground/[0.01]',
                'hover:border-foreground/25 hover:bg-black/5 hover:shadow-[0_0_40px_-5px_rgba(0,0,0,0.25)]',
                'dark:bg-white/[0.02] dark:hover:bg-white/5 dark:hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.25)]',
                'backdrop-blur-md',
              )}>
                <div className="mb-4">
                  <h3 className="text-base lg:text-lg font-medium font-poppins tracking-wide text-foreground/80">
                    {cat.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 lg:gap-2.5">
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
                        'flex items-center h-9 px-3.5 rounded-2xl border transition-all duration-300',
                        'border-foreground/15 bg-background/70',
                        'hover:bg-black/5 hover:border-foreground/30 hover:shadow-md',
                        'dark:hover:bg-white/5 dark:hover:border-foreground/30',
                      )}>
                        <span className="text-sm font-poppins font-light tracking-wide whitespace-nowrap text-gray-900 dark:text-white">
                          {skill}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
