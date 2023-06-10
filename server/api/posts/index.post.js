import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }

  const { titulo, content, banner, tag, fecha, permalink, visible } = await readBody(event);

  if (banner && banner.type !== "image/jpeg") {
    throw createError({
      statusCode: 415,
      statusMessage: "Unsupported Media Type"
    });
  }

  const dbCheck = await useDb().select().from(tables.actualidad).where(eq(tables.actualidad.permalink, permalink)).limit(1).all();
  if (dbCheck.length) {
    throw createError({
      statusCode: 409,
      statusMessage: "Conflict"
    });
  }

  const post = await useDb().insert(tables.actualidad).values({
    permalink,
    titulo: titulo.trim(),
    tag,
    visible: Number(visible),
    updated: new Date(fecha).getTime(),
    fecha: new Date(fecha).getTime()
  }).returning().get();

  const base64 = banner.src.split(",")[1];
  const bannerBuffer = Buffer.from(base64, "base64");

  if (process.dev) {
    const { writeFileSync } = await import("fs");
    writeFileSync(`./public/posts/content/${permalink}.html`, content);
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
