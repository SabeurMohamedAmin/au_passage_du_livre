import { db } from '~~/server/db'
import { users } from '~~/server/db/schema/users'
import { passwordResets } from '~~/server/db/schema/password-resets'
import { eq, and, gt, isNull } from 'drizzle-orm'
import { hashPassword, sha256 } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const { token, password } = await readBody(event)
  const now = Math.floor(Date.now() / 1000)

  if (!token || !password || password.length < 8) {
    throw createError({ statusCode: 400, message: 'Token et mot de passe (8 caractères min) requis.' })
  }

  const reset = await db.query.passwordResets.findFirst({
    where: (t, { eq, and, gt, isNull }) =>
      and(eq(t.token, sha256(token)), gt(t.expiresAt, now), isNull(t.usedAt)),
  })

  if (!reset) {
    throw createError({ statusCode: 400, message: 'Lien invalide ou expiré.' })
  }

  const newHash = await hashPassword(password)

  await db.transaction(async (tx) => {
    await tx
      .update(users)
      .set({ hashedPassword: newHash, updatedAt: new Date() })
      .where(eq(users.id, reset.userId))

    await tx
      .update(passwordResets)
      .set({ usedAt: new Date() })
      .where(eq(passwordResets.id, reset.id))
  })

  return { ok: true }
})