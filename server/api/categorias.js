export default defineEventHandler(async () => {
  const response = await fetch("https://pesp.gg/data/categorias.json");
  const { juegos } = await response.json();
  return juegos;
});
