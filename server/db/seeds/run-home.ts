// server/db/seeds/run-home.ts
/**
 * Seeds the home page singleton with default content.
 *
 * Run with:
 *   npx tsx server/db/seeds/run-home.ts
 *
 * Safe to run multiple times — exits early if already seeded.
 */

import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import crypto from 'node:crypto'

import {
  homePage,
  homePageTranslations,
  homeImages,                       // ← imported at the top with the rest
} from '../schema/home'

// ─── Database connection ──────────────────────────────────────────────────────

const client = createClient({
  url: 'file:./.data/nuxt_auth_sqlite_database.db',
})

const db = drizzle(client, {
  schema: { homePage, homePageTranslations, homeImages },
})

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_ID = 'home-page-singleton'

// ─── Guard: skip if already seeded ───────────────────────────────────────────

const existing = await db.query.homePage.findFirst({
  where: (t, { eq }) => eq(t.id, PAGE_ID),
})

if (existing) {
  console.log('⏭️  Already seeded — skipping.')
  process.exit(0)
}

// ─── Seed ─────────────────────────────────────────────────────────────────────

await db.transaction(async (tx) => {

  // 1. Create the singleton page record
  await tx.insert(homePage).values({ id: PAGE_ID })

  // 2. Insert translations (one per locale)
  await tx.insert(homePageTranslations).values([
    {
      id:      crypto.randomUUID(),
      pageId:  PAGE_ID,
      locale:  'fr',

      // Hero
      heroTitle1:      'Événements culturels',
      heroTitle2:      'Soutien aux artistes',
      heroTitle3:      'Transmettre la culture',   // displayed in accent color
      heroDescription: "Une association strasbourgeoise engagée pour les livres et les arts narratifs.",
      heroCta1Label:   'Voir nos événements',
      heroCta1Link:    '/evenements',
      heroCta2Label:   "Découvrir l'association",
      heroCta2Link:    '/a-propos',

      // Missions
      missionsTitle:       'Nos missions en action',
      missionsDescription: 'Au Passage du Livre crée des espaces où les mots circulent librement.',
      missionsSeeAllLabel: 'Voir nos missions',
      missionsSeeAllLink:  '/notre-mission',

      // Speakers
      speakersTitle:        'Intervenants et artistes',
      speakersDescription:  'Découvrez les intervenants participant à nos événements.',
      speakersSeeAllLabel:  'Voir tous les intervenants',
      speakersSeeAllLink:   '/artistes-et-intervenants',

      // Articles
      articlesTitle:        'Articles & Actualités',
      articlesDescription:  "Suivez les dernières nouvelles d'Au Passage du Livre.",
      articlesSeeAllLabel:  'Voir tous les articles',
      articlesSeeAllLink:   '/blog',

      // Events
      eventsTitle:         'Programme des événements',
      eventsDescription:   'Téléchargez le catalogue complet des événements 2025.',
      eventsDownloadLabel: 'Télécharger le PDF',
      eventsDownloadLink:  '/programme.pdf',
    },
    {
      id:      crypto.randomUUID(),
      pageId:  PAGE_ID,
      locale:  'en',

      // Hero
      heroTitle1:      'Cultural events',
      heroTitle2:      'Support for artists',
      heroTitle3:      'Passing on culture',
      heroDescription: 'A Strasbourg-based association committed to books and narrative arts.',
      heroCta1Label:   'See our events',
      heroCta1Link:    '/events',
      heroCta2Label:   'Discover the association',
      heroCta2Link:    '/about-us',

      // Missions
      missionsTitle:       'Our missions in action',
      missionsDescription: 'Au Passage du Livre creates spaces where words and ideas circulate freely.',
      missionsSeeAllLabel: 'See our missions',
      missionsSeeAllLink:  '/our-mission',

      // Speakers
      speakersTitle:        'Speakers and artists',
      speakersDescription:  'Discover the speakers taking part in our cultural events.',
      speakersSeeAllLabel:  'See all speakers',
      speakersSeeAllLink:   '/artistes-et-intervenants',

      // Articles
      articlesTitle:        'Articles & News',
      articlesDescription:  'Follow the latest news from Au Passage du Livre.',
      articlesSeeAllLabel:  'See all articles',
      articlesSeeAllLink:   '/blog',

      // Events
      eventsTitle:         'Events Program',
      eventsDescription:   'Download the complete 2025 events catalog.',
      eventsDownloadLabel: 'Download PDF',
      eventsDownloadLink:  '/events-program.pdf',
    },
  ])

  // 3. Insert default hero images (4 grid slots)
  await tx.insert(homeImages).values([
    {
      id:     crypto.randomUUID(),
      pageId: PAGE_ID,
      slot:   'hero_top_left',
      url:    '/img/home/des-dedicaces.png',
      alt:    'Dédicaces',
    },
    {
      id:     crypto.randomUUID(),
      pageId: PAGE_ID,
      slot:   'hero_bottom_left',
      url:    '/img/home/diffrents-directions.png',
      alt:    'Directions',
    },
    {
      id:     crypto.randomUUID(),
      pageId: PAGE_ID,
      slot:   'hero_top_right',
      url:    '/img/home/assemblage-de-livre.png',
      alt:    'Livres',
    },
    {
      id:     crypto.randomUUID(),
      pageId: PAGE_ID,
      slot:   'hero_bottom_right',
      url:    '/img/home/comic.png',
      alt:    'Comic',
    },
  ])

})

console.log('✅ Home page seeded successfully.')
process.exit(0)