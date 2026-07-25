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
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
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
    className="h-14 w-14 object-contain rounded"
  />
)

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const PinterestIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.972-5.365 11.972-11.987C23.97 5.367 18.628.001 12.017.001z"/>
  </svg>
)

type SocialLink = {
  label: string
  href: string
  icon: React.FC
  external: boolean
}

const socialLinks: SocialLink[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/mdzobayerchowdhury30', icon: FacebookIcon, external: true },
  { label: 'Instagram', href: 'https://www.instagram.com/random___state_42/', icon: InstagramIcon, external: true },
  { label: 'X', href: 'https://x.com/zobayerchowdhur', icon: XIcon, external: true },
  { label: 'Pinterest', href: 'https://www.pinterest.com/mdzobayerchowdhury3077/_profile/', icon: PinterestIcon, external: true },
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
              className="self-start inline-flex items-center gap-1.5 h-11 px-5 rounded-2xl bg-gradient-to-r from-foreground to-foreground/80 text-background text-xs font-normal tracking-wide shadow-md transition-all hover:scale-[1.03] hover:shadow-xl active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
            >
              <Send size={18} className="shrink-0" />
              {status === 'sending' ? 'Sending...' : "Let's talk"}
            </button>
          </form>
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
                className="hoverable flex items-center gap-3 text-gray-800 dark:text-gray-300 hover:text-foreground transition-colors min-h-[44px] p-2"
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
        <img src="/logo.png" alt="Logo" className="h-10 w-10 rounded-full object-cover" />
        <p className="text-xs text-gray-900 dark:text-gray-100">
          &copy; 2026 All rights reserved by Md. Zobayer Chowdhury
        </p>
      </motion.footer>
    </section>
  )
}
