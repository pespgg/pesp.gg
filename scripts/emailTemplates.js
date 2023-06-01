import { readFileSync, writeFileSync } from "fs";

const contacto = readFileSync("./assets/email/templates/contacto.html", "utf8").replace(/\r\n/g, "").replace(/\s+/g, " ");

writeFileSync("./server/utils/hbs.js", `export const templates = { contacto: ${JSON.stringify(contacto)} };`, "utf8");
