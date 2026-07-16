import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/use-mobile'

const USER = 'zobayer301'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

const streakCard = `https://github-readme-streak-stats.herokuapp.com/?user=${USER}&hide_border=true&background=0d0d0d&stroke=1f2937&ring=ffffff&fire=ffffff&currStreakLabel=ffffff&sideLabels=9ca3af&sideNums=d1d5db&currStreakNum=ffffff&dates=6b7280`
const graphCard = `https://github-readme-activity-graph.vercel.app/graph?username=${USER}&bg_color=0d0d0d&color=ffffff&line=9ca3af&point=ffffff&area=true&hide_border=true`

export function GithubStats() {
  return (
    <section id="github" className="section-padding bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Open Source</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-6"
        >
          GITHUB
        </motion.h2>

        <motion.p
          {...fadeInUp}
          className="text-base lg:text-lg text-gray-400 max-w-2xl mb-16 lg:mb-20 leading-relaxed"
        >
          A live snapshot of my work on{' '}
          <a
            href={`https://github.com/${USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline underline-offset-4 hover:text-gray-300"
          >
            @{USER}
          </a>{' '}
          — commits, streaks, and the languages I reach for most.
        </motion.p>

        {/* Streak */}
        <motion.div
          {...fadeInUp}
          className="rounded-lg border border-gray-800 bg-black/40 p-4 mb-6 lg:mb-8 overflow-hidden max-w-2xl"
        >
          <img
            src={streakCard}
            alt={`${USER} GitHub streak`}
            loading="lazy"
            className="w-full h-auto"
          />
        </motion.div>

        {/* Contribution graph */}
        <motion.div
          {...fadeInUp}
          className="rounded-lg border border-gray-800 bg-black/40 p-4 overflow-hidden"
        >
          <img
            src={graphCard}
            alt={`${USER} contribution activity graph`}
            loading="lazy"
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </section>
  )
}