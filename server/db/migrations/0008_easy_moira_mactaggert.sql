CREATE TABLE `event_documents` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`event_id` integer NOT NULL,
	`label` text NOT NULL,
	`url` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `event_session_speakers` (
	`session_id` integer NOT NULL,
	`speaker_id` integer NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `event_sessions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `event_session_speakers_pk` ON `event_session_speakers` (`session_id`,`speaker_id`);--> statement-breakpoint
CREATE TABLE `event_session_translations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_id` integer NOT NULL,
	`locale` text NOT NULL,
	`title` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `event_sessions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `event_session_translations_locale_session_idx` ON `event_session_translations` (`session_id`,`locale`);--> statement-breakpoint
CREATE TABLE `event_sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`event_id` integer NOT NULL,
	`date` text NOT NULL,
	`time` text DEFAULT '' NOT NULL,
	`location` text DEFAULT '' NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `event_speakers` (
	`event_id` integer NOT NULL,
	`speaker_id` integer NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `event_speakers_pk` ON `event_speakers` (`event_id`,`speaker_id`);--> statement-breakpoint
CREATE TABLE `event_translations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`event_id` integer NOT NULL,
	`locale` text NOT NULL,
	`title` text NOT NULL,
	`subtitle` text DEFAULT '' NOT NULL,
	`slug` text NOT NULL,
	`short_summary` text DEFAULT '' NOT NULL,
	`about` text DEFAULT '' NOT NULL,
	`highlights` text DEFAULT '' NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `event_translations_locale_event_idx` ON `event_translations` (`event_id`,`locale`);--> statement-breakpoint
CREATE UNIQUE INDEX `event_translations_slug_locale_idx` ON `event_translations` (`slug`,`locale`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`is_next_event` integer DEFAULT false NOT NULL,
	`cover_image` text DEFAULT '' NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text DEFAULT '' NOT NULL,
	`time` text DEFAULT '' NOT NULL,
	`location_name` text DEFAULT '' NOT NULL,
	`address` text DEFAULT '' NOT NULL,
	`entrance_type` text DEFAULT 'Entrée gratuite' NOT NULL,
	`website` text DEFAULT '' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer
);
--> statement-breakpoint
INSERT INTO `__new_events`("id", "is_next_event", "cover_image", "start_date", "end_date", "time", "location_name", "address", "entrance_type", "website", "created_at", "updated_at") SELECT "id", "is_next_event", "cover_image", "start_date", "end_date", "time", "location_name", "address", "entrance_type", "website", "created_at", "updated_at" FROM `events`;--> statement-breakpoint
DROP TABLE `events`;--> statement-breakpoint
ALTER TABLE `__new_events` RENAME TO `events`;--> statement-breakpoint
PRAGMA foreign_keys=ON;