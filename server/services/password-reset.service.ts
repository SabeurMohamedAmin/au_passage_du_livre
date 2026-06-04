// server/services/password-reset.service.ts
import { db } from '~~/server/db' // Garder votre chemin original
import { users } from '~~/server/db/schema/users'
import { passwordResets } from '~~/server/db/schema/password-resets' // Garder le 's' si c'est le bon nom
import { hashPassword, generateResetToken, sha256 } from '~~/server/utils/auth'
import { eq } from 'drizzle-orm'
import { sendPasswordResetEmail } from './email.service'

export async function requestPasswordReset(email: string) {
  const normalizedEmail = email.toLowerCase().trim()
  console.log('[PasswordResetService] 🔍 Requesting reset for email:', normalizedEmail)
  
  // 1. Trouver l'utilisateur
  const user = await db.select().from(users)
    .where(eq(users.email, normalizedEmail))
    .then(res => res[0])

  if (!user) {
    console.warn('[PasswordResetService] ⚠️ User NOT found in database for:', normalizedEmail)
    return // Sécurité : on ne révèle pas si l'email existe
  }
  
  console.log('[PasswordResetService] ✅ User found:', user.id)

  // 2. Générer le token
  const { raw, hashed } = generateResetToken()
  const expiresAt = Math.floor(Date.now() / 1000) + 3600

  // 3. Invalider les anciens tokens
  await db.delete(passwordResets).where(eq(passwordResets.userId, user.id))

  // 4. Stocker le nouveau token
  await db.insert(passwordResets).values({
    userId: user.id,
    token: hashed,
    expiresAt,
  })
  console.log('[PasswordResetService] 💾 Token stored in DB')

  // 5. Envoyer l'email
  try {
    await sendPasswordResetEmail(user.email, raw)
  } catch (error) {
    console.error('[PasswordResetService] ❌ Email sending failed:', error)
  }
}

export async function resetPassword(token: string, newPassword: string) {
  const hashedToken = sha256(token)
  const now = Math.floor(Date.now() / 1000)

  // 1. Trouver l'enregistrement de réinitialisation
  const resetRecord = await db.select().from(passwordResets)
    .where(eq(passwordResets.token, hashedToken))
    .then(res => res[0])

  if (!resetRecord) throw new Error('INVALID_TOKEN')
  if (resetRecord.usedAt) throw new Error('TOKEN_USED')
  if (resetRecord.expiresAt < now) throw new Error('TOKEN_EXPIRED')

  // 2. Mettre à jour le mot de passe de l'utilisateur
  const hashedPassword = await hashPassword(newPassword)
  await db.update(users)
    .set({ hashedPassword })
    .where(eq(users.id, resetRecord.userId))

  // 3. Marquer le token comme utilisé
  await db.update(passwordResets)
    .set({ usedAt: new Date() })
    .where(eq(passwordResets.id, resetRecord.id))
  
  console.log('[PasswordResetService] ✅ Password reset successfully for user:', resetRecord.userId)
}