// server/api/events/index.get.ts
//
// Public: lists all events with full nested relations, ordered by start date.

import { desc } from 'drizzle-orm'
import { db }   from '~~/server/db'
import { events } from '~~/server/db/schema/events'

export default defineEventHandler(async () => {
  return db.query.events.findMany({
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
    orderBy: [desc(events.startDate)],
  })
})