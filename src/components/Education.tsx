import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/use-mobile'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function Education() {
  return (
    <section id="education" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-foreground/60 tracking-widest uppercase">Background</span>
          <div className="w-6 h-px bg-foreground/40 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          EDUCATION
        </motion.h2>

        <div className="space-y-16 lg:space-y-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
            <motion.div {...fadeInUp}>
              <div className="relative overflow-hidden rounded-2xl group">
                <div className="absolute inset-0 bg-foreground/5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src="campus.jpg"
                  alt="University campus"
                  className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <p className="mt-4 text-xs text-foreground/50 uppercase tracking-widest">
                GREEN UNIVERSITY OF BANGLADESH
              </p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="flex items-center"
            >
              <div>
                <h3 className="text-xl lg:text-2xl font-light text-gray-900 dark:text-white mb-4">
                  B.Sc. in Computer Science & Engineering
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 text-sm lg:text-base">
                  Bachelor of Science in Computer Science and Engineering
                  with a focus on Artificial Intelligence, Machine Learning,
                  and Data Mining &mdash; including a research thesis on AI-driven
                  early detection of heart disease using machine learning and deep learning.
                </p>
                <span className="inline-block px-3 py-1 text-xs text-white border border-white/30 rounded-full bg-white/10">
                  Graduated (2026)
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}