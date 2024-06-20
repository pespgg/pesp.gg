import es from "~/strings/es";
import en from "~/strings/en";

const locales: Record<string, Record<string, string>> = { es, en };

class Strings {
  code: string;
  constructor (code: string) {
    this.code = String(code).toLowerCase();
  }

  get (key: string, values?: Record<string, unknown>) {
    const text = locales[this.code][key] || locales.en[key] || key;
    if (values) {
      return Object.keys(values).reduce((acc, key) => acc.replace(new RegExp(`{{\\s*${key}\\s*}}`, "gi"), values[key]), text);
    }
    return text;
  }

  setLanguage (code = "es") {
    this.code = String(code).toLowerCase();
  }
}

export const strings = new Strings("es");

export const t = (key: string, values?: Record<string, unknown>) => {
  return strings.get(key, values);
};
