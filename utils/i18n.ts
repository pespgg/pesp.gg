import es from "~/i18n/es.js";
import en from "~/i18n/en.js";

const locales: Record<string, Record<string, string>> = { es, en };

class I18n {
  code: string;
  constructor (code: string) {
    this.code = String(code).toLowerCase();
  }

  get (key:string) {
    return locales[this.code][key] || locales.en[key] || key;
  }

  setLanguage (code = "es") {
    this.code = String(code).toLowerCase();
  }
}

export const i18n = new I18n("es");

export const t = (key: string) => {
  return i18n.get(key);
};
