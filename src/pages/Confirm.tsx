import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/Navigation'
import { ThemeToggle } from '@/components/ThemeToggle'

type Status = 'loading' | 'success' | 'error'

export default function Confirm() {
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (!token) {
      setStatus('error')
      return
    }
    fetch(`/api/confirm?token=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((data) => setStatus(data.success ? 'success' : 'error'))
      .catch(() => setStatus('error'))
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeToggle />
      <Navigation />
      <main className="section-padding max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          {status === 'loading' && (
            <>
              <h1 className="font-display text-5xl lg:text-7xl tracking-tight mb-4">Confirming...</h1>
              <p className="text-foreground/60">Please wait a moment.</p>
            </>
          )}
          {status === 'success' && (
            <>
              <h1 className="font-display text-5xl lg:text-7xl tracking-tight mb-4">Message sent</h1>
              <p className="text-foreground/60">Thanks! Your message has been delivered. I'll get back to you soon.</p>
            </>
          )}
          {status === 'error' && (
            <>
              <h1 className="font-display text-5xl lg:text-7xl tracking-tight mb-4">Link expired</h1>
              <p className="text-foreground/60">
                This confirmation link is invalid or expired. Please return to the contact form and send your message again.
              </p>
            </>
          )}
        </motion.div>
      </main>
    </div>
  )
}
