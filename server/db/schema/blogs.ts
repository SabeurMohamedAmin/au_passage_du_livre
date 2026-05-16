import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const blogs = sqliteTable('blogs', {
  id:          integer('id').primaryKey({ autoIncrement: true }),
  
  title:       text('title').notNull(),
  slug:        text('slug').notNull().unique(),
  summary:     text('summary').notNull(),
  content:     text('content').notNull(),
  image:       text('image'),
  
  author:      text('author').notNull(),
  authorImage: text('author_image'),
  
  date:        integer('date', { mode: 'timestamp' }).notNull(),
  category:    text('category').notNull().default('news'),

  createdAt:   integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt:   integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
})

export type Blog    = typeof blogs.$inferSelect
export type NewBlog = typeof blogs.$inferInsert
