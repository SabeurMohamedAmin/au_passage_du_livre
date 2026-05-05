CREATE TABLE `home_page` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `home_page_translations` (
	`id` text PRIMARY KEY NOT NULL,
	`page_id` text NOT NULL,
	`locale` text NOT NULL,
	`hero_title_1` text DEFAULT '' NOT NULL,
	`hero_title_2` text DEFAULT '' NOT NULL,
	`hero_title_3` text DEFAULT '' NOT NULL,
	`hero_description` text DEFAULT '' NOT NULL,
	`hero_cta1_label` text DEFAULT '' NOT NULL,
	`hero_cta1_link` text DEFAULT '' NOT NULL,
	`hero_cta2_label` text DEFAULT '' NOT NULL,
	`hero_cta2_link` text DEFAULT '' NOT NULL,
	`missions_title` text DEFAULT '' NOT NULL,
	`missions_description` text DEFAULT '' NOT NULL,
	`missions_see_all_label` text DEFAULT '' NOT NULL,
	`missions_see_all_link` text DEFAULT '' NOT NULL,
	`speakers_title` text DEFAULT '' NOT NULL,
	`speakers_description` text DEFAULT '' NOT NULL,
	`speakers_see_all_label` text DEFAULT '' NOT NULL,
	`speakers_see_all_link` text DEFAULT '' NOT NULL,
	`articles_title` text DEFAULT '' NOT NULL,
	`articles_description` text DEFAULT '' NOT NULL,
	`articles_see_all_label` text DEFAULT '' NOT NULL,
	`articles_see_all_link` text DEFAULT '' NOT NULL,
	`events_title` text DEFAULT '' NOT NULL,
	`events_description` text DEFAULT '' NOT NULL,
	`events_download_label` text DEFAULT '' NOT NULL,
	`events_download_link` text DEFAULT '' NOT NULL,
	FOREIGN KEY (`page_id`) REFERENCES `home_page`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `home_page_translations_page_locale_idx` ON `home_page_translations` (`page_id`,`locale`);