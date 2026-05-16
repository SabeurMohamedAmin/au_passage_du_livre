import { db } from '~~/server/db'
import { blogs } from '~~/server/db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 400, message: 'slug is required' })
  }

  const blog = await db
    .select()
    .from(blogs)
    .where(eq(blogs.slug, slug))
    .get()

  if (!blog) {
    throw createError({ statusCode: 404, message: 'Blog not found' })
  }

  return blog
})
