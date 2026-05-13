// server/api/events/[slug].get.ts
//
// Public: fetches a single event by its FR translation slug.

import { db } from '~~/server/db'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 400, message: 'Le slug est requis.' })
  }

  // Find the translation that matches this slug
  const translation = await db.query.eventTranslations.findFirst({
    where: (table, { eq }) => eq(table.slug, slug),
  })

  if (!translation) {
    throw createError({ statusCode: 404, message: 'Événement introuvable.' })
  }

  // Fetch the full event by its ID
  const fullEvent = await db.query.events.findFirst({
    where: (table, { eq }) => eq(table.id, translation.eventId),
    with: {
      translations: true,
      documents:    true,
      intervenants: { with: { intervenant: true } },
      sessions: {
        with: {
          translations: true,
          intervenants: { with: { intervenant: true } },
        },
      },
    },
  })

  if (!fullEvent) {
    throw createError({ statusCode: 404, message: 'Événement introuvable.' })
  }

  return fullEvent
})
