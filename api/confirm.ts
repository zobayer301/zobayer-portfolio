import type { VercelRequest, VercelResponse } from '@vercel/node'
import { verifyToken, sendWeb3Form, OWNER } from './_lib'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = (req.query.token as string) || ''
  const payload = verifyToken(token)

  if (!payload) {
    res.status(400).json({ success: false, message: 'invalid' })
    return
  }

  const emailBody = `
New confirmed message from your portfolio contact form.

From: ${payload.name} <${payload.email}>

${payload.message}
`.trim()

  try {
    const result = await sendWeb3Form(OWNER, {
      from_name: payload.name,
      subject: `Portfolio message from ${payload.name}`,
      message: emailBody,
    })
    if (!result.success) {
      res.status(502).json({ success: false, message: 'delivery_failed' })
      return
    }
    res.status(200).json({ success: true, message: 'delivered' })
  } catch {
    res.status(502).json({ success: false, message: 'delivery_failed' })
  }
}
