import { relations } from "drizzle-orm";

import { users } from "./users";
import { accounts } from "./accounts";
import { credentials } from "./credentials";
import { loginAttempts } from "./login-attempts";
import { userPreferences } from "./user-preferences";
import { avatars } from "./avatars";

// Users Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  preferences: one(userPreferences, {
    fields: [users.id],
    references: [userPreferences.userId],
  }),
  accounts: many(accounts),
  credentials: many(credentials),
  loginAttempts: many(loginAttempts),
  // Relation to Avatar
  avatar: one(avatars, {
    fields: [users.avatarId],
    references: [avatars.id],
  }),

}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const credentialsRelations = relations(credentials, ({ one }) => ({
  user: one(users, {
    fields: [credentials.userId],
    references: [users.id]
  })
}));

export const userPreferencesRelations = relations(userPreferences, ({ one }) => ({
  user: one(users, {
    fields: [userPreferences.userId],
    references: [users.id],
  }),
}));

// Avatar Relations
export const userAvatarRelations = relations(avatars, ({ one }) => ({
  user: one(users, {
    // Virtual link back
    fields: [avatars.id],
    // To the foreign key in users
    references: [users.avatarId],
  }),
}));