import { motion } from 'framer-motion'
import { TypewriterEffect } from '@/components/TypewriterEffect'

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <motion.img
        src="/logo.svg"
        alt="Md. Zobayer Chowdhury"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute top-6 left-4 sm:left-6 md:left-12 lg:left-16 z-20 h-20 w-auto md:h-24 lg:h-28"
      />

      <div className="absolute inset-0 w-full h-full">
        <img
          src="/hero-image.jpg"
          alt="Md. Zobayer Chowdhury"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40 md:bg-gradient-to-r md:from-black md:via-black/60 md:to-black/20" />
      </div>

      <div className="relative z-10 h-full flex items-end md:items-center pb-32 md:pb-0 px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="font-display leading-none tracking-tighter">
              <span className="block text-white text-[14vw] sm:text-[11vw] md:text-[8vw] lg:text-[7vw]">Md. Zobayer Chowdhury</span>
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
                  className="text-[6vw] sm:text-[5vw] md:text-[3vw] lg:text-[2.5vw] font-normal tracking-normal text-left"
                />
              </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-6 md:mt-8 text-sm sm:text-base text-white leading-relaxed"
            >
              SOLVING REAL-WORLD PROBLEMS WITH AI AND CONTINUOUSLY LEARNING NEW THINGS.
            </motion.p>

            <motion.a
              href="/Md_Zobayer_Chowdhury_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="inline-block mt-6 md:mt-8 px-6 py-3 border border-white/30 text-white text-sm tracking-widest uppercase rounded-full hover:bg-white hover:text-black transition-all duration-300 min-h-[44px]"
            >
              Resume
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}