CREATE TABLE `actualidad` (
	`permalink` text PRIMARY KEY NOT NULL,
	`titulo` text NOT NULL,
	`tag` text NOT NULL,
	`visible` integer NOT NULL,
	`updated` integer NOT NULL,
	`fecha` integer NOT NULL
);
