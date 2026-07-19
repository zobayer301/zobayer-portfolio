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
          <span className="text-sm text-foreground/80 tracking-widest uppercase">Background</span>
          <div className="w-6 h-px bg-foreground/40 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          EDUCATION
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
          <motion.div {...fadeInUp} className="lg:col-span-2 relative group">
            <div className="relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-foreground/5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="campus.jpg"
                alt="University campus"
                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-foreground/20 rounded-2xl -z-10" />
            <p className="mt-4 text-xs text-foreground/70 uppercase tracking-widest">
              GREEN UNIVERSITY OF BANGLADESH
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="lg:col-span-3 flex flex-col justify-center"
          >
            <h3 className="font-display normal-case text-xl lg:text-2xl text-gray-900 dark:text-white mb-4 leading-snug">
              B.Sc. in Computer Science & Engineering
            </h3>
            <p className="text-base text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
              Graduated with a Bachelor's degree in Computer Science and Engineering, specializing in
              Artificial Intelligence and Machine Learning. Built a solid understanding of data structures,
              algorithms, software engineering, databases, and data analytics while completing a research
              thesis on AI-based heart disease prediction.
            </p>
            <p className="text-sm text-gray-800 dark:text-gray-300">
              <span className="font-bold">Graduated: 2026</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}