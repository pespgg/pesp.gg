import { SITE } from "~/utils/site";

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  const file = await readMultipartFormData(event);

  if (!file) throw createError({ statusCode: 400, message: t("bad_request") });

  checkFileSize(event);

  const { type, filename, data } = file[0];

  checkFileType(type);

  const dateTime = new Date().getTime();

  if (import.meta.dev) {
    const { writeFileSync, existsSync, mkdirSync } = await import("fs");
    if (!existsSync("./public/uploads")) mkdirSync("./public/uploads", { recursive: true });
    writeFileSync(`./public/uploads/${filename}`, data);
    return { url: `/uploads/${filename}?updated=${dateTime}` };
  }
  else if (process.env.CDN) {
    const { cloudflare } = event.context;
    const headers = new Headers({ "Content-Type": type || "" });
    await cloudflare.env.CDN.put(`uploads/${filename}`, data, { httpMetadata: headers });
    return { url: `${SITE.cdn}/uploads/${filename}?updated=${dateTime}` };
  }
});
