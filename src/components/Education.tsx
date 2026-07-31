import { motion } from 'framer-motion'
import { ArrowRight, GraduationCap } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

function EducationCard({
  image,
  label,
  url,
  degree,
  description,
  year,
  flip,
}: {
  image: string
  label: string
  url?: string
  degree: string
  description: string
  year: string
  flip?: boolean
}) {
  return (
    <div className="relative pl-14 md:pl-0">
      {/* Spine segment */}
      <div className={`absolute left-3 ${flip ? 'lg:left-[60%]' : 'lg:left-[40%]'} top-0 bottom-0 w-px -translate-x-1/2 bg-foreground/15`} />

      {/* Timeline node */}
      <span className={`absolute left-3 ${flip ? 'lg:left-[60%]' : 'lg:left-[40%]'} top-1.5 lg:top-1/2 w-2.5 h-2.5 -translate-x-1/2 lg:-translate-y-1/2 rounded-full bg-foreground shadow-[0_0_0_4px_hsl(var(--background))] z-10`} />

      <div className={`grid grid-cols-1 gap-8 lg:gap-16 items-center ${flip ? 'lg:grid-cols-[3fr_2fr]' : 'lg:grid-cols-[2fr_3fr]'}`}>
        {/* Image */}
        <motion.div
          {...fadeInUp}
          className={`relative group ${flip ? 'lg:order-2' : 'lg:order-1'}`}
        >
          <div className="hoverable relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-foreground/5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src={image}
              alt={label}
              className="w-full h-auto transition-all duration-700 group-hover:scale-105"
            />
          </div>
          <div className={`absolute -bottom-4 w-24 h-24 border border-foreground/20 rounded-2xl -z-10 ${flip ? '-left-4' : '-right-4'}`} />
        </motion.div>

        {/* Details */}
        <motion.div
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.15 }}
          className={`flex flex-col justify-center ${flip ? 'lg:order-1' : 'lg:order-2'}`}
        >
          <span className="inline-flex items-center gap-2 self-start px-4 py-1.5 mb-4 text-xs font-poppins tracking-widest uppercase text-foreground/80 border border-foreground/20 rounded-full bg-foreground/[0.03]">
            <GraduationCap size={14} className="text-primary shrink-0" />
            {year}
          </span>

          <h3 className="text-xl lg:text-2xl text-gray-900 dark:text-white mb-3 leading-snug">
            {degree}
          </h3>

          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mb-4 text-xs text-foreground/60 uppercase tracking-widest hover:text-foreground transition-colors inline-flex items-center gap-1.5"
            >
              {label}
              <span className="inline-flex items-center justify-center w-5 h-5 shrink-0 rounded-full bg-foreground text-background transition-all duration-300 group-hover:bg-background group-hover:text-foreground group-hover:rotate-45">
                <ArrowRight size={11} className="shrink-0" />
              </span>
            </a>
          ) : (
            <p className="mb-4 text-xs text-foreground/60 uppercase tracking-widest">
              {label}
            </p>
          )}

          <p className="text-base text-gray-800 dark:text-gray-300 leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </div>
  )
}

const educations = [
  {
    image: 'campus.jpg',
    label: 'GREEN UNIVERSITY OF BANGLADESH',
    url: 'https://green.edu.bd/',
    degree: 'B.Sc. in Computer Science & Engineering',
    description:
      'Graduated with a Bachelor\u2019s degree in Computer Science and Engineering, specializing in Artificial Intelligence and Machine Learning. Built a solid understanding of data structures, algorithms, software engineering, databases, and data analytics while completing a research thesis on AI-based heart disease prediction.',
    year: '2026',
  },
  {
    image: 'college.jpg',
    label: 'N.S GOVT. COLLEGE, NATORE',
    url: 'https://nsc.edu.bd/',
    degree: 'Higher Secondary Certificate (Science)',
    description:
      'Completed Higher Secondary education with a focus on Science, building a strong foundation in physics, chemistry, mathematics, and biology.',
    year: '2020',
  },
  {
    image: 'school.png',
    label: 'KRISHNAGOPALPUR DWI-MUKHI HIGH SCHOOL, NAOGAON',
    url: 'https://www.sohopathi.com/krisna-gopalpur-dwi-mukhi-high-school/',
    degree: 'Secondary School Certificate (Science)',
    description:
      'Completed Secondary School education in the Science group, developing fundamental knowledge in core scientific disciplines and analytical thinking.',
    year: '2018',
  },
]

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
          className="hover-bob font-display text-[max(2rem,10vw)] lg:text-section leading-none tracking-tight mb-8 lg:mb-12"
        >
          EDUCATION
        </motion.h2>

        <div className="flex flex-col gap-12 lg:gap-20">
          {educations.map((edu, index) => (
            <EducationCard key={edu.year} {...edu} flip={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
