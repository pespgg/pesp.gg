import Handlebars from "handlebars";

export default defineEventHandler(async (event) => {
  const { token } = await readBody(event);

  if (!token) {
    throw createError({
      statusCode: 422,
      statusMessage: "Token not provided."
    });
  }

  const { success } = await verifyTurnstileToken(token);
  const template = Handlebars.compile(useHbs().contacto);
  return { success, html: template() };
});
