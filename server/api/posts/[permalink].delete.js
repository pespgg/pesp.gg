import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  const { permalink } = getRouterParams(event);

  const deletedPost = await useDb().delete(tables.actualidad).where(eq(tables.actualidad.permalink, permalink)).returning().get();

  if (!deletedPost) {
    throw createError({
      statusCode: 404,
      message: "Post not found"
    });
  }

  if (process.dev) {
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
