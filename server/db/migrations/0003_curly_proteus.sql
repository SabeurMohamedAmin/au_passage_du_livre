CREATE TABLE `intervenants` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`role` text NOT NULL,
	`specialty` text DEFAULT '' NOT NULL,
	`excerpt` text DEFAULT '' NOT NULL,
	`bio` text DEFAULT '' NOT NULL,
	`image` text,
	`featured` integer DEFAULT false NOT NULL,
	`social_links` text DEFAULT '{}' NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`updated_at` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `intervenants_slug_unique` ON `intervenants` (`slug`);