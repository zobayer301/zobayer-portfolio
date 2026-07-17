import crypto from 'crypto'

const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY || ''
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'mdzobayerchowdhury3077@gmail.com'
const VERIFY_SECRET = process.env.VERIFY_SECRET || 'dev-insecure-secret-change-me'
const SITE_URL = process.env.SITE_URL || 'https://zobayer-portfolio.vercel.app'

export type PendingMessage = {
  name: string
  email: string
  message: string
  exp: number
}

export function signPayload(payload: PendingMessage): string {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const sig = crypto.createHmac('sha256', VERIFY_SECRET).update(body).digest('base64url')
  return `${body}.${sig}`
}

export function verifyToken(token: string): PendingMessage | null {
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

export function sendWeb3Form(to: string, fields: Record<string, string>) {
  return fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, ...fields }),
  }).then((r) => r.json())
}

export const OWNER = OWNER_EMAIL
export const BASE_URL = SITE_URL
