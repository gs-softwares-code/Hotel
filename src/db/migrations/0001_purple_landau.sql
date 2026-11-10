CREATE TABLE `dining_reservations` (
	`id` text PRIMARY KEY NOT NULL,
	`venue_id` text NOT NULL,
	`guest_name` text NOT NULL,
	`guest_email` text NOT NULL,
	`guest_phone` text,
	`reservation_date` text NOT NULL,
	`reservation_time` text NOT NULL,
	`party_size` integer DEFAULT 2 NOT NULL,
	`special_requests` text,
	`status` text DEFAULT 'CONFIRMED' NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	FOREIGN KEY (`venue_id`) REFERENCES `dining_venues`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `dining_venues` (
	`id` text PRIMARY KEY NOT NULL,
	`property_id` text,
	`name` text NOT NULL,
	`cuisine` text NOT NULL,
	`description` text NOT NULL,
	`hours` text NOT NULL,
	`dress_code` text DEFAULT 'Smart Elegant',
	`image_url` text NOT NULL,
	`menu_highlights_json` text,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`category` text DEFAULT 'GENERAL' NOT NULL,
	`subject` text NOT NULL,
	`message` text NOT NULL,
	`status` text DEFAULT 'NEW' NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
/*
 SQLite does not support "Dropping foreign key" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
/*
 SQLite does not support "Drop not null from column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
ALTER TABLE `bookings` ADD `property_id` text REFERENCES properties(id);--> statement-breakpoint
ALTER TABLE `bookings` ADD `guest_name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `bookings` ADD `guest_email` text NOT NULL;--> statement-breakpoint
ALTER TABLE `bookings` ADD `guest_phone` text;--> statement-breakpoint
ALTER TABLE `bookings` ADD `special_requests` text;--> statement-breakpoint
ALTER TABLE `bookings` ADD `adults_count` integer DEFAULT 2;--> statement-breakpoint
ALTER TABLE `bookings` ADD `children_count` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `bookings` ADD `payment_status` text DEFAULT 'CONFIRMED' NOT NULL;--> statement-breakpoint
ALTER TABLE `bookings` ADD `booking_reference` text NOT NULL;--> statement-breakpoint
ALTER TABLE `properties` ADD `phone` text;--> statement-breakpoint
ALTER TABLE `properties` ADD `email` text;--> statement-breakpoint
ALTER TABLE `property_images` ADD `category` text DEFAULT 'all' NOT NULL;--> statement-breakpoint
ALTER TABLE `room_types` ADD `slug` text NOT NULL;--> statement-breakpoint
ALTER TABLE `room_types` ADD `size_sq_ft` integer DEFAULT 750;--> statement-breakpoint
ALTER TABLE `room_types` ADD `bed_type` text DEFAULT 'King Size Imperial Bed';--> statement-breakpoint
ALTER TABLE `room_types` ADD `image_url` text;--> statement-breakpoint
ALTER TABLE `room_types` ADD `available_count` integer DEFAULT 5;--> statement-breakpoint
ALTER TABLE `users` ADD `phone` text;--> statement-breakpoint
ALTER TABLE `users` ADD `country` text;--> statement-breakpoint
CREATE UNIQUE INDEX `bookings_booking_reference_unique` ON `bookings` (`booking_reference`);--> statement-breakpoint
/*
 SQLite does not support "Creating foreign key on existing column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/