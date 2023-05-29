import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const actualidad = sqliteTable("actualidad", {
  permalink: text("permalink").primaryKey(),
  titulo: text("titulo"),
  image: text("image"),
  visible: integer("visible").notNull(),
  fecha: integer("fecha").notNull()
});
