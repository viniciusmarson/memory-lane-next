PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_memories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`image` text NOT NULL,
	`date` datetime NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_memories`("id", "title", "description", "image", "date") SELECT "id", "title", "description", "image", "date" FROM `memories`;--> statement-breakpoint
DROP TABLE `memories`;--> statement-breakpoint
ALTER TABLE `__new_memories` RENAME TO `memories`;--> statement-breakpoint
PRAGMA foreign_keys=ON;