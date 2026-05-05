import { defineEventHandler, getQuery } from 'h3'
import { and, asc, eq } from 'drizzle-orm'
import { db } from '~~/server/db'
import { sponsors, sponsorTranslations } from '~~/server/db/schema/sponsors'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const locale = typeof query.locale === 'string' && query.locale.trim()
    ? query.locale.trim()
    : 'fr'

  const rows = await db
    .select({
      id: sponsors.id,
      slug: sponsors.slug,
      baseName: sponsors.name,
      baseDescription: sponsors.description,
      category: sponsors.category,
      color: sponsors.color,
      logoUrl: sponsors.logoUrl,
      website: sponsors.website,
      addressText: sponsors.addressText,
      displayOrder: sponsors.displayOrder,
      isPublished: sponsors.isPublished,

      translatedName: sponsorTranslations.name,
      translatedTagline: sponsorTranslations.tagline,
      translatedDescription: sponsorTranslations.description,
      translatedLocale: sponsorTranslations.locale,
    })
    .from(sponsors)
    .leftJoin(
      sponsorTranslations,
      and(
        eq(sponsorTranslations.sponsorId, sponsors.id),
        eq(sponsorTranslations.locale, locale),
      ),
    )
    .where(eq(sponsors.isPublished, true))
    .orderBy(asc(sponsors.displayOrder), asc(sponsors.name))

  const data = rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.translatedName ?? row.baseName,
    tagline: row.translatedTagline ?? null,
    description: row.translatedDescription ?? row.baseDescription ?? null,
    category: row.category,
    color: row.color,
    logoUrl: row.logoUrl,
    website: row.website,
    addressText: row.addressText,
    displayOrder: row.displayOrder,
    isPublished: row.isPublished,
    locale: row.translatedLocale ?? locale,
  }))

  return {
    success: true,
    data,
  }
})