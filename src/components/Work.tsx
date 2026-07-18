import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/use-mobile'

const experiences = [
  {
    title: 'Forest Fire \u2014 Data Cleaning & Feature Engineering',
    company: 'Algerian Forest Fires Dataset',
    period: 'Project',
    description: 'End-to-end data preprocessing project: data cleaning, feature engineering, exploratory data analysis, and dataset preparation for downstream modeling, built in Python and Jupyter.',
    skills: ['Python', 'Pandas', 'NumPy', 'EDA', 'Feature Engineering'],
    link: 'https://github.com/zobayer301/forest-fire-data-cleaning-feature-engineering',
  },
  {
    title: 'Economic Index Prediction',
    company: 'Multiple Linear Regression',
    period: 'Project',
    description: 'Predicting stock index prices using Multiple Linear Regression based on interest rates and unemployment rates, with model evaluation and visualization.',
    skills: ['Scikit-learn', 'Regression', 'Statsmodels', 'Matplotlib'],
    link: 'https://github.com/zobayer301/Multiple-Linear-Regression-Economic-Index-Prediction',
  },
  {
    title: 'Polynomial Regression Comparison',
    company: 'Scikit-learn Study',
    period: 'Project',
    description: 'Implementation and comparison of Simple Linear Regression vs. Polynomial Regression on a synthetic quadratic dataset, with visualization and R\u00b2 score evaluation.',
    skills: ['Scikit-learn', 'Polynomial Regression', 'Model Evaluation'],
    link: 'https://github.com/zobayer301/Polynomial-Regression-Comparison',
  },
  {
    title: 'Linear Regression From Scratch',
    company: 'NumPy Implementation',
    period: 'Project',
    description: 'Simple Linear Regression implemented from first principles in Python using NumPy and Matplotlib for predictive analysis and visualization.',
    skills: ['NumPy', 'Matplotlib', 'ML Fundamentals'],
    link: 'https://github.com/zobayer301/linear-regression-from-scratch',
  },
]

export function Work() {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const viewportMargin = isMobile ? '-20px' : '-100px'

  return (
    <section id="work" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: viewportMargin }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-16"
        >
          <span className="text-sm text-foreground/80 tracking-widest uppercase">Projects</span>
          <div className="w-6 h-px bg-foreground/40 mt-2" />
        </motion.div>

        <motion.h2
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: viewportMargin }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          FEATURED<br />PROJECTS
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {experiences.map((exp, index) => (
            <motion.a
              key={exp.company + exp.period}
              href={exp.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: viewportMargin }}
              transition={{
                duration: 0.6,
                delay: isMobile ? 0 : index * 0.1,
                ease: 'easeOut',
              }}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : { y: -4, transition: { duration: 0.25 } }
              }
              className="group relative block rounded-xl overflow-hidden min-h-[44px]"
            >
              <div className="absolute inset-0 bg-black border border-black rounded-xl group-hover:border-neutral-700 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.12)] dark:bg-transparent dark:border-foreground/10 dark:group-hover:border-foreground/30 dark:group-hover:shadow-[0_0_20px_rgba(255,255,255,0.06)] transition-all duration-500" />

              <div className="relative p-6 lg:p-8 flex flex-col h-full">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-light text-white group-hover:text-white transition-colors duration-300 leading-tight">
                      {exp.title}
                    </h3>
                    <p className="text-sm lg:text-base text-neutral-300 dark:text-gray-700 mt-1">
                      {exp.company}
                    </p>
                  </div>
                  <span className="shrink-0 px-3 py-1 text-[10px] lg:text-xs text-white border border-white/30 rounded-full tracking-widest uppercase bg-white/10">
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm lg:text-base text-neutral-300 dark:text-gray-600 leading-relaxed mb-6 flex-1 group-hover:text-neutral-200 dark:group-hover:text-gray-700 transition-colors duration-300">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs text-white border border-white/30 rounded-full bg-white/10 group-hover:border-white/50 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="absolute top-6 right-6 lg:top-8 lg:right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}