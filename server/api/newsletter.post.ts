export default defineEventHandler(async (event) => {
  const { email: emailInput, intereses: interesesList } = await readBody(event);
  const email = emailInput.toLowerCase();
  const intereses = interesesList.join(",");
  const fecha = Date.now();

  const DB = useDB();
  const subscriber = await DB.insert(tables.subscribers).values({
    email,
    fecha,
    intereses
  }).onConflictDoUpdate({
    target: tables.subscribers.email,
    set: { fecha, intereses }
  }).returning({
    email: tables.subscribers.email,
    fecha: tables.subscribers.fecha,
    intereses: tables.subscribers.intereses
  }).get();

  if (!subscriber) throw createError({ statusCode: 500, message: t("error") });

  return subscriber;
});
