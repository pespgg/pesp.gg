export default defineEventHandler(async (event) => {
  const response = await fetch("https://pesp.gg/data/servicios.json");
  const { servicios } = await response.json();
  const query = getQuery(event);
  const props = query.props.split(",");
  return filterByProps(servicios, props);
});
