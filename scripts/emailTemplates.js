import { readFileSync, writeFileSync, readdirSync } from "fs";

const path = "./assets/email/templates";
const templates = {};
readdirSync(path).forEach((file) => {
  const name = file.replace(".html", "");
  templates[name] = readFileSync(`${path}/${file}`, "utf8").replace(/\r\n/g, "").replace(/\s+/g, " ");
});

writeFileSync("./server/utils/hbs.js", `export const templates = ${JSON.stringify(templates)};`, "utf8");
