import type { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event): Promise<PespUser> => {
  const { secure } = useRuntimeConfig(event);
  const body = await readValidatedBody(event, z.object({
    username: z.string().transform(v => v.toLowerCase().trim()),
    password: z.string().transform(v => hash(v, secure.salt))
  }).safeParse);

  if (!body.success) throw createError({ statusCode: 401, message: t("login_error") });

  const form = body.data;

  const login = await useDB().select({
    username: tables.admins.username
  }).from(tables.admins).where(and(
    eq(tables.admins.username, form.username),
    eq(tables.admins.password, form.password)
  )).get();

  if (!login) throw createError({ statusCode: 401, message: t("login_error") });

  await setUserSession(event, { user: { ...login } });
  return login;
});
