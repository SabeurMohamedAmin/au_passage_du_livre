import { sqliteTable, text, integer, blob } from "drizzle-orm/sqlite-core";

// --------------------------------------------------------------------------
// 1. User Avatar Table
// --------------------------------------------------------------------------
export const avatars = sqliteTable('avatars', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  // File Metadata
  filename: text('filename').notNull(),
  mimeType: text('mime_type').notNull(),
  size: integer('size').notNull(),
  
  // Content (BLOB storage)
  data: blob('data', { mode: 'buffer' }).notNull(),
  
  // Optional: Origin URL (e.g. Google profile picture URL)
  sourceUrl: text('source_url'),  
  
  // Timestamps
  lastModified: integer('last_modified').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  
});

//Types
export type UserAvatar = typeof avatars.$inferSelect;
export type NewUserAvatar = typeof avatars.$inferInsert;