import type { H3Event } from "h3";
import { eq, and } from "drizzle-orm";

export default defineEventHandler(async (event: H3Event): Promise<PespUser> => {
  const body = await readBody(event);
  const username = body.user.toLowerCase().trim();
  const login = await useDb().select({
    username: tables.admins.username
  }).from(tables.admins).where(and(eq(tables.admins.username, username), eq(tables.admins.password, body.pass))).get();

  if (!login) throw createError({ statusCode: 401, message: t("login_error") });

  await setUserSession(event, { user: { ...login } });
  return login;
});
