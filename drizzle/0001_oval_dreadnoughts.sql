CREATE TABLE `booking_rate_limit_windows` (
	`fingerprint` varchar(64) NOT NULL,
	`window_started_at` timestamp NOT NULL,
	`request_count` int NOT NULL DEFAULT 0,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `booking_rate_limit_windows_fingerprint` PRIMARY KEY(`fingerprint`)
);
--> statement-breakpoint
ALTER TABLE `booking_submissions` ADD `owner_notification_delivered` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `booking_submissions` ADD `email_delivered` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `booking_submissions` ADD `delivery_checked_at` timestamp;