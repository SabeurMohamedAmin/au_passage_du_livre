// server/api/admin/intervenants/index.get.ts
import { db } from '~~/server/db'
import { intervenants } from '~~/server/db/schema'
import { asc } from 'drizzle-orm'

export default defineEventHandler(async () => {
  const all = await db
    .select()
    .from(intervenants)
    .orderBy(asc(intervenants.name))

  return all
})