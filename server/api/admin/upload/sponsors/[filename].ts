import {
  createError,
  defineEventHandler,
  getRouterParam,
  setHeader,
} from 'h3'
import { promises as fs } from 'node:fs'
import { extname, join } from 'node:path'

function getContentType(ext: string) {
  switch (ext.toLowerCase()) {
    case '.png':
      return 'image/png'
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.webp':
      return 'image/webp'
    case '.svg':
      return 'image/svg+xml'
    default:
      return 'application/octet-stream'
  }
}

export default defineEventHandler(async (event) => {
  const filename = getRouterParam(event, 'filename')

  if (!filename) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing filename',
    })
  }

  if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid filename',
    })
  }

  const filePath = join(process.cwd(), '.data', 'uploads', 'sponsors', filename)

  try {
    const file = await fs.readFile(filePath)

    setHeader(event, 'Content-Type', getContentType(extname(filename)))
    setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')

    return file
  } catch {
    throw createError({
      statusCode: 404,
      statusMessage: 'File not found',
    })
  }
})