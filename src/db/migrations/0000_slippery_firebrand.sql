CREATE TABLE `memories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text(100) NOT NULL,
	`description` text(1000) NOT NULL,
	`image` text NOT NULL,
	`date` text NOT NULL
);
