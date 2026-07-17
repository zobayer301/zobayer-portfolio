import { useEffect, useState } from 'react'
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

const streakCard = 'https://github-readme-streak-stats.herokuapp.com/?user=' + USER + '&hide_border=true&background=0d0d0d&stroke=1f2937&ring=ffffff&fire=ffffff&currStreakLabel=ffffff&sideLabels=9ca3af&sideNums=d1d5db&currStreakNum=ffffff&dates=6b7280'
const graphCard = 'https://github-readme-activity-graph.vercel.app/graph?username=' + USER + '&bg_color=0d0d0d&color=ffffff&line=9ca3af&point=ffffff&area=true&hide_border=true'

interface Stats {
  totalContributions: number
  currentStreak: number
  longestStreak: number
}

const STATS_API = 'https://github-readme-streak-stats.herokuapp.com/user/' + USER

export function GithubStats() {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetch(STATS_API)
      .then((res) => res.json())
      .then((data) => {
        setStats({
          totalContributions: parseInt(data.total_contributions ?? '0', 10),
          currentStreak: parseInt(data.current_streak ?? '0', 10),
          longestStreak: parseInt(data.longest_streak ?? '0', 10),
        })
      })
      .catch(() => setStats(null))
  }, [])

  const viewportMargin = isMobile ? '-20px' : '-100px'
  const statAnimation = prefersReducedMotion
    ? { initial: { opacity: 1 }, whileInView: { opacity: 1 }, viewport: { once: true, margin: viewportMargin } }
    : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: viewportMargin }, transition: { duration: 0.6, ease: 'easeOut' as const } }

  const statItems = stats
    ? [
        { label: 'Total Contributions', value: stats.totalContributions.toLocaleString() },
        { label: 'Current Streak', value: stats.currentStreak + ' days' },
        { label: 'Longest Streak', value: stats.longestStreak + ' days' },
      ]
    : null

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
            href={'https://github.com/' + USER}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline underline-offset-4 hover:text-gray-300"
          >
            @{USER}
          </a>{' '}{"\u2014"}{' commits, streaks, and the languages I reach for most.'}
        </motion.p>

        {/* Streak */}
        <motion.div
          {...fadeInUp}
          className="rounded-lg border border-gray-800 bg-black/40 p-4 mb-6 lg:mb-8 overflow-hidden max-w-2xl"
        >
          <img
            src={streakCard}
            alt={USER + ' GitHub streak'}
            loading="lazy"
            className="w-full h-auto"
          />
        </motion.div>

        {/* Stats row */}
        {statItems && (
          <div className="grid grid-cols-3 gap-3 lg:gap-4 mb-6 lg:mb-8 max-w-2xl">
            {statItems.map((item) => (
              <motion.div
                key={item.label}
                {...statAnimation}
                className="rounded-lg border border-gray-800 bg-black/40 p-4 lg:p-6 text-center"
              >
                <div className="text-xl lg:text-3xl font-display font-bold text-white tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs lg:text-sm text-gray-500 mt-1 lg:mt-2">{item.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Contribution graph */}
        <motion.div
          {...fadeInUp}
          className="rounded-lg border border-gray-800 bg-black/40 p-4 overflow-hidden"
        >
          <img
            src={graphCard}
            alt={USER + ' contribution activity graph'}
            loading="lazy"
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </section>
  )
}