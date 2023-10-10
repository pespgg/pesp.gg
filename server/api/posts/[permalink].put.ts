import { eq } from "drizzle-orm";

export default defineEventHandler(async (event): Promise<PespPost> => {
  await requireUserSession(event);

  const { titulo, content, banner, tag, fecha, permalink, visible } = await readBody(event);

  const post = await useDb().update(tables.actualidad).set({
    permalink,
    titulo: titulo.trim(),
    tag,
    visible: Number(visible),
    updated: new Date().getTime(),
    fecha: new Date(fecha).getTime()
  }).where(eq(tables.actualidad.permalink, permalink)).returning().get();

  if (banner && (banner.type !== "image/jpeg" && banner.type !== "url")) {
    throw createError({
      statusCode: 415,
      statusMessage: t("unsupported_media")
    });
  }

  const newImage = banner.type === "image/jpeg";

  const bannerBuffer = (src: string) => {
    const base64 = src.split(",")[1];
    return Buffer.from(base64, "base64");
  };

  if (process.dev) {
    const { writeFileSync, existsSync, mkdirSync } = await import("fs");
    if (!existsSync("./public/posts/content")) mkdirSync("./public/posts/content", { recursive: true });
    writeFileSync(`./public/posts/content/${permalink}.html`, content);
    if (newImage) {
      if (!existsSync("./public/posts/images")) mkdirSync("./public/posts/images", { recursive: true });
      writeFileSync(`./public/posts/images/${permalink}.jpg`, bannerBuffer(banner.src));
    }
  }
  else if (process.env.CDN) {
    const { cloudflare } = event.context;
    await cloudflare.env.CDN.put(`posts/content/${permalink}.html`, content, {
      httpMetadata: {
        contentType: "text/html"
      }
    });
    if (newImage) {
      await cloudflare.env.CDN.put(`posts/images/${permalink}.jpg`, bannerBuffer(banner.src), {
        httpMetadata: {
          contentType: "image/jpeg",
          contentEncoding: "base64"
        }
      });
    }
  }
  return post;
});
