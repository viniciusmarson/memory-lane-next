import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

const sqlite = new Database("src/db/database.sqlite");

export const db = drizzle(sqlite);

export const memories = sqliteTable("memories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title", { length: 100 }).notNull(),
  description: text("description", { length: 1000 }).notNull(),
  image: text("image").notNull(),
  date: text("date").notNull(),
});
