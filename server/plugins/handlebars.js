import { readFileSync, writeFileSync } from "fs";

export default defineNitroPlugin(() => {
  const contacto = readFileSync("./server/email/templates/contacto.hbs", "utf8").replace(/\r\n/g, "").replace(/\s+/g, " ");
  writeFileSync("./server/utils/hbs.js", `export const templates = { contacto: ${JSON.stringify(contacto)} };`, "utf8");
});
