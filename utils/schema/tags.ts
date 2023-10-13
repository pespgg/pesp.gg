const categorias_tags = SCHEMA_categorias.map(({ tag, name }) => ({ tag, name, type: "juegos" }));

export const SCHEMA_tags = [
  ...categorias_tags,
  {
    name: "Eventos",
    tag: "eventos",
    type: "otros"
  }
];
