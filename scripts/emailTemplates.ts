import { readFileSync, writeFileSync, readdirSync } from "fs";
import chalk from "chalk";

const path = "./assets/email/templates";
const templates: Record<string, string> = {};
readdirSync(path).forEach((file) => {
  const name = file.replace(".html", "");
  templates[name] = readFileSync(`${path}/${file}`, "utf8").replace(/\r\n/g, "").replace(/\s+/g, " ");
  console.info(`Email template ${chalk.yellowBright(file)} loaded to server.`);
});

writeFileSync("./server/utils/hbs.js", `export const templates = ${JSON.stringify(templates)};`, "utf8");
