import { db } from '~~/server/db'
import { blogs } from '~~/server/db/schema'
import { eq } from 'drizzle-orm'
import { deleteBlogImage } from './_imageUtils'

export default defineEventHandler(async (event) => {
  const targetSlug = getRouterParam(event, 'slug')
  if (!targetSlug) throw createError({ statusCode: 400, message: 'slug is required' })

  const existingBlog = await db.query.blogs.findFirst({
    where: (t, { eq }) => eq(t.slug, targetSlug),
  })

  if (!existingBlog) {
    throw createError({ statusCode: 404, message: 'Blog not found' })
  }

  if (existingBlog.image) {
    await deleteBlogImage(existingBlog.image)
  }
  if (existingBlog.authorImage) {
    await deleteBlogImage(existingBlog.authorImage)
  }

  const [deleted] = await db
    .delete(blogs)
    .where(eq(blogs.slug, targetSlug))
    .returning()

  return deleted
})
