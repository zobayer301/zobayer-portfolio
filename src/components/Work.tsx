import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/use-mobile'

const experiences = [
  {
    title: 'Forest Fire — Data Cleaning & Feature Engineering',
    company: 'Algerian Forest Fires Dataset',
    location: 'github.com/zobayer301',
    period: 'Project',
    description: 'End-to-end data preprocessing project: data cleaning, feature engineering, exploratory data analysis, and dataset preparation for downstream modeling, built in Python and Jupyter.',
    skills: ['Python', 'Pandas', 'NumPy', 'EDA', 'Feature Engineering'],
    link: 'https://github.com/zobayer301/forest-fire-data-cleaning-feature-engineering',
  },
  {
    title: 'Economic Index Prediction',
    company: 'Multiple Linear Regression',
    location: 'github.com/zobayer301',
    period: 'Project',
    description: 'Predicting stock index prices using Multiple Linear Regression based on interest rates and unemployment rates, with model evaluation and visualization.',
    skills: ['Scikit-learn', 'Regression', 'Statsmodels', 'Matplotlib'],
    link: 'https://github.com/zobayer301/Multiple-Linear-Regression-Economic-Index-Prediction',
  },
  {
    title: 'Polynomial Regression Comparison',
    company: 'Scikit-learn Study',
    location: 'github.com/zobayer301',
    period: 'Project',
    description: 'Implementation and comparison of Simple Linear Regression vs. Polynomial Regression on a synthetic quadratic dataset, with visualization and R² score evaluation.',
    skills: ['Scikit-learn', 'Polynomial Regression', 'Model Evaluation'],
    link: 'https://github.com/zobayer301/Polynomial-Regression-Comparison',
  },
  {
    title: 'Linear Regression From Scratch',
    company: 'NumPy Implementation',
    location: 'github.com/zobayer301',
    period: 'Project',
    description: 'Simple Linear Regression implemented from first principles in Python using NumPy and Matplotlib for predictive analysis and visualization.',
    skills: ['NumPy', 'Matplotlib', 'ML Fundamentals'],
    link: 'https://github.com/zobayer301/linear-regression-from-scratch',
  },
  {
    title: 'AI-Driven Heart Disease Detection',
    company: 'Undergraduate Thesis',
    location: 'Green University of Bangladesh',
    period: 'Thesis',
    description: 'Early detection of heart disease using classical Machine Learning and Deep Learning models on clinical tabular data, comparing accuracy, precision, and recall across architectures.',
    skills: ['TensorFlow', 'PyTorch', 'Classification', 'Deep Learning', 'Healthcare AI'],
    link: 'https://github.com/zobayer301',
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 1, ease: 'easeOut' }
}

export function Work() {
  return (
    <section id="work" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Projects</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          FEATURED<br />PROJECTS
        </motion.h2>

        {/* Experiences */}
        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <motion.a
              key={exp.company + exp.period}
              href={exp.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
              className="block border-t border-gray-800 py-8 md:py-12 lg:py-16 group hover:bg-gray-900/30 transition-colors"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                {/* Left Column - Title & Company */}
                <div className="lg:col-span-5">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-white mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-base lg:text-lg text-gray-400">
                    {exp.company}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {exp.location}
                  </p>
                </div>

                {/* Middle Column - Period */}
                <div className="lg:col-span-2">
                  <p className="text-sm text-gray-500 tracking-widest uppercase">
                    {exp.period}
                  </p>
                </div>

                {/* Right Column - Description & Skills */}
                <div className="lg:col-span-5">
                  <p className="text-gray-400 leading-relaxed mb-6 text-sm lg:text-base">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs text-gray-500 border border-gray-800 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
          <div className="border-t border-gray-800" />
        </div>
      </div>
    </section>
  )
}
