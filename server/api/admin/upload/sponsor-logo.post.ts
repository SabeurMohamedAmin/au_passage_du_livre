// server/api/admin/upload/sponsor-logo.post.ts
import { defineEventHandler, readMultipartFormData, createError } from 'h3'
import { promises as fs } from 'node:fs'
import { join, extname } from 'node:path'
import crypto from 'node:crypto'

export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event)
  
  if (!files || files.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
  }

  // Find the uploaded file (we expect the field name to be 'file')
  const file = files.find(f => f.name === 'file')
  if (!file || !file.filename) {
     throw createError({ statusCode: 400, statusMessage: 'Invalid file data' })
  }

  const ext = extname(file.filename).toLowerCase()
  const allowedExts = ['.png', '.jpg', '.jpeg', '.webp', '.svg']
  
  if (!allowedExts.includes(ext)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid file type. Only images are allowed.' })
  }

  const newFilename = `${crypto.randomUUID()}${ext}`
  const uploadDir = join(process.cwd(), '.data', 'uploads', 'sponsors')

  // Ensure the directory exists
  await fs.mkdir(uploadDir, { recursive: true })
  
  // Write the file to disk
  const filePath = join(uploadDir, newFilename)
  await fs.writeFile(filePath, file.data)

  // Return the URL that maps to your existing [filename].ts GET endpoint
  return {
    success: true,
    url: `/api/admin/upload/sponsors/${newFilename}`
  }
})