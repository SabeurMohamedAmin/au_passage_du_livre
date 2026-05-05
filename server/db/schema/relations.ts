// server/db/schema/relations.ts
import { relations } from 'drizzle-orm'

import { users } from './users'
import { accounts } from './accounts'
import { credentials } from './credentials'
import { loginAttempts } from './login-attempts'
import { userPreferences } from './user-preferences'
import { avatars } from './avatars'
import { sponsors, sponsorTranslations, sponsorsPage, sponsorsPageTranslations } from './sponsors'
import { homePage, homePageTranslations, homeImages } from './home'  // ← add homeImages

// ─── Users ────────────────────────────────────────────────────────────────────

export const usersRelations = relations(users, ({ one, many }) => ({
  preferences: one(userPreferences, {
    fields: [users.id],
    references: [userPreferences.userId],
  }),
  accounts: many(accounts),
  credentials: many(credentials),
  loginAttempts: many(loginAttempts),
  avatar: one(avatars, {
    fields: [users.avatarId],
    references: [avatars.id],
  }),
}))

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}))

export const credentialsRelations = relations(credentials, ({ one }) => ({
  user: one(users, {
    fields: [credentials.userId],
    references: [users.id],
  }),
}))

export const userPreferencesRelations = relations(userPreferences, ({ one }) => ({
  user: one(users, {
    fields: [userPreferences.userId],
    references: [users.id],
  }),
}))

export const userAvatarRelations = relations(avatars, ({ one }) => ({
  user: one(users, {
    fields: [avatars.id],
    references: [users.avatarId],
  }),
}))

// ─── Sponsors ─────────────────────────────────────────────────────────────────

export const sponsorsPageRelations = relations(sponsorsPage, ({ many }) => ({
  translations: many(sponsorsPageTranslations),
}))

export const sponsorsPageTranslationsRelations = relations(sponsorsPageTranslations, ({ one }) => ({
  page: one(sponsorsPage, {
    fields: [sponsorsPageTranslations.pageId],
    references: [sponsorsPage.id],
  }),
}))

export const sponsorsRelations = relations(sponsors, ({ many }) => ({
  translations: many(sponsorTranslations),
}))

export const sponsorTranslationsRelations = relations(sponsorTranslations, ({ one }) => ({
  sponsor: one(sponsors, {
    fields: [sponsorTranslations.sponsorId],
    references: [sponsors.id],
  }),
}))

// ─── Home Page ────────────────────────────────────────────────────────────────

// ✅ single definition — includes both translations AND images
export const homePageRelations = relations(homePage, ({ many }) => ({
  translations: many(homePageTranslations),
  images: many(homeImages),
}))

export const homePageTranslationsRelations = relations(homePageTranslations, ({ one }) => ({
  page: one(homePage, {
    fields: [homePageTranslations.pageId],
    references: [homePage.id],
  }),
}))

export const homeImagesRelations = relations(homeImages, ({ one }) => ({
  page: one(homePage, {
    fields: [homeImages.pageId],
    references: [homePage.id],
  }),
}))