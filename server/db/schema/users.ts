import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { avatars } from "./avatars";


// --------------------------------------------------------------------------
// 1. Users Table
// --------------------------------------------------------------------------
export const users = sqliteTable('users', {
  // Make sure you generate this (crypto.randomUUID()) before inserting! 
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text('email').notNull().unique(),
  emailVerified: integer('email_verified', { mode: 'timestamp' }),
  hashedPassword: text('hashed_password'),
  image: text('image'),
  firstName: text('first_name'),
  lastName: text('last_name'),
  displayName: text('display_name').notNull().unique(),
  phoneNumber: text('phone_number'),
  location: text('location'),
  website: text('website'),
  bio: text('bio'),
  avatarId: integer('avatar_id').references(() => avatars.id),
  // FIX: Use (unixepoch()) for integer timestamps in SQLite
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
});

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;