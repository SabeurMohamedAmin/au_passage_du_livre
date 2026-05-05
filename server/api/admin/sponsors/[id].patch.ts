import { createError, defineEventHandler, getRouterParam, readBody } from 'h3'
import { and, eq } from 'drizzle-orm'
import { db } from '~~/server/db'
import { sponsors, sponsorTranslations } from '~~/server/db/schema/sponsors'
import crypto from 'node:crypto'

type UpdateSponsorBody = {
  slug?: string
  category?: string
  color?: string | null
  logoUrl?: string | null
  website?: string | null
  addressText?: string | null
  displayOrder?: number
  isPublished?: boolean
  name?: string
  description?: string | null
  translations?: Array<{
    locale: string
    name: string
    tagline?: string | null
    description?: string | null
  }>
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody<UpdateSponsorBody>(event)

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'missing sponsor id' })
  }

  const existing = await db.query.sponsors.findFirst({
    where: (table, { eq }) => eq(table.id, id),
    with: {
      translations: true,
    },
  })

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'sponsor not found' })
  }

  if (body.slug?.trim()) {
    const slugOwner = await db.query.sponsors.findFirst({
      where: (table, { eq }) => eq(table.slug, body.slug!.trim()),
    })

    if (slugOwner && slugOwner.id !== id) {
      throw createError({
        statusCode: 409,
        statusMessage: 'a sponsor with this slug already exists',
      })
    }
  }

  const cleanedTranslations = body.translations?.map((translation) => ({
    locale: translation.locale?.trim() || '',
    name: translation.name?.trim() || '',
    tagline: translation.tagline?.trim() || null,
    description: translation.description?.trim() || null,
  }))

  if (cleanedTranslations) {
    if (cleanedTranslations.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'translations cannot be empty',
      })
    }

    for (const translation of cleanedTranslations) {
      if (!translation.locale) {
        throw createError({
          statusCode: 400,
          statusMessage: 'each translation must have a locale',
        })
      }

      if (!translation.name) {
        throw createError({
          statusCode: 400,
          statusMessage: 'each translation must have a name',
        })
      }
    }

    const locales = cleanedTranslations.map((t) => t.locale)
    const uniqueLocales = new Set(locales)

    if (uniqueLocales.size !== locales.length) {
      throw createError({
        statusCode: 400,
        statusMessage: 'translations contain duplicate locales',
      })
    }
  }

  const fallbackTranslation =
    cleanedTranslations?.[0] ??
    existing.translations[0] ?? {
      locale: 'fr',
      name: existing.name,
      tagline: null,
      description: existing.description ?? null,
    }

  const now = new Date()

  await db.transaction(async (tx) => {
    await tx
      .update(sponsors)
      .set({
        slug: body.slug?.trim() || existing.slug,
        category: body.category?.trim() || existing.category,
        color: body.color === undefined ? existing.color : body.color,
        logoUrl: body.logoUrl === undefined ? existing.logoUrl : body.logoUrl,
        website: body.website === undefined ? existing.website : body.website,
        addressText:
          body.addressText === undefined ? existing.addressText : body.addressText,
        displayOrder:
          body.displayOrder === undefined
            ? existing.displayOrder
            : Number(body.displayOrder),
        isPublished:
          body.isPublished === undefined ? existing.isPublished : body.isPublished,
        name: body.name?.trim() || fallbackTranslation.name,
        description:
          body.description === undefined
            ? existing.description
            : body.description?.trim() || fallbackTranslation.description || null,
        updatedAt: now,
      })
      .where(eq(sponsors.id, id))

    if (cleanedTranslations) {
      await tx.delete(sponsorTranslations).where(eq(sponsorTranslations.sponsorId, id))

      await tx.insert(sponsorTranslations).values(
        cleanedTranslations.map((translation) => ({
          id: crypto.randomUUID(),
          sponsorId: id,
          locale: translation.locale,
          name: translation.name,
          tagline: translation.tagline,
          description: translation.description,
        })),
      )
    }
  })

  const updatedSponsor = await db.query.sponsors.findFirst({
    where: (table, { eq }) => eq(table.id, id),
    with: {
      translations: true,
    },
  })

  return {
    ok: true,
    sponsor: updatedSponsor,
  }
})