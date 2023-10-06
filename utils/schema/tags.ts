import categorias from "./categorias.js";

const categorias_tags = categorias.map(({ tag, name }) => ({ tag, name, type: "juegos" }));

export default [
  ...categorias_tags,
  {
    name: "Eventos",
    tag: "eventos",
    type: "otros"
  }
];
