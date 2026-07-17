import crypto from 'crypto'
import nodemailer from 'nodemailer'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const GMAIL_USER = process.env.GMAIL_USER || ''
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || ''
const VERIFY_SECRET = process.env.VERIFY_SECRET || 'dev-insecure-secret-change-me'

type PendingMessage = {
  name: string
  email: string
  message: string
  exp: number
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = (req.query.token as string) || ''
  const payload = verifyToken(token)

  if (!payload) {
    res.status(400).json({ success: false, message: 'invalid' })
    return
  }

  try {
    await getTransport().sendMail({
      from: GMAIL_USER,
      to: GMAIL_USER,
      replyTo: payload.email,
      subject: `Portfolio message from ${payload.name}`,
      text: `New confirmed message from your portfolio contact form.\n\nFrom: ${payload.name} <${payload.email}>\n\n${payload.message}`,
    })
    res.status(200).json({ success: true, message: 'delivered' })
  } catch (err) {
    console.error('Mail delivery failed:', err)
    res.status(502).json({ success: false, message: 'delivery_failed' })
  }
}
