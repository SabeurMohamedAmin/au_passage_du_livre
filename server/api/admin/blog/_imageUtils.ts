import { writeFile, mkdir, unlink } from 'node:fs/promises'
import { join, extname, resolve } from 'node:path'
import { randomUUID } from 'node:crypto'
import type { MultiPartData } from 'h3'

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp'])
const MAX_BYTES    = 4 * 1024 * 1024
const UPLOAD_DIR   = 'uploads/blogs/photos'

const getBaseDir = () => join(process.cwd(), 'public', UPLOAD_DIR)

export async function saveBlogImage(file: MultiPartData): Promise<string> {
  if (!file?.data)                         throw createError({ statusCode: 400, message: 'No file provided' })
  if (!ALLOWED_MIME.has(file.type ?? '')) throw createError({ statusCode: 415, message: 'Only JPEG, PNG and WebP allowed' })
  if (file.data.length > MAX_BYTES)       throw createError({ statusCode: 413, message: 'File exceeds 4 MB limit' })

  const ext      = extname(file.filename ?? '').toLowerCase() || '.jpg'
  const filename = `${randomUUID()}${ext}`
  const diskDir  = getBaseDir()

  await mkdir(diskDir, { recursive: true })
  await writeFile(join(diskDir, filename), file.data)

  return `/${UPLOAD_DIR}/${filename}`
}

export async function deleteBlogImage(url: string): Promise<void> {
  if (!url?.startsWith(`/${UPLOAD_DIR}/`)) return

  const diskDir  = getBaseDir()
  const filePath = resolve(process.cwd(), 'public', `.${url}`)

  if (!filePath.startsWith(diskDir)) return

  try { await unlink(filePath) } catch { /* already gone */ }
}
