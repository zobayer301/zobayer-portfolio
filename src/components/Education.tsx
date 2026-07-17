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
    <section id="education" className="pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-32 lg:pb-48 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Background</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          EDUCATION
        </motion.h2>

        {/* Education Items */}
        <div className="space-y-16 lg:space-y-24">
          {/* BSc CSE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
            <motion.div {...fadeInUp}>
              <img
                src="campus.jpg"
                alt="University campus"
                className="w-full h-auto grayscale"
              />
              <p className="mt-4 text-xs text-gray-500 uppercase">
                GREEN UNIVERSITY OF BANGLADESH
              </p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="flex items-center"
            >
              <div>
                <h3 className="text-xl lg:text-2xl font-light text-white mb-4">
                  B.Sc. in Computer Science & Engineering
                </h3>
                <p className="text-gray-400 leading-relaxed mb-4 text-sm lg:text-base">
                  Bachelor of Science in Computer Science and Engineering
                  with a focus on Artificial Intelligence, Machine Learning,
                  and Data Mining &mdash; including a research thesis on AI-driven
                  early detection of heart disease using machine learning and deep learning.
                </p>
                <p className="text-sm text-gray-500">Graduated (2026)</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}