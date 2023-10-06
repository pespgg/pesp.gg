import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

export default defineNitroPlugin(() => {
  if (process.dev) {
    try {
      const DB = useDb() as any as BetterSQLite3Database;
      migrate(DB, { migrationsFolder: "./server/db/migrations" });
    }
    catch (err) {
      console.info("Cannot migrate database", err);
    }
  }
});
