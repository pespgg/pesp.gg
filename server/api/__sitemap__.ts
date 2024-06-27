export default defineEventHandler(async () => {
  const [posts] = await Promise.all([
    $fetch("/api/posts")
  ]);

  return [...posts].map((p) => {
    const loc = `/p/${p.permalink}`;
    const lastmod = new Date(p.fecha).toISOString();
    return { loc, lastmod };
  });
});
