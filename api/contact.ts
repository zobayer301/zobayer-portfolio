import type { VercelRequest, VercelResponse } from '@vercel/node'
import { signPayload, sendWeb3Form, BASE_URL, OWNER } from './_lib'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed' })
    return
  }

  const { name, email, message } = req.body || {}
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

  const confirmUrl = `${BASE_URL}/confirm?token=${encodeURIComponent(token)}`

  const emailBody = `
A new message is waiting confirmation on your portfolio contact form.

From: ${name} <${email}>

"${message}"

Confirm and deliver this message to ${OWNER} by opening the link below:
${confirmUrl}

This link expires in 24 hours. If you did not submit this form, you can ignore this email.
`.trim()

  try {
    const result = await sendWeb3Form(email, {
      subject: `Confirm your message to Md. Zobayer Chowdhury`,
      from_name: 'Portfolio Contact',
      message: emailBody,
    })
    if (!result.success) {
      res.status(502).json({ success: false, message: 'Email delivery failed' })
      return
    }
    res.status(200).json({ success: true, message: 'Confirmation email sent' })
  } catch {
    res.status(502).json({ success: false, message: 'Email delivery failed' })
  }
}
