import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
import { users } from "./users";

// --------------------------------------------------------------------------
// 2. Login Attempts Table
// --------------------------------------------------------------------------
export const loginAttempts = sqliteTable('login_attempts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  // FIX: Changed from integer to text to match users.id
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  ip: text('ip').notNull(),
  timestamp: integer('timestamp').notNull(),
  success: integer('success').notNull()
});