export default defineEventHandler(async () => {
  const response = await fetch("https://pesp.gg/data/actualidad.json");
  const { posts } = await response.json();
  const actualidad = posts.filter(post => post.visible === "public");
  return actualidad;
});
