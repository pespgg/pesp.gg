import es from "~/strings/es";
import en from "~/strings/en";

const locales: Record<Locale, Record<string, string>> = { es, en };

class Strings {
  code: Locale;
  constructor (code: Locale) {
    this.code = code;
  }

  get (key: string, values?: Record<string, unknown>): string {
    const text = locales[this.code][key] || locales.en[key] || key;
    if (!values) return text;
    return Object.keys(values).reduce((acc, key) => acc.replace(new RegExp(`{{\\s*${key}\\s*}}`, "gi"), String(values[key])), text);
  }

  setLanguage (code: Locale = "es") {
    this.code = code;
  }
}

export const strings = new Strings("es");

export const t = (key: string, values?: Record<string, unknown>) => {
  return strings.get(key, values);
};
