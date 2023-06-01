import Handlebars from "handlebars";

export default defineEventHandler(async (event) => {
  const { token, template, form } = await readBody(event);
  const { email, name, subject, message } = form;
  if (!token) {
    throw createError({
      statusCode: 422,
      statusMessage: "Token not provided."
    });
  }

  const { success } = await verifyTurnstileToken(token);
  console.log("verify", success);
  if (!success) {
    return success;
  }

  const hbs = Handlebars.compile(templates[template]);
  const html = hbs();

  const config = useRuntimeConfig(event);
  const mail = await sendMail(config, {
    to: email,
    subject,
    html
  });

  console.log(mail);
});
