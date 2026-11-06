import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { User, Mail, MessageSquare, Send } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
)

const ResearchGateIcon = () => (
  <img
    src="/research.png"
    alt="ResearchGate"
    className="h-28 w-28 max-w-full object-contain rounded dark:brightness-0 dark:invert"
  />
)

type SocialLink = {
  label: string
  href: string
  icon: React.FC
  external: boolean
}

const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/md-zobayer-chowdhury-5203461b3/', icon: LinkedinIcon, external: true },
  { label: 'GitHub', href: 'https://github.com/zobayer301', icon: GithubIcon, external: true },
  { label: 'Email', href: 'mailto:mdzobayerchowdhury3077@gmail.com', icon: MailIcon, external: false },
  { label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Md-Zobayer-Chowdhury', icon: ResearchGateIcon, external: true },
]

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
          <span className="hover-bob text-sm font-sans font-medium text-foreground/80 tracking-widest uppercase">Contact</span>
          <div className="w-6 h-px bg-foreground/40 mt-2" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="hover-bob font-display font-bold text-[max(1.75rem,8vw)] sm:text-[max(2.25rem,6vw)] lg:text-hero leading-[1.05] tracking-tight mb-8"
        >
          Get in touch
        </motion.h2>

        <motion.div
          {...fadeInUp}
          className="w-full h-px bg-border mb-8 lg:mb-12"
        />

        <motion.div
          {...fadeInUp}
          className="mb-8 lg:mb-12 max-w-2xl rounded-3xl p-2 transition-all duration-500 hover:bg-foreground/[0.03]"
        >
          <h3 className="text-lg md:text-xl lg:text-2xl font-sans font-medium text-foreground leading-snug mb-4">
            OPEN TO NEW<br />
            OPPORTUNITIES IN<br />
            <span className="text-foreground">DATA SCIENCE & ML</span>
          </h3>
        </motion.div>

        <motion.div
          {...fadeInUp}
          className="mb-8 lg:mb-12 max-w-xl"
        >
          {/* Accent glow behind form */}
          <div className="relative">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent pointer-events-none" />
            <form
              onSubmit={handleSend}
              className="relative flex flex-col gap-4 rounded-2xl border border-border/60 bg-background/80 p-5 sm:p-6 backdrop-blur-sm shadow-lg transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_30px_-8px_var(--acc)]"
            >
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">Name</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 pointer-events-none" />
                    <input
                      type="text"
                      inputMode="text"
                      pattern="[A-Za-z\s.'-]+"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Mahmudullah Riyad"
                      required
                      className="h-10 w-full rounded-lg border border-border/60 bg-foreground/[0.03] pl-8 pr-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary/60 transition-all"
                    />
                  </div>
                  {showErrors && !nameValid && (
                    <span className="text-[11px] text-red-500 leading-tight">Letters only please.</span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">Email</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                      className="h-10 w-full rounded-lg border border-border/60 bg-foreground/[0.03] pl-8 pr-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary/60 transition-all"
                    />
                  </div>
                  {showErrors && !emailValid && (
                    <span className="text-[11px] text-red-500 leading-tight">Enter a valid email.</span>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">Message</label>
                <div className="relative">
                  <MessageSquare size={14} className="absolute left-3 top-3 text-muted-foreground/70 pointer-events-none" />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project..."
                    rows={4}
                    required
                    className="w-full rounded-lg border border-border/60 bg-foreground/[0.03] pl-8 pr-3 pt-2.5 pb-2 font-serif text-sm text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary/60 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Footer row: hint + button */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <span className="text-[11px] font-sans text-muted-foreground/60 leading-tight">I usually reply within 24 h</span>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 h-9 px-5 rounded-lg bg-primary text-primary-foreground font-sans text-xs font-medium tracking-wide shadow-sm transition-all hover:scale-[1.04] hover:shadow-[0_0_16px_-2px_var(--acc)] active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none"
                >
                  <Send size={13} className="shrink-0" />
                  {status === 'sending' ? 'Sending…' : "Let's talk"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-10 mt-12 mb-12 lg:mb-16">
          {socialLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <motion.a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={link.label === 'Email' ? (e) => {
                  e.preventDefault()
                  window.open(link.href, '_blank', 'noopener,noreferrer')
                  navigator.clipboard?.writeText(ownerEmail).then(
                    () => toast.success('Email copied to clipboard!'),
                    () => {}
                  )
                } : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                aria-label={link.label}
                className={`flex items-center gap-3 font-sans font-medium text-muted-foreground hover:text-primary transition-colors min-h-[44px] p-2 ${link.label !== 'ResearchGate' ? 'hoverable' : ''}`}
              >
                <Icon />
              </motion.a>
            )
          })}
        </div>
      </div>

      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full py-6 flex flex-col items-center justify-center gap-2"
      >
        <div className="h-10 w-10 rounded-full bg-foreground text-background flex items-center justify-center">
          <img src="/logo.png" alt="Logo" className="h-8 w-8 rounded-full object-cover" />
        </div>
        <p className="text-xs font-sans font-medium text-muted-foreground">
          &copy; 2026 All rights reserved by Md. Zobayer Chowdhury
        </p>
      </motion.footer>
    </section>
  )
}
