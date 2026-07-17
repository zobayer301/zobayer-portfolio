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
      title: 'Education',
      desc: 'B.Sc. in CSE, Green University of Bangladesh',
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: 'Experience',
      desc: 'AR/VR/XR Intern @ Battery Low Interactive',
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: 'Graphics',
      desc: 'Assistant Graphics Designer @ GUCC',
    },
    {
      icon: <HeartPulse className="w-5 h-5" />,
      title: 'Research',
      desc: 'AI-Driven Heart Disease Detection',
    },
  ]

  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">About Zobayer</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 mb-24 lg:mb-32">
          <motion.div
            {...fadeInUp}
            className="lg:col-span-2 relative group"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="computer.jpg"
                alt="Data science workspace"
                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-emerald-500/20 rounded-2xl -z-10" />
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="lg:col-span-3 flex flex-col justify-center"
          >
            <h3 className="font-display text-2xl lg:text-3xl text-gray-200 mb-6 leading-snug">
              Computer Science & Engineering graduate passionate about{' '}
              <span className="text-emerald-400">AI</span>,{' '}
              <span className="text-blue-400"> Machine Learning</span>, and{' '}
              <span className="text-purple-400"> Immersive Technologies</span>
            </h3>
            <p className="text-base lg:text-lg text-gray-400 leading-relaxed mb-8">
              From building AR/VR experiences at Battery Low Interactive to designing graphics
              for the university computer club - I thrive at the intersection of creativity
              and engineering.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.title}
                  {...fadeInUp}
                  transition={{ ...fadeInUp.transition, delay: 0.1 * (i + 1) }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-emerald-500/20 transition-all duration-300"
                >
                  <div className="text-emerald-400 shrink-0">{m.icon}</div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{m.title}</p>
                    <p className="text-sm text-gray-300 truncate">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div {...fadeInUp} className="mb-24 lg:mb-32">
          <div className="relative py-12 px-8 lg:px-16 rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
            <div className="absolute top-6 left-8 text-6xl text-emerald-500/20 font-display">"</div>
            <h2 className="font-display text-[6vw] lg:text-[4vw] xl:text-section leading-none tracking-tight text-gray-300 pl-4 lg:pl-12">
              <TextScramble trigger={!prefersReduced} duration={1.2} speed={0.03} className="block">SOLVING REAL-WORLD</TextScramble>
              <TextScramble trigger={!prefersReduced} duration={1.2} speed={0.03} className="block">PROBLEMS WITH AI </TextScramble>
              <TextScramble trigger={!prefersReduced} duration={1.2} speed={0.03} className="block">AND CONTINUOUSLY</TextScramble>
              <TextScramble trigger={!prefersReduced} duration={1.2} speed={0.03} className="block">LEARNING NEW THINGS."</TextScramble>
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 mb-24 lg:mb-32">
          <motion.div
            {...fadeInUp}
            className="lg:col-span-3 flex flex-col justify-center order-2 lg:order-1"
          >
            <span className="text-xs text-emerald-400 tracking-widest uppercase mb-3">Undergraduate Thesis</span>
            <h3 className="font-display text-xl lg:text-2xl text-gray-200 mb-4 leading-snug">
              AI-Driven Early Detection of Heart Disease Using Machine Learning and Deep Learning
            </h3>
            <p className="text-base text-gray-400 leading-relaxed mb-6">
              Developed a hybrid AI framework integrating a stacking ensemble (Random Forest, XGBoost,
              and Logistic Regression) with a Residual 1D-CNN to improve early heart disease detection
              using structured clinical data and ECG signals.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                95.7% ML Accuracy
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20">
                92.3% ECG Classification
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Stacking Ensemble
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20">
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
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="thesis.jpg"
                alt="AI-Driven Early Detection of Heart Disease"
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-blue-500/20 rounded-2xl -z-10" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
          <motion.div {...fadeInUp} className="lg:col-span-2 relative group">
            <div className="relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-rose-500/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="ml.jpg"
                alt="Working on ML projects"
                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-amber-500/20 rounded-2xl -z-10" />
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="lg:col-span-3 flex flex-col justify-center"
          >
            <span className="text-xs text-amber-400 tracking-widest uppercase mb-3">What I Do Now</span>
            <h3 className="font-display text-xl lg:text-2xl text-gray-200 mb-4 leading-snug">
              Building End-to-End Machine Learning Projects
            </h3>
            <p className="text-base text-gray-400 leading-relaxed mb-6">
              From data cleaning and feature engineering to regression, deep learning, and
              deployment - with a stack built around Python, scikit-learn, TensorFlow, and PyTorch.
              Always looking for the next problem worth solving.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20">Python</span>
              <span className="px-3 py-1 rounded-full text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20">scikit-learn</span>
              <span className="px-3 py-1 rounded-full text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20">TensorFlow</span>
              <span className="px-3 py-1 rounded-full text-xs bg-red-500/10 text-red-400 border border-red-500/20">PyTorch</span>
              <span className="px-3 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Deep Learning</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}