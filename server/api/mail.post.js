import Mustache from "mustache";
import { i18n, t } from "./../../utils/i18n.js";

export default defineEventHandler(async (event) => {
  const { template, form, lang } = await readBody(event);
  const config = useRuntimeConfig(event);
  const { email, name, subject, message, legal, token } = form;
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
    shared: {
      language: t("lang"),
      correo_informacion: t("correo_informacion"),
      str_nombre: t("nombre"),
      str_correo: t("correo"),
      visita_nuestra_web: t("visita_nuestra_web"),
      informacion_enviada: t("informacion_enviada"),
      mientras_esperas: t("mientras_esperas"),
      correo_recibido: t("correo_recibido"),
      correo_footer: t("correo_footer")
    },
    contacto: {
      contacto: t("contacto"),
      equipo_pesp: t("equipo_pesp"),
      str_asunto: t("asunto"),
      str_mensaje: t("mensaje")
    },
    unirse: {
      quieres_unirte: t("quieres_unirte"),
      primer_paso_pesp: t("unirse_title"),
      str_unirte: t("porque_pesp"),
      str_mayor: t("mayor"),
      mayor_edad: legal ? t("si") : t("no")
    }
  };

  const asunto = template === "contacto" ? subject : `${name} ${t("asunto_interesado")}`;

  const html = Mustache.render(templates[template], {
    ...template_strings.shared,
    ...template_strings[template],
    nombre: name,
    email,
    mensaje: message
  });

  const sent = await sendMail(config, {
    to: { email, name },
    subject: asunto,
    html
  });
  return sent;
});
