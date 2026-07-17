import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/use-mobile'

const skills = [
  'Python, OOPs',
  'Pandas, NumPy, Matplotlib & Seaborn',
  'Scikit-learn',
  'Deep Learning',
  'NLP, GenAI',
  'LLMs',
  'Data Cleaning & EDA',
  'Feature Engineering',
  'TensorFlow',
  'Flask & Streamlit',
  'MySQL',
  'HTML & CSS',
  'Git & GitHub',
  'Docker & Jupyter',
]

export function Skills() {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const viewportMargin = isMobile ? '-20px' : '-100px'

  return (
    <section id="skills" className="section-padding bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: viewportMargin }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-16"
        >
          <span className="text-sm text-gray-500 tracking-widest uppercase">Expertise</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
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

        {/* Skills Buttons */}
        <div className="flex flex-wrap gap-3 lg:gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
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
              <div className="relative px-5 py-2.5 lg:px-6 lg:py-3 rounded-full border border-gray-700/50 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm hover:border-gray-500/60 hover:from-white/[0.12] hover:to-white/[0.04] transition-all duration-300 min-h-[44px] flex items-center">
                <span className="text-sm lg:text-base text-gray-300 font-light tracking-wide group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                  {skill}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}