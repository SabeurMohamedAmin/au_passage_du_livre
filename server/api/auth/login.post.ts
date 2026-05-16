import { db } from '~~/server/db'
import { loginAttempts } from '~~/server/db/schema/login-attempts'
import { eq } from 'drizzle-orm'
import { verifyPassword } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)
  const ip  = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  const now = Math.floor(Date.now() / 1000)

  if (!email?.trim() || !password) {
    throw createError({ statusCode: 400, message: 'Email et mot de passe requis.' })
  }

  // ── Rate-limit : 5 échecs max en 15 min par IP ────────────────────────
  const attempts = await db
    .select()
    .from(loginAttempts)
    .where(eq(loginAttempts.ip, ip))

  const recentFails = attempts.filter(a => !a.success && a.timestamp > now - 900).length
  if (recentFails >= 5) {
    throw createError({ statusCode: 429, message: 'Trop de tentatives. Réessayez dans 15 minutes.' })
  }

  const normalised = email.toLowerCase().trim()

  // ── Trouver l'utilisateur ─────────────────────────────────────────────
  const user = await db.query.users.findFirst({
    where: (t, { eq }) => eq(t.email, normalised),
  })

  const log = (success: boolean) =>
    db.insert(loginAttempts).values({ userId: user?.id ?? null, ip, timestamp: now, success: success ? 1 : 0 })

  // Vérifications : compte existant, mot de passe configuré, accès admin
  if (!user || !user.hashedPassword) {
    await log(false)
    throw createError({ statusCode: 401, message: 'Email ou mot de passe incorrect.' })
  }

  if (!user.isAdmin) {
    await log(false)
    // Message générique pour ne pas révéler que le compte existe
    throw createError({ statusCode: 401, message: 'Email ou mot de passe incorrect.' })
  }

  const valid = await verifyPassword(password, user.hashedPassword)
  if (!valid) {
    await log(false)
    throw createError({ statusCode: 401, message: 'Email ou mot de passe incorrect.' })
  }

  await log(true)

  // ── Session nuxt-auth-utils ───────────────────────────────────────────
  await setUserSession(event, {
    user: {
      id:          user.id,
      email:       user.email,
      displayName: user.displayName,
      isAdmin:     true,
    },
    loggedInAt: new Date().toISOString(),
  })

  return { ok: true }
})