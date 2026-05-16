import { db } from '~~/server/db'
import { blogs, type NewBlog } from '~~/server/db/schema'
import { saveBlogImage } from './_imageUtils'

export default defineEventHandler(async (event) => {
  const contentType = getHeader(event, 'content-type') ?? ''

  let body: any
  let imageUrl: string | null = null
  let authorImageUrl: string | null = null

  if (contentType.includes('multipart/form-data')) {
    const parts = await readMultipartFormData(event)
    body = JSON.parse(parts?.find(p => p.name === 'data')?.data.toString() ?? '{}')
    
    const file = parts?.find(p => p.name === 'file')
    if (file) imageUrl = await saveBlogImage(file)
    
    const authorFile = parts?.find(p => p.name === 'authorFile')
    if (authorFile) authorImageUrl = await saveBlogImage(authorFile)
  } else {
    body = await readBody(event)
    imageUrl = body.image ?? null
    authorImageUrl = body.authorImage ?? null
  }

  const { title, slug, summary, content, author, category, date } = body

  if (!title?.trim()) throw createError({ statusCode: 422, message: 'title is required' })
  if (!slug?.trim()) throw createError({ statusCode: 422, message: 'slug is required' })
  if (!summary?.trim()) throw createError({ statusCode: 422, message: 'summary is required' })
  if (!content?.trim()) throw createError({ statusCode: 422, message: 'content is required' })
  if (!author?.trim()) throw createError({ statusCode: 422, message: 'author is required' })
  
  const existing = await db.query.blogs.findFirst({
    where: (t, { eq }) => eq(t.slug, slug.trim()),
  })
  if (existing) throw createError({ statusCode: 409, message: `Slug "${slug}" is already taken` })

  const payload: NewBlog = {
    title: title.trim(),
    slug: slug.trim(),
    summary: summary.trim(),
    content: content.trim(),
    author: author.trim(),
    category: category?.trim() || 'news',
    date: date ? new Date(date) : new Date(),
    image: imageUrl,
    authorImage: authorImageUrl,
  }

  const [created] = await db.insert(blogs).values(payload).returning()
  return created
})
