// server/api/admin/events/[id].patch.ts
//
// Updates an event and all its child relations in a single transaction.
// Strategy: update core fields, then delete-and-reinsert child tables.

import { eq } from 'drizzle-orm'
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
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  // For non-Latin scripts (Arabic, etc.), slug may be empty
  return slug || `event-${Date.now()}`
}

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
  const id   = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)

  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, message: 'ID de l\'événement invalide.' })
  }

  // --- If marking as "next event", unmark all others first ------------------

  if (body.isNextEvent) {
    await db.update(events).set({ isNextEvent: false })
  }

  // --- Transactional update -------------------------------------------------

  await db.transaction(async (tx) => {

    // 1. Update core event fields
    const [updated] = await tx
      .update(events)
      .set({
        isNextEvent:  body.isNextEvent  ?? false,
        coverImage:   body.coverImage   ?? '',
        startDate:    body.startDate,
        endDate:      body.endDate      ?? '',
        time:         body.time         ?? '',
        locationName: body.locationName ?? '',
        address:      body.address      ?? '',
        entranceType: body.entranceType ?? 'Entrée gratuite',
        website:      body.website      ?? '',
        updatedAt:    new Date(),
      })
      .where(eq(events.id, id))
      .returning()

    if (!updated) {
      throw createError({ statusCode: 404, message: 'Événement introuvable.' })
    }

    // 2. Upsert translations (all locales)
    const translations: any[] = body.translations ?? []
    for (const t of translations) {
      if (!t.title) continue
      const locale = t.locale ?? 'fr'

      const existing = await tx.query.eventTranslations.findFirst({
        where: (table, { and, eq }) =>
          and(eq(table.eventId, id), eq(table.locale, locale)),
      })

      if (existing) {
        await tx
          .update(eventTranslations)
          .set({
            title:        t.title,
            subtitle:     t.subtitle     ?? '',
            slug:         t.slug         || toSlug(t.title),
            shortSummary: t.shortSummary ?? '',
            about:        t.about        ?? '',
            highlights:   t.highlights   ?? '',
          })
          .where(eq(eventTranslations.id, existing.id))
      } else {
        await tx.insert(eventTranslations).values({
          eventId:      id,
          locale,
          title:        t.title,
          subtitle:     t.subtitle     ?? '',
          slug:         t.slug         || `${toSlug(t.title)}-${Date.now()}`,
          shortSummary: t.shortSummary ?? '',
          about:        t.about        ?? '',
          highlights:   t.highlights   ?? '',
        })
      }
    }

    // 3. Replace event-level intervenants (delete + reinsert)
    await tx.delete(eventIntervenants).where(eq(eventIntervenants.eventId, id))

    const intervenantIds: number[] = body.intervenantIds ?? []
    if (intervenantIds.length > 0) {
      await tx.insert(eventIntervenants).values(
        intervenantIds.map((intId: number, index: number) => ({
          eventId:       id,
          intervenantId: intId,
          sortOrder:     index,
        })),
      )
    }

    // 4. Replace sessions (delete all, then reinsert)
    //    Cascade deletes handle session_translations and session_intervenants
    await tx.delete(eventSessions).where(eq(eventSessions.eventId, id))

    const sessions: any[] = body.sessions ?? []
    for (let i = 0; i < sessions.length; i++) {
      const s = sessions[i]

      const [createdSession] = await tx.insert(eventSessions).values({
        eventId:   id,
        date:      s.date,
        time:      s.time      ?? '',
        location:  s.location  ?? '',
        sortOrder: i,
      }).returning({ id: eventSessions.id })

      const sessionId = createdSession.id

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

      const sessionIntervenantIds: number[] = s.intervenantIds ?? []
      if (sessionIntervenantIds.length > 0) {
        await tx.insert(eventSessionIntervenants).values(
          sessionIntervenantIds.map((intId: number) => ({
            sessionId,
            intervenantId: intId,
          })),
        )
      }
    }

    // 5. Replace documents (delete + reinsert)
    await tx.delete(eventDocuments).where(eq(eventDocuments.eventId, id))

    const docs: any[] = body.documents ?? []
    if (docs.length > 0) {
      await tx.insert(eventDocuments).values(
        docs.map((d: any, index: number) => ({
          eventId:   id,
          label:     d.label,
          url:       d.url,
          sortOrder: index,
        })),
      )
    }
  })

  // --- Return the updated event with all nested relations -------------------

  return findFullEvent(id)
})