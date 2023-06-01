import { readFileSync } from "fs";

const templates = {};

export const useHbs = () => {
  if (!Object.keys(templates).length) {
    templates.contacto = readFileSync("./server/email/templates/contacto.hbs", "utf8").replace(/\r\n/g, "").replace(/\s+/g, " ");
  }
  return templates;
};
