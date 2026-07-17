import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/use-mobile'
import { TextScramble } from '@/components/TextScramble'
import { Award, BookOpen, Code, HeartPulse } from 'lucide-react'

export function About() {
  const prefersReduced = useReducedMotion()
  const isMobile = useIsMobile()

  const fadeInUp = {
    initial: prefersReduced ? false : { opacity: 0, y: 40 },
    whileInView: prefersReduced ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, margin: isMobile ? '-20px' : '-100px' },
    transition: { duration: prefersReduced ? 0 : 0.8, ease: 'easeOut' }
  }

  const milestones = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: 'University',
      desc: 'B.Sc in CSE @ Green University of Bangladesh',
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: 'Experience',
      desc: 'Unity Developer (Intern) @ Battery Low Interactive Ltd.',
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: 'Volunteer',
      desc: 'Assistant Graphics Designer @ Green University Computer Club',
    },
    {
      icon: <HeartPulse className="w-5 h-5" />,
      title: 'Thesis',
      desc: 'AI-Driven Early Detection of Heart Disease Using Machine Learning and Deep Learning',
    },
  ]

  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-foreground/60 tracking-widest uppercase">About Zobayer</span>
          <div className="w-6 h-px bg-foreground/40 mt-2" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 mb-24 lg:mb-32">
          <motion.div
            {...fadeInUp}
            className="lg:col-span-2 relative group"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-foreground/5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="computer.jpg"
                alt="Data science workspace"
                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-foreground/20 rounded-2xl -z-10" />
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="lg:col-span-3 flex flex-col justify-center"
          >
            <h3 className="font-display text-2xl lg:text-3xl text-gray-900 dark:text-gray-200 mb-6 leading-snug">
              Computer Science & Engineering graduate passionate about{' '}
              AI,{' '}
              Machine Learning, and{' '}
              Immersive Technologies.
            </h3>
            <p className="text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              Computer Science and Engineering graduate from Green University of Bangladesh with practical experience
in artificial intelligence, machine learning, and immersive technologies. Worked as an Unity Developer (Intern) at
Battery Low Interactive Ltd. and contributed as an Assistant Graphics Designer at the Green University Computer
Club.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.title}
                  {...fadeInUp}
                  transition={{ ...fadeInUp.transition, delay: 0.1 * (i + 1) }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-black bg-black hover:bg-neutral-800 hover:border-neutral-700 transition-all duration-300 min-h-[44px] dark:border-foreground/10 dark:bg-foreground/[0.02] dark:hover:bg-foreground/[0.04] dark:hover:border-foreground/20"
                >
                  <div className="text-white shrink-0">{m.icon}</div>
                  <div className="min-w-0">
                    <p className="text-xs text-neutral-400 uppercase tracking-wider">{m.title}</p>
                    <p className="text-sm text-neutral-200 dark:text-gray-300 break-words">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div {...fadeInUp} className="mb-24 lg:mb-32">
          <div className="relative py-12 px-8 lg:px-16 rounded-3xl border border-foreground/10 bg-foreground/[0.02]">
            <h2 className="font-display text-[6vw] lg:text-[4vw] xl:text-section leading-none tracking-tight text-gray-900 dark:text-white pl-4 lg:pl-12">
              <TextScramble trigger={!prefersReduced} duration={1.2} speed={0.03} className="block">SOLVING REAL-WORLD</TextScramble>
              <TextScramble trigger={!prefersReduced} duration={1.2} speed={0.03} className="block">PROBLEMS WITH AI</TextScramble>
              <TextScramble trigger={!prefersReduced} duration={1.2} speed={0.03} className="block">AND CONTINUOUSLY</TextScramble>
              <TextScramble trigger={!prefersReduced} duration={1.2} speed={0.03} className="block">LEARNING NEW THINGS</TextScramble>
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 mb-24 lg:mb-32">
          <motion.div
            {...fadeInUp}
            className="lg:col-span-3 flex flex-col justify-center order-2 lg:order-1"
          >
            <span className="text-xs text-foreground/50 tracking-widest uppercase mb-3">Undergraduate Thesis</span>
            <h3 className="font-display text-xl lg:text-2xl text-gray-900 dark:text-gray-200 mb-4 leading-snug">
              AI-Driven Early Detection of Heart Disease Using Machine Learning and Deep Learning
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Developed a hybrid AI framework integrating a stacking ensemble (Random Forest, XGBoost,
              and Logistic Regression) with a Residual 1D-CNN to improve early heart disease detection
              using structured clinical data and ECG signals.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full text-xs border border-black bg-black text-white dark:bg-transparent dark:border-foreground/30 dark:text-foreground/80">
                95.7% ML Accuracy
              </span>
              <span className="px-3 py-1 rounded-full text-xs border border-black bg-black text-white dark:bg-transparent dark:border-foreground/30 dark:text-foreground/80">
                92.3% ECG Classification
              </span>
              <span className="px-3 py-1 rounded-full text-xs border border-black bg-black text-white dark:bg-transparent dark:border-foreground/30 dark:text-foreground/80">
                Stacking Ensemble
              </span>
              <span className="px-3 py-1 rounded-full text-xs border border-black bg-black text-white dark:bg-transparent dark:border-foreground/30 dark:text-foreground/80">
                Interpretable AI
              </span>
            </div>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="lg:col-span-2 relative group order-1 lg:order-2"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-foreground/5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="thesis.jpg"
                alt="AI-Driven Early Detection of Heart Disease"
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-foreground/20 rounded-2xl -z-10" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
          <motion.div {...fadeInUp} className="lg:col-span-2 relative group">
            <div className="relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-foreground/5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="ml.jpg"
                alt="Working on ML projects"
                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-foreground/20 rounded-2xl -z-10" />
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="lg:col-span-3 flex flex-col justify-center"
          >
            <span className="text-xs text-foreground/50 tracking-widest uppercase mb-3">What I Do Now</span>
            <h3 className="font-display text-xl lg:text-2xl text-gray-900 dark:text-gray-200 mb-4 leading-snug">
              Building End-to-End Machine Learning Projects
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              From data cleaning and feature engineering to regression, deep learning, and
              deployment - with a stack built around Python, scikit-learn, TensorFlow, and PyTorch.
              Always looking for the next problem worth solving.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full text-xs border border-black bg-black text-white dark:bg-transparent dark:border-foreground/30 dark:text-foreground/80">Python</span>
              <span className="px-3 py-1 rounded-full text-xs border border-black bg-black text-white dark:bg-transparent dark:border-foreground/30 dark:text-foreground/80">scikit-learn</span>
              <span className="px-3 py-1 rounded-full text-xs border border-black bg-black text-white dark:bg-transparent dark:border-foreground/30 dark:text-foreground/80">TensorFlow</span>
              <span className="px-3 py-1 rounded-full text-xs border border-black bg-black text-white dark:bg-transparent dark:border-foreground/30 dark:text-foreground/80">PyTorch</span>
              <span className="px-3 py-1 rounded-full text-xs border border-black bg-black text-white dark:bg-transparent dark:border-foreground/30 dark:text-foreground/80">Deep Learning</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}