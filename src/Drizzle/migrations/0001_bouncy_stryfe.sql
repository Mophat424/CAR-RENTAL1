CREATE TYPE "public"."role" AS ENUM('admin', 'user');--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "Password" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "Role" "role" DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "is_verified" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "verification_code" varchar(10);--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "verification_code_expires_at" timestamp;