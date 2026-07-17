import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/use-mobile'

const USER = 'zobayer301'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

const streakCard = 'https://github-readme-streak-stats.herokuapp.com/?user=' + USER + '&hide_border=true&background=0d0d0d&stroke=1f2937&ring=22d3ee&fire=22d3ee&currStreakLabel=22d3ee&sideLabels=64748b&sideNums=c4b5fd&currStreakNum=ffffff&dates=6b7280'
const streakCardLight = 'https://github-readme-streak-stats.herokuapp.com/?user=' + USER + '&hide_border=true&background=transparent&stroke=94a3b8&ring=0891b2&fire=0891b2&currStreakLabel=0891b2&sideLabels=475569&sideNums=1e293b&currStreakNum=0f172a&dates=64748b'
const graphCard = 'https://github-readme-activity-graph.vercel.app/graph?username=' + USER + '&bg_color=0d0d0d&color=22d3ee&line=818cf8&point=22d3ee&area=true&hide_border=true'
const graphCardLight = 'https://github-readme-activity-graph.vercel.app/graph?username=' + USER + '&bg_color=transparent&color=0891b2&line=6366f1&point=0891b2&area=true&hide_border=true&color=0891b2'

interface Stats {
  totalContributions: number
  currentStreak: number
  longestStreak: number
}

const STATS_API = 'https://github-readme-streak-stats.herokuapp.com/user/' + USER

export function GithubStats() {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const { resolvedTheme } = useTheme()
  const isLight = resolvedTheme === 'light'
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
        { label: 'Total Contributions', value: stats.totalContributions.toLocaleString(), color: 'text-cyan-400' },
        { label: 'Current Streak', value: stats.currentStreak + ' days', color: 'text-blue-400' },
        { label: 'Longest Streak', value: stats.longestStreak + ' days', color: 'text-indigo-400' },
      ]
    : null

  return (
    <section id="github" className="section-padding min-h-screen flex flex-col justify-center bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-sky-400 tracking-widest uppercase">Open Source</span>
          <div className="w-6 h-px bg-gradient-to-r from-sky-500 to-cyan-500 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-6 text-gradient-blue"
        >
          GITHUB
        </motion.h2>

        <motion.p
          {...fadeInUp}
          className="text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mb-16 lg:mb-20 leading-relaxed"
        >
          A live snapshot of my work on{' '}
          <a
            href={'https://github.com/' + USER}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 underline underline-offset-4 hover:text-cyan-200 decoration-cyan-500/30 hover:decoration-cyan-400/50"
          >
            @{USER}
          </a>{' '}{"\u2014"}{' commits, streaks, and the languages I reach for most.'}
        </motion.p>

        <motion.div
          {...fadeInUp}
          className="rounded-lg border border-sky-500/10 bg-black/40 dark:bg-black/40 bg-slate-100 p-4 mb-6 lg:mb-8 overflow-hidden max-w-2xl hover:border-sky-400/20 hover:shadow-[0_0_15px_rgba(56,189,248,0.06)] transition-all duration-500"
        >
          <img
            src={isLight ? streakCardLight : streakCard}
            alt={USER + ' GitHub streak'}
            loading="lazy"
            className="w-full h-auto"
          />
        </motion.div>

        {statItems && (
          <div className="grid grid-cols-3 gap-3 lg:gap-4 mb-6 lg:mb-8 max-w-2xl mx-auto">
            {statItems.map((item) => (
              <motion.div
                key={item.label}
                {...statAnimation}
                className="rounded-lg border border-sky-500/10 bg-black/40 dark:bg-black/40 bg-slate-100 p-4 lg:p-6 text-center hover:border-sky-400/25 hover:shadow-[0_0_15px_rgba(56,189,248,0.06)] transition-all duration-500"
              >
                <div className={'text-xl lg:text-3xl font-display font-bold tracking-tight ' + item.color}>
                  {item.value}
                </div>
                <div className="text-xs lg:text-sm text-gray-500 dark:text-gray-500 text-gray-600 mt-1 lg:mt-2">{item.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          {...fadeInUp}
          className="rounded-lg border border-sky-500/10 bg-black/40 dark:bg-black/40 bg-slate-100 p-4 overflow-hidden hover:border-sky-400/20 hover:shadow-[0_0_15px_rgba(56,189,248,0.06)] transition-all duration-500"
        >
          <img
            src={isLight ? graphCardLight : graphCard}
            alt={USER + ' contribution activity graph'}
            loading="lazy"
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </section>
  )
}