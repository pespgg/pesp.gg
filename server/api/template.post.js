export default defineEventHandler(async (event) => {
  const { token, template } = await readBody(event);

  if (!token) {
    throw createError({
      statusCode: 422,
      statusMessage: "Token not provided."
    });
  }

  const { success } = await verifyTurnstileToken(token);
  const hbs = templates[template];
  return { success, html: hbs };
});
