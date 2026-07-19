import { motion } from 'framer-motion'
import { TypewriterEffect } from '@/components/TypewriterEffect'
import { ExternalLink } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/hero-image.jpg"
          alt="Md. Zobayer Chowdhury"
          className="w-full h-full object-cover object-top sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50 sm:via-black/70 sm:to-black/40 md:bg-gradient-to-r md:from-black md:via-black/60 md:to-black/20" />
      </div>

      <div className="relative z-10 h-full flex items-end md:items-center pb-32 md:pb-0 px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-sm mb-4 md:mb-6"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-green-400 text-xs sm:text-sm tracking-wide">Available for Opportunities</span>
            </motion.div>

            <h1 className="font-display leading-none tracking-tighter">
              <span className="block whitespace-nowrap text-white text-[14vw] sm:text-[11vw] md:text-[8vw] lg:text-[7vw]">Md. Zobayer Chowdhury</span>
              <span className="block mt-2">
                <TypewriterEffect
                  words={[
                    { text: 'Machine' },
                    { text: 'Learning' },
                    { text: 'Explorer' },
                    { text: '\u00B7' },
                    { text: 'Data' },
                    { text: 'Science' },
                    { text: 'Enthusiast' },
                  ]}
                  className="text-[6vw] sm:text-[5vw] md:text-[3vw] lg:text-[2.5vw] font-normal tracking-normal text-left text-[#c1d1e0]"
                />
              </span>
            </h1>
            
            <motion.a
              href="/Md_Zobayer_Chowdhury_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="inline-flex items-center justify-center gap-2 mt-6 md:mt-8 px-6 py-3 border border-white/30 text-white text-sm tracking-widest uppercase rounded-full hover:bg-white hover:text-black transition-all duration-300 min-h-[44px]"
            >
              Resume
              <ExternalLink size={16} className="shrink-0" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
