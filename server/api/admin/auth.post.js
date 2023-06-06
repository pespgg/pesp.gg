import { eq, and } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { user, pass } = body;
  const login = useDb().select().from(tables.admins).where(and(eq(tables.admins.username, user), eq(tables.admins.password, pass))).get();
  if (!login.username) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  return setUserSession(event, { user });
});
