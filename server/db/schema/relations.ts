// server/db/schema/relations.ts
import { relations } from 'drizzle-orm'

import { users }            from './users'
import { accounts }         from './accounts'
import { credentials }      from './credentials'
import { loginAttempts }    from './login-attempts'
import { userPreferences }  from './user-preferences'
import { avatars }          from './avatars'
import { intervenants }     from './intervenants'

import { sponsors, sponsorTranslations, sponsorsPage, sponsorsPageTranslations } from './sponsors'
import { homePage, homePageTranslations, homeImages }                             from './home'

import {
  events,
  eventTranslations,
  eventIntervenants,
  eventSessions,
  eventSessionTranslations,
  eventSessionIntervenants,
  eventDocuments,
} from './events'

// ─── Users ────────────────────────────────────────────────────────────────────

export const usersRelations = relations(users, ({ one, many }) => ({
  preferences:   one(userPreferences, {
    fields:     [users.id],
    references: [userPreferences.userId],
  }),
  accounts:      many(accounts),
  credentials:   many(credentials),
  loginAttempts: many(loginAttempts),
  avatar:        one(avatars, {
    fields:     [users.avatarId],
    references: [avatars.id],
  }),
}))

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields:     [accounts.userId],
    references: [users.id],
  }),
}))

export const credentialsRelations = relations(credentials, ({ one }) => ({
  user: one(users, {
    fields:     [credentials.userId],
    references: [users.id],
  }),
}))

export const userPreferencesRelations = relations(userPreferences, ({ one }) => ({
  user: one(users, {
    fields:     [userPreferences.userId],
    references: [users.id],
  }),
}))

export const userAvatarRelations = relations(avatars, ({ one }) => ({
  user: one(users, {
    fields:     [avatars.id],
    references: [users.avatarId],
  }),
}))

// ─── Sponsors ─────────────────────────────────────────────────────────────────

export const sponsorsPageRelations = relations(sponsorsPage, ({ many }) => ({
  translations: many(sponsorsPageTranslations),
}))

export const sponsorsPageTranslationsRelations = relations(sponsorsPageTranslations, ({ one }) => ({
  page: one(sponsorsPage, {
    fields:     [sponsorsPageTranslations.pageId],
    references: [sponsorsPage.id],
  }),
}))

export const sponsorsRelations = relations(sponsors, ({ many }) => ({
  translations: many(sponsorTranslations),
}))

export const sponsorTranslationsRelations = relations(sponsorTranslations, ({ one }) => ({
  sponsor: one(sponsors, {
    fields:     [sponsorTranslations.sponsorId],
    references: [sponsors.id],
  }),
}))

// ─── Home Page ────────────────────────────────────────────────────────────────

export const homePageRelations = relations(homePage, ({ many }) => ({
  translations: many(homePageTranslations),
  images:       many(homeImages),
}))

export const homePageTranslationsRelations = relations(homePageTranslations, ({ one }) => ({
  page: one(homePage, {
    fields:     [homePageTranslations.pageId],
    references: [homePage.id],
  }),
}))

export const homeImagesRelations = relations(homeImages, ({ one }) => ({
  page: one(homePage, {
    fields:     [homeImages.pageId],
    references: [homePage.id],
  }),
}))

// ─── Events ───────────────────────────────────────────────────────────────────

export const eventsRelations = relations(events, ({ many }) => ({
  translations: many(eventTranslations),
  intervenants: many(eventIntervenants),
  sessions:     many(eventSessions),
  documents:    many(eventDocuments),
}))

export const eventTranslationsRelations = relations(eventTranslations, ({ one }) => ({
  event: one(events, {
    fields:     [eventTranslations.eventId],
    references: [events.id],
  }),
}))

// ─── Event ↔ Intervenant (junction) ───────────────────────────────────────────

export const eventIntervenantsRelations = relations(eventIntervenants, ({ one }) => ({
  event: one(events, {
    fields:     [eventIntervenants.eventId],
    references: [events.id],
  }),
  intervenant: one(intervenants, {
    fields:     [eventIntervenants.intervenantId],
    references: [intervenants.id],
  }),
}))

export const intervenantsRelations = relations(intervenants, ({ many }) => ({
  events:   many(eventIntervenants),
  sessions: many(eventSessionIntervenants),
}))

// ─── Sessions ─────────────────────────────────────────────────────────────────

export const eventSessionsRelations = relations(eventSessions, ({ one, many }) => ({
  event:        one(events, {
    fields:     [eventSessions.eventId],
    references: [events.id],
  }),
  translations: many(eventSessionTranslations),
  intervenants: many(eventSessionIntervenants),
}))

export const eventSessionTranslationsRelations = relations(eventSessionTranslations, ({ one }) => ({
  session: one(eventSessions, {
    fields:     [eventSessionTranslations.sessionId],
    references: [eventSessions.id],
  }),
}))

// ─── Session ↔ Intervenant (junction) ─────────────────────────────────────────

export const eventSessionIntervenantsRelations = relations(eventSessionIntervenants, ({ one }) => ({
  session: one(eventSessions, {
    fields:     [eventSessionIntervenants.sessionId],
    references: [eventSessions.id],
  }),
  intervenant: one(intervenants, {
    fields:     [eventSessionIntervenants.intervenantId],
    references: [intervenants.id],
  }),
}))

// ─── Documents ────────────────────────────────────────────────────────────────

export const eventDocumentsRelations = relations(eventDocuments, ({ one }) => ({
  event: one(events, {
    fields:     [eventDocuments.eventId],
    references: [events.id],
  }),
}))