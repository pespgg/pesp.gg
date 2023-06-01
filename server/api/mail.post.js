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

  if (!success) {
    return success;
  }

  const mailer = await setupMail(event);

  if (!mailer) {
    return mailer;
  }

  const hbs = Handlebars.compile(templates[template]);
  const html = hbs();

  const mail = await sendMail({
    to: email,
    subject,
    html
  });

  return mail.accepted.includes(email);
});
