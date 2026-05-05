import { defineEventHandler } from 'h3'
import { db } from '~~/server/db'

const PAGE_ID = 'home-page-singleton'

export default defineEventHandler(async () => {
  const page = await db.query.homePage.findFirst({
    where: (t, { eq }) => eq(t.id, PAGE_ID),
    with: {
      translations: true,
      images: true,       // ← this was missing
    },
  })

  return {
    success: true,
    data: page ?? null,
  }
})