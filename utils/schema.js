import categorias from "./schema/categorias";
import servicios from "./schema/servicios";
import navbar from "./schema/navbar";
import stats from "./schema/stats";

class Schema {
  constructor () {
    this.config = {
      categorias,
      servicios,
      navbar,
      stats
    };
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

  get stats () {
    return this.config.stats;
  }
}

export const SCHEMA = new Schema();
