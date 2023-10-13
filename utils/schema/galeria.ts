export const SCHEMA_galeria = Object.keys(import.meta.glob("~/public/images/galeria/*.jpg")).map((path) => {
  return path.replace(/^.*[\\/]/, "");
});
