import { eq } from "drizzle-orm";

export default defineEventHandler((event) => {
  const cloudflare = getCloudflare(event);
  const query = getQuery(event);
  const { props, limit, permalink } = query;

  let select = useDb(cloudflare).select();

  if (props) {
    const propsArray = props.split(",");
    const columns = {};
    propsArray.forEach((prop) => {
      if (tables.actualidad[prop]) {
        columns[prop] = tables.actualidad[prop];
      }
    });
    select = useDb(cloudflare).select(columns);
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
