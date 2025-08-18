import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { unixepoch } from "../utils/db";

export const actualidad = sqliteTable("actualidad", {
  permalink: text().primaryKey().notNull(),
  titulo: text().notNull(),
  tag: text().notNull(),
  visible: integer().notNull(),
  fecha: integer().notNull(),
  createdAt: integer().notNull().default(unixepoch({ mode: "ms" })),
  updatedAt: integer().notNull().default(unixepoch({ mode: "ms" }))
});

export const admins = sqliteTable("admins", {
  id: integer().primaryKey().notNull(),
  username: text().unique().notNull(),
  password: text().notNull(),
  createdAt: integer().notNull().default(unixepoch({ mode: "ms" })),
  updatedAt: integer().notNull().default(unixepoch({ mode: "ms" }))
});

export const subscribers = sqliteTable("subscribers", {
  id: integer().primaryKey().notNull(),
  email: text().notNull().unique(),
  intereses: text().notNull(),
  createdAt: integer().notNull().default(unixepoch({ mode: "ms" })),
  updatedAt: integer().notNull().default(unixepoch({ mode: "ms" }))
});
