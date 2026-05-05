import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core'

export const homePage = sqliteTable('home_page', {
  id: text('id').primaryKey(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
})

export const homePageTranslations = sqliteTable(
  'home_page_translations',
  {
    id: text('id').primaryKey(),
    pageId: text('page_id')
      .notNull()
      .references(() => homePage.id, { onDelete: 'cascade' }),
    locale: text('locale').notNull(),

    // Hero
    heroTitle1: text('hero_title_1').notNull().default(''),
    heroTitle2: text('hero_title_2').notNull().default(''),
    heroTitle3: text('hero_title_3').notNull().default(''),
    heroDescription: text('hero_description').notNull().default(''),
    heroCta1Label: text('hero_cta1_label').notNull().default(''),
    heroCta1Link: text('hero_cta1_link').notNull().default(''),
    heroCta2Label: text('hero_cta2_label').notNull().default(''),
    heroCta2Link: text('hero_cta2_link').notNull().default(''),

    // Missions
    missionsTitle: text('missions_title').notNull().default(''),
    missionsDescription: text('missions_description').notNull().default(''),
    missionsSeeAllLabel: text('missions_see_all_label').notNull().default(''),
    missionsSeeAllLink: text('missions_see_all_link').notNull().default(''),

    // Speakers
    speakersTitle: text('speakers_title').notNull().default(''),
    speakersDescription: text('speakers_description').notNull().default(''),
    speakersSeeAllLabel: text('speakers_see_all_label').notNull().default(''),
    speakersSeeAllLink: text('speakers_see_all_link').notNull().default(''),

    // Articles
    articlesTitle: text('articles_title').notNull().default(''),
    articlesDescription: text('articles_description').notNull().default(''),
    articlesSeeAllLabel: text('articles_see_all_label').notNull().default(''),
    articlesSeeAllLink: text('articles_see_all_link').notNull().default(''),

    // Events
    eventsTitle: text('events_title').notNull().default(''),
    eventsDescription: text('events_description').notNull().default(''),
    eventsDownloadLabel: text('events_download_label').notNull().default(''),
    eventsDownloadLink: text('events_download_link').notNull().default(''),
  },
  (table) => [
    uniqueIndex('home_page_translations_page_locale_idx').on(
      table.pageId,
      table.locale,
    ),
  ],
)


// --------------------------------------------
// Home Images
// --------------------------------------------

export const homeImages = sqliteTable('home_images', {
  id: text('id').primaryKey(),
  pageId: text('page_id')
    .notNull()
    .references(() => homePage.id, { onDelete: 'cascade' }),
  slot: text('slot', {
    enum: [
      'hero_top_left',
      'hero_bottom_left',
      'hero_top_right',
      'hero_bottom_right',
    ],
  }).notNull(),
  url: text('url'),          // nullable — null = show placeholder
  alt: text('alt').notNull().default(''),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
})