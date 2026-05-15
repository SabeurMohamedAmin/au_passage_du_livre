// server/api/intervenants/[slug].get.ts
import { db } from '~~/server/db'
import { intervenants } from '~~/server/db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) throw createError({ statusCode: 400, message: 'slug is required' })

  const item = await db
    .select()
    .from(intervenants)
    .where(eq(intervenants.slug, slug))
    .get()

  if (!item) throw createError({ statusCode: 404, message: `Intervenant "${slug}" not found` })

  return item
})