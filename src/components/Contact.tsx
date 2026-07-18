import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/use-mobile'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
)

const ResearchGateIcon = () => (
  <img
    src="/logo.svg"
    alt="ResearchGate"
    className="h-7 w-7 object-contain"
  />
)

type SocialLink = {
  label: string
  href: string
  icon: React.FC
  external: boolean
  showLabel?: boolean
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

const socialLinks: SocialLink[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/mdzobayerchowdhury30', icon: FacebookIcon, external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/md-zobayer-chowdhury-5203461b3/', icon: LinkedinIcon, external: true },
  { label: 'GitHub', href: 'https://github.com/zobayer301', icon: GithubIcon, external: true },
  { label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Md-Zobayer-Chowdhury', icon: ResearchGateIcon, external: true },
  { label: 'mdzobayerchowdhury3077@gmail.com', href: 'mailto:mdzobayerchowdhury3077@gmail.com', icon: MailIcon, external: false },
]

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending'>('idle')

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !emailValid || !message.trim()) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      })
      const data = await res.json()
        if (data.success) {
          toast.success("Message sent! I'll get back to you soon.")
          setName('')
          setEmail('')
          setMessage('')
        } else {
        toast.error('Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setStatus('idle')
    }
  }



  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-foreground/80 tracking-widest uppercase">Contact</span>
          <div className="w-6 h-px bg-foreground/40 mt-2" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="font-display text-[12vw] lg:text-hero leading-none tracking-tight mb-8"
        >
          Get in touch
        </motion.h2>

        <motion.div
          {...fadeInUp}
          className="w-full h-px bg-foreground/20 mb-12 lg:mb-16"
        />

        <motion.div
          {...fadeInUp}
          className="mb-12 lg:mb-16 max-w-2xl"
        >
          <h3 className="text-xl md:text-2xl lg:text-3xl text-gray-900 dark:text-white font-light leading-tight mb-4">
            OPEN TO NEW<br />
            OPPORTUNITIES IN<br />
            <span className="text-foreground">DATA SCIENCE & ML</span>
          </h3>
        </motion.div>

        <motion.div
          {...fadeInUp}
          className="mb-12 lg:mb-16 max-w-2xl"
        >
          <form
            onSubmit={handleSend}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name *"
              required
              className="flex h-12 w-full rounded-lg border border-foreground/20 bg-transparent px-4 text-base text-gray-900 dark:text-white placeholder:text-gray-600 focus-visible:outline-none focus-visible:border-foreground/60 transition-colors"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email *"
              required
              className="flex h-12 w-full rounded-lg border border-foreground/20 bg-transparent px-4 text-base text-gray-900 dark:text-white placeholder:text-gray-600 focus-visible:outline-none focus-visible:border-foreground/60 transition-colors"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message to Zobayer..."
              rows={4}
              required
              className="flex w-full rounded-lg border border-foreground/20 bg-transparent px-4 py-3 text-base text-gray-900 dark:text-white placeholder:text-gray-600 focus-visible:outline-none focus-visible:border-foreground/60 transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={!name.trim() || !message.trim() || !emailValid || status === 'sending'}
              className="self-start inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-foreground text-background text-sm tracking-widest uppercase font-medium transition-opacity hover:opacity-90 disabled:opacity-40 disabled:pointer-events-none"
            >
              {status === 'sending' ? 'Sending...' : "Let's talk"}
            </button>
          </form>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-10 mb-16 lg:mb-24">
          {socialLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={
                  link.label.includes('@')
                    ? (e) => {
                        e.preventDefault()
                        window.open(link.href, '_blank', 'noopener,noreferrer')
                        navigator.clipboard?.writeText(link.label).then(
                          () => toast.success('Email copied to clipboard!'),
                          () => {}
                        )
                      }
                    : link.onClick
                }
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                aria-label={link.label.includes('@') ? link.label : link.label}
                className="flex items-center gap-3 text-gray-800 dark:text-gray-300 hover:text-foreground transition-colors min-h-[44px] p-2"
              >
                <Icon />
                {(link.label.includes('@') || link.showLabel) && (
                  <span className="text-xs tracking-wide normal-case">{link.label}</span>
                )}
              </motion.a>
            )
          })}
        </div>

        <motion.footer
          {...fadeInUp}
          className="mt-24 lg:mt-32 pt-8 border-t border-gray-300 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-gray-800 dark:text-gray-300">
            &copy; {new Date().getFullYear()} Md. Zobayer Chowdhury. All rights reserved.
          </p>
          <p className="text-xs text-gray-800 dark:text-gray-300">
            Dhaka, Bangladesh
          </p>
        </motion.footer>
      </div>
    </section>
  )
}