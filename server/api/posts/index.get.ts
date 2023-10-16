import { eq, desc, and } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  let select = useDb().select();
  const { props, limit, permalink, hidden } = query;

  if (props) {
    const propsArray = String(props).split(",");
    const columns: Record<string, any> = {};
    for (const prop of propsArray) {
      if (tables.actualidad[prop as keyof typeof tables.actualidad]) {
        columns[prop] = tables.actualidad[prop as keyof typeof tables.actualidad];
      }
    }
    select = useDb().select(columns as any);
  }

  const from = select.from(tables.actualidad);
  const { user } = await getUserSession(event);
  const visible = user && hidden ? undefined : eq(tables.actualidad.visible, 1);

  if (permalink) {
    return from.where(and(eq(tables.actualidad.permalink, String(permalink)), visible)).limit(1).all();
  }

  const where = from.where(visible).orderBy(desc(tables.actualidad.fecha), desc(tables.actualidad.updated));

  if (limit) {
    return where.limit(Number(limit)).all();
  }

  return where.all();
});
