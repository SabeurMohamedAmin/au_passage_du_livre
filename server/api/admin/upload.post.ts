/**
 * Handles image file uploads.
 * Saves files to public/uploads/ and returns the public URL.
 *
 * POST /api/admin/upload
 * Body: multipart/form-data with field "file"
 * Returns: { url: '/uploads/filename.ext' }
 */
import { defineEventHandler, readMultipartFormData, createError } from 'h3'
import { writeFile, mkdir } from 'node:fs/promises'
import { join, extname } from 'node:path'
import crypto from 'node:crypto'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE_BYTES = 5 * 1024 * 1024  // 5MB
const UPLOAD_DIR = 'public/uploads'

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event)
  const filePart = parts?.find(p => p.name === 'file')

  if (!filePart?.data) {
    throw createError({ statusCode: 400, statusMessage: 'No file provided' })
  }
  if (!ALLOWED_TYPES.includes(filePart.type ?? '')) {
    throw createError({ statusCode: 400, statusMessage: 'Only JPG, PNG, WebP and GIF are allowed' })
  }
  if (filePart.data.length > MAX_SIZE_BYTES) {
    throw createError({ statusCode: 400, statusMessage: 'File exceeds 5MB limit' })
  }

  // generate a unique filename preserving the original extension
  const ext      = extname(filePart.filename ?? '.jpg')
  const filename = `${crypto.randomUUID()}${ext}`
  const destDir  = join(process.cwd(), UPLOAD_DIR)
  const destPath = join(destDir, filename)

  await mkdir(destDir, { recursive: true })
  await writeFile(destPath, filePart.data)

  return { url: `/uploads/${filename}` }
})