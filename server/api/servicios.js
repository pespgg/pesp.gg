export default defineEventHandler(async () => {
  const response = await fetch("https://pesp.gg/data/servicios.json");
  const { servicios } = await response.json();
  return servicios;
});
