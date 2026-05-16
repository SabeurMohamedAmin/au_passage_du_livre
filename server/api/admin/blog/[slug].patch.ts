import { db } from '~~/server/db'
import { blogs } from '~~/server/db/schema'
import { eq, ne, and } from 'drizzle-orm'
import { saveBlogImage, deleteBlogImage } from './_imageUtils'

export default defineEventHandler(async (event) => {
  const targetSlug = getRouterParam(event, 'slug')
  if (!targetSlug) throw createError({ statusCode: 400, message: 'slug is required' })

  const existingBlog = await db.query.blogs.findFirst({
    where: (t, { eq }) => eq(t.slug, targetSlug),
  })

  if (!existingBlog) throw createError({ statusCode: 404, message: 'Blog not found' })

  const contentType = getHeader(event, 'content-type') ?? ''
  let body: any
  let imageUrl: string | undefined
  let authorImageUrl: string | undefined

  if (contentType.includes('multipart/form-data')) {
    const parts = await readMultipartFormData(event)
    body = JSON.parse(parts?.find(p => p.name === 'data')?.data.toString() ?? '{}')
    
    const file = parts?.find(p => p.name === 'file')
    if (file) {
      imageUrl = await saveBlogImage(file)
      if (existingBlog.image) await deleteBlogImage(existingBlog.image)
    }
    
    const authorFile = parts?.find(p => p.name === 'authorFile')
    if (authorFile) {
      authorImageUrl = await saveBlogImage(authorFile)
      if (existingBlog.authorImage) await deleteBlogImage(existingBlog.authorImage)
    }
  } else {
    body = await readBody(event)
    if (body.image !== undefined) imageUrl = body.image
    if (body.authorImage !== undefined) authorImageUrl = body.authorImage
  }

  const { title, slug, summary, content, author, category, date } = body

  // Check unique slug if it's changing
  if (slug && slug.trim() !== targetSlug) {
    const conflict = await db.query.blogs.findFirst({
      where: (t, { eq }) => eq(t.slug, slug.trim()),
    })
    if (conflict) throw createError({ statusCode: 409, message: `Slug "${slug}" is already taken` })
  }

  const payload: Partial<typeof existingBlog> = { updatedAt: new Date() }
  if (title !== undefined) payload.title = title.trim()
  if (slug !== undefined) payload.slug = slug.trim()
  if (summary !== undefined) payload.summary = summary.trim()
  if (content !== undefined) payload.content = content.trim()
  if (author !== undefined) payload.author = author.trim()
  if (category !== undefined) payload.category = category.trim()
  if (date !== undefined) payload.date = new Date(date)
  if (imageUrl !== undefined) payload.image = imageUrl
  if (authorImageUrl !== undefined) payload.authorImage = authorImageUrl

  const [updated] = await db
    .update(blogs)
    .set(payload)
    .where(eq(blogs.slug, targetSlug))
    .returning()

  return updated
})
