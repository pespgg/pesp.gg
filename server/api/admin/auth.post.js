import { eq, and } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { user, pass } = body;
  const username = user.toLowerCase().trim();
  const login = await useDb().select().from(tables.admins).where(and(eq(tables.admins.username, username), eq(tables.admins.password, pass))).get();
  if (!login) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  return setUserSession(event, { user });
});
