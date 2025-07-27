<!-- eslint-disable vue/prop-name-casing, eslint-disable vue/multi-word-component-names -->
<script setup>
import { Body, Font, Head, Html } from "@vue-email/components";

defineProps({
  // shared
  lang: { type: String, required: true },
  correo_informacion: { type: String, required: true },
  str_nombre: { type: String, required: true },
  str_correo: { type: String, required: true },
  visita_nuestra_web: { type: String, required: true },
  informacion_enviada: { type: String, required: true },
  mientras_esperas: { type: String, required: true },
  correo_recibido: { type: String, required: true },
  correo_footer: { type: String, required: true },
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  mensaje: { type: String, required: true },
  // contacto
  contacto: { type: String, required: true },
  equipo_pesp: { type: String, required: true },
  str_asunto: { type: String, required: true },
  asunto: { type: String, required: true },
  str_mensaje: { type: String, required: true }
});

// TODO: Refactor html tables
</script>

<template>
  <Html :lang="lang">
    <Head>
      <title>Contacto</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="x-apple-disable-message-reformatting">
      <Font font-family="Arial" />
    </Head>
    <Body style="margin:0;padding:0;">
      <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
        <tr>
          <td align="center" style="padding:0;">
            <table role="presentation" style="width:602px;border-collapse:collapse;border:0;border-spacing:0;text-align:left;">
              <tr>
                <td align="center" style="padding:0px;background-color: #071018;">
                  <img style="pointer-events: none;" src="https://pesp.gg/images/banners/home-1.jpg" width="100%">
                </td>
              </tr>
              <tr>
                <td align="center" style="background-color:#f9f9f9; padding:30px 30px 30px 30px;position: relative;">
                  <h1 style="font-family: Arial, sans-serif;color:#232323;">{{ contacto }}</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:36px 30px 42px 30px;background-color: #071018;">
                  <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                    <tr>
                      <td style="padding:0 0 36px 0;color:#153643;">
                        <h1 style="font-size:24px;margin:0 0 20px 0;font-family: Arial, sans-serif;color:#f9f9f9;">{{ equipo_pesp }}</h1>
                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family: Arial, sans-serif;color:#f9f9f9;text-align: justify;">{{ correo_recibido }}</p>
                        <p style="margin:0;font-size:16px;line-height:24px;font-family: Arial, sans-serif;color:#f9f9f9;">{{ mientras_esperas }}, <a href="https://pesp.gg" style="color:#d63a63;text-decoration:underline;">{{ visita_nuestra_web }}</a>. </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 0 0 0;color:#153643;">
                        <h1 style="font-size:24px;margin:0 0 20px 0;font-family: Arial, sans-serif;color:#f9f9f9;">{{ informacion_enviada }}</h1>
                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family: Arial, sans-serif;color:#f9f9f9;">{{ correo_informacion }}</p>
                        <h3 style="font-size:18px;margin:0 0 6px 0;font-family: Arial, sans-serif;color:#f9f9f9;">{{ str_nombre }}</h3>
                        <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;margin:0 0 12px 0;">
                          <tr>
                            <td style="background-color: #c1234c;padding:6px 12px 6px 12px;">
                              <p style="margin:0;padding:0;font-size:16px;line-height:24px;font-family: Arial, sans-serif;background-color: #c1234c;color:#f9f9f9;">{{ nombre }}</p>
                            </td>
                          </tr>
                        </table>
                        <h3 style="font-size:18px;margin:0 0 6px 0;font-family: Arial, sans-serif;color:#f9f9f9;">{{ str_correo }}</h3>
                        <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;margin:0 0 12px 0;">
                          <tr>
                            <td style="background-color: #c1234c;padding:6px 12px 6px 12px;">
                              <p style="padding:0;margin:0;font-size:16px;line-height:24px;font-family: Arial, sans-serif;background-color: #c1234c;color:#f9f9f9;">
                                <a style="color:#f9f9f9;">{{ email }}</a>
                              </p>
                            </td>
                          </tr>
                        </table>
                        <h3 style="font-size:18px;margin:0 0 6px 0;font-family: Arial, sans-serif;color:#f9f9f9;">{{ str_asunto }}</h3>
                        <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;margin:0 0 12px 0;">
                          <tr>
                            <td style="background-color: #c1234c;padding:6px 12px 6px 12px;">
                              <p style="padding:0;margin:0;font-size:16px;line-height:24px;font-family: Arial, sans-serif;background-color: #c1234c;color:#f9f9f9;text-align: justify;">{{ asunto }}</p>
                            </td>
                          </tr>
                        </table>
                        <h3 style="font-size:18px;margin:0 0 6px 0;font-family: Arial, sans-serif;color:#f9f9f9;">{{ str_mensaje }}</h3>
                        <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;margin:0;">
                          <tr>
                            <td style="background-color: #c1234c;padding:6px 12px 6px 12px;">
                              <p style="padding:0;margin:0;font-size:16px;line-height:24px;font-family: Arial, sans-serif;color:#f9f9f9;text-align: justify;">{{ mensaje }}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:30px 30px 15px 30px;background:#06080c;">
                  <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family: Arial, sans-serif;">
                    <tr>
                      <td style="padding:0;width:50%;" align="left">
                        <p style="margin:0;font-size:14px;line-height:16px;font-family: Arial, sans-serif;color:#f9f9f9;">
                          &reg; <a style="color:#f9f9f9;">PESP.GG</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 30px 30px 30px;background:#06080c;">
                  <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family: Arial, sans-serif;">
                    <tr>
                      <td style="padding:0;width:50%;" align="left">
                        <p style="margin:0 0 0 0;font-size:14px;line-height:24px;font-family: Arial, sans-serif;color:#f9f9f9;text-align: justify;">
                          <i>{{ correo_footer }}</i>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </Body>
  </Html>
</template>
