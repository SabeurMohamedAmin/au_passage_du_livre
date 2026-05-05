import { createError, defineEventHandler, readBody } from 'h3'
import { eq } from 'drizzle-orm'
import { db } from '~~/server/db'
import { homePage, homePageTranslations } from '~~/server/db/schema/home'
import crypto from 'node:crypto'

const PAGE_ID = 'home-page-singleton'

type UpdateHomeBody = {
  locale: string
  heroTitle1?: string
  heroTitle2?: string
  heroTitle3?: string
  heroDescription?: string
  heroCta1Label?: string
  heroCta1Link?: string
  heroCta2Label?: string
  heroCta2Link?: string
  missionsTitle?: string
  missionsDescription?: string
  missionsSeeAllLabel?: string
  missionsSeeAllLink?: string
  speakersTitle?: string
  speakersDescription?: string
  speakersSeeAllLabel?: string
  speakersSeeAllLink?: string
  articlesTitle?: string
  articlesDescription?: string
  articlesSeeAllLabel?: string
  articlesSeeAllLink?: string
  eventsTitle?: string
  eventsDescription?: string
  eventsDownloadLabel?: string
  eventsDownloadLink?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<UpdateHomeBody>(event)

  if (!body?.locale?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'locale is required' })
  }

  const now = new Date()

  // ensure singleton page row exists
  const existing = await db.query.homePage.findFirst({
    where: (t, { eq }) => eq(t.id, PAGE_ID),
  })
  if (!existing) {
    await db.insert(homePage).values({ id: PAGE_ID })
  }

  // upsert translation for the given locale
  const existingTranslation = await db.query.homePageTranslations.findFirst({
    where: (t, { and, eq }) =>
      and(eq(t.pageId, PAGE_ID), eq(t.locale, body.locale)),
  })

  if (existingTranslation) {
    await db
      .update(homePageTranslations)
      .set({
        heroTitle1:           body.heroTitle1           ?? existingTranslation.heroTitle1,
        heroTitle2:           body.heroTitle2           ?? existingTranslation.heroTitle2,
        heroTitle3:           body.heroTitle3           ?? existingTranslation.heroTitle3,
        heroDescription:      body.heroDescription      ?? existingTranslation.heroDescription,
        heroCta1Label:        body.heroCta1Label        ?? existingTranslation.heroCta1Label,
        heroCta1Link:         body.heroCta1Link         ?? existingTranslation.heroCta1Link,
        heroCta2Label:        body.heroCta2Label        ?? existingTranslation.heroCta2Label,
        heroCta2Link:         body.heroCta2Link         ?? existingTranslation.heroCta2Link,
        missionsTitle:        body.missionsTitle        ?? existingTranslation.missionsTitle,
        missionsDescription:  body.missionsDescription  ?? existingTranslation.missionsDescription,
        missionsSeeAllLabel:  body.missionsSeeAllLabel  ?? existingTranslation.missionsSeeAllLabel,
        missionsSeeAllLink:   body.missionsSeeAllLink   ?? existingTranslation.missionsSeeAllLink,
        speakersTitle:        body.speakersTitle        ?? existingTranslation.speakersTitle,
        speakersDescription:  body.speakersDescription  ?? existingTranslation.speakersDescription,
        speakersSeeAllLabel:  body.speakersSeeAllLabel  ?? existingTranslation.speakersSeeAllLabel,
        speakersSeeAllLink:   body.speakersSeeAllLink   ?? existingTranslation.speakersSeeAllLink,
        articlesTitle:        body.articlesTitle        ?? existingTranslation.articlesTitle,
        articlesDescription:  body.articlesDescription  ?? existingTranslation.articlesDescription,
        articlesSeeAllLabel:  body.articlesSeeAllLabel  ?? existingTranslation.articlesSeeAllLabel,
        articlesSeeAllLink:   body.articlesSeeAllLink   ?? existingTranslation.articlesSeeAllLink,
        eventsTitle:          body.eventsTitle          ?? existingTranslation.eventsTitle,
        eventsDescription:    body.eventsDescription    ?? existingTranslation.eventsDescription,
        eventsDownloadLabel:  body.eventsDownloadLabel  ?? existingTranslation.eventsDownloadLabel,
        eventsDownloadLink:   body.eventsDownloadLink   ?? existingTranslation.eventsDownloadLink,
      })
      .where(eq(homePageTranslations.id, existingTranslation.id))
  } else {
    await db.insert(homePageTranslations).values({
      id:                   crypto.randomUUID(),
      pageId:               PAGE_ID,
      locale:               body.locale,
      heroTitle1:           body.heroTitle1           ?? '',
      heroTitle2:           body.heroTitle2           ?? '',
      heroTitle3:           body.heroTitle3           ?? '',
      heroDescription:      body.heroDescription      ?? '',
      heroCta1Label:        body.heroCta1Label        ?? '',
      heroCta1Link:         body.heroCta1Link         ?? '',
      heroCta2Label:        body.heroCta2Label        ?? '',
      heroCta2Link:         body.heroCta2Link         ?? '',
      missionsTitle:        body.missionsTitle        ?? '',
      missionsDescription:  body.missionsDescription  ?? '',
      missionsSeeAllLabel:  body.missionsSeeAllLabel  ?? '',
      missionsSeeAllLink:   body.missionsSeeAllLink   ?? '',
      speakersTitle:        body.speakersTitle        ?? '',
      speakersDescription:  body.speakersDescription  ?? '',
      speakersSeeAllLabel:  body.speakersSeeAllLabel  ?? '',
      speakersSeeAllLink:   body.speakersSeeAllLink   ?? '',
      articlesTitle:        body.articlesTitle        ?? '',
      articlesDescription:  body.articlesDescription  ?? '',
      articlesSeeAllLabel:  body.articlesSeeAllLabel  ?? '',
      articlesSeeAllLink:   body.articlesSeeAllLink   ?? '',
      eventsTitle:          body.eventsTitle          ?? '',
      eventsDescription:    body.eventsDescription    ?? '',
      eventsDownloadLabel:  body.eventsDownloadLabel  ?? '',
      eventsDownloadLink:   body.eventsDownloadLink   ?? '',
    })
  }

  await db
    .update(homePage)
    .set({ updatedAt: now })
    .where(eq(homePage.id, PAGE_ID))

  const updated = await db.query.homePage.findFirst({
    where: (t, { eq }) => eq(t.id, PAGE_ID),
    with: { translations: true, images: true },
  })

  return { ok: true, data: updated }
})