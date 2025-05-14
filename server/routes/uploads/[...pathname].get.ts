export default defineEventHandler(async (event) => {
  if (!import.meta.dev) throw createError({
    statusCode: 404,
    message: "Not found"
  });
  const { pathname } = getRouterParams(event);
  return hubBlob().serve(event, "uploads/" + pathname);
});
