CREATE TABLE `guestbook_reactions` (
	`entry_id` int NOT NULL,
	`reaction` enum('heart','love','laugh','fire','thumbsUp','wow','sad') NOT NULL,
	`fingerprint` varchar(64) NOT NULL,
	CONSTRAINT `guestbook_reactions_entry_id_reaction_fingerprint_pk` PRIMARY KEY(`entry_id`,`reaction`,`fingerprint`)
);
