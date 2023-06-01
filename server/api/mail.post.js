import Handlebars from "handlebars";

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

  const verify = await verifyTurnstileToken(token);
  console.log(config);
  console.log(verify);
  if (!verify.success) {
    return verify.success;
  }

  const hbs = Handlebars.compile(templates[template]);
  const html = hbs();

  
  const mail = await sendMail(config, {
    to: email,
    subject,
    html
  });

  console.log(mail);
});
