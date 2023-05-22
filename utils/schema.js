import categorias from "./schema/categorias";
import servicios from "./schema/servicios";
import stats from "./schema/stats";
import pages from "./schema/pages";

class Schema {
  constructor () {
    this.config = {
      categorias,
      servicios,
      stats,
      pages
    };
  }

  get categorias () {
    return this.config.categorias;
  }

  get servicios () {
    return this.config.servicios;
  }

  get pages () {
    return this.config.pages;
  }

  get stats () {
    return this.config.stats;
  }
}

export const SCHEMA = new Schema();
