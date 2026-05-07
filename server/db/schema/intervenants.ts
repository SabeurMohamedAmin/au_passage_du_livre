import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const intervenants = sqliteTable('intervenants', {
  id:        integer('id').primaryKey({ autoIncrement: true }),

  // Core identity
  name:      text('name').notNull(),
  slug:      text('slug').notNull().unique(),
  role:      text('role').notNull(),
  specialty: text('specialty').notNull().default(''),

  // Bio content
  excerpt:   text('excerpt').notNull().default(''),
  bio:       text('bio').notNull().default(''),

  // Media
  image:     text('image'),

  // Flags
  featured:  integer('featured', { mode: 'boolean' }).notNull().default(false),

  // Social links — stored as JSON, default is an empty object
  socialLinks: text('social_links', { mode: 'json' })
    .$type<{
      facebook?:  string
      instagram?: string
      twitter?:   string
      website?:   string
    }>()
    .notNull()
    .$defaultFn(() => ({})),

  // Timestamps
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
})

export type Intervenant    = typeof intervenants.$inferSelect
export type NewIntervenant = typeof intervenants.$inferInsert
// ✅ No barrel exports here — those belong only in index.ts