import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
import { users } from "./users";

// --------------------------------------------------------------------------
// 6. User Preferences
// --------------------------------------------------------------------------
export const userPreferences = sqliteTable('user_preferences', {
  // FIX: Ensure this is text to match users.id
  userId: text('user_id')
    .primaryKey()
    .references(() => users.id, { onDelete: 'cascade' }),
    
  appearance: text('appearance').$type<'light' | 'dark' | 'auto'>().default('auto'),
  highContrast: integer('high_contrast', { mode: 'boolean' }).default(false),
  language: text('language').default('en'),
  region: text('region'),
  
  emailSecurityAlerts: integer('email_security_alerts', { mode: 'boolean' }).default(true),
  emailProductUpdates: integer('email_product_updates', { mode: 'boolean' }).default(true),
  emailMarketing: integer('email_marketing', { mode: 'boolean' }).default(false),
  pushEnabled: integer('push_enabled', { mode: 'boolean' }).default(true),
  
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .$onUpdate(() => new Date()),
});

export type UserPreferences = typeof userPreferences.$inferSelect;