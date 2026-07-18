import nodemailer from 'nodemailer'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const GMAIL_USER = process.env.GMAIL_USER || ''
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || ''
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'mdzobayerchowdhury3077@gmail.com'

interface ContactBody {
  name?: unknown
  email?: unknown
  message?: unknown
}

function readBody(req: VercelRequest): Promise<ContactBody> {
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

function getTransport() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  })
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed' })
    return
  }

  const body = await readBody(req)
  const name = typeof body.name === 'string' ? body.name : ''
  const email = typeof body.email === 'string' ? body.email : ''
  const message = typeof body.message === 'string' ? body.message : ''
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ success: false, message: 'Invalid input' })
    return
  }

  try {
    await getTransport().sendMail({
      from: GMAIL_USER,
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `Portfolio message from ${name.slice(0, 200)}`,
      text: `New message from your portfolio contact form.\n\nFrom: ${name} <${email}>\n\n${message.slice(0, 5000)}`,
    })
    res.status(200).json({ success: true, message: 'Message sent' })
  } catch (err) {
    console.error('Mail send failed:', err)
    res.status(502).json({ success: false, message: 'Email delivery failed' })
  }
}
