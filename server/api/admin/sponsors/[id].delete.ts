import { createError, defineEventHandler, getRouterParam } from 'h3'
import { sponsors, sponsorTranslations } from '~~/server/db/schema/sponsors'
import { db } from '~~/server/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'sponsor id is required' })
  }

  const existing = await db.query.sponsors.findFirst({
    where: (table, { eq }) => eq(table.id, id),
  })

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'sponsor not found' })
  }

  await db.transaction(async (tx) => {
    // 1. delete translations + sponsor
    await tx.delete(sponsorTranslations).where(eq(sponsorTranslations.sponsorId, id))
    await tx.delete(sponsors).where(eq(sponsors.id, id))

    // 2. fetch remaining — could be empty, that's fine
    const remaining = await tx.query.sponsors.findMany({
      orderBy: (table, { asc }) => [asc(table.displayOrder), asc(table.createdAt)],
    })

    // 3. resequence 0, 1, 2... — no-op if table is now empty
    for (const [i, sponsor] of remaining.entries()) {
      await tx
        .update(sponsors)
        .set({ displayOrder: i })
        .where(eq(sponsors.id, sponsor.id))
    }
  })

  return { ok: true, deletedId: id }
})