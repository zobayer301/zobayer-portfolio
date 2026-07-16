import { motion } from 'framer-motion'
import heroAsset from '@/assets/hero-zobayer.png.asset.json'

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image - Responsive */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={heroAsset.url}
          alt="Md. Zobayer Chowdhury"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40 md:bg-gradient-to-r md:from-black md:via-black/60 md:to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end md:items-center pb-32 md:pb-0 px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="w-full max-w-5xl">
          {/* Typography */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="font-display leading-none tracking-tighter text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw]">
              <span className="block text-white">Md. Zobayer Chowdhury</span>
              <span className="block text-white">DATA Science &middot; Machine Leaning &middot; Artificial Intelligent </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-6 md:mt-8 text-sm sm:text-base text-white/80 max-w-sm md:max-w-md leading-relaxed"
            >
              CSE graduate passionate about Data Science, Machine Learning, and AI-driven solutions &mdash; building real-world models from Dhaka, Bangladesh.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}