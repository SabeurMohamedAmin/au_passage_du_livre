// Crée le compte admin aminsab@outlook.fr
// Appelez UNE SEULE FOIS puis supprimez ou désactivez cette route.
import { db } from '~~/server/db'
import { users } from '~~/server/db/schema/users'
import { eq } from 'drizzle-orm'
import { hashPassword } from '~~/server/utils/auth'

const ADMIN_EMAIL = 'aminsab@outlook.fr'

export default defineEventHandler(async (event) => {
  const config            = useRuntimeConfig()
  const { secret, password } = await readBody(event)

  if (secret !== config.seedSecret) {
    throw createError({ statusCode: 403, message: 'Secret invalide.' })
  }
  if (!password || password.length < 10) {
    throw createError({ statusCode: 400, message: 'Mot de passe trop court (10 caractères min).' })
  }

  const hashed   = await hashPassword(password)
  const existing = await db.query.users.findFirst({
    where: (t, { eq }) => eq(t.email, ADMIN_EMAIL),
  })

  if (existing) {
    // Met à jour le mot de passe et s'assure que isAdmin = true
    await db
      .update(users)
      .set({ hashedPassword: hashed, isAdmin: true, updatedAt: new Date() })
      .where(eq(users.id, existing.id))
    return { ok: true, message: 'Compte admin mis à jour.' }
  }

  await db.insert(users).values({
    email:          ADMIN_EMAIL,
    displayName:    'Amin',
    hashedPassword: hashed,
    isAdmin:        true,
    emailVerified:  new Date(),
  })

  return { ok: true, message: `Compte admin créé pour ${ADMIN_EMAIL}.` }
})