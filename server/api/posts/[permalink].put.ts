export default defineEventHandler(async (event): Promise<PespPost> => {
  await requireUserSession(event);

  const formData = await readFormData(event);
  const banner = formData.get("banner") as File | undefined;
  const content = formData.get("content") as string;
  const data = formData.get("data") as string;

  const { titulo, tag, fecha, permalink, visible } = JSON.parse(data);

  if (banner) {
    ensureBlob(banner, {
      maxSize: "8MB",
      types: ["image"]
    });
  }

  const post = await useDB().update(tables.actualidad).set({
    permalink,
    titulo: titulo.trim(),
    tag,
    visible: Number(visible),
    updatedAt: unixepoch({ mode: "ms" }),
    fecha: new Date(fecha).getTime()
  }).where(eq(tables.actualidad.permalink, permalink)).returning().get();

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
