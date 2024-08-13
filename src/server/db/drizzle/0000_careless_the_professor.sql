-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `employees` (
	`employee_cd` varchar(8) NOT NULL,
	`employee_name` varchar(60) NOT NULL,
	`kana` varchar(60) NOT NULL,
	`email` varchar(150) NOT NULL,
	`password` varchar(255) NOT NULL,
	`tel` varchar(15) DEFAULT 'NULL',
	`department_cd` varchar(20) DEFAULT 'NULL',
	`post` varchar(50) DEFAULT 'NULL',
	`authority` varchar(50) DEFAULT 'NULL',
	`employment_status` varchar(50) DEFAULT 'NULL',
	`incumbency_status` varchar(50) DEFAULT 'NULL',
	`login_at` datetime DEFAULT 'NULL',
	`failure_count` tinyint DEFAULT 'NULL',
	`locked_at` datetime DEFAULT 'NULL',
	`created_employee` varchar(20) DEFAULT 'NULL',
	`created_at` datetime DEFAULT 'NULL',
	`updated_employee` varchar(20) DEFAULT 'NULL',
	`updated_at` datetime DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `general_codes` (
	`id` bigint(20) unsigned AUTO_INCREMENT NOT NULL,
	`category` varchar(50) NOT NULL,
	`code` varchar(50) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` varchar(255) DEFAULT 'NULL',
	`sort_key` int(11) DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'NULL',
	`updated_at` timestamp DEFAULT 'NULL',
	CONSTRAINT `general_codes_category_code_unique` UNIQUE(`category`,`code`)
);
--> statement-breakpoint
CREATE TABLE `migrations` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`migration` varchar(255) NOT NULL,
	`batch` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `personal_datas` (
	`employee_cd` varchar(8) NOT NULL,
	`gender` tinyint DEFAULT 'NULL',
	`birthday` varchar(10) DEFAULT 'NULL',
	`zip_code` varchar(8) DEFAULT 'NULL',
	`prefecture` varchar(10) DEFAULT 'NULL',
	`address` varchar(150) DEFAULT 'NULL',
	`building` varchar(50) DEFAULT 'NULL',
	`email` varchar(150) DEFAULT 'NULL',
	`tel` varchar(15) DEFAULT 'NULL',
	`emergency_tel` varchar(15) DEFAULT 'NULL',
	`entry_date` varchar(10) DEFAULT 'NULL',
	`retirement_date` varchar(10) DEFAULT 'NULL',
	`retirement_status` tinyint DEFAULT 'NULL',
	`created_employee` varchar(20) DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'NULL',
	`updated_employee` varchar(20) DEFAULT 'NULL',
	`updated_at` timestamp DEFAULT 'NULL'
);

*/