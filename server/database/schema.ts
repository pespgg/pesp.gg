import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const actualidad = sqliteTable("actualidad", {
  permalink: text("permalink").primaryKey().notNull(),
  titulo: text("titulo").notNull(),
  tag: text("tag").notNull(),
  visible: integer("visible").notNull(),
  updated: integer("updated").notNull(),
  fecha: integer("fecha").notNull()
});

export const admins = sqliteTable("admins", {
  id: integer("id").primaryKey().notNull(),
  username: text("username").notNull(),
  password: text("password").notNull()
});

export const subscribers = sqliteTable("subscribers", {
  id: integer("id").primaryKey().notNull(),
  email: text("email").notNull().unique(),
  fecha: integer("fecha").notNull(),
  intereses: text("intereses").notNull()
});
