import Handlebars from "handlebars";

export default defineEventHandler(async (event) => {
  const { token, template } = await readBody(event);

  if (!token) {
    throw createError({
      statusCode: 422,
      statusMessage: "Token not provided."
    });
  }

  const { success } = await verifyTurnstileToken(token);
  const hbs = Handlebars.compile(templates[template]);
  return { success, html: hbs() };
});