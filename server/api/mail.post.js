import Mustache from "mustache";

export default defineEventHandler(async (event) => {
  const { token, template, form } = await readBody(event);
  const config = useRuntimeConfig(event);
  const { email, name, subject, message } = form;
  if (!token) {
    throw createError({
      statusCode: 422,
      statusMessage: "Token not provided."
    });
  }

  const verify = await verifyTurnstile(config.turnstile.secretKey, token);

  if (!verify.success) {
    return verify.success;
  }

  const html = Mustache.render(templates[template], {});

  const mail = await sendMail(config, {
    to: email,
    subject,
    html
  });

  console.log("mail", mail);
});
