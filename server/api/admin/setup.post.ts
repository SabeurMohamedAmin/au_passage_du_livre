// server/api/admin/setup.post.ts
import { db } from '~~/server/db'
import { users } from '~~/server/db/schema/users'
import { eq } from 'drizzle-orm'
import { hashPassword } from '~~/server/utils/auth'

const ADMIN_EMAIL = 'aminsab@outlook.fr'

export default defineEventHandler(async (event) => {
  // Bloquer si un admin existe déjà
  const existing = await db.query.users.findFirst({
    where: (t, { eq }) => eq(t.email, ADMIN_EMAIL),
  })

  if (existing?.isAdmin) {
    throw createError({ statusCode: 403, message: 'Un compte admin existe déjà.' })
  }

  const { password, confirmPassword } = await readBody(event)

  if (!password || password.length < 10) {
    throw createError({ statusCode: 400, message: 'Mot de passe trop court (10 caractères min).' })
  }

  if (password !== confirmPassword) {
    throw createError({ statusCode: 400, message: 'Les mots de passe ne correspondent pas.' })
  }

  const hashed = await hashPassword(password)

  if (existing) {
    await db.update(users)
      .set({ hashedPassword: hashed, isAdmin: true, updatedAt: new Date() })
      .where(eq(users.id, existing.id))
  } else {
    await db.insert(users).values({
      email:          ADMIN_EMAIL,
      displayName:    'Amin',
      hashedPassword: hashed,
      isAdmin:        true,
      emailVerified:  new Date(),
    })
  }

  return { ok: true }
})