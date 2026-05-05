// server/api/admin/sponsors/index.get.ts
import { defineEventHandler, getQuery } from 'h3'
import { asc } from 'drizzle-orm'
import { db } from '~~/server/db'
import { sponsors } from '~~/server/db/schema/sponsors'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const includeTranslations = query.include === 'translations'

  // ✅ Always fetch all sponsors with all translations for the admin
  const rows = await db.query.sponsors.findMany({
    with: {
      translations: true, // ✅ returns full translations array
    },
    orderBy: [asc(sponsors.displayOrder), asc(sponsors.name)],
  })

  // If a specific locale is requested (public page), flatten to single translation
  if (!includeTranslations && query.locale) {
    const locale = typeof query.locale === 'string' ? query.locale.trim() : 'fr'

    const data = rows.map((row) => {
      const translation = row.translations?.find((t) => t.locale === locale)
      return {
        id: row.id,
        slug: row.slug,
        name: translation?.name ?? row.name,
        tagline: translation?.tagline ?? null,
        description: translation?.description ?? row.description ?? null,
        category: row.category,
        color: row.color,
        logoUrl: row.logoUrl,
        website: row.website,
        addressText: row.addressText,
        displayOrder: row.displayOrder,
        isPublished: row.isPublished,
        locale,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      }
    })

    return { success: true, data }
  }

  // ✅ Default: return full sponsors with all translations (used by admin)
  const data = rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description ?? null,
    category: row.category,
    color: row.color,
    logoUrl: row.logoUrl,
    website: row.website,
    addressText: row.addressText,
    displayOrder: row.displayOrder,
    isPublished: row.isPublished,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    translations: row.translations ?? [], // ✅ full array for the edit form
  }))

  return { success: true, data }
})