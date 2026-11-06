import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: 'Who are you?',
    answer: "I'm Md. Zobayer Chowdhury, a Computer Science and Engineering graduate with a passion for Artificial Intelligence, Machine Learning, and Data Science. I enjoy building intelligent, data-driven solutions that solve real-world problems.",
  },
  {
    question: 'What technologies do you work with?',
    answer: 'My primary tech stack includes Python, Scikit-learn, TensorFlow, Pandas, NumPy, SQL, Flask, Streamlit, Docker, Git, and MySQL. I\'m also exploring Deep Learning, NLP, Generative AI, and Large Language Models (LLMs).',
  },
  {
    question: 'What type of opportunities are you looking for?',
    answer: 'I\'m currently open to full-time, internship, and freelance opportunities in Artificial Intelligence, Machine Learning, Data Science, and Python Development.',
  },
  {
    question: 'How can I contact you?',
    answer: 'The easiest way to reach me is through the contact form on this website or via email and LinkedIn. I\'ll respond as soon as possible.',
  },
  {
    question: 'What are you learning right now?',
    answer: 'I\'m currently deepening my knowledge of Deep Learning, Generative AI, Large Language Models (LLMs), MLOps, and deploying scalable machine learning applications.',
  },
  {
    question: 'Why should I hire you?',
    answer: 'I combine a strong academic foundation with hands-on experience in building machine learning solutions. I\'m a quick learner, enjoy solving challenging problems, and am committed to delivering clean, reliable, and impactful software.',
  },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 px-5 sm:px-8 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="group mb-10 lg:mb-12"
        >
          <span className="hover-bob text-sm font-sans font-medium text-foreground/80 tracking-widest uppercase">FAQ</span>
          <div className="w-6 h-px bg-foreground/40 mt-2" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="hover-bob font-display font-bold text-[max(1.75rem,7vw)] lg:text-section leading-[1.05] tracking-tight mb-10 lg:mb-14"
        >
          FREQUENTLY<br />ASKED QUESTIONS
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <button
                onClick={() => toggle(index)}
                className={cn(
                  'w-full flex items-center justify-between text-left py-5 lg:py-6 transition-all duration-300',
                  'border-b border-foreground/10',
                  openIndex === index && 'border-foreground/20'
                )}
                aria-expanded={openIndex === index}
              >
                <span className="text-sm lg:text-base font-sans font-medium tracking-wide text-foreground pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="shrink-0 w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center bg-primary/10"
                >
                  <Plus size={16} className="text-primary" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm lg:text-base font-serif font-normal text-muted-foreground pb-5 lg:pb-6 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
