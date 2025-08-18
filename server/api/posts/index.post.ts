export default defineEventHandler(async (event): Promise<PespPost> => {
  await requireUserSession(event);

  const formData = await readFormData(event);
  const banner = formData.get("banner") as File | undefined;
  const content = formData.get("content") as string;
  const data = formData.get("data") as string;

  const { titulo, tag, fecha, permalink, visible } = JSON.parse(data);

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

  if (banner) {
    ensureBlob(banner, {
      maxSize: "8MB",
      types: ["image"]
    });
  }

  const post = await useDB().insert(tables.actualidad).values({
    permalink,
    titulo: titulo.trim(),
    tag,
    visible: Number(visible),
    fecha: new Date(fecha).getTime()
  }).returning().get();

  if (banner) {
    await hubBlob().put(`images/${permalink}`, banner, {
      prefix: "posts",
      httpMetadata: {
        contentType: banner.type
      }
    });
  }

  await hubBlob().put(`content/${permalink}.html`, content, {
    prefix: "posts",
    httpMetadata: {
      contentType: "text/html"
    }
  });

  return post;
});
