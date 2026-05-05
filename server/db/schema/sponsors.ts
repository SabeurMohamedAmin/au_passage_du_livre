// server/db/schema/sponsors.ts
import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core'

export const sponsorsPage = sqliteTable('sponsors_page', {
  id: text('id').primaryKey(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const sponsorsPageTranslations = sqliteTable('sponsors_page_translations',{
  id: text('id').primaryKey(),
  pageId: text('page_id').notNull()
    .references(() => sponsorsPage.id, { onDelete: 'cascade' }),
  locale: text('locale').notNull(),
  title: text('title').notNull(),
  subtitle: text('subtitle'),
  footerText: text('footer_text'),
  },
  (table) => [
    uniqueIndex('sponsors_page_translations_page_locale_idx').on(
      table.pageId,
      table.locale,
    ),
  ]
)

export const sponsors = sqliteTable('sponsors', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description'),
  category: text('category').notNull(),
  color: text('color'),
  logoUrl: text('logo_url'),
  website: text('website'),
  addressText: text('address_text'),
  displayOrder: integer('display_order').notNull().default(0),
  isPublished: integer('is_published', { mode: 'boolean' }).notNull().default(true),
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
})

export const sponsorTranslations = sqliteTable('sponsor_translations',
  {
    id: text('id').primaryKey(),
    sponsorId: text('sponsor_id').notNull()
      .references(() => sponsors.id, { onDelete: 'cascade' }),
    locale: text('locale').notNull(),
    name: text('name').notNull(),
    tagline: text('tagline'),
    description: text('description'),
  },
  (table)=>[
    uniqueIndex('sponsor_translations_sponsor_locale_idx').on(
      table.sponsorId,
      table.locale,
    ),
  ]
)


/**
 * What was done
------------

I started shaping the database for the Sponsors page.

The app uses Drizzle + SQLite, not Prisma, so the schema was designed
using sqliteTable(...) and relations(...).

The goal was to prepare the Sponsors page to move from hard-coded data
to database-driven content that can later be edited from an admin dashboard.

Why this structure
------------------

The Sponsors page contains two different kinds of content:

1. Page-level content
   - title
   - subtitle / intro text
   - footer / thank-you text

2. Sponsor item content
   - logo
   - website link
   - address
   - display order
   - published state
   - translated text like name, tagline, description

Because the site is multilingual, translated content should not live
directly in the base tables. That is why translation tables were added.

Tables added
------------

1. sponsors_page
   Represents the sponsors page itself.
   This is a parent/container row for the page.

2. sponsors_page_translations
   Stores one row per locale for the sponsors page texts:
   - title
   - subtitle
   - footerText

3. sponsors
   Stores one row per sponsor card:
   - slug
   - logoUrl
   - websiteUrl
   - addressText
   - displayOrder
   - isPublished
   - timestamps

4. sponsor_translations
   Stores one row per locale per sponsor:
   - name
   - tagline
   - description

Why addressText was used
------------------------

The current UI shows the address as one display block.
Because of that, addressText is simpler than splitting address into:
- street
- postal code
- city
- country

This keeps the schema easier for now.
It can be normalized later if needed.

Relations added
---------------

Relations were extracted into the shared relations.ts file, following
the existing project structure.

Added relations:
- sponsorsPage -> many sponsorsPageTranslations
- sponsorsPageTranslations -> one sponsorsPage
- sponsors -> many sponsorTranslations
- sponsorTranslations -> one sponsors

Important reminder
------------------

Drizzle relations do not change the database by themselves.
Only actual table definitions, columns, foreign keys, indexes, and defaults
affect migrations.

So after adding the schema tables, migrations must be generated and applied.

Migration flow
--------------

Use:

pnpm drizzle-kit generate
pnpm drizzle-kit migrate

Drizzle does not use named migrations the same way Prisma does,
so generate/migrate is the normal workflow here.

Files touched
-------------

Likely updated:
- server/db/schema/sponsors.ts
- server/db/schema/index.ts
- server/db/schema/relations.ts

Potential next steps
--------------------

1. Generate and apply migration
2. Seed initial sponsors page data
3. Create a query/helper for fetching the sponsors page by locale
4. Build a public API route for the sponsors page
5. Replace hard-coded Sponsors page content with DB data
6. Later add admin CRUD for sponsors and page translations

Design decision to revisit later
--------------------------------

If the sponsors page will always be a strict singleton and never needs
extra page-level metadata, the sponsors_page parent table could be removed
and the page could be represented only by sponsors_page_translations.

For now, the parent table was kept for consistency with a CMS-style structure.
 */