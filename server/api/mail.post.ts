import Mustache from "mustache";

export default defineEventHandler(async (event) => {
  const { template, form, lang } = await readBody(event);
  const config = useRuntimeConfig(event);
  const { email, name, subject, message, legal, token } = form;
  if (!token) {
    throw createError({
      statusCode: 422,
      message: "token_not_provided"
    });
  }

  const verify = await verifyTurnstileToken(token, event);

  if (!verify.success) {
    return verify.success;
  }

  strings.setLanguage(lang);
  const template_strings: Record<string, Record<string, string>> = {
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
      asunto: subject,
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

  const html = Mustache.render(templates[template as "contacto" | "unirse"], {
    ...template_strings.shared,
    ...template_strings[template as "contacto" | "unirse"],
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
