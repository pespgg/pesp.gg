export default defineEventHandler(async (event) => {
  const { email: emailInput, intereses: interesesList } = await readBody(event);
  const email = emailInput.toLowerCase();
  const intereses = interesesList.join(",");

  const DB = useDB();
  const subscriber = await DB.insert(tables.subscribers).values({
    email,
    intereses
  }).onConflictDoUpdate({
    target: tables.subscribers.email,
    set: {
      updatedAt: unixepoch({ mode: "ms" }),
      intereses
    }
  }).returning({
    email: tables.subscribers.email,
    intereses: tables.subscribers.intereses,
    updatedAt: tables.subscribers.updatedAt,
    createdAt: tables.subscribers.createdAt
  }).get();

  if (!subscriber) throw createError({ statusCode: 500, message: t("error") });

  return subscriber;
});
