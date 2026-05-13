// server/api/admin/events/[id].delete.ts

import { eq }     from 'drizzle-orm'
import { db }     from '~~/server/db'
import { events } from '~~/server/db/schema/events'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, message: 'Invalid event ID' })
  }

  await db.delete(events).where(eq(events.id, id))

  return { success: true }
})