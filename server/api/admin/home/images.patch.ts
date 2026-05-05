import { defineEventHandler, readBody } from 'h3'
import { eq } from 'drizzle-orm'
import { db } from '~~/server/db'
import { homePage, homeImages } from '~~/server/db/schema/home'
import crypto from 'node:crypto'

const PAGE_ID = 'home-page-singleton'

type ImageInput = {
  slot: 'hero_top_left' | 'hero_bottom_left' | 'hero_top_right' | 'hero_bottom_right'
  url: string | null
  alt: string
}

export default defineEventHandler(async (event) => {
  const { images } = await readBody<{ images: ImageInput[] }>(event)

  // ensure singleton exists
  const existing = await db.query.homePage.findFirst({
    where: (t, { eq }) => eq(t.id, PAGE_ID),
  })
  if (!existing) {
    await db.insert(homePage).values({ id: PAGE_ID })
  }

  // upsert each slot
  for (const img of images) {
    const existingImg = await db.query.homeImages.findFirst({
      where: (t, { and, eq }) =>
        and(eq(t.pageId, PAGE_ID), eq(t.slot, img.slot)),
    })

    if (existingImg) {
      await db
        .update(homeImages)
        .set({ url: img.url, alt: img.alt })
        .where(eq(homeImages.id, existingImg.id))
    } else {
      await db.insert(homeImages).values({
        id:     crypto.randomUUID(),
        pageId: PAGE_ID,
        slot:   img.slot,
        url:    img.url,
        alt:    img.alt,
      })
    }
  }

  await db
    .update(homePage)
    .set({ updatedAt: new Date() })
    .where(eq(homePage.id, PAGE_ID))

  const updated = await db.query.homePage.findFirst({
    where: (t, { eq }) => eq(t.id, PAGE_ID),
    with: { translations: true, images: true },
  })

  return { ok: true, data: updated }
})