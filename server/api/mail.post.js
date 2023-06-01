import Mustache from "mustache";
import { i18n, t } from "./../../utils/i18n.js";

export default defineEventHandler(async (event) => {
  const { token, template, form, lang } = await readBody(event);
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

  i18n.setLanguage(lang);

  const template_strings = {
    contacto: {
      contacto: t("contacto"),
      language: t("lang"),
      equipo_pesp: t("equipo_pesp"),
      correo_recibido: t("correo_recibido"),
      mientras_esperas: t("mientras_esperas"),
      visita_nuestra_web: t("visita_nuestra_web"),
      informacion_enviada: t("informacion_enviada"),
      correo_informacion: t("correo_informacion"),
      str_nombre: t("nombre"),
      str_correo: t("correo"),
      str_asunto: t("asunto"),
      str_mensaje: t("mensaje"),
      correo_footer: t("correo_footer")
    }
  };

  const html = Mustache.render(templates[template], {
    ...template_strings[template],
    nombre: name,
    email,
    mensaje_contacto: message,
    asunto: subject
  });

  const sent = await sendMail(config, {
    to: { email, name },
    subject,
    html
  });
  return sent;
});
