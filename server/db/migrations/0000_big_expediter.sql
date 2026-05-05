CREATE TABLE `accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`provider` text NOT NULL,
	`provider_account_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`expires_at` integer,
	`token_type` text,
	`id_token` text,
	`scope` text,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `provider_account_idx` ON `accounts` (`provider`,`provider_account_id`);--> statement-breakpoint
CREATE TABLE `avatars` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`filename` text NOT NULL,
	`mime_type` text NOT NULL,
	`size` integer NOT NULL,
	`data` blob NOT NULL,
	`source_url` text,
	`last_modified` integer NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `credentials` (
	`user_id` text NOT NULL,
	`id` text NOT NULL,
	`public_key` text NOT NULL,
	`counter` integer NOT NULL,
	`backed_up` integer NOT NULL,
	`transports` text NOT NULL,
	PRIMARY KEY(`user_id`, `id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `credentials_id_unique` ON `credentials` (`id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer,
	`hashed_password` text,
	`image` text,
	`first_name` text,
	`last_name` text,
	`display_name` text NOT NULL,
	`phone_number` text,
	`location` text,
	`website` text,
	`bio` text,
	`avatar_id` integer,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer,
	FOREIGN KEY (`avatar_id`) REFERENCES `avatars`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_display_name_unique` ON `users` (`display_name`);--> statement-breakpoint
CREATE TABLE `login_attempts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text,
	`ip` text NOT NULL,
	`timestamp` integer NOT NULL,
	`success` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user_preferences` (
	`user_id` text PRIMARY KEY NOT NULL,
	`appearance` text DEFAULT 'auto',
	`high_contrast` integer DEFAULT false,
	`language` text DEFAULT 'en',
	`region` text,
	`email_security_alerts` integer DEFAULT true,
	`email_product_updates` integer DEFAULT true,
	`email_marketing` integer DEFAULT false,
	`push_enabled` integer DEFAULT true,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `sponsor_translations` (
	`id` text PRIMARY KEY NOT NULL,
	`sponsor_id` text NOT NULL,
	`locale` text NOT NULL,
	`name` text NOT NULL,
	`tagline` text,
	`description` text,
	FOREIGN KEY (`sponsor_id`) REFERENCES `sponsors`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sponsor_translations_sponsor_locale_idx` ON `sponsor_translations` (`sponsor_id`,`locale`);--> statement-breakpoint
CREATE TABLE `sponsors` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`category` text NOT NULL,
	`color` text,
	`logo_url` text,
	`website` text,
	`address_text` text,
	`display_order` integer DEFAULT 0 NOT NULL,
	`is_published` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sponsors_slug_unique` ON `sponsors` (`slug`);--> statement-breakpoint
CREATE TABLE `sponsors_page` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `sponsors_page_translations` (
	`id` text PRIMARY KEY NOT NULL,
	`page_id` text NOT NULL,
	`locale` text NOT NULL,
	`title` text NOT NULL,
	`subtitle` text,
	`footer_text` text,
	FOREIGN KEY (`page_id`) REFERENCES `sponsors_page`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sponsors_page_translations_page_locale_idx` ON `sponsors_page_translations` (`page_id`,`locale`);