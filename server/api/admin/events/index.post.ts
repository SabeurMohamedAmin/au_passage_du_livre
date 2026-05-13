// server/api/admin/events/index.post.ts
//
// Creates an event with all its relations in a single transaction:
//   events → eventTranslations → eventIntervenants → eventSessions
//         → eventSessionTranslations → eventSessionIntervenants → eventDocuments

import { db } from '~~/server/db'
import {
  events,
  eventTranslations,
  eventIntervenants,
  eventSessions,
  eventSessionTranslations,
  eventSessionIntervenants,
  eventDocuments,
} from '~~/server/db/schema/events'

// ── Helpers ───────────────────────────────────────────────────────────────────

function toSlug(text: string): string {
  const slug = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')   // strip accents
    .replace(/[^a-z0-9]+/g, '-')      // non-alphanum → dash
    .replace(/(^-|-$)/g, '')           // trim leading/trailing dashes
  // For non-Latin scripts (Arabic, etc.), slug may be empty
  return slug || `event-${Date.now()}`
}

function uniqueSlug(title: string): string {
  const base = toSlug(title)
  return `${base}-${Date.now()}`
}

// ── Helpers to query the full event with all nested relations ──────────────────

function findFullEvent(eventId: number) {
  return db.query.events.findFirst({
    where: (table, { eq }) => eq(table.id, eventId),
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
}

// ── Handler ───────────────────────────────────────────────────────────────────

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // --- Validation -----------------------------------------------------------

  const translations: any[] = body.translations ?? []
  if (!translations.length || !translations.some((t: any) => t.title)) {
    throw createError({ statusCode: 400, message: 'Au moins une traduction avec un titre est requise.' })
  }

  // --- If this event is the "next event", unmark all others -----------------

  if (body.isNextEvent) {
    await db.update(events).set({ isNextEvent: false })
  }

  // --- Transactional insert -------------------------------------------------

  const newEventId = await db.transaction(async (tx) => {

    // 1. Core event
    const [created] = await tx.insert(events).values({
      isNextEvent:  body.isNextEvent  ?? false,
      coverImage:   body.coverImage   ?? '',
      startDate:    body.startDate,
      endDate:      body.endDate      ?? '',
      time:         body.time         ?? '',
      locationName: body.locationName ?? '',
      address:      body.address      ?? '',
      entranceType: body.entranceType ?? 'Entrée gratuite',
      website:      body.website      ?? '',
    }).returning({ id: events.id })

    const eventId = created?.id ?? 0

    // 2. Translations (all locales)
    for (const t of translations) {
      if (!t.title) continue
      await tx.insert(eventTranslations).values({
        eventId,
        locale:       t.locale       ?? 'fr',
        title:        t.title,
        subtitle:     t.subtitle     ?? '',
        slug:         t.slug         || uniqueSlug(t.title),
        shortSummary: t.shortSummary ?? '',
        about:        t.about        ?? '',
        highlights:   t.highlights   ?? '',
      })
    }

    // 3. Event-level intervenants
    const intervenantIds: number[] = body.intervenantIds ?? []
    if (intervenantIds.length > 0) {
      await tx.insert(eventIntervenants).values(
        intervenantIds.map((id: number, index: number) => ({
          eventId,
          intervenantId: id,
          sortOrder:     index,
        })),
      )
    }

    // 4. Sessions (with their translations + intervenants)
    const sessions: any[] = body.sessions ?? []
    for (let i = 0; i < sessions.length; i++) {
      const s = sessions[i]

      const [createdSession] = await tx.insert(eventSessions).values({
        eventId,
        date:      s.date,
        time:      s.time      ?? '',
        location:  s.location  ?? '',
        sortOrder: i,
      }).returning({ id: eventSessions.id })

      const sessionId = createdSession?.id ?? 0

      // Session translations
      const sessionTranslations: any[] = s.translations ?? []
      for (const st of sessionTranslations) {
        if (!st.title && !st.description) continue
        await tx.insert(eventSessionTranslations).values({
          sessionId,
          locale:      st.locale       ?? 'fr',
          title:       st.title        ?? '',
          description: st.description  ?? '',
        })
      }

      // Session intervenants
      const sessionIntervenantIds: number[] = s.intervenantIds ?? []
      if (sessionIntervenantIds.length > 0) {
        await tx.insert(eventSessionIntervenants).values(
          sessionIntervenantIds.map((id: number) => ({
            sessionId,
            intervenantId: id,
          })),
        )
      }
    }

    // 5. Documents
    const docs: any[] = body.documents ?? []
    if (docs.length > 0) {
      await tx.insert(eventDocuments).values(
        docs.map((d: any, index: number) => ({
          eventId,
          label:     d.label,
          url:       d.url,
          sortOrder: index,
        })),
      )
    }

    return eventId
  })

  // --- Return the full event with all nested relations ----------------------

  return findFullEvent(newEventId)
})