CREATE TABLE `event_intervenants` (
	`event_id` integer NOT NULL,
	`intervenant_id` integer NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`intervenant_id`) REFERENCES `intervenants`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `event_intervenants_pk` ON `event_intervenants` (`event_id`,`intervenant_id`);--> statement-breakpoint
CREATE TABLE `event_session_intervenants` (
	`session_id` integer NOT NULL,
	`intervenant_id` integer NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `event_sessions`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`intervenant_id`) REFERENCES `intervenants`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `event_session_intervenants_pk` ON `event_session_intervenants` (`session_id`,`intervenant_id`);--> statement-breakpoint
DROP TABLE `event_session_speakers`;--> statement-breakpoint
DROP TABLE `event_speakers`;