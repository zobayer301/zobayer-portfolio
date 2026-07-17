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

const streakCard = 'https://github-readme-streak-stats.herokuapp.com/?user=' + USER + '&hide_border=true&background=transparent&stroke=9ca3af&ring=374151&fire=374151&currStreakLabel=374151&sideLabels=6b7280&sideNums=111827&currStreakNum=111827&dates=6b7280'
const streakCardDark = 'https://github-readme-streak-stats.herokuapp.com/?user=' + USER + '&hide_border=true&background=transparent&stroke=6b7280&ring=f9fafb&fire=f9fafb&currStreakLabel=f9fafb&sideLabels=cbd5e1&sideNums=f9fafb&currStreakNum=f9fafb&dates=cbd5e1'
const graphCard = 'https://github-readme-activity-graph.vercel.app/graph?username=' + USER + '&bg_color=transparent&color=374151&line=6b7280&point=374151&area=true&hide_border=true'
const graphCardDark = 'https://github-readme-activity-graph.vercel.app/graph?username=' + USER + '&bg_color=0d0d0d&color=f9fafb&line=f9fafb&point=f9fafb&area=true&area_color=9ca3af&hide_border=true'

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
  const isDark = resolvedTheme === 'dark'
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
    <section id="github" className="section-padding min-h-screen flex flex-col justify-center bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-foreground/60 tracking-widest uppercase">Open Source</span>
          <div className="w-6 h-px bg-foreground/40 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-6"
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
            className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60"
          >
            @{USER}
          </a>{' '}{"\u2014"}{' commits, streaks, and the languages I reach for most.'}
        </motion.p>

        <motion.div
          {...fadeInUp}
          className="rounded-lg border border-foreground/10 bg-foreground/[0.02] p-4 mb-6 lg:mb-8 overflow-hidden max-w-2xl hover:border-foreground/20 transition-all duration-500"
        >
          <img
            src={isDark ? streakCardDark : streakCard}
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
                className="rounded-lg border border-foreground/10 bg-foreground/[0.02] p-4 lg:p-6 text-center hover:border-foreground/20 transition-all duration-500"
              >
                <div className="text-xl lg:text-3xl font-display font-bold tracking-tight text-foreground">
                  {item.value}
                </div>
                <div className="text-xs lg:text-sm text-foreground/50 mt-1 lg:mt-2">{item.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          {...fadeInUp}
          className="rounded-lg border border-foreground/10 bg-foreground/[0.02] p-4 overflow-hidden hover:border-foreground/20 transition-all duration-500"
        >
          <img
            src={isDark ? graphCardDark : graphCard}
            alt={USER + ' contribution activity graph'}
            loading="lazy"
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </section>
  )
}