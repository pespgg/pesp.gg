import type { H3Event } from "h3";

export const _useSession = (event: H3Event) => {
  const { session } = useRuntimeConfig(event);
  return useSession(event, session);
};

export const getUserSession = async (event: H3Event) => {
  return (await _useSession(event)).data as PespSession;
};

export const clearUserSession = async (event: H3Event) => {
  const session = await _useSession(event);
  await session.clear();
};

export const setUserSession = async (event: H3Event, data: PespSession) => {
  const session = await _useSession(event);
  await session.update(data);
  return session.data;
};

export const requireUserSession = async (event: H3Event) => {
  const userSession = await getUserSession(event);

  if (!userSession.user) throw createError({ statusCode: 401, message: t("unauthorized") });

  return userSession as { user: PespUser };
};
