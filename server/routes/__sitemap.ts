export default defineEventHandler(async () => {
  const [
    posts,
  ] = await Promise.all([
    $fetch("/api/posts"),
  ]);
  console.log(posts);
  return [...posts].map((p) => {
    return { loc: `/p/${p.permalink}`, lastmod: p.fecha };
  });
});
