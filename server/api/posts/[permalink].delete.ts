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

  event.waitUntil(
    hubBlob().delete([
      `posts/content/${permalink}.html`,
      `posts/images/${permalink}`
    ])
  );

  return deletedPost;
});
