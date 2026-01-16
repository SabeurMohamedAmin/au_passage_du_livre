import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
import type { WebAuthnCredential } from "#auth-utils"

// --------------------------------------------------------------------------
// 3. Credentials Table (WebAuthn / Passkeys)
// --------------------------------------------------------------------------
export const credentials = sqliteTable("credentials", {
    
  // FIX: Changed from integer to text to match users.id
  userId: text("user_id")
    .references(() => schema.users.id, { onDelete: 'cascade' })
    .notNull(),
    
  id: text("id").notNull().unique(), 
  publicKey: text("public_key").notNull(),
  counter: integer("counter").notNull(),
  backedUp: integer("backed_up", { mode: "boolean" }).notNull(),
  transports: text("transports", { mode: "json" }).notNull()
    .$type<WebAuthnCredential["transports"]>()
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.id] }) 
  ]
);