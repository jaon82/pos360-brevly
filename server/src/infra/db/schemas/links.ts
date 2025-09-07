import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const links = pgTable("links", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  url: text("url").notNull(),
  alias: text("alias").notNull().unique(),
  views: integer().notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
