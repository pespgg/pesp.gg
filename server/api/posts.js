import { eq } from "drizzle-orm";
// import data from "../../data/posts.json";
// import { SCHEMA } from "../../utils/schema.js";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  let select = useDb().select();
  const { props, limit, permalink } = query;
  /*
  data.posts.forEach((post) => {
    useDb().insert(tables.actualidad).values({
      permalink: post.permalink,
      titulo: post.titulo_es,
      tag: SCHEMA.tags.find(tag => tag.name === post.etiqueta).tag,
      visible: post.visible === "public" ? 1 : 0,
      updated: new Date(post.fecha).getTime(),
      fecha: new Date(post.fecha).getTime()
    }).run();
  });
  */
  if (props) {
    const propsArray = props.split(",");
    const columns = {};
    propsArray.forEach((prop) => {
      if (tables.actualidad[prop]) {
        columns[prop] = tables.actualidad[prop];
      }
    });
    select = useDb().select(columns);
  }

  const from = select.from(tables.actualidad);

  if (permalink) {
    return from.where(eq(tables.actualidad.permalink, permalink)).limit(1).get();
  }

  const where = from.where(eq(tables.actualidad.visible, Number(true)));

  if (limit) {
    return where.limit(limit).all();
  }

  return where.all();
});
