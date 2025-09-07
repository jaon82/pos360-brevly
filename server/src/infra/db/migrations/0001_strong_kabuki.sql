ALTER TABLE "links" RENAME COLUMN "original_url" TO "url";--> statement-breakpoint
ALTER TABLE "links" RENAME COLUMN "short_url" TO "alias";--> statement-breakpoint
ALTER TABLE "links" DROP CONSTRAINT "links_short_url_unique";--> statement-breakpoint
ALTER TABLE "links" ADD CONSTRAINT "links_alias_unique" UNIQUE("alias");