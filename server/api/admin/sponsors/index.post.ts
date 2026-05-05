import { createError, defineEventHandler, readBody } from 'h3'
import { sponsors, sponsorTranslations } from '~~/server/db/schema/sponsors'
import { db } from '~~/server/db'
import { sql, gte, eq } from 'drizzle-orm'
import crypto from 'node:crypto'

type CreateSponsorBody = {
  slug: string
  category: string
  color?: string | null
  logoUrl?: string | null
  website?: string | null
  addressText?: string | null
  displayOrder?: number
  isPublished?: boolean
  name?: string
  description?: string | null
  translations: Array<{
    locale: string
    name: string
    tagline?: string | null
    description?: string | null
  }>
}

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateSponsorBody>(event)

  // basic validation
  if (!body?.slug || !body.slug.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'slug is required' })
  }

  if (!body?.category || !body.category.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'category is required' })
  }

  if (!Array.isArray(body.translations) || body.translations.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'at least one translation is required' })
  }

  for (const translation of body.translations) {
    if (!translation.locale?.trim()) {
      throw createError({ statusCode: 400, statusMessage: 'each translation must have a locale' })
    }
    if (!translation.name?.trim()) {
      throw createError({ statusCode: 400, statusMessage: 'each translation must have a name' })
    }
  }

  // prevent duplicate locales in the same request
  const locales = body.translations.map((t) => t.locale)
  const uniqueLocales = new Set(locales)
  if (uniqueLocales.size !== locales.length) {
    throw createError({ statusCode: 400, statusMessage: 'translations contain duplicate locales' })
  }

  // check existing slug
  const existingSponsor = await db.query.sponsors.findFirst({
    where: (table, { eq }) => eq(table.slug, body.slug),
  })

  if (existingSponsor) {
    throw createError({ statusCode: 409, statusMessage: 'a sponsor with this slug already exists' })
  }

  const firstTranslation = body.translations[0]

  if (!firstTranslation) {
    throw createError({ statusCode: 400, statusMessage: 'at least one translation is required' })
  }

  // resolve target order — append at end if not provided
  const orderResult = await db
    .select({ maxOrder: sql<number | null>`MAX(${sponsors.displayOrder})` })
    .from(sponsors)
  const maxOrder = ((orderResult[0]?.maxOrder as number | null) ?? -1)
  const targetOrder = body.displayOrder ?? maxOrder + 1

  const sponsorId = crypto.randomUUID()
  const now = new Date();

  await db.transaction(async (tx) => {
  // 1. shift all sponsors at targetOrder and above up by 1 to make room
  if (body.displayOrder !== undefined) {
    await tx
      .update(sponsors)
      .set({ displayOrder: sql`${sponsors.displayOrder} + 1` })
      .where(gte(sponsors.displayOrder, targetOrder))
  }

  // 2. insert the new sponsor at the target position
  await tx.insert(sponsors).values({
    id: sponsorId,
    slug: body.slug.trim(),
    category: body.category.trim(),
    color: body.color ?? null,
    logoUrl: body.logoUrl ?? null,
    website: body.website ?? null,
    addressText: body.addressText ?? null,
    displayOrder: targetOrder,
    isPublished: body.isPublished ?? true,
    name: body.name?.trim() || firstTranslation.name.trim(),
    description: body.description ?? null,
    createdAt: now,
    updatedAt: now,
  })

  await tx.insert(sponsorTranslations).values(
    body.translations.map((translation) => ({
      id: crypto.randomUUID(),
      sponsorId,
      locale: translation.locale.trim(),
      name: translation.name.trim(),
      tagline: translation.tagline ?? null,
      description: translation.description ?? null,
    })),
  )

  // 3. resequence the entire list cleanly — fixes any pre-existing gaps or duplicates
  const all = await tx.query.sponsors.findMany({
    orderBy: (table, { asc }) => [asc(table.displayOrder), asc(table.createdAt)],
  })

  for (const [i, sponsor] of all.entries()) {
    await tx
      .update(sponsors)
      .set({ displayOrder: i })
      .where(eq(sponsors.id, sponsor.id))
  }
})


  const createdSponsor = await db.query.sponsors.findFirst({
    where: (table, { eq }) => eq(table.id, sponsorId),
    with: { translations: true },
  })

  return {
    ok: true,
    sponsor: createdSponsor,
  }
})