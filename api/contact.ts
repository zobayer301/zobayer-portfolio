import crypto from 'crypto'
import nodemailer from 'nodemailer'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const GMAIL_USER = process.env.GMAIL_USER || ''
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || ''
const VERIFY_SECRET = process.env.VERIFY_SECRET || 'dev-insecure-secret-change-me'
const SITE_URL = process.env.SITE_URL || 'https://zobayer-xo.vercel.app'

type PendingMessage = {
  name: string
  email: string
  message: string
  exp: number
}

function signPayload(payload: PendingMessage): string {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const sig = crypto.createHmac('sha256', VERIFY_SECRET).update(body).digest('base64url')
  return `${body}.${sig}`
}

function verifyToken(token: string): PendingMessage | null {
  const [body, sig] = token.split('.')
  if (!body || !sig) return null
  const expected = crypto.createHmac('sha256', VERIFY_SECRET).update(body).digest('base64url')
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString()) as PendingMessage
    if (Date.now() > payload.exp) return null
    return payload
  } catch {
    return null
  }
}

function getTransport() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  })
}

function readBody(req: VercelRequest): Promise<any> {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => (data += chunk))
    req.on('end', () => {
      if (!data) return resolve({})
      try {
        resolve(JSON.parse(data))
      } catch {
        reject(new Error('Invalid JSON'))
      }
    })
    req.on('error', reject)
  })
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed' })
    return
  }

  const raw = await readBody(req)
  const { name, email, message } = raw || {}
  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ success: false, message: 'Invalid input' })
    return
  }

  const token = signPayload({
    name: String(name).slice(0, 200),
    email: String(email).slice(0, 200),
    message: String(message).slice(0, 5000),
    exp: Date.now() + 1000 * 60 * 60 * 24,
  })

  const confirmUrl = `${SITE_URL}/confirm?token=${encodeURIComponent(token)}`

  try {
    await getTransport().sendMail({
      from: GMAIL_USER,
      to: String(email),
      subject: 'Confirm your message to Md. Zobayer Chowdhury',
      text: `Hi ${name},\n\nYou submitted a message on Md. Zobayer Chowdhury's portfolio contact form. Confirm it by opening this link:\n\n${confirmUrl}\n\nThis link expires in 24 hours. If you did not submit this form, you can ignore this email.`,
    })
    res.status(200).json({ success: true, message: 'Confirmation email sent' })
  } catch (err) {
    console.error('Mail send failed:', err)
    res.status(502).json({ success: false, message: 'Email delivery failed' })
  }
}
