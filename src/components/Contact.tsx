import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { User, Mail, MessageSquare, Send } from 'lucide-react'

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

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
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
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2" ry="2"/>
    <path d="M7 16V8l3 4 3-4v8"/>
    <path d="M17 8v4a2 2 0 0 0 2 2"/>
    <path d="M17 12a2 2 0 0 0 2-2V8"/>
  </svg>
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
  { label: 'Instagram', href: 'https://www.instagram.com/random___state_42/', icon: InstagramIcon, external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/md-zobayer-chowdhury-5203461b3/', icon: LinkedinIcon, external: true },
  { label: 'GitHub', href: 'https://github.com/zobayer301', icon: GithubIcon, external: true },
  { label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Md-Zobayer-Chowdhury', icon: ResearchGateIcon, external: true },
]

const emailLink: SocialLink = {
  label: 'mdzobayerchowdhury3077@gmail.com',
  href: 'mailto:mdzobayerchowdhury3077@gmail.com',
  icon: MailIcon,
  external: false,
}

export function Contact() {
  const ownerEmail = 'mdzobayerchowdhury3077@gmail.com'
  const WEB3FORMS_KEY = '40ec33e7-bac2-4dd4-99a3-8186426bf388'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending'>('idle')
  const [showErrors, setShowErrors] = useState(false)

  const nameValid = /^[A-Za-z\s.'-]+$/.test(name.trim())
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nameValid || !emailValid || !message.trim()) {
      setShowErrors(true)
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          from_name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          subject: `Portfolio message from ${name.trim()}`,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (data && data.success) {
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
        <motion.div {...fadeInUp} className="group mb-10 lg:mb-12">
          <span className="hover-bob text-sm text-foreground/80 tracking-widest uppercase">Contact</span>
          <div className="w-6 h-px bg-foreground/40 mt-2" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="hover-bob font-display text-[14vw] sm:text-[10vw] lg:text-hero leading-none tracking-tight mb-8"
        >
          Get in touch
        </motion.h2>

        <motion.div
          {...fadeInUp}
          className="w-full h-px bg-foreground/20 mb-8 lg:mb-12"
        />

        <motion.div
          {...fadeInUp}
          className="mb-8 lg:mb-12 max-w-2xl rounded-3xl p-2 transition-all duration-500 hover:bg-black/5 dark:hover:bg-white/5"
        >
          <h3 className="text-xl md:text-2xl lg:text-3xl text-gray-900 dark:text-white font-light leading-tight mb-4">
            OPEN TO NEW<br />
            OPPORTUNITIES IN<br />
            <span className="text-foreground">DATA SCIENCE & ML</span>
          </h3>
        </motion.div>

        <motion.div
          {...fadeInUp}
          className="mb-8 lg:mb-12 max-w-2xl"
        >
          <form
            onSubmit={handleSend}
            className="flex flex-col gap-6 rounded-3xl border border-foreground/10 bg-gradient-to-br from-foreground/[0.04] to-foreground/[0.01] p-7 sm:p-10 backdrop-blur-md shadow-2xl transition-all duration-500 hover:bg-black/5 hover:shadow-[0_0_40px_-5px_rgba(0,0,0,0.25)] hover:border-foreground/30 hover:scale-[1.01] dark:hover:bg-white/5 dark:hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.25)]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-lg font-medium font-poppins tracking-wide text-foreground mb-1">Your name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    inputMode="text"
                    pattern="[A-Za-z\s.'-]+"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g. Mahmudullah Riyad"
                    required
                    className="flex h-14 w-full rounded-2xl border border-foreground/15 bg-background/70 pl-11 pr-4 text-base text-gray-900 dark:text-white placeholder:text-xs placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:border-transparent transition-all"
                  />
                </div>
                {showErrors && !nameValid && (
                  <span className="text-xs text-red-500">Please write your name properly (letters only).</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-lg font-medium font-poppins tracking-wide text-foreground mb-1">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E.g. name@example.com"
                    required
                    className="flex h-14 w-full rounded-2xl border border-foreground/15 bg-background/70 pl-11 pr-4 text-base text-gray-900 dark:text-white placeholder:text-xs placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:border-transparent transition-all"
                  />
                </div>
                {showErrors && !emailValid && (
                  <span className="text-xs text-red-500">Please enter a valid email address.</span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium font-poppins tracking-wide text-foreground mb-1">Project details</label>
              <div className="relative">
                <MessageSquare size={18} className="absolute left-3.5 top-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project visions..."
                  rows={5}
                  required
                  className="flex w-full rounded-2xl border border-foreground/15 bg-background/70 pl-11 pr-4 pt-3.5 pb-3 text-base text-gray-900 dark:text-white placeholder:text-xs placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:border-transparent transition-all resize-none"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="self-start inline-flex items-center gap-1.5 h-10 px-5 rounded-2xl bg-gradient-to-r from-foreground to-foreground/80 text-background text-xs font-normal tracking-wide shadow-md transition-all hover:scale-[1.03] hover:shadow-xl active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
            >
              <Send size={18} className="shrink-0" />
              {status === 'sending' ? 'Sending...' : "Let's talk"}
            </button>
          </form>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-10 mb-6">
          {socialLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <motion.a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                aria-label={link.label}
                className="hoverable flex items-center gap-3 text-gray-800 dark:text-gray-300 hover:text-foreground transition-colors min-h-[44px] p-2"
              >
                <Icon />
              </motion.a>
            )
          })}
        </div>

        <div className="flex justify-center mb-12 lg:mb-16">
          <motion.a
            href={emailLink.href}
            onClick={(e) => {
              e.preventDefault()
              window.open(emailLink.href, '_blank', 'noopener,noreferrer')
              navigator.clipboard?.writeText(emailLink.label).then(
                () => toast.success('Email copied to clipboard!'),
                () => {}
              )
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            aria-label={emailLink.label}
            className="hoverable flex items-center gap-3 text-gray-800 dark:text-gray-300 hover:text-foreground transition-colors min-h-[44px] p-2"
          >
            <MailIcon />
            <span className="text-xs tracking-wide normal-case">{emailLink.label}</span>
          </motion.a>
        </div>

        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="pt-8 pb-4 border-t border-gray-300 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4"
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
