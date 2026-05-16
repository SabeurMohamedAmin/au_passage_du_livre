import { db } from '~~/server/db'
import { blogs } from '~~/server/db/schema'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async () => {
  return await db
    .select()
    .from(blogs)
    .orderBy(desc(blogs.date))
    .all()
})
