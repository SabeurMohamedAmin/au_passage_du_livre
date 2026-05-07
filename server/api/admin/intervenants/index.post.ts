import { db } from '~~/server/db'
import { intervenants, type NewIntervenant } from '~~/server/db/schema'
import { saveIntervenantImage } from './_imageUtils'

export default defineEventHandler(async (event) => {
  const contentType = getHeader(event, 'content-type') ?? ''

  let body: any
  let imageUrl: string | null = null

  if (contentType.includes('multipart/form-data')) {
    const parts = await readMultipartFormData(event)
    body        = JSON.parse(parts?.find(p => p.name === 'data')?.data.toString() ?? '{}')
    const file  = parts?.find(p => p.name === 'file')
    if (file) imageUrl = await saveIntervenantImage(file)
  } else {
    body     = await readBody(event)
    imageUrl = body.image ?? null
  }

  // ── Validation ─────────────────────────────────────────────────────────────
  const { name, slug, role } = body
  if (!name?.trim()) throw createError({ statusCode: 422, message: 'name is required' })
  if (!slug?.trim()) throw createError({ statusCode: 422, message: 'slug is required' })
  if (!role?.trim()) throw createError({ statusCode: 422, message: 'role is required' })

  // ── Slug uniqueness check ──────────────────────────────────────────────────
  const existing = await db.query.intervenants.findFirst({
    where: (t, { eq }) => eq(t.slug, slug.trim()),
  })
  if (existing) throw createError({ statusCode: 409, message: `Slug "${slug}" is already taken` })

  const payload: NewIntervenant = {
    name:        name.trim(),
    slug:        slug.trim(),
    role:        role.trim(),
    specialty:   body.specialty?.trim()  ?? '',
    excerpt:     body.excerpt?.trim()    ?? '',
    bio:         body.bio?.trim()        ?? '',
    image:       imageUrl,
    featured:    body.featured           ?? false,
    socialLinks: {
      facebook:  body.socialLinks?.facebook?.trim()  || undefined,
      instagram: body.socialLinks?.instagram?.trim() || undefined,
      twitter:   body.socialLinks?.twitter?.trim()   || undefined,
      website:   body.socialLinks?.website?.trim()   || undefined,
    },
  }

  const [created] = await db.insert(intervenants).values(payload).returning()
  return created
})