import { createHash, randomBytes, scrypt, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'

const scryptAsync = promisify(scrypt)

// ── Hachage mot de passe (scrypt natif Node, sans dépendance) ─────────────
export async function hashPassword(plain: string): Promise<string> {
  const salt = randomBytes(16).toString('hex')
  const buf  = (await scryptAsync(plain, salt, 64)) as Buffer
  return `${salt}:${buf.toString('hex')}`
}

export async function verifyPassword(plain: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false
  const buf    = (await scryptAsync(plain, salt, 64)) as Buffer
  const stored_buf = Buffer.from(hash, 'hex')
  return timingSafeEqual(buf, stored_buf)
}

// ── Token de réinitialisation ─────────────────────────────────────────────
export function generateResetToken(): { raw: string; hashed: string } {
  const raw = randomBytes(32).toString('hex')
  return { raw, hashed: sha256(raw) }
}

export function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}