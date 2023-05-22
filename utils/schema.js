import categorias from "./schema/categorias";
import servicios from "./schema/servicios";
import navbar from "./schema/navbar";

class Schema {
  constructor ({ categorias, servicios, navbar }) {
    this.config = { categorias, servicios, navbar };
  }

  get categorias () {
    return this.config.categorias;
  }

  get servicios () {
    return this.config.servicios;
  }

  get navbar () {
    return this.config.navbar;
  }
}

export const SCHEMA = new Schema({ categorias, servicios, navbar });
