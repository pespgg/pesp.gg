import { eq, desc } from "drizzle-orm";

export default defineEventHandler((event) => {
  const body = getBody(event);
  const headers = getHeaders(event);
  /*
  data.posts.forEach((post) => {
    try {
      useDb().insert(tables.actualidad).values({
        permalink: post.permalink,
        titulo: post.titulo_es,
        tag: SCHEMA.tags.find(tag => tag.name === post.etiqueta).tag,
        visible: post.visible === "public" ? 1 : 0,
        updated: new Date(post.fecha).getTime(),
        fecha: new Date(post.fecha).getTime()
      }).run();
    }
    catch {
      console.info("skip", post.permalink);
    }
  });
  */
});
