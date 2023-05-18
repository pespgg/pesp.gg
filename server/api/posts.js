export default defineEventHandler(async () => {
  const response = await fetch("https://pesp.gg/data/actualidad.json");
  const { posts } = await response.json();
  const actualidad = posts.filter(post => post.visible === "public");
  actualidad.forEach((post) => {
    post.p_es = truncate(stripTags(post.p_es), 200);
    post.p_en = truncate(stripTags(post.p_en), 200);
  });
  return actualidad;
});
