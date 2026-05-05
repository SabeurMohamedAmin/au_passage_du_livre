CREATE TABLE `home_images` (
	`id` text PRIMARY KEY NOT NULL,
	`page_id` text NOT NULL,
	`slot` text NOT NULL,
	`url` text,
	`alt` text DEFAULT '' NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`page_id`) REFERENCES `home_page`(`id`) ON UPDATE no action ON DELETE cascade
);
