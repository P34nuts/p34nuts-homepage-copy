CREATE TABLE `site_settings` (
	`key` varchar(64) NOT NULL,
	`value` text NOT NULL,
	`updated_by` int NOT NULL,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_settings_key` PRIMARY KEY(`key`)
);
