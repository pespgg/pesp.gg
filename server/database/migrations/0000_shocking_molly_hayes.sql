CREATE TABLE `actualidad` (
	`permalink` text PRIMARY KEY NOT NULL,
	`titulo` text NOT NULL,
	`tag` text NOT NULL,
	`visible` integer NOT NULL,
	`updated` integer NOT NULL,
	`fecha` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `admins` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admins_username_unique` ON `admins` (`username`);--> statement-breakpoint
CREATE TABLE `subscribers` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`fecha` integer NOT NULL,
	`intereses` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `subscribers_email_unique` ON `subscribers` (`email`);