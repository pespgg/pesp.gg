export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  const { permalink } = await getValidatedRouterParams(event, z.object({
    permalink: z.string()
  }).parse);

  const deletedPost = await useDB().delete(tables.actualidad).where(eq(tables.actualidad.permalink, permalink)).returning().get();

  if (!deletedPost) {
    throw createError({
      statusCode: 404,
      message: t("post_not_found")
    });
  }

  if (import.meta.dev) {
    const { unlinkSync } = await import("fs");
    unlinkSync(`./public/posts/content/${permalink}.html`);
    unlinkSync(`./public/posts/images/${permalink}.jpg`);
  }
  else if (process.env.CDN) {
    const { cloudflare } = event.context;
    await cloudflare.env.CDN.delete(`posts/content/${permalink}.html`);
    await cloudflare.env.CDN.delete(`posts/images/${permalink}.jpg`);
  }

  return deletedPost;
});
