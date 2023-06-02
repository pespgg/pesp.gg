import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const actualidad = sqliteTable("actualidad", {
  permalink: text("permalink").primaryKey().notNull(),
  titulo: text("titulo").notNull(),
  tag: text("tag").notNull(),
  visible: integer("visible").notNull(),
  updated: integer("updated").notNull(),
  fecha: integer("fecha").notNull()
});
