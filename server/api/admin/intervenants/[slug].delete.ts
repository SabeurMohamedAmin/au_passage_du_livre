import { db } from '~~/server/db'
import { intervenants } from '~~/server/db/schema'
import { eq } from 'drizzle-orm'
import { deleteIntervenantImage } from './_imageUtils'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) throw createError({ statusCode: 400, message: 'slug is required' })

  // ── Fetch first so we have the image URL before deleting ──────────────────
  const existing = await db
    .select()
    .from(intervenants)
    .where(eq(intervenants.slug, slug))
    .get()

  if (!existing) throw createError({ statusCode: 404, message: `Intervenant "${slug}" not found` })

  // ── Delete image from disk BEFORE removing the DB row ─────────────────────
  if (existing.image) await deleteIntervenantImage(existing.image)

  // ── Delete from DB ─────────────────────────────────────────────────────────
  await db.delete(intervenants).where(eq(intervenants.slug, slug))

  return { success: true, deleted: existing.name }
})