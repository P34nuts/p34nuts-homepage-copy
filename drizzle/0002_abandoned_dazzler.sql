CREATE TABLE `guestbook_entries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`message` varchar(600) NOT NULL,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`heart_count` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`moderated_at` timestamp,
	CONSTRAINT `guestbook_entries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `guestbook_hearts` (
	`entry_id` int NOT NULL,
	`fingerprint` varchar(64) NOT NULL,
	CONSTRAINT `guestbook_hearts_entry_id_fingerprint_pk` PRIMARY KEY(`entry_id`,`fingerprint`)
);
