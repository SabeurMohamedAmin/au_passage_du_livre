import { desc } from 'drizzle-orm'
import { db } from '~~/server/db'
import { events } from '~~/server/db/schema/events'

// Admin: Récupère tous les événements avec leurs relations complètes
export default defineEventHandler(async () => {
  return db.query.events.findMany({
    with: {
      translations: true,
      documents: true,
      intervenants: {
        with: { intervenant: true }
      },
      sessions: {
        with: {
          translations: true,
          intervenants: { with: { intervenant: true } }
        }
      }
    },
    orderBy: [desc(events.createdAt)]
  })
})