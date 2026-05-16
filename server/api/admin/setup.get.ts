// server/api/admin/setup.get.ts
import { db } from '~~/server/db'

const ADMIN_EMAIL = 'aminsab@outlook.fr'

export default defineEventHandler<Promise<{ available: boolean }>>(async () => {
  const existing = await db.query.users.findFirst({
    where: (t, { eq }) => eq(t.email, ADMIN_EMAIL),
  })

  // Disponible seulement si aucun admin n'existe
  return {
    available: !(existing as any)?.isAdmin,
  }
})