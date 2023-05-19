export default defineEventHandler(async () => {
  const { juegos } = await $fetch("https://pesp.gg/data/categorias.json");
  return juegos;
});
