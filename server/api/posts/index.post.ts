export default defineEventHandler(async (event): Promise<PespPost> => {
  await requireUserSession(event);

  const { titulo, content, banner, tag, fecha, permalink, visible } = await readBody(event);

  if (banner && banner.type !== "image/jpeg") {
    throw createError({
      statusCode: 415,
      message: t("unsupported_media")
    });
  }

  const dbCheck = await useDB().select().from(tables.actualidad).where(eq(tables.actualidad.permalink, permalink)).limit(1).all();
  if (dbCheck.length) {
    throw createError({
      statusCode: 409,
      message: t("conflict")
    });
  }

  const post = await useDB().insert(tables.actualidad).values({
    permalink,
    titulo: titulo.trim(),
    tag,
    visible: Number(visible),
    updated: new Date(fecha).getTime(),
    fecha: new Date(fecha).getTime()
  }).returning().get();

  const base64 = banner.src.split(",")[1];
  const bannerBuffer = Buffer.from(base64, "base64");

  if (import.meta.dev) {
    const { writeFileSync, existsSync, mkdirSync } = await import("fs");
    if (!existsSync("./public/posts/content")) mkdirSync("./public/posts/content", { recursive: true });
    writeFileSync(`./public/posts/content/${permalink}.html`, content);

    if (!existsSync("./public/posts/images")) mkdirSync("./public/posts/images", { recursive: true });
    writeFileSync(`./public/posts/images/${permalink}.jpg`, bannerBuffer);
  }
  else if (process.env.CDN) {
    const { cloudflare } = event.context;
    await cloudflare.env.CDN.put(`posts/content/${permalink}.html`, content, {
      httpMetadata: {
        contentType: "text/html"
      }
    });

    await cloudflare.env.CDN.put(`posts/images/${permalink}.jpg`, bannerBuffer, {
      httpMetadata: {
        contentType: "image/jpeg",
        contentEncoding: "base64"
      }
    });
  }
  return post;
});
