import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/use-mobile'
import thesisAsset from '@/assets/thesis.jpg.asset.json'

export function About() {
  const prefersReduced = useReducedMotion()
  const isMobile = useIsMobile()

  const fadeInUp = {
    initial: prefersReduced ? false : { opacity: 0, y: 40 },
    whileInView: prefersReduced ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, margin: isMobile ? '-20px' : '-100px' },
    transition: { duration: prefersReduced ? 0 : 0.8, ease: 'easeOut' }
  }
  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">About Zobayer</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        {/* First Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-24 lg:mb-32">
          <motion.div
            {...fadeInUp}
            className="order-2 lg:order-1"
          >
            <img
              src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Data science workspace"
              className="w-full h-auto grayscale"
            />
            <p className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
              
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="order-1 lg:order-2 flex items-center"
          >
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed text-justify">
              Computer Science and Engineering graduate from Green University of Bangladesh with practical experience in artificial intelligence, machine learning, and immersive technologies. Worked as an AR/VR/XR (Intern) at Battery Low Interactive Ltd. and contributed as an Assistant Graphics Designer at the Green University Computer Club.
            </p>
          </motion.div>
        </div>

        {/* Quote Block */}
        <motion.div
          {...fadeInUp}
          className="mb-24 lg:mb-32"
        >
          <h2 className="font-display text-[8vw] lg:text-section leading-none tracking-tight text-gray-300">
            "SOLVING REAL-WORLD<br />
            PROBLEMS WITH <span className="text-white underline underline-offset-8">AI</span><br />
            AND CONTINUOUSLY<br />
            LEARNING NEW THINGS."
          </h2>
          <p className="mt-6 text-sm text-gray-500 tracking-widest uppercase">
            DATA SCIENCE &<br />
            MACHINE LEARNING
          </p>
        </motion.div>

        {/* Second Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-24 lg:mb-32">
          <motion.div
            {...fadeInUp}
            className="flex items-center lg:text-right"
          >
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed text-justify">
              His undergraduate thesis - "AI-Driven Early Detection of Heart
              Disease Using Machine Learning and Deep Learning - combined
              medical data with modern ML techniques to explore how algorithms
              can support earlier, better clinical decisions.
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            <img
              src={thesisAsset.url}
              alt="Undergraduate thesis: AI-Driven Early Detection of Heart Disease"
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
            />
            <p className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
              THESIS RESEARCH - HEART DISEASE DETECTION
            </p>
          </motion.div>
        </div>

        {/* Third Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
          <motion.div {...fadeInUp}>
            <img
              src="https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Working on ML projects"
              className="w-full h-auto grayscale"
            />
            <p className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
              BUILDING ML PROJECTS - DHAKA / BD<br />
              (ONGOING)
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="flex items-center"
          >
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed text-justify">
              Today Zobayer works on end-to-end ML projects - from data
              cleaning and feature engineering to regression, deep learning,
              and deployment - with a stack built around Python, scikit-learn,
              TensorFlow, and PyTorch. He is always looking for the next
              problem worth solving.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
