import { db } from '~~/server/db'
import { intervenants } from '~~/server/db/schema'
import { eq } from 'drizzle-orm'
import { saveIntervenantImage, deleteIntervenantImage } from './_imageUtils'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 400, message: 'slug is required' })

  const contentType = getHeader(event, 'content-type') ?? ''

  let body: any
  let parts: Awaited<ReturnType<typeof readMultipartFormData>> = undefined

  if (contentType.includes('multipart/form-data')) {
    parts = await readMultipartFormData(event)
    body  = JSON.parse(parts?.find(p => p.name === 'data')?.data.toString() ?? '{}')
  } else {
    body = await readBody(event)
  }

  // ── Check target exists ────────────────────────────────────────────────────
  const existing = await db
    .select().from(intervenants).where(eq(intervenants.slug, slug)).get()

  if (!existing) throw createError({ statusCode: 404, message: `Intervenant "${slug}" not found` })

  // ── Check new slug is free if it changed ──────────────────────────────────
  if (body.slug && body.slug.trim() !== slug) {
    const slugTaken = await db
      .select().from(intervenants).where(eq(intervenants.slug, body.slug.trim())).get()
    if (slugTaken)
      throw createError({ statusCode: 409, message: `Slug "${body.slug}" is already taken` })
  }

  // ── Handle image ───────────────────────────────────────────────────────────
  let imageUrl: string | null | undefined = undefined

  const file = parts?.find(p => p.name === 'file')
  if (file) {
    imageUrl = await saveIntervenantImage(file)
    if (existing.image) await deleteIntervenantImage(existing.image)
  } else if (body.image !== undefined) {
    imageUrl = body.image ?? null
    if (existing.image && existing.image !== imageUrl) {
      await deleteIntervenantImage(existing.image)
    }
  }

  // ── Build partial update ───────────────────────────────────────────────────
  const patch: Partial<typeof intervenants.$inferInsert> = {
    ...(body.name        !== undefined && { name:        body.name.trim()       }),
    ...(body.slug        !== undefined && { slug:        body.slug.trim()       }),
    ...(body.role        !== undefined && { role:        body.role.trim()       }),
    ...(body.specialty   !== undefined && { specialty:   body.specialty.trim()  }),
    ...(body.excerpt     !== undefined && { excerpt:     body.excerpt.trim()    }),
    ...(body.bio         !== undefined && { bio:         body.bio.trim()        }),
    ...(imageUrl         !== undefined && { image:       imageUrl               }),
    ...(body.featured    !== undefined && { featured:    body.featured          }),
    ...(body.socialLinks !== undefined && {
      socialLinks: {
        facebook:  body.socialLinks.facebook?.trim()  || undefined,
        instagram: body.socialLinks.instagram?.trim() || undefined,
        twitter:   body.socialLinks.twitter?.trim()   || undefined,
        website:   body.socialLinks.website?.trim()   || undefined,
      },
    }),
  }

  const [updated] = await db
    .update(intervenants)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(intervenants.slug, slug))
    .returning()

  return updated
})