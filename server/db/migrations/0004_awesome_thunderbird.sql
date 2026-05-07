PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_intervenants` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`role` text NOT NULL,
	`specialty` text DEFAULT '' NOT NULL,
	`excerpt` text DEFAULT '' NOT NULL,
	`bio` text DEFAULT '' NOT NULL,
	`image` text,
	`featured` integer DEFAULT false NOT NULL,
	`social_links` text NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`updated_at` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_intervenants`("id", "name", "slug", "role", "specialty", "excerpt", "bio", "image", "featured", "social_links", "created_at", "updated_at") SELECT "id", "name", "slug", "role", "specialty", "excerpt", "bio", "image", "featured", "social_links", "created_at", "updated_at" FROM `intervenants`;--> statement-breakpoint
DROP TABLE `intervenants`;--> statement-breakpoint
ALTER TABLE `__new_intervenants` RENAME TO `intervenants`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `intervenants_slug_unique` ON `intervenants` (`slug`);