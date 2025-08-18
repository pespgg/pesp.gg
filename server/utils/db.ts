import { drizzle } from "drizzle-orm/d1";
import { sql } from "drizzle-orm";
import * as schema from "../database/schema";

export { sql, eq, and, or, desc, count } from "drizzle-orm";
export const tables = schema;

export const useDB = () => {
  return drizzle(hubDatabase(), { schema, casing: "snake_case" });
};

export function unixepoch ({ mode }: { mode?: "ms" | "s" }) {
  switch (mode) {
    case "ms":
      return sql`(unixepoch() * 1000)`;
    case "s":
    default:
      return sql`(unixepoch())`;
  }
}
