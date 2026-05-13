import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core'
import { intervenants } from './intervenants'

// ── Core Event ────────────────────────────────────────────────────────────────

export const events = sqliteTable('events', {
  id:           integer('id').primaryKey({ autoIncrement: true }),
  isNextEvent:  integer('is_next_event', { mode: 'boolean' }).notNull().default(false),
  coverImage:   text('cover_image').notNull().default(''),
  startDate:    text('start_date').notNull(),
  endDate:      text('end_date').notNull().default(''),
  time:         text('time').notNull().default(''),
  locationName: text('location_name').notNull().default(''),
  address:      text('address').notNull().default(''),
  entranceType: text('entrance_type').notNull().default('Entrée gratuite'),
  website:      text('website').notNull().default(''),
  createdAt:    integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt:    integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
})

// ── Event Translations ────────────────────────────────────────────────────────

export const eventTranslations = sqliteTable('event_translations', {
  id:           integer('id').primaryKey({ autoIncrement: true }),
  eventId:      integer('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  locale:       text('locale').notNull(),
  title:        text('title').notNull(),
  subtitle:     text('subtitle').notNull().default(''),
  slug:         text('slug').notNull(),
  shortSummary: text('short_summary').notNull().default(''),
  about:        text('about').notNull().default(''),
  highlights:   text('highlights').notNull().default(''),
}, (t) => ({
  localeEventIdx: uniqueIndex('event_translations_locale_event_idx').on(t.eventId, t.locale),
  slugLocaleIdx:  uniqueIndex('event_translations_slug_locale_idx').on(t.slug, t.locale),
}))

// ── Event ↔ Intervenant (Junction) ────────────────────────────────────────────

export const eventIntervenants = sqliteTable('event_intervenants', {
  eventId:       integer('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  intervenantId: integer('intervenant_id').notNull().references(() => intervenants.id, { onDelete: 'cascade' }),
  sortOrder:     integer('sort_order').notNull().default(0),
}, (t) => ({
  pk: uniqueIndex('event_intervenants_pk').on(t.eventId, t.intervenantId),
}))

// ── Sessions ──────────────────────────────────────────────────────────────────

export const eventSessions = sqliteTable('event_sessions', {
  id:        integer('id').primaryKey({ autoIncrement: true }),
  eventId:   integer('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  date:      text('date').notNull(),
  time:      text('time').notNull().default(''),
  location:  text('location').notNull().default(''),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
})

// ── Session Translations ──────────────────────────────────────────────────────

export const eventSessionTranslations = sqliteTable('event_session_translations', {
  id:          integer('id').primaryKey({ autoIncrement: true }),
  sessionId:   integer('session_id').notNull().references(() => eventSessions.id, { onDelete: 'cascade' }),
  locale:      text('locale').notNull(),
  title:       text('title').notNull(),
  description: text('description').notNull().default(''),
}, (t) => ({
  localeSessionIdx: uniqueIndex('event_session_translations_locale_session_idx').on(t.sessionId, t.locale),
}))

// ── Session ↔ Intervenant (Junction) ──────────────────────────────────────────

export const eventSessionIntervenants = sqliteTable('event_session_intervenants', {
  sessionId:     integer('session_id').notNull().references(() => eventSessions.id, { onDelete: 'cascade' }),
  intervenantId: integer('intervenant_id').notNull().references(() => intervenants.id, { onDelete: 'cascade' }),
}, (t) => ({
  pk: uniqueIndex('event_session_intervenants_pk').on(t.sessionId, t.intervenantId),
}))

// ── Documents ─────────────────────────────────────────────────────────────────

export const eventDocuments = sqliteTable('event_documents', {
  id:        integer('id').primaryKey({ autoIncrement: true }),
  eventId:   integer('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  label:     text('label').notNull(),
  url:       text('url').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
})

// ── Types ─────────────────────────────────────────────────────────────────────

export type Event                   = typeof events.$inferSelect
export type NewEvent                = typeof events.$inferInsert
export type EventTranslation        = typeof eventTranslations.$inferSelect
export type EventIntervenant        = typeof eventIntervenants.$inferSelect
export type EventSession            = typeof eventSessions.$inferSelect
export type EventSessionTranslation = typeof eventSessionTranslations.$inferSelect
export type EventDocument           = typeof eventDocuments.$inferSelect