import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

function EducationCard({
  image,
  label,
  url,
  degree,
  description,
  year,
}: {
  image: string
  label: string
  url?: string
  degree: string
  description: string
  year: string
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
      <motion.div {...fadeInUp} className="lg:col-span-2 relative group overflow-hidden">
        <div className="hoverable relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-foreground/5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img
            src={image}
            alt={label}
            className="w-full h-auto transition-all duration-700 group-hover:scale-105"
          />
        </div>
        <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-foreground/20 rounded-2xl -z-10" />
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-xs text-foreground/70 uppercase tracking-widest hover:text-foreground transition-colors inline-flex items-center gap-1.5"
          >
            {label}
            <ArrowRight size={12} className="shrink-0" />
          </a>
        ) : (
          <p className="mt-4 text-xs text-foreground/70 uppercase tracking-widest">
            {label}
          </p>
        )}
      </motion.div>

      <motion.div
        {...fadeInUp}
        transition={{ ...fadeInUp.transition, delay: 0.2 }}
        className="lg:col-span-3 flex flex-col justify-center"
      >
        <h3 className="text-xl lg:text-2xl text-gray-900 dark:text-white mb-4 leading-snug">
          {degree}
        </h3>
        <p className="text-base text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
          {description}
        </p>
        <p className="text-sm text-gray-800 dark:text-gray-300">
          <span className="font-bold">Graduated: {year}</span>
        </p>
      </motion.div>
    </div>
  )
}

export function Education() {
  return (
    <section id="education" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="group mb-10 lg:mb-12">
          <span className="hover-bob text-sm text-foreground/80 tracking-widest uppercase">Background</span>
          <div className="w-6 h-px bg-foreground/40 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="hover-bob font-display text-[10vw] lg:text-section leading-none tracking-tight mb-8 lg:mb-12"
        >
          EDUCATION
        </motion.h2>

        <div className="flex flex-col gap-12 lg:gap-16">
          <EducationCard
            image="campus.jpg"
            label="GREEN UNIVERSITY OF BANGLADESH"
            url="https://green.edu.bd/"
            degree="B.Sc. in Computer Science & Engineering"
            description="Graduated with a Bachelor's degree in Computer Science and Engineering, specializing in Artificial Intelligence and Machine Learning. Built a solid understanding of data structures, algorithms, software engineering, databases, and data analytics while completing a research thesis on AI-based heart disease prediction."
            year="2026"
          />

          <EducationCard
            image="college.jpg"
            label="N.S GOVT. COLLEGE, NATORE"
            url="https://nsc.edu.bd/"
            degree="Higher Secondary Certificate (Science)"
            description="Completed Higher Secondary education with a focus on Science, building a strong foundation in physics, chemistry, mathematics, and biology."
            year="2020"
          />

          <EducationCard
            image="school.png"
            label="KRISHNAGOPALPUR DWI-MUKHI HIGH SCHOOL, NAOGAON"
            url="https://www.sohopathi.com/krisna-gopalpur-dwi-mukhi-high-school/"
            degree="Secondary School Certificate (Science)"
            description="Completed Secondary School education in the Science group, developing fundamental knowledge in core scientific disciplines and analytical thinking."
            year="2018"
          />
        </div>
      </div>
    </section>
  )
}
