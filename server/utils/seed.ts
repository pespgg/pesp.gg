import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

const addAdmin = (DB: BetterSQLite3Database) => {
  console.info("User \"admin\" added");
  DB.insert(tables.admins).values({
    username: "admin",
    password: "admin"
  }).onConflictDoNothing().run();
};


export const seedDev = async (DB: BetterSQLite3Database) => {
  addAdmin(DB);
};
