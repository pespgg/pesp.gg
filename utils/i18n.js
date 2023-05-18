import es from "~/i18n/es.js";
import en from "~/i18n/en.js";

const locales = { es, en };

class I18n {
  constructor (code) {
    this.code = String(code).toLowerCase();
  }

  get (key = "") {
    return locales[this.code][key] || locales.en[key] || key;
  }

  setLanguage (code = "es") {
    this.code = String(code).toLowerCase();
  }
}

const i18n = new I18n("es");

export const t = (key) => {
  return i18n.get(key);
};
