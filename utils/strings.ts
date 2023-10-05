import es from "~/strings/es";
import en from "~/strings/en";

const locales: Record<string, Record<string, string>> = { es, en };

class Strings {
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

export const strings = new Strings("es");

export const t = (key: string) => {
  return strings.get(key);
};
