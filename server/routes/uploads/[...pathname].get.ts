export default defineEventHandler(async (event) => {
  if (!import.meta.dev) throw createError({
    statusCode: 404,
    message: "Not found"
  });
  const { pathname } = getRouterParams(event);
  return blob.serve(event, "uploads/" + pathname);
});
