import { SITE } from "./../../utils/site.js";
export default defineEventHandler(async (event) => {
  const file = await readMultipartFormData(event);
  const { type, filename, data } = file[0];
  const dateTime = new Date().getTime();

  if (process.dev) {
    const { writeFileSync } = await import("fs");
    writeFileSync(`./public/uploads/${filename}`, data);
    return { url: `/uploads/${filename}?updated=${dateTime}` };
  }
  else if (process.env.CDN) {
    const { cloudflare } = event.context;
    const headers = new Headers({ "Content-Type": type });
    await cloudflare.env.CDN.put(`uploads/${filename}`, data, { httpMetadata: headers });
    return { url: `${SITE.cdn}/uploads/${filename}?updated=${dateTime}` };
  }
});
