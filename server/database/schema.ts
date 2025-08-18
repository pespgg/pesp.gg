import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const actualidad = sqliteTable("actualidad", {
  permalink: text("permalink").primaryKey().notNull(),
  titulo: text("titulo").notNull(),
  tag: text("tag").notNull(),
  visible: integer("visible").notNull(),
  fecha: integer("fecha").notNull(),
  updatedAt: integer("updated_at").notNull(),
  createdAt: integer("created_at").notNull()
});

export const admins = sqliteTable("admins", {
  id: integer("id").primaryKey().notNull(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  updatedAt: integer("updated_at").notNull(),
  createdAt: integer("created_at").notNull()
});

export const subscribers = sqliteTable("subscribers", {
  id: integer("id").primaryKey().notNull(),
  email: text("email").notNull().unique(),
  intereses: text("intereses").notNull(),
  updatedAt: integer("updated_at").notNull(),
  createdAt: integer("created_at").notNull()
});
