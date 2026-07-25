import React from "react"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary shrink-0">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" x2="22" y1="12" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary shrink-0">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary shrink-0">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

const scrollToContact = () => {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
}

export function Hero() {
  return (
    <motion.section
      className="relative flex w-full flex-col overflow-hidden bg-background text-foreground md:flex-row min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex w-full flex-col p-6 sm:p-8 md:p-12 lg:w-3/5 lg:p-16 md:relative md:justify-center">
        <motion.main variants={containerVariants}>
          <motion.h1
            variants={itemVariants}
            className="font-display text-[13vw] sm:text-[10vw] md:text-[6.5vw] lg:text-[5.5vw] leading-none tracking-tighter text-foreground"
          >
            Md. Zobayer Chowdhury
          </motion.h1>
          <motion.div variants={itemVariants} className="my-5 sm:my-6 h-1 w-20 bg-primary" />
          <motion.p variants={itemVariants} className="mb-8 max-w-md text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            Computer Science & Engineering Graduate<br />
            Data Science & Machine Learning Engineer
          </motion.p>
          <motion.a
            href="/Md_Zobayer_Chowdhury_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-black/20 text-foreground/80 text-sm font-medium rounded-full hover:bg-black hover:text-white transition-all duration-300 dark:border-foreground/30 dark:hover:bg-foreground/10"
          >
            RESUME
            <ExternalLink size={16} className="shrink-0" />
          </motion.a>
        </motion.main>

        <motion.footer variants={itemVariants} className="mt-10 sm:mt-12 md:absolute md:bottom-8 lg:bottom-12 md:left-12 lg:left-16 w-full max-w-[calc(100%-6rem)]">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <GlobeIcon />
              <span className="truncate">mdzobayerchowdhury3077@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon />
              <span>Dhaka, Bangladesh</span>
            </div>
            <button
              onClick={scrollToContact}
              className="flex items-center gap-2 text-left hover:text-primary transition-colors cursor-pointer"
            >
              <BriefcaseIcon />
              <span>Open to opportunities</span>
            </button>
          </div>
        </motion.footer>
      </div>

      <motion.div
        className="w-full min-h-[250px] sm:min-h-[300px] bg-cover bg-center md:w-1/2 md:min-h-full lg:w-2/5"
        style={{ backgroundImage: "url(/hero-image.jpg)" }}
        initial={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
        animate={{ clipPath: "polygon(25% 0, 100% 0, 100% 100%, 0% 100%)" }}
        transition={{ duration: 1.2, ease: "circOut" }}
      />
    </motion.section>
  )
}

export default Hero
